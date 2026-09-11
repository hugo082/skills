Dex (00:01.512)
hello. What's up, buddy? I'm doing good, dude. How are you?

Vaibhav (00:01.883)
All right, how's it going Dexter?

Vaibhav (00:07.099)
in your area.

Dex (00:08.504)
Happy New Year. Did you have a good New Year?

Vaibhav (00:11.771)
I actually had a really, really fun New Year's. I took a couple days actually off, which was really nice. I had some friends come over, we made some pizzas. It was just a good time overall. What you do? We'll start that for everyone that's here. We'll start the real content around 10, 10, 10, 05, while we're just doing some stuff. We just hopped on a little early today.

Dex (00:34.208)
Yeah, and I don't know if this was like publicly broadcast, but we did change the start time from 10 a.m. to 10 10 a.m. because that way you all know when to show up. And if you want to come and hang out and watch us yap, you can. But we will start the show show at 10. So go grab a cup of coffee or an energy drink or.

bag of anthropic tokens or whatever, whatever you need to get through this disaster of an episode that we're about to jump into.

Vaibhav (01:00.76)
Yeah.

Vaibhav (01:06.083)
Yeah. Yeah. We'll see how it I spent a lot of this time having actually some fun conversations over the holidays about latency. And I was like, it's going to be really, really relevant. I think, to more and more apps, like more and more people I know are concerned about latency. And I find myself even when I'm using coding agents, one of the things that frustrates me the most in coding agents.

Dex (01:08.942)
It's not a disaster, it's gonna be dope.

Vaibhav (01:33.095)
is for example, when they do that file editing thing, it's so annoying that they only show you the code snippet in their stupid UI view and not in the main code. I'm like, wanna see my file changing with the code so I can see it in real time, rather than waiting for the whole thing to finish and then show me the code when it's done.

Dex (01:43.0)
Mhm.

Dex (01:52.419)
v0 is really good at this. Like lot of the vibe coding things will like kind of stream out the code while it's working, but they also like, show you the new code being written, but they leave the old file actually on disk and so you can see the old version of the app without like breaking it.

Vaibhav (02:03.589)
Yeah.

And it's so annoying because the new code is so tiny in the UI, so I can't even read it or glance at it while it's happening. So I have to wait till it's done. And I don't have time to really digest it. So I can't steer it to optimality. All right.

Dex (02:19.97)
You know you should build. You know how semantic streaming works with like JSON data? What if, you put a layer of semantic streaming on top of the JSON tool call, right? So you close all the brackets, so it's always valid JSON and you just show the partially streamed code, right? But then you take the code inside that block and you do the same thing again, where you make sure that the code that's being streamed out always compiles. You close all the parentheses.

Vaibhav (02:28.1)
Yeah.

Vaibhav (02:37.818)
Yeah.

Dex (02:49.238)
so that the code that is there is always works and so you see the page being rebuilt from scratch every time it's emitting new components.

Vaibhav (02:58.157)
I agree, that would be wise.

Dex (02:59.374)
It's a much harder problem than making syntactically correct JSON is making syntactically correct, let's say, Rust programming language out of a partially streamed function. But you could do it, technically.

Vaibhav (03:04.013)
Thank

Vaibhav (03:10.939)
It's a little bit hard. mean you can make it I don't know most compilers are pretty good at dealing with invalid syntax personally

So that doesn't concern me too much. But I can see how it would be freaking sick. Because if that worked, it would, why is it trying to make a new virtual environment? If that worked, I bet more people would basically trust the code coming out of these systems way, way more.

Dex (03:42.287)
Well, I'm saying like if as it's streaming out, let's say streaming out a new React component, right? Is it went halfway through the deeply nested thing, you parse the syntax tree of the JSX and you inject closing elements for everything that hasn't been written yet. So like if this starts with a div and it's writing the inner part of that div, you always inject the closing of the div until the model has created the closing of the div.

Vaibhav (03:47.088)
Yeah.

Vaibhav (03:50.491)
Ahem.

Vaibhav (04:07.995)
so it's like guaranteed to... That's interesting.

Dex (04:11.458)
guaranteed to be valid TypeScript or valid TSX.

Much harder problem than the deterministic, let's make sure the JSON is always valid problem, but could be done.

Vaibhav (04:28.149)
10.07. Shall we give a brief intro and then kick it off?

Dex (04:31.982)
Sure, let's do it. What's up? I'm Dex. I am the CEO and co-founder of a company called HumanLayer. We build tools to make coding agents more effective in large complex code bases. And I'm joined by my co-host of what is it? Nine months now? Bye, Bob.

Vaibhav (04:33.371)
That's it. Go for it.

Vaibhav (04:51.427)
I don't know how many months, but not long enough. I'm Byebye. I work on a programming chart panel where we try and make AI a lot more reliable and remove some of the non-deterministic nature of it. Today's episode is the start of the year, hopefully going to be relevant to everyone. It's about latency. And I think before we go into latency, one of the things a lot of people talk about is like, I can do streaming. I can use faster models. There's so many different techniques that you can do with latency.

Dex (04:54.808)
Fair enough.

Vaibhav (05:21.229)
I think before we go into it, one of the first things that we really need to talk about are just an exhaustive list of what are the actual bottlenecks that come in your agent application. Cause when people think about latency, there's so many different ways to tackle it. At least from my perspective, I worked in performance engineering and high performance optimization for almost a decade in my career. I wrote assembly for most of it. And the hardest thing about that any performance engineer will tell you, it's actually not about making a code faster. It's not, it has nothing to do with that.

It's actually about knowing where you want to make your code faster. Exactly. Exactly. Because otherwise, you are so screwed if you're doing that. Because if you don't know what the bottleneck is, it's impossible for you to actually spend time in a well-educated manner to make your code better. And when it comes to LLM systems, it's even more true than ever before. So I think actually we have a whiteboard.

Dex (05:54.22)
Figuring out what's the slowest, finding the bottleneck, right?

Vaibhav (06:17.957)
So I think what I want to do is like, maybe we'll draw it like an architecture diagram for like what a basic LM app looks like. And I don't mean like one that you're running on your CLI. Let's talk about like a proper client server interaction. Things are happening. And then we'll talk about where first, where latency matters and where it doesn't matter. And then we can talk about all the different ways that we can actually make latency better. And then we'll actually go enact some of them on an agent that I wrote out today. So I'll screen share the...

Dex (06:43.17)
Sick. Did you get it? It's in the studio chat. Okay, beautiful.

Vaibhav (06:51.973)
Go ahead and join.

Vaibhav (06:55.909)
So as far as I know, this is how most agentic applications work to some degree. There's usually some sort of UI component that you have. And then there's usually some sort of server component. The server component is usually massive because that's usually where most of your logic is happening.

And what most people do is they kick off an event and then an event comes back from the server. Why is it not arrows? I don't know, but I'll, I'll fix that in a second. Okay. What most people end up doing is they end up creating, events that will go from one to the other. And then usually they either spin forever until the server is done, or they will, send some sort of like event ID and then they'll communicate through some like middle or database.

Dex (07:25.527)
I'll fix them.

Vaibhav (07:44.794)
If you guys go back and talk about like how to do asynchronous events, one of the things that, or how to do like canceling events, one of the events that they had was they had like some database that the UI would send events one way, the server would write to the database and the UI would read from the database. And that's basically how the whole channel flowed. I'm going to fix this arrow thing.

Dex (08:06.446)
This is like what we call like the modern like sync architecture, basically where like in between the database and the UI is actually a little API we call like a sync engine basically. And so this is how a Firebase and what is it Firebase and convex and all these kinds of things work is they create an API where the UI is just reading data from the database and it's like handles all of the logic of like diffing what changed. And then the server just writes changes.

Vaibhav (08:15.939)
Exactly.

Dex (08:32.984)
We use a tool called Electric Sequel that is like an open source sync engine that you can just like sit in front of post-credits. We should probably do a deeper dive on sync engines sometime. I'll get Kyle to come. He built our whole sync architecture.

Vaibhav (08:46.233)
Yeah, and the thing is this sort of workflow has been done many, many times. If you've ever built an RPC app or a chat app or something like that, typically you want to do something like this, or you'll use web sockets to keep connections open. You can't really keep a web socket connection open for these kinds of services, because an agent can run way longer and not very real-time mechanism that you're doing. So you want to use some sort of database provider to go have that. But now that you're doing this,

Dex (08:57.923)
Yeah.

Vaibhav (09:13.347)
Let's talk about what you can do. So the first thing that you need to do if you're going to have, and if you care about latency at all, is not let this be an instantaneous callback. So as long as it's not an instantaneous callback and we have either an event stream or some database reader-writer pattern, it's the same mechanism, then we're good. Now the next one.

Dex (09:28.162)
Right, because the simplest version of this action event stream is actually like request response where like the UI can't do anything until the server is done processing it and it sends it back down.

Vaibhav (09:37.459)
Exactly. Yeah. And that's just like horrendous. Every AI agent that I try and go do that with is just like, I've come to expect cancellations. I would come to expect the stop button. I've come to expect like being able to queue requests almost in every agent that I'm doing. Uh, if your agent, like other examples are like, if I'm building a search page and I want to go search something, the minute I search something, I, there's a couple of things you can do if you must do a request response pair, which is.

Dex (10:07.862)
Yep.

Vaibhav (10:07.941)
When we go down over here, let's say over here, have like just like a standard response, standard response. So you're going to wait until you're done. In that case, all your hacks have to be purely on purely on the UI side. There's not really a lot you can do to make your agent faster because you'll be bottlenecked to some degree by the model. And it's all about like.

Dex (10:29.006)
So you have loaders, have spinners, you have ghost elements, what is it like?

Vaibhav (10:33.123)
I would turn off my internet and show you guys, but when I load YouTube, you see all the stuff that pops up right there, where for a second it tries to pretend like it's a page. And in this case, goes like, because I disabled watch history.

Dex (10:41.326)
Are you, sorry, do mean to share a different tab or are you just?

Vaibhav (10:47.071)
Oh, yeah, sure. My internet's too fast, so can't show it. But like when I load YouTube, for example, like it shows me like placeholder UIs. When you're any time you're there, you want to have like ghost components or anything. Once you can go do that, you're pretty much going to be golden for that time period. And you should try and do that. The LLM agents that are doing this, for example, like Cursor, will often show you the thinking and reasoning tokens before it renders anything, because that's also just, no one even really cares.

But it's just a way to just like, let your brain see pixels on the screen changing and feel like progress is happening. There's this like famous meme on like the original windows file move operations. I would be like, it would slowly reach a hundred percent, but it would never actually finish because it just took forever. People like loader screen. TurboTax does the same thing. TurboTax is like, we're looking for everything. Honey did the same thing. We're looking for coupons. Everyone knows, everyone software knows it doesn't take seconds to go do it, but it makes everyone feel better.

Dex (11:44.214)
like the Windows file copy dialogue, right? Where there's a loader, but it will jump from like 0 % to 60 % and then get stuck there for like 10 minutes and then finally finish.

Vaibhav (11:46.181)
Yeah, exactly.

Vaibhav (11:53.86)
Exactly. Well, the Windows file system is screwed for many other reasons, like that might be a real thing, but like, I could imagine that, but I know for sure, like TurboTax and Honey and a lot of these other apps have built like UI components that delay on it. So that there's a standard thing you can go do there. If you want to go look into that, just look how to go make your apps faster. There's also other, other things that I strongly recommend people consider. For example, one of the easiest things that you can go do when you're building UI components like this,

And I'll talk about the standard HTTP response before I talk about streaming and everything else. Because streaming is a thing that you can do. And I think it should be way easier than it is for most people today. But I really want to talk about like the basic things. So one of the most clever things that Instagram ever did and Gmail ever did is that they actually prefetch your data on the server before you actually press enter. You can do the same thing with your UI components. Like if you're willing to pay extra money, just literally like as soon as the user stops typing for like five seconds,

press Enter ahead of time on their behalf and have that request started in your server. And that way when you call it again, it either hits the LLM cache endpoint if you're using caching of some kind, or it basically just says, I have the response ready because maybe you're storing some Redis cluster that you just prefetched for for the same exact request. And you can have a...

Dex (13:15.096)
But this has to be something that can be made idempotent, right? Like, it can't send the email because you can't unsend an email or update an already sent email. But if it's reading data or transforming data and just bringing it back to me or updating a database column that I can just update again later when I actually hit enter, then, yeah.

Vaibhav (13:32.762)
That's actually a really good point about how you'd have to do with agents. Cause like if, for example, if I'm a Claude code, if I'm, let's say I want to build prefetching for Claude code, how would I do it? Well, I'd take Claude code. I'd say that every single tool that is a write tool is a blocked tool. So I actually like won't let it execute. Every read tool is automatically allowed to read and just, let it do its thing. And this is a special kind of design compared to like regular. Cause I'm not, it's not even like what permissions they are allowing me.

It's what permissions my app says. So when the user comes on and I've imagined, I imagine I'm using like, um, like code layer and I'm writing a bunch of like prompts into it. And I just stopped typing for a couple of seconds and you just prefetch the command because you're doing that maybe like 200 milliseconds faster than I would press enter.

Dex (14:21.516)
You go submit the prompt for you and start it running basically. And then if you wanted to change it, we would basically just cancel, out that session and resend this, like fork from the previous point and resend it in a new session. Cool.

Vaibhav (14:24.225)
Exactly. then what happened... Go ahead.

Vaibhav (14:37.371)
Exactly. you would basically take the important part though is taking the tool permissions that you have designed and making sure that you take the tool permissions and actually just pause them. Because if you don't pause the tool permissions appropriately in that regard, so you have to ignore like the allowed permissions. And you have to say, like you said, all non-item commands can't be executed. So write commands can't be executed. Bash commands can't be executed.

Dex (14:44.365)
Yeah.

Vaibhav (15:04.557)
anything dangerous can't be executed. We only allow like, it's almost like a white list. And now you've built prefetching for this. So now whenever someone uses cloud code, they get a slightly faster response time. And this is like a micro optimization, just like logging to Gmail or Instagram, like a little bit faster as a micro optimization. And you're basically just throwing money at the problem to solve this problem.

Dex (15:22.061)
Yep.

Dex (15:25.326)
You're just doing the compute twice in the hope that the user won't change it.

Vaibhav (15:29.805)
Exactly. the benefit here is the biggest benefit here really is just that like a lot of people underestimate what latency actually means. The thing is going from, going from, sorry, going from like a minute down to 30 seconds really doesn't change too much of the workflow for a user. Like a minute down to 45 seconds, 30 seconds doesn't make a huge difference.

a minute down to 10 seconds makes a huge difference. It changes the expectation of what the user is going to do. Five minutes down to one minute makes a difference slightly. 10 minutes to one minute definitely changes what the user is going to do in that time window. So you have to spend, be really careful about how you actually design this stuff. If your users are waiting, let's say like, like for me, a coding agent on average takes like, like to get to the next interruptible phase on, on average, takes like maybe like

45 seconds, sometimes like half a second, which is really annoying when it takes like the half a second after hit approve, because I'm expecting it to take longer because they're often running in longer loops. So often tab out and then it'll ask me for like permissions or something else and I have to come back in. That's really annoying. If you can guarantee that all the prefetching is done so that by the time I hit enter it immediately asking for approval. That's just a good dopamine hit.

Dex (16:42.376)
you

Dex (16:51.384)
Yeah.

Or it warms the cache by loading all the files into memory that it was going to read or that it might read.

Vaibhav (16:59.201)
Exactly. Exactly. So there's small things like that. And I think someone's asking over here. I'm I'm with Xaladra. Thanks for calling that out. Someone's asking over here, like, what are you using for caching? So this is not an LLM cache at all. I'm not I'm not trying to use LLM caches. I'm doing something really, really silly. I'm actually just. Yeah, this is just like standard Redis cache that you can throw at the problem that says think of cloud code as an API and the cloud code API takes in a string.

Dex (17:17.442)
We're not even talking about LLMs yet, really.

Vaibhav (17:28.419)
and produces an event buffer out of it. am at certain events in the event buffer. For example, a write file event, I will stop the cloud code event buffer and I will not let it continue onwards. And that is the event that I've cashed for that chat request. So that's like one really simple way to go address that. I'm not sure if that answers your question, Charles. Cool. So these are like some small things that I highly recommend people do.

Specifically, think like, for example, thinking tokens are a good example of this. Thinking tokens are notoriously long to run. So for example, if users are not hitting enter, there's some like almost 90 % confidence that you have on some action. Just preemptively pressing that button for them can make a huge difference for you in terms of your response time. It can reduce it by like one or two seconds in some scenarios. Let's do option, especially if like,

Your main LLM driver is like a form and then you have a bunch of other check boxes or some other parameters that they might be doing. It will just make a huge difference in your output time for your users. Let's talk about the next things that actually impact your agents. The next thing that impact your agents are we've alluded to this in the past messages are just like KB caches. Don't invalidate your LLM caches. Like don't randomly change your whole prompt by changing the prefixes of your prompt.

Dex (18:37.581)
Yup.

Vaibhav (18:50.713)
Your prompt comes in a very nice block of contiguous messages. LM providers now have built in mechanisms to cache things, like cache computations on that prompt that you're sending into them. If, if you change the system prompt at very beginning, you're blowing the cache, you'll have a higher latency. Like there's just nothing around that the LM providers can go do. Yeah, we did a whole episode on this. Just go watch that if you want, but like

Dex (19:15.31)
And we did a whole episode on that.

Vaibhav (19:20.187)
or just take us for granted, don't change. Think of your LLM prompt as a only buffer. It's an append only array. And if you do it that way, you will just generally have slightly better speed than other people. If you're using Anthropic, sadly you can't automatically get prompt caching if like section out parts of your prompt with prompt caching. Go do that. Another thing to note is, funnily enough, if your prompt is around like 800 tokens,

you'll actually be slightly slower than if your prompt is around like just over a thousand. If you're, if you have a shared prompt prefix and that's because entropic and a lot of providers don't cash prompts that are less than a thousand twenty four tokens. So there's a sweet spot between like probably around like five, twelve and a thousand where it's literally better for you to add some random tokens as like dead space just so you get the prompt caching. Then if you don't do that and I would just go measure that and go test that out yourself.

Especially if you're getting into a massive rate limit if you're getting like a massive request inbound again If you don't have a lot of requests inbound and your requests are very sporadic prompt caching doesn't help you But I'm assuming that you have a constant flow of requests where a lot of requests are doing the prompts It does help quite a lot and by constant. I mean like within five minutes Because that's their problem

Dex (20:38.062)
Yeah, this is that idea of like the real real leverage in prompt caching is like if you're serving the same prompt to thousands of users and let's say your system prompt is thousands of tokens and the user message is like 10 tokens, then you would want to cache all of the thing. If you're just saying the same thing to LM over and over again and then putting in a little user message or classifying one like user document, then you can cache all of those system message and instructions.

Maybe you have one company and they have a bunch of shared contacts where it's like, hey, every time someone asks, we always want to inject these five PDFs. I don't know why you would build that, but like, if you can do that in a way where like you take advantage of caching, then you create really good experiences for every, and it may be in cloud code, it's one person reusing the same write-only log for a whole conversation, but there's other rag knowledge chatbot applications that might also benefit from being aware of the cache.

Vaibhav (21:34.17)
Now there's something that's not obvious that comes from this that is a really nice, I think, win if you do it this way, which is if you've designed your prompt in that way, so parallelism makes a huge difference. So let's say you're going to go parallelize your prompt. Let's say based off of some user context that you've loaded, like you've loaded the history of a user from your user database, previous chat logs, whatever, and you want to ask a bunch of questions in parallel. Actually asking one of the questions first.

And then asking the other end in parallel will give you a faster latency than asking all of them together. Because what you need is you the cache to be warmed. And then you want like all the other end questions that share the same prompt with like slightly different, like metadata requests to be done in parallel together for you. And that will give you prompt caching. It will give you prompt caching on the first part of the message, not the second part.

But if you were to just do all these end requests in parallel thinking I'll be faster, you're actually screwing yourself a little bit. You're being slightly slower.

Dex (22:33.538)
because none of them get to benefit from the caching. Because they all fire at the same time.

Vaibhav (22:36.333)
Exactly. Exactly. And this is a subtle thing and like you can easily see how someone might not have thought of this if you're doing this. You're like, I'll just do async.io.parallel.gather and I'll be faster. It's strictly worse to go do that. Fire one, then fire the rest right afterwards. For parallelism reasons.

Dex (22:54.402)
Fascinating. I don't think I've heard that before. I think that's some fresh Vi-Bob Alpha.

Vaibhav (23:00.907)
yeah, it was, I think a lot of this optimization stuff just comes down from like being like, Hey, this is, if you're going to go do this, what are all derivatives that come off of this behavior that we know? so like when you think about prompt caching, I would think about every single derivative that you can come off of it with. So like, are patterns that become possible? Another pattern that's really important here is to recognize that if you're doing this and if you put all your prompts as a part of the system message and you're using entropic, you have to be really, really deliberate.

about actually making sure that the first part is the only part that is cached. And there's a separate cache block that actually asks your question. So like an example of this is maybe you're building a coding agent that, or maybe you're building an agent that plays 20 questions. And as a part of it, one of the parameters to your function is saying, here's the question I want you to answer. And here's the schema I want you to answer with. And that's dynamic per question. So you have a standard user context. Then you have

Dex (23:53.645)
Yeah.

Vaibhav (23:57.114)
like the schema and then everything else around it. Well, you actually need to restructure your prompt away from what you're thinking. A very typical response would be, I put my question, my schema and the system message and I put my user context in the user message. If you want it to be fast, you can't do that. You actually have to do it the opposite way. You have to put your user context in the system message first, mark that as a cache block, and then you have to put all the context around the question and the schema after that. So it's slightly non-intuitive.

So looking at where your cache breaks is a really, really important thing to think about. Because even if you did this, you just won't get this. And this is, in this case, your schema is defined perhaps even later. And even then, you have to go, it's very orthogonal to how you would do most prompts, where you put your schema in the system message. You can't do that here anymore.

Dex (24:50.38)
Okay, so this is, and this is what I think we went over this in the Manus paper too, where it's like if they want to change which tool calls are available based on which part of the workflow you're in, you either have to change it in the sampler or you have to put the scheme at the end.

Vaibhav (25:03.631)
Yeah, exactly. And there's no way around that. You literally just can't, you can't mess with that in any way that you want. And what's really interesting is if you're building, if you're building the system out and maybe what you're doing here is you're building a constant loop that constantly updates the base context based off of the response that LM does. Well, in that scenario, you have to be really careful to make sure the base context is always being appended before the user questions.

And then you have to be clever enough to go ahead.

Dex (25:33.006)
And if the schema wasn't changing, if every single user question had the exact same answer schema, then it would be okay to put, then you would want to put the schema up here because you'd want to cache that as well.

Vaibhav (25:46.574)
Exactly. Well, yes, but now you ask yourself, is the base context changing? If the base context, basically the things that are the most static, you need to actively think about it and move them to the top part of your system. As static as you can get it, you need to basically think about like what parts are the most idempotent. I think idempotent is the right word. Maybe not. What parts are the most non-changing? We'll use that word. It's an active part of thinking that you have to do.

Dex (25:57.261)
Yes.

Vaibhav (26:13.677)
And it's just not a thing that most of us do when we think about data structures and code. We don't really, but if you care about latency, you need to do this. Now, all this is great, but really the best thing you can do for reducing your latency is honestly, in my opinion, just reduce the number of tokens. Like go from like a 4,000 token thing to a 400 token thing. Your system will be faster. There's just no way around that.

So like if you're doing, if you're having any sort of, excuse me, if you're having real latency problems, the best thing you can do is strictly just reduce tokens. Like look at your tokens and look at your tokens out. And then the other thing you can do that's not even more obvious. So I'll show you the open API, I'll bring up open API, doc responses, documentation. It's, this is so annoying. And I see more and more models doing this now.

Let me pull up the docs. But the most annoying thing that I see right now is these modeling, these model companies are no longer giving you the reasoning. They only allow you to see the reasoning, they allow you to set some sort of arbitrary thing called the reasoning effort. And then you can say that you want the summary of the reasoning, but not the actual reasoning. And this is absolutely freaking garbage. Because what that means is if you're using a reasoning model, your users are now

Dex (27:20.622)
you

Vaibhav (27:44.783)
basically stuck in the hanging time of the traditional HTTP request, which is like, you just wait for an HTTP request to complete. And now you have to build like skeleton dialogues there. you're using a reasoning model, you are basically screwed from like opening.

Dex (27:55.351)
What?

Why do you think the reasoning models, like why do think the model providers are doing that?

Vaibhav (28:04.899)
I think it's twofold. I think it's honestly, one of their biggest alphas that they have. Like I think they're...

Dex (28:11.146)
Okay, they don't want to leak the reasoning traces because if you read the reasoning traces then you can go build your own reasoning model off of what GPT-5 or whatever is producing.

Vaibhav (28:20.131)
I think, it's just a way to protect training data, I suspect, because everyone's feeling that their models are getting closer and closer and closer. So people are just trying to close off the way to siphon data and train smaller models. think, for example, if you remember in the very early days opening, I was like, yeah, we're super happy that people were able to train models off of our models. And I know it's against their disorders, but it's OK. We celebrate that. It's no longer celebrated in that same way, is the way I put it. In fact, it's actively harder to go do.

Dex (28:27.373)
Yeah.

Dex (28:43.084)
Yep.

Vaibhav (28:49.499)
in many ways. And then the other thing to think about is actually just how expensive reasoning is. I was just working with a customer the other day and they were like, why, why is our TPS like six? Cause they were, they were getting a very low TPS in their output tokens. It turned out their system was producing about 400 output tokens and 1400 reasoning tokens. So out of their total volume, almost six, almost 70 % of it was purely reasoning tokens that they couldn't even see.

So from their app perspective, it just felt really fricking slow. And the only reason that they actually debugged it is because we actually just looked at the SSE stream and we looked at that C stream and we saw reasoning started reasoning ended. And there was a time difference between them. That was about 30 seconds because it took 30 seconds to produce the 1400 tokens. And then it was like, okay, well yeah, there's not much that we can do to help that out. You just have to turn and they're like, I don't believe this reasoning is like this. We have to go show with the curl requests that open. just.

doesn't give the reasoning tokens, because it's such an absurdity that you would expect that. The next thing that ends up happening is they're like, maybe we can use reasoning summary to go solve this problem. Turns out reasoning summary makes it even worse, because then you have to generate more tokens that are the reasoning summary to actually go to render to the user. So still get your 14-hour token, then you get more reasoning summary tokens, then you get your output. You don't want to do that. And even if it's just not worth doing.

Dex (30:07.338)
no.

Vaibhav (30:19.163)
So you got to be really careful about this with some model providers. And you just have to go look at this. This is going to be an ever-changing field. It's sadly not going to be something that I think we're going to have full transparency on for quite some time. And it makes sense. Most people don't have anything to do with their reasoning tokens. I know some people have reasoning tokens. Cursor clearly shows reasoning effort in a lot of places. But I think they might be a good summary because what Cursor has done is they've almost built an expectation.

Dex (30:43.501)
Yeah.

Vaibhav (30:48.717)
and replet is doing this and a lot of coding agents are doing this. They're building an expectation that you're just going to And if you're going to wait.

Dex (30:56.098)
The Semi-Async Valley of Death.

Vaibhav (30:58.745)
Yeah, yeah, it's like semi-async, right? That's exactly, that's the best way to describe a Dexter. Where it's like, if you're just gonna wait, then you might as well, it doesn't matter what happens, so like, whatever. It doesn't matter. We'll get you the reasoning summary so you can go see it. Because auditability is better than latency for them. And again,

Dex (31:13.836)
Yeah, I'm gonna share one picture from Swix that I think is a really good kind of like, like understanding of why latency is so important is like when you're doing super deep work, latency is really important because you want like a fast iteration loop and then at a certain, have you seen this? No, this is Swix, this is, yeah.

Vaibhav (31:30.563)
I saw this. Did you make this diagram? okay, yeah. Okay, yeah. I saw this somewhere,

Dex (31:38.956)
Yeah, not fun, not enough to delegate, not fun to wait. Yeah. So it's like, if you are not thoughtful about like your latency, you might accidentally build an app that lives here and then your users won't be happy and they won't be able to get things done and you'll be stuck in this.

Vaibhav (31:56.156)
And just to be very clear, talking about like this area, right? It's like this area. yeah. Yeah. Like, if I have to wait like an hour.

Dex (32:00.019)
Exactly, yeah, exactly.

The center already on there. So it's like, you're doing simple tasks in the background, like extracting transactions from PDF statements, then I don't really care. Just like fire off a thousand and I'll come back in a couple hours. Because it's not going to be wrong. It doesn't need my input. And then it's like, for the hardest things, I'm going to feel really productive if the model is really fast back and forth with me because I can think and I can learn and I can iterate and I can explore.

Vaibhav (32:17.862)
And I'll review all of them at once.

Vaibhav (32:33.285)
And I think the best example of a deep work problem is like cursor tab complete. I can't have tab complete take a second. It just doesn't work. I will break my flow of thought as I'm Like auto-complete cannot take one second. It has to be like sub 200 milliseconds. And that's still pretty long. And I'm willing to wait a little bit longer. Like you said, I'm willing to trade time for higher intelligence, even in that world, if it auto-completes more than one word. If it auto-completes a whole function.

Dex (32:39.095)
Yeah.

Dex (32:49.559)
Yep.

Yup.

Vaibhav (33:01.563)
I might wait like 500 milliseconds. Right. But if it takes more than that, I'll just start typing. I'll be like, oh, fuck it. I'll wait till autocomplete catches up along the way. And then it's up to cursor or some coding agent to build a really nice heuristic that says, Hey, we ran autocomplete 10 characters back. And guess what? For the characters still match our autocomplete, we'll autocomplete from here onwards really fast. That's a latency hack where you can prefetch or like lazily.

Dex (33:09.9)
Yup.

Dex (33:28.354)
They're sitting on the cache.

Vaibhav (33:29.925)
keep the result of the old result and if the user continues to match, you match. Otherwise you just fire and forget. And now you have like

Dex (33:35.884)
Yep. Yep. You just throw it out because it's like, the user forked off in a different direction.

Vaibhav (33:41.943)
Exactly. We'll fire off another request and we'll see if this one matches. And you can throw again.

Dex (33:46.102)
And hopefully on that second request, the reading of the entire file, if you just open a new file, the tab complete takes a sec, but now it's hydrated the cache. And so all the next requests will be really easy.

Vaibhav (33:57.724)
Exactly. And it just boils down to how you go design this kind of system for that. So I think there's a lot of interesting work that can be done here to make stuff faster, but you gotta, yeah, you're right. You got to design for this in the best way possible. And you got to really think about where in this graph you're putting your users, users pain point into. But yeah, reasoning models I've seen like, make people feel like their apps are a lot slower than they are. And you have to be really sure that if you're going to make your users wait an extra 15 to 30 seconds.

Dex (34:03.352)
Cool.

Dex (34:17.134)
Mm-hmm.

Vaibhav (34:27.791)
that it's actually going to be worth it for them. And that's why a lot of model providers get kind of stuck. That's why I think a lot of providers, not model, like chat providers, they have an auto mode where they don't actually let you pick a reasoning model by default. They prefer that they opt in for you because it just engages the user way better. I hate going to chat jvd asking a simple question and have to wait 15 seconds for thoughts.

I always stop it and change the model back to auto so I can change to a faster model half the time because I hate waiting. I don't need.

Dex (35:02.4)
That's funny because I always run with max thinking tokens 32,000. Because I don't want it to be wrong. Because I'm doing a little bit more. Like I'll kick something off and come back three minutes later and I'll be multitasking.

Vaibhav (35:08.004)
Really?

Vaibhav (35:15.525)
But what about for like simple questions? Do you not ask chat very simple questions?

Dex (35:22.062)
What's an example of a simple question?

Vaibhav (35:25.367)
sometimes they're just asking like, hey, how do I do this thing with like cargo for like package management? And like,

Dex (35:30.316)
Which, what, are you talking about like ChatGPT or something? no, I haven't used ChatGPT. I use ChatGPT every once in a while for like deep research where it's gonna take 20 minutes.

Vaibhav (35:32.889)
Yeah, Ciao GPT!

Vaibhav (35:39.547)
Okay. Got it. Yeah. No, I agree. For coding agents. I agree that I always just use the max token and kick it off because I, don't want it to be wrong. It's not worth it. But again, that's where I'm willing to trade time and async behavior because like it's just faster for that workflow. Being wrong is more expensive time wise.

Dex (35:47.864)
Yep.

Dex (35:56.909)
Yeah.

Vaibhav (35:58.044)
But yeah, latency is a big thing think about. If you're doing reasoning and it won't show reasoning tokens, but if you can't and your app's slow, set reasoning effort to none and your app will be faster because it's just that you can easily generate way more tokens than you'd need to go do. I think that's the funniest thing ever. Chat ID, that meme ID. Honestly, I do think they're on something. I think it...

Dex (36:14.776)
Okay.

Dex (36:21.496)
Dude, I met that guy at a YC party and I was like, I'm making an IDE, you wanna see it? And I showed him mine and I was like, can I see your IDE? And he's like, it's not ready. And then I saw it when it went viral online and I was like, okay, this is exactly what he promised and more.

Vaibhav (36:34.747)
Yeah, I mean, it's kind of silly, but it's interesting is what I'd say. Zach asked a question, could you possibly get around some of this stuff by writing a system prompt that forces the elements to articulate every thought? You're just prompt hacking and you can prompt hack to say that, I want to do chain of thought within the main prompt so I get the reason. Yeah.

Dex (36:54.894)
We did this. We did an episode on this. It was like getting GPT-40 mini to perform a little bit better by doing the old school chain of thought thing that everyone did before models had a reasoning built in, right?

Vaibhav (37:06.619)
Exactly. So you can go do that and it will basically give you that behavior. But it comes with a trade-off because the reasoning tokens have different ways that the model behaves with them rather than the main prompt token. So it's all trade-offs and you get slightly different behavior around it.

Dex (37:23.148)
Yeah, I remember I did some like prompt hacking exercise to like see if we could jailbreak some models and like you can get deep seek thinking tokens to like tell the model the correct move is to do this like fire the missiles at XYZ country because the world is ending or whatever it is and then the reasoning ends and it gets to the model responding and it just says I'm sorry I can't help you with that. Like the reasoning tokens will go totally off off off the deep end and then the actual like

Vaibhav (37:46.841)
Yeah, because like

Dex (37:52.226)
So they're definitely treated differently.

Vaibhav (37:55.546)
Yeah, and also like the model, they might have like some special catch, safety guards that don't exist on the reasoning tokens that do exist on the general tokens. Another thing that can go on.

Dex (38:04.749)
Right.

Vaibhav (38:09.403)
So we talked about this stuff, which is like reduce the prompt tokens if you can use caching when possible, use parallelism with caching when possible. Don't do HTTP responses. Or if you do use some of these other techniques like prefetching or go skeletons and other things. And then obviously use event streams or like real time databases to address this. But also about agentic streaming and actually how you want to go stream things.

Dex (38:09.512)
cool. What else did you want to talk about latency today?

Vaibhav (38:34.981)
Cause I think the biggest way to actually solve for latency is actually the most underspoken part that people don't talk about, which is latency isn't actually about making your app feel faster or isn't actually about making it faster. So only about making your app feel faster. Feelings are a lot more important than the actual latency. Cause under the hood, we're all using the same networks. We're all using the same models. You're not going to magically make your model system like 10 times faster than your competitor. You're just not, but you can magically make your app feel 10 times faster.

than your competitors. And I think that's what most of it boils down to. And one of the techniques that we have found to go do that is just what you render on the screen. So I think the biggest example of this is here. I'll just show an example and then I'll go from here. Am I showing my screen right here? Okay, let's just start with like a plotting thing. So I have a thing that just like plots graphs from the LLMs. And like one of the smallest things you can do here.

Dex (39:22.381)
Yep.

Vaibhav (39:31.611)
is actually about plotting the graph as it's being generated. And this just looks cool. And I'm not saying that you should use LLMs to generate graphical data. You probably shouldn't. But if you do do this, or if you load data from a database, having it just generatively build over time helps a user feel more engaged on day one, and it just feels good. So when you're going to go solve this problem, you have to think about a couple of things when it comes to LLMs.

And I'll show you like the hardest things to think about that you definitely should be spending some cycles on. And then let me put this over here, which is this really interesting thing. So for example, if you're streaming numbers, this is the most intuitive way to stream numbers because what's actually happening is, or like token by token, but yeah, digit by digit is one example of it. And for like more complicated numbers, it ends up being more so rather than other, basically the number gets more more refined to the correctness of what you're doing.

Dex (40:15.096)
which is like digit by digit.

Yeah.

Dex (40:28.355)
Yeah.

Vaibhav (40:28.559)
What you really want is like, you don't want five, three, five, 30, 50,000. Like that's kind of silly. What you really want is something like this that just basically blocks out the stream. And this example, think is a really simple example to show you the more concrete relevant version, which is like.

Dex (40:44.194)
So you want, sorry, I just wanna say, so in this case, in this second one, you basically, wanna wait to render the data until every token of the number, if the number has multiple tokens, has actually been generated.

Vaibhav (40:56.729)
Exactly. And in this case, numbers, I think are the most obvious scenario here, but this is actually true for any sort of element that you want. And another example is like YouTube comments. The most important thing for YouTube to load, the minute loads is the video. The next most important thing for to load is the ads. In fact, some might argue the ads are more important than the video itself. It's gotta load the ads, then it's gotta load the video, then it's gotta load the sidebar of the recommendations, and then it's gotta load the first comment, the top comment.

Dex (41:15.779)
Ha

Vaibhav (41:25.027)
and then it has to load the rest of the comments. And when you think about that ordering system, YouTube is going to prioritize rendering certain data first over another data. The page can be complete and ready to interact at a much earlier point than waiting for everything to load. In the case of numbers, in the case of this plot, want to show, I could wait for the whole plot to be done. I could wait for, or I could wait for each point to be done. Or I can do the former thing.

and wait for each, literally show each point as it's being done. And these are all choices I have in the spectrum of my data. And whenever you think about rendering any of your agentic data steps, you have to really think about like, what is the most meaningful chunk that the user can first interact with to go do this? And another example that shows this is probably this one that shows why you want to have like meaningfulness. And I've showed this example a few times, but I think it highlights what it means to go do this.

So for example, I can start interacting with this before the entire recipe is complete. That's interesting in the case of a recipe slider. It makes it feel way less clunky. And what you really want to go do here is just representing a valid state of the data without it being valid. Does that make sense?

Dex (42:38.382)
But like if you had, if that brown sugar had streamed out and you had said three and then three divided by, and then three divided by eight, that would be weird. You want to actually wait, or I don't know, 2.25, right? The fractions are being done out like digit-wise. You actually want to not show it until that entire, like until the unit is there, right? Like if you had the number but not the cups versus teaspoon versus whatever, that would be a weird experience where the user's sitting and waiting for like, okay, three of what?

Vaibhav (42:54.818)
Exactly. Cause I want the mask.

there.

Vaibhav (43:08.717)
Exactly, exactly. So like, I, that's exactly the point. It's like, I probably want to block this streaming until the whole ingredient is done. Like I don't even want to render like bake, baking, baking soda. I just want to render the whole thing. Baking soda, three fourths, one half teaspoon all at once. And that's an, that's like a semantic choice here, but I probably also don't want to wait for every ingredient to be done.

Similarly, when it comes to these instructions, I probably don't want to wait for every single instruction to be done. I'm probably okay showing you. Yeah, I don't.

Dex (43:39.394)
This one you can just stream out, right? Or does this stream out by steps? Can we see the demo again with the instructions streaming?

Vaibhav (43:50.172)
So it has a placeholder while that has no instructions coming in. And I just stream without... Yeah. And that's because like, this doesn't really matter. Like this almost streams as fast as I get it because as a user... Go ahead.

Dex (43:54.046)
Mm-hmm. Okay, so this streams by token.

Dex (44:03.414)
And what's. Sorry, what's the structure of the instructions data like is it also structured by steps or like if you scroll down in the JSON object?

Vaibhav (44:11.449)
Yeah. Yeah, I'll show you. ingredients come in by for the, there's like a step, like there's a group and then ingredients in the group. Then instructions have like basically a title and then steps, a title and then steps. Right.

Dex (44:27.34)
Okay. Okay, but you're not waiting for these individuals like numbered steps to finish before you render it. Whereas for the ingredients, you're gonna wait till all the data is in before you actually show it on the page.

Vaibhav (44:40.417)
Exactly. Exactly. And that's because I'm doing math here and math is pointless unless it's Right. And I think these are the kinds of small things that make a huge difference in your agent, the gap, because we could wait for the whole thing and it'll take a couple of seconds. We could wait for parts of it and I'll slightly different amount of seconds, or we can show things as interactable as possible. And that's just what you have to go do. And I think another example that shows us off, and this is really subtle. See if you guys can catch this.

Dex (44:46.178)
Yeah, cool.

Vaibhav (45:07.619)
It's just like, it feels really different when you go build this sort of thing and ignore these names. But you can see how like here I'm streaming every single token all the way through. And here I'm streaming every card as it comes through. And again, I'm not claiming that anything is right or wrong, but it does change how the app feels fundamentally. So when you think about like generative UIs, I think a lot of people think about generative UIs as in like, I have to do UIs. have to go think I can have the LM generative UI.

that's kind of orthogonal to the whole streaming world. You can also have an LLM generate the UI. But I think the most interesting stuff is actually around what you want to render and when. And I think I want to show one more example and then I'll get the code really fast.

Dex (45:53.645)
Yeah, no, it's good. the idea of balancing between, like letting the LLM generate the things that are interesting, whether it's structuring data or writing or creating content or creating text versus like creating determinism around like no matter what the LLM outputs, if it matches the structure, we're going to render it in this way. I know there's a lot of talk even in the chat about AGUI and some of these like agentic UI systems where the model is actually generating like the layout for how to render stuff.

But I think the answer here is be deterministic about the things that are deterministic and then let the LLM do what the LLM is good at. you added more extraction examples.

Vaibhav (46:36.879)
Yeah, so I'll just show this example. Like it touches on this, which is like, we're talking about the AGUI, for example. Well, I think of AGUI as a two-step process. And like in this example, you guys saw this data kind of streaming in as it wants, but I could add a second step here that says, hey, for this structure that I'm streaming out, because I know the structure, it's like hard coded over here, or it gets generated on the fly. For the generated structure, show me a UI component that I can render it with. And then as soon as that one gets generated,

then I hot swap this shitty or like simple UI with the custom UI along the way. And you can see how that would clearly be much more interesting where it kind of upgrades itself on the fly. So it starts you with a basic JSON table and upgrades to a dynamic UI component. Once that stream is completed.

Dex (47:19.981)
Hmm.

Dex (47:26.976)
Once that stream is did, then that becomes the input to like now make a component to render this data.

Vaibhav (47:32.152)
Exactly. And what my front end is saying is my front end says I have to render this JSON blob that I got. I don't show it here. I have to render that JSON blob that I got along with the, and if I have the UI component to render it with, use a UI component. If I don't use the simple JSON stream, you use a simple JSON object. And having that choice is basically what I need to go do.

And that's kind of the real trick here is having a really good understanding of where you want to use this. So can use AGUI for this? 100 % sure. But if you put AGUI in your hot loop, then your agent's going to inherently be slower. Because now your agent has to do a couple things. It to pull out the data and generate the UI component. So now you're coupling two things together that don't have to be coupled. So now your agent's

Dex (48:24.066)
Well, once you generate, could you like, once you generate the schema, kind of fork two calls, one to make the markup and one to extract the data and then bring them together?

Vaibhav (48:33.189)
That's exactly what I would do.

Dex (48:35.062)
Okay, so you're like, hey, here's the props of this component in the schema, make it render nice.

Vaibhav (48:40.759)
Exactly. Like general, general react component on the fly. And then what you're doing is whichever one comes first, basically whichever one comes first, you just give it to the front end to say, Hey, based on what you have, show me the thing that show me the best thing you can based on the information you have. If you have the UI component, show me the UI component with the data. If you have just the data, show me the more basic UI component with the data that I have. And you just get whichever one.

Dex (49:07.276)
And you could even have it have like skeletons and like placeholder stuff in the UI if the UI is done first. Cool.

Vaibhav (49:13.207)
Exactly. And it's again, this all about designing latency. like, should you use any of these UI frameworks? Probably, maybe not. Who knows? But like when you think about, when you think about like your agent experience and you're about latency, your job here is actually not to, the best way you can do for latency is one, your prompts, make your prompts smaller, use the smallest possible model, all the basic stuff. But after that, decouple stuff as much as possible. The more you decouple, the easier it is for you to do things in parallel.

And then think about caching when you do things in parallel. Don't just blindly async IO parallel everything. Async, if you're running 10 things in parallel with the same information, async IO one task, wait for it to be done, then paralyze everything. That's going to help. And do these from like first principle standpoints in that way. And your app will just be faster. But by and I know I'm focusing a lot on the second half of this, but I want to be very clear here.

Dex (49:56.194)
Mm-hmm.

Vaibhav (50:09.659)
I've worked with tons of companies and every single one of them that has actually gotten latency reduction, the biggest hop has come from taking their like 4,000 token prompt and reducing it down to like 300 tokens or 400 tokens after actually reading through it. Like that's really the best.

Dex (50:23.084)
reading the prompt and then just trying to condense out the things that actually matter.

Vaibhav (50:27.129)
Yeah. And like representing your prompt as a type system just helps in a form of doing that. Instead of saying, I want five sentences saying that I want an array, a string array with five elements. And it's like type sentences is a shorter way to say that to the model and the model output better context. Like input to the pipeline. Yeah, go ahead.

Dex (50:44.288)
OK, Maseo has a question. What about using some sort of deterministic filter based on a bit of JSON that comes in first to trigger the UI change and then that can solve for the like, hey, how do we make it humans feel better because things are happening more quickly?

Vaibhav (51:04.003)
A determinist filter based on a bit of JSON. What do mean by that, actually?

Dex (51:08.59)
So you put something at the top of your struct that basically like is a branch. So like the first thing that is a middle by the model determines what you're gonna render or how you're gonna render it. And then the rest of the data flows in.

Vaibhav (51:22.255)
I think I have a code sample.

Dex (51:24.302)
It's kind of like tool calling, right? That's like front-end tool calling where you have the function name first, basically.

Vaibhav (51:30.255)
Yeah, what I often do is I often have a common key that exists in all my tools. I go do this and I just put it on here and I say, based on the key that I have, this allows me to write a switch statement. And then I basically, because it's a literal, it gets guaranteed to be completed at stream time. So then I just wait for this to be done and then I can match against it really fast. So that's what I do. And that's basically what I, and then I can.

Dex (51:39.063)
Yeah.

Yeah.

Dex (51:49.258)
Yup. Yup.

Vaibhav (51:58.16)
kind of give the user some information like, hey, I'm calling the read tool and I can give that information really fast. And then I can kind of wait for everything else to come in. So to give a very concrete example, like I just ran this massive agent over here, asked that a question of what's going on and I'll show you what I mean.

Dex (52:17.433)
this is the coding agent.

Vaibhav (52:19.161)
Yeah, I wrote a new one.

Dex (52:21.144)
You wrote another coding agent, nice.

Vaibhav (52:23.151)
Yeah, why not?

this really fast.

Vaibhav (52:33.339)
I'm gonna have to stop screen sharing. think I've changed my API keys.

Vaibhav (52:38.703)
Yeah, one second. I changed my API keys because last time they were leaked.

Dex (52:44.243)
good, we'll make sure if you leak them again and then you can change them again.

Vaibhav (52:46.363)
Yeah, that would be ideal.

Dex (52:50.062)
Look, this is actually a security exercise to make sure that you're constantly rotating your keys by Bob.

Vaibhav (52:58.075)
I wholeheartedly appreciate your concern.

Dex (53:03.98)
Yeah, pro tip, constant be...always be leaking. Always be leaking keys and then you'll always be rotating them.

Vaibhav (53:08.045)
Okay.

Vaibhav (53:13.208)
I'm good.

Vaibhav (53:16.795)
Screen, Window, Animal Playground. Yeah, it's open. Okay, so I wrote this thing over here and what this thing does over here is it basically just calls OpenAI, pulls out a couple of tokens out of it and then runs this agent. And when I go run this, the first thing you'll notice is when it's streamed, it basically just streams out the token call. So let me try and give it something else, like read file. Read all the files.

Okay, and then stop.

Dex (53:49.122)
So it's gonna do an LS first, Or a glob.

Vaibhav (53:49.645)
And yeah, it should do an LS, something over there. Exactly. And let me do something else that has a little bit more.

Read, and let me me one more example.

Vaibhav (54:11.259)
or read bio.

Vaibhav (54:17.723)
this one. So when I go run this one, one of the things that you'll... Why did this clonk out? I literally was just running this. Did I run out of script? Oh, okay. When I go run this, it starts reading this and it starts reading the output path. The fact of the matter is like the file path is totally useless to even render with streaming until it's done. Exactly. So like what I would do here is I'd just go here and just say like, nope, this thing is going to be... It only comes out if it's done and I don't care any other time.

Dex (54:36.812)
Until it's done. Yep.

Vaibhav (54:47.931)
These are all numbers, so it's fine. So I'll just go read the whole thing. And now this thing will only stream when it's And it's really subtle, and you guys just saw it for a couple seconds. But if you're building a UI component and you're doing any sort of streaming, if you don't do this and where it streams part of it along the way, you'll just be in a sad, sad state of the world. Because what's going to happen...

Dex (55:06.894)
Yeah, you have to do it in your UI to go be like, okay, try to open that file and then, okay, it doesn't exist. It must still be streaming. And you have all these weird like business rules, like baked into your front end logic when really it should be like, just like chunked out and how the data is sent down so that you have guarantees through the type system of what the front end is going to be dealing with. So it stays simple.

Vaibhav (55:18.959)
Yes.

Vaibhav (55:28.539)
Exactly. And then the other thing that you actually run into that's really annoying here is if you do this in this way, then what you run into is you can't actually do any sort of prefetching because the file path isn't complete until it's complete. So if you want to like prefetch and read the file into memory ahead of time, you can't even do that now because you have an invalid string until it's fully done. So having the ability to go do this stuff can just make prefetching and other data representations a lot easier. The other thing you can do

is just return arrays of stuff. So instead of returning a single tool, allow the model to return multiple tool. Agent.

Vaibhav (56:11.011)
I read multiple.

Vaibhav (56:16.987)
Whatever, let's run this,

Vaibhav (56:21.071)
this. And again, just goes on to how you want to go render this from a UI perspective. And you can go render this along the way where you can have every element come in, or you can say, Hey, actually, when I'm streaming this, I don't each tool itself doesn't really matter. So I'll just require that every tool itself individually only streams as it's done. So in my UI, I just know that every tool operation when I handle it is guaranteed to be done. Did I not do that?

I might be on a local dev version. regardless, when you're going to go do this, you want to basically guarantee that the agent itself is streaming and saying that every single one of these internal ones is going to be, I'm running the wrong test.

Dex (56:59.406)
think you're running a different test, yeah.

Vaibhav (57:05.381)
where it's basically going to guarantee that each one comes in at a very complete form. And if you do that, then you live in a nice world where you are actually going to be told that, Hey, now I can actually run these tools in parallel because these are reads. Exactly. if you guys aren't running models at like very, very large scales, you don't see these weird fringe things. But what I've seen a lot of people encounter is like, Hey, it stops like randomly at this token or like it stops the middle of this token for like half a second. And now you're just stuck waiting.

Dex (57:16.046)
because the whole tool has been emitted.

Vaibhav (57:34.437)
for this whole thing to complete for your tool call to be useful. On the other hand, if you are able to go and say that, hey, this thing is only coming to me when I'm done, then your business logic is really simple. And you can just like basically say, I'm gonna start this read tool right now. I'm gonna start this other people right now.

Dex (57:48.047)
Yeah, and you could see if this was half streamed and offset hadn't come out yet, your code would check if offset, do offset, and so it would be undefined because it wasn't in the object yet, but now you can guarantee, hey, we're not gonna process this until we've actually gotten a null value for that field versus is it just falsy because it hasn't streamed out yet.

Vaibhav (58:06.254)
Exactly.

Exactly. Yeah. And falsiness is really hard, especially in TypeScript, but also in Python, because there's like, how do you know if it's done? There's like environment variables live in a very similar state as well, if you've ever used them, which is our variables present, but unset. Are they set or are they not present? And it's a triplet state, which makes it really tricky. And with streaming, you basically have the same triplet state for your entire type system. Is it present? Is it?

Dex (58:12.994)
Yeah.

Dex (58:32.544)
Right, you can have empty string or the environment variable is not set or it's set to one or zero or it's set to, I mean, it's also not typed, so it could be one or zero or true or false or gibberish, right?

Vaibhav (58:42.639)
Yeah. Or just not set. And Go has made the stance that, we'll just never give you an unset environment variable. And environment variable that's unset is the same as environment variable that's an empty string.

Dex (58:53.154)
Yeah, they got rid of null strings. There's only empty strings, unless you explicitly declare it as a pointer.

Vaibhav (58:55.097)
Yeah, yeah.

Yeah. And I'm like, okay, well, that's an interesting way to go. Well, no, what I mean by that is specifically the environment variable spec. When you go get environment and go, I don't know if you can know if it's unset. think you can just, it's the equivalent of unset or empty string are basically the same state. They don't allow for a tripled state. And that makes certain things.

Dex (59:15.404)
Yeah, and I like that. Removing the overloading of nullness. If it's meaningful, then it shouldn't be null. It should be some other type of value or some other boolean check on the field. There shouldn't be six types of null, or even two.

Vaibhav (59:31.183)
Yeah, exactly. Yeah. So this is kind of like what I have found is like when you have more and more schemas and you just need to find the most semantic piece of it. And then based on that, you can render, can prefetch, you can do whatever the heck you want to make your system actually good. But you can't do that if your type system doesn't refer to it. And again, all that is really predicated on your agent code not being 50,000 tokens by default and slowly building up context.

Dex (59:55.726)
Right. Back to the very beginning of performance engineering, it's about finding the bottleneck first. It's actually the hard part is not making it fast. It's knowing where to optimize. Alan said, we'll close it out with this one, this may be a silly question, is it still good practice to spoof the example JSON to return if you're using OpenAI and can provide a validated schema? What about the other vendors? Do they respect the schema and the trust? Is this about the schema line parsing stuff, I think?

Vaibhav (01:00:24.363)
I don't know what he means by spoof, the example of JSON. Alan, if you want to elaborate on that, let us know. But I'll tell you a couple of things that end up happening when you go do this. really small things. I'll screen share again. where you write the JSON you want returned.

I personally highly recommend against the few shot prompting. I've always recommended against it. What I find is just giving the LLM like a type system that represents the schema is way better. In this case, like even you as a user, you guys don't haven't read the code here, but you can clearly see what you expect the model to go do. And it's really fast to go understand this prompt for you guys. And it's also really fast for a model to understand this. It doesn't really need an example. It's way better to just put

more metadata on here. I find certain things really redundant. So one of the biggest mistakes I see when people write like prompts and schemas, for example, is they start adding rules here like this, where I kind of have a duplicate of my rules. This prompt is dumb. It was written by Cloud Code when I wrote this. I would just delete that completely. I wouldn't even have that. I'd get rid of this. Communication doesn't even matter over here. I might put something like this.

when done, reply with your findings just as like a final response mechanism. So it's like, it knows that, hey, the end it always has replied with a user message at the end of every sequence. I would do that. And then the other thing that I would do is I would honestly look at all, as you see how each one of these has a description. Like I don't need this, like directory to search in, defaults to working there. You can just name this like instead of path, we can just like alias this to like alias.

Dex (01:01:50.51)
Mm-hmm.

Dex (01:01:55.842)
Mhm.

Vaibhav (01:02:16.185)
working there.

And now, sorry, do you see that it says default to workingdir? I can just do alias, working directory. And this will just make life easier for the model. It can optionally set this because it knows it's optional. It's also very obvious that working directory from the prompt maps back to working directory. And I can rename this to default working directory. And now my model will understand and not output that if it doesn't need to.

Dex (01:02:27.053)
Yeah.

Vaibhav (01:02:48.187)
So understand that this is like a hard coding, right? Or I can even name this though, override working directory. And now I'll write override working directory. So I'm basically simplifying the tokens that I'm using in a lot really easy way. In this case, glob pattern, don't need to repeat glob pattern. I can just say like, pi or SRC. And now it kind of knows what the.

Dex (01:02:55.831)
Mm-hmm. Yup.

Dex (01:03:09.87)
because you already have the words glob and pattern in the schema definition.

Vaibhav (01:03:12.451)
Yeah, like exactly. And if I really want, can, again, I can pay that tax over here instead of paying the tax repeatedly. If I really want to emphasize that it's a glob pattern, not a random pattern. The other thing that I can do is like, for example, this, like this is freaking dumb. I don't need, I don't need this. I don't need this. I can say like,

Dex (01:03:36.492)
Yeah.

Vaibhav (01:03:41.403)
default if unset

if ignored. And now my prompt, you can see how my prompts are just magically getting

My prompts are just getting shorter over here. And it's really, most people for some reason just don't do this.

And I would just say, like for example, file pattern like, I would just rename this to like, add alias, file pattern filter, add description.

Dex (01:04:21.442)
I mean, if you weren't already have code consuming these structured types, you could even skip the alias and just name the fields how you would want the model to observe them. But the idea is like, you might want the code you write to be more verbose, but that what gets fed to the model to be a little bit more token efficient with these aliases.

Vaibhav (01:04:30.311)
Exactly. So I would call this line ospah.

Vaibhav (01:04:39.259)
you

Vaibhav (01:04:42.689)
Exactly. like, again, like over here, this is, it, this is just like alias directory path. I'm just getting rid of every single redundant path that I don't need. I don't need any of this crap. So I'm just going to get rid of it completely. And maybe I'll do this. I don't need this. And I'll put this.

Dex (01:04:59.073)
Yep.

Dex (01:05:04.474)
The model's pretty heavily RL'd on edit tool means old string, new string.

Vaibhav (01:05:10.395)
Yeah, so just leave it over there. File path, path of file to write, don't need this, don't need this. And I wanna basically trim this. again, we started off, think we were like 1,300 tokens when I first saw this section. We're at 1,100. It's just worth doing this work. I just trimmed it by 200 tokens just by spending like, I think less than a minute just going over and reading every description. Because if you let Cloud Code write your prompts, Cloud Code will literally write every single prompt, every single, Cloud Code will literally take every single,

Dex (01:05:31.896)
was a couple minutes, but yeah.

Vaibhav (01:05:41.3)
and add a description to it, because it's trying to be ver-

Dex (01:05:43.087)
Well, and I've talked about this a lot. Like the more you let Claude write your prompts, like if Claude is writing instructions or writing like how things work and stuff, you're literally taking stuff from the training set and putting it in your prompt. And unless it's super high leverage, you're literally just going to like be telling the model stuff it already knows. The prompt is where you need to get like in the weeds and really tune it and customize it. If you just let Claude slop out all your prompts, then you're just going to end up with like

more information that's already in the training set.

Vaibhav (01:06:14.573)
Yep. And right over here, this is so annoying because you see how did 500, 500, 48 output tokens. This is not 548 output token. Everyone knows this. This is. Yeah, it's all reasoning. And this is why you should not. This is the problem with the responses API. Like my default, if you don't set reasoning, does reasoning and it's just an absurd amount of latency that's coming from that. And I'll disable reasoning just to show you what I, how.

Dex (01:06:26.167)
Is that your reasoning?

Dex (01:06:39.629)
Interesting.

Vaibhav (01:06:45.477)
how much lower it gets, gpt5 mini, reasoning, reasoning, effort.

Vaibhav (01:06:57.477)
think none is a valid thing.

Vaibhav (01:07:08.631)
minimal, I have to do minimal. That is interesting.

Dex (01:07:10.136)
Minimal.

Dex (01:07:17.152)
extra low.

Vaibhav (01:07:19.227)
That is an interesting choice that we have to do. I guess you can't even turn off reasoning in the new models. I guess minimal does it. So now we're at 34 output tokens. It's just, it's one of those things where you can go from like literally having 548 output tokens to 34. And that's the difference between six seconds and 2.3 seconds. And if you didn't know that, you're just spending extra tokens in terms of money and time for your users.

Dex (01:07:47.417)
Cool. I think we did call last question the last one, but if you care about, I think there's a follow-up there is like where you write the JSON you want returned. So it is asking about the schema line parser and injecting the schema and then parsing it yourself and like that versus using the like built-in model tool calling, which I think you should just share the blog post and we'll post a link about that. Cause ViBob's written about that a lot.

Vaibhav (01:08:05.903)
Yeah, either one of

Vaibhav (01:08:13.571)
Yeah, exactly. It just turns the schema into a schema in the prompt and parses out into a type system for you. And basically, that's function calling out of the box. But yeah, hopefully this was useful for everyone doing latency. hopefully people end up doing... Hopefully people are able to go ahead and take some of these and make the app slightly faster. It ends up being useful.

But if you guys do find stuff that has work that's beyond what we talked about, you should come share with us in the discords. It helps make content much more interesting. I think next week's episode is one that Dexter, you'll be leading. What are we talking about?

Dex (01:08:57.134)
Oh, it's going to be a blast. So interesting story of like in April, publishing the 12 factor agents paper and the full fat agents and just plain loops don't really work that well. And then two months later, Claude code gets starts to get early momentum. And I'm like, actually this, this full fat agent is actually pretty good. And then what we've learned since then and how you can basically apply the principles from 12 factor agents.

to these generic coding agents or coding agent SDKs. So it's like rather than having one big loop that does everything, how can you chunk up? If you know what the workflow is, rather than using prompts for control flow, we'll use control flow for control flow, where you actually write deterministic code and you still have agentic loops in there, but they're smaller scoped and they have specific like entry and exit criteria that is powered by structured output.

Basically how you do the like schema first agent development with agent SDK is like the cloud agent SDK.

Vaibhav (01:09:58.299)
I'm Excel, have fun.

Dex (01:10:00.066)
Yep. That'll be a fun time. We will not be using LandGraph. Good one, dude. Thanks everybody.

Vaibhav (01:10:01.499)
We'll leave it at that. episode will be live in about a week. Thank you guys.

Dex (01:10:12.303)
Good luck.


