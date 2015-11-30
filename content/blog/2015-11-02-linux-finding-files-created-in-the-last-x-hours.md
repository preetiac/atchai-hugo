---
description: null
author: JohnGriffin
slug: "linux-finding-files-created-last-x-hours"
date: "2010-08-19"
tags: null
published: true
title: "Linux: Finding files created in the last X hours"
---

You cannot use the -ctype or -mtype modifiers if the timeframe you’re interested in is within the last 24hrs.  If you want to find all files created in, say, the last two hours; magic up a file with the created time set to two hours ago like this:

`touch -t YYYYMMDDHHMM  t.tmp `

Then use find's -newer switch to look for files which are newer:

`find . -newer t.tmp`