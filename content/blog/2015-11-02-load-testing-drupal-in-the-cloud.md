---
description: null
author: JohnGriffin
slug: "load-testing-drupal-cloud"
date: "2010-08-20"
tags: null
published: true
title: Load Testing Drupal in the Cloud
---

In this article we will talk through setting up a simple load testing scenario for Drupal applications using Amazon’s Elastic Cloud computing.  Amazon EC2 will enable you to easily set up testing scenarios for a relatively low cost, e.g. you can find out what the effect of adding an additional database server will make without actually buying one!  JMeter will allow us to create complex test plans to measure the effect of our optimisations, we'll set up a remote JMeter load generator on EC2 that we'll control from our desktop.

Improving Drupal's performance is beyond the scope of this article, but we'll talk more about that in future.  If you need some suggestions now then check out the resources section for  links to good Drupal optimisation articles.

### Setting up your test site on EC2
If you don’t already have an account then you’ll need to sign up for [Amazon Web Services](http://docs.amazonwebservices.com/AWSEC2/latest/GettingStartedGuide/).  It’s all rather space-age and if you haven’t been through the process before then it can be a bit confusing.  We want to set up a working copy of our site to test on EC2, so once you have your AWS account, the process goes something like this:

* Select an AMI (Amazon Machine Image) that matches your production environment -  we use [alestic.com](http://alestic.com) as a good source of Debian and Ubuntu AMIs.

* Create a high-CPU instance running your AMI.  Small-CPU instances only have one virtual CPU, which can be stolen by other VMs running on the same physical hardware, which can seriously skew your results when running a test.  There is always going to be a certain amount of variance in the actual CPU time available to your AMI, since it’s always going to sharing the physical hardware, but we find that high-CPU instances tend to reduce the CPU contention issues to a reasonable level.

* Give your instance an elastic IP, which is Amazon's term for a static IP that you can use to connect to it.

* Ssh into the machine, you’ll need to make sure that port 80 and 22 are open in the security group, and set up a keypair.  Download the private key and use that when connecting, the simplest way is to do:

`ssh -i /path/to/your/private/key.pem user@el.as.tic.ip `

* Install the LAMP server packages you require, try to mirror the production environment as closely as possible.  A typical LAMP server can be installed on Debian/Ubuntu by running:

`apt-get  install apache2 php5 php5-mysql php5-gd mysql-server php5-curl `

* Now you need to set up a copy of the site you want to test on your new server.  EC2 instances give you a certain amount of ephemeral storage, which will be destroyed when the AMI is terminated, but will persist between reboots - this can be found at /mnt.  If you want to terminate your AMI but may need the test sites that you are going to create again, it's a good idea to [back up /mnt to Amazon S3](http://s3.amazonaws.com/awsVideos/CustomizeAnExistingAMI/Customize%20an%20Existing%20AMI.html).

* We will create two copies of the site, one called “control” and another called “optimised”.  Give them each their own virtual host definition and make sure that they each point to their own copy of the database.  “Control” should be left alone, we’ll use this version to get baseline statistics for each test plan.  We’ll tweak and tune “optimised” to improve the performance, and compare our results with “control”.  Give each of the sites an obvious subdomain so that we can connect to them easily without getting confused.  You should end up with two copies of your site set up on /mnt, with separate domains and dbs, something like this:

`http://foo-control.bar.com   -> /mnt/sites/foo/control/   -> DB = foo_control`
`http://foo-optimised.bar.com -> /mnt/sites/foo/optimised/ -> DB = foo_optimised`

### Setting up JMeter to generate load

We don't want fluctuating network bandwidth to affect our results, so it's best to run a JMeterEngine on a separate EC2 instance and control that from JMeter running on our local machine.  First we'll get JMeter generating load from our local machine, then we'll set up a remote JMeterEngine on EC2.

* First [download JMeter](http:/jakarta.apache.org/site/downloads/), you'll also need a recent copy of the Java JVM running.  On OS X, I moved the downloaded JMeter package to Applications, and then ran it by executing bin/jmeter. 

* If you're new to Jmeter, you can download some sample JMeter [test plans for stress testing a Drupal site](https://pantheon.io) from the nice guys at Pantheon.  Or just create your own simple plan and point it at your test server on EC2.

* Now we have a basic test plan in place, we should spin up another EC2 instance that we'll use to generate the load on our test server.  This will provide more reliable results as we're removing our local network bandwidth from the equation.  We'll still use our local JMeter to control the remote load generator.  We used a [prebuilt AMI that comes with Ubuntu and JMeter already installed](http://developer.amazonwebservices.com/connect/entry!default.jspa;jsessionid=700DA838F87580F7FCABEEBBF6F4C1F4?categoryID=223&externalID=2255&fromSearchPage=true).  JMeter has some [good documentation](http://jakarta.apache.org/jmeter/usermanual/remote-test.html) on how to tell your local JMeter to connect to the remote machine, in essence you need to add the remote machine's IP address to your local jmeter.properties file.

* You'll need to open a port on EC2 for JMeter to talk to the remote engine, add 9090 TCP to your security group that the AMI is running under.

* We found that JMeter started to hang when we increased the amount of data being transferred in our test plans.  Tailing jmeter.log told us that we were running out of memory, [increasing the heap size](http://wiki.apache.org/jakarta-jmeter/JMeterFAQ#JMeter_keeps_getting_.22Out_of_Memory.22_errors.__What_can_I_do.3F) available solved this.

* Test, test, and more tests. It's important to repeat your tests to make sure you're getting reliable results.  It's also important to know that your tests are representative of average user behaviour, it's possible to set up JMeter as a proxy that will capture your browsing activity and replay that as a test.  It's also possible to replay apache logs as test plans.

### Resources
<a name="resources"></a>

* [Load test your drupal application scalability with apache jmeter](http://www.johnandcailin.com/blog/john/load-test-your-drupal-application-scalability-apache-jmeter)

* [Using JMeter to test performance of Drupal with authenticated users - Rain City](http://www.agileapproach.com/blog-entry/using-jmeter-test-performance-drupal-authenticated-users)

