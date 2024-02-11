---
layout: blog
title: "How to override cloud-set Chrome policies"
description: "Nobody's judging you"
date: 2023-12-21
tags: guide
---

In this guide, I'll tell you how to override Chrome's policies that has been set by your enterprise admin or by a cloud policy in Windows. I'll also show you how to make a registry key file that merges (and removes) said changes from the registry. Oh yeah, this method also works if you want to set a previously undefined policy on your Chrome instance, even if it's not been enrolled into an organization yet.

Before we start, I need to state that this will only work _if your policy precedence has `Platform machine` as the topmost source before any other policy source_. Like this: `Platform machine > Cloud machine > Platform user > Cloud user`, your computer is the `Platform machine`. Also, any damages or unwanted attention that you get from modifying the policies are entirely your own responsibility. One last thing, this _will affect every Chrome instance present on your computer_, even in different user accounts in Windows.

## Step 1: Identifying policies in effect

Say that you have a particular extension that you don't want to have installed by default on your machine, or if the home page set by your company sucks. Then you'll need to know which policy sets those.

By the way, the aforementioned behaviours are set in the policies `ExtensionInstallForcelist` and `HomepageLocation` respectively.

All you need to do is to go to `chrome://policy` or `about:policy` (for a vendor-agnostic URL), and then see which policies have been set by your organization. Each policy's title in the table links to their corresponding documentation page at [chromeenterprise.google](https://chromeenterprise.google) so you know which policy does exactly what.

The documentation pages should have an example of said policy's content and their data type. Note these for later.

After finding the policy that you want to override, and know what they really do, we can go on to the second step.

## Step 2: Overriding the policies

Again, this guide only covers _local override of policies, and only if your policy precedence has `Platform machine` as the highest_. Any other than that, and it's a no-go.

The easiest way to override Chrome policies is by modifying the registry, there's another way using the group policy editor, but this way works in all Windows editions regardless if they have group policy enabled or not.

1. _Skip this step if you already have `HKLM\SOFTWARE\Policies\Google\Chrome`_. We start by modifying our `HKLM\SOFTWARE\Policies` key by adding a new `Google` subkey, then another `Chrome` subkey. The path should look like this: `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome`
2. Inside the `Chrome` key, add a key value that has the same name of the policy that you want to override, for example: `HomepageLocation`. Set the key's type to the type that is noted within the policy's documentation page, in this case it's String (REG_SZ).
3. The value of said key will be the override value for the corresponding policy in Chrome. You can either blank them to unset the policy, or change it to something else, all in accordance with said policy's documentation. If you mess up the content of a policy key, don't worry, Chrome will just unset it to the default value.
4. After that, head over to `chrome://policy`, and click the "Reload policies" button, this will force Chrome to rescan and apply the modified values immediately.
5. If you see a `Warning, Conflict` value in the Status row of your modified policy, congratulations, you have just overridden an enteprise-set policy!

The end result will look like this (this isn't a valid reg file, by the way):
```reg
[HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome]

"HomepageLocation":"https://example.com"
```

To remove your policy changes, simply delete the registry key that you want to revert, or delete the entirety of the `Chrome` and `Google` subkey as to not leave a trace.

## Step 3: Preserving the overrides

Say, once you're satisfied with whatever that you've done using the modified policies, you can then delete those policy changes and return back to the behaviour prior to your antics. However, it's a bit tedious to add, modify, then remove those registry entries all the time, isn't it?

Luckily, these can be easily implemented into `.reg` files for you to just open and then implement, here's an example:
```reg
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome]
"IncognitoModeAvailability"=dword:00000000
"URLBlocklist"="[]"
```

Save it as a registry file, and it's as easy as opening it and merging the changes. Oh, you want to remove them fast as well? Here's the code as well:
```reg
Windows Registry Editor Version 5.00

[-HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google]
```

The dash `-` before the name of the key path is a removal operator to wipe the key `HKLM\SOFTWARE\Policies\Google` entirely.

And that's how you override cloud-set Chrome policies on your local machine, I've used this to unblock localhost as a secure origin to test my local webserver, but this can be used to set pretty much anything that you want to do.
