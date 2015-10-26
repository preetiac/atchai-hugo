Atchai.com marketing website based on Hugo.  This is just a standard hugo project with the following modifications:

* Custom theme in theme/atchai
* Markdown content in /content
* Static content (e.g. images) in /static
* Hugo config in /config.toml
* Werker config in /wercker.yml
* Prose.io config in /prose.yml

##Getting Started
1.  ```git clone https://github.com/atchai/atchai-hugo```
2.  Install Hugo:  http://gohugo.io/overview/installing/
3.  Run local development server, watching filesystem for changes and live reloading in browser
```hugo server --watch --verbose```


##Deployment Workflow
Wercker has been set up to generate the static site, then deploy to Amazon S3.  This has been set up on JG's Wercker account currently, we should move/share this, and decide on whether we need separate stage / production environments.

The site is currently automatically deployed to:  http://atchai-marketing-stage.s3-website-eu-west-1.amazonaws.com/


##Adding / editing content with Prose.io
Prose.io will connect to the Github repo, allow you to add/edit content of the site, and then commit these changes.  Once your changes are committed and pushed, Werker will automatically deploy.

1.  Go to http://prose.io
2.  Log into Github and select the atchai/atchai-hugo repo
3.  All content lives in "/content" and it's URL is by default it's path within the "content" directory.
4.  You can add or edit files within "/content", ensure that their filenames are set correctly and end in .md. 
5.  Use the "preview" button on the RH pane to check the formatting - this will not apply the real website theme.
6.  To publish, use the "save" button on the RH pane.  Enter a short commit message to describe your changes.
7.  Wait approx 1 minute and the site will be rebuilt and deployed.

### Migration of blog posts
* When migrating blog posts, go to "content/blog" and click the green "New File" button.  
* Copy and paste the text of the blog post and format using the wysiwyg editor.  
* Images should be downloaded in their full size format from Drupal, then uploaded into /content/blog/images.
    * The full size image should be available for download at:  http://atchai.com/sites/all/files/blog/ _FILENAME_
    * Use the Image button in the toolbar of prose.io to import
    * Before clicking "Insert", manually change the Image URL value to "content/blog/images/_FILENAME_" from "content/blog/_FILENAME_"
* Set up the "front matter" appropriately, annoyingly it will not be ignored in the prose.io preview.  Use the below as a template, it contains values for this blog post: http://atchai.com/blog/linked-data-platform-architecture-mk-ii
```
---
title: "Linked Data Platform Architecture mk. II"
description: "This is a test blog post."
tags: [ "technical", "semantic web"]
date: "2011-09-19 "
slug: "linked-data-platform-architecture-mk-ii"
---
```

