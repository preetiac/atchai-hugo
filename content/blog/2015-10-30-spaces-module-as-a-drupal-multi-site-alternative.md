---
description: null
slug: "spaces-module-drupal-multi-site-alternative"
date: "2011-08-20"
tags: null
published: true
title: "Spaces Module as a Drupal Multi-site alternative"
author: "JohnGriffin"
---

If you want to share users, content and configuration between Drupal sites you have several options. The most common approaches are either to use a multi-site architecture, RSS feeds, or domain access module. In this post, I'll discuss an alternative method using Spaces and PURL modules, a highly flexible architecture that enables you to tailor multiple spaces that can appear to be completely independent sites, but which all run from the same Drupal installation.

## Our Use Case
[Watershed](/portfolio/watershed) is a hub for arts, culture and creativity in the South West of England, running an independent cinema and funding various projects, such as the Pervasive Media Studio. They approached us and told us about their problem of maintaining so many online properties, representing sub-brands and projects under the Watershed umbrella. Not only was it the cost of maintaining and integrating systems built on many different technologies, but they also wanted to promote and facilitate content sharing between groups that has historically been digitally segregated. We were engaged to design a technical architecture that would consolidate Watershed’s various digital properties.

## Requirements
The requirements in Drupal terminology are:

* Each site appears on a subdirectory URL of one main domain.
* Ability to share content and users between each site
* Shared sign on, with ability to grant users access to each site individually
* Ability to easily add another site that inherits it's functionality and visual appearance
* Ability to completely override the appearance and functionality of a site

## Implementation Options
### Multi-site
Part of Drupal's core functionality is the ability to run multiple sites from one codebase, sites can share certain database tables, but this is not required.  In order to share content and users we would have to share some users and node related tables.  This approach of sharing at the database level quickly becomes problematic, and can be disasterous when you want to unravel it and move a site off on it's own.  As well as with having no real native support for restricting users access to sites individually or denoting which sites content should appear in, there is no way to turn on and off functionality across each site.

### Domain Access Module
This is a probably the most widely used solution for a use case such as ours.  [Domain Access](http://drupal.org/project/domain) module hooks into the node_access table to enable content to be assigned to a particular site.  There are also a number of submodules for domain access that enable to tailor the functionality and appearance in each site,  single sign on is also achievable.  The downside is that domain access hooks in all over the place to achieve these feats, and in order to override something on a domain basis, there must be a domain submodule that will hook into the appropriate places for you.  

This approach is messy and means that the domain_access module has to keep adding code when something new needs to be overridden.  There are some particularly egregious examples, such as the domain_theme sub-module, which allows you to set the theme for each domain, yet this could be achieved as part of a more generalised domain_variables module - since the active theme is set in a variable.

### Sites Module
This is quite an interesting approach, and the newest of all.  It's [project page](http://drupal.org/project/sites) says that it's designed to be a more lightweight alternative to the Spaces module, integrating PURL directly with context and views.  Unfortunately, I believe that Sites is perhaps a little too lightweight since it doesn't rely on Features, which, along with Strongarm, allow us to capture just about any aspect of Drupal configuration in code.  This has a [tremendous advantage](blog/drupal-features-module-presentation) to your workflow when building and updating Drupal sites, so there is really very little reason to not be using Features module.  By not depending on Features to capture the configuration, it appears Sites module is really putting itself in a position where it has to re-invent the wheel in a similar fashion to domain_access.

## Our solution
Both [Spaces](http://drupal.org/project/spaces) and [PURL](http://drupal.org/project/purl) modules certainly comply with the unix philosophy of "Do one thing and do it well".  This is a great philosophy to build modules by, in my opinion, as it encourages a wide range of lightweight tools that can be plugged together in a variety of ways.  The flip-side is that you are left with a number of options for how you can configure and plug these modules together, which can make the process seem quirky first time around.

PURL allows you to define rules based on URL patterns, depending on paths, domain, subdomain and more.  Spaces can be set to be activated when one of these rules is triggered.  Spaces then allows you to override the appearance and functionality of the site within a particular space, by switching on and off features, and overriding variables.

![prul.png](/images/prul.png)

The figure above shows two spaces that we defined, the first is what we call a default space, so this space will be set even if no modifier is found in the path.  This is not something that spaces deals with natively, so this is explained in more detail below.

## Technical Challenges
1.  Spaces and PURL assume that there is the global site, and then there are spaces within that site which are triggered when certain URL patterns are present.  We want to do something slightly different here, we want a user to always be in one of the spaces; even though the Watershed site can be thought of as the parent/global site, we do not necessarily want it to contain all content, we want to be able to select the content that appears on the Watershed site in the same manner as all the others.
We had to invent the concept of a default space, or a space that would be activated when there were no modifiers present in the URL pattern.   In order to achieve this, we wrote a PURL processor plug-in, which we've released as a separate module - [purl_default](http://drupal.org/project/purl_default).

2.  We want to be able to set content to appear in multiple spaces, but each node should have a primary space that is redirected to when the content is requested.  By using this patch along with primary_term module, we were able to achieve this  [http://drupal.org/node/828416](http://drupal.org/node/828416)

3. There should be a canonical url for all nodes.   This patch to PURL helps with that [http://drupal.org/node/828384](http://drupal.org/node/828384) by adding a `<link name="canonical" />` to all content that appears in more than one space.

4.  It's possible to make views and panels spaces-aware.  So for views you have the option of only selecting nodes that are tagged with the active space, and panel variants can be defined based on the active space.  The [spaces_panels module](http://drupal.org/node/769522) allows you to achieve this.

## Conclusion
All these solutions work in quite different ways, so ultimately the best choice will depend on your use case.  We found that it took a fair amount of configuration, patching and a little extra code, but the spaces/purl solution works really well for us.

The main thing I like about this approach is that is stands on the shoulders of giants, using Features to capture the configuration for each space, and taxonomy to define the spaces and assign content.  

This site was only to be available in one language, but I fear that there would be some complications if you were to try to use i18n module with PURL, adding language subdomains or path modifiers to the mix.  Scalability would also be a concern on very large sites as you are running the sites all from one database, but if you are able to use a mysql-compatible cloud service, Amazon RDS for example, and doing mostly reads, then this would probably not be an issue.

I think it's a perfect alternative for many cases where we would have used multi-site or domain_access in the past.  And the ability to quickly create a new space from a preset makes it ideal for cases where you want to quickly generate microsites or sub-sections that need to inherit a lot of functionality while allowing the flexibility to override anything on a space-by-space basis.
