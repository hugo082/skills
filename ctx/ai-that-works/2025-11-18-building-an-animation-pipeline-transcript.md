Dex (00:00.504)
Thanks.

Vaibhav Gupta (00:01.745)
All right, I think we're Boom.

Dex (00:03.118)
All right, we're live. Amazing. Is that your new office, dude?

Vaibhav Gupta (00:08.839)
It is. We've got this a little bit ago. I'll show you guys a view in a second if you want. But let me set up the. Let me send out the live link.

Dex (00:15.128)
Very nice.

Vaibhav Gupta (00:21.591)
Dex (00:25.526)
I we've been starting about 10 to 15 minutes late for the last two or three weeks. So we're back to starting on time here.

Vaibhav Gupta (00:37.177)
one today's AI that works is on what is it on cloud code automation.

Vaibhav Gupta (00:52.487)
Unicorn emoji. There we go.

Dex (00:54.606)
Amazing.

Vaibhav Gupta (01:01.621)
to it.

Vaibhav Gupta (01:07.605)
All right, we're live recording. Let's kick this off and get to it.

Dex (01:11.79)
Amazing. Cool. I'm super excited to chat with you all. I've been spending a lot of work in the last couple of weeks making slides and animations for some upcoming conference talks. If you're in New York for AI engineer code summit, come say hi. We'll be hanging out. I'm doing an MCP debate on Thursday. Apparently I am framed as the anti-MCP guy now, which I feel like is not accurate, but.

We'll be leaning into leaning into that one. So come see, come see, think it's going to be streamed to come see me and Ian argue about whether MCP is good or not. but I, anyways, I've been working a lot of slides, and I, people have, a lot of people ask me how I make them. and it's a fun little combination of like AI assisted changes to existing open source libraries. It's, a bunch of cloud code pipelines and slash commands. So I figured I would show you all.

that works today and then we can we can walk through exactly how it works kind of under the hood and how it fits together. So I'm gonna do what we learned in demo school which is they call it start with the end in mind. So if I pop over to our handy dandy whiteboard I'm gonna just do a simple diagram. What do you want to diagram for?

Vaibhav Gupta (02:32.916)
Let's do a diagram for how we do the setup for this talk that we usually plan for. So the emails, everything else we do.

Dex (02:46.284)
Right. Okay. Yeah. Okay, cool. So we have like episode name, episode description.

And then we have the, we have the like next week's link. yeah, so it's like next week's episode name, next week's episode description, next week's like sign up link. This is how we generate the email that comes out every week. And then we also take in the like last week's YouTube link.

Vaibhav Gupta (03:02.162)
Thanks.

Dex (03:22.894)
And so basically we want to write an email that is like, here's what we did yesterday. And here's what's coming up next week, basically. From last week's episode. So we have like an AI generated summary from last week's episode. And then we pass this all into, draw this in, pass this all into a like custom plot slash command. And what we get out of this is.

some metadata and some, what else? It's like the, for the next episode, which causes it to show up here.

Vaibhav Gupta (04:01.136)
It's not a data for the next episode

Dex (04:05.429)
So this site is all based on a bunch of code that basically reads JSON from the AI that works repo.

Dex (04:16.983)
Let's see.

Where does this live by Bob? It's like in each folder, right?

Vaibhav Gupta (04:22.77)
It's in each folder. can go into it and you can click on the metafiles. So you read this metafile, pull out all the data, and then it writes into a giant JSON file that's on the root of the directory. And that's we produce like exactly.

Dex (04:26.741)
Yeah.

Dex (04:34.251)
Yeah, and this powers the RSS feed that is this thing. So it shows here's the upcoming episode and all of this. And it also powers the read, it also like updates the read me, right? It's like next episode, building an animation pipeline. So all this is.

Vaibhav Gupta (04:46.312)
Yep. We turned the Jason into like a.

Dex (04:51.479)
Sorry, go ahead.

Vaibhav Gupta (04:52.54)
We turned the whole JSON into basically a bunch of different outputs for different viewing systems that people might want.

Dex (04:58.475)
Yep. So anyways, so we get the metadata for the next episode and we get a draft of the email recap, right? So like the summary and the YouTube blank and everything that's coming next week, this sets up the repo. I think it also does it update the metadata for the previous episode too, right?

Vaibhav Gupta (05:16.56)
It does update metadata from previous episode and generates a README for the previous episode.

Dex (05:23.179)
okay, cool.

Dex (05:34.445)
Amazing. And I'm just gonna color code these a little bit so the stuff for the previous episode will be in blue and the stuff for the next episode will be in red.

Vaibhav Gupta (05:49.01)
Maybe make the cloud social command. Yeah, let's make that one like white. Yeah, exactly.

Dex (05:55.278)
Okay, cool. So here we have like kind of a fun diagram, right? And this is actually not what we're talking about today. I just needed something that we were going to draw. So what I can do is I can save this.

and this will download an Excalibur file, right? So this, you look at this file, I think maybe we can just open in VS code.

Vaibhav Gupta (06:22.609)
It's a giant XML file, I think, right?

Dex (06:22.965)
Yes. I think it's JSON, but yeah. So it just has like data about all of these objects and when they were created and their timestamps and the colors and all this kind of stuff. So this is the full drawing. You can upload this from scratch. This is every single thing. This is enough to kind of restart it or re-upload it or export it or whatever it is. So what we can do with this file though is there's a cool project called ExcaladrawAnimate.

A random thing I saw in Hacker News like nine months ago that I've been kind of hacking around with ever since, he has a hosted version of it where you can drop in your file and then you can, and then it will animate it. And so this is going to actually just look at the timestamps on all the objects and then draw them in order so that you can generate cool little images. And it has this feature, you can export this to a SVG.

You can also export this to a WebM, which is what our custom code is gonna do. So you kinda, give it a tab to view. I think it's, I see.

Why can't I?

Vaibhav Gupta (07:34.459)
Maybe make it this point into the podcast. Yeah, sure.

Dex (07:39.693)
So what this is gonna do is literally like share your screen and record the animation and then convert it to a WebM, which is like an MP4. It's just like a web video format.

Vaibhav Gupta (07:50.931)
It's a really clever hack of how to generate a WebM.

Dex (07:53.953)
Yeah, it's kind of unhinged. And so now it's exported. And I think we should be able to download it. They updated this. Yeah, export to WebM. There we go. So this is my like.

Dex (08:11.564)
So, yeah, so here's our webm file. So you can put this on YouTube. And so like when I, when we go on YouTube and I go.

Vaibhav Gupta (08:13.607)
And now we have a.

Dex (08:23.094)
human layer, maybe it's add human layer.

Vaibhav Gupta (08:27.283)
It's at, yeah.

Dex (08:29.3)
No, this is somebody else. Is it human layer dev?

Vaibhav Gupta (08:34.183)
Yeah, and your channels.

Dex (08:37.61)
know my channel. All right, we'll just go to YouTube. I think we have it. Yeah, your videos. So you can just take these web ends and upload them directly to YouTube. So here's a bunch of stuff that I've been working on. So you can kind of just come up in this link. And this is what we end up using in slides and Google talks and things like this. This is like how do you compress contacts from a bunch of repos? This is irrelevant also to what we're talking about today. But that's kind of the basics of it.

Vaibhav Gupta (08:41.105)
It's right there, yeah.

Dex (09:04.98)
I got really annoyed because I made a lot of these and I didn't want to come here and upload files and do all this stuff. So I have a fork of Excalibur, which we'll put a link to in the, in the code, where we built a headless version of this. And so I'm going to show you kind of the, this one was doing some research that we'll share as well. It's just explains how it all works.

But what I'm going to do is...

Vaibhav Gupta (09:39.986)
While you look this up, think half the battle here is honestly just about knowing about the right tools to able to use. So it's funny, it's like we could be talking about how to animate Xcalibra videos and every one of us will be like, that looks beautiful, that looks great. But if we don't know about that new tool that does Xcalibra animate, we probably would have just not even either come up with the idea ourselves or even have done it or even have like done the extra legwork to go build that kind of tool chain. So I think it's just really interesting to show the marriage of.

Dex (09:41.505)
Yeah.

Dex (09:46.902)
Yeah.

Vaibhav Gupta (10:08.711)
like regular software with like what we're about to do, which is like some sort of automation on here.

Dex (10:14.944)
Yep. So this is the prompt. I'm actually just going to show you how it works. And I'm going to give it the file. What was the file we made? It was workflow.excalibraw.

Vaibhav Gupta (10:24.071)
That's in your downloads, yeah.

Dex (10:29.036)
workflow.excalidraw and we'll put it in desktop.

Dex (10:39.532)
And so what this is going to do is it's going to read a bunch of tools that we've built and walk through like each of these tools and how they work. But I just kind of want to show you what the end result is. Is basically this is going to use my fork of Excalibur animate to do the WebM recording in kind of a headless way with a headless browser or not headless, a like using browser automation. And then it's going to, what is it going to do? It's going to, let's just.

this and bypass permissions. It's going to take that like video and ask me to review it. And then if it works well, then we'll, then we'll, then we'll ship it to YouTube. And so it's kind of a full end to end pipeline of going from the workflow to YouTube in one go. And so the basics of this is like, you have your like file that Excalibur.

Dex (11:32.748)
The model's gonna read this and some tools. And then what Claude's gonna do in order is CLI command to upload the video and then, or sorry, to generate the WebM.

Vaibhav Gupta (11:50.907)
Yep. And that means it's going to just play it right and a bunch of other things, I'm guessing, to go do that.

Dex (11:56.749)
I don't exactly remember what it uses. It's whatever, it's literally like I did a research plan implement of like, here's what I want to be able to do. And then I had Claude go build it. So yeah, so here it is launching the browser. It's doing all of this in a row. I also added flags to be able to control the animation speed. And I also found issues with, it doesn't load the Excalibur fonts well, and I was too lazy to go figure that out. But here we go. This thing ran the script and it did all the stuff and now it has a file.

Vaibhav Gupta (12:21.327)
Okay.

Dex (12:29.797)
when it's done, it's going to actually like, tell me where it is and like ask me to confirm.

Okay, cool. it's tilde desktop. Yeah.

Vaibhav Gupta (12:39.942)
We actually go on. I'll let you keep going on. I have a couple of questions about this workflow as you're doing this, because my first question about this workflow is like, this is incredible, why run it through Claude? Like why not just write a bash script that just does this feels like a very, very linear flow.

Dex (12:42.164)
Yeah, I'll just finish the... Yeah.

Dex (12:58.06)
That's a question.

Dex (13:05.376)
Yeah, could probably just be a bash script.

Dex (13:11.712)
Let's try it.

Vaibhav Gupta (13:11.812)
But it's not about that. What I'm trying ask is what do think was your intuition? There must have been some benefit that you were getting in the beginning by doing it this way.

Dex (13:21.388)
Yeah, I think it was really like Claude was making edits to the tools and adding CLI flags and like figuring out how to run the stuff. And so I never even like ran this CLI myself. Like I was having Claude edit this like fork of Excalibur animate and then run the commands. Like I don't even know the syntax of this. Like Claude designed the syntax of this and built it for itself. And like, I think, yeah. No, go ahead.

Vaibhav Gupta (13:43.603)
I think that's, go ahead. I think that's actually the most interesting part here. Like this tool is awesome. Um, and I suspect hopefully many people want to go do this and like, maybe we can turn into a simple bash script, but I think the real benefit here is kind of similar to like, think someone else might ask a very simple question, which is like in the very early days of Python, why do you write this in Python when you can write this in C? And like, you could save so much more memory about it. And perhaps.

Almost the question I'm asking is like, why are you burning tokens? Every time you run this, when you can just run a bash script. And maybe the fact of the matter is like, what you're really buying here is you bought time to not have to think about a task. You let it be fully automated. And now whenever you go into it, you just run kind of like a slash command, kind of like a CLI command, basically at slash command operates in a way that allows you to one continue treating this like a bash script, but also remind yourself that like

Dex (14:32.755)
Exactly.

Vaibhav Gupta (14:41.251)
If you need to, you can always adapt the workflow on the go. Like maybe there's a new command you need.

Dex (14:44.873)
Well, and we talk about this, yeah, and we talk about this also in like 12 factor agents of like, basically like the valuable thing that LLMs can do is turn human words into JSON, unstructured data into structured data. And so for example, if I said that was too fast, I can say like, make it slower. And this is literally just going to redo the generation with a different speed param.

Vaibhav Gupta (15:05.798)
Yep.

Vaibhav Gupta (15:11.09)
To be fair, could also do up up up dash dash speed slower and like that that can also do it but I

Dex (15:20.233)
Yeah, if it's at the end, but what if it's in the middle? And you gotta remember, yeah. I'm with you. Yeah. Yeah.

Vaibhav Gupta (15:24.786)
It's just work. I agree. It's a different kind of work that you have. And I think what's interesting about this whole system is like, as a developer, it's almost like your, your personal mindset has shifted. Like the fact that you and your brain were not even instinctively like, Hey, I couldn't bring this in the backstrip. You were just like, I'll just do this and I'm done. I solved my problem. I'm going to move on. I think that's what software is about. And that's kind of what you're doing here. Like I probably cost me like X dollars or X cents to run this every single time.

And in your brain, you're just like, work. It's fine.

Dex (15:59.008)
Yeah, not my biggest problem. to the next thing.

Vaibhav Gupta (16:02.606)
That's kind what I'm realizing. like that Mind Chef ship, think is the most interesting parameter here.

Dex (16:07.659)
Yeah, and about probably two out of three times I try to do that and it doesn't go well. So I thought this one was interesting as one that did. I'll be like, cool, let's see if AI can just write the script for this and do it and solve it for me. And this is we develop all the tools, right? I think the LLM is more useful in a tool like, fetch all my calendar events and then summarize them for the day. Yeah, can write the tool to do that and then it can go do the thing. But the other thing that's cool here is like,

it's, you know, when I regenerated this and then when I'm ready, I don't go do a bash script. I'm just like, okay, upload that bad boy.

see if this is safe.

So what this is going to do is like go and like, I don't have to like go get the file path that was generated output and pass it as the input to the next command. Like Claude is just kind of farrying those like pointers through the different like tool calls for me. You know what mean?

Vaibhav Gupta (16:57.926)
Yeah, yeah, it's abstracting away a way of thinking that you don't have to think about anymore. That thing is really interesting. Now I have a couple more questions about this. So in this specific workflow, so I think the most interesting thing to go here, I don't know there's other things you want to show, but I have a direction I'd love to take this in, which is.

Dex (17:08.383)
Yeah, where do you want to go deeper?

Dex (17:17.867)
Let me just finish the demo and make sure this is working and then let's dig in. So yeah, it says it's uploaded. I think it takes like actually a second to process, but yeah. So here's the video and then I can go pop this in, know, slides.new and I can insert a video.

Dex (17:37.173)
dump this in and now you've got a handy little animation for your talk.

We'll do play automatically and then we'll do slideshow and this should just pop up. I made a little, yeah, usually we make it bigger, but yeah. Yeah, that's the workflow.

Vaibhav Gupta (17:43.666)
That's sick.

Vaibhav Gupta (17:52.038)
That's sick.

Vaibhav Gupta (17:57.298)
So firstly, I said like people want this but and we should put the if you're down We should just put the prompt in the workflow in a folder and the new episode so people wouldn't have the full thing exactly

Dex (18:03.999)
Yep, we'll just put it in the new episode. We'll put the prompt. I think I can also even just share the tools. These are all in one of our private repos that we use for doing lots of stuff with YouTube. But yeah, this is like, cool.

Vaibhav Gupta (18:14.672)
I think that be great.

But I have a separate question now. So here's the direction I'd love to take this. And I think people would really enjoy seeing this done in real life. And it would be valuable to me as well, more importantly, which is what I want to see is how would I go take this workflow? And one of the most annoying things about Scalic Draw Diagram and these animations that you're making is obviously I want to change the order and semantics of how the animation happens.

Dex (18:19.722)
Yeah.

Dex (18:39.561)
Yeah. Yeah. So I will show you my workflow for this. It's pretty jank, but basically it's, comes from, I've been hacking on this in a while and I happened to know what the Excalibur format is and kind of took a guess at what, how, the tool was working under the hood. But you see, you have all these elements and one of the things on the element is updated. And this is like a Unix timestamp.

Vaibhav Gupta (18:40.901)
Let's do it. Can you do it?

Dex (19:09.545)
And so this tracks, actually, I think it's not updated. think it's one of these numbers in here, but basically like, let's say I wanted to redo this animation and I wanted to do like,

Vaibhav Gupta (19:21.679)
wanna show like all the blue stuff first.

Dex (19:24.883)
Yeah, so then I would basically take everything else. I'm going to do a janky version of this, but I would take everything else and I would like command exit to remove it. And then I would paste it back in. And now these things all have new timestamps basically.

Vaibhav Gupta (19:39.633)
So first let's try that, if that works on Excalibur Animate.

Dex (19:42.187)
Yeah, yeah, I'm gonna get rid of this and we'll save this. And I'll just say now do workflow to.excalibro.

Vaibhav Gupta (19:44.721)
You can get rid of it.

Vaibhav Gupta (19:59.846)
And what I really want to see is I want to able to modify the cloud code command that you have to go edit in this way. Like I want to be able to say, Hey, I want to modify all the, I want to make all the blue stuff go first.

Dex (20:04.393)
Yeah.

Dex (20:11.658)
okay. Yeah. I mean, this is a big ass, this is a big ass JSON file. So it's like a lot of context and probably hard for Clon to reason about, but I actually don't know it. Yeah. we could do it. Yeah.

Vaibhav Gupta (20:13.211)
That's what I want to see. How would

Vaibhav Gupta (20:22.193)
Let's try. How would you go about this?

Vaibhav Gupta (20:28.977)
Because even in the world that you did, you actually did it opposite way, you actually swapped the order yourself.

Dex (20:34.569)
Yeah.

Vaibhav Gupta (20:38.319)
And I want to literally look at your workflow for adding that feature in.

Dex (20:38.559)
Yeah.

Dex (20:42.122)
Sure. So this is a research thing where I basically actually happened to have done a research on the whole system and it wrote this big ass research file. I still have plenty of context left. So I'm just going to resume from here, but like, let's make a plan. I want to build a tool in Excalibur draw animate to reorder. Well, actually what I would probably want to do is like,

summarize the elements as markdown. And so the model could basically like swap things around.

Vaibhav Gupta (21:13.595)
I think Vascon's key here is actually the most important part. think this, actually slightly disagree. I think it's actually this, JQ is key.

Dex (21:23.434)
interesting. the problem is, is I don't want the model to read all of that JSON because it's going to eat a sh- like-

Vaibhav Gupta (21:24.833)
Jake, but.

Vaibhav Gupta (21:29.795)
It doesn't have to, if it does JQ, J, JQ should somewhere. Anyway, we can, why don't we just put a research plan to try the, try the, research to go figure it out and see how it could go real to the elements. And like, can use JQ, we can use markdown rendering. We can basically do anything else we want on it and try. But JQ, think is structured grep is the right way to think about it. yeah. I'm asking to set that.

Dex (21:49.033)
Yeah.

Dex (21:55.306)
I'm just gonna eat.

Vaibhav Gupta (21:55.626)
where'd go?

Vaibhav Gupta (21:59.057)
But again, I think it just goes down to a couple of different things where it's really about like knowing these tools. like Dextre, your default is to think really hard about thinking about like using Markdown because that's what you've been doing for a while. And Vasken probably has used JQ quite a lot. So it feels like we're intuitive to think about it. And it's just a matter of tools and exposures.

Dex (22:19.902)
Well, so JQ is good. But yeah, you're right. You could use like, like, we're gonna figure out one.

Vaibhav Gupta (22:27.022)
And it might be a combination of both. It might be a, it might be a combination of both that actually is most relevant here.

Dex (22:38.538)
with a human during reordering.

to script or jq command to what is it a script or jq command picture you understand how Excalibra anime decides the order to render animation elements

Vaibhav Gupta (23:04.75)
Why create plan and not research code base?

Dex (23:07.758)
Because in this thing, I literally just did a research code base, like before we started the episode. just said, read the Excalibur animate command, give me, I figured it would be useful for this episode. Yeah, so let me just pop back to the end here. Make sure you understand how Excalibur decides the order to render. Shuffle them around based on human feedback. Remember.

Vaibhav Gupta (23:15.46)
Got it. Okay. Okay, cool. Nice.

Dex (23:34.11)
This will be used with a model like cloud code. So it is not appropriate to read the entire JSON file or write JSON directly. JSON must be summarized by bash or scripts and JSON must be written by programs, not by models.

Vaibhav Gupta (23:59.701)
Yeah, let's see what it does.

Vaibhav Gupta (24:05.264)
and then we'll see what this comes up with.

Dex (24:05.947)
and I forgot one thing. I forgot the magic words. I've been finding more and more that the, the, the it's, it's really valuable to just kind of give a little bit of extra guidance on these things, no matter how much you put on the prompt. it could be really valuable to just say like, work back and forth with me and start with your open questions and phases outline before writing the plan.

Vaibhav Gupta (24:30.01)
Yeah. And you want that to be basically the most recent token at all times.

Dex (24:31.824)
Yeah, basically it's like, it's in the prompt, but yeah, putting it at the very end is like the most important instruction never hurts. All right, let me just double check. Okay, yeah, it's only reading 200 lines like I told it to.

and it should get enough of the shape.

Vaibhav Gupta (24:57.006)
You can just ask it to generate a jq command to describe the schema shape, by the way. And that would actually give it everything without actually reading the full shape. I bet the keys are good enough.

Dex (25:09.257)
Yeah, I think that's right. Okay, yeah. that was reading 200 lines was about three or 4 % of our context window. So, but in this case, I think it's worth it. Like, sometimes you just want that context in because it's relevant. Okay, cool.

Vaibhav Gupta (25:20.388)
Yeah, I would have actually read the whole window because just so it knows that because like recursive structures get really complicated in X-Scala Draw.

Dex (25:27.943)
Yeah, I don't, I don't use a lot of recursive structure. That's also part of it is just like keeping your Excalibur draws simple and like focused.

Vaibhav Gupta (25:28.484)
and

Vaibhav Gupta (25:33.602)
Okay. That's a good point. Yes. You can constrain it from the top level because we're not trying to build a general purpose tool. just trying to like we as users can constrain what we do.

Dex (25:39.432)
Yeah.

But like also like here's another, like this is a really small, simple one. Oh my God, Google wants to know that it's me. Is it gonna kick me out again? Like here's like a much more complex like video that has like hundreds of elements in it. All right.

Vaibhav Gupta (26:02.128)
you might want to go approve. I'm going to let other. OK.

Dex (26:04.745)
That's fine. We'll come back to that.

Vaibhav Gupta (26:10.288)
For being asked the question, what apps do you use to do audio to text? I personally use Whisper. Dex uses Super Whisper. Honestly, I think any of them are really good enough. Voice to text is a pretty good problem. There's open source options, there's free options, there's local models. I personally don't think that there's any huge win on any one of them. I just hate changing my workflow, so I will just use the app that I have been using for a while.

Dex (26:10.499)
Yeah, this is running.

Dex (26:36.467)
Yeah, so here's the other one we launched where we made all the blue ones come first, basically. And I didn't mess with the arrow. This is also like another thing where it's like, okay, yeah, you're right. It would be nice to have a script where I could just be like, make all the arrows come last or something like this. Like getting the AI to actually manipulate the contents of the animation is a funky one.

Vaibhav Gupta (26:41.668)
Yeah, well.

Vaibhav Gupta (26:54.8)
Yeah. And I think that's where like the superpower of AI does come in a lot more. It's like, Oh, that is suddenly good. Or like, Hey, make all the arrows should just pop in at once. Like there's small things like that, that we could go do. And like, I don't know how it's got.

Dex (27:03.795)
Yeah.

Dex (27:07.249)
Yeah, I've messed a lot with like doing like AI assisted modifications to Excalibur animate. Although last time I tried it, I was not doing RPIs. It was like in like, like February or March. So we'll see how this plan comes out. But

Dex (27:25.545)
Cool, what else do want to see?

Vaibhav Gupta (27:26.37)
it's well, I think that's probably the most interesting. I really want to see a workflow of how you iterate on this and how you actually make this make progress. Cause like, for me, that was the most insightful thing when I first like tried to do vibe coding. Cause I've said this many times, like I have never felt skill capped in producing code. I have always been able to produce more code. I like my skill cap has been the rate at which I can type code in not really the rate at which I can think about code and AI.

When it first came out, it still did not feel like it unblocked me. Like Cursor Tab Complete was the most I really used for a while. The Agent workflow was just not that good for me. Like even Cloud Code on its own never produced great results. But at some point, I think I saw you work with AI and I was like, I can do a lot. And now I can find that I can paralyze like three or four tasks in parallel when I'm really focused.

Dex (28:18.345)
Oh, this is the thing you're talking about. mean, like we talk about this a lot, which is like one of the key insights is like, don't outsource the thinking. Like you need to bring your taste and your craft and your ability to design systems as an engineer. And like what AI does is it can read a lot of code really fast and it can write a lot of code really fast, but like the code won't be good unless you are thinking about it and working and engaging and reasoning about it. And

Vaibhav Gupta (28:40.674)
Exactly.

Dex (28:43.977)
because the actual coding part is fast now, you get to spend more time doing high leverage stuff like thinking and planning and designing. okay, so what you're saying is basically because, and the old day when you were kept by the code, you would like be writing code and you would only have to think as fast as you were able to code.

Vaibhav Gupta (28:53.612)
which is a lot more tiring.

Vaibhav Gupta (29:03.183)
Yeah, which is more than that fast. Like I'm not, I'm not, I'm not what I would say like crazy fast type of reading the fastest type is type at like a hundred words, 120, 130 words per minute or whatever it is. Um, but it's not incredibly fast. Um, like use, if you ever use your stats and whisper flow or any of them, they're naturally do like, you're talking at 200 words per minute easily.

Dex (29:05.705)
Yeah.

Dex (29:19.774)
Yeah.

Dex (29:27.687)
Yeah, yeah, there's some people, I Whisperflow even had like a leaderboard where it was like, here's the fastest talkers on the app.

Vaibhav Gupta (29:29.186)
And you're-

Vaibhav Gupta (29:33.679)
Exactly. And it's rare that anyone is talking at 30 watts per minute. Let's go back to the other thing and check it out.

Dex (29:39.721)
Yeah. Yeah. I was going to, I was going to say, yeah, this is also the interesting thing about like using AI to code is you end up with like these downtime points while the agent is working. And if you're pairing on it, then it becomes very easy to just sit and engage on the problem and think and reflect and like frontload some of the thinking for the next step. But if you're doing this alone, I just end up checking Twitter or email or something. So I think these workflows work a lot better with two people.

Vaibhav Gupta (30:02.127)
And then you're just...

Yeah, I think so too. And then you end up in a world where basically the old XKCD, my code is compiling me. Just becomes a reality. It's in some agents generating and you just go and waste time for awhile, which actually in fun enough makes you more distracted when you go read the final plan that comes out of the model. And then you're producing even worse quality content because you're not actually reading because you're already distracted and you're coming back to a very low engagement task in the form of reading.

And therefore you're actually producing worse output. And then you're like, this stuff is not working. And I think.

Dex (30:37.308)
Yeah, no, talking is way more engaging and arguing and debating how, which library to use and all this stuff. think is a useful way to stay engaged. Yeah.

Vaibhav Gupta (30:43.339)
Exactly. Like even just us talking about like Markdown or JQ is they will make us want to go read that in a little bit more detail on what the plan was.

Dex (31:04.764)
What other things might you want to tell it? Is asking for like what kind of human interactions do you want to be able to do?

Vaibhav Gupta (31:09.423)
Yeah, I guess that's good enough.

Dex (31:12.776)
This is gonna be a little bit janky. haven't we don't have time to do like the full whiteboard and design the heck out of this system, but it's a good idea

Dex (31:23.624)
Content is essential. XY position can skip. Animate orders.

Vaibhav Gupta (31:33.453)
Yeah, we, we literally just need to animate the order and perhaps choose what to animate and what not to animate, animate, or maybe that's not the right word. Maybe what I want to say is like, I want it to be able to build a logical flow. like it might, it might be useful for the model to decide that given all this content, here's the order in which stuff should be rendered and make its own decision on the ordering.

Dex (31:57.224)
actually kind of like that.

Vaibhav Gupta (31:57.359)
Right. That sounds super useful too. Like it's just like, I don't even think about it. I can build the diagram and the model will just.

figure out the ordering automatically for me.

Dex (32:22.024)
Okay, cool.

Dex (32:27.208)
Group handling, don't.

That's out of scope.

Vaibhav Gupta (32:36.429)
Yes, groups elements. Yeah, that's, I guess it was thing that nested questions right away.

Dex (32:53.83)
the other magic word is... Yeah, go ahead.

Vaibhav Gupta (32:54.273)
And a lot of the stuff, what did she say? What's the magic word? I want to hear that first.

Dex (32:58.8)
I was just going to say a lot of times it tries to put, we got to update the kind of the bass prompt here, but a lot of times it will try to put all the testing at the end. And it's like, no, I want you to write a unit test in each phase.

Vaibhav Gupta (33:11.823)
What's really interesting about this whole thing is just like, just how much downtime there is. think the most important thing about these workflows is people should be parallelizing stuff. You should never be working on one thing at a time.

Dex (33:22.534)
Yeah, I do find though that like, even if I'm fully locked in, like, and I'm doing complex work that requires a lot, I mean, if it's just little bug fixes, like we have a linear board where we just kind of like push them through this workflow, we don't even open them in code layer. But yeah, if I'm like locked in and doing things really like two is still the max for me, I think.

Vaibhav Gupta (33:23.061)
It's just like way too much downtime.

Vaibhav Gupta (33:45.657)
Dude, get good. I don't know what else to tell you.

Dex (33:49.199)
Yeah, you're doing four in parallel.

Vaibhav Gupta (33:51.919)
Only I can't, it's too much work. And it's like, I have to be really focused. I literally have to have no distractions. I can do that only on weekends.

Dex (33:58.696)
Yeah, exactly. It's like if I have four hours on a Saturday, I can sit down and just crank through and like fully lock in. Okay, cool. Elm and filtering. I don't care.

Vaibhav Gupta (34:03.554)
Yeah. Yeah.

Dex (34:17.864)
I don't know, we don't have time for this.

Vaibhav Gupta (34:18.432)
Yeah. Okay. Yeah. No, what I found personally for myself is, at least for us, we're doing a lot of like complex, like compilers work right now and type systems work. And that is not very, like if you go check the YouTube channel, there's a couple of videos about this. We've been building an incremental parser. and what that means is like in V and VS code, when you're writing code, you typically don't want your auto-complete to reset every single time.

Dex (34:28.786)
Yeah.

Dex (34:38.408)
What does that mean?

Vaibhav Gupta (34:47.136)
without having every time you change any, you type into the keystroke. So that's what the current BAML LSP does. Every single time you type code, it regenerates the whole system. It regenerates all to complete every single time. What we're doing now is if you change a character to, it'll only regenerate parts of it. And what that means is one will have way better errors. So as you have errors, we'll still like, if you're rendering, let's say you're rendering one function today and you're rendering a prompt and playing around with that prompt and you start editing a different prompt. Currently.

the old function may break if you write syntax. Yeah, exactly. So it's either if something is broken, nothing works, which is a fine way to write the first version of the compiler, but we're actually redoing that to make it incremental. like it's like in TypeScript, when you make a syntax error, it doesn't break everything. It only breaks part that part of the code. So that's actually what we've been working on. And

Dex (35:17.692)
You recheck everything. Yeah.

Dex (35:29.021)
Yeah.

Vaibhav Gupta (35:41.504)
It's Cloud Code has been, I don't even know if we're using Pure Cloud Code. I think we're using Cloud Code codex. People on the team use different things. So there's no actual prescription, which I think goes to show that there's no specific tool chain that's actually better than the other. think they're all pretty much about the same, terms of correctness.

Dex (35:49.906)
Yeah.

Dex (35:56.914)
I mean, I think the thing we talk about a lot with that is like, I think you get more benefit out of picking one tool and sticking with it. And it's like you said, like, right, the best way to get really good at LLM programming is to build intuition. It was the like machine learning engineer that you used to work with. It was just like, how do know this is better? He's just like, I just know, like, I can't explain it to you. Vibes. Having the vibes on how Codex behaves really, really down or how Cloud Code behaves really, really down is so much more valuable than like,

Vaibhav Gupta (36:14.146)
vibes. Yeah.

Dex (36:26.373)
having some crazy min-maxing thing where you're like, use Cloud for this and Codex for this and Cursor for this. Like it will be slower in the beginning between Cloud Code and Codex.

Vaibhav Gupta (36:32.408)
Have you found the vibes to be that different?

Vaibhav Gupta (36:38.456)
Codex, cursor, any of them. I personally have not found it to be that different. Like they mostly serve my needs and like maybe there's nuances, but not in a way that's like, like, for example, if I worked with any of the engineers on our team, obviously they all have differences. But in general, like they're all really good. And like, doesn't really end. Yes. In extreme scenarios, certain people are really good at certain things. Like I am not a detailed learning expert. You don't want me doing a final release checklist. I would be, I'm horrible at that. on the other hand, like

Dex (36:49.639)
Yeah. Yeah.

Vaibhav Gupta (37:08.224)
Aaron and Sam's was right there on my team. They're extremely detailed oriented. Like if you give them a checklist, can, if they say the checklist is done, it is done. And I think I don't, I just don't see that much of an extremeness in the coding agents, but maybe you have, you work with them maybe in a different parameter.

Dex (37:25.041)
mean, there's a lot of cases where I'll be like, I know my instincts with Claude and my instinct was like Claude would get this wrong and Codex can get it right. There's also a lot of things where it's like Claude would get this right and Codex will get it wrong. It has a little bit less to do with like coding problems and stuff. It's a little more meta of like, if you come on like the human layer, am I still sharing?

Vaibhav Gupta (37:35.2)
What are examples of those?

Vaibhav Gupta (37:45.175)
No, you're not.

Dex (37:48.52)
If I come on the human layer prompts and stuff, you'll notice some of these prompts are very long sets of instructions. And what I've noticed is a model like Sonnet, so there's context gathering, and there's reading all this stuff, and then there's doing discovery with the user, and then there's planning the structure with the user, and then there's writing the whole plan.

And basically like, and then there's like syncing and reviewing with the user and all these guys. Basically like if you give this prompt to Sonnet, there's a 50 % chance that by the time it gets to step three, it like forgets what step it's on and there's two more steps versus like a model like Opus is really good at like long horizon instruction following where it's like, it can use 30 % of the context window and it won't forget what the original instructions were. And like, I imagine Codex is similar, that's a meta vibe thing. That's not like Codex is better at TypeScript and.

Vaibhav Gupta (38:25.325)
and CSC.

Vaibhav Gupta (38:35.095)
Yes, but that's like a model capability.

Dex (38:40.935)
Claude has better Python or something, right? That's a model thing.

Vaibhav Gupta (38:43.213)
I see. Yeah. And maybe what I was thinking about is like these coding agents have two different dimensions to it. One is like the coding agent, like the actual prompt that the coding agent has and tools it has. And the second dimension is the model it uses. And they're kind of orthogonal because you can swap one out for the other. And at least for me, I generally, I actually stopped using Opus. I actually use Sonnet now a lot more because it's just faster. And

Dex (38:55.441)
Yeah. Yeah. Yeah.

Dex (39:11.355)
The speed is definitely like an interesting bit of leverage because the faster you can iterate, the less it matters that the first part was correct.

Vaibhav Gupta (39:17.535)
Exactly. Exactly. And then we'll see if what progress has made. And the other thing that I've found is interestingly enough, the actual coding agent, the tool harness actually don't seem to make a big difference to me personally. Like they all seem the same. Like I actually find myself funnily enough, like I use, I do use code letter for almost every complex research task I have just because it's to work with markdown files in obsidian. And you guys do a great job of making that capable.

Dex (39:47.943)
I got a new feature for you, by the way. Check this shit out. You can now open your files in your default editor just by clicking them in code layer, which I guess shell scripts open an Xcode for me, which is terrible, but let me go change my.

Vaibhav Gupta (39:47.994)
but like, I'm excited.

Vaibhav Gupta (39:56.494)
Ooh, that's going to be awesome.

Vaibhav Gupta (40:02.518)
Wait, wait, is there a button there for Excalibur?

Dex (40:05.787)
Yeah.

Dex (40:09.2)
Huh?

Vaibhav Gupta (40:10.602)
If there's a button there for Excalibur, I might make that PR. Okay. I'll figure that out.

Dex (40:15.876)
You want to open a file in Excalibur?

Vaibhav Gupta (40:18.669)
Yeah, for markdown files. Of course I do. Excalibur is the best way to read markdown file. Obsidian, sorry, not Excalibur. Obsidian. Obsidian.

Dex (40:21.946)
You mean obsidian?

Dex (40:26.702)
All right, yeah, send us a PR adding Obsidian. We'll take it.

Vaibhav Gupta (40:30.125)
I love Obsidian for reading markdown files. But I think the most interesting thing that I found, but I was glad. Well, this is, while this is.

Dex (40:33.126)
Oh, yeah. I mean, this is, yeah, go ahead. Now I was just gonna say, this is gonna go rip through the plan and build right a bunch of Python that is probably gonna be slop because we didn't actually do the thinking and we didn't read the plan because we're in a hurry here. But if you wanna see us actually go through this workflow, we do look, do an episode like every six weeks where we just sit down and code for three hours. So you can catch one of those.

Vaibhav Gupta (40:56.897)
Yeah, well, I mean, I think it might get further than we think on here. But my, I think my real question here is like, as this goes ahead and generates stuff. Sorry. My point about like what I found is like, yeah, exactly. I think the thing that I was mentioning earlier about like these coding agent harnesses is like for really small tasks, what I find myself doing is I just want the lowest UX friction to make the task happen.

Dex (41:00.624)
Yeah, we'll see.

Dex (41:09.798)
Okay, cool, so it is like making this like JQ script.

That's cool.

Vaibhav Gupta (41:25.335)
And that has been a game changer in terms of productivity.

Dex (41:29.243)
Yeah.

Vaibhav Gupta (41:31.469)
So like for like super simple documentation tasks, I was like, uh, I just used what's it called for super. What is this?

Dex (41:39.591)
Look at this shit. It made a regex to capture the element type and where we're moving it to. No. Yeah, it It didn't understand. Like I said, like this is not a plan that I would try to rush through in 10 minutes because it's quite complicated, but it is doing things. So it's funny. We can come in and come back and iterate on this.

Vaibhav Gupta (41:45.501)
no, it did not use LLMs.

Vaibhav Gupta (41:51.295)
Okay. Yeah.

Vaibhav Gupta (41:57.664)
Okay.

Okay, we'll probably have to go in and iterate on this. I think this is the thing, if we observe this, I would just stop this. It's probably a waste of money and tokens to let it keep going. I probably won't do anything because the minute you recognize that it's something wrong, it's Effectively.

Dex (42:02.939)
Yeah.

Dex (42:08.528)
as fair.

Dex (42:15.878)
Yeah. Yep. That's the, that's the other thing we've been like doing a lot of talking and like coaching about too is like, there are a bunch of different levels of wrongness. And like, if your plan is, if you're like in the middle of implementation and it finishes a phase and it's like 95 % of the way there, go fix it and cursor yourself, go open VS code and change the thing. If it's like,

10, like 85 % of the way there. Maybe you just polish it just like in the same session, be like, cool, I don't quite like this. Can you make the UI like square corners instead of round corners? Like you're not going to go edit it, but you're going to just tell Claude to do it. If it's even worse, maybe you say, okay, cool, phase one is done. We're going to add a phase one B that is like the polish part. Cause you want it to use the research and actually plan it out and iterate on it. And then if it's way off, it's like 60 % there. It's like, cool, actually we need to throw out.

this code, need to throw out the whole plan and take what we learned in phase one and apply it to build a new plan. Cause we realized that like, it's easier to start over than to try to recover this like bad trajectory.

Vaibhav Gupta (43:17.261)
Also, I just want to be very clear for anyone that thinks that this might be us not talking about this and like just like talking about it and be like, it didn't work here. Like we do this for extremely complicated tasks. So for those of you that don't know, uh, why is this give me a warning.

Dex (43:19.717)
Yes.

Dex (43:32.934)
Are you guys using the thoughts tool, like the CLI or whatever?

Vaibhav Gupta (43:36.877)
No, we just use Obsidian to edit and we push to a repo. Yeah. But we do sometimes share with GitHub. What we do is like, to give you context on what this is, also as a library in Rust that allows you to do like caching and a bunch of complicated things for like compilers and ASC stuff. What we're doing is we're basically limit, we're basically mirroring what the Rust compiler does in a lot of what Dammel's compiler does under the hood somewhere. Where'd go? Rust.

Dex (43:38.254)
No, just open, you just have a sync obsidian thing. Okay, cool.

Dex (44:04.624)
Cool.

Vaibhav Gupta (44:05.964)
Yeah, so we're literally just using Rust Analyzer as like a base for design. We're using a lot of like UV, ash-bones technology as a base for design because they're also built in Rust. And we're taking all the learnings from it and just applying it to like some of more complicated things we do in Vandal now. And we literally generate this whole file using AI and there's a ton of mistakes. Like I'll be very honest with you guys and share the full thing if I can. General language, sorry. And to make sure that don't share something that I'm not supposed to.

we're like, talk about this and I'm like, Hey, this is a vibe coding artifact for this stuff. And I'm very clear about this. but it's just like, yeah, but there's stuff missing and we recognize that stuff is missing. We're just making progress on it. There's another thing where it's like, Hey, this looks, this looks off. Yep. We just know that's wrong. So we're not actually expecting these documents even to be a hundred percent correct. Cause I'm out of effort. takes to be a hundred percent correct. It's just way too high. We just need them to be directionally perfect.

Dex (45:01.956)
Yeah, want the plan good enough that like you can, if there's any issues, like if you're 90 % of the way there, like the final issues can be resolved in line and you won't have to like throw it out and start over. That's the definition of good enough. And this is when I talk about vibes and like getting a feel for one model and what it's able to do is like understanding when to just talk to Claude versus when to add a new phase versus when to just throw out the plan and start over.

Vaibhav Gupta (45:14.965)
Exactly.

Dex (45:31.914)
is like vibes and you just like have to put in the reps to get the sense of that and like it takes repetitions to make it.

Vaibhav Gupta (45:40.309)
Exactly. And there's no real shortcut to this, but like the level of complication that you can do here is like, like this is not trivial. Rust code. Most people will never write a compiler. Most people never had an incremental compiler where you have like a very little unders where you have, the ability to use the leverage, past edits by the user to not have to rebuild the whole compiler flow chain. So the fact that like, we're able to go build this completely from scratch and like take advantage of LMS to go do this. I think.

This would have been easily a six month work item beforehand. We're bucketing this to be at most two months. And there's just no shortcut for any of this stuff along the way. What's cool is I'll show you guys some of the interesting stuff that this leads to when you go do this. And it's funny, I'm gonna share a YouTube video while we're on things on here.

So it's really nice about this is like, we're building this, actually have built tools along the way. And you can watch this video to understand what an incremental compiler is, but I just want to show them the tool chain. Yeah, we have. Yeah, just there's a lot of words, but obviously what we want to go do is like, we want to have a really fast developer loop internally for these kinds of workflows. So how do we have fast developer loops? Well, I'm sharing them on screen.

Dex (46:47.791)
lower end.

Vaibhav Gupta (47:06.24)
share something else.

Vaibhav Gupta (47:10.124)
Well, how do have an incredibly fast about work flows here is like, well, you have to build internal tools and you can see some of the internal tools that we built. So we have a whole bunch of testing suites that we built, but then Greg literally spent like a day and a half building out this internal tool, which allows us to go ahead and see really quickly the diff. And you can see over here, he typed out some code and shows you the diff between the. It's it's called the CST, which is slightly different than the AST. and you can watch this videos and understand.

Dex (47:30.157)
Is this the AST?

Dex (47:37.679)
Concrete syntax tree.

Vaibhav Gupta (47:39.788)
Yeah, you can understand the difference between that. That's more nuanced, but you can imagine that while we're building this out, editing this tree is really hard and knowing what this version was versus the previous version of it was on the previous edit of the source code is really hard. So here you can just, we built a snapshotting tool where while you're developing, you can be like, Hey, is this editing the right things? And because we have a whole caching layer built into this, we also built, oops, I don't know if we show this.

Cosmo Channel.

These videos are not private. Maybe they should be.

These are pretty thick and cool.

Vaibhav Gupta (48:24.78)
There you go.

Vaibhav Gupta (48:29.324)
These are, let me make sure it's a tool chain.

Vaibhav Gupta (48:35.702)
So what we actually built is like a whole tool chain so that you can actually really quickly understand the diff between systems with a color coded syntax. So as you go types on the out, it shows you color coded what you added, but obviously caching is a big part of this too. We can also view what was cached and what nodes were reused really quickly by doing the color highlighting. But this whole tool chain is vibe coded a hundred percent of this. I say vibe coded in the sense like not in the dirty way that people describe it, but in the nice way we're like, we actually put some time into it.

we did this and again, normally a tool chain like this would be weeks of effort or like at least a week of effort. It's not trivial. But because of like kind of the software practices that we have, we can get into a world where like this is almost like an expectation for someone to go build out now. Like build things that make you work faster.

Dex (49:24.623)
Yeah, you are expected to use AI. Yeah, you're expected to use AI to build tools that help you like keep that iteration loop tight. I'm curious, has anyone tried to expose like parts of this tool to a coding agent and let the coding agent kind of like iterate and be like, Hey, here's how you'll know if it's working is if the final thing looks like this and just like run back and forth looking at the CST and the diff and the loop.

Vaibhav Gupta (49:32.908)
Exactly.

Vaibhav Gupta (49:48.958)
So when I showed this, this is what happens. But again, coding agents are not very good at UI stuff. So what we actually have.

is a slightly different thing. We actually have built something that does do that. And again, this is where knowing the right tool chain, this is where knowing the tool chain can make a huge difference.

Dex (50:04.003)
It's just a CLI it can run.

Vaibhav Gupta (50:12.671)
Having a tool chain here, where'd go? Having a tool chain. What you have is for every single test case, you have a bunch of files and every single one that has a snap file. And every time you edit it, it creates a snap.new. And the, and what that does is the LLM can now go like, and say like, if I see a snap.new, then there's a Delta between what I was, what I have stored from my last snapshot and what the new version is. So you can use that to incrementally grow itself. Yeah.

Dex (50:16.301)
Yeah, what does this look like when you run it?

Dex (50:39.823)
This is sick. This is sick. Yeah, that's

Vaibhav Gupta (50:42.111)
But we spent like a long time setting up the testing infrastructure for this. I think if I show you, I can show you guys how long it took to make the testing infrastructure as well.

Dex (50:53.239)
is if you're gonna build a thing that you wanna last 100 years, you need a good foundation.

Vaibhav Gupta (50:58.123)
Yeah. And where's this testing?

There was like the amount of docs that we had to produce to build the testing infrastructure was like.

No, not this one, sorry.

Vaibhav Gupta (51:20.979)
I think this is it actually. snapshot. Yeah. Okay. So what we did is we actually was like, here's what I want that project. So it like for every single testing infrastructure and for every single test, I wanted to go ahead and design. this is a test coverage. Sorry. It's not the testing plan.

Dex (51:36.997)
I think you're maybe sharing the wrong tab. I still see snapshots.

Vaibhav Gupta (51:41.291)
Oh, whoops, do see it here?

Dex (51:44.677)
Here we go.

Vaibhav Gupta (51:45.438)
I should be showing the right tabs. So what we did to actually build this whole versioning system as we went through and actually designed the entire testing plan here. Let me find out where this file is. there we go. And we have a plan just for purely testing where we describe exactly what we want the testing infrastructure to be. We said there's a folder called BAML test.

Dex (52:06.725)
Anything you're gonna build and like writing testing infrastructure with code is better than writing workflows by hand. Anything you're gonna build is gonna benefit from a plan.

Vaibhav Gupta (52:16.425)
Yeah. Yeah. And just going to go do this and actually designing what the whole system is going to look like took forever. Like this, think took me an entire weekend just to write the testing infrastructure. And it, wasn't just about like writing the code, writing the code was actually really fast, but took time was actually building out the, building out the developer workflow for like testing it. So I actually ignored the agent side. I just said as a human, what testing loop do I want? And I just went through.

And like wrote through like a bunch of rust macros to generate tests along the way. And eventually it actually just came up with its own mechanism of what it needed. We talked about what we needed from like the actual like, uh, output directory and the snapshot tests. Where'd it go? Insta and how it's created. like Insta is this library in rust. I would not have known about it without researching like the Astral tool chain for like UV and rough and they use Insta. But I learned that.

Dex (53:10.341)
Mmm.

Vaibhav Gupta (53:13.141)
And then we realized that not only do want these tests, we also want performance tests. We want to guarantee that the Bama compiler is a certain level of speed. And the only way to do that is to add it to CI CD. And the only way to do that is to have unit tests for it. So just incrementally deciding that if we're going to go build this tool chain out this way, it's all by coding and building tool chains for that kind of workflow. There's no shortcut here.

Dex (53:39.429)
Amazing. This is cool. Thanks for sharing this stuff. I think we're almost at time. Let's open it up for any last questions. Otherwise, like, I don't know, what did you learn today?

Vaibhav Gupta (53:39.966)
I'll you.

Vaibhav Gupta (53:52.684)
What did I learn today? I've,
