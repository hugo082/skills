Vaibhav (00:01.258)
Alright, hello! How's it going Dexter?

Dex (00:05.326)
What's up everybody?

Vaibhav (00:09.103)
got some folks on.

Dex (00:11.458)
I said that expecting someone to say hi back.

Vaibhav (00:14.243)
I know, it's such a lonely, it's a lonely road.

Dex (00:18.574)
Amazing. What's up? I'm Dex. This is ViBob. This is AI That Works, where we talk about how to get AI to do real things beyond the demo, run in production, solve real problems, run reliably, testably, maintainably over time, do cool things that no one else can do, solve hard problems that no one else can solve, and all kinds of fun, useful tricks. And we'll write some code. I don't know, ViBob, sorry I took all the intro, but say something cool, I guess.

Vaibhav (00:46.051)
I think you filled it up just fine, to be completely honest.

Dex (00:49.974)
Incredible. I am Dex. I am the CEO of HumanLayer. We build tools for context engineering with coding agents, solving hard problems and complex code bases by being smarter about how you wield AI. Bye, Bob.

Vaibhav (01:04.379)
Cue me in man, tell me what I, tell, tell.

Dex (01:05.634)
ViBob is the CEO and co-founder of Boundary, where they make BAML a new programming language for building in this world of non-determinism. And so all sorts of fun new syntax and tooling and built from the ground up for a world where you don't know exactly what your code's gonna do and running the same piece of code five times could do five different things. What are the programming primitives we need in that world?

Vaibhav (01:31.735)
better than I have ever said it myself. Thank you so much. So today's episode, I know we had listed that we're going to talk about evals. Sadly, we're to change it up. Our demo and the coding step that were making was fairly complex, and I was unable to wrap it up. We will do it next week.

Dex (01:34.125)
Yeah.

Thank

Dex (01:46.068)
Somebody, somebody procrastinated his episode prep. I've never done this before. This has never happened to me. If you've watched this show, you know, every time I run an episode, my code always runs perfectly and I always prepare a hundred percent.

Vaibhav (01:51.104)
Bye.

Vaibhav (01:58.865)
That is a big difference to me in texture. I was trying to put a pretty epic demo together and I think next week, if you folks are interested, next week we're gonna go talk about how to really, in this world where you wanna build a software factory, how do you build, how do you write evals for that world where you want everything to be fully automated? Imagine the old world of software was built for a world where we have code reviews and we all these human processes to write code at human speed. How do you write code at machine speed?

How do you ship code at machine speed? It's all eval driven. So that's the demo I was going to show. It's really fricking cool. I have it like, I would say like 60 % working. No, trust me, trust me. With the real demo, it's going to be so much better and so much more exciting. So give me one more week. We will see it next week and it will be fricking awesome. If, if any of you are coming to the unconference this weekend,

Dex (02:37.143)
Dude, we should just do the EVILs episode,

Dex (02:49.325)
I'm making you demo it at the Unconference on Saturday. I'm sorry.

Vaibhav (02:54.265)
You will get to see it live, you will get to see the eval system run live and exactly how you build a software factory in a fully automated way. And why today's programming languages can't really do it. It's fundamentally impossible to go do it in today's languages. So that's a little teaser. Apologies that I'm giving a teaser, not real code. But there's another topic that I think Dextre and I chatted about that we think is going to be just as insightful and just as useful and actually useful to even Dextre today.

Dex (03:10.57)
Incredible.

Vaibhav (03:23.809)
We've talked a lot about streaming on this episode, but one of the things in past episodes, but one of the things that we've never really discussed is how do you do streaming for an entire agent that you're going to build from scratch? That part, I think, has always left certain things feeling much more magical than other systems. So, for example, if any of you have ever used deep research on OpenAI, it feels good because it's almost incrementally giving you progress.

Imagine a deep research showed you nothing until it was completely done. It wouldn't be as good. Same with perplexities agent. Like why was it initially so good? Well, because when they started off, they started off showing you the work that they were doing and didn't just make you just wait. would silence interactivity is the key. Good.

Dex (04:09.719)
showed the sources, showed what it was doing. It's the dopamine thing. It's why software has loaders. You want to know that things are happening. Something to keep you engaged.

Vaibhav (04:17.713)
happening unless you're using the Windows copy directory or remove directory where the loader means nothing. Yeah, that literally is just like what side am I on on that one? But we want to talk about this. It turns out, I was just explaining this to a user the other day of how they go build this out, and I realized most people have probably not had experience building streaming systems. They're actually really quite easy.

Dex (04:24.151)
Right. That's just like an RNG running in the background deciding where the bar goes, right?

Vaibhav (04:47.397)
but it just requires a different brain muscle to think about it. And we're going to go share that today. As always, if you folks have questions, please stop dropping them in chat. Hopefully the most interesting thing you'll take away is that this is so easy that if you take the diagrams that we're about to share, give them to cursor or your favorite coding agent of your choice, it will literally just write the code for you and you will not have to do anything. It's really that simple. It's more about system design than anything else. All right.

Dex (05:16.353)
Okay.

Vaibhav (05:19.131)
With that, let's go to our favorite place, which is the whiteboard.

Dex (05:24.235)
Let's design some mother systems.

Vaibhav (05:28.325)
Let's design some other systems. Indeed. I can't see the chat. Dexter, you're on board for the chat.

Dex (05:34.881)
I'm on chat duty. What is it? Yeah, let's design some melon farming systems, I believe is the proper YouTube euphemism.

Vaibhav (05:43.419)
So, I actually haven't... I'll be honest, I have no idea what that means. I'm not cultured enough to understand such words.

Dex (05:53.868)
A melon farmer is just a nicer way of, it's just MF, nevermind. Do the AI thing, it's fine.

Vaibhav (06:04.625)
All right, so when we think about streaming, let's think about what we have to do. Let's say we built a coding agent. Our coding agent has one input. Usually it takes in a user's prompt of some kind, and this applies to all agents. Coding agents are just the simplest things to explain, because we can talk about different levels of streaming we might want. The coding agent will then first, it starts off with a user input, a user prompt. And once you get a user prompt, it's basically going to start

sending messages to the LLM. And I'm not gonna draw the LLM context window or anything today. I'm purely gonna talk about how, let me do one last thing before Mario gets slightly annoyed at us, which is I'm gonna have to share my whole screen. Yes, Matthias, I am sadly on time, which means you are sadly late today.

Vaibhav (06:58.627)
Indeed, right. Okay. So we go talk about streaming, we've got coding agents, we've got user inputs. And let's just really quickly remember what is an LLM. An LLM is a stateless system that takes in some input in the form of a prompt and then produces some typically like some JSON API that has various states and has tool calling, it has structured outputs, it has

string messages, it has all sorts of things. Most of these LM providers provide a separate thing, which is they also provide a SSC API.

I know they're both technically JSON, hopefully this makes the point at least of there are just two separate forms.

Dex (07:47.095)
But the SSE gives you deltas, it gives you chunks, right?

Vaibhav (07:50.577)
Yeah, gives you instead of waiting for this whole thing, this just gives you incremental data at some cadence that the provider of the LLM decides. This is not the only form of streaming because there's a separate system which is our agent.

Vaibhav (08:08.529)
up here. Our agent is really a...

Dex (08:13.719)
wheel loop.

Vaibhav (08:15.345)
A wheel loop. A wheel loop indeed.

no Phil.

Vaibhav (08:26.511)
and let's make this orange and yellow.

Dex (08:27.179)
Right. And so there's each token that comes out, but then there's each, we call them like turns, right? Of like, harness sends some information to the model, model sends a instruction back, harness does a thing, sends it back to the model, and you're going back and forth.

Vaibhav (08:44.055)
Exactly. So there's literally something about like, you're going to produce some input, then you're to take this thing, and then you're going to feed it back in this state, and then this is actually your agent system. So it's interesting because you actually have many different ways of streaming over here. And this is also a simple agent. It's not where we're running multiple queries in parallel. If you have multiple queries in parallel, then this gets amplified by n. So there's different points of streaming. If we think about this, we can have streaming at

the individual streaming at the individual LLM call layer. We can have streaming for like inspecting the turn state and not only the final state of the agent and then any such combination thereof and any subset thereof. So the trick is to actually decide how you go do this and how do you make this possible, especially when you start doing things in parallel. Go ahead.

Dex (09:34.925)
Out.

Can you pull out maybe like a Claude code session? I think this is a good demo of this, of like Claude streams each turn, but not each like token basically.

Vaibhav (09:49.196)
I think I have it right here. Okay, yeah.

Dex (09:50.017)
whereas Codex will actually stream every single token.

Vaibhav (09:59.313)
So if you go here, for example, I was working on something, you'll notice that over here there's something really subtle that happened. If you caught that, it actually streamed this, and it streamed this. But if you go into a subagent mode, ask a subagent.

Dex (10:19.553)
Well, wait, did it actually stream that out?

Vaibhav (10:22.915)
It does. Yep, they updated it because I mean streaming is a thing that you naturally do once you want stuff to happen. And you'll notice here that's

Dex (10:25.078)
Okay.

Dex (10:29.441)
So this is a dichotomy as well. Sorry. Yeah, this is fine.

Vaibhav (10:33.647)
make it bigger. So you can actually see that it's actually streaming my commands, the tool calls that the subagent is making.

Dex (10:38.017)
But those are each individual tool calls. What it's not doing is streaming the tool call as it's being generated.

Vaibhav (10:46.225)
So right over here that's streamed.

Dex (10:49.217)
So the output stream, my point is, like, you tell it, read, read for like, write a haiku to three different files, it's not going to stream the independent write calls as they're coming out. It only streams when the JSON block is finished. Here's the, here's, here's the tool that was called.

Vaibhav (10:55.877)
Yep.

Vaibhav (11:00.814)
Exactly. That's a...

Vaibhav (11:07.599)
Yeah, and that's a UX choice that they make. And the reason that people make these choices, at least in my opinion, is that honestly, it's really, really, really hard to build a good streaming system. It requires a lot of complexity and state management to build it actually good. And then the other mistake that I think a lot of people make is that they realize that they forget that, I don't have to only stream LLMs. Most things that offer a stream API can be streamed. So for example, bash command can be streamed.

And oftentimes you want to stream a bash command because bash commands can take a long time. So cursor I think does a great job at this and cloud code does not. When I go run a shell command set, sometimes. I find at least for me when we run like cargo tests and stuff all the time, they actually don't stream stuff correctly because I think they only stream stood out not stood error. And that's only sometime. I don't see streaming set out all the time when I run.

Dex (11:46.273)
What good Streams Bash output.

Dex (11:58.359)
Yeah.

Vaibhav (12:07.537)
Yeah, and that's what caused

Dex (12:07.569)
Interesting. I know the Cloud Agent SDK definitely doesn't stream bash output. You just get the result when it's done, which is really annoying. You can't show the progress.

Vaibhav (12:14.389)
yeah, that's the other part that's very annoying. So like the hard part about this stuff is building streaming is actually a fundamental layer of your system that you think about from the ground up. So let's think about what this means. So let's say, actually even better than a coding agent is a scraping agent. Let's say I built a web scraper and I want to go collect data about whatever the user asked me to. And the reason I'm going to use a scraping agent is to really make it obvious how parallelism should work.

Dex (12:44.929)
Mm-hmm.

Vaibhav (12:45.113)
So a web scraper is going to go do this and you're going to spin up some agent that, and I say agent, not LLM, that finds all the websites that are related.

Dex (12:52.845)
Mm-hmm.

Vaibhav (13:00.719)
And for some reason, we'll assume that this is it's fully exhaustive. It's, will not do anything else. Then what I want to do is oops.

for each website. Now what I want to do is I want to run a loop that says for each website. Extract all the sitemap.

Vaibhav (13:29.113)
or each page.

Vaibhav (13:34.929)
It's really weird writing code in diagram.

Dex (13:40.587)
You're killing it, dude.

Vaibhav (13:42.393)
Okay, there we go. So does this kind of make sense, what we're trying to do here?

Dex (13:47.488)
Yeah, you have, well, I mean, it's funny. It's this idea of like sub-agents or MapReduce, right? It's like, kind of just want to like fan out and do a bunch of things in parallel and then come back together and then tell me what the final answer is.

Vaibhav (14:00.995)
Exactly. So first things first, this last one is going to, it's almost definitely not going to be a full agent loop. It's almost just like maybe an LLM column, maybe two. You don't really need to stream this part, but we know that these can be long running tasks. So, and these are like incremental and not only are they incremental, there's like two reasons from a product perspective why you want to stream. One is I might want to stream this and then really help inform like what are product reasons to want to stream. Let's talk about that really fast.

Dex (14:12.011)
Mhm.

Dex (14:21.482)
Mm-hmm.

Vaibhav (14:29.797)
Well, I might want to like...

Sorry, what'd do?

Dex (14:36.427)
You gotta hit five a couple times, it will cycle through the arrow styles and you can stop using those ugly ass macaroni arrows.

Vaibhav (14:44.965)
That's cool. Okay. So let's talk about what are product reasons that someone might want to stream. Well, product reasons for wanting to stream five.

Dex (14:49.333)
No, you have to do it. No, no, no, you have to do it. Press five. There you go. Now you're on normal arrows.

Vaibhav (14:56.761)
Okay, demo macaroni cell.

Dex (14:59.947)
No, they're terrible. I don't know why you always use them. There's a time and a place for macaroni arrows. That's definitely not the technical name for them. All right, keep going. There are product reasons you might want to stream stuff. There's different jobs to be done for the user that the user might want to do that would like streaming would help them get a better product experience.

Vaibhav (15:01.485)
okay outside but by for anyway and them with the time of pasta on technicals that i cut it needs to be cars yes okay

Vaibhav (15:21.357)
Exactly. So like the main reason is observability, but observability alone isn't that useful because like this could easily be a background task that sends an update to the user when it's completely done. The real reason you want to do streaming is because oftentimes you want to have a user understand where failures are happening and how they can control and limit the MapReduce system because this can be expensive. So for example, if some websites are known to be junk, I can just like click and remove them out of the queue and I can build that system in only if I'm streaming. If I don't do that, it's impossible.

Same things here, extract all sitemaps, very similarly. I can just say certain pages don't matter, or I can improve my system much faster by having either a human or another agent going ahead and disabling these systems, disabling certain subpages, or perhaps adding subpages that maybe the system misses because it's lossy for whatever reason. And that's really the main reason.

Dex (16:15.789)
So you technically, could, mean streaming is now being overloaded into a third category as well, right? You could technically build a workflow where it gives you all the websites and then you review it and then you do the next step and then you review that. I wouldn't necessarily say you require streaming to do that. When you do deep research,

And the model is like, Hey, here's the query plan that we're going to, all the things we're to do for deep research. And you like approve or deny it. Like that doesn't necessarily need to be streamed out. That could just be, Hey, model is outputting structured output. And then the user approves it and there's no streaming involved. Like it's a, it's a, feels like, it feels like a separate turn in the conversation.

Vaibhav (16:51.001)
The difference, that's 100 % true. The difference that I would say is that it's the amount of automation you have changes if it's streaming or a turn-based. The more automation you have, the more closer you are to streaming. The less automation you have, the more closer you are to discrete workflows. So if you want the system to automatically make progress, you got to stream effectively. Whether you're writing the system as a giant map reduce of like SQSQs or whatever,

Dex (17:04.439)
What do mean by automation?

Vaibhav (17:19.633)
you're effectively streaming. Joshi, quick update. We're writing, you can watch the beginning of video when it goes out, but we are doing evals, but we're doing it next week. We have a really interesting demo that we're sharing about how to build a software factory. Basically, well, the code was a little bit harder than we planned, but it's very close and 60 % working.

Dex (17:32.801)
Basically, Vybob didn't do his homework, so we're doing a different topic because he...

Dex (17:40.107)
Never had that in my entire life as a software engineer. I've never had the experience of something being harder than I thought it would be.

Vaibhav (17:46.603)
I was sadly very optimistic about what I could show and I could show it, I just need two weeks to build it, not one.

Dex (17:55.31)
Okay, so we're looking at a hundred thousand lines of code instead of fifty

Vaibhav (18:00.303)
Basically. Exactly, there's going to be an even better demo next week. So when we go do this architecture, let's think about how this actually works, because let's talk about incremental approaches. So when we find all websites, let's break down this agent and see what it's actually going to do. We're going to ask some LLM to basically produce individual website rows over here. And then for each of these website rows that comes out of here,

Dex (18:01.983)
Alright

Vaibhav (18:29.253)
we're going to run a second task. Make this blue, I guess. We're going to run a second task that's extract the site map. Well, there's a few different ways to do this. And because even these elements are not even guaranteed, like these themselves could be like a little bit more agentic internally because it's an agent loop that's doing all of this. The way that I would think about this is here's how this works. So those of you that are not familiar with SSE streaming, it's called server side events. The way it works is you send like an event name and then you send the data.

And then you typically send a payload of JSON, you don't have to, it's just data is the keyword that you often end up using.

Dex (19:04.545)
Let's go down a level, because you said you send, client or server. And it said like,

Vaibhav (19:10.935)
well as server. It's called server sent events.

Dex (19:15.437)
Okay, so the way I understand it is you have your client.

and you have your server. And basically what happens is the client will like connect, maybe like, you know, subscribe.

Subscribe.

Vaibhav (19:30.985)
Well, think you make I think technically what's actually happening you actually say you make a you make a long long running HTTP connection

Dex (19:38.86)
Yeah, that's what I'm drawing out here. Is this idea of like, make a post request to the server and the server sends back a packet, because HTTP is like, once you get to the body, it's just plain text. So you do like content length, know, vary or whatever it is where it's like, we don't know the length of the response yet.

Vaibhav (19:40.792)
okay. Okay, go ahead.

Dex (19:59.67)
And so the client stays open for the whole thing. And then the server will send additional JSON payloads on the same open connection and the client can just respond to them. And the idea is that each of these is it's, and this is actually like the thing that is also like JSON RPC is a message format that can be done over SSE, but it's like, this is how MCP works. This is all these things. This doesn't even have to be HTTP, right? You could do this over standard IO. can do anything that can keep a long running pipe open and receive like discrete.

package.

Vaibhav (20:30.033)
The main difference though, SSE is a very specific protocol that actually has like an event name and a data field attached to it. And then data can be of any type. doesn't have to be JSON. It doesn't have to be any, it just is data, is the main difference. And like there's like a standard protocol on this. And then what's very important is that during this process, client, it's not like web sockets. So the client cannot send more information down to the server during this. It's a one, it's a single directional event.

Dex (20:37.005)
Okay. Yep.

Dex (20:57.291)
Right. Once the client has subscribed or created the sent the data and waiting for the response, it streams down. And once the server stops and close the connection, the client has to reconnect for the server to be able to send any new data. Yep. OK.

Vaibhav (21:09.873)
Exactly, exactly. So when you go do this, let's think about how you're actually going to go send this out. So the first thing that I would typically would send out is like for this event, because you don't know when you'll get any of these sub events is you just send out like a start and you can even send like start, start scrape, start search.

And you can even set an empty data object. You don't have to set anything. But then as soon as you get one of these, you get something like this. Search element.

Vaibhav (21:48.657)
ID1 for the first one, ID2 for the second one, etc. You can send as much more data as you want. can enrich this, you can put the metadata of a website, whatever you want. So now if you're doing this, your UI basically

Dex (22:00.449)
And you can do a bunch of these in parallel too. Like the client could open up three separate SSE streams.

Vaibhav (22:07.809)
yeah, yeah, yes. But in this case, let's just imagine it's a very long running SSE stream. So what ends up happening is you're sending the data of like, here's the search element, here's the website URL, or like URL.

But what's interesting is because each of these has an ID now, you can do something else, which is if for whatever reason your backend, you do like a parallel search where once you get one of these, you start, sorry, one second. Once you get one of these, you start doing sub agents on top of this where you're running another parallel like a web scraper. Well, while this can run and this is a parallel map,

It's like for every element that comes in out of this agent, you run a parallel map on every sub agent over here. You can now send more SSC events and these can be intermingled however you want. So like this could be like site map. You can say like web search ID one and then like math, whatever this ends up being.

I know, maybe it's like a single thing. So this actually ends up being quite easy for your front end to go do, because this is actually a very simple system for your UI to start drawing. All you're going to do is you're going to say, hey, I have a start search, I have a search element. For every element, I get sitemap calls. Sitemap calls tell me the ID so I know exactly where to store my data model of collecting more incremental information. So your front end starts looking something like this.

some code so interface

Vaibhav (23:51.085)
URL string.

Vaibhav (23:56.483)
ID string hours.

Vaibhav (24:02.705)
saying that JavaScript makes you just use numbers instead of ints or floats. You get URLs, and then you also can now do sitemap, for example. And sitemap can be a record, a string to string, I don't know, maybe it's like a description, but you can make sitemap optional. And what the optional thing tells you is that effectively, your UI doesn't render anything for the sitemap, and optional can be pending. Or if you want to be more explicit, you can even say like,

sitemap is this or pending. Literally just a string literal. So when the first message comes in, you create a search element where the sitemap is pending. As soon as you get the SC event, you can go do this and you can go build this in. Now, how do you do incrementality here? Well, as you do incrementality, you can do different rules. And this is just a contract between your server and your client. So for example, you could make a data structure that says, in the case of sitemap, we can choose how we stream.

we can say we only stream as a key value pair gets completely finished, or we can say we stream as a key value pair is actually getting done. So the key has to be done, but the value can stream. So for example, imagine that the site map is really the path related to a description of what the path is meant for, like a summary of that page. So in this world,

to summary. So clearly summary can be much longer than the actual path. So when you stream from your backend, instead of streaming just the map, what you would do is you would stream.

Vaibhav (25:45.275)
dollars in the chunk and then you say summary chunk.

and you pass in whatever string delta you want. So how does this actually end up map?

Dex (25:55.264)
And so the string deltas might look like the site contains and then your next delta would be, you know, some other chunk.

Vaibhav (26:07.493)
Exactly.

Dex (26:09.613)
I'm so mad at Excalibur for breaking this hotkey and I still haven't learned data about. So like the site contains data about, you know, products related to, so each of those chunks comes in its own like little Delta. And so you take this entire JSON payload and you pull out the Delta and you like append it to the screen.

Vaibhav (26:14.159)
Writing code in Excalibur is quite hard.

Vaibhav (26:35.843)
Exactly. Exactly. And what you're really doing here is effectively just that you're going to write a function on handle update where the event name is always site map. And the data is going to be of that type that we described over there. It's like,

this is probably the wrong place where I code, I should probably write this in like an ID, and that'll probably be easier. You get search ID number, path, string, summary chunk is also a string. And the first time you get any site map for that search ID, you replace pending with that path and that delta. And why do you do that? Well, because when you're in pending mode, you can actually show the user something interesting with a UI or even opt into hiding anything. Because the message you display on an empty map is different than the idea of a pending state.

because it hasn't been processed yet or an error state. Otherwise your empty map looks the same. So the user can, won't be able to tell if it actually started or if it actually found an empty site map. And it's going to be impossible to tell otherwise. So you're to go build this out in this way. So now your UI gets really nice UI format where you can incrementally show even like this dialogue showing up exactly this way, where it shows you the main site. It shows you a tree mode of a site map of a path. And now the

actual summaries start streaming in. And what's interesting about this is you can actually have multiple summaries for the same sitemap streaming in at the same time. So you can get streaming for adding new elements and you're getting streaming for actually documenting a summary. Does this make sense so far Dexter?

Dex (28:07.529)
Yeah, I follow this. Are we going to write some code today? We're about 30 minutes in.

Vaibhav (28:10.149)
Yeah, let's write the code after this right here.

I have to make sure that I don't leak my API keys.

Any questions from anyone about why you might do this or where the value of this is?

Dex (28:28.653)
I'm gonna write you a script that provisions an API key with a $3 budget for this.

Vaibhav (28:31.045)
What are the keys of the site map? The key of the site map is like the path. So like in this case, it would be like L slash whatever this ID is in Excalibur. That would be like the key, the path of the site map. The URL would be the base domain up until here.

I'm so sad I can't do eval3 for this edit. We'll update that folder in a second. This is probably going to break all the scripts, but that's okay. We're going change this.

Vaibhav (29:07.621)
I will just open that folder directly.

Dex (29:12.141)
Okay.

Vaibhav (29:19.025)
I'm isolating. There we go.

Vaibhav (29:26.193)
All right, let's first start with a terminal. And I'm going to write a Python back end that just shows you exactly how to go through this.

Vaibhav (29:46.287)
Okay, and then I'm gonna simulate the stream. Maybe I'll make real album calls, we'll see.

Vaibhav (30:01.937)
some of this stuff into the UI. So def generates site maps.

So this is going to be URL. This thing is going to be a function that returns a object of sturtle sturtle.

giving you a URL.

Vaibhav (30:32.113)
Okay, cool. We'll just do this for now.

Vaibhav (30:42.283)
Or, okay, there we go. This will probably work.

Vaibhav (30:50.929)
Probably just have to twist it right out of the thing.

Get page summaries. Say that again?

Dex (30:55.287)
What is function?

Dex (30:59.487)
your This is what you get for writing TypeScript on the whiteboard and Python in cursor.

Vaibhav (31:03.799)
I have been in Bameland for too long.

Yeah, I've been writing Bama code for so long now that I forgot how to write basic things. And then def get pages. I think this is what I want. Okay, cool, this should be good. Okay, Google's a bad website. Yeah, that works up stack, but we don't have that. We have a Wikipedia, though.

Vaibhav (31:39.313)
That's probably also a bad sitemap. Let's use the vlog thing for the podcast.

Dex (31:48.833)
Nice, that was going to be my suggestion.

Vaibhav (31:51.931)
So we're going go with the sitemap of this page. Once I get the sitemap, the sitemap is going to be a list of URLs, and then we should get the summary for each one.

Vaibhav (32:06.577)
so that I can get a summary of the page.

Vaibhav (32:16.593)
Okay, cool. It'll fill it out in a second, sorry.

Dex (32:17.719)
Ha ha ha.

Vaibhav (32:26.577)
All right.

Vaibhav (32:30.801)
It'll fill this out and we'll have something working over here.

Yes. There we go. And then this is going to be a very, very silly example. This will not do anything. And once I have the harness, then we can start writing the code. Could be run, not be y. So clearly, this is wrong. But what we're going to do is we're going to start adding some AI stuff, and then Claude's going to go write it.

Vaibhav (33:02.881)
So I can just copy and paste this thing.

Vaibhav (33:08.881)
I wish GitHub made it easier to copy.

Vaibhav (33:15.089)
So put in a cloud mv.

Vaibhav (33:41.937)
This demo code, so we don't really want perfection, we just want cleanliness and simple code.

Vaibhav (33:55.865)
Okay, there we go.

Dex (33:59.736)
Okay, let's see what our guy rips.

Vaibhav (34:00.113)
Yeah, there's a way to go see the actual raw SSC streams. This should probably get us pretty far. So the key part here is like, one of the few things that we're not doing yet is once this is done, you'll notice that the agent will work, but what we'll need to do is take our agent and then enhance it with streaming. It doesn't actually sadly work naturally, because once you actually want to go do streaming, you actually have to think of everything as a yield rather than as a return type.

And that's really the complexity that I see most people falling into and why most apps don't have streaming. So like, for example, I wrote functions here and the way that I wrote the functions here is actually quite like not, there you go.

Vaibhav (34:44.625)
Okay, the way that I wrote these functions here is not that unreasonable, but if I want this to stream to the top level If I want this to stream to the top level system I'm gonna have to plug them in something that allows me to send a message up to the final request handler The long-living connection that Dexter was talking about when he drew the diagram that needs to be passed in somehow Yes, stop just allow all that it's be unsafe

And that's really the hard part about these systems, which is as you go build this out, this is why not ever, even Cloud Code just recently added streaming. Dextro was kind of surprised to see that, just because it's not a thing that is trivial to do in your code, because if you don't design for it, adding it later is like an infinite amount of plumbing. nice. That's great. I actually told it I want to stream, I guess, and it kind of figured that out. What is it streaming? It is.

I guess I won't even have to tell it how to go streaming. It'll just go do it for me. That's fantastic. The real problem is, the funny part is, why does this work? Well, because in our Claude MD, we actually have instructions on how to do streaming. I think it was figured it out from here, because we give it the instructions on how to do that. I should have hidden those out to actually show the incremental change. But when I go curl this, it will.

Dex (35:48.951)
ship it.

Vaibhav (36:13.425)
Let's run it via the CLI really fast first.

Vaibhav (36:21.201)
Ghosty is freaking great. Those of you that haven't tried it yet, I highly recommend it.

Dex (36:28.525)
Do they have search yet?

Vaibhav (36:28.654)
ghosty I have no idea but it's just fast and I feel like that is like that is like half the battle when I'm using stuff

Dex (36:33.357)
Yeah, that's good.

Dex (36:39.255)
Don't bet against Mitchell.

Vaibhav (36:44.721)
How to Find Zero Pages.

Vaibhav (36:53.179)
There's definitely patient on there.

degenerate site might not work.

Vaibhav (37:05.393)
Sure, just run it. As it runs, still do me a favor. And you'll see once you add streaming versus don't add streaming, and I'll ask the model to swap this out to make streaming an optional thing. But once we add that, you'll see the main difference in how different it feels to have streaming versus not have streaming. And obviously, a terminal event will look very different. OK, let's run this again. Nice, it found 52 pages.

Dex (37:35.117)
you should turn off your Bama log.

Vaibhav (37:45.809)
There you go. And you're noticing over here, it's not actually, again, it's not streaming the full thing, but it's definitely streaming each incremental object, but it doesn't really need to because it's not running anything in parallel. I'm going to start running some in parallel, but first I'm going to run the curl response that I gave. Give me a read me.

Dex (38:03.501)
You gotta run the dev server.

Vaibhav (38:07.985)
Yeah, exactly. I want to show what this view, add one instructions.

Vaibhav (38:17.037)
Add the run instructions to the readme. No, the problem is if I have it run the dev server, every time it changes, it won't hot reload or it's going to try and do dumb things. It's easier for me to run it in a separate terminal.

Dex (38:17.153)
Just tell it to run the dev server.

because you won't be able to stream the output. Yeah, you won't be able to stream the output.

Vaibhav (38:34.289)
There you go. Thank you.

Dex (38:49.663)
UV head.

Vaibhav (39:00.081)
Fantastic, okay, and then it actually gave me a link to click on. Let's see what the link does.

Vaibhav (39:09.679)
loading and

Vaibhav (39:15.939)
In theory, I'm supposed to get something.

Vaibhav (39:23.237)
the host.

Vaibhav (39:27.505)
It told me the instructions about the run, but I might have opened the wrong tab.

Vaibhav (39:39.978)
And this goes to running.

Dex (39:40.383)
Or it's just not streaming properly. If you run it with curl, does it stream?

Vaibhav (39:45.969)
Let me try running curl. It is running the get command. I know what's happening. Okay, Yeah, the right texture.

Dex (40:01.441)
Yeah, put it in quotes.

Vaibhav (40:04.03)
my god, as you can tell, I've gone way on the dark end and I never write code by hand.

Dex (40:10.829)
a shell boy anymore. Yeah, I don't know if this is streaming, dude. I think you need to flagellate Claude.

Vaibhav (40:12.751)
I'm just not a shell boy.

I do need to tell Cloud what to do. Give me one second.

Vaibhav (40:28.913)
it's probably gonna be like you're running the wrong curl command.

Vaibhav (40:39.661)
I also suspect that there's no actual like, because this is purely an API, it's almost definitely not actually running anything over here. Yeah.

Dex (40:53.965)
Wait, it switched from generator to...

Vaibhav (41:00.241)
I'll see what it does in a second. I'll let this run for a second. Yeah.

Dex (41:01.581)
He's making it sync now, because your BAML was not sync. Your BAML was not async, it was doing blocking I.O.

Vaibhav (41:14.929)
Oh, there we go. Now it's running. And you can actually see what it's actually sending out. So as you can see over here, we're actually sending out the data over here and streaming every single one of them one by one. And it will go swap this out. And then use async. And then I'll show you how we actually stream the individual events. And this will burn some of them. Exactly. And if we don't parallelize, can't.

Dex (41:37.549)
Yeah, because you want to start paralyzing this and like streaming them out together basically, right?

Vaibhav (41:42.683)
Python is horrible for parallelization, so we just have to go do this.

Dex (41:45.857)
Does Python, does the Python standard out have a mutex like multiple things can't both print to the same stream at the same time, right?

Vaibhav (41:54.501)
Does the Python standard out have a mutex? Standard out has a mutex. So you can't actually write to there, but you can yield stuff.

Dex (42:01.089)
Or guess it's async IOs, so there's only one thing running at a time anyways. You will never have multiple writers. Like, print is sync.

Vaibhav (42:06.499)
Yes, it's mainly just yielding on when it's waiting for network calls or societal operations. so I'll respond to this again.

Dex (42:11.543)
Yeah. Yeah.

Vaibhav (42:19.729)
And now you can see that's running and now we'll go run stuff in parallel. And what I'm to do actually is I'm going take our diagram. Oh, there we go. Now this loads right here too. So in theory this should, exactly. So you can actually see it happening. So now what we want to do is we want to do a couple of things. We want to make it so that the summary will stream. We want to make the summary stream and then we want to make sure that the title doesn't stream.

Dex (42:29.911)
paste in a picture.

Wait, if you reload this, is it gonna print them to, yeah, nice, okay. Cool.

Vaibhav (42:49.509)
but we want to make sure that, yeah, the URL and the title should not stream, but somebody should stream. And then we want to make sure that all of these happen in parallel. So let's do this incrementally together. And what we're going to do is first, go ahead.

Dex (43:00.205)
I want to stream. can we okay? So first we're gonna split out specific fields and then what are we gonna stream the summary token by token? Cool

Vaibhav (43:06.801)
Exactly. we want the token, some raise the stream token by token, but we want the, we want the, all of these to also run in parallel. So I'm going to break this down into a couple of steps because I think this is where the magic is going to start feeling much cooler. So what we're going to do is we're going to make sure that we stream each one of these and run them in parallel, but we won't do fully in parallel. We'll run groups of 20, which I think is more fascinating. Oh, or we'll say groups of five. Okay, great.

Now let's do some batching because let me talk to it.

Vaibhav (43:47.131)
This is working. Now the next thing that I want to do is when I actually run get page summary, it's running for a single page. That's fantastic. I just want to make sure that I batch calls to get summary in batch sizes of five to 10. That means the SSE event I sent should have enough information to uniquely identify each page. And I think the URL for that should be enough, but I want the batches to be sent and the yields for the SSE events to be sent in parallel as well.

I talk a lot whenever I talk to Claude.

Dex (44:17.429)
Hahaha

Vaibhav (44:19.457)
and give this a second and as soon as this is ready it will

Vaibhav (44:26.545)
Go ahead and write the information. I want to show the diff really fast before it starts adding. I'm going to start. Oh, I missed it. Oops. I'll show it in a second. It should add a little bit of stuff in there. But the diff is actually not that hard. And I want to show how the...

Vaibhav (44:46.457)
And I recommend other people get used to this because you just have to get used to using async.io and futures and then async.io.as completed. There's also async.io.gather, et cetera, that you could do. And obviously you have to remember that any one of these can fail. So we always have to be a little careful about failure points and describing them a little bit better. But as long as we're careful about that and we make these a little bit more robust, and if you don't make it robust, the problem you run into is one task fails and everything fails. Because of it, we want to prevent that from happening.

Dex (45:13.505)
Mm-hmm.

Vaibhav (45:14.329)
Yes, we are making only a single connection for each. We're actually making a single connection for the entire summaries request. Every single summary is coming in through a single connection. I'm not reconnecting and can, I'll show you the curl request in a second. Now when I go do this, we should see groups of these come up at once. We have batch size of five. Let's make it like 10, just to make it even more obvious. So I'm going to rerun this now.

Vaibhav (45:42.949)
You see how much faster that is? It's because running groups of batches of five. It's waiting for every five to complete and then it's rendering.

Dex (45:56.321)
Makes sense.

Vaibhav (45:56.333)
And it's way faster than we did before, but I'm to do one more thing. I remember when I do batches of five, it's, I know that there's five coming up, but one of the things I'm missing to show in my UI is I don't know which five are coming up. Imagine each one of these takes a while longer. I can send one more event before I run each batch of five of which five I'm going to show. So we'll add that event in there. And you'll notice that a lot of SSE stuff and streaming is actually not about doing the work.

cloud can write all the work. It's about designing the system that we want to design for. So I'm going to design what I noticed here is I don't have the information for what batch I'm sending until the batch comes in. So I only get this event once each one is done. I want to send one. I want to design an event that I send first. That's here's what this batch is going to include. So I'll ask you to do that before running each batch. What I want to do is I want to send a single event that tells me what pages each batch is going to include.

Dex (46:29.165)
designing the system.

Dex (46:47.341)
I have another random question.

Dex (46:57.549)
Sorry, I didn't realize you were dictating. Do you plan to have this stream HTML elements instead of JSON at some point? Yeah. All right, let's try this again.

Vaibhav (46:57.776)
Go ahead, what's your question?

Vaibhav (47:06.819)
Yeah, I'll make a small little UI that renders for this really fast. And now it's going to go send a batch start event and go do this. So now it checks this out. We get a batch start and we get five. Then we get a batch start and then we get more data. Or I guess it sends like 10 events in a batch or something, whatever the number I set. And you can actually see how, you can imagine how this UI is going to be much prettier for a system to use because of that reason. Because, and I'll show you what,

when I build the UI and I actually build the final UI, you'll get to see it really clearly. And it's very fast with cloud code. Now let's...

Dex (47:42.722)
Let's, can we also like, instead of building a like web app UI, which we've done all the time, I think it could be interesting. I haven't tried this before, but like have it actually just stream out like chunks of HTML is a like a AI engineering technique. Can we, can we try it?

Vaibhav (47:49.488)
Yeah.

Vaibhav (47:56.729)
I don't know if the browser can, I don't know if the browser will render that because it's like when you stream the data, you have to go send out data blobs and the, like the SSE protocol requires data colon HTML and you can't write data colon HTML and render

Dex (48:11.147)
can't, you can't, the SSC protocol won't let you, okay, lame.

Vaibhav (48:12.195)
Yeah, yeah. Yeah, you need a receiver on the other end that parses the stream protocol. It has to do with some of way they do like, it's just part of the protocol. Okay. Now the next thing we want to do is we want to stream it so that the summary for each element comes back in a chunk. So we're going to try and go do that now.

Dex (48:25.409)
That's fine.

Vaibhav (48:36.771)
Okay, that's great. Now I want to use semantic streaming on the actual summarization page so that the summary itself comes back in a chunked form. So what I want to do is I want to stream the summary as it gets filled out, but I want to guarantee that the title and the URL are always completed and not really open to and require completion. Yeah.

Dex (49:01.728)
Okay.

Vaibhav (49:02.177)
And you'll notice that this page is just, it literally just gets the text of the page and then calls a BAML function. This BAML function over here just does this and just gets a title and then gets the summary. So you'll see exactly what happens here. So what we did is we actually said this gets marked as stream.notNull. The summary has no premises such as that. It's allowed to be null. It's also allowed to be empty.

this is what you'll find. So it's going to change the code, not too much, but very little. So instead of using the regular function, like we had before, we're going to use the stream version of the code. Then you're going to get the partial and the partial is going to have a title. Title cannot be null. That's just, it doesn't know that the URL we already have.

Dex (49:48.11)
So that means that a chunk streamed out from the LLM provider web request, but the title is null. And so we know we don't have enough information to actually render anything. So we don't emit any event.

Vaibhav (50:00.653)
Exactly. And you're noticing something here. Notice again, this is the annoying part about streaming. You have to go pass in these queues almost through the whole system. So you're passing in these queues and as you're getting them, you're creating a queue, you're creating a task and you're basically communicating to this queue. And as you go through this, you process the queue and as the queue gets elements, you send it across the wire. So it's actually not good.

Dex (50:25.399)
Yeah, so you're basically using this very simple in-memory data structure to allow these async I O different like co-routines to communicate with each other and with the parent.

Vaibhav (50:36.205)
Exactly. So I'm going to run this now and you'll get an idea for what this looks like.

See what it did? Summary, no, empty string. And all of these, and remember, we're running everything in parallel all at once. So it's going to be a little bit hard to see, but you'll notice that we got this one. Let's just only filter for no lives allowed.

So right over here, the podcast, the podcast episode discusses, the podcast episode discusses the theme, the podcast episode discusses the theme of Novi. And you're seeing exactly how it's streaming out. So now I can build a UI around this. And here I'm being really redundant, where I'm not actually sending a delta. I'm sending the full thing every single time. Now I likely don't, go ahead.

Dex (51:20.375)
Okay, cool, sorry, keep going. For the UI though, I'm going to push you. You should try to build a static HTML page that just uses static HTML and JavaScript to hit the endpoint and append to the DOM rather than building an entire Next.js app.

Vaibhav (51:33.561)
Yeah, that's what I do. I'm not going to build the next ASAP for this. You don't need to.

Vaibhav (51:45.617)
Watch this. Now fill in.

Vaibhav (51:51.515)
So that it hits.

Dex (52:05.591)
Amazing.

Vaibhav (52:05.797)
this is going to be the really nice part.

And I'm not, as you know, yeah. why is it doing this?

Dex (52:09.855)
Yeah, this is one of my new favorite tactics. I've posted about this a lot of like, you actually don't need Next.js or React app or Veed or anything to be able to, okay, this thing wants to serve the HTML off of a route. That's fine. Yeah.

Vaibhav (52:25.573)
That's fine. I'm not gonna complain about that. That's not too bad.

Dex (52:30.989)
But yeah, just to be able to, like literally, you can open an HTML file in your browser and have it do all kinds of interesting things before you actually need React or anything. Like, at this point, your bar for creating an XJS app or a VEAT app or like a full front end like in a framework, like should be significantly higher than it used to be. Like it used to be, number one, it used to be really annoying and hard to write an index HTML from scratch that used JavaScript or XHR or jQuery or whatever.

is so you just like would just use the framework because one it made it easier and two you knew you were going to need it eventually but now it is both easy to have Claude riff one of these out and two very easy to take one of these and turn it into a VEAT app or a Next.js app if you need it.

Vaibhav (53:15.993)
I have no idea what this is to show, but let's try.

Dex (53:18.189)
Ship it. Let's have a look. Summarize that bad boy.

Vaibhav (53:21.137)
That's kind of cool. Ready? So first things first.

Dex (53:27.412)
so dope.

Vaibhav (53:29.265)
I don't know if you saw that. It's like you're actually watching it fill out in real time.

Dex (53:36.001)
Yep. And it doesn't show, you don't see partial titles, you only see the full titles. The titles all pop in at once.

Vaibhav (53:36.898)
on the way.

Exactly. The title's popping at once, but you're watching this work. Streaming is really fucking cool. Like if you have, if you have not built streaming into your app, as you saw, like we did this whole episode, it's been less than an hour. We discussed the concept, we wrote the agent and we built the front end to show you streaming.

Dex (53:59.896)
We were writing code for like 20 minutes and you only did like five or six prompts.

Vaibhav (54:01.859)
Yeah. Yeah. And I don't even think I knew the exact code I was going to write when I wrote this. It just happened because the key and again, like part of it is like, part of what makes this streaming really easy is like, we have this caught MD that just tells you all the knowledge that we have in there just has that caught MD on there. So it just makes some of those mistakes easier. The other parts that make it slightly easier is the fact that like,

Dex (54:08.043)
Yeah.

Vaibhav (54:29.231)
When you go do this, I can just tell it, hey, don't stream the title. And the LLM and the code never has to think about this. It's just guaranteed by the type system that the title will never be streamed and the summary will be streamed. So you get really nice value prop there. If you want a link to the CloudMD, you can go to docs.boundaryaml.com. You can check out the origin of that MD and it has all the instructions for here. And you can just copy that CloudMD over and it'll have it there for you. We're working on slightly more optimized CloudMDs.

But hopefully this gives you folks a really good idea, link for like why streaming is useful and how much more powerful it can make your applications as you go about this. And even here, like one of the things that I didn't do is I didn't show the number of batches that we're expecting ahead of time. I can literally just do that. I could show you all the number of batches that we're having ahead of time and then I can give you a pagination view in the beginning. I can make it so you can interrupt one of these. I can make it so you can cancel one these. I can build that whole UI out.

But the only difference is the minute you start doing like interruptions and batches, now you have to do the second part of this, which is something that we've talked about briefly, but have never built a live example for. Which is, remember what we said, which is server side events are just one way. You can't actually communicate from the client to the server. So the minute you want to do that, what you end up actually doing is you end up writing stuff to a database of some kind. Don't use WebSockets. If you're using WebSockets, you're going to get screwed.

Dex (55:50.231)
You do the unidirectional thing, right? Yeah.

Vaibhav (55:56.337)
You write stuff to a database and then you also let the client communicate to the database, which then changes the state of the server.

Dex (56:04.011)
Yeah, this is for any, and we do this in Riptide as well. have a unidirectional data flow where all writes go to an API server, which writes to the database. And then every time the database changes, those can get streamed down to clients who are subscribed to different queries on that database.

Vaibhav (56:08.869)
Exactly.

Vaibhav (56:19.575)
Exactly. Like for example, if I wanted to cancel one of the events and I wanted to build a cancellation system over here, what I would do is I would say that this, let's say I want to cancel this event. This is dumb. I don't want to do this one. I just hit X over here and I say cancel. And then what this would actually do is this would go and write to the database and say cancel. And then what we do in the server, well, exactly. The UI would see that update, et cetera. But when we go to server, the other thing that you would do is you'd say,

Dex (56:38.775)
that it was cancelled and then the UI would see that update stream down.

Vaibhav (56:48.719)
before you actually go ahead and run this Summarize page.

Dex (56:53.356)
you got to propagate a cancellation all the way down to the request point so that it stops streaming.

Vaibhav (56:59.799)
No, you wouldn't do that. You would just like catch if db.isCancelled.

skip. Like you basically like pass the URL and check if it's canceled. Exactly. So that way you have to build into a control. That means there can be race conditions. So you can't always cancel it, but you can cancel it if you do like weird event hooks and you can make this as good as you want. It's just software. But I think that's a topic for a different time. We're about nearing the end. Questions that people have today. I think Ed asked a question. Have we looked at data start on that? I have no idea what that is. I haven't looked at it personally. I mean, SSE for me is like,

Dex (57:08.087)
Yep. You just return, right? You just early, early exit.

Dex (57:35.189)
It's a hypermedia framework, ViBov.

Vaibhav (57:41.045)
what the heck. I'm sorry, I look at this website and like my first gut is like, what is going on here? It's just not the kind of website that appeals to me. But let me try and like not be opinionated and only give pure application basic value prop. I have no idea what this is.

guide reference.

Dex (58:01.353)
It's basically using SSR for everything and like not having client logic.

Vaibhav (58:06.417)
yeah, that's fine. There's many different ways to go approach this. I don't think I'm really opinionated on that. I think the most important part for everyone here is just to recognize that once you do this, the way that you actually make this really, really good is you actually build a single type system that actually shares these events in a very type safe way across the wire, across everything. And then that's what you stream. And that's how you make it phenomenally good.

Dex (58:32.204)
It's.

Vaibhav (58:33.507)
If you don't do that, you kind of get screwed because now you end up in this world where if you don't use types, then it's really hard to make your front and your back end kind of synchronize nicely. usually what we actually do is like...

Dex (58:53.353)
It's giving a little angular. Looks like it's a closure thing.

Vaibhav (59:03.281)
It's like, this is what I would actually do to be completely honest.

Dex (59:03.447)
for it's it's for closure people yeah

Vaibhav (59:08.266)
And like this is summary or null and once you do this, I would just add another generator over here

Vaibhav (59:22.641)
And now you also get TypeScript code that matches to it, and now you can just import your types. That's usually what we recommend to most people, because then you get, what is it?

Dex (59:30.465)
Yeah, then you don't need to just like manually parse raw JSON in your raw HTML.

Vaibhav (59:32.963)
Yeah, exactly. Then you don't have to manually type. Then you get like, then you basically get this. And now you can just say, I want to make my SSC events this. Or you can say something like,

Dex (59:43.595)
What's the challenge with WebSockets is one of questions here.

Vaibhav (59:51.345)
So like if you do this, for example, now, now you can be guaranteed that your queue is only going to be one of these well-defined events. And then what you get told is even on your front end layer, where'd my front end layer go? Types. Sorry, my brain, there we go. Even my front end layer, I have SSC events as only these events. So now I know how to handle, I can build a handler for all of these. What's the challenge with WebSockets? The big challenge with WebSockets is if you're building any of this stuff, almost definitely these are long running tasks.

Dex (01:00:13.451)
Mhm.

Vaibhav (01:00:21.345)
If they're long running tasks, that means they're typically going to run it in some background process, or they shouldn't be running in your main process. And WebSockets are very ephemeral connections. Like the minute someone disconnects, someone reconnects, you have to go maintain that lifecycle. It's much harder to maintain that in a bug-free way, especially with like state race conditions. It's much easier to say that you have a single model of truth. a, like, again, for me software is about how do I reduce bugs as much as possible.

If there's multiple events that can read and write from the system, subscribing to race conditions is incredibly hard. You're basically using like global variables to modify race conditions. And most people just are not good at using global variables. You're going to have to maintain a web socket. Someone's going to hit a cancellation event. That cancellation event is going to affect some mem in memory data structure. And what if you already kicked off the event in the server to actually go to the web service? The nice thing about the database layer is that design is actually really simple. This is running.

And the only point in which you check for cancellation is like one line over here.

Vaibhav (01:01:27.781)
and then you just check for cancellation. If a cancellation comes in at any point after this, it's not able to be canceled. And what you can do now is you can actually say like, if you make it past this stage, you can say like db.startingentry URL. And now you're to say that this URL is starting and therefore the UI rejects, the other system rejects the cancellation sequence. It's just easier to model. Exactly.

Dex (01:01:43.745)
And we say it can't be cancelled.

Dex (01:01:49.355)
Yeah, and then you see it like can't be canceled, it's already going.

Vaibhav (01:01:53.681)
Or maybe you can, and you can build a system to cancel the thing that's already going. But the point is it's easier to model. It's way less likely that you make mistakes. And when I think about software, I always think about what is the architectural decisions that I can make as a team leader so that it's less likely that people on my team and Claude make mistakes by accident. Because remember, we don't read all our code anymore. So choose the simplest architecture that is most sound.

Dex (01:02:16.407)
Yep.

Dex (01:02:20.203)
Yep. It's what is the when someone when someone ships code and breaks the thing you depended on, but none of the tests broke. It's like if you liked it, then you should have put a unit test on it. Like the reason we write tests and have good architecture is to make it as easy as possible. And it's like someone ships code and it breaks something like.

Vaibhav (01:02:30.661)
Exactly.

Dex (01:02:38.669)
The reframe there is like, what about the system allowed them to break something and why wasn't that like thing we depended on like enforced by a contract or a type system or something that runs before code gets merged?

Vaibhav (01:02:49.367)
Exactly. It's the same reason here when I write this queue, the way that I should really be writing this queue is this is not like an arbitrary queue. This queue, yeah, this is the most annoying thing about async queue. Async queue doesn't allow you to have type safety. It's so annoying. It's not generic. It's so bad in Python.

Dex (01:03:08.373)
You can't import types for this? There's no async IO type? Okay.

Vaibhav (01:03:10.745)
No, async queue isn't, you can't do this. This doesn't make sense. Yeah, that's a problem. It's not generic. Async queue should be generic, but it's not because it's evil, because it's Python.

Dex (01:03:15.642)
I see.

Dex (01:03:23.209)
And yet you write Python on every episode.

Vaibhav (01:03:25.999)
Well, even TypeScript doesn't have a good solution for this. That's a problem. Because async queues are just hard. It's not that they don't have generics. It's just that async generators and async queues, by default, just struggle with... Let me describe this in a better way. Most of these languages are designed for a time when SSE and this streaming concept and async queues weren't really first-class citizen and first-class thought of.

Dex (01:03:29.879)
TypeScript doesn't have a queue with generics.

Dex (01:03:52.811)
Yeah, it's all bolted on.

Vaibhav (01:03:53.059)
It wasn't a design pattern. when they added async IOU queue to Python, I think they added it. I don't remember what What version of Python?

Dex (01:04:05.505)
What is asyncIO part of the standard library now?

Vaibhav (01:04:08.889)
Yeah, I mean Python, it'll tell me in a second. I don't think about this. It only came in 310. That's actually not that old. sorry, three, four.

Dex (01:04:17.845)
No, no, it's three, four. Because that's when asyncIO is added to the standard library.

Vaibhav (01:04:27.705)
And I'll tell you what year three, four came out. But like that's 2014. That's not that, what I would call is like a lot of, it's not what the pattern of async was really common. Think about react was barely starting to make motions at this point. Like.

Dex (01:04:35.127)
That's a... Is that really?

Dex (01:04:42.989)
Yeah, I wrote a React app in 2014 and it was a disaster,

Vaibhav (01:04:46.673)
TypeScript had barely made the stage at this point. Like this was like, yeah, this is su-

Dex (01:04:50.733)
No one was using TypeScript. I remember writing TypeScript in 2016. It was like, hey, there's this new thing that no one's heard of yet.

Vaibhav (01:04:57.617)
Yeah, exactly. Right? Like I was writing CoffeeScript in 2012 because TypeScript wasn't a thing because I wanted a little bit better autocomplete. And like that's the whole point about these systems. Like none of these systems were designed for the world that we live in today because they're designed so long ago and they kind of have this...

Dex (01:05:04.781)
That's so funny.

Vaibhav (01:05:13.957)
That's why like async and that's why like whenever no one, why does no one do streaming? Like even though it's only took us an hour, like in order to do this, you kind of have to know what you're doing ahead of time. But once you know it, it's trivial. And that's, that's the magic here is just having the knowledge base. So now all of you that are watching the stream should be able to make all your apps feel way more reactive and make it feel way more fun. And you can, and streaming isn't just about streaming LM calls. As we saw, can stream everything without streaming the LM call itself.

That's the first thing we did. We streamed just the events and then we added the ability to stream the LM.

Dex (01:05:50.54)
Yup.

Vaibhav (01:05:53.091)
Right? That's totally orthogonal concepts. Choose the amount of reactivity and fluidness you want your app to have. And like that's the main takeaway of today's episode.

Dex (01:05:53.143)
Dope. Dude, this is a great episode.

Dex (01:06:03.319)
I love it.

Dex (01:06:07.329)
No more questions.

Vaibhav (01:06:07.899)
Cool. Any other questions from anyone?

Dex (01:06:11.745)
Alright, so takeaways, if you do one thing, design systems, go get the boundary cloud MD, do more streaming stuff, make it hard. This is not easy, this is not the easy part, but what we always say on the show is like, go learn how to do the hard thing and that's gonna let you build things that are better than what everyone else who is not willing to learn the hard thing will do. Anything worth doing is worth working for. Question from Sid, any more use cases for streaming apart from cool front ends?

Vaibhav (01:06:40.483)
Yeah, it's cancellations. It's a queuing. It's moderating the agent. What I hate about like, why do I, why do I hate the cloud code agent sometimes because I can't send events into the sub agent. It's because they don't have a good streaming UX that actually does the central database protocol that like Dash was talking about. I want to interrupt a, it's, I want to interrupt the sub agent that requires a beautiful, it requires really clever UX to solve the problem, but also a streaming architecture that lets you go do that.

Dex (01:06:58.399)
unidirectional data flow.

Vaibhav (01:07:10.607)
So streaming is the read only part of it, but without streaming, you can't make the right part of it. And the right part of it, I think would be good for another episode for us to go talk about, like the cancellation flow. We could easily take the example we built today and add cancellation on top of it. And I think that'd be a great use case.

Dex (01:07:20.182)
Mm-hmm.

Dex (01:07:26.957)
Okay, cool. That would be fun. Okay, eval's next week, we promise. Can someone type the docs URL, please?

Vaibhav (01:07:35.941)
Yeah, we got you.

Vaibhav (01:07:41.977)
Yeah, you likely don't even need to know what VAML is. If you literally just paste it in there, cloud code will do the thing for you and give you streaming. You can also point it to this code base. you can also point it to this code base, and send it out as well. And then also, I know a lot of people have been saying this. I have ordered a new mic. It was supposed to come in today. Sadly it did not. So you will get to hear me in.

the highest definition audio starting next week.

Let's record a quick outro and then that way we can in the YouTube people get a summary of what's coming up.

Dex (01:08:22.166)
Okay.

Vaibhav (01:08:23.237)
Go for it Dexter.

Dex (01:08:24.973)
Cool. Thanks. This is a really exciting episode. Sorry.

Vaibhav (01:08:27.385)
Wait, let me screen share and then can show the tab too actually because I think that'd be kind of cool.

Vaibhav (01:08:36.581)
Why can I not screen share? Almost.

Dex (01:08:36.587)
All right, welcome back. You ready? Screen sharing. Let's do it. Game face.

What's up y'all? Today we have a really fun episode of AI That Works. I'm super stoked. ViBob's gonna give us a master class on systems engineering and architecting streaming systems. We're gonna go through the whiteboards and then we're gonna build end to end a dynamic application that you can use to do fan out and parallel async streaming of summarizing arbitrary webpages. We're gonna push all the code. We're gonna show you how it works. You can take this to go build better UIs, more interesting UXs and push AI to its limits.

This was a super fun conversation. can't wait for you to dig into it. Let's get into it.

Vaibhav (01:09:19.355)
Thank you Dexter, this is gonna be really fun.

Dex (01:09:23.309)
A lot of ums in there, but it's probably good enough. All right, good luck.

Vaibhav (01:09:23.825)
Alright, thank you everyone else for joining and hopefully you had a good time. You guys will see the recording on YouTube next week.
