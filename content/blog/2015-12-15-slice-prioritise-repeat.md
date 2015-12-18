---
description: null
author: PhilipOlivier
slug: "Slice-prioritise-repeat"
date: "2015-12-14"
tags: 
  - "null"
published: true
title: "Slice, prioritise, repeat"
---

## Adventures in finding value and making sense of splitting user stories.

We love building products and features that solve problems.

The journey from concept to releasing your product into to wild is an exciting, albeit complex one, with a fair share of challenges along the way.  We’ve worked with many clients to deliver everything from prototypes, to MVPs to market ready products, and two of the common challenges we see on projects big and small are:

* Defining and prioritising value
* Finding the quickest and lowest risk approach to building and validating that value

There are no hard and fast rules when it comes to overcoming these challenges.  We take a flexible approach - what works for one project may not be the best solution for another.

In this post I’ll talk more about these two challenges and share what we’ve learned.

[![xkcd cartoon](/images/the_general_problem.png)](https://xkcd.com/974/)

### What is value?

The Oxford Dictionary defines value as “_The regard that something is held to deserve; the importance, worth, or usefulness of something._”  - quite subjective by definition.  So what does value mean in terms of a product?  I’ve heard it described in terms of number of features a product has, how beautifully it is designed, the overall business objectives, or any combination of these.

It’s not uncommon for the meaning of value to get slightly lost in translation between the parties involved in a project.  We found that the best way to tackle this pitfall is by having the project team work closely with with business stakeholders.  This ensures a shared understanding of how the overall business objectives translate into actionable project tasks.

Let’s get back to how we identify what’s most valuable for the project at hand.  Sure the design and number of features can add value.  However, when we work with clients to build products and new features we like to take a step back and ask “**What is the problem you’re trying to solve right now?**”.  It’s as much a question as it is a challenge to the business case - free from feature and design ideas.  

Asking this question enables us to make sure we’re solving the right problem now; not just a problem.  **Solving the right problem at the right time = value!**

Now that we know how to define and find value, let’s look at how we build it.

### User Stories

We use user stories to capture value into project tasks.  We then prioritise these user stories so that we always build the most valuable user stories first.

User stories are written from a user’s perspective:  As a [type of user], I want [to be able to do something], so that [some benefit].  It’s easy to see why this approach works - phrasing features and functionality this way helps focus us on the value we’re delivering to the end user.

We work iteratively.  In each iteration we deliver the highest prioritised user stories, evaluate the iteration at the end, prioritise the remaining user stories and start all over again.  This ensures that we’re always delivering the best value for the project.

There’s a lot of literature on what a good user story should look like.  We generally agree with Bill Wake on this and follow his [INVEST model](http://xp123.com/xplor/xp0308/index.shtml).  They should be:

* Independent
* Negotiable
* Valuable
* Estimable
* Small
* Testable

Following this model, we split larger stories into smaller stories.  Not only does this help to clarify the scope of each story, but it also reduces risk of building unnecessary features and functionality.  

Stories still need to follow the INVEST model after splitting.  This can get quite tricky sometimes!

Through a learning process we’ve settled on three broad rules of thumb and use a number of patterns to effectively split stories while sticking to the INVEST model.

![Screen Shot 2015-12-15 at 12.47.19.png](/images/Screen Shot 2015-12-15 at 12.47.19.png)

#### **Don’t split stories horizontally - split them vertically**

For example, splitting by architecture ( front-end and back-end user stories) won’t have much value if you only deliver one of them.  However, if you split a story vertically you can deliver small chunks of end-to-end working functionality which has real value.

#### **80% of effects come from 20% of causes and 80% of results come from 20% of effort**

How can we apply this to splitting user stories?   Applying the 80:20 rule means that most of the value of a user story comes from a tiny part of the functionality.  Keeping this in mind when splitting user stories helps us prioritise the more value/less work over the less value/more work.

#### **Keeps things equal**

Split a larger user story into equal smaller user stories where possible.  This makes it much easier to prioritise how value is delivered.

### Splitting Patterns

There are many different patterns to use to split stories.  Below are examples of the ones we use most regularly.

#### **Simple / complex**

The following was a requirement in one of our projects

*“As a [user], I want to add a record, so that…”*

A record had many fields.  Some were standard and some were custom.  In this case we split the ticket into 

*“...I want to add a simple record with standard fields...”*

and 

*“...I want to add a record with (complex) custom fields…”*

#### **By roles**

In the same project there was a requirement for different users to be able to interact with the application in different ways.  We decided to split 

*“As a member of staff, I want to be able to manage session records for clients, so that…”*

into 

*“As an administrator, I want to manage session records for all clients, so that…”*

and 

*“As a support worker, I want to manage session records for my clients, so that…”*

#### **Workflow steps**
	
User stories often involve a number of logical workflow steps.  During a project which required us to build a publishing portal for data, a requirement started out as 

*“As a user, I want to be able to publish data to the portal, so that…”.* 

After working through the details of the requirement with the client we were able to split this story into multiple stories, e.g. 

*“As a researcher I want to submit data for review before it is published, so that…”*

*“As a reviewer I want to edit data before it is published, so that…”*

*“As a reviewer I want to submit data to a team leader to sign off for publication, so that…”*

*“As a manager I want to publish data to the data portal, so that…”*

#### **Happy / unhappy flow**

For our SaaS product, [Dataseed](https://getdataseed.com/), we split the stories along a happy / unhappy flow

*“As a user I want to be able to sign up for a new account…”*

*“As a user I want to be able to cancel my account…”*

#### **Operations (e.g. CRUD)**

Sometimes it is easy to split a story into different operations - watch out for the word “manage”.  For example - the user story “As a user, I want to manage my profile, so that…”  can be split into

*“As a user, I want to create my profile…”*

*“As a user, I want to edit my profile…”*

*“As a user, I want to delete my profile…”*

#### **Defer performance**
	
Where a story has a performance requirement it can usually be split in two

*“I want to be able to search for something…”*

*“I want to be able to search for something in under 2 seconds…”*

#### **Business rule variations**

Some user stories cover multiple business rule variations.  Consider the story 

*“I want to be able to search for orders”*

By looking at the business rules we can split this story into

*“I want to search for orders by area…”*

*“I want to search for orders by client…”*

*“I want to search for orders by status…”*

#### **Major effort**

In some cases there are multiple ways in which a story can be implemented.  The user story 

*“As a user I want to be able to pay for goods I purchase…”*

This could be split into

*”I want to pay with one card type…”* 

and 

*“I want to pay with all card types”*

#### **Data entry methods**

Here is a requirement from [Dataseed](https://getdataseed.com/)

*“As a user, I want to upload a dataset, so that…”*

We realised that the scope of this ticket was as wide as the number of ways in which data could be uploaded.  We decided to split this out into several stories each focusing on the data entry method, e.g.

*“As a user, I want to be able to upload a csv dataset from my computer…”*

As I said before, there are many ways to split stories and the ones described above are the ones we use most often.  We didn’t invent these splitting patterns, but simply observed them and read about them in Agile literature.

By keeping stories small and making sure we’re solving the right problem at the right time we ensure we’re minimising the effort required to go from concept to shipping value.  This makes for happy users and customers alike.

We’re always interested to discuss new and exciting products and ideas.  [Get in touch](mailto:enquiries@atchai.com) to discuss how we can help.