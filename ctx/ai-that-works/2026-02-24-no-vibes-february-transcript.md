Vaibhav (00:00.33)
figured something was going on like that.

Dex (00:02.368)
Yeah. All right. We made it. Sorry we're a little late, Welcome to AI That Works. This is going to be a quick one because Vaibhav has got to leave at the top of the hour. Bottom of the hour. It's top, right? Bottom is 30, right? Amazing. I'm going to shoot you the whiteboard in the studio chat real quick and then we'll get into it. Do you want to introduce the show and yourself and we could go from there?

Vaibhav (00:15.07)
Whatever it is, it's on the hour.

Vaibhav (00:23.99)
That's it.

That's it. Hello everyone, I'm Vaibhav. I'm one of the co-hosts of AI That Works. Every Tuesday, Dextre and I get together and we like to go talk about AI stuff that kind of works. I work on BAML, which is a programming language for building AI pipelines. And this is my co-host Dextre, who works on HumanLayer and has been known for context engineering.

Dex (00:45.934)
Amazing, uh, uh, incredible intro. And today we are going to do a very fun segment that we do, uh, roughly once a month, uh, called no vibes allowed where we are going to put a bunch of the stuff into practice and we are just going to live stream me and vibe of collaborating on a feature in, uh, one or both of our tools that we work on every day. So you're going to get a peek under the hood of how we build, uh, using all this stuff, putting it all into practice. Uh, so today, uh, I guess.

we can get into it. We are going to be building. If you've seen other live streams, we use a tool called Riptide, which is the working title for the human layer IDE, named TBD. But if you hear us say Riptide or code layer, that is what we were talking about. So I'm going to pull this open. Riptide is basically a manager workflow thing. Just to walk you through kind of what we're doing here.

I'm just going to launch a cloud code session here. and essentially what you're going to see is, a demo of what we're going to build today. So I can say this, I can say, you know, bash sleep 10. And then the issue that we have with this is I cannot actually, if I want to send another message when you're done sleep again,

I, there's no way to queue this. can interrupt the model and send another message, which will cause this like interruption thing to flow through the tool call pipeline. But what we really want is the ability to queue a message. Does that sound right, Bye Bob?

Vaibhav (02:21.791)
Exactly, because one of the most annoying things that I love to do in other agentic systems is I press enter and it waits until it's done and then queues it on.

Dex (02:30.658)
Yep. And we've actually done an episode before about interruptible agents and how to build message queuing and how to decide when and how to interrupt and what to provide in the interruption message, right?

Vaibhav (02:40.565)
Exactly. Because interruptions are slightly different than queuing, but the technology stack is the same.

Dex (02:45.666)
Yep. So I'm just going to get this ready real quick. I'm just going to make sure we have the latest main pulled. Okay, we're there. And then basically what I've done is to prep for this episode is I've actually done the early parts of the workflow. So we've talked about a little bit about kind of the workflow steps and I'm actually going to pull. Where is it?

I'm just going to pull this graphic into our whiteboard for today. Wait, where did it go? This one. Yep. So we have this kind of long, extensive workflow for doing context engineering across agents where we start with.

Vaibhav (03:28.277)
Can you get rid of the Riverside tag at the bottom, Dexter? Yeah. Yeah, there you go.

Dex (03:31.328)
yeah, sorry. So we have this long workflow of going from research questions through to research, through to design. We're going to walk through this. We've walked through this on previous episodes as well. Since the last time we did one of these episodes, we kind of only made it through to the structure outline and the planning phase. We didn't actually ship any code. I've actually gone ahead and gone through to the design discussion. I haven't looked at it yet, but just this morning I kicked off a job. So if we come into Riptide, we've created our research questions.

And you can come see here's the ticket that I wrote which has a couple comments between me and Kyle of like hey we want to support message queuing using the Cloud Agent SDK. And so those questions were used to create a large research doc which kind of outlines how we use the async prompting, how the state machine for sessions works, the states in which we allow you to send a new message, the interrupt flow, the continue session flow, all this kind of stuff.

ViBob, do you want to go a little bit deeper on any of stuff or like you're kind of familiar with the tool and the architecture, so.

Vaibhav (04:30.21)
Yeah, so I'll hop into the doc really fast just to catch people up on what we're going to be doing. I'm at the bottom deck here. So this ID, and today what the ID allows us to do is you can press this button and you can hit interrupt. Interrupt. While the process is happening, that's the only way that you can actually go do things. I think the default that we're trying to go do.

Dex (04:35.842)
Yeah. Yep, I got you.

Vaibhav (04:55.777)
is make it so the default here changes from interrupt into queue. And of course you should still be allowed to interrupt as before, but by default when you press enter it should just add the message on and wait until the system is done and then proceed onwards. This isn't that hard, especially because we're living in a single process machine that makes life much easier. We're not doing it to shoot a system. So some of the race condition stuff is kind of handled for us for free, which is kind of nice.

And then the only other question to ask is how do we make it so that it's very easy to modify the queued messages? How are we allowed to queue multiple messages at once? Do they all get concatenated together as a single message? And what happens in the queuing behavior there? But otherwise, I think this should hopefully be a straightforward task. And hopefully people can get a pretty good idea of what the difference is technically between an interrupt and a queue, and we'll get to talk about some technical concepts as well.

Dex (05:50.658)
Yep. And just to kind of demo how this works, maybe briefly in the cloud code CLI itself, I can launch cloud here. could say bash sleep 10. And I can say when you're done sleep again. And so that cues the message. Yeah. This is the behavior we want to implement.

Vaibhav (06:07.688)
Yeah, and that is.

Dex (06:11.81)
The Cloud SDK supports it, and we've done some research. I even had our one thing that's really fun is you can actually have Cloud. I think one of these actually did a ripgrap through the SDK source code itself to go find actually just the types for, let's see, yeah, Cloud Agent SDK. So we looked in node modules and actually went through and found the types and the interfaces.

Vaibhav (06:25.288)
to go find it.

Dex (06:39.446)
Some of the code inside Claude is minified, but you can at least explore the types itself.

Vaibhav (06:44.008)
Yeah. Riptide is not open source as of right now, but you can go ahead and actively sign up for the waitlist and then get access to it pretty easily, especially for people on the show.

Dex (06:45.496)
So.

Dex (06:54.968)
Yes. Yes. So I've gone and created our design discussion, which was just a session here, use the Create Design Discussion skill, went through and did some analysis, and then we've built this design discussion doc. So I haven't looked at this yet, but one thing I want to do before we look at this is I know that we don't have, we talked a lot about learning tests and about how do you create feedback for Claude to understand, especially libraries, which are closed source, like the Claude Code SDK, the

The wrapper parts are open source, but the binary itself is not. So we really, really like to build some what I call learning tests here, which...

let's see, let's find one here. So this is an example where we're actually going to run the cloud agent SDK and run it in bypass permissions and like make some assertions about how, like what sorts of messages and Jason come out of this. That makes sense. So I've actually primed it as well in another session of just like, cool, read the design discussion and then, and then basically like come up with a proposal for proving how this stuff works.

And so one thing that we found was like our stream, we do have a streaming input test, but it uses a timeout and it doesn't actually test that you can like cue a message. So I think this is probably the right one. So I'm just going to come on here and let's see.

What is up with my whisper flow?

Vaibhav (08:30.694)
It's WI.

Dex (08:34.23)
One of these days I learned a spell. Can you just create exactly one test where the model has a tool approval for the bash tool and ask it to do bash sleep 10 and then immediately queue another message that says, you know, when you're done, sleep again. We'll actually do bash sleep three just so the test runs more quickly. But let's get this running and let's get enough example code that you're able to update the design doc with any findings with how the SDK actually behaves.

Does that make sense?

Vaibhav (09:05.332)
And again, these models are really good at pattern recognition. really what Dextre you're doing here is you're helping you build a pattern in your repo that says we use this opaque tool called quad code that doesn't really document very well its behavior. So in order to deal with that, we have a pattern for how to explore the SDK in the form of learning tests. We talked about this agentic back pressure, like either last two episodes back and then

when now that the model can just replicate, doesn't have to innovate anything. It's literally replicating its existing learning tests. And most importantly, you're using the same terminology there called learning tests. So like you're using the same word, so it knows exactly what to do. It replicates a pattern really fast. The harness knows what to make happen. So then what's happening now is if it is able to go and confirm something about the queuing behavior, it should be able to give you all the design information you need on your end to make that behave properly.

Dex (09:59.117)
Exactly.

Right. And this is kind of like one of the, one of the challenges with this whole like planning workflow. And we talked about this in the back pressure episode, but like what happens if you have some assumption because you read the docs, but the docs were wrong or misleading, or you misunderstood them or Claude misunderstood them. Like you're not going to find that out till you're like two phases into your implementation. And then you got to go rewind and redo all of this work. So this is kind of a, an opportunity to jump back and kind of do some, there's, there's a couple of flavors, like there's research from code.

There's research from the web and then there's like a research from like proofs. I call them proofs or learning tests or whatever you want, but there's like multiple different ways to build up knowledge about what is true about the world, whether it's my code base or external things before we decide how we're going to approach building something.

Vaibhav (10:50.996)
What's really interesting about this approach is I use this all the time and I do it slightly different flavors, but the idea is the more assumptions that you can bake in ahead of time and the more correct your design is, the more likely it is that your implementation will be correct.

Dex (11:04.971)
Exactly. I'm going to minimize, minimize the chance of surprises because then you're like deep in a thousand lines of code changes and you have to try to like, re-navigate your way out of it.

Vaibhav (11:15.346)
Exactly. And now I imagine a scenario and there's this, I mean, Amazon's famous for leadership principles, but like, and I know they're a meme almost in a lot of scenarios, really I know them, but there is one that I personally abide by really well, which is just that great leaders are right a lot. And the fundamental matter is like the way that you get right a lot is you make really good decisions upfront. And when you're, when you're right, it's not that you're good because you're right. It's that when you are right, you move so much faster than any other competition.

because you don't have to go back and fix your mistakes. So what ends up happening in coding is the more, the less mistakes you make, even though it feels slower, actually the way faster that you move because you're not backtracking and backtracking is the hardest thing to go do. Even, even though now in cloud code you can rewrite the whole system from scratch. If you're going to make a mistake, you will, you will literally just move way slower. And especially you make an architectural mistake, then you'll move even slower.

And if you detect that mistake five days later after you already merged it, then you're still going to be even, make even more mistakes along the way. Like you really want to minimize the chance of mistakes and you want to be technically correct whenever possible.

Dex (12:28.492)
Yeah, it's like decisions take not a lot of time and have a lot of impact, whereas execution can take a lot of time. And so if you waste time in execution when you could have just made better decisions, then you're not going to make as much progress as quickly. OK.

Vaibhav (12:42.309)
Exactly. So that's why I think most people get like this learning test is going to be phenomenal because once we know exactly how to use the cloud code SDK for queuing and it's confirmed with a test that it works that way, the design doc here is trivial.

Dex (12:55.886)
Yep. Well, so I will say you mentioned this is not a distributed system. This, really is a distributed system. So the architecture here is like, you're entering a form in a UI, which then stores things in an API, which has a database of like queued messages. And then the demon is actually like fetching those and then relaying them down to cloud code, multiple cloud code sessions. So we will have some interesting infrastructure stuff to go through here.

Vaibhav (13:16.349)
Yes.

But you don't have the same race conditions that you have across network packets.

Dex (13:23.426)
That's true. Okay.

Vaibhav (13:24.731)
That's what I mean. Like networks packets coming in and out of order in various ways. Like it's basically no order of delay here is like some note. should be like one or two milliseconds, which gets rid of a lot of like the human, the human press enter and oops, I pressed enter again before the message came back to me and round trip with the state of the world was.

Dex (13:48.386)
Yep. So this is going to keep working while this is running. We can pop back to our kind of main design. I'm going to archive that one. We can pop back to our kind of main design discussion and just start reading this. And I'm actually going to create a anyone can view link and I'm going to send this to you, ViBov, quickly in the chat if you want to kind of like skim it on your own.

Vaibhav (14:08.339)
Perfect. And then while we're here, do people have questions? Have other people queuing or interrupts or other workflows along the way? I know Josh, you asked a question. It's 37 % for dumb zone detection. Generally, the less context you use, that's a smart zone. So once you start hitting like 40, 50, 70, 80, 90%, it's not that you're in the dumb zone, you're just being less efficient with answering questions. And like...

Dex (14:33.858)
Yeah, you're getting worse. If your problem is really easy, you can solve things in the dumb zone. The harder your problem is, the more you want to optimize for doing most of the work in the smart part of the context.

Vaibhav (14:44.773)
Exactly, exactly. That's like the best way to frame it.

All right, we're going to be a little silent while we go read. But I will maybe perhaps entertain people while you go read this text really quickly. You're asking if Riptide is like Cloud Code. I think Riptide is more analogous to a harness around Cloud Code. Because if think of Cloud Code as a way of doing work, Riptide is more like a workflow on top of Cloud Code. It's slightly more opinionated in the fact that it makes you do little bit more thinking upfront and helps you discuss and go back and forth with the system.

Dex (14:51.246)
Yes.

Dex (14:58.734)
Okay.

Vaibhav (15:20.593)
Whereas typically with cloud code, even in plan mode, the default workflow is like when you do cloud code planning, it produces a plan. And that's often it. I see most people just hit straight enter, clear context, go onward. And that's because most people don't actually read the plan in detail because it's not designed to be read in detail. you're, let's be real. No one, there's a reason we don't use less.

Dex (15:40.019)
Hahaha

Vaibhav (15:45.694)
to read the less command and grab to go read their terminal. Very, very few people read in like VIM. Most people like to open NeoVim or like some other ID to go read code because UIs are nice. And it just helps with reading faster.

Dex (15:58.486)
Or I think it's also like what I'm doing when I'm going through this doc, right? As I'm like making sure it understands what the end state is of like, okay, yes, we need to show a message in the UI. They're running in, they're delivered in order. The demon picks them up. The existing flow works as is. I would also add one thing here, which is like for desired end state, we want to make the default action.

when you command enter while the session is running to cue message and so there's a new button for cue message and then there's another button that will be persistent for interrupt and so rather than a single interrupt and send button while the session is running we'll have those two buttons so let's highlight that in the desired end state and reflect that throughout the dock

Vaibhav (16:42.757)
And again, this thing wouldn't have been caught unless Dexter was actually reading the doc, which is why, sadly, Dexter's gonna... that's why he's gotta be silent for some time, because there's no way to talk and read at the same time.

Dex (16:46.798)
I'm reading the doc.

Dex (16:50.51)
Well, so I can, I could, I could talk through kind of like open in my, like just basically like talk, thinking out loud of how I'm like reading this and what I'm looking for. Like we have the desired end state and then the next level down is patterns to follow. Right. We talked about how AI models are really, really good at finding and understanding and like matching the patterns that already exist in your code base. And so one of the reasons I've built this into my design doc system is basically because

I want to get a brain dump of what the model is thinking and what it has seen because if the model goes and starts coding, you might catch it in the middle of coding. Like, you picked up the wrong pattern. Now our code base is only a couple of months old, so it's got mostly good patterns. But when we work with people who have very old code base have been around for 10 years and have five different ways of doing something like, let's say an atomic SQL update, we want to make sure that we're doing those inserts correctly. And so I'm going to skim.

Vaibhav (17:30.268)
Exactly.

Vaibhav (17:45.957)
Exactly. like the idea is like, and really it's like, look, one bad grep in your cloud code, like code research system is all it takes for your system to be bad. that great leaders make right decisions. That's one bad grep and you've made the wrong decision. And if you're not even reading it, let's be real. We don't read all the coding I generates. That's just slop that gets amplified over and over and over again. And that also has consequences because next time the odds of getting that bad grep go up.

because it's like, you just reinforced the pattern in a very modern way in a more recent timeframe saying that pattern was acceptable. So like, of course I'll do it again.

Dex (18:16.278)
Exactly.

Dex (18:22.85)
Yeah, your, your code base will always regress to the average of the best pattern and the worst pattern in the code base. It will just have more of the bad ones and also maybe sometimes pick up more of the good ones, but it will just regress to the median.

Vaibhav (18:30.994)
Yeah. I would actually say your code base would probably converge on the most common patterns in your code base and convert us to the mode more so than anything else. Because like whatever it finds more often is what it works. overall, you've got a great question. How do you handle when agent, when the agent is constantly getting into issues? I've been asking you to update its progress and blockers in an implementation summary file, but is there a point

Dex (18:42.232)
Yeah.

Vaibhav (18:58.898)
where I try a different approach. Do you persist these progress files somewhere after you're done with the, done with the task? So one of the other nice things about Riptide is you do get all these files preserved in nice little like shareable links. Like for example, Dexter has shared that with me. Well, I can tell you our workflow. I don't actually check in these plan files everywhere into my repo. Plan files are throwaway. Research files are throwaway. They're like task specific. It's very similar to like, um, if any of you ever worked in like a large company, like for example, like when I worked at Google, we wrote design docs all the time.

but we also never referred back to design docs after the implementation. And that's okay.

Dex (19:28.887)
Mm-hmm.

Right, the code base, as soon as it's shipped, the code is the new source of truth.

Vaibhav (19:36.014)
Exactly. So every time you want to go learn what the system does, like sure, maybe you'll give a design doc to a new hire that came in to understand me conceptually, but I would never tell a new hire to be like, this design doc is what it's true. If you want to know the truth, read the code.

Dex (19:46.36)
Yeah. and that's why we always generate the research on the fly as well. We don't really rely on like code-based context, high level, very high level things. Yeah.

Vaibhav (19:52.775)
Yeah. And you definitely don't want to preserve. Yeah. You it's just so cheap and like time wise and money wise to go determine the research that it's literally not worth storing this information. Computation is good.

Dex (20:08.952)
Yep. So here's the, by the way, here's the, here's the learning test output that got added. So we actually have like the observed output from the test, which shows exactly like how the state machine of the internal quad thing behaves when we feed additional messages into it. So this is super valuable. This did exactly what I want.

Vaibhav (20:26.662)
Yeah. Joshi, you've got a question. Can you specify new patterns? For example, let's say I'm creating a V2 API that uses a different pattern than V1 API. How can I say use the new V2 pattern? Well, that's really easy. You just tell it, use the new V2 pattern. And like Cloud Code when it does the research, like as a part of your ticket definition or your original task that you do before performing the research, you just say...

We strongly prefer V2 over V1. Then you let it discover the research, produce the design doc. Then you read the design doc to confirm that it made that critical design decision of your choice, saying it better be using V2, not V1. And it might still reference V1 as like an older pattern, but it still says, hey, V2 is the more consistent pattern that we want to go use. But it's twofold. It's one about telling it to do it and two about actually just verifying that it did do it.

Again, it's very similar to hiring a junior engineer. Like when you're first implementing a design doc, you can have a design doc that you wrote as a more senior engineer. You hand it off to junior engineer. They're almost definitely going to mess it up somehow. Like almost definitely. And that's not because they're bad. It's probably because you missed something in the design doc or you had some small thing that was slightly off or you had a baked in assumption that was in your head that you didn't feel necessary to write it down. So how do you validate that system? Well, you go read their system, like whatever they implement that you go read and validate it and it matches.

the dock, at least for the most critical parts.

Dex (21:52.686)
Well, and the inverse is also true, right? So like Kyle, my CTO is like kind of the end all owner of this code base. And I actually don't know the answer to like, like in this code base, you consider me junior to Kyle in terms of like ownership and like opinions and like having the last word on how this stuff builds to make, is built to make it the most maintainable. I actually don't know the right trade-offs between option A and option C.

So I'm just going to take the recommendation, but if we weren't live on a podcast, I would actually just like copy the link to this and send it to him. Actually, I think we get them auto linked to the, to the linear issue, but I would just copy the link to this and send it to him and ask him to like, tell me which of these options is correct. Or if we want to actually do like an option D that's not even surfaced. the option one is basically we're going to add a new collection, watching the conversation events table, which is like.

Vaibhav (22:34.863)
Here, let's, what are the options here? Let's just pick one that.

Dex (22:45.11)
It's a little bit over. So conversation events powers all of the events in this stream. so it's the, the user messages that the user enters merged with all the events we got from the cloud SDK. So we already kind of use it. I'm actually like, can you add more detail on the trade-offs between a option B is a terrible idea. It's like putting a cued messages, Jason B array, which makes it really hard to do it. It's going to really hard to do atomic updates on that one.

Vaibhav (22:49.744)
Got it.

Vaibhav (23:04.433)
What's option B?

Vaibhav (23:10.944)
yeah, that's incorrect. That's incorrect. Yeah, exactly. Yeah, that's a no-go. That's like, clearly a no-go.

Dex (23:17.0)
And then option C is basically create a new table and a new collection. I think like option C is a little cleaner slash safer, but option A seems simpler. I just don't know what the consequences will be of overloading that table even further, since it's really meant to be a like display logic for what shows up in the session.

Vaibhav (23:45.202)
Well, in some ways, messages actually are good to display the logic, because they are basically also going to be displayed. And the state of the message is going to be displayed. If you remember back to the Q and interrupt episode, I actually think that's the right way to think about it. There's a single source of truth.

Dex (23:54.604)
Yeah. Yeah.

Dex (24:00.162)
Yeah, my take is that we might want a message queue table because that'll make it also easier to show in the UI. And then we would just only show queued messages matching some filter that like they would get flagged as once they were delivered and acknowledged and we have the explicit life cycle. So I'm leaning towards C, but add a little bit more detail and we'll come back.

Vaibhav (24:18.989)
I meant like keeping the same, I actually meant keep in the original one and then just basically make all edits also like incremental on top of it. So, then whenever you process the next event, you pop off all the, all the cute events and you process them all together.

Dex (24:33.516)
Yeah, I mean, I think we can do that with option A or C. So I'm going to just actually fire that off and it's going to go do some thinking and searching. And while that's happening, I'm going to come to question two.

Vaibhav (24:45.009)
Okay. And someone's got another question really fast. Is there a way in human layer to specify this? There's nothing specific. mean, human layer is more of a process. Like Riptide is more of a process of how you use cloud code than like, there's something, uh, and the process itself is highly opinionated, but it's still flexible enough to do the thing you need to go do. like if I, I'm Dexter, you, you build the product. Like I, at least I can, I would personally hate it they started opinionating very specific things, like the way my code should be structured. Um,

Dex (25:13.956)
yeah, no, we won't do that. The whole point is like, I don't want to make decisions about your code base. Claude should, you should not want Claude or Codex or any agent to make decisions about your code base. The idea of this design discussion doc is that like it forces the human to do the high stakes decision making about the architecture of the system.

Vaibhav (25:15.28)
Yeah.

Dex (25:34.712)
But everything up and to this point is something that AI is very good at automating of going and reading a hundred thousand lines of code and figuring out which ones are relevant and asking really good like architecture questions. But you, the human are in the driver's seat. And again, like we don't even have to answer option A or option B for this question. can, we can even, we can even say, actually I want to do option C or like kind of re steer the whole thing. But this is your chance to, before the model starts working and coding or even building a plan.

Vaibhav (25:41.562)
Exactly.

Dex (26:04.844)
like do brain surgery on the model and like update the patterns it's going to follow and the approaches it's going to take before we go further down this process to the structure and how we're going to break this down into tasks and then the actual code we're going to write and then actually going and shipping it.

Vaibhav (26:23.727)
Dextra, I'm going to take over screen share really fast while you go read. Because I'm going to go show a couple more examples while people are doing this. So for context, one of the things that I've been doing is we've been reworking our proto system to be a lot more robust so that you can construct more arbitrary types and do more interesting things in BML. And part of that was doing a whole migration on basically redefining our proto. And what that really meant was some of our types, like media types and like

Dex (26:26.008)
Go for it. Go for it.

Vaibhav (26:53.265)
prompt types aren't available to you inside the language of your choice. They are available in a slightly fuzzy way. We're making it much more wire friendly and relatable. So I actually went through and this was exactly what this was. We had a V1 migration, we had a V1 version of the Proto and a V2 version of the Proto. And there's two ways that people can approach this. One way is you have the same code base and you kind of create a, you kind of make it so you kind of kind of keep both alive together. That

Josh, it is the problem you're probably running into is like, how do you tell them all that you need to keep one thing alive or not? Well, the way that you, what way that we found best work to actually solve this again, because writing cheap code is so cheap. actually just creating a whole new folder at a, at a new top level on almost a new package and just writing all the code in the new package. And then anytime you have code that's in the old package that needs to be migrated over, you just migrated over. And it's so, so cheap to go implement this. That doesn't matter. And then I just went through the approach and I basically just went through and I did the research questions. did the.

And it came up with a bunch of questions along the way about like what it needs to go answer. Then it went and produced the doc for what it needs to go do and understand the existing type system and actually like pull out everything perfectly out of here. And once it did that, then I spent the 90 % of my time basically just iterating on this one file over and over and over again until it produced a really good design doc. And you can actually see like once it produced a design doc and I iterate on this for quite some time, there's the chat log is pretty big.

Then I actually did another thing, which is it produced a structured outline from what I'm actually going to go code. And the problem is this is a massive refactor. So it has massive consequences across the whole code base and a lot of consequences across multiple languages.

Dex (28:27.276)
So you have to be, you have to be really thoughtful about the order you make the changes in basically, right?

Vaibhav (28:32.816)
not, not just that, but I need it to be complete. And I really can't have any bugs. Cause if I have bugs, like testing, this is like really fricking hard. Cause I'm basically redoing the whole like a serialization there. So what I do is once I produce the layer, not only do I read this structured outline really carefully, but then I do this really silly thing, which is I start like multiple prompts that do this. What's inconsistent such missing for the structured outline. And I just have the model rip on it. And I discuss design decisions. And then

Dex (28:44.354)
Mm-hmm.

Vaibhav (29:02.658)
After that happens, I ask it again, what's missing inconsistent for the structured outline? I just keep on doing that in a loop.

Dex (29:10.062)
You're basically Ralph Wiggum in your structure outline. You're just throw more tokens at the problem and tell it to think more and it's giving you a more complete result.

Vaibhav (29:14.935)
Exactly.

Vaibhav (29:19.6)
Well, no, it poses design questions, design decisions to me at every single stage of like, oh, here's what's bad. Here's what's good. Here's what's bad. Here's what's good. And then I actually think about each of these individually. And then I update the structured outline and then I produce the plan. And guess what? Once I did this, I actually one shot the whole implementation. I'd never, I'd never have to go to edit this code again. And this was like, maybe I can, I can pull up the PR, um, just to show you guys like what this.

Dex (29:27.042)
Mm-hmm.

Dex (29:43.842)
Yeah, how many lines of code was this?

Vaibhav (29:49.776)
This is the Proto PR, so let's look it up.

closed.

Vaibhav (30:00.962)
I think this is... Nope. Where is this? How do I filter for this me?

Vaibhav (30:12.753)
serialization, yes, this one.

Vaibhav (30:22.448)
17,000 lines of Chai added, 13,000 lines removed. This is roughly what this was. But it one-shot the whole thing.

Dex (30:26.498)
Wow. Wow. That's sick. Did you check in in between the phases? Like, did you do any verification or you just have it run the test at the end of each phase?

Vaibhav (30:38.544)
I just had it run tests and it went through and then, and then just to be very, just to be very, very transparent code rabbit, uh, which is our CI, which is the thing that we use for validation actually found a bunch of bugs and like, I don't know if I've asked for a code right. Specifically all these schools are roughly the same and pretty good, but like code rabbit is good enough for us. And it found the bugs. We addressed them and did a bunch more pushes and then I merged it. Well, like end to end time, you just look at my commit time. Cause this will give you a better idea. Like when did I make the first commit of how many commits are so they're like roughly 18 commits on making this work.

And this was two weeks ago all the way to five days ago. So I made some, I got Wasm working a while ago and then I slowly made the whole prototype buffer stuff. So this is roughly the workflow. It's just more about like really quickly iterating in a really good way.

Dex (31:28.472)
Yep. Amazing. That was a great, that was a great detour while I'm over here coaching Claude. Yeah. So for question, for question one, we remember I asked it to add a lot more detail and it kind of like figured out, okay, this is kind of noisy. There's no host ID column. There's a bunch of stuff. So I actually like steered it towards option three and like cons are like dual infrastructure, more infrastructure, dual right and host ID. Like this is actually nice. This is going to make the system easier to maintain and debug. So I'm going to proceed with option C.

Vaibhav (31:34.448)
Keep reading. Keep reading.

Dex (31:58.862)
For question two, it's just asking about like, do we pass this in? And it's like, one of them is proven to work by the learning test. So I'm like, cool, we're to do that one. For the API endpoint, I want to extend the continue endpoint because when I send them, I don't want a separate endpoint for queuing. just like want an endpoint that is like send a message and let the API figure out the business logic.

Vaibhav (32:20.398)
And then you just give it like a bully and I'm like, continue or interrupt. Like you're interrupt.

Dex (32:24.526)
Exactly. Well, we already have an interrupt endpoint. And so it was like, okay, do we extend the interrupt endpoint? Do we extend the continue endpoint or do we add a new endpoint? And I'm like, I like the idea of like, cool, there's just a thing to send a message. And the back end figures out.

Vaibhav (32:37.848)
I would unify all three of them. would literally just unify all three of them to a single message that comes in with a Boolean that says like, that comes in with like a state of like what kind of method you have. And like one of the states is auto that actually would mean, think that that'll actually simplify your logic. Cause again, when you're designing the system, what do I think about what I think about is like, what I want is I want the UI to be done and the dumber that I make my, and this is also applicable to everyone building like a chat app on their website.

Dex (32:43.533)
Yeah.

Dex (32:51.169)
Interesting.

Vaibhav (33:04.356)
The dumber your UI, the easier it is for you to consolidate state and business logic on the backend in your server side, which has a couple of benefits, which means that when you eventually make your backend agent friendly, and I believe everyone will eventually make their backends agent friendly in that world. Now you have a really nice world where you're because your front end is dumb. Even the dumbest agent can use your backend without a mistake because the logic is consolidated in one place, not in two.

And like even here, like the back, the front end is basically sending a request or a preference. It prefers that you queue. It prefers that you continue, prefers that you interrupt. It prefers that you auto, but let's say like the backend has finished a message and you spent queue, queue automatically becomes a continue on the backend. Or let's say you hit queue and there's some race condition in the backend for that reason, continue automatically becomes queue. It's a preference on the UI side. So that deals with, that's how you deal with race conditions in this world.

Dex (34:05.602)
Yeah, so I've said basically we're going to pass an enum, is like cue or continue or interrupt or auto. And basically if you try to continue while it's running, you'll get a 400. If you try to cue while it stops, you'll get a 400. But if you do auto, it will basically route it to the right behavior.

Vaibhav (34:20.143)
I would actually not even do the 400, I would just make it do the right thing. By default. So that way if there's any lag, if there's any lag, you just like, the default to the best known state.

Dex (34:24.384)
Interesting. Okay, so actually,

Dex (34:32.908)
just have a Boolean interrupt bool that determines whether we. Instead of the enum, yeah, I like that.

Vaibhav (34:33.443)
Did- did-

Vaibhav (34:44.515)
Cause it's, it's simpler, you know, and like simplicity, think is key when designing these kinds of APIs. Cause you're not really queuing. You're just pressing enter and you're, it's just a question of you press cancel and enter or just answer.

Dex (34:46.594)
Yeah.

Dex (34:58.22)
Yeah. Yep.

Vaibhav (35:01.581)
And again, the logic is keep your front end dumb. Keep your front end as dumb as possible. Russell, you asked a really good question. If engineering code is so cheap, why not build both or even all the options and test which one works better? Well, it is cheap, but it still cost finite time and finite brainpower. So let's say I could build all of them in parallel. I would still have to evaluate all of them in parallel. Instead, an alternative way to spend that same time is to build another feature in parallel to building this one.

Dex (35:06.476)
Yep. Yep. You don't.

Vaibhav (35:29.421)
And that is a higher value prop than building one thing at seven different ways, especially if I know architecturally the right decision to make already. I don't have to explore bad paths.

Dex (35:36.13)
And you're gonna have to make that decision either way. Like which approach are we gonna use? And so like, yes, sometimes if I don't know what the right approach is, then maybe I will, like what we did here is we forked off and did a learning test. Cause I'm like, I wanna try a couple different approaches and find out which one actually works here versus just picking certain architectures and stuff.

And I'd rather review it at this stage, which is a shorter, you know, 200 line artifact, then go have to review two versions of the same thousand line pull request and test that code end to end. Like if you really have no idea, then you should go figure that out by building little POCs or building prototypes. Or like one thing we do a lot is we use storybook. let me see if I have this in my history.

Vaibhav (36:13.302)
Exactly.

Vaibhav (36:28.827)
The premise is just like, look, you have to do the work no matter what. It's just like how early can you do the work? earlier that you can make the right decisions, the better, the less data you need. You basically want to make decisions with the least amount of information possible.

Dex (36:36.258)
Yeah. So another thing we'll do for... Yeah.

Yeah. So another thing we'll do for like back pressure and like design upfront is like, here's a bunch of like rich, complicated components that we were working on that like, instead of waiting until the implementation and building the whole feature end to end with each version of this, we actually just like, okay, for UI stuff that the agent's not really going to be able to have good like back pressure or like bring taste on it. We can actually,

do this in storybook and kind of like carve off the parts of the decision making that we're gonna do. Does that make sense? I don't think we've talked about this by Bob. We were gonna do an episode on this as well.

Vaibhav (37:15.181)
Yeah, exactly. like if you, it's just again, it's about moving decisions to making the fastest possible decision in the right system.

Dex (37:23.586)
Yeah. Yep. So.

Vaibhav (37:24.927)
And Jen's you asked the question of like did we cover where the docs live? Yes, they don't live anywhere. You delete the docs after you merge this in because it's pointless. Like I think in this case the...

Dex (37:33.88)
Yeah. And so technically like I can open this in my editor and it does exist on my file system and I can edit it here. But the idea is like, I have a ton of like go to archive tasks. I have a ton of archive tasks and like, these are all things that I finished working on and like, yeah, technically I could come look at these old docs, but you don't want to think about managing them. You kind of just want them once, once you're done with them. Yeah.

Vaibhav (37:47.257)
Yeah, just don't need them.

Vaibhav (37:55.639)
Also like go back to traditional companies. Traditional companies have millions of design docs all over them. No one reads them and that's okay. Like we have survived in software. Exactly. Design docs have purely an execution concept. They're there to make it so that you don't make mistakes by accident because you made some fundamental architectural decision that someone else could have known if they just read one sentence in your design doc. That's the purpose of all these docs.

Dex (38:04.94)
Yep, they're there to support execution.

Vaibhav (38:24.342)
is to make sure that when cloud code actually executes, it makes no mistakes.

Dex (38:29.038)
Yeah. And it's just like, it's, it's, it's so much easier to iterate on the design here of like, cool. We want a unified continue endpoint. Uh, we want two buttons in the UX. It's just like, okay, now I know I have high confidence that the agent is going to do what I want. And I didn't have to wait for it to start writing code and then have to try to re steer it or start over or check out the code again, because it's just gonna, it's, it's, it's just, it's dumped out its understanding and we are aligned.

Vaibhav (38:50.798)
Exactly. That's it. How far do you think we can get in the implementation? How close are we?

Dex (38:55.79)
We can certainly turn on the auto advance and I can rip it through the next couple of phases. Have you tried this yet by the way? Okay.

Vaibhav (38:57.346)
Is that the last question?

Vaibhav (39:04.108)
I have, it's great. I auto-advanced through design discussions every single time. It's freaking pointless to do research with like a manual loop. Give me the Ralph Wiggum loop that I want. I want to add that step. I want to have that iteration step that I do, which is like iterate on the structure. Because I do that every single time, I create something really complicated. And I've had a hundred percent hit rate with that.

Dex (39:09.484)
Yep. Yep. So this, yeah, so this is going to keep updating the design discussion. Say what?

Dex (39:24.598)
Yeah, that's actually the that's actually the next thing is like the inverse of auto advance is like cue extra passes of just like go through the research vet every assumption, add more detail, find more things, fill in more gaps. And you can do that at every stage is basically just like cue another round through it.

Vaibhav (39:38.36)
Exactly.

Yeah. We're like, I really like the message I have works really well. Literally just what's inconsistent, slash missing. And it works really freaking well. I'll let you finish reading this. There's like one more question. Brendan, you commented that your team has accumulated a lot of skills. I agree. You should probably prune the number of skills that your team is using to a minimum set that you can get away with. And the reason that I'm not sure I don't know your opinion, but the reason I personally recommend that is because your team probably can't even remember all the skills that you have checked into your repo.

Dex (39:49.847)
I like that.

Vaibhav (40:08.686)
It's way easier to have five or seven skills that are phenomenal and being used all the time and actually being edited and maintained in your code base than it is to have like 70 of which all of them are one hop used by each individual randomly and like different, totally different ways.

Dex (40:24.716)
And this is how I think about all tools actually is like people want to just like give everybody everything and everybody figures stuff out and everybody's kind of going their own path. But like the things that give you compounding returns on engineering teams is like everybody is kind of using the same things and they're all iterating like every week your tooling gets a little bit better. And that's really, really hard if like you have 50 people and like two tools are being used by three people and six tools are being used by some other people.

Vaibhav (40:41.326)
Exactly.

Vaibhav (40:51.339)
Exactly.

Dex (40:52.354)
So it's like, would even say like, like product manage, like the skills you build for your team are products and a good PM goes and looks at their usage metrics and they find the features that only like 10 % of users are using and they remove them from the product. They kill the features that are not getting massive adoption. And so I would focus on a small number of things that everybody uses, that everybody, mean, not every, right? You may have some backend engineers who never use your front end skill, right? But like,

Vaibhav (40:56.29)
It's.

Vaibhav (41:05.398)
and kills them. Yeah.

Dex (41:19.18)
get good adoption on a small number of skills because then you're like guaranteed that like, okay, this is going to become part of our culture. And the time, the time we invest in making things better is actually going to pay off versus like having 70 things and not knowing which one is going to, which one is going to help which people and not knowing where to invest because you, yeah.

Vaibhav (41:39.916)
Yeah. Prune, prune, prune, prune, prune. That is the magic word.

Dex (41:42.712)
cut scope, focus on a small number of skills.

Vaibhav (41:46.991)
Focus on your product, not on your engineering workflow. Like your engineering workflow, like take, learn from other people, leverage it and like copy and paste. Don't reinvent. You will just move slower if you do. Jen, just a question. How do we deal with bike shedding or irrelevant design discussions, like security stuff that comes up? So my...

Dex (41:58.21)
I think so. Yeah.

Dex (42:05.43)
Is this human to human or human to agent?

Vaibhav (42:08.494)
I assume agent like agents proposing like stupid things. Um, I suspect that's because you're probably just not prompting it. Well, I've actually never had it come up with like arbitrary bullshit. That doesn't matter when I'm doing like the workflow well. Uh, and that's because like, it really depends if you're working in existing code base or a new code base in a new code base, it's actually very likely to come up with bullshit. That doesn't matter. But in an existing code base, it really just follows the patterns that your code base has. So if you have like dumb unit tests that basically check like no ops and like things that don't need to be unit tested.

Claude code during the region phase will be like, I need to add unit tests for every little thing that I do, which is actually a drag, not a value add. If you're deliberate about what unit tests you add in, it will also pick up that, oh, we only unit test this kind of pattern. And this is the interface we need to unit test, not every interface underneath the sun. And I think that's really what it replicates. It replicates the patterns that you already have in your code base. And if you have no patterns in your code base, in that very beginning phase, like the green field phase, you have to replicate.

But 90 % of code bases are not greenfield. And if they are, just, you can just prompt it. You can just tell it to ignore that concern. Exactly.

Dex (43:09.262)
Correct. The approach is different. But even if you have a Greenfield codebase, it's going to become not Greenfield within like three to six months. And then you're going to need to know how to do this, or you're going to have to throw it out and rewrite it from scratch, which like is not how you build. Depending on how careful you are. Yeah. I'm going to talk about quickly what's happening here. So this is.

Vaibhav (43:20.269)
or like.

Vaibhav (43:23.81)
or like one week at the rate that code gets written now.

Dex (43:32.91)
building. we talked about like, basically, like the design discussion is figuring out where we're going, the structure outline, how we do this is basically like, how do we get there? And so like, the models by default tend to want to do what I call like horizontal planning, which is I'm going to delete all of this, where it's like, okay, we're gonna do the database, and then we're gonna do the service, then we're gonna do the front end, we're gonna do the API, and then we're gonna do the front end. And like, before you know it, you're at the other side of 1200 lines of code, and there's been nothing along the way for you to test.

And so this is what I call horizontal planning. The models love fricking doing this. I don't know why. And so what I have found works really, really well, especially for larger features where like you want to kind of check in and make sure it's good along the way is we do what's called vertical planning where we will like take a slice and like mock the API and do a stub front end component. And then we actually build out the front end component on real data. And then we mock the services layer when we wire the API through and then we do the database migrations and then we add more bit.

everything up, we wire everything up. And then maybe here we add some like special like business logic stuff that is like the meat of the issue, but it's like the same way you would build, you wouldn't write 1200 lines of code and not check on it. You would at least run the tests in between phases and you might spot check a couple things in between to make sure it's good. This is the art of vertical phases. And so the idea of the structure outline is like, instead of reading the entire plan with every code change,

You want to just kind of review the approach that is being taken. And so this is going to surface some of the stuff from before. And then it's going to talk to her. like, okay, we're going to make the schema and a message queue table. Then we're going to make the route and the collection. Then we're going to like queue messages and the prompt generator. And then we're going to do this unified continue endpoint. Okay. Interesting. So the problem here is like, we're not going to be able to test this endpoint until.

the very end, like I would rather, well, so I would rather do the endpoint first because then we can at least check in the database that messages were like inserted correctly. And then we'll do the actual logic that causes the clod side. Cause like, can't test this until you have a way to send the messages in. So why would we build the daemon side before we build the API side?

Vaibhav (45:29.451)
I think that should be fine though.

Vaibhav (45:47.725)
Oh, interesting. I see why you do that. Okay.

Dex (45:51.308)
Because like basically like this is a lot of complicated stuff. We're making new database tables. We're making new contracts. I want to be able to click something in the UI and just go look that a thing was inserted into the database at least. by I, I mean, mean, Claude's I'm going to basically like click the thing and then like Claude's going to go check what's in the database, in my dev database on my local build. and then we'll go and actually wire it through to the other side. Does that make sense?

Vaibhav (46:13.549)
Yeah. And again, that's just like preference for what for other people, like, why are we doing this? Well, Dexter said a very good reason. He's like, I want to test sooner, not later. And the sooner that you can test the system, the better it is. And if you have no way to test something, then what Dexter is basically betting on is not the fact that like his design deck is right or wrong. He's just reducing the probability that he has to backtrack. And like, if, and

Dex (46:22.498)
Yes.

Dex (46:35.054)
Yes. You want to, you want to optimize for, for being able to finding surprises and finding incorrect things as early in the process as possible. like if this front end thing looks like shit, I want to like get that looking right and make sure I like the behavior there before we go and actually wire in real data, because I want to not have to debug the data layer and the front end experience at the same time. I want to like test and valid validate one piece at a time.

Vaibhav (46:50.177)
Yeah.

Vaibhav (46:57.421)
Exactly. I also want to chime in on like one other point here. Like we're doing this live on the podcast. look, there's no way that's right. Time to read this as thoroughly as he would normally if he's coding. like part of that means, well, if I haven't tested, I haven't read everything super thoroughly. I need to be more rigorous about testing earlier rather than later, even more so than normal. So even though in like my example, I showed you that I went all the way through and like the plan just exceeded one way through. What I had to do was I had to go ahead.

and actually read everything super meticulously. And you saw how many commits it took to actually get to the final point to make it work. But it was very meticulous here by moving the UI phase up and actually make sure that the database gets correctly done. We're just reducing the risk that any design decisions we made were going to be incorrect along the way.

Dex (47:32.248)
Yeah.

Dex (47:48.098)
Yeah.

Vaibhav (47:49.973)
And again, there's no right or wrong answer. It's just a preference based on what tolerance you have for redoing work when something is incorrect.

Dex (47:58.37)
Yeah, and I'll, we won't actually finish this today, unfortunately, because I know Vaibhav's got a hard stop. But the way I think about this is like, you want to, let me delete some of these things. Basically, like the more time you spend on the plan.

Dex (48:15.394)
you have to backtrack. more time you spend on the like, so vertical is like the correctness of the plan, right? The more time you spend on it, the closer you can get it to like full one shot-able. But the idea is like, there's some sweet spot where it's like, okay, if I can spend 10 minutes and get it 90 % of the way there.

then that's better than spending an hour to get it 99%. Cause there still might be surprises. And at a certain point, it's easier to read the code and play with it than it is to like stare at a thousand line plan doc. And so like, this is actually split up into a number of different probability curves, which is like, okay, what's the chance that you have to iterate on it live? That's the area below this curve. So that goes down the longer you do it. And then what's the chance I might have to like re-steer and restart the implementation.

And what's the chance I might have to restart the design. And it's like at every phase, it's like the, the chance you will have to backtrack goes down the more time you spend on it, but you're never going to guarantee that you can one shot it. And so there's this weird like optimization problem that I think is like, just takes a lot of intuition of like, how much time should you spend at any phase, making sure that it's good versus like how, how big of it, how much time will it waste if you have to backtrack? Does that make sense?

Vaibhav (49:26.923)
Yeah, exactly. And then David, you're asking a really good question of like, are you asking anyone on our team to review these docs? I know that Dexter clearly said, like, if he had this question, would have sent Kyle to go look at it. We kind of operate the same way as well, which is the way that we operate on our team is like, by default, we just trust individual developers to make good decisions. But part of that making good decision is to recognize when something is complicated and to bring someone else into the fold as they need to.

Because it's impossible for everyone to read everything, it's just not worth it. But for really complicated things, you want the more relevant people reading it whenever possible.

Dex (50:01.24)
Yeah. And it's optional in our process, but like, I am incentivized to send Kyle this design discussion and have him review this and help me answer the questions. Because the alternative is I make the decision. I make the decision that he doesn't like. And then I spend all this time building it and testing it and playing with it and exploring it in the, in the, how do I say this? Like the implementation phase. And then by the time it gets to PR, it's like, no, this is all wrong. We can't make another end point because of some random.

electric sequel performance thing that I don't know about.

Vaibhav (50:31.254)
There's some reason, like something Kyle's working on right now that's gonna conflict with this.

Dex (50:35.522)
Yeah, that's going to conflict with this. So it's like, basically everyone's like complaining about drowning in like AI developed PRs or like PRs written by people with AI that are slop and like, I actually don't think the problem is too many PRs. think the problem is too many bad PRs and like even, even a 500 line PR, like not a big one. If it needs 20 % rework, that is like a huge like

Vaibhav (50:58.388)
It's just mental tax.

Dex (50:58.506)
mental and emotional burden on both the submitter and the reviewer to go and give the feedback and coach the person and all this stuff. And so it's like, if you can, if you can maximize the amount of time when like I send Kyle this PR and he's like, yep, that's what I asked for. Yes, that's good. Yes. You've done that right. Because we aligned on a lower stakes doc that I'm not attached to yet. Cause I haven't dumped all this time into making sure it's right and polishing it. That is hugely valuable, I think to any software team.

Vaibhav (51:06.572)
Yeah, just.

Vaibhav (51:25.032)
It's, it's the same reason that like, look, you just, you want to, you focus more on the plan than you do on the code. You focus more on the plan than you do. You focus more on the design discussion and doing the plan, bring people in earlier into the fold. That's, that's the magic. Bring yourself in, bring the agent in, like spend more and more time earlier on the fold, making good decisions. The better your decisions, the better your output. It's a direct one to one correlation there.

Dex (51:52.28)
Yep. I think that's probably a wrap. Look out for this feature soon. I'm sorry we didn't get to it. Next time we do one of these, we'll have to actually block the full two hours, but I think neither of us are able to go over today. This was super fun, man. Thanks for joining. I think we shared some interesting lessons. Hopefully this didn't just feel like a Riptide demo and you learned a little bit more about how we think and how we build stuff internally. So thank you all. Vaibhav, any last thoughts, any big takeaways here?

Vaibhav (52:02.156)
I am sorry about that,

Vaibhav (52:19.91)
No, for everyone interested, next week we're going to talk about how to do PIA redaction and how to actually design a system both on the eval side and the code side to go build that out. Excited to share. Thank you, everyone.

Dex (52:30.208)
Awesome. See you all next week. Thanks.
