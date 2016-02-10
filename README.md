Atchai.com marketing website based on Hugo. There is a [full write up](http://atchai.com/blog/the-cms-is-dead-long-live-hugo-wercker-proseio-and-cloudfront/) on the Atchai blog. This is just a standard Hugo project with the following modifications:

* Custom theme in theme/atchai
* Markdown content in /content
* Static content (e.g. images) in /static
* Hugo config in /config.toml
* Werker config in /wercker.yml
* Prose.io config in /prose.yml
* S3 redirect rules in redirects.xml

## Getting Started
1.  ```git clone https://github.com/atchai/atchai-hugo```
2.  Install Hugo:  http://gohugo.io/overview/installing/
3.  Run local development server, watching filesystem for changes and live reloading in browser
```hugo server --watch --verbose```


## JS / CSS Pipeline
* ```cd themes/atchai/static```
* ```bower install```
* add bower dependencies into src folder
* compile /src/sass/index.sass into /dist/css/index.min.css
* compile /src/respond/src/respond.js into /dist/js/respond.min.js
* compile /src/bootstrap-sass/assets/javascript/bootstrap.js into /dist/js/bootstrap.min.js
* copy /src/html5shiv/dist/html5shiv.min.js into /dist/js directory
* copy /src/jquery/dist/jquery.min.js into /dist/js directory

## Deployment Workflow
Wercker has been set up to generate the static site, then deploy to Amazon S3.  

The site is currently automatically deployed to:  http://stage.atchai.com


## Adding / editing content with Prose.io
Prose.io will connect to the Github repo, allow you to add/edit content of the site, and then commit these changes.  Once your changes are committed and pushed, Wercker will automatically deploy.

1.  Go to http://prose.io
2.  Log into Github and select the appropriate repo
3.  You will land in the "/content" directory, can add or edit any file within here.
4.  Filenames are generated automatically from titles.
5.  URLs are generated in order of precedence from the URL metadata, then the filename.
6.  Images will be uploaded into static/images
7.  Use the "metadata" button on the RH pane to set the front matter.
8.  Use the "preview" button on the RH pane to check the formatting - this will not apply the real website theme.
9.  To publish, use the "save" button on the RH pane.  Enter a short commit message to describe your changes.
10.  Wait approx 1 minute and the site will be rebuilt and deployed.


