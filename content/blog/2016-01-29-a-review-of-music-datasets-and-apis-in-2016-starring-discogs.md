---
description: null
author: JohnGriffin
slug: ""
date: "2016-02-15"
header_image: ""
tags: 
  - blog
published: false
title: "A Review of Music Datasets and APIs in 2016, Starring Discogs"
---

## How did I get into this?
Recently I set out on a side project to find all the records that my favourite musicians had played on. It’s common for musicians to play on a record and not get artist credit. Often the only way to know who played on a record is to look at the cover or liner notes of the physical product. But of course, the physical product has long since disappeared from all but the most ardent and affluent collectors’ hands.

Since we all consume so much music digitally now, the window we have on who is playing the music we’re listening to typically looks like this:

![It's Time album cover](/images/its_time_album_cover.png)

Ok, it’s always been hard. The [Wrecking Crew](https://en.wikipedia.org/wiki/The_Wrecking_Crew_(music%29) were a group of session musicians that often got paid a day rate and received no release credit, yet were wholly responsible for endless hit recordings ultimately credited to the Beach Boys, Simon and Garfunkel, Cher, The Mamas and The Papas, Frank Sinatra, etc. This is all down to what deals were negotiated at the time, and it’s not what I’m talking about.

I’m talking about the meta-data that I need as a listener and a fan in order to find recordings that feature my favourite musicians. E.g. who played bass on Roy Ayers “Everybody loves the sunshine”, who produced the David Bowie’s “Blackstar”? I want to be able to find more of these people’s work, easily.

![Wrecking Crew in pratice](/images/wrecking_crew_practice.png)

I’m most interested in finding this credit meta-data for jazz artists, but if you consider classical music the plot thickens. Take for example Beethoven’s 9th Symphony, you will have the composer (Beethoven), the orchestra (e.g. Berlin Philharmonic), conductor (e.g. Herbert von Karajan) and soloists (Anna Tomowa-Sintow, Agnes Baltsa, Peter Schreier and José van Dam). Then there are 3 movements, which tend to be split into tracks. Oh and the movement names might be in German or English. Yeah, let’s not go there.

## Data Sources Overview

I set out to find the most comprehensive music databases and review them for the quality and quantity of discography and credits data, here’s what I found:

### Wikipedia

* It’s hard to tell how many artist pages Wikipedia actually has. But picking a few at random seems to yield fairly comprehensive listings in the “Discography” section. 
* [Example: Jim Hall](https://en.wikipedia.org/wiki/Jim_Hall_(musician%29): helpfully the discography is split into two sections for work as a band leader (42 entries) and as a sideman (67 entries).
* Sadly there doesn’t seem to be a way to query this data or download it in a structured format. The musician entries on wikidata are missing the discography section, though they do provide links through to their corresponding Allmusic and Musicbrainz pages.

### Echonest / Spotify

* 35M tracks, 2.5M artists ([source](https://en.wikipedia.org/wiki/List_of_online_music_databases))
* Nice API documentation. They suggest a rate limit of 120 calls/minute, however when I tested it is rate limiting to 20/minute. No data dumps.
* Does not have credits for musicians that played on a release, only contains the main artist. This is effectively the same database that Spotify uses, so it’s no surprise that the meta-data we want is missing.
* On the plus side, this API provides a lot of other interesting stuff such as sonic attributes (energy, bpm, speechiness etc.) and the fun yet seemingly defunct at time of writing [Echonest Remix](https://echonest.github.io/remix/) library.

### Allmusic

* 20M tracks, 2.2M releases ([2012 stats](https://en.wikipedia.org/wiki/List_of_online_music_databases))
* Comprehensive discography and credits data for established artists. However the big downside is that the dataset is not open. No API or data dumps.
* Data originally comes from [Rovi](http://developer.rovicorp.com/docs), who do provide an API and supposedly allow free access for developing applications built upon the API, but there doesn’t seem to be any service level guaranteed and so there is strong expectation that you need to pay to build anything with this API.
* [Example: Jim Hall](http://www.allmusic.com/artist/jim-hall-mn0000286483/discography): 47 discography entries, 729 credits. The discography seems to be his albums as a band-leader, and the credits include references to compilation albums which you’d probably want to get rid of, but there’s no way to do that in the UI.

### Musicbrainz

* 19.4M tracks, 1.5M releases, 1M artists ([2015 stats](http://musicbrainz.org/statistics))
* Free and open, using Creative Commons CC0 license. Full [data dumps](https://musicbrainz.org/doc/MusicBrainz_Database/Download) available and a live [web service](http://musicbrainz.org/doc/Development/XML%20Web%20Service/Version%202) in XML or JSON.
* [Example: Jim Hall](https://musicbrainz.org/artist/8c12559e-ddcf-472a-8a8c-0f0c3fc91c6a): Quite a few releases are missing, including Jim’s first 1957 release: “Jazz guitar”, which can be seen on [his Wikipedia page](https://en.wikipedia.org/wiki/Jim_Hall_(musician%29 ).
* Helpfully groups together similar releases into a [release group](https://musicbrainz.org/doc/Release_Group). Typically the releases in a release group will be different pressings of the same album, perhaps from different regions and times. Same concept as a Discogs “Master Release”.

### Discogs

* 151M tracks, 6M releases, 3.9M artists ([2015 stats](https://en.wikipedia.org/wiki/List_of_online_music_databases))
* Free and open, using Creative Commons CC0 license. Full [data dumps](http://data.discogs.com/) available and a live [web service](http://www.discogs.com/developers/) in XML or JSON.
* By far the biggest database in terms of the headline stats, however there seems to be little quality control upon data entry. I’ve noticed quite a few mis-spellings in track titles for instance. A [voting system](http://www.discogs.com/help/doc/voting-guidelines) is overlaid to provide relative trust meta-data.
* Releases are helpfully grouped into a “master release”, which is the same concept as a Musicbrainz “release group”.
* Supports relationships between an artist and group — to deal with the fact that when we search for Bill Evans, we are probably also interested in “Bill Evans Trio” and “Bill Evans and his Quartet”.
* Supports detailed credit relationships, so we can link the artist entities “Herbie Hancock”, “Roy Haynes”, “Cecil McBee” and “Charles Tolliver” to the master release “It’s time”, by artist “Jackie McClean” on Label “Blue Note”. 
* On the downside, it seems to be missing some relatively new releases.

### Others

There are many other music databases that are worth a mention. I haven’t taken an in-depth look at these but it appears that they are less suitable for my purposes than the databases reviewed above.

* [Google Knowledge Graph](https://developers.google.com/knowledge-graph/?hl=en) — this is Google’s replacement for Freebase that supposedly includes structured data extracted from Wikipedia.
* [Million Song Database](http://labrosa.ee.columbia.edu/millionsong/pages/getting-dataset) — 300GB dataset that links EchoNest and MusicBrainz data. As it’s not updated or comprehensive it’s no use for us but probably best suited for training machine learning algorithms.
* [Linked Jazz](https://linkedjazz.org/) — contains structured data on relationships between musicians extracted from oral history and other documents. Relationships are labelled, e.g. has_met, close_friend, collaborator etc.
* [BRIAN](http://www.jazzdiscography.com/Brian/) — a labour of love it seems, and a distributed effort, though it contains some very comprehensive listings. William J Levay writes a [good post](http://wjlevay.net/visualizing-jazz-discography/) on how he scraped this data (no API) to create musician relationship graphs.

## In Summary

Discogs is the best for our purposes of obtaining detailed credit meta-data.

I’ve opted to import the Discogs XML dumps into a Postgres database, where I can link together the tables that I’m interested in with a hideous SQL query. I then push the tracks, together with their credit meta-data into an Elasticsearch index, allowing for much faster full-text search.

If you’re interested in building data driven applications / data pipelines / visualisations for your organisation then [get in touch](mailto:john@atchai.com). It’s what we do for a living, and for fun!