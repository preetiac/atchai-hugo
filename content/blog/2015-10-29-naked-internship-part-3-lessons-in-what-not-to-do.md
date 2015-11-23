---
description: null
slug: "naked-internship-part-3-lessons-what-not-do"
date: "2014-10-29"
tags: 
  - "null"
published: false
title: "Naked Internship Part 3: Lessons in what NOT to do"
author: AndrewLow
header_image: ""
---


Part 3 of a series exposing what it's like to be an intern engineer at a tech consultancy. In this post I describe in detail three lessons that I learnt as part of my project building a SaaS application.

Allow me to share with you my main mistakes.

### Lesson 1: Modularity is good.

The app started out simple enough. Essentially just a collection of Backbone models representing the to-dos and a view to render a list of the todos collection. It soon turned into a tangled mess of spaghetti code (despite using an MVC framework...). Rather naively, perhaps like many new developers before me, I had given insuffient thought to both code organisation and seperation of concerns. All the application code was being written in a single file. All files were kept in the root directory. Here's a tree view of what the project directory looked like at the time:

    ├── app.js
    ├── backbone.js
    ├── backbone.localStorage.js
    ├── index.html
    ├── jquery.js
    ├── style.css
    ├── underscore.js

For comparision sake, here's what it looks like now that I've become more aware of project structure:

    ├── models
    ├── static
    │   ├── css
    │   ├── images
    │   ├── js
    │   │   ├── collections
    │   │   ├── models
    │   │   ├── routers
    │   │   └── views
    │   ├── templates
    │   └── tests
    ├── templates
    └── views
        ├── api
        ├── error
        └── page

(I've omitted the actual files in this diagram, only the directories are visible, which should give some indication as to how out of hand the project would have become to maintain had I left everything in the same root directory, never mind the same file!)

### Lesson 2: Adhere to naming conventions.

As time went on the structure of my code became harder and harder to maintain. I had large chunks of logic related to models handled by the views. Additionally my code style and variable naming conventions were all over the place, no consistency. Coming from a mathematics heavy background, in my mind variable and function names were always represented by single latin/greek letters. It took some getting used to having to think of relevant, informative-at-a-single-glance names for my variables. I would name some (most) of my variables something to the effect of 'x', test' or 'thingy' when playing around trying to implement a new feature and then just leave them like that. In retrospect, this obviously does nothing to help someone trying to read through and understand my code. Make names as descriptive as possible (but not too long) such that it can be instantly apparent what the variable or method represents.

#### Lesson 2.1: Make good use of comments in your code.

On top of this, there were almost no comments within the code to help explain what anything did. During code reviews, one would have to trawl through my densely written functions which did way too much, with horribly uninformative variable names. Not everyone is me. They can't read my minds and understand why I wrote x in y way.

### Lesson 3: Functions should strive to only do one thing.

This ties into my first point about modularity but on a more micro scale. Dense functions that do a lot is not only bad because it reduces comprehensibility, it also makes debugging and testing the code a lot more arduous. Having functions that do too much is something that sometimes still plagues me. To counter this, I find it helpful to step back every few commits to look back through my code and see if I can do any refactoring (as well as commenting). I've noticed that a large amount of my time developing is spent chiselling down functions, refactoring components out into their own function such that each function does only a single thing. In this way, functions are not delegated with a bunch of responsibility they need not have. Consequently, readability increases, and unit tests become easier.
