---
author: JohnGriffin
date: "2016-06-30"
published: true
title: "Creating a Simple Slack Bot with Botkit.js and Hosting It For Free"
---

<p style="text-align: center;"><strong>From Development to Deployment as a Custom Integration</strong></p>

Recently I decided to check out [BeepBoop](https://beepboophq.com/) — a new
hosting service designed specifically for chat bots. Fortunately Beepboop has
created a nice library that integrates with
[Botkit](https://github.com/howdyai/botkit), making it easier than ever to
develop simple chat bots and deploy them on cloud hosting. Currently only Slack
and Facebook Messenger are supported, but I expect that more platforms will be
added. Their pricing is very reasonable with a free plan avilable and paid plans starting at $10 / month.

In this article we’ll create a Slack Bot, run it locally and then deploy it on
BeepBoop as a custom integration. We’ll take this step by step, but you can skip the next section if you already
have a bot to deploy.

### Let’s make a bot

All the code we’re going to write is available in [this
repo](https://github.com/atchai/beepboop-bot). However, to make sure we fully
understand what’s going on, let’s go one step at a time and develop a toy chat
bot that contains just the bare minimum that we need. Assuming that you have a
node.js environment set up with npm, we’re just going to create two files:

* package.json
* index.js

First create a **package.json:**

<script src="https://gist.github.com/johngriffin/0cd546d631b32e379df5fd0fb17af921.js"></script>

Here we’ve included the beepboop-botkit and botkit libraries, and defined how
npm can start our app, which will live in index.js.

OK, here’s **index.js:**

<script src="https://gist.github.com/johngriffin/643a49c98d0aeda67a663f3aa95a709a.js"></script>

Let’s just walk through what’s going on here.

First, note that this code only uses the Botkit library — this is all we need to
run this bot locally as a [custom
integration](https://api.slack.com/custom-integrations). We’ll pass in an
environment variable for “SLACK_TOKEN” which we’ll get when we set up a Slack
custom integration with in the next step.

Next we use the Botkit.slackbot constructor to return a controller object. The
controller object then spawns a bot instance, which will connect to the Slack
RTM ([Real-time messaging API](https://api.slack.com/rtm)) using the SLACK_TOKEN
that we’ll pass in.

Now we register two event handlers on the controller. The first will listen for
the event “bot_channel_join” which should be fired when our bot is invited into
a channel. The callback function will then send a message to the channel saying
“I’m here”.

The second event handler listens for a message that says “hi”, and is of any of
the following types, which should catch everything: [‘ambient’,
‘direct_message’, ’direct_mention’, ’mention’]. Note that the first parameter is
a regex, which is about as sophisticated as botkit gets for disambiguating
intents.

### Running Locally as a Custom Integration

Just a few steps before we can talk to our bot.

* Go to your Slack team’s “Apps and Integrations” page, and select “Make a custom
integration”.

![Develop a Slack Custom Integration](/images/blog-slack-bot-custom-integration.png)

* Select “Bots” and follow the steps to give your bot a username.
* You should now have an API Token, starting “xoxb-”
* Let’s start the bot:

```
npm install
SLACK_TOKEN=<YOUR_SLACK_TOKEN> npm start
```

Assuming you get no errors you should see your bot’s username appear in your
Slack team. Open a direct message window with the bot and say “hi” — you should
get a “Hello” in return.

Good! Now commit your code to a git repo and push your code up to Github —
you’ll need this for the next step.

### Deploying as a Custom Integration

Sign up at [https://beepboophq.com](https://beepboophq.com) with your Github
account. There’s a good on-boarding process that runs on Slack, but there’e no
need to go through this as it will fork an example repo for you, which you don’t
need to do if you’re following this article and creating your own bot.

Next we need to [create a new project](https://beepboophq.com/0_o/my-projects),
and select the Github repo that you’ve pushed your code to. Beepboop will set up
a webhook that will re-build your project on every commit to the master branch.

![Build Slack Bot](/images/blog-slack-bot-stopped.png)

Now we need to add a couple of files to tell BeepBoop how to build our project.
All bots run as docker containers, so the first file we need to add is called
**Dockerfile:**

<script src="https://gist.github.com/johngriffin/82416f949a5ac662f5aa0477d6da7ac1.js"></script>

Next we need to provide a bit of metadata about our bot — this goes in a file
called **bot.yml**:

<script src="https://gist.github.com/johngriffin/92a1a0429b2d1bd50e0c58380df66d1b.js"></script>

Your project should now contain these four files:

* bot.yml
* Dockerfile
* index.js
* package.json

Go to your project page on BeepBoop and click the “settings” tab. Turn on
the switch for Slack support and enter your API token in the SLACK_TOKEN text
field.

![Slack bot settings page](/images/blog-slack-bot-settings.png)

Commit the changes to the repo and push to Github. Go back to the Status tab and
you should see Beepboop building your project. Once the build is done you can
click “Start Bot” — you should see your bot come online in Slack.

### Great! What Next?

If you’d like your bot to be used by multiple teams then you need to follow this
article showing how to [deploy your bot as a multi-team slack app](/blog/2016-06-30-develop-multi-team-slack-bots.md)

If you’re interested in how to develop your bot into a sophisticated
conversational UI using NLP then sign up below to get the next post in your
inbox.

If you can’t wait and you’d like my team and I at Atchai
to help [develop your chatbot or Slack integration](http://atchai.com), then I’d love to hear from you — [drop me an
email](mailto:john@atchai.com).


