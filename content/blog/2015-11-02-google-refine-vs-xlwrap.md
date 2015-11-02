---
description: null
author: JohnGriffin
slug: "google-refine-vs-xlwrap"
date: "2011-09-05"
tags: null
published: false
title: Google Refine vs XLWrap
---

We've been using [XLWrap](http://xlwrap.sourceforge.net/) as a tool to take data from spreadsheets and turn it into RDF triples.  At the time we started using XLWrap, there was no alternative that would enable us to generate multiple triples from one cell in a spreadsheet (we'll explain why this is important later), and there was also no [Google Refine](http://code.google.com/p/google-refine/).  The product that would later become Google Refine was called Freebase Gridworks, but at the time we were evaluating tools it had no RDF support, so didn't really qualify.

Now that's all changed.  Google Refine is a great tool for cleaning up messy data (which open data so often is) and now that it has the [RDF extension](http://lab.linkeddata.deri.ie/2010/grefine-rdf-extension/), built by the smart folks at [DERI](http://www.deri.ie/), it's time to re-evaluate and see if it should form a part of our <a href="portfolio/linked-data-platform">Linked Data Platform</a> tool-chain.

## Criteria
There are a few things that we think are really important for this part of our toolchain, we will use these as criteria to compare XLWrap and Google Refine.  The main things we're interested in are:

* Ability to generate SCOVO or datacube triples from spreadsheet (csv) input
* Capturing provenance throughout the process
* Scriptability - able to act as part of an Extract, transform and load (ETL) pipeline
* Dealing with updates to source data, output only changes.
* Ease of use
* Project momentum and developer community

It's important to be able to generate multiple triples for each cell in the spreadsheet, because in [datacube](http://publishing-statistical-data.googlecode.com/svn/trunk/specs/src/main/html/cube.html)</a> we create one Observation resource for each cell, but we also want to attach properties for the dimensions and measures associated with this observation.  For example, a cell in the spreadsheet could have a value of "76.6", but this may represent the average life expectancy of a female in Newport in 2004.  We may model this in datacube as:

       eg:o1 a qb:Observation;
            qb:dataSet  eg:dataset-le1 ;
            eg:refArea                 admingeo:newport_00pr ;                  
            eg:refPeriod               <http://reference.data.gov.uk/id/gregorian-interval/2004-01-01T00:00:00/P3Y> ;
            sdmx-dimension:sex         sdmx-code:sex-M ;
            sdmx-attribute:unitMeasure <http://dbpedia.org/resource/Year> ;
            eg:lifeExpectancy          76.7 ;
            .

## Findings

<table>
<thead>
<tr>  
  <th width="33%">Criteria</th>
  <th width="33%">XLWrap</th>
  <th width="33%">Google Refine</th>
</tr>
</thead>
<tbody>
<tr>
  <td>Overview.</td>
  <td>Java program designed for the purposes of mapping spreadsheets to RDF.  Uses templates written in trig syntax (similar to Turtle) to describe how to iterate over a spreadsheet, one cell at a time, along with the graph of triples to generate for each cell.  Uses Tika to support a number of spreadsheet formats, and runs a triple store locally so you can edit your templates and run sparql queries against the resultant triples.</td>
  <td>Binaries available for most platforms, runs a server that you interact with through the browser. The interface is very user-friendly, it's primary goal is to assist with cleaning up messy data, and along with graphical tools there is a rich language to support almost any conceivable operation.  Support XLS, csv, google spreadsheets.  Allows export to a number of formats, including RDF.</td>
</tr>

<tr>
  <td>Ability to generate SCOVO or datacube triples from spreadsheet (csv) input.</td>
  <td>Yes</td>
  <td>Yes</td>
</tr>

<tr>
<td>Capturing provenance throughout the process.</td>
  <td>No</td>
  <td>No</td>
</tr>

<tr>
<td>Scriptability - able to act as part of an Extract, transform and load (ETL) pipeline.</td>
  <td>Yes, all transformations are captured in a template file.  A feature we have added to XLWrap is the ability to pass parameters in on the command line that replace tokens in the templates at runtime.</td>
  <td>Not really, though you can capture a set of transformations in order to play them back over different data, there is no command line utility to help us script repeat processing.  As Refine runs a server you could always simply capture and play back requests, there are more sophisticated approches along this line such as this <a href="https://github.com/PaulMakepeace/refine-client-py">python client library</a> for interacting with Refine server programatically.</td>
</tr>

<tr>
<td>Dealing with updates to source data, output only changes.</td>
  <td>No</td>
  <td>No</td>
</tr>

<tr>
<td>Ease of use.</td>
  <td>Only for developers who are familiar with turtle and Java.</td>
  <td>Comparatively, very easy to use.  Comes with installers for main platforms, and a nice graphical interface. </td>
</tr>

<tr>
<td>Project momentum and developer community.</td>
  <td>Not really</td>
  <td>Yes, lots!</td>
</tr>

<tr>
<td>Additional notes</td>
  <td></td>
  <td>One very interesting feature is reconciliation, which allows us to query an arbitrary sparql endpoint and use algorithms to normalise our data against references.</td>
</tr>
</tbody>
</table>

**NOTE:** We have made a number of refinements to XLWrap in order to be able to meet some of our criteria.  Our [fork of XLWrap](https://github.com/markbirbeck/xlwrap) is available on Github.


## Unmet Criteria

You will notice that neither of the tools really address the following criteria well:

* Capturing provenance throughout the process
* Dealing with changes to source data, updating triples accordingly

We're currently investigating using [ORDF](http://ordf.org/), which should enable us to store provenance information alongside changes to the data, and update the resultant datacube triples accordingly if the source data changes.  It also has the benefit of allowing pluggable back-ends, currently supporting 4Store, Xapian and others.  We are looking at using an inverted index (Apache Solr or Elastic Search) to drive the UI, mainly because we're finding that querying the triple store directly does not perform as well as we'd hope.  More on this later!