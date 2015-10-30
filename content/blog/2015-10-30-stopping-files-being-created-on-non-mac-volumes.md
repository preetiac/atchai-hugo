---
description: null
slug: "stopping-files-being-created-non-mac-volumes"
date: "2010-08-19"
tags: null
published: false
title: "Stopping ._ files being created on non-Mac volumes"
---

When editing a file on a non-Mac volume (e.g. when editing files on a samba share) you may notice that an additional file gets created along with the one you're editing, prefixed with "._". 

For example if you create a file called Filename.txt, a file called ._Filename.txt will also be created.  You may also see a file called .DS_Store appear.

They’re meta files, which are fine on a Mac HFS file system because they're stored in the resource fork and invisible to the end user.  However, when you're working on another filesystem, as I do when editing files on my linux VM, you're gonna get tired of these suckers pretty quick, so what can you do?

Apple knowledge base has [this fix](http://support.apple.com/kb/HT1629) for stopping resource fork files getting created on SMB mounts.

I also use a fix for telling Textmate to stop creating all resource fork files, just copy the following into the terminal on your Mac:

`defaults write com.macromates.textmate OakDocumentDisableFSMetaData 1`
