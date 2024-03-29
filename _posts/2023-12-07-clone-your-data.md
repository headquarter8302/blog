---
layout: blog
title: "Clone your data, always!"
description: "On the note of using alpha software in a production environment (or in this case, personal environment)"
date: 2023-12-08
tags: story, blog
---

## Update

I've located a copy of the file and fixed the whole crashing issue, it's (shamefully) tracked in [`7020`](https://github.com/LMMS/lmms/issues/7020).


You all must be familiar with the old anecdote of *"I deleted everything in prod, xoxo the intern"*.

Well, today, I became the intern.

## Fresh off the oven...

I use [LMMS](https://lmms.io) to make music, some (I do mean a very small amount) of you might know that I like to produce Phonk tracks, one of which is [TRANSMORPHOSIS](https://youtu.be/iaca1n_V0RQ). LMMS is one of the most feature-complete and robust free and open source music sequencer that I know (aside from manually putting audio pieces in Audacity, which I did, for some time, it was hell).

You see, LMMS uses an extended release cadence, where they will stop at an arbitrary version number, and maintain that as stable. Along with it is the development branch, which, also releases infrequently, but contains a much more up-to-date feature set + bugfixes for the previous release. I used LMMS [`1.3.0-alpha.1`](https://github.com/LMMS/lmms/releases/tag/v1.3.0-alpha.1) to make TRANSMORPHOSIS, note that.

LMMS however, also has nightly builds for each commit. These contain bleeding-edge builds for the app, and is 100%, not stable at all.

This is where the problem started.

## ...it's too hot...

One of the really bad habits that I do is to overwrite existing installations of apps with the new version, not uninstalling it first. Some apps handle this pretty well (and some even uses this as their update method), LMMS doesn't.

Yeah, I overwrote my LMMS [`1.2.2`](https://github.com/LMMS/lmms/releases/tag/v1.2.2) program file with the new `1.3.0-alpha.1` version. This initially didn't cause any issues, but when I saw that some files are incompatible with each other, I knew it would get worse if I did it again, so I pinned my version to that, and stopped further damage.

I further developed TRANSMORPHOSIS using `1.3.0`, and finally releasing it. I was out of the woods composing a piece using a half-broken installation.

All of this, was done without keeping a copy of the original composition file somewhere safe, everything was done against the same file, over and over again. Good thing LMMS is backwards-compatible.

Then I decided to update to the bleeding edge version, by overwriting the program files.

I am smart.

## ...I dropped the cake

That's where things go south, when I reopened the composition file (forgetting that I already updated it to a more unstable version than before, that's also more broken than before), I see a barrage of errors with missing references, missing audio files, missing instruments. That's the moment where I knew, I screwed up.

I immediately closed the editor, uninstalled the bleeding edge, and reinstalled the `1.3.0-alpha.1` version, same errors.

One final straw, uninstalled the preview release, installed the latest stable release, but the damage was already done. The file is beyond saving.

## Always back up your files

Now back to the intern anecdote, those stories even exist due to oversight and/or incompetence on the actor's side, whether it is due to improper training, confusing instructions, or a plain human error. Sadly, it was hubris this time.

Untested software should never be deployed or executed in a production environment, and that also applies to your own device. Always keep things separate in cases where you aren't sure what it will do to your precious files.

This short story should serve as a reminder, even if cheesy, to always practice data safety everywhere.

And also, read the damn updating manual.
