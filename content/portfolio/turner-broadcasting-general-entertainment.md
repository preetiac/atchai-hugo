---
title: Turner Broadcasting - GE Framework
date: "2014-06-11"
---

Turner Broadcasting is home to some of the most recognisable global entertainment brands, such as Boomerang, Cartoon Network, CNN, TCM, and TNT. We’re engaged by Turner Broadcasting to create a platform that enables the rapid roll-out of websites for their General Entertainment brands across Europe, the Middle East and Africa.

> John and his team came up with a technical approach that has proven to offer huge efficiencies in the production of TV channel support websites.

![Turner GE sites](/images/iMac_combo.png)

## Solution 
Atchai Digital developed the platform architecture, undertook the creative and the development and delivered each brand site using our enterprise CMS [technology stack](#technology). The project is managed end-to-end with our [Agile process](#process). The framework supports multiple sites, each of which can turn shared functionality on or off. Instances of sites can be deployed for regions, content can be shared and translated for each regional language. To date, we have delivered three products within the framework: [TNT Benelux](http://www.tnt-tv.be/), TNT Nordic (in [Swedish](http://www.tnt-tv.se/), [Norwegian](http://www.tnt-tv.no/), [Finnish](http://www.tnt-tv.fi/) and [Danish](http://www.tnt-tv.dk/)), and Star TV (in [Africa](http://www.starafrica.tv) and [Nordic](http://www.startv.nu/) regions.)

![Hierarchy of sites and regions](/images/SFC.png)

### Key Objectives and Our Approach 
#### Enable fast and efficient roll-out of new GE-brand websites 
We use an [Agile process](#process), writing user stories to capture stakeholder requirements, and keep us focussed on where the value is when prioritising features each sprint. Drupal allows us to develop functionality in a generic way, so that it can be easily shared across sites. Our continuous integration process, with human and automated testing environments, reduces risk in deployments, helps us manage regression bugs, and ensures a stable, robust product. The time to build a new channel site has been reduced from months to weeks. 
#### Maximise flexibility for regional website editors 
Drupal's multi-lingual and internationalisation capabilities allow us to deploy the same site for multiple regions, and define a editorial workflow to match the requirements of the content editors. Some regions have multiple languages, in which case it's possible to share content and assets, and promote different content for each language. This has opened up new possibilities for producers and content editors, facilitating content sharing and saving time managing sites. 
#### Optimise for mobile 
We used a responsive design approach, developing the IA for three core device formats - desktop, tablet and mobile. Design patterns were developed following best practices that could be applied across all brand sites. A base theme was developed so that core mobile / tablet / desktop styles are inherited when creating a new site, meaning that there is minimal effort required to support all devices when rolling out a new site. #### Each brand site must have a unique identity After digesting the requirements and understanding the audience for the first brand sites, we developed an information architecture with flexible elements that could be switched in/out, transformed and heavily styled. For each brand site, we then consider the audience and existing brand style guides to produce visual designs based on our wireframes. By simply theming our core elements, and overriding where necessary, we're able to ensure that each site maintains it's positioning and has a unique look and feel, without increasing the development cost.

![](/images/iphone_turnermix.v.1.jpg)

## Process 
<a name="process"></a>
Our process is user-centred throughout. From the way requirements are written, to their acceptance criteria (how we define "done"), through to the information architecture and design. 

Our [Agile process](/about-us/how-we-work) means we work closely with stakeholders at Turner Broadcasting. All requirements are captured as user stories, so they're immediately cast in terms of end user value. Requirements are prioritised each sprint, by the Product Owner, we estimate using a relative points based system, and we project how much can be achieved in a sprint by using velocity - an evidence-based method that averages our past performance. 

#### Risk is reduced 
Each sprint we make a delivery that is tested and ready to deploy. By splitting the work up into sprints, we ensure that we are regularly delivering value, and it gives us the opportunity to re-assess priorities together, as well as review the process periodically. If requirements are prioritised in terms of user value then the most important features will be released first. 

#### Business planning is improved 
The time / resource required to achieve business goals is projected based on evidence of past performance. The accuracy is constantly improving as more evidence is gathered, and we can use this simple metric to ensure that our goals are realistic. 

## Technology 
<a name="technology"></a>We believe in using the best tool for the job. The following technology stack has been arrived at after trying many alternatives! It has been battle tested by some of the largest CMS deployments out there, and is currently our preferred enterprise-level CMS technology stack. 

#### Drupal 7 
Our open-source CMS of choice, [Drupal](/about-us/drupal-development-london-uk) is both powerful and flexible - benefitting from a large repository of modules for common functionality, developed and supported by the community, as well as a proven track record of scaling to enterprise-level deployments. 

We built a Drupal multi-site architecture that enables us to share functionality between sites, using the Features and Strongarm to package configuration, and drush to script common operations. 

Channel schedules are imported periodically from csv and xml files that are provided by TV channel schedule software. 

Videos are currently hosted on YouTube and Vimeo, which helps drive traffic from the social features of these platforms. We are working on a solution to integrate with Brightcove, enabling pre-roll and post-roll advertising. 

#### Continuous Integration 
We wrote a detailed blog post on [how we set up our continuous integration environment](/blog/continuous-integration-step-step-guide) with Jenkins, Fabric and Selenium. 

The fabfiles have been made [available on github](https://github.com/atchai/atchai-ci), and we're planning to release more on Jenkins job configuration and Selenium tests soon. 

We have separate build environments for human and machine testing. The human environment runs an update job on a database pulled from production. The machine testing environment builds each site from scratch, then runs selenium tests, and load testing, on every commit. This means that any regression bugs, or code that negatively impacts performance are made visible as early as possible, which should make them faster to fix. 

#### Hosting 
Production hosting is handled by top-secret, highly secure set-up! Everything else (CI, build, stage servers) is on Amazon EC2 cloud hosting. This architecture allows us to capture server environments in Chef scripts, and increase or decrease the amount of servers as necessary. Deployments are all scripted using Fabric and Jenkins as described above. 

#### Performance Optimisation 
It's essential that the sites are responsive and fast. As we don't have any logged in users, we're able to make use of Varnish for reverse-proxy caching. We also run APC to speed up PHP, and Memcache in front of MySQL.

## What the client says

> Having put together a very well thought out and concise proposal we chose Atchai to deliver a new framework to power websites and digital products for our growing general entertainment business and brands.
> 
> John and his team came up with a technical approach which has proven to offer huge efficiencies in the production of TV channel support websites. We now have an underlying architecture which enables quick and efficient rollout of new websites, along with the tools to ensure that every site we produce is accessible across mobile devices.
> 
> Atchai were extremely professional, patient, and showed a great understanding of our often changing requirements and priorities. Their Agile approach to development, along with regular and effective communication allowed us to accommodate change and react quickly to evolving business and user requirements.
> 
> I’d highly recommend Atchai and wouldn’t hesitate to work with them again.
> 
> <cite>Olly Holmes
> Turner Broadcasting</cite>

### Going Viral
Viral video for TNT Benelux - the first site to launch on the framework, attracting 35 million views.

<iframe width="640" height="360" src="http://www.youtube.com/embed/316AzLYfAzw" frameborder="0" allowfullscreen=""></iframe>
