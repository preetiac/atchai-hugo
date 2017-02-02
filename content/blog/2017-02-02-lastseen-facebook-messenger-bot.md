---
date: "2017-02-02"
published: true
title: "LastSeen - a chatbot that knows you're safe"
author: JohnGriffin
header_image: "/images/blog-header-generic.png"
---


LastSeen is a simple chatbot that asks the user to check-in once a day and notifies their designated contact if they don’t.


![LastSeen facebook chatbot](/img/lastseen-white.png)

The project is a collaboration with [Tom Hewitson](https://twitter.com/tomhewitson).  Tom's father passed away last year.  Once the inital shock had subsided he found himself often worrying about his mum now that she was on her own.  As he was calling to check in on her every day he had the idea for LastSeen.

The product was designed initially for older people living alone, providing them with a daily reminder that someone cares about them, and offering their children the security of knowing that their parents are safe. 

It has however found more traction with a younger audience, especially young professional women living alone, students living away from home for the first time, and dog walkers!

## Design 
We always work in a lean process where we aim to deliver a "minimum viable product" as soon as possible.  In this case we delivered our first iteration within a week.

Before committing anything to code, prototypes are created using off-the-shelf tools.  This is an early prototype:

![LastSeen Prototype](/images/lastseen-chatfuel.gif)

Doing this allows us to rapidly test the concept with potential users.  At this point we decided that it was better to have a daily recurring check-in, rather than expecting the user to turn on a check-in just before they were going to walk the dog, for example.  This meant that their designated contact could be sure that they were fine, and hadn't just forgotten to turn on the notifications.

We also wanted to make sure we protected the privacy of the person checking-in and that the bot couldn’t be misused. To do this we decided to give them the ability to control who could and couldn’t see when they missed a check-in and to pause the process at any time without notifying anyone.

After some discussions we decided to try fixing the check-in times as the process of setting and editing times felt too laborious. We also found a way to replace the clunky mechanism by which the user selected their designated contact with a one-tap solution using the Messenger ‘Share’ element and URL parameters.

{{< youtube iELVodN4faE >}}

<br>

We built a second prototype. From this we learned that while fixing the wait time to an hour was fine, being able to set the check-in time was important for people to feel in control. Having a single check-in that people could set but couldn’t edit was a better way to reduce the onboarding friction than fixing the times altogether.


## Technology

Using off-the-shelf tools can work well for prototyping, but you rapidly run into their limits.  For example you cannot send scheduled messages, or implement logic such as the system requiring you to approve people who request notifications on your checkins.  Of course there are more fundamental reasons why these tools are inappropriate for a real product, such as IP ownership, security, scalability and vendor lock-in.

Now is the time to build our first iteration.  We use our own chatbot development framework, built on the robust [Botkit.js](https://github.com/howdyai/botkit) library, which in turn integrates with Facebook Messenger, Slack and Microsoft Bot Framework.

We host on Heroku, a reliable PaaS which provides all the services we need - Node.js app support, a RabbitMQ task queue, Mongo as a schemaless data store.  All these services are transparently scalable to us, so as our user numbers grow we can simply let Heroku deal with infrastructure and sysadmin-level problems such as availability, replication, and performance.  Once a certain scale is reached, it does become more economical to take these problems in-house and manage your own infrastructure, for which we typically use the AWS platform and Docker.

Another key benefit of hosting initially on a PaaS like Heroku is that you can get great monitoring and alerts systems integrated with your services for free.  For example we use PaperTrail for our application logs, configured to send an email alert whenever the app encounters an error.  We also use CloudAMPQ alarms, configured to detect when our task queues are getting clogged up, or if there are an unexpected number of subscribers.

![Chatbot analytics](/images/lastseen-engagement.png)

We also set up some integrations with third party analytics tools such as [Dashbot](https://www.dashbot.io/) and [Mixpanel](https://mixpanel.com/), via [Segment](https://segment.com/). This allows us to track how people are using the bot, and inform future design decisions.

![Chatbot analytics](/images/lastseen-mixpanel.png)

Our chatbot platform contains a real-time messaging dashboard that allows for "human in the loop", where an administrator can intervene in the conversation and optionally disable the bot.  The dashboard also allows you to keep track of all your users, filter them and view their settings and past conversations.

The technology that has been developed and deployed for LastSeen is being made available as a platform to all Atchai customers.  Get in touch if you'd like to see a demo.



<p style="text-align: center;">
    <a href="https://www.facebook.com/lastseenapp">Try LastSeen on Facebook Messenger</a>
</p>
