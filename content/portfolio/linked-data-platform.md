---
title: Linked Data Platform for NHS
date: "2013-08-11"
---

The Linked Data Platform is an open source tool-kit that enables the creation of semantically rich, web 3.0 applications, driven by structured and semi-structured data. 

We have successfully deployed the LDP as a basis for dataShuttle - an application that takes as it’s input statistics about health problems. It links these up with RDF data such as Ordnance Survey geo-data, to visualise the statistics in a variety of ways, using maps and charts. dataShuttle is developed in association with Sidewinder Labs and the [NHS National Innovation Centre](http://www.nic.nhs.uk/), but as an [open-source project](https://github.com/sidewinderlabs/dataShuttle) it is open to all to contribute. 

## Technology 

The LDP uses XLWrap to convert spreadsheets and semi-structured data into RDF, which is stored in Virtuoso. This data can then be linked up with data from other triple stores to drive visualisations that are designed to assist discovery of links or trends. A domain-specific ontology may be added, to perform inference over the data, and also to drive the user interface with terms from an appropriate vocabulary. 

Drupal is used to drive the UI, creating nodes and views from RDF data using [Feeds rdf_importer](http://drupal.org/project/1085078/git-instructions) and [sparql_views](http://drupal.org/project/sparql_views) modules respectively.

![technology screenshot](/images/Screen%20shot%202011-08-18%20at%2016.16.48_2.png) 
 
The code is available on Github. It currently only contains drush make scripts, features and modules to build the Drupal part of the architecture. It is on the roadmap to provide Chef scripts that will create servers for the various other components: XLWrap, Virtuoso, ElasticSearch etc. These Chef scripts can be run by Vagrant locally to build a VM that contains everything you need. 

* [dataShuttle repo on Github](https://github.com/sidewinderlabs/dataShuttle) 
* [LDP repo on Github](https://github.com/sidewinderlabs/linked-data-platform) 
* [XLWrap repo on Github](https://github.com/markbirbeck/xlwrap)

## Related Blog Posts 
* [Linked Data Platform Architecture mk II](/blog/linked-data-platform-architecture-mk-ii) 
* [Google Refine vs XLWrap](/blog/google-refine-vs-xlwrap) 
* [A Semantic Web Platform for Health Data - Semtech London 2011](/blog/semantic-web-platform-health-data-semtech-london-2011) 

## Using the Linked Data Platform 
We'd be interested to hear from anyone who makes use of the code we've released as open-source. If you're interested in how the Linked Data Platform could help you combine, analyse, and visualize your organisation's data them please [contact us!](#contact)