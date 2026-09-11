Dex (00:00.738)
Well, apparently in trying to get the audio and video working, ViBov has accidentally started the stream. So hello everybody. Welcome to AI that works. Sit tight for a sec. We're going to get into all sorts of fun, agentic back pressure and coding stuff. It's going to be a great time. But I am going to...

put on the imaginary elevator music while we wait for Vi-Bob to, well now he's just gone. He's coming back, y'all hang out, hop in the chat, tell us where you're calling in from or watching in from, and here we go. Are we back?

Vaibhav (00:46.859)
I'm back, sorry, I literally was trying to find a... I'm here to go find a conference room, all the one were taken.

Dex (00:48.174)
Amazing.

Dex (00:55.434)
We are live. Somehow you also launched us live. So we're here. Yeah, no, I did the intro. We're good. I was thinking about not telling you and seeing what you would say when you thought we were off camera, but maybe I'll save that prank for another episode.

Vaibhav (00:57.556)
Okay.

Vaibhav (01:12.895)
I'm sadly more PC on webcams than I am in real life.

Dex (01:19.542)
unfortunately. Well, we'll get it out of you. We'll do one of these episodes. We'll get you really angry at the coding agent and we'll see. We'll see who you really are.

Incredible. I'm going to shoot you really quickly the whiteboard link and I think we're ready to rock. Do you want to do the intro?

Vaibhav (01:42.563)
Cool, let's do it. All right, everyone, welcome back. This is our weekly episode with Dextre and Bye-Bye for AI That Works. I run a company called Boundary, where we make a program language called BAML. Dextre works on an awesome tool called Riptide, by the company named HumanLayer. We've both been in the AI space for a couple years now, and we've been doing some stuff. And the main point of this podcast is just yap about AI things that actually work.

Dex (02:10.112)
Incredible. I couldn't have done it better myself. Today we are talking a couple of quick announcements. So the other episode we've updated kind of the schedule. So every Monday you'll get an email with the YouTube from last week's episode, a little teaser for what's coming next. The other thing that I think is worth shouting out as well as we are locking down a time and place for the in celebration of the 50th episode of AI That Works. We will be doing a little unconference live in San Francisco. So in person.

Mostly off the record, just talks from builders. Everyone who comes is gonna help build the agenda together. No RFP, no speakers, like applications, just show up with something to talk about. So if you're in SF or you're thinking of, want to hang out with other AI that works people, that will be happening.

Vaibhav (02:56.801)
Yeah, you'll be welcome to apply and hopefully we'll get as many people as we can.

Dex (03:02.934)
Yep. Sorry. Give me one sec. Cool. So I think that's it. Let's get into what we're talking about today. So I have a question for you, Vi, Bob. We've talked a lot about your coding agent workflows and your stack. And I wanted to ask you, have you ever had a situation where you got, we do our plans and then we do our research and our planning and our design and all this discussion and figure out what we're going to build?

Vaibhav (03:06.787)
See you then.

Vaibhav (03:11.971)
Let's do it.

Dex (03:32.14)
And at that point, haven't really written much code yet, right? It's just working with Markdown and understanding what's there. Have you ever gotten to the point where you're deep in an implementation and you realize like, I was wrong about something. Like I had some assumption much higher up about how a thing worked and it leaked all the way in and actually now I have to throw out this entire plan because there was some base assumption that was wrong.

Vaibhav (03:54.401)
last night at 2.45 a.m.

Dex (03:58.594)
What was the assumption? Tell me about it. Can you draw it? I'll share my screen.

Vaibhav (04:01.799)
Yeah, okay, that's it. I can do a screenshot. We were just talking about the stand-up today.

Dex (04:06.893)
Okay.

Vaibhav (04:09.187)
You might want to take some fun little screenshots while we do this. So one of the things that we do in BAML is when you write BAML code, we do some really interesting work to make streaming work really, really nicely. And what we do is actually I can just open a cursor window. I'll need a window. we do in BAML is we say something like this. If you call a streaming function, can you see all right there?

Dex (04:39.79)
Yeah, I can see. Maybe go one bigger. Yeah, that's better. Cool.

Vaibhav (04:45.026)
Resume equals b.extractResume. Let's say you put in some resume over there, and then you do a stream. And then you do forChunk and Resume, you do chunk.email, for example. Email is going to be optional automatically. But then if you went here and typed in stream.done or stream.notNull, this becomes a string.

So we actually generate two different types of subs here. And this gets.

Dex (05:16.814)
Right, you have the partial type and then the full type, right?

Vaibhav (05:19.336)
Exactly. But it gets even more complicated. like, let's, and I'll show you the example in a second. Let's say you have a foo string and you have a type bar equals string or string or int or foo or string. When you do this over here, this should still be a string type, even though it's like mapped through like multiple aliases. So there's a lot of simplification and weird things that we have to do to make this work nicely. And

Dex (05:46.67)
collapsing the tree into the types in whatever native language that you're generating the stubs for.

Vaibhav (05:51.618)
Exactly. And we have to do it in the streaming type system and the non-streaming type system to make it work perfectly. And this gets even hairier once you have classes with nested classes with nested aliases and recursive types and everything there. So I had an assumption there that was baked wrong in the new work that we've been doing, how to make it nicer and more ergonomic for developers to be able to modify better. And I just had to completely throw that out.

in terms of our implementation detail. can talk about the actual implementation, that's interesting, but this is like the core problem because we have three types. We have a type system during streaming. We have a type system that the compiler reads, and then we have a type system during non-streaming modes. And we have to build algorithms for all three. And that's architecturally wrong that we have to implement almost the same algorithm three times.

Dex (06:29.783)
Okay.

Dex (06:37.612)
And the by algorithm, mean the thing that reads in raw, like token streaming out of the model and decides how to translate that into a like full or partial structured object.

Vaibhav (06:45.378)
No, no, like it takes a type that the user wrote and generates an equivalent type in any language of your choice. That's perfectly matched and ergonomic based on what the code that you wrote here, the type simplification algorithm in the compiler.

Dex (06:59.438)
Cool, so can you, would you be able to riff out kind of code, I wanna see two types of code basically. One of them is like, here's my assumption. Can you write code that shows that your assumption is false basically? Here's my assumption and here's an assert that would, you know what I mean?

Vaibhav (07:09.324)
Yeah.

Vaibhav (07:17.58)
I don't know if I can do that for this problem because this is more of a design problem. The design problem here from a whiteboard perspective is that I end up having a class called type, then I end up having a class called non-streaming type, then I end up having a class called streaming type. And if you know Rust code, they're not actually classes. It's like an enum. Yeah, exactly. I have an enum called string.

Dex (07:40.846)
Okay, this is pseudo code for Rust. Okay.

Vaibhav (07:46.646)
that has like a string type and they have all of these. And like in non-streaming, we have almost exactly the same exact thing, but there's some slight differences that exist in streaming versus non-streaming. then similarly over here, there's some slight differences. And I have basically the same thing implemented three times, but they all have totally different semantics. And that's what's crazy about this. So it's like a design philosophy.

Dex (08:05.762)
Yep.

Dex (08:09.602)
Right, and it's like in certain places, in certain places downstream, even though the field names are the same, they're different structs, and so you have to have like a switch statement for every single one and like have like tag unions for the thing. Okay.

Vaibhav (08:18.302)
Exactly, Yeah, so it's an, so it's exactly a design philosophy. That's kind of wrong in a current.

Dex (08:29.198)
Cool, that's great. Yeah, I had a similar thing recently where we were building some stuff on top of the Claude agent SDK. And basically like here I can share. I'll share the whiteboard tab.

And I'm just going to share this tab. So when I go start talking about other things and I forget to share my whole screen, just shout at me. so essentially, you know, you have, the way the cloud agent SDK works is you have this like TypeScript SDK and you have a method called query. And this thing takes in a giant options blob for how you can configure Claude. And then what happens under the hood is it actually like invokes the Claude CLI.

Vaibhav (08:49.09)
guess.

Vaibhav (09:07.531)
yeah.

Dex (09:13.774)
And it translates all of these options into some types of like flags basically. So if you say like, you like if you, if you put in here, you know, let's do exactly that was the, so yes, you have like permissions mode, bypass permissions. This changes into a flag, is dangerously skip permissions. So it kind of just like,

Vaibhav (09:20.266)
Okay.

Vaibhav (09:25.098)
allowed dangerous permissions and it just says it's allowed. Yeah, it makes sense. Yeah.

Vaibhav (09:40.672)
Exactly.

Dex (09:42.508)
written a wrapper on the CLI that allows you to call it from your TypeScript code, right? So this is very simple example. Sorry, go ahead.

Vaibhav (09:48.085)
Okay.

No, go ahead.

Dex (09:53.126)
and there was other, there's so, so this is like the, basic example. What we wanted to do is we wanted to basically like experiment. wanted to like run something where it's like, cause this also had allowed tools and,

disallowed tools. And so like you can put in a list here of like, you know, write bash, edit, whatever it is, or you can say, you know, we want to disable task is what the tool for sub agents is called, or you might want to disallow like, I don't know what's another thing, notebook edit, which is the Jupiter notebook thing. And we're like, we know we're not touching Jupiter notebooks.

The thing is, we had some assumptions about the behaviors of these things, and we got deep into this implementation, and we found out that actually what allowed tools does is, and this is like, we're talking about the Cloud Agent SDK. That is just an example. We're gonna go little bit, zoom out a little bit more of how you can use this for any API, but the idea here is most of the code here is a system we don't control, and we can't read the code.

Vaibhav (11:00.457)
Valid.

Dex (11:00.95)
And so the standard workflow of like research, plan, implement, yeah. Like this relies on like, we can get all of the knowledge we need to correctly build this feature by reading the code.

Dex (11:20.75)
understand how the system works. The thing is, is like if you have your code repo, right, and then you have, you you have all your modules, et cetera, but then if you're using like an SDK like this where you have like external dependencies, some of these things like in, if it's in node modules, right, you can also go ripgrep through the source code of those things and you can research that.

But if those things reference a external API, maybe a closed source API, or a closed source binary, basically anything where you can't read the source of it, then your research actually is just gonna assume how that thing works. Okay, so let's assume you're doing this. What's your first step that you would take to, let's say you were working on the Cloud Agent SDK.

How would you try to get better understanding of how that thing works?

Vaibhav (12:18.613)
just run it with a bunch of parameters or like dash dash help or other things.

Dex (12:23.278)
Yeah, okay. That's pretty good. Another thing we do is, oh, let me see. I remember, we're gonna go back to sharing the entire screen.

Vaibhav (12:33.141)
Always share the whole screen and leak your API keys when possible.

Dex (12:36.916)
I love leaking my API keys, dude. I live for this shit. Why do you think we have a podcast? So you could go to the Claude docs and you could pull in the reference, right? And these docs are pretty good. They're very comprehensive. They tell you every parameter, everything you can pass in, all of these things. There's like hook types, all the... Yeah, so you could go read the docs, right? So you can, and I actually have done this in our episode folder.

Vaibhav (12:55.571)
yep, that's even better than what I was doing.

Dex (13:07.118)
Let's see.

Dex (13:11.022)
oops.

Dex (13:16.47)
And so like I grabbed the docs and I just dropped them in here. You can also use web search. You can use context seven. There's lots of different ways. So like that step number one is like pull in the docs.

Dex (13:30.252)
But that generally, in my opinion, is not good enough because it's easy to read the docs and misread them. They're very long. It's a lot of context. Like, like subtle things can be missed. And so what we do is exactly what you said, which is we'll actually build what I call a learning test. And this is kind of the core of the episode is basically like, I want to understand how these fields actually work. The best way to do that is you would create a, what we call learning test. And this was invented. I forget who mentioned this first.

Vaibhav (13:59.841)
Thank

Dex (14:00.312)
Learning test software, the problem is that this phrase has terrible SEO, because this is just tests for assessing students, yeah?

Vaibhav (14:05.473)
I'm I will say, I'm sorry that I stole the thunder and just set it up front. I didn't realize that's you were getting at. I should just let you build up to it.

Dex (14:13.742)
That's okay. learning tests.

Vaibhav (14:22.464)
Yeah, but the premise is like...

Dex (14:23.406)
was Michael, yeah, Michael Feathers, here we go, yes. So it was in this thing of working effectively with legacy code. He talks about this of just like systems that are hard to understand, maybe you just jump in and poke them from the outside.

Vaibhav (14:32.501)
This is.

Vaibhav (14:40.576)
Yeah, most people I know that work on really complex algorithm design problems. The way that you explore an algorithm space that you... When you're updating algorithms that you don't know, for example, this is the only way to go do it. If you're doing, for example, a really easy analogous system to this, is performance engineering, if you're ever trying to reduce the amount of assembly code that you generate, you don't actually... You don't model the assembly. You literally write the code, you look at the assembly that gets generated, and you're like, cool.

this is the slot I want to reduce. Then you experiment, you see if you reduced it. And that's like the way that you do this. There's different techniques beyond just like reducing the amount of assembly code and that doesn't always make you code faster. Like reducing, that's an easy, performance engineering is basically learning fast all the time.

Dex (15:11.97)
Yeah.

Dex (15:23.266)
Yeah, so you could read the compiler code or you could just write a program, compile it, look at the output. This is basically like the thing we all learn, the very first thing we do when we learn to code is we write the hello world is like, okay, let me just do this thing and now I see by example, this is how it works.

Vaibhav (15:28.991)
Exactly.

Vaibhav (15:42.003)
It's also why print debugging has overtaken like GDB debugging and debugger based debugging. It's because like, it's just a learning test. That's what you're doing.

Dex (15:46.584)
haha

Dex (15:50.722)
So yes, so what we're gonna talk about today is like how to formalize it and some ways that we've used it and we have some code examples of like how you can apply these techniques to basically in your research pipeline. The first thing we add of course is like read the code. The second thing we add is also you know read external docs, blog posts, et cetera. Like if someone else has figured out how to glue a bunch of systems together in a way that works, then we should pull that into our research doc as well and into our planning.

And then the last one is actually as part of research, it's write learning tests. So we're not writing code to ship a feature, we're writing code to like, some people also call this like proof-based development, where it's like we're proving the system works in the way that we think it does, rather than like, instead of, if we didn't do this, we would just carry some assumptions through.

So the assumption lands in the research based on either what we read in the docs or just what is baked into the model weights. That makes it into the plan. That makes it into our implementation. then like, you know, we do phase one and everything's working and then we do phase two and then everything's working. And then in phase three, we actually hit this thing that like, our assumption was actually wrong.

And then we literally have to go and redo all of the work, all of the implementation, all the planning, all the research, because we learned something. And our idea with AI coding is always about like leverage, right? We have this thing that we've been posting. If you go all the way back to,

AI that works the like August 5th one, right? Advanced context engineering for coding agents. This thing of like, focus on the highest leverage parts of your pipeline. What you don't want to do is like be, you know, hundreds of thousands of, or like, know, thousands of lines into your implementation and suddenly find yourself in a spot where like, something was wrong and it invalidates everything before and we have to go back.

Vaibhav (17:28.852)
I am.

Dex (17:50.796)
And so when we write these learning-based proof tests, it lets us vet our assumptions before we proceed into what we're gonna change about the system. Does that make sense?

Vaibhav (17:59.904)
think especially for algorithm design stuff or new feature stuff, this is an easy way to do this. But I'm going to make one pushback that I'm always curious about in these scenarios. This just sounds like it's one of the tools. Because obviously, if you're doing something super complex, like for example, the type system work that I was doing, there's no learning test I can do there. That just requires design. But it sounds like for implementations, there's a lot of learning tests that you can do. And before you implement, you might benefit.

Dex (18:10.52)
Yeah.

Vaibhav (18:28.156)
especially when you're implementing against a black box, you might actually like, you know, it's funny. The best learning test is actually like when you're calling the LLM, when you call an LLM, the only way to evaluate.

Dex (18:28.258)
Yes.

Dex (18:38.974)
EVALs are a form of learning tests. Actually, like the way the boundary playground works is it enables you to do learn. Like if I put this prompt in, how will the LLM behave and to riff back and forth before you actually go stitch all of that into your code.

Is that where you're at?

Vaibhav (18:57.884)
Exactly. cause you, like that's how you kind of build a learning test from this. And as we've gotten, as we've gotten there, one thing that we found that's interesting, I think, is this idea of how do you, like these models have gotten better. So all of us have done less work to do learning tests for simpler problems. We just kind of assume that they work when you call an LLM, but for more complex problems, you still want learning tests. I really like the framing there. That's a, that's a really nice,

I've done this a few times whenever I've, what's it called? This is how I've modeled most systems I've worked in because of the algorithm work that I did. But yeah, exactly. That's a learning test when you go actually press play. I don't think you the API. You might not have the API key, but...

Dex (19:43.863)
Yeah, yeah, you get the idea. haven't, this is new laptop, so I just had to install BAML for the first time on my VS code, because I haven't used VS code or cursor in a while. Yeah. So I use Zed because I'm almost always just using an editor to read and write Markdown files, and their Markdown viewer is pretty nice, and it's really fast. So I can quit this. If I open Zed, it's open instantly. It's so fast.

Vaibhav (19:54.184)
Really? You've moved on to Zed?

Vaibhav (20:02.996)
Okay, yeah, it's better.

Vaibhav (20:11.338)
Yeah, yeah, yeah, I know, I know. Okay, I agree.

Dex (20:14.05)
And you're going to tell me that it's because it's built in Rust, right? Of course. Yeah. Anyways, coming back to this. So I guess what you're saying is that the issue you hit, which was a design kind of misconception, was not actually a good example of what we're going to talk about today. Okay.

Vaibhav (20:17.256)
All things built in Blast are fantastic. I'm trying to, yeah.

Vaibhav (20:30.816)
Yeah, exactly. Exactly. And there's a class of problems there, but there's a large, large, large class of problems where learning tests are the best way to really iterate.

Dex (20:39.116)
Yep, so I'm gonna pop open to like going a little bit deeper on this specific example that we were looking at. Here's like a very basic learning test. It's barely even a learning test, right? It's just a Hello World script. Like Hello World is the most generic version of a learning test, which is like, I'm gonna run this code and see how it works. And so I'm telling it like read the meta MD and tell me what's there.

and then console log all the messages. So this is letting me see the structure of the output and what are the messages that come out from the Cloud SDK when I run it, et cetera.

Let's do this.

Vaibhav (21:17.375)
So I'm going to ask some interesting questions here, Dexter, or at least the question that I find interesting, at the very least. So this sounds like a thing that think a lot of developers probably do very naturally. How do I answer

Dex (21:21.207)
Yeah.

Dex (21:29.588)
It's especially before AI, it was a very normal thing to be like, I'm using a system I don't understand, whether it's a new library or another or a new database or whatever it is. Like we used to do this all the time. And it was the idea, like the idea of learning to, sorry, finish your thought. I'm gonna draw something.

Vaibhav (21:38.289)
Exactly. You just run the code.

Vaibhav (21:46.761)
Well, while you could draw that, like the real question I really have is like, I think most developers do this intuitively. Like when you use the new API, you often curl it first, just be like, what the heck does it return? And like, that's a learning test. So I suspect that that concept isn't new. Tell me how I amplified this and tell me why, like I see cloud code doing this sometimes as well. Like it often will actually naturally do it.

Dex (22:08.19)
Claude code ends up doing it in the end where it's like, that didn't work the way I think it did. I'm sitting in a pile of get diffs. How do I try to re-steer out of this situation? You could ask it, hey, go figure out how this thing works and write a doc about it. And that's kind what we're going to get into is how do you get Claude code to help you do this stuff? But the idea with learning tests is if you want to, the really basic example is you have a new logging.

Vaibhav (22:28.604)
Okay.

Dex (22:37.314)
and you wanna see how the logger works, right? And so you write a little file and you test, what does logger.info do? What does logger.setLevel do, et cetera? If you just wanted to understand how this library works, and you have your code, which is public main, whatever, and then you have your test, which is public test, abc, and this is like.

Vaibhav (22:37.982)
Yeah. Sure. Yeah.

Vaibhav (22:48.222)
Mm-hmm.

Yep, makes sense.

Dex (23:04.3)
what you're supposed to use test for is like you write app code and then you write unit tests and like as you change the code, you make sure the test don't pass, it still passed. What you're not supposed to do is actually test external code because like the library maintainers are testing that code for you. Like you should not maintain a bunch of unit tests for external libraries, but unit test frameworks are kind of nice because you can say, you you can attach something to standard out and then you can assert like,

Vaibhav (23:11.186)
Yep.

Vaibhav (23:24.893)
Yeah, I agree.

Dex (23:33.954)
that a thing was printed.

Vaibhav (23:36.543)
Okay.

Dex (23:37.934)
to standard out or a file or whatever. You wouldn't run these all the time, but you have a little bit of a demonstration. So when you want to write code with this library, the model can go read this really useful. you know, before it was like humans would use this as a reference to like, okay, now I know how to apply this in my app code. But it also means that we've actually hit this before is like, we had this thing of like public and I'll show you that we actually have this test in the code, but it was like test. It was like how Claude SDK session continuation.

And it was basically like if you resume a session, there was a behavior where the session would always get a new ID, not equals prev session.id. And then they changed this behavior. And so what you get with this, with a set of learning tests, you don't run all the time. The same with your evals. You don't run your evals on every CI CD loop, right?

Vaibhav (24:36.232)
Yeah.

Dex (24:36.398)
but you can go run them manually or you can run specific evals if you have a feeling about what's wrong. If you think the contract with your external library has changed, which is a thing, but from Cloud SDK 1 to Cloud SDK 2, they changed the default behavior where now you have to pass in this fork session equals true. And so you have a literally like a documented list. We have probably a hundred of these now that.

we have documented our contract with the external things that we don't control. And then when we pull in a new version, all we have to do is rerun the learning tests and we know if something broke. And like, it's not 100 % coverage, but every time a contract with our external system breaks, we had another learning test. And so you wouldn't do this for every single library you use, but if you have a library that likes to change APIs sometimes, then this can be a really valuable way of like,

Vaibhav (25:23.442)
sure.

Vaibhav (25:27.634)
in there.

Dex (25:28.684)
Let me verify, like if I think it wasn't our code that broke, it's something changed over there. You have a documented thing and I'll get into like, some of these are quite, yeah.

Vaibhav (25:35.731)
Yeah. And what's really interesting over here is actually a second thing. What you're really specifically doing is it's not just a library, because it's a library. You get types, you get everything else around there that are kind of deterministic that help constrain a lot of this. In your case, you're calling a CLI command, which has no type service.

Dex (25:52.888)
calling a CLI or like I've used this with some teams who are trying to use the open AI responses API and like there's different ways you can call it that cause it to like preserve or remove the thinking tokens from previous conversations. So it's really for like poking black boxes that you don't control or that it's very inconvenient for you to go actually look at the internals.

Vaibhav (26:02.609)
Exactly.

Vaibhav (26:10.845)
Exactly.

Vaibhav (26:14.931)
Makes sense. Yeah, it's like you're treating something like a probabilistic system. It has some probability of producing something and consumes some various kinds of inputs. So you're trying to constrain the probabilities.

Dex (26:24.438)
Exactly. Yeah. So we can go from this basic hello world to like a slightly more interesting one. This is still not in a test harness, but we can improve the like printing and writing. And so we can do, you know, bun run OB. And this is going to give me a little bit nicer output of like me as an engineer trying to see, okay, how does this thing behave when I ask it to do certain things? Right. Okay. So this one was just say hello.

And then we can start doing like checks and like evaluations about it, right? So we tell it to say, hello, we're still streaming out all the messages. And then we're actually like outputting some like Boolean flags about like, is this true? Is that true? Like, did we get a session ID out? And starting to like basically like articulate the behavior of this system for whom, for which we cannot read the code. And then.

Vaibhav (27:15.219)
Yeah.

Yeah, think to summarize, think what I'm hearing is you're trying to write unit tests for external fuzzy libraries.

Dex (27:26.008)
external fuzzy libraries. And so like, this is where you go from like, hello world to a little bit more sophisticated. And eventually what we would, if you do this for a while, you end up just putting this into the unit test framework of your language. And so here's like, what does query emit and in what order? And so now we have not just logs, but we have assertions about this. And so if they change the ordering of messages or add a new message, like this test will then start to fail. Sorry, this has to

Vaibhav (27:36.539)
Exactly.

Vaibhav (27:51.164)
Yep. So what's really interesting here is I've seen tests like this before at a couple of places that I've worked. So like, for example, we had a large network dependency on like some external finance system at my previous employer. And in that scenario, like

Dex (28:05.356)
Yep. Yep. That was, yeah, I worked in FinTech too, dude. We had like a soap API that ran like over a telnet server. It was crazy.

Vaibhav (28:12.474)
Exactly. And when you run into this problem, really, it's not that like I think the common place where people have already done this, because I think there's a large place where people in their code bases do this today already, is like database setup. If you're ever trying to hit a database, don't want your database tests are notoriously flaky, especially like large scale systems. And because they're flaky, you'll often write a pre check that says, hey, if the database setup failed, just skip all these tests to run or fail, depending on what company you're at. And

Dex (28:23.596)
Yeah.

Dex (28:31.672)
Yep.

Dex (28:40.419)
Yep.

Vaibhav (28:41.343)
That's basically kind of something similar. Where you have an external dependency, it's kind of fuzzy and you want to have some known constraints and known goodness behavior before you start running the rest of your test cases. Because if those fail, then some assumptions that you made about the external system are just bad. There's this really funny interview question, I think, that I remember from a really long time ago, which is like, you have a black box API that takes like 25 minutes to run. How do you make it faster?

Dex (29:07.458)
Yeah.

Vaibhav (29:07.802)
And it's very similar. And they give you no other information. don't tell you what the API is, what it inputs, what it outputs. You just have an API that's undefined, and you have to go explore it. And that's, I think, a very similar kind of problem. You have to apply a penetration testing approach to understand the parameters.

Dex (29:22.572)
Again, yeah, it's big in security of like, okay, what protocols does it support? What are the inputs and outputs? How does it behave under certain? call it, yeah, we can call this also like fuzz testing, right? Where you just test the full range of inputs to see what breaks.

Vaibhav (29:28.251)
Exactly.

Vaibhav (29:36.796)
Yeah, exactly. So there's so many different ways to do this. It sounds like a really useful thing. Now, the question I have for you is, I think the hardest part about the system isn't actually implementing this because once you come up with a design, I'm sure you can just have cloud code ripped through tests and they'll just write a bunch of tests for you. But if you scroll down,

Dex (29:51.532)
Yeah. Yeah.

Vaibhav (29:54.526)
to the error diagram. The hardest part is making sure that you somehow do it earlier rather than later, but the trade-off that I often run with this is if I do it earlier then I'm wasting time and if I could have one-shot it I feel like I'm like, fuck, I should have just one-shot it.

Dex (29:57.644)
Yeah, this one.

Dex (30:02.199)
Exactly.

Dex (30:09.986)
But it's, dude, it's so fast. So I'm actually gonna live demo something. There's a new TypeScript SDK interface that is like a different way of sending and continuing messages. This is straight from their docs that I just, this is like pretty new. I just noticed this for the first time last night, but they have this new API for sending messages with this unstable thing. And I wanna go try this in my product. And so what I'm gonna do is I'm gonna pop open Claude in this AI That Works repo. Actually we'll do it in the episode.

Vaibhav (30:14.717)
Okay.

Dex (30:42.466)
like read the V2 docs and the existing learning tests and create a learning test that demonstrates how to use the new Stream Send API and document its behavior in various circumstances. And so literally, I just say this to Claude and Claude is gonna read, as long as you have a couple of these for it to read for examples and we'll push these up so you can use the, mean, these are for the Claude Agent SDK, but I also have one for like how does the node child process API work? Cause I think that's an interesting one.

There was an HMAC verification one of like how does the node crypto library work when like the lengths don't match and stuff like this But you basically log out some stuff and then you have assertions about like how this thing behaves so that if it changes you'll know But yeah, so what this is gonna do is literally gonna go read these v2 docs and generate for me a learning test and it's probably gonna make a learning test where these some of the initial assumptions are wrong like here's another one that we had a while ago where it's like

we think that allowed tools is a white list and this is the only tools that are allowed. And then when we run it, we actually see that like, we actually are gonna see that like this assertion fails. But what's nice is like Claude is giving, this is we talked about in the Ralph Wigum episode, we talked about back pressure and I think it's in the, I think it's actually, there's a picture in the notes.

I'll find the picture, let's see. SiteGhuntley.com.

pressure.

Dex (32:19.95)
Let's see. He linked to a previous post. Yeah, here we go. No, this is Moss. Actually, this is an interesting one too. This is a post about like, basically like, if you use human feedback for the whole thing, then like basically you can like get feedback from the compiler based on your task complexity and you can solve parts of it. And then you can get feedback from the type system and then you can get feedback from like MCP servers or Playwright or Unit Tasks.

And then you could get feedback from basically like you're reducing the amount of time you, the human have to spend. Yeah. So it's like, how do you, how do you automate different parts of the back pressure? And then it's like, how do you do it during the planning instead of during implementation?

Vaibhav (32:55.755)
yeah, exactly. Yeah, exactly. Yes.

Vaibhav (33:06.139)
But I think the hardest part still, and I think this is probably still what distinguishes the goats of software engineering from the not as goats, which is just like, you just have really good intuition for when to apply when. Because if you apply everything everywhere, you will just be the slowest engineer in the world. That's the hardest part, right? Because like, yes.

Dex (33:14.359)
Okay.

Dex (33:18.328)
Yeah.

Dex (33:22.466)
That's true, yes. And the only way you learn that is through reps. You learn, I did too much. I think of this, there's this idea in, I think it was in a blog post about maybe, about executive coaching or something, but let's say there's some spectrum of behavior.

Dex (33:44.214)
And like, this could be like, too much planning, and this is like, not enough planning.

Dex (33:53.272)
But this could just as easily be like too extroverted, too introverted. This is like true for anything that you wanna learn as an engineer.

Vaibhav (34:02.469)
yeah, exactly. It just vibes.

Dex (34:06.03)
Well, so the idea is like, let's say you're over here, right? And then you try to get better and you end up over here. And you try to get better and you end up over here. And like the ideal range is somewhere in here. Or whatever it is. Huh?

Vaibhav (34:06.32)
Really, we've got

Vaibhav (34:19.069)
I don't know if there's an ideal range. I don't know if there's an absolute range. think it's very problem and scenario specific.

Dex (34:28.046)
Sure, let's say this is ideal range relative to the problem. How good are you at picking the right amount of planning to do based on a problem? And the idea is basically if you do this, rather than just trying to make incremental progress, you'll get there way faster if you what we call make the other mistake. So go way far to the other side and then come way back over here and you're binary searching around. And so the idea is sometimes you should do what feels like too much.

Vaibhav (34:34.693)
Yeah, exactly.

Dex (34:56.256)
and sometimes you should do with feels like way not enough and you'll bounce back and forth and you'll get to the ideal range a lot faster than just trying to increment toward whatever you want to be. And this is true of lots of things in life. It's about developing instinct, right?

Vaibhav (35:09.501)
Yeah, exactly. And I think like most people, honestly, that's why I think, well, to be honest, though, I think that's why most people suck at AI coding. It's because like most people, like don't, it's not that they're over here. It's actually, it's, because they don't know how to select for the right slides for the right problem. Like they, they, they're, they're too constant with their technique. The thing about agentic systems is you actually have to be really very addict with the way that you code this problem. I use this technique, this problem. I use this technique.

Dex (35:11.17)
A little philosophical there, but.

Dex (35:18.542)
they're over here.

Vaibhav (35:38.663)
Whereas in software, when you're human typing, you can almost always be using the same technique and it doesn't hurt your productivity. But with agentic coding, you have to constantly evaluate and be like, well, okay, well, would I be actually be faster if I threw away all my work and started from zero again, because this assumption is wrong. And very, very few people are.

Dex (35:57.73)
Yep. And like, depending on the problem or even like the day of the week, this range shifts around based on like what, what models, new models, new problems, new types of things. And so you're like, you're not just developing one set of instincts. You're developing a set of instincts that are kind of like spread across many dimensions. It's not, it's not actually two dimensional. It's like a 10 dimensional space.

Vaibhav (36:06.461)
Exactly.

Vaibhav (36:15.101)
Exactly.

Vaibhav (36:22.033)
Yeah, this is why I think most people suck though, because it's like given a problem space, you got to pick your thing. And what you do in that scenario, and most people suck, is you actually give guidelines. You say, hey, for 80 % of people, we should always do the same process in this workflow. That's why processes exist. Because when you give a specific process, you're much, much happier, and you end up in the good zone way better.

way more likely than if you're exploring yourself and exploration isn't your skill set. So like for people that are like managing people, my advice to them is like really, and your team is really not getting the grok of AI, that's probably because they don't have the brain cycles because they're so stressed about finishing the workload.

Dex (37:06.734)
They're being asked to do their jobs and also learn a completely new thing.

Vaibhav (37:09.052)
Exactly. It's too much. And it's too much. like, let's be real, jobs are jobs. And like, I get why people feel that way. I love my job, but I understand why some people don't want to like learn with like 120 % cognitive load every single day of the week until their max performance again. On the other hand, like with the back pressure thing that you talked about, like that's another technique that gives you like, if it's, if you're one of those people that is down to learn, that's like most people attending here are. If you go back to that diagram, that's that the previous diagram.

and the whiteboard. That technique that you described is a thing that pulls you more into too much planning. And that's fine, especially when you identify it's like, hey, this is a type of problem that needs more planning. And if I do this planning upfront, I'll actually move faster longterm.

Dex (37:40.632)
Yeah, this one.

Dex (37:55.5)
Yeah, and so I encourage people to like, if something feels like too small, like skip all the planning and just see if you can vibe it out. And if it works, then like now you've developed instinct of like, okay, for a problem that looks like this, I can just vibe it. And then for another one, it's like, cool, try to vibe it again. And then you're like, okay, that was a disaster and I wasted two hours shouting at Claude. I guess next time I see a problem that looks like that, I should probably like do a little more planning, do a little more research and make sure we follow the patterns.

Vaibhav (38:03.579)
Yeah.

Vaibhav (38:20.028)
Yeah, think this is that that instinct though is fundamentally the the what I call like the the difference between goats and non goats is they just the goats just have a way better instinct and then they what that also means is that they're exploring techniques like the one that you're talking about all the time like they're just discovering

Dex (38:38.2)
This is the Jeff Huntley picture, by the way, is basically like you have to generate back pressure. You have to generate this loop of like you have your specs and then you go and build it and you test it and then you update the specs as you go. And I actually want to jump in. I know we're getting tight on time. So I want to see kind of what I asked it to read the docs and write a test. And it looks like it wrote this test. What I'm curious is if it ran the tests and then saw things failed.

Vaibhav (39:03.204)
it did run the test and all seven tests passed on the first scrap because it obviously probably read the docs and the docs were pretty good.

Dex (39:10.968)
Well, so it wrote this and it actually wrote like key findings at the top about the behavior. And then it ran them and it saw the output and then it updated the findings that explained how things work. And so you see, okay, they all, they all pass, but it's looking at the output and it came in here and it actually updated the yeah. yeah, I was saying like unstable it's a different one event stream shape matches V1 system and it assistant results success. But it throws before the first stream.

Vaibhav (39:21.886)
it did it.

Dex (39:40.914)
Yeah, so it found some things about how the errors behave. So it did, it basically wrote the test, ran the code, and then updated its findings. Yeah. So this is the kind of thing you can do. As you can say, like, cool, I have the docs. Sorry, go ahead.

Vaibhav (39:46.374)
That's cool. That's cool. And now this basically becomes like really this big.

this basically becomes like a really shortcut for research. Like now it's like if you want to go.

Dex (39:56.524)
It's a very shortcut for research where you don't own the code and you can't get it. You can do something like this. You can just be like, cool, here's how I think it works. Or here's how you think it works. Go prove it. And then we won't proceed to implementation or planning or anything until we verify that this thing behaves for the parts of it that we care about, the surface area that we care about. We're not gonna proceed to implementation until we verify that it works the way we think it does.

Vaibhav (40:19.1)
Joshi's got a question. How do you define back pressure?

Dex (40:22.476)
Yep. So back pressure is exactly this, is you give the model a way to fix its own mistakes. whether it's unit test, like whether you have a hundred unit tests and then the model makes changes, then it runs the test and it's like, I broke something over there. You basically want to like reduce it's, it's a feedback loop for the AI. So it's like, rather than you having to check and read every line of code or click around a web app, it's like,

Vaibhav (40:40.07)
It's a feedback loop.

Dex (40:49.838)
Cool, if the compiler can find errors and tell the model, then the model can fix it before you even look at it. It's gonna sit there and run the test and it'll enter over and over again until the compiler passes and then you just check everything else. And then if you can give it a type system, then it can run the compiler and then it can run the type check. I probably would run the type checks first for most things. But then it's like, cool, I don't have to check that the types are wrong. The model can get feedback that it's done something wrong without you having to spend time doing it.

And so the more layers of automated ways that the model can run a CLI and get feedback or run an MCP and look at it in a browser and take a screenshot and look at how it looks, the less you have to be in the loop and the more you can have confidence that you're only reviewing the most important.

Vaibhav (41:32.636)
Exactly.

Dex (41:33.88)
Good question.

Vaibhav (41:36.26)
Any more questions from anyone in audience? We've been yapping for a while. If you guys have questions, feel free to chime them in the Riverside chat and we'll go ahead there.

Dex (41:44.81)
So ViBob demoed a diagram that the BAML team uses. It's an example of back pressure. And actually there was another thing I was going to talk about, which I don't think we'll have time for, but is like, how do you optimize for human back pressure? Because there's another thing we do. Maybe this will be its own episode, but like one of the hard things for like planning with AI is like front end. Like AI is not good at like, I mean, it can make good front end, but you have to like vibe back and forth with it.

Vaibhav (41:57.414)
content.

Vaibhav (42:10.78)
This is for context, for everyone asking, like, this is the diagram we talked about. And like, what we do is we basically have a dependency matrix of every single part of our code base that gets auto-generated from the code base that shows us exactly what's happening. So then we can find bugs really, really easily. And like, it's not just for human.

Dex (42:26.518)
In this case, this is human back pressure, but you don't have to read the code to see that a boundary was broken. You're creating a way that takes the load off of the human in terms of trying to figure out if the model has broken any of our kind of expectations or rules about how these systems should fit together.

Vaibhav (42:32.741)
Exactly.

Vaibhav (42:42.657)
Exactly. Like for example, the bridge CFFI takes a dependency on compiler emits and that is bad. It should not do that. Green arrows should not come into this arrow. So that's a bad dependency and we need to fix that. And like we flag that because.

Dex (42:54.574)
Okay, so someone made some code and then you generated this diagram and then you looked at it. And now that's gonna help you prompt the model on like how to do this.

Vaibhav (42:59.599)
Yeah, and then we're just like, okay.

Vaibhav (43:03.833)
Well, actually, what I'm really going to do is that I'm going to add a restriction here into this file that says, Hey, bridge CFFI cannot import from like, will ban imports from this. like, for example, I have, what is this? Anyhow, I'll just talk cloud. I'm basically going to talk cloud code to just say, it's just not allowed to do this.

Dex (43:10.772)
I see.

Dex (43:26.348)
No, but this is related to someone asked, have you guys experimented with LLM as judge for back pressure? And I think it's like, this is a really important nuance here is LLM as judge is useful in certain cases, but I think it's often over applied where you have the builder and the manager and they talk to each other and the manager gives feedback. It's like, they're both using the same freaking model.

Like, yeah, maybe they're using different prompts and stuff, but you could just put the instructions from the manager into the builder prompt. The idea with real good back pressure is it's deterministic. Like a model can read code and say, hey, like this is good. You're like, hey, is this code great? And the model will read the code and be like, yep, it's good. It's comprehensive, got unit tests. You can ask the same model, same system prompt, but you ask like, hey, what's wrong with this code? And it will go find 10 things that are wrong with the code. And so like you can accidentally steer a model.

Vaibhav (43:55.855)
Yeah, exactly.

Vaibhav (44:16.772)
Exactly.

Dex (44:19.906)
you cannot accidentally steer a type checker. And so if you can give the model access to a tool that draws deterministic, like there's no opinions, there's no non-determinism in it, it's either right or wrong, and then give the model the feedback about why it gives the model a way to check its own work without having to rely on its decision-making, which is like, we all know models make bad decisions sometimes. They ship slop code, they do things wrong, they are constantly hallucinating. Yeah.

Vaibhav (44:28.379)
Exactly.

Vaibhav (44:43.323)
And just like humans, by the way, it's not just a model problem. It's a code problem. Code, will make... Exactly. If you're writing code, you will sometimes make incorrect assumptions. In this case, Cloud Code wrote the file and just allowed Bridge CF5 to import from Bama Compiler. It should not. This should be removed. Exactly. And this is just...

Dex (44:48.11)
This is when humans created this for humans. We wanted back pressure.

Dex (45:03.608)
the model changed the stow tunnel. You should put in a hook that makes it so that it can't edit that file.

Vaibhav (45:10.843)
Sometimes it needs to, so it's not as trivial as that. What we should have done is we should have a code review process that requires us to code review this file specifically. And that was how we actually solved this problem. Or we put a rule in our AI coding checkers and our PR that say, if this file changes, this file should not really change unless it really, really, really, really has to. But most things are probably bad changes.

Dex (45:12.952)
Sometime, okay. Okay.

Dex (45:20.45)
Yep. Yep.

Dex (45:39.926)
Yup. Yup. This is, mean, this is the high leverage thing, right? It's like, you don't generally want to automate the checking of this file. You don't generally want to automate the review of this file because if something here is incorrect, you have now opened the floodgates for hundreds and hundreds of errors or like incorrect decisions to leak into your code base.

Vaibhav (45:41.081)
And like, that's how we also catch this bug. Exactly.

Vaibhav (45:47.823)
Exactly.

Vaibhav (45:57.979)
Exactly. So then what we do instead is we have this file, this is small, we look at this image, we find this assumption, well, and then we also realize the file is wrong. And literally what I would tell Cloud Code is I would just, yes.

Dex (46:07.438)
It's like two-pass accounting, right? It's like you review the file, but if you might have missed this, I mean, I just saw you, spent five minutes trying to find where this issue was, or a couple of minutes trying to find where this issue was, but you also make it visual, so you're checking it in two different ways.

Vaibhav (46:15.811)
Exactly.

Vaibhav (46:20.507)
So what I would really do here is I'm just going to go to all cursor to just say remove this. And that's how I'm going to do this. And it will figure out whatever it needs to do to make the dependencies not be true here. And then this will just work.

Dex (46:31.864)
Cool. I think that's time. Happy to hang for questions. I know we got started a little late. RM wants to know how you're creating the architecture diagrams automatically.

Vaibhav (46:43.867)
There's a tool in our code base called Cargosto that we built that does this. And this is another thing about these things. Dexter, for example, just did this back pressure episode where he built that tool to test the Cloud Code CLI. His team invested time to write unit tests and a unit testing framework like the pretty renderer, for example, for Cloud Code. So you can just easily see them. The model doesn't have to see the JSON. It sees a prettified response. Our team spent time that says look at our code base and produce that diagram.

So you can use our cargo stow, it's in our repo. can just like get it or like you can just copy and paste it, run your own stuff, but invest time in tooling.

Dex (47:21.87)
Another question from Varun, are there certain steps we can add in agents MD for back pressure? Yes, you can always prompt the model. Well, you can prompt the model and tell it how to run the things. But again, you want the back pressure to be somewhat deterministic. So it's like, if you directly tell the model, hey, when you're done, run the type check and here's how to run it. Great. If you tell it, hey, when you're done, run the type check and your agents MD has, here's how to run the type check for each package. Great.

The even more deterministic thing you could do is just have a global like stop hook where it's like whenever the agent thinks it's done talking you Deterministically run the checks and if any of them fail Then you inject that gets injected back into the models context window like hey this hook failed with this error or warning So lots of different ways to approach this

Vaibhav (48:08.087)
or a pre-commit hook. A shout out to PREC. If you don't use PREC, PREC is awesome. But a pre-commit hook, P-R-E-K, for those that don't know. But a pre-commit hook is another way to add deterministic back pressure. And the back pressure mechanism doesn't have to be binary. It just needs to be observable. That's the key part.

Dex (48:23.246)
Yeah, the other thing we do is like, is, sorry, go ahead.

Dex (48:30.658)
Yeah, the model has to be able to get tokens in to tell it what was wrong.

Vaibhav (48:35.309)
Exactly. And sometimes that's a CLI command. Sometimes that's standard output. It really varies based on what you're trying to do.

Dex (48:40.332)
Yeah. So here's another example of like when we write these plans. this is the outline. Let's go to the plan. So if you look at some of the part of the reason why like the RPI plans are structured the way they are is because we want to make sure that the model is instructed exactly what to run for its automated back pressure. And then maybe there's also some manual back pressure. One of the things I often steer the model to do when I'm reviewing these plans, this one's already been executed. You can see the boxes are checked.

but I'll read the manual verification steps and I'll say like, this is a UI thing, but like I'll sometimes see it's like, okay, cool. Then manually like run a curl command against the running service. It's like, no, make that an auto, figure out a way to run a test, like write a test file that spins up the service on its own port in its own directory, and then hit it with a web request because that can be automated. And so like you're in this constant battle of like, how do we help the model give itself back pressure? And again, I've said this before.

The best AI engineers I know and people even like back in like May or June when cloud code first was starting to come out and become really popular. The people that I was most impressed by were the people who would spend three days designing the back pressure system, not even writing the code, not building anything, just understanding like, okay, for the problem I'm looking to solve, how will the model be able to check its own work? like.

enumerating out the different test cases in plain text, like not designing, not writing the code, but designing the harness. And they wouldn't even really talk about the implementation of the system. They would say, here are the checks we'll run to make sure it's working. And they would feed that to Opus, run it in a loop for two days. And they would get back out like 20,000 lines of working code because they had designed the back pressure mechanism. So they didn't have to be in the loop.

Vaibhav (50:26.029)
We have one more question. Which is, I'm not a big fan of LLMs as judge. On LLM as judge, I'm not super interested in various levels of role prompting. Don't think that works. But something like a G-Val? Well, I think the only place where that works, if you're doing LLM as judge, is if you're actually simulating the exact conversation in the way that you send it out to the model in your main loop.

Dex (50:55.31)
Hmm.

Vaibhav (50:56.014)
But if you're not setting out, if you're not using role prompts in your main loop, don't use roles just to be like, Hey, elements judge, this thing. I do think the user token does have a strong bias compared to a system token in the model. like treating deserts, different is useful. A system and user also have seems to have a slight bias, but not a, not as strong as I think system and user system and user seems to be like super, super trained for right now, because of like prompt injection threats that people are worried about.

and what the big models are worried about. But something like a G-Val.

Dex (51:29.352)
so yes, you can, you can do a reviewer agent to like, and we do this in our PR flows, like go review the plan and what was implemented and like highlight the deviations. It's almost always finding like, here's a thing I added in between two phases to, because I decided I wanted it. And that's kind of the idea of the plans. They're a little flexible, but you do want to document that stuff. And so like, yes, you can have an agent kind of review the implementation and make sure all the things in the plan were done according to spec. But I have. Yeah, go ahead.

Vaibhav (51:54.308)
Yeah. And then the key thing to note there is again, if you remember that diagram I showed earlier of like too much planning, too little planning, like you're just making trade-offs on speed and like what speed versus accuracy is like fundamentally that's always a trade-off that you're making. And like, I don't think there's a perfect, I personally don't think there's a perfect answer there between like, do you, do you always do the perfect planning or do you always do like one shot and anyone I think

that tells you that they're one-shotting everything is lying or producing totally garbage code. There's just no way, or they're doing totally uninteresting things. Like they're not writing any piece of software that is interesting. Because fundamentally, if you're doing interesting things, they are hard. And that probably means you made some design decisions that are incorrect at some point. And if you're always making correct design decisions, you're either a goat, and we have a couple of those in the form of creators, Git creators, people that...

that have made things like TypeScript and C Sharp, like Anders is about a few of them. There a few goats in the world, but most people are not goats. And you should just keep trying and keep assuming you'll make mistakes and keep exploring different ideas. And don't lock your workflow. Yeah.

Dex (53:07.586)
And those people weren't born, for most of those people weren't born goats. They did it because they were grinding for years to develop the instincts.

Vaibhav (53:12.697)
Ha ha ha!

Yeah. Yeah. So like, and the best part now is you have to spend zero time waiting for the code to be written. You literally just say, I'm going to try this idea and do it away. Sometimes what I do is I'll implement something. I'll literally have two repos open at the same time. And I'll be working on implementing the same thing and like two different strategies, one shotting in one approach and like planning in the other. And I will just go do that. And like through the process of doing that, I'm literally exploring both state spaces of bugs really fast.

And that is like super interesting.

Dex (53:46.67)
Yep. No, I mean, people love Codex 5.3. It's it's slow, but it's like, I'll kick off a like Opus space, like planning, design, structure session. In the meantime, I'll be like, Codex 5.3, go try to solve this, like just based on the ticket. And like, it's all about learning the solution space and like what's, what's possible. And like that shit changes every month. And so like, if you're not put, I don't know. Uncle Bob used to have this thing of like what it means to be like a truly like

professional software engineer, I don't know if I like that word, but his basic recipe was like, if you're working a nine to five, you give 45 hours a week to your employer and you spend 20 hours a week for you. Honing your craft, improving your skills, doctors and lawyers don't like clock off and then go home and watch TV, like they're reading journals, they're reading papers, it's all part of their profession is like, there is an extra 20 hours a week where you're spending keeping up with what's important, what works, what new things are happening.

Vaibhav (54:27.427)
Yeah, I agree.

Vaibhav (54:43.993)
Well, yeah, if you want to grow in the domain. And there's no harm if you don't, to be fair. It's a trade-off in life. But if you want to hone the craft, you've to put those hours in.

Dex (54:46.946)
Yes, that's true.

Dex (54:53.196)
I assume you're here because you want to hone your craft. Let's say that's a safe assumption.

Vaibhav (54:55.705)
That's true, that's true. are talking to a special kind of group of folks. But regardless, this was really fun to share. Thank you for sharing. I love how you put a coin to turn to stuff that I hope people are doing today and maybe not doing more actively consciously. The next time they do it, they can hopefully tell a model or a coding agency to do this more deliberately.

Dex (55:18.562)
Yes, do it deliberately, steer the models to the things you want. You can do anything, they can do anything. Find the things that they're really fricking good at that's high leverage. yeah, happy hacking folks, enjoy.

Vaibhav (55:31.033)
Next week, we're going to talk about how we actually run a lot of the AI behind the show, such as all the content generation, some of the clip selections, the highlight reel selection, the email generation, how we get toned perfectly right. We've got a fun little automation workshop that I think will be fun, and we'll have Kevin joining us. He's been doing a lot of stuff for us at the end scenes.

Dex (55:51.446)
Legendary producer Kevin has been doing incredible things behind the scenes. I'm really excited to see how some of it works.

Vaibhav (56:00.569)
All right. Goodbye, everyone.

Dex (56:01.112)
Thanks everybody. See ya.
