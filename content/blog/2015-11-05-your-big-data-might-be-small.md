---
description: null
slug: "your-big-data-might-be-small"
date: "2015-12-03"
tags: 
  - "null"
title: Your Big Data Might Be Small
author: RobHardwick
published: true
header_image: ""
---


Recently we've been working on a prototype of a textual analysis product. The requirements are fairly simple: take a corpus of user comments and find distinctive terms for each user. The purpose of the exercise was to validate the utility of this analysis to the client as well as to explore what architectural choices would be appropriate in a full version of the product. We tried a couple of different approaches and in this post I'm going to look at the pros and cons of them and how the aims of the prototype sometimes conflicted.

The code for this post is [available on Github](https://github.com/atchai/small-data) so you see in detail the differences between the two approaches. The data I've used for this example is the first two years of reddit comments (2007-2008) from the [reddit comments corpus on archive.org](https://archive.org/details/2015_reddit_comments_corpus).  I've had to remove certain proprietary elements from the code in order to open-source it - the biggest difference is that the code on Github does a simple count of terms for each user instead of using a more interesting algorithm to define what makes a term distinctive for a particular user.


## First Try: Big Data

The obvious solution for this sort of problem is to use a [Hadoop](https://hadoop.apache.org/) based architecture such as [Spark](http://spark.apache.org/) to allow us to scale. Unfortunately, due to the overheads of such an architecture and the size of the data we were prototyping with (10s of GB) this first solution proved problematic.

The data from the client was in the following format:

* A [BSON](https://en.wikipedia.org/wiki/BSON) file containing comments and associated user IDs
* A plain text file with a mapping of user IDs to user names

As we were using Spark, the natural choice was to use [Scala](http://www.scala-lang.org/) to write the program which turned out to be a lot of fun! Due to the functional nature of the language we had to learn some new techniques for transforming data but it was still less painful than Java (sorry!).

The basic steps we took in the program were as follows (see [the source](https://github.com/atchai/small-data/blob/master/spark/src/main/scala/SmallData.scala) for more detail):

1. Create a map of user IDs to user names from the plain text file
2. Create an [RDD](http://spark.apache.org/docs/latest/programming-guide.html#resilient-distributed-datasets-rdds) of comments and associated user IDs from MongoDB (using the [MongoDB Hadoop library](https://docs.mongodb.org/ecosystem/tutorial/getting-started-with-hadoop/))
3. Tokenise the comments so for each user we have a number of tuples in the form (user_id, token)
4. Use [reduceByKey](https://spark.apache.org/docs/latest/api/java/org/apache/spark/rdd/PairRDDFunctions.html#reduceByKey%28scala.Function2%29) to get the per-user frequency of each token
5. Select the ten most frequent terms for each user and write to [ElasticSearch](https://www.elastic.co/products/elasticsearch) (using the [ElasticSearch Spark library](https://www.elastic.co/guide/en/elasticsearch/hadoop/current/spark.html).)

Once this was all working it was a fairly simple process to run against a dataset which we encapsulated in a [fabfile](https://github.com/atchai/small-data/blob/master/fabfile.py) for convenience. However, what we discovered is that running the process locally using a sample dataset of ~2GB was a very slow operation. On my laptop it was taking around 20 minutes to run which makes for a painful and slow development process - each time we tweaked the algorithm there was a long wait before we could inspect the results. We couldn't reduce the size of the sample data too much as this would make validating the results impossible.

In an attempt to fix our development woes we tried to run the process on a cluster of machines - as Spark is designed to do. Unfortunately this presented us with a whole new set of issues:

* Whilst the individual steps could be parallelized by Spark the process we were following was inherently serial
* Spinning-up new clusters on AWS is quite a time consuming process, often taking 30 minutes or more

After struggling with this approach for a while we decided to take a step back and think about the problem again...


## Next Step: Back to Basics

In my spare time I'd been experimenting with some of the cool new features of the [C++11 standard](https://en.wikipedia.org/wiki/C%2B%2B11). Things like initializer lists and easier iteration of STL types have made modern C++ a much more viable candidate for quick prototyping than in the past.

Thinking about how much easier C++ had become along with the fact that the data we were prototyping with was well within the range of typical RAM these days led me to try a simpler approach. The (slightly naive) C++ implementation I came up with gave us a 5-fold increase in speed, which was a big advantage in productivity.

The process used in this version was as follows (again, see [the source](https://github.com/atchai/small-data/blob/master/cpp/src/) for more detail):

1. Create a map of user IDs to user names from the plain text file
2. Read in comments directly from the BSON data dump using [libbson](https://github.com/mongodb/libbson)
3. Tokenise the comments, hash each token and store a map of users and their respective token counts
4. Use a [priority_queue](http://en.cppreference.com/w/cpp/container/priority_queue) to store each user's ten most frequent terms
5. Output JSON in [ElasticSearch's bulk format](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html) for quick importing

You'll probably notice that their are some crucial differences in this compare to the previous version. Most importantly:

* We read the data directly from the BSON file on disk, bypassing the need to run a MongoDB instance which is never going to be as fast as sequential disk access
* We're using token hashes to reduce the amount of memory needed for each user. A vector containing 4 byte hashes will be a lot smaller than the equivalent vector of strings.
* There is no parallelism, everything runs in a single thread/process

It's likely that a lot of the speed-up we experienced can be attributed to the first two points above. Both of these are possible in Spark by using [BSONFileInputFormat](http://api.mongodb.org/hadoop/current/core/com/mongodb/hadoop/BSONFileInputFormat.html) and [HashingTF](http://spark.apache.org/docs/latest/api/scala/index.html#org.apache.spark.mllib.feature.HashingTF). It would be interesting to implement these and see what, if any, speed-up remains in the C++ version.


## Conclusion

In the end the problems we faced were caused by the conflicting requirements of the project. Firstly, we needed to validate the algorithms used and this required us to be able to iterate quickly whilst still running over a decently-sized sample of the data. Secondly, we needed to build out a scalable architecture which necessarily will have greater startup and runtime overheads.

Although the project was certainly a success, we could do better in future by identifying the different requirements and approaching them separately. I would also look at using a different prototyping language than C++. We use python in most of our projects and it would be interesting to see how close we could get in performance to the C++ version. Projects like [NumPy](http://www.numpy.org/) allow python developers to utilise more space-efficient data structures like those available in C++ whilst still retaining the ease of typical python programming. Another advantage of python is that it's supported by Spark, although this has downsides compared to Scala such as less documentation and fewer code examples to draw from.

### Spark

#### Pros

* Easy scalability
* Only 286 lines of code versus 451 for the C++ version
* Scala is fun to use and easy to prototype with, especially for a statically typed language

#### Cons

* Slow for iterative development
* Can be difficult to debug bugs and performance issues due to its distributed nature
* Functional constructs have a steep learning curve for imperative developers

### C++

#### Pros

* Faster - 4 minutes versus 20 for the Spark version
* The newer features of C++11 make development quicker and more fun than before

#### Cons

* Requires careful planning and testing not to introduce memory leaks, crashes and/or security issues
* Not suitable for use in production without significant re-architecting (due to scalability, security worries, etc)
* Porting to platforms other than OS X would require a small amount of effort
