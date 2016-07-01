---
author: JohnGriffin
date: "2016-07-01"
published: true
title: "Multi-Team Slack Bots Hosted with BeepBoop"
---

<p style="text-align: center;"><strong>How To Deploy Your Bot As a Slack App</strong></p>

This article assumes that you already have a [Slack bot running locally as a
custom
integration](/blog/2016-06-30-creating-a-simple-slack-bot), and
an account set up with BeepBoop. If that’s not the case then just [follow this
guide](/blog/2016-06-30-creating-a-simple-slack-bot) which is
the perfect prerequisite to this article, and should get you up and running in
the shortest possible time.

If you want your bot to be used by multiple teams, handle slash commands, or to
be submitted to the Slack app store then it’ll need to do the oAuth dance and
manage a separate webhook for each team. Fortunately, BeepBoop makes all of this
really simple for us. The documentation is a bit sparse so I’ve tried to record
every step I took to get it working here.

### Deploying as a Multi-Team Slack App

Following on from the bot we created in the [previous
post](/blog/2016-06-30-creating-a-simple-slack-bot), the first
thing we need to do is update **index.js:**

<script src="https://gist.github.com/johngriffin/643a49c98d0aeda67a663f3aa95a709a.js"></script>

The only change here is for us to use the “beepboop-botkit” library to connect
to Slack, if there is no “SLACK_TOKEN” environment variable. 

![Slack app switch](/images/blog-slack-multi-app-switch.png)

When we flick the “Slack App” switch in our BeepBoop project settings page, the
SLACK_TOKEN environment variable will not be set any more. Flicking this switch
will also start a wizard-like UI that’ll guide us through the next steps, which
are:

* Register a new Slack App for your team 
* Create a bot user for the Slack App
* Copy the details from the “App Credentials” tab back to BeepBoop

![Create a bot user for your app](/images/blog-slack-multi-bot-user.png)

> Make sure you add a bot user for your app — this step wasn’t clear to me.

Next you’ll want to flick the “Multi-team” switch on.

Now you will need to restart the bot — this part wasn’t documented and led to
some serious head-scratching while I scanned the logs and tried to replicate the
issue locally in dev mode. To restart simply go back to the status page and stop
then start the bot again.

Before you’ll be able to see the bot in your team you will need to launch the
Slack App for your team. BeepBoop creates a page for your app with a button
allowing you to do this. You can use this as a simple landing page for your bot,
allowing anyone to add it to their team — it’s contents can be customised using
[bot.yml](https://beepboophq.com/docs/article/bot-yml). To find this page go to
the “Teams” tab of your projects, then click “Add Team”.

![Slack app launch page](/images/blog-slack-multi-launch-page.png)

> You need to add the slack app to your team

Once you’ve completed this process you should see your bot user appear in your
team — congratulations, that’s it!

If you don’t see the bot user show up there’s probably a clue in the logs — you
can check these from the “Status” tab. There is also a “development mode” which
allows you to run the multi-team bot locally, as if it were running on BeepBoop.

### What next?

You’ll probably want to add some configuration settings, this can be arranged in
[bot.yml](https://beepboophq.com/docs/article/bot-yml) and there are two levels
possible:

* Global config settings are passed in on your BeepBoop project page
* Non-global config settings are passed in by Slack team administrators when they
install your app.

There is currently no datastore available with BeepBoop, so if you want some
persistence you’ll need to provide your own. Apparently they will be adding a
simple key-value store in future. 

It is possible to run your own webserver on BeepBoop — this is useful if you
need to have a webhook for integrating with systems such as Twilio SMS.

If you’re interested in how to develop your bot into a sophisticated
conversational UI using NLP then sign up below to get the next post in your
inbox.

If you can’t wait and you’d like my team and I at Atchai to [develop your chatbot or Slack integration](http://atchai.com), then I’d love to hear from you — [drop me an
email](mailto:john@atchai.com).
