---
description: null
author: JohnGriffin
slug: ""
date: "2016-02-10"
header_image: ""
tags: 
  - Arduino
  - Jazz
  - Music
published: false
title: "John Coltrane, Nicolas Slonimsky and The Arduino — Part 1"
---

## Part 1 of 2: The Music

{{<vimeo 126063428 >}}

The video above shows a nifty little device that I built called the Slonimskiator. At it’s heart is an [Arduino](https://www.arduino.cc/) that’s been programmed to generate melodic patterns based on the concepts in Slonimsky’s [Thesaurus of Melodic Scales and Patterns](http://www.amazon.com/Thesaurus-Scales-Melodic-Patterns-Text/dp/082561449X). It spits out notes using MIDI so that they can be understood by pretty much any synth or electronic instrument. In the video I’ve got it plugged into a [Dave Smith Prophet 08](http://www.davesmithinstruments.com/product/prophet-08-keyboard-2/).

In this two part article, I’ll focus first on the inspiration for the device — the work of John Coltrane and Nicolas Slonimsky. In the second part I’ll talk tech — making the Arduino speak MIDI, using randomness and rules to generate the patterns, and how we can make deterministic machines behave randomly.

# Slonimsky Simplified

In 1947 Nicholas Slonimsky published the Thesaurus of Scales and Melodic Patterns. [Much has been written](http://digital.library.unt.edu/ark:/67531/metadc4348/m2/1/high_res_d/dissertation.pdf) about the book’s influence on Coltrane, who apparently carried the book with him everywhere from 1957–1959.

I’m going to try to break down how the book works in a manner that doesn’t require a PhD to understand. You can go nuts with musical analysis —there are patterns and symmetry to be found everywhere if you keep looking. Personally I find this fascinating, but only up to the point where I understand why something “works” musically. Past this point it can get pretty academic and there are diminishing returns for the musician who actually wants to use this stuff.

## A Thesaurus of Scales and Melodic Patterns?

Slonimsky’s thesaurus contains 1330 “scales” that are logically constructed using a simple idea. The idea is that you take a pattern of a few notes and then keep transposing it by a regular interval. Now, that’s a gross oversimplification, but I’d argue that it’s a better way to start than the book’s introduction, which contains two pages of glossary on the terminology used. If you know what a “Sesquiquinquetone” is then skip to the end.

An octave contains 12 notes. Some basic maths tells us that we can divide this octave into either 1, 2, 3, 4, 6 or 12 equal parts.



If we start a phrase on note 1, then we can keep transposing that phrase up by an interval 2, 3, 4, 6 or 12 notes and we’re still going to be playing the same notes in each octave. We’ll call the number of notes that we transpose by the “principal interval”. This in itself is a great simple concept to get some “outside” sounds into your improvisations.

In the book, Slonimsky extends this concept to splitting multiple octaves into equal parts to generate different “principle intervals”. For example, the “Sesquiquinquetone” mentioned earlier refers to splitting 11 octaves into 12 equal parts. Let’s just focus on the one octave though, it’s far more useful from a musical perspective.

Slonimsky also came up with some more fun words to describe how we “inject” notes between the principal intervals to create the phrase that gets transposed. The examples below show a phrase transposed up by a tritone each time, with notes injected at different points in between to create the phrase. The white (unfilled) notes are the principal intervals.

# The Coltrane Connection

How can you actually apply this stuff? One option is to use the book for inspiration, pick out a random scale and try to integrate that phrase into an improvisation over some changes. Try transposing some phrases up or down by major thirds three times until you get to the octave. Or, if you’re John Coltrane, you might write something like Giant Steps:



        The Slonimsky Thesaurus contains material which is virtually identical to portions of “Countdown” and “Giant Steps,” and Slonimksy may be the most direct link between John Coltrane and structural principles of the late nineteenth century…It is truly remarkable that a musicologist born nearly a century ago in Russia might have had such an effect on this jazz saxophonist.
        
        (David Demsey, “Chromatic Third Relations in the Music of John Coltrane,” Annual Review of Jazz Studies 5 (1991): 154–5.)

The Demsey article quoted above goes into great detail about this, but for me the most obvious connections between Giant Steps and Slonimsky are:

1. The tune breaks with tradition by having no single “home” key, it’s is constantly shifting between the keys of G, B, Eb. This is a modulation of a major third — or 4 half-notes if you like. I’ve marked the score below to show the occurrence of the G, B and Eb (all major) chords. Each time one of these chords occurs we can say that we have definitely modulated into a new key.
2. The phrase that’s repeated four times between bars 8 and 15, transposed up a major third each time. This appears verbatim as an example in the preface of Slonimsky’s book.

{{< figure="![giant-steps-keys.png](/images/giant-steps-keys.png)" caption="Score for Giant Steps — John Coltrane. Key changes are marked with different colours." >}}

The diagram below illustrates the symmetry in this cycle — they are 4 half-notes (a major third) apart. We’ve highlighted the G-Eb-B triangle as that’s what’s used in the original recording of Giant Steps. Of course we could also play the tune in any key, if we started out in C, we’d be playing C-Ab-E.

{{< figure src="![major-thirds-giant-steps.png](/images/major-thirds-giant-steps.png)" caption="Musical symmetry — major thirds are used as a device throughout Giant Steps" >}}

# What does the Slonimskiator do?

The Slonimskiator generates melodic patterns and then transposes them up and down by a principal interval. You can probably see best what it does from the controls:

![top-description.png]({{site.baseurl}}/images/top-description.png)

As this part of the article is supposed to be music focussed, I’ll leave a more in-depth description of how it works for part 2.

# What does it sound like?

Here are some sound clips that were recorded live while playing with the Slonimskiator, plugged into a Dave Smith Prophet 08 (synth) and Eventide Space (reverb effect).



# Call to Action…

If you’d like to collaborate on a music / tech project please [get in touch](mailto:john@atchai.com).

When I’m not making weird noises I run the London-based digital consultancy [Atchai](http://atchai.com/) and the open data visualisation startup [Dataseed](https://getdataseed.com/).

Follow me here and on [Twitter](https://twitter.com/johngriffin) to be notified when part 2 is released.
