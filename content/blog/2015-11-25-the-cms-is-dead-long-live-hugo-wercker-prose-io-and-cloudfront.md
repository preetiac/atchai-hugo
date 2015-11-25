---
description: null
author: JohnGriffin
slug: "the-cms-is-dead-long-live-hugo-wercker-proseio-and-cloudfront"
date: "2015-11-25"
header_image: ""
tags: 
  - "null"
published: false
title: "The CMS is dead. Long live Hugo, Wercker, Prose.io and CloudFront"
---

We recently redesigned our [tech consultancy](http://atchai.com/)’s website. After considering our requirements, we realised with significant joy that we could jettison our 5-year old CMS ([Drupal](https://www.drupal.org/)) in favour of a Static Site Generator.

Over the last few years we’ve been using smaller components in the software stacks that we deploy for client projects. Some people call this a [microservices architecture](https://en.wikipedia.org/wiki/Microservices), composing complex applications from small, independent services, allowing you to easily switch out and upgrade parts of your stack. So, why not apply the same thinking for our company website?

On [Atchai.com](http://atchai.com/), there is no need for users to log in, everyone sees the same content on every page. Most pages on the site get updated infrequently, the blog is the only section with regular updates — for this reason we want to provide some simple UI that non-technical staff can use to create blog posts.

![atchai.com](/images/Screen%20Shot%202015-11-25%20at%2015.26.04.png)

In this post I’ll talk through the technology choices we made and describe the seriously fast, flexible and scalable architecture that we ended up with. I’ve made the [code for our new website](https://github.com/atchai/atchai-hugo) public on Github, so feel free to follow along at home.

# What do we need?

* **Static Site Generator:** a simple framework to build the deployable code from it’s components of content, theme and configuration.
* **Content Editing UI:** for non-technical staff to create blog posts.
* **CI tool:** automatically deploys the site when content is updated.
* **Hosting:** our site has to live somewhere.

## Static Site Generator

tl;dr — we chose [Hugo](https://gohugo.io/) because it is really well documented, blazingly fast and has Goldilocks proportions and sane defaults for sites like ours.

Why use a static site generator instead of a CMS in the first place? With a CMS you need to host a complex stack of software just to serve your site, typically you need a web server, a database, an application and then some caching. In our case the same content is served to every user, so our caching could effectively be a set of static HTML pages that are generated every time content on the site changes. What’s the point in hosting this CMS on a publicly accessible server, paying for all the complexity and increasing the attack surface area for hackers?

If you’re sold on the concept, check out this great listing of the [top open source static site generators](https://www.staticgen.com/). Our short-list included [Middleman](https://middlemanapp.com/), [Jekyll](http://jekyllrb.com/), [Hexo](https://hexo.io/), [Pelican](http://blog.getpelican.com/), and [Assemble](http://assemble.io/). My immediate bias was towards Pelican, Hexo or Assemble as they’re built with either Python or Javascript — languages we regularly use at Atchai. However, it turns out that this isn’t really such an important criteria unless you’re really going to town on the customisation. Most configuration in Hugo can be done in either json, yaml, or toml, and the template engine used is Go’s html/template which is [simple enough](https://gohugo.io/templates/functions/) for most things like looping through blog posts to create a listing page.

After running through Hugo’s excellent [Getting Started](https://gohugo.io/overview/introduction/) documentation, it became clear that all our requirements were met out the box. Here’s what we got, it might help you to compare against alternatives.

* More than just a blog, we also need home, about and portfolio pages.
* Easy to build our own theme from scratch, no defaults to override.
* Theme that supports composition (partials) for header/footer.
* Can automatically build listing pages for the blog, with pagination.
* Simple URL pattern that can be overridden with front-matter so that we can preserve the URLs of migrated blog posts.
* Server with watch and live reload — significantly speeds up development.
* Minimal dependencies (Hugo is just a single binary).
* Vibrant community and active development.

To set up your Hugo site you need to add your content and build your theme. All your markdown content lives in “/content” and I’d recommend keeping your images in “/static” if you can. There are plenty of pre-built themes to choose from if you don’t want to design your own. However, if you have a full design then I’d recommend following this excellent [tutorial to create a brand new theme](http://www.humboldtux.net/sbcb-demo/post/post-01/).

# Content Editing UI

There’s a pretty massive discussion going on around [whether Hugo should have it’s own CMS-like UI](https://discuss.gohugo.io/t/web-based-editor/155/22). You can probably tell which side of that I’m on from my micro-services rants.

Ultimately we chose [prose.io](http://prose.io/) because:

* **It’s cloud-hosted** — our non technical staff can log in from anywhere, we don’t have to worry about hosting and maintaining it.
* **It’s SSG agnostic** — well, it’s configurable but it does have a legacy of being written for Jekyll and it still smells a bit.
* **It can handle image uploads**
* **It integrates with Github** — you sign in with your Github account, select your repo, edit content then commit your changes.
* **It’s free, open source, and lightweight!**

If you go with prose.io and Hugo, you might want to use our [prose.yml configuration](https://github.com/atchai/atchai-hugo/blob/master/_prose.yml) as a starting point. It has been configured to only show the “/content” directory, upload images into “/static/images” and create proper metadata fields for the front-matter that we use.

# CI Tool

We normally use [Travis CI](https://travis-ci.org/) to automatically run tests and deploy code. However, I noticed that [Wercker](http://wercker.com/) has nice simple plugins to build a Hugo site and deploy to S3, so it was a good opportunity to check out a new tool.

Use this doc to [set up wercker to automatically build your Hugo site](https://gohugo.io/tutorials/automated-deployments/), then swap out the Github Pages deploy step for the one that you can see in our [wercker.yml](https://github.com/atchai/atchai-hugo/blob/master/wercker.yml) config. You will need to set up the variables for the S3 deploy step in wercker’s UI, note that this is done by adding a _Deploy Target_, rather than _Environment Variables_. Your new Deploy Target settings should look like this:

![hugo post image1.png](/images/hugo post image1.png)

## Hosting

Given that our site is static, we have plenty of hosting options! We often use [Amazon Web Services](https://aws.amazon.com/) or PAAS offerings that are built on AWS.

S3 is great for static sites but it has quite high latency and only 99.9% guaranteed uptime. That means our site could be down 0.365 days each year — not good enough!

Luckily, there’s a simple way to keep deploying to S3 and improve both the availability and speed of the site by adding [CloudFront](https://aws.amazon.com/cloudfront/) — Amazon’s CDN that provides nodes all over the world, serving your content to your users from the closest node to them.

It takes just a few minutes to add a CloudFront _distribution_ that’s backed by the S3 bucket we’re already deploying to. We set up a custom domain and added an SSL certificate for good measure.

Bear in mind that if you want to serve your whole site on CloudFront from your apex domain (example.com with no subdomain), you will need to use Route53 as your nameserver. Other DNS services can provide the Alias record that is required to support this, but the problem is that they will resolve to the edge node closest to the DNS server. We haven’t fully tested this but the assumption here is that route53’s globally distributed DNS servers should resolve to the nearest CloudFront edge node.

Bear in mind that now when we deploy there is a delay before changes are propogated to the edge nodes. You can invalidate the CloudFront cache manually, and we chose to turn this into a feature, using S3 as our staging environment, where we can test work before it appears on our CloudFront production environment.

The best part of this high-availability hosting solution that’s served from a global CDN is the cost, clocking in at less than £1 /month in total.

# Known Issues
No solution is perfect, and the following issues are quite annoying!

* Commit Noise — every time we add/edit content or upload an image from Prose.io, a commit is made. We will look into ways to have separate repositories for content and configuration.
* Prose’s Jekyll legacy — in particular the fact that when you insert an image it insists on prepending {{ site.baseurl }} to the path, GRRR. There’s an [issue for that](https://github.com/prose/prose/issues/842).
* Cloudfront will not deal with gzipping your content. We’ll have to use this method of hosting gzipped files in our S3 bucket for Cloudfront to serve to our users.
* S3cmd (as used by the Wercker S3 deploy step) does not guess the MIME type of SVG files correctly. Without the correct MIME type served in the Content Type header, most browsers will not display SVG images.

# So…

Overall, we’re really happy with the solution outlined in this post. We have a set of simple components, each of which can be switched out easily, and the resultant website is much faster and more secure than the one it replaced.

[Atchai](http://atchai.com/) typically builds sophisticated data-driven applications, so this is a bit of a departure! However, we believe in using the right tools, and avoiding over-engineered solutions . We’d be delighted to have the opportunity to apply our creative thinking and software development skills to your project — [let’s talk](mailto:enquiries@atchai.com).