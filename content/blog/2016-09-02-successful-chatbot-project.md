---
date: "2016-09-02"
published: true
title: "How to run a successful chatbot development project"
author: JohnGriffin
header_image: "/images/blog-healthcare-chatbots-robot-doctor.png"
---


In this article we’ll share a few things we’ve learned from building chatbots.
We’ll cover how to select the right messaging platforms, how to design effective
conversations and why we’ve built our own platform for the rapid development and
testing of bots. 

Let's run through the process we use with our customers:

## What does success look like?

Like any project, it’s important to start by defining goals that can be used to
measure success.

If this is a new startup you might want to check out our thoughts on [how to
evaluate a new digital product
business](http://atchai.com/blog/2016-05-31-is-your-start-up-idea-really-worth-it/)
before spending anything on development.

One of the unique things about bot products is that you can often **fake it
until you make it**. Why not pretend to be your bot for a while and learn about
your users’ expectations? If it’s good enough for Facebook M…

## Discovery

We use an [Agile development process that’s simple and
flexible](http://atchai.com/about-us/how-we-work/), allowing us to be creative
in achieving your goals. In order to hit the ground running there are a few
things we need to figure out first.

#### Choosing the right messaging platform

Ultimately the choice should be driven by your audience. One of the key reasons
people are building bots is “app fatigue”. The stat everyone throws around is
“the average American installs zero new apps per month” — it’s [not quite
true](https://www.tune.com/blog/no-the-average-american-does-not-download-0-apps-each-month/),
but the point remains: **We need to meet customers where they already are**.
What is your audience’s favourite messaging app?

![](https://cdn-images-1.medium.com/max/800/1*lCcpeJVLE8g1YbDJCNYKiw.png)

> US smartphone users’ number of app downloads per month

We’ve produced an extensive [review of messaging app platforms that are suitable
for
chatbots](http://atchai.com/blog/2016-08-11-whos-winning-the-messenger-app-wars/),
which is good background reading. Make this decision based on hard evidence if
you can, rather than trying to match up the demographics of your audience and
the apps. In the same way that you would review Google Analytics before
rebuilding a website in order to know which browsers and devices you need to
support, you should aim to collect data from your audience on which messaging
apps they use.

SMS is a good catch-all option. Our platform supports SMS as standard so you can
always fall back on it if necessary. While it cannot offer some of the more
graphical UI elements that other messaging apps do, we automatically translate
these into a text-only equivalent.

![](/images/blog-chatbot-project-sms-fb.png)

> Automatically making use of the appropriate features on multiple messaging
platforms

#### Capturing Requirements

We like to capture requirements as user stories, since they force us all to
think from the end user’s perspective and help us to prioritise the requirement.
A user story always has the same format:

*As a &lt;user role&gt;, I want &lt;requirement&gt;, so that &lt;reason&gt;*

For example, if we were designing the classic pizza-bot we might identify the
following requirement:

*As a previous customer, I want pizzabot to remember which toppings I dislike,
so that I don’t receive inappropriate recommendations.*

#### User Journeys and Conversation Design

The next step is to prioritise our user stories, take the most important ones
and figure them out in more detail. This is where we start getting into
designing the conversation at a high level.

Atchai works with a [conversation designer](http://www.tomhewitson.com/) to
provide full-service strategy, design and technology for AI bot products.

Before we consider the bot’s personality, we must design conversation flows that
optimise the process for our customers. This could be seen as the equivalent of
user journey mapping and wireframes for visual UI projects.

![](https://cdn-images-1.medium.com/max/800/1*nBDZFIqwRXS8oAePBXyYhg.png)

#### Tone of Voice

Before we start writing final copy we need to develop a shared understanding of
the bot’s personality and tone of voice.

There are several techniques to achieving this but the simplest is to develop
the character of the bot as if it was a complete person who is just doing their
day job by answering the user’s queries. This results in a bot character story
that explains who they are, their motivations and quirks.

Developing a fully fledged character is the key to writing a script that doesn’t
grate after multiple uses. It also helps you see when humour is an effective
tool and when it’s an annoying distraction.

## Iterative Delivery

#### Process

We aim to deliver a working product, deployed and ready to use by real users,
right from the very first sprint. The idea is to then iterate on this product,
adding more features until we start to meet the goals we set out right at the
beginning.

It’s important that we test the product with real users throughout the process.
There is no better way to understand whether we’re building the right thing to
meet their needs. 

#### Conversation Design

Bot scripts are written incrementally, starting with the core functionality and
then expanding into personality driven intents and multiple responses as the
project develops.

Conversation design also involves training the natural language processor to
understand your users, again focussing on the core terms for the key
functionality at the start and then expanding as user data becomes available.

The process of matching user intents to existing features or highlighting the
need for new responses is a continuous cycle that moves the bot from a decision
tree structure to a natural conversation over several sprints.

#### Technology

We’re constantly improving our technology offering, and we’ve invested in
developing a core platform that benefits all our customers. Out of the box we
can offer:

* Support for major messenger apps (e.g. Facebook Messenger) and SMS.
* A powerful engine that allows for complex conversation workflows.
* Human in the loop — override the bot and talk directly to your users.
* Integration with advanced NLP products like wit.ai.
* RESTful API for quick integration with any web service.
* Fully managed solution that we can host and support for you.

Typically you will find that your users are spread over multiple platforms, so
we allow you to handle this transparently, providing you with a single interface
to all your users regardless of the messaging app they’re using.

![](https://cdn-images-1.medium.com/max/800/1*Xmz9RtGH7Y5w-WlfaqP_EA.gif)

> Real-time cross-platform messaging UI, allowing you to interact with your users.

#### Analytics

Once your bot is out there in the wild, you will want to keep learning from your
users’ behaviour. We will set up analytics tools so that we can all monitor the
performance and make informed decisions to continually improve the product.


## How much does it cost?

Good question! And we’ll give you a simple answer…

It can cost as little as £10–15k for a simple MVP — that’s a 1 week discovery
phase and a single sprint to get a working product out there. We can deliver
this so cheaply and reliably because of the technology we’ve already built and
the valuable experience we have to share with you.

Of course the full answer is that it depends on how complex the bot is that you
want to create. If you want to integrate with other products, or use
sophisticated NLP / AI techniques then it can take many sprints to train
learning algorithms to be effective and meet product goals.

We’d love to help you realise your vision. If you think we can help you, please get in touch.
