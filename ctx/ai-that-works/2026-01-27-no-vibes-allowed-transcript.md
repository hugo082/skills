Dex (00:00.371)
Let's do it.

Vaibhav (00:02.702)
Alright, we are live. The episode started at 10 10. Sometimes we're on a little bit earlier, sometimes we're not.

Dex (00:05.407)
We are live.

Vaibhav (00:12.779)
Alright, can you hear me Dexter?

Dex (00:14.684)
Yeah, I got you.

Can you hear me?

Vaibhav (00:19.35)
Okay, I think the audio was a little flaky for a second there. But, yes.

Dex (00:26.367)
You got me? Are we back? This is trying to reconnect.

Vaibhav (00:28.002)
technical difficulties resolved? I think so.

Dex (00:33.225)
Okay.

Vaibhav (00:35.016)
Dexter, it's your internet, it's not mine. You're going to have to maybe quit and come jump back on. All right, while Dexter does that, this is our weekly episode. It's, for everyone that's new, this is our weekly episode. This is AI That Works. Every single week, Dexter and I get together and we try and show real practical systems that try and take advantage of AI in some usable way. Hopefully some of techniques that we have are applicable today.

Dex (00:38.217)
Yeah.

Alright, I'll be back.

Vaibhav (01:02.702)
Today's episode is kind of a throwback to one of the past, a couple of the past episodes that we've done. And really, you're back. And today's episode is going to be all about how to actually use AI in a agentic system and how we're going to go code. So we're going to take a really hard problem. We're going to code it on the fly. We're going to have discussions. We'll take it as far as we can. And we'll try and set everyone up for success. Now, I think the audio hopefully is good.

Dex (01:09.282)
Yummy?

Dex (01:27.617)
Yep, we're just gonna ship until me and Viobov are exhausted.

Vaibhav (01:35.586)
Basically, which will be somewhere between an hour and two hours. We're just going to live code. Now, let's give everyone a little bit of context behind what we're going to be talking about and how we're going to be doing this.

Dex (01:43.351)
Amazing. I can't wait. What are we building? Yeah.

Vaibhav (01:52.032)
So some of you may know this. One of the things that we've been doing, if you've been watching our repo, for those of you that are, we have been working on making our compiler much, much better and enabling new capabilities like full-turning completeness, arbitrary object instantiation, et cetera, et cetera. Kind of almost like a V8 alternative is the idea. And while we've been doing this, as you can imagine, it's pretty hard.

but in the last three or four months, maybe six months, I think I've written a single line of code by hand. I have now implemented a garbage collector, we've implemented heap allocators, we have some FFI bridges, kind of a whole stack. So we're going to just work on part of that system. And what I'm going to try and do is I'm going to bring this up to speed on what parts of that system is. And I'll show the part that we're working on exactly how we're going through it. Some of the stuff I have already done, so I'll walk us through parts of it to talk us on how the design phase works.

And most of it, hopefully, we'll get to go code on the fly. But before we do that, Dexter, I'm on a screen share. Do you want to go and tell people what the tool that we're going to be using is?

Dex (02:57.923)
yeah, I I think we'll talk through kind of a lot of the why and the motivations and the structure while we're going, because there's going to be, if you've done RPI, there's always like five minute little down times where, you know, it's going to go research a bunch of stuff and come back. But basically, we have rebuilt code layer, as many of you know it, from the ground up for a bunch of reasons. And we'll get into why. think the most

like obvious thing that you'll see here is the kind of like refinement of the workflow. It's now not just RPI, it's got four or five steps. And one of the biggest goals we had was we found that there was a lot of like, you still had to get really good results. Like you can get better results by just using the prompts, but to get really good results, you still had to build a lot of intuition around LLMs and you had to be very kind of like.

delicate in crafting your context window and in like sprinkling in like, I hated that we called it this. We literally called it magic words. There were like words that you could sprinkle in at the end of your prompt that would get you better results just by causing the model to follow the instructions and the prompts better. And I think we talked a lot about this a little bit at the 12 factor agents for coding agents episode we did two weeks ago, but basically like we've done a lot of replacing the usage of prompting for control flow.

by splitting up the workflow and just using more control flow for control flow as we get more clear on like what the happy path is and what is like the best way to build these kinds of things.

Vaibhav (04:33.56)
So with that, let me go and show what part of the code we're gonna work on and how we're gonna deal with it. Parts of the code that we're gonna work on are gonna be specifically related to WebAssembly. It's not fun. It's a lot of, how would I put it, crap to deal with, actually, when you go deal with WebAssembly. And I'll show exactly how this workflow ends up helping us and what we've been doing. Where is this panel language?

Dex (04:39.597)
Amazing.

Dex (05:02.582)
Okay.

Vaibhav (05:04.568)
So before I get everyone caught up, I'm going to...

Dex (05:05.409)
I'm excited. We worked on WebAssembly the very first time we pair programmed on BAML together, I think. That was the one. Getting that thing running in the browser was crazy.

Vaibhav (05:15.872)
Exactly. And just so we have full context for everyone on the chat, please keep asking questions along the way. If architecture doesn't make sense, we're going to have tons of dead time to go talk about this stuff. just ask. Awesome. So what are we really trying to do? So I'll just grab the overall architecture. And as we do the architecture, I'll then go ahead and talk through this. So what we have is we have our compiler.

We have our BEX, which is kind of like our V8 engine. It's the BEX, BAML execution engine. And then what we have is we've done one of cool, one of the interesting things about BAML that you might know is that we try and be compatible with every single language. And part of that comes from this new syscrate that we have created. And this is kind of like system calls. You can think of it like network operations. You can think of it like OS environment variables. And what we do with the syscalls is we actually bridge to every other system under the hood.

to say that when you call it, when in BAML, when you call os.getEnvironmentVariables, in the case of Python, it goes to the, you'll see a sys underscore Python. Now it'll route itself all the way to Python and actually get os.environ from Python. And go will get the goEnvironmentVariables. That's how we do the bridging.

Dex (06:26.501)
okay.

Okay, so you're using each programming language's own subsystem for integrating with the system, and you basically just need to be able to invoke that from the BAML VM. Okay.

Vaibhav (06:31.138)
Hehehe

Vaibhav (06:39.146)
Exactly. And that's how we do that. And that's how we've designed this. That's why it feels so native in every language. Stid in, stid out, plugs right in. So you kind of get all the benefits of every existing language without having to really pay too much of a tax of having to use BAML. And that's why BAML is designed to be integrated. But in WebAssembly, that's the next crate that we want to go build. We want to connect this whole system to the WASM system. Now, in order to actually create the WASM system, we're going to need to create a new sysbridge into WASM. And WASM is interesting.

because we don't just want to call fetch in the Wasm world. We kind of want to pass on a JavaScript function from Playground and pass it all the way down into Rust.

Dex (07:18.243)
Right, because Wasm itself is kind of designed to not have a lot of those. It's like a sandbox-y thing, right? It's for running mostly like Bazelot. It doesn't have access to the file system by default. It doesn't have access to network interfaces by default.

Vaibhav (07:25.547)
Exactly.

Vaibhav (07:32.79)
Exactly. So like how would a file system work in Wasm? Well, the JavaScript system is actually just going to have a virtualized file system. The JavaScript system will have a virtualized, what's it called? Will have a virtualized environment variable system. The JavaScript is virtualized, but really it's still bridging to JavaScript functions to access everything. So what's nice about that is now React can modify these systems and your BAML code will just access this.

Side effect, this will also enable Cloud Platform Workers, which will just be nice. But this is a system that we're going to go design.

So ideally at the end of this box we should see another thing called sys wasm over here and there should be a dependency that somehow creates connects BAML playground wasm to Bex engine and also it ends up depending.

Dex (08:22.081)
What is, sorry, what is BAML Playground Wasm? And this thing on the right, is the BAML Core that we've been using for years now. This is the VS Code extension. What is this?

Vaibhav (08:34.41)
Yeah, so this is the thing that powers the VS Code extension. So we haven't shown the VS Code extension in JavaScript code here, but this diagram is purely our Rust code.

Dex (08:38.295)
Okay.

Dex (08:45.475)
Okay, so the BAML Playground Wasm is the bridge to the VS Code extension.

Vaibhav (08:49.802)
Exactly. So this compiles the web assembly and creates a JavaScript interface on top of it. And then our JavaScript system just calls initializes wasm and calls all that.

Dex (08:57.805)
Okay?

Vaibhav (08:58.744)
So we're going to have to pass in some callbacks into here and then pass it all the way down.

Dex (09:03.359)
Okay, exciting.

Vaibhav (09:04.654)
Cool. So we want to virtualize the file system and we want to virtualize network calls like fetch. Those would be, I think, the two end goals of today of making that possible.

Dex (09:13.303)
And the idea is if you're, if you're invoking from Python that it should like basically be passed into the runtime, a function that is actually like a native Python fetch or like a native TypeScript fetch based on a language you're in similar to how sys works. Okay.

Vaibhav (09:29.514)
Exactly, exactly. I think Rich asked the question, how does this diagram get created? So this diagram is actually very, very LM friendly. You can pass it as an image to the diagram, or if you can see over here, it's purely an SVG file. So you can also just read it, and it's very, very small. Why did we use SVG over PNG? Well, we use SVG over PNG because WC.

Dex (09:53.251)
Can you show the raw file also when you have a sec?

Vaibhav (09:58.254)
It's just 719 lines. So like it's super small and it fits right into an LM context window. This gets fully code-gened. We don't actually write this ourselves. How does this get code-gened? Well, if one of the things that we've been doing in our code base is many of you know, we don't do code reviews at all. And we ship a pretty complex system. As you can see from here, we've got all sorts of code in here. We have unsafe Rust code that we have to go do. We have a tool that we've built.

If you go into a repo, you'll find it. It's called, I don't know what's the resolution on my screen right now, Dexter. Is it good? Is it bad? Is it readable? Okay, that's good.

Dex (10:31.211)
It's readable. It's good.

Vaibhav (10:36.578)
Interesting. So zooms out automatically. if you go to a repo, there's a tool called Tools Stow. Cargo Stow is a tool that we've made that basically is able to go ahead and look into a repo and basically guarantees dependencies. It's kind of like an alternative to a lot of linters. But what we basically do is we say, if you have a namespace, we can guarantee rules about that namespace on how arrows can be drawn between them. So why does this matter?

Dex (11:04.855)
Right, I've seen there's tools like this in like, if you have a giant Rails monorepo, you can like, per package, you can set like ingress and egress rules, and then you can have like hard enforcement, and then they also have like a soft enforcement mode where we just print a list of the violations, and then you have your to-do list if you actually wanna create the clean boundaries that you've specified.

Vaibhav (11:13.867)
Exactly.

Vaibhav (11:24.162)
Yeah, and the idea is that these dashed arrows are across namespace boundaries, and these arrows and the other links are like within namespace boundaries. Exactly. These are all the names of crates. And we basically, that just makes it really easy to see if there's like, if an LLM slot machine has added bad boundaries. And if it does, we basically have a CI CD failure that prevents that from happening. Because in the world of LLMs, the more you can automate, it's really easy. And like this,

Dex (11:33.984)
like within a crate.

Vaibhav (11:52.526)
this file stole.toml just runs in CI CD. So like for example, linking this to the actual diagram, you'll notice that we have like a namespace called baml. And now there's a baml namespace over here and everything in here is prefixed with baml under the hood.

Dex (12:06.849)
So my question is like, you have your rule set and then you have your generated diagram and I'm curious, which one of, like I would have expected something in the middle, like an intermediate like text representation that is LLM friendly, because you don't really want to be feeding SVG paths straight to an LLM, right? Because there's some algorithm, the layout algorithm here that actually determines how the SVG is generated, right?

Vaibhav (12:11.224)
Yeah. Yeah.

Vaibhav (12:27.242)
I agree. So gimme-

Vaibhav (12:33.558)
Yeah, let's go back to this diagram because think people have a lot of questions about this, but let's do this right after we actually create a new task. So what we're going to want to do is we're

Dex (12:38.039)
Yeah. Yeah, let's kick this off. You should zoom this in for sure.

Vaibhav (12:46.552)
Let me switch them. I don't know how to do none of this. Displays. What I will do is I'll just update my resolution instead.

Vaibhav (13:01.102)
let's make everything big. Isn't there a way to make everything big?

Dex (13:06.435)
you do 1920 1080 high DPI.

Vaibhav (13:12.27)
It's gonna kill me, but I will for you folks. Is this better for everyone?

Dex (13:17.73)
Yes.

Vaibhav (13:19.72)
Okay, in theory the Wazee runtime should be supported as well, Patrick.

Vaibhav (13:28.426)
Okay, we'll call this like a syswasm.

Dex (13:30.435)
Cool, what are doing?

Vaibhav (13:40.654)
Okay, and what we want to do is we want to say something like, and I use voice for a lot of my comps, I want to research the code base and, oh, whoops. Currently, we don't support BAML playground wasm calling into Bex Engine. I want to make that possible. That likely means we also have to add a sys underscore wasm crate because sys native can't be used for Bex Engine there.

Vaibhav (14:04.216)
cool. That's probably about right.

Vaibhav (14:11.65)
It's a pretty ambiguous task as you guys can see. It has some technical details because I have some context around this already so I'm going to give it that and I'll just click this up. The first thing that we're going to do is I'm going to pull up Obsidian. Where's my favorite little tool called Obsidian?

Vaibhav (14:34.888)
the resolution drives me crazy. Changes how my mouse works. And what we did over here is we made a VBB. So the first thing is it just made a ticket file that just wrote everything down in terms of what we just wrote in the message. And now it's going to go and kick off a research process. And those of you that know RPI from depth who talking about it so much is honestly that RPI is pretty freaking good.

before we do any amount of work into the question, we're going to produce some research that tries to get some facts about the system. It doesn't do any effort in terms of actually understanding it, in terms of actually modifying it, or even interpreting the changes that we need. It's purely about gathering the current status of the system. Is that right, Dexter?

Dex (15:22.091)
Yeah, so, and it used to be basically like the process to do a good RPI, like a lazy RPI would be like, here's what I'm building, go do research for it. And the challenge we saw that doing over and over again is the model would focus more on information about how to solve the ticket that you were building or the problem or the issue or the bug. And research, the goal of research is really to like compress truth, to compress the state of the world today without having, and you want it to stay super, super objective.

And so the skilled RPI people, what they would do is they would read the ticket and then they would kind of have at least high level understanding of where stuff was in the code base. They would be able to read a chart like this and understand how things are laid out. And so they would translate it into objective question. They'd be like, tell me everything about how BAML Playground Wasm works. Tell me how SysNative calls into native programming language.

tell me about the relationship between the Becks and the Syscrates. Like they would generate these questions that they would know would send the model off to find the right things. The challenge was is like, we wanted it to work well for the lazy folks as well, right? Like that requires quite a bit of skill and code-based understanding. And so one of the things that we trialed a lot and got really good results with is what ViBob's doing now, which is to take the ask of what we're building.

do a very lightweight exploration of the code base, and then generate not a research document, but a set of objective questions. And so now, instead of just research, there's like two phases, right? You take the ticket and you build the questions, and then when we feed the questions to the next fresh context window, we're context engineering it in a way we do not want the researcher to have any intuition about what we're building, because these models will always bake in a bunch of implementation details, which is basically like,

the model picking the next most likely token rather than like pulling the human into the loop to like review and identify and like iterate on this stuff. Does that make sense?

Vaibhav (17:22.19)
Exactly. So hopefully the tokens will come out pretty soon and we'll have our research questions. while it doesn't do that, you guys had a couple questions around how does this diagram regenerate? There might be intermediate step. So it turns out that we did consider putting intermediate step out, but the reason that we don't link every single dependency in this diagram is because it actually ends up being, once you have dependencies, it ends up being very transitive.

So this BAML compiler emit depends on BAML compiler MIR, likely BAML compiler emit also somehow depends on BAML compiler VIR. We don't want to draw that dependency line. So we do a lot of transitive reduction to actually get rid of all the dependencies and only show the minimum set of dependencies in the graph. This actually makes this much easier for an alum to digest as well. It makes it way easier to induce rules and verification on top of this, if that makes sense.

Vaibhav (18:19.47)
think we're done with research questions. Okay, I think we're done with research questions.

Vaibhav (18:29.166)
Okay, I'm go read this, Dexter, think there's a question for you in the chat.

Dex (18:32.579)
Let's see. yeah. So, I mean, this will become clear when... This will become clear when we go and look at what these questions are. But yeah, so here they are. So yeah, the idea is you want to make this super, super objective. So it's asking, here's trace how this works, find how these things relate, find all the patterns for this and that, find the async bridging and since types. And you can always edit these, right? Like the idea is like...

We just wanna automate the thing and give you like a starter and you may delete one of these questions, you may add a new one, but this is gonna give you the like basic idea of what the research should probably look like. And Ben, this Riptide Experimental, is the like, again, I mentioned it earlier in the episode, but we kind of rebuilt code layer from the ground up.

And this is a preview of our new project, which I guess ViBov has been using, what, for like a week now? We get a lot of support tickets from ViBov. He has lots of requests.

Vaibhav (19:31.0)
Give me a two.

Vaibhav (19:35.98)
I'm an opinionated engineer if I say nothing else. Okay, so let's talk about what kind of questions are asked. So it seems to be, as many of you can tell, likely the... You can actually see what some of the questions are. A lot of the questions are actually about the current crate. It's talking about how does BAML Playground actually use Wasm Vignen, which is a crate in Rust that takes advantage of JavaScript and bridges the two together. We may have to do some extra work there because we need to virtualize the file system.

Dex (19:39.416)
Yes.

Vaibhav (20:04.32)
which of these can be, which of these are unsupported? For example, FSOpenn and Shell are clearly unsupported in Wasm, but we may not want, so we have a Shell syscall, for example, we may not want to actually make these unsupported. So I'll actually update this question for the unsupported.

I would like to accept callbacks from, I would like to accept optional callbacks from JS. So I can bridge with a virtualized.

Fs.

Vaibhav (20:54.19)
So we just need to know what needs to be in that way. So I wanted to update the questions because if the question is wrong, it's going to go ahead and just make this assumption for the rest of the system that what they're going to do over here is it's going to say that, hey, we now need a, if it says it's unsupported, it's just going to do everything else. So it should just know, it should know the concept of it is virtualization as opposed to anything else.

And then what I want to tell it is, demo schema wasm, this is extreme.

the legacy code. We don't know if it follows best practices.

but it can still provide some guidance. So I want to make sure even when it does research, it knows that this is just old code. And we definitely want to make sure that we don't bias ourselves too much in this system.

Dex (22:02.229)
RPI stands for research plan implement. We've got a question in the chat there. Yeah.

Vaibhav (22:05.234)
yes. It is a phenomenal technique. For context, by the way, I guess I can't show my usage here. I am, I have, actually let me pull up my code base really fast. I'm about to show you guys how much code I've been writing really fast while, this proceeds to research, because research will take a while.

Dex (22:16.77)
You've been blasting a lot of tokens, dude.

Dex (22:23.883)
Yeah, let's get this in. actually what I would do, I would actually, will you cancel this? We're updating how the questions get passed in. It doesn't actually pull from the file. It pulls from the last agent message. No, it doesn't. It just prints, it just paste the questions in. So what I would do is I would just copy this prompt and then just paste in the questions from the doc. We're fixing this. No, it's not.

Vaibhav (22:26.72)
Okay.

Vaibhav (22:34.509)
It does.

okay.

Vaibhav (22:46.946)
Did Internet copy and paste it from here?

Dex (22:51.765)
It will be soon, but today it's not. This is an improvement we want to make.

Vaibhav (22:56.582)
Okay, well, I'll just tell it like...

Dex (22:58.871)
Well, don't tell it to read. See, the problem is you don't want it to read the file because you don't want the input query. You don't want it to know what we're building. So you have to go delete the input query. Yeah.

Vaibhav (23:07.054)
for this.

Why don't you want the input query?

Dex (23:11.735)
because the research must remain objective because you don't want the model to know about what we're building.

Vaibhav (23:15.522)
Interesting.

Vaibhav (23:19.478)
Okay, let's get rid of it. In that case, I'll try that. I have found having an input query sometimes useful, but let's try it. I'm down. You guys spend a lot more time thinking about this than I do. Okay, while this is running, let's do a few more things. I want to talk about how our team codes a lot and how we're able to go and ship without lot of PRs and what workflows we have.

Dex (23:22.497)
Yeah.

Dex (23:28.641)
Yes.

Dex (23:37.217)
Yeah, you all have an incredibly high quality, well architected code base and you don't do code reviews. How can people get there? What's the secret?

Vaibhav (23:44.834)
Yeah, let's screen share.

Vaibhav (23:49.588)
We're writing a crap ton of code. I'll just show you like in the last month. This was a very sad month.

Vaibhav (23:58.226)
And Aaron Aaron actually writes a shit somebody writes in the private repo because we have a cloud system that's coming up really fast. They'll be excited But like like check out all this code All vibe coded and it's all additive. It's not just like

Dex (24:12.777)
It's not vibe-coded. I don't like the word vibe-coding. You engineered it.

Vaibhav (24:16.462)
Yeah, it's engineered, like I'm talking about, we've done heap allocators, we've done all sorts of things now. And this is all very, very recent in terms of what's happening. You need to see the order of magnitude of code that we're doing with Pure Vibe coding.

Dex (24:29.249)
Vibe coding means you don't give a shit about the code. So I think it's really like, I don't know, Simon Wilson calls it vibe engineering. I don't even like the word vibe. I think it's just software engineering.

Vaibhav (24:38.19)
We can call it whatever we want, it's designed systems. And part of process of doing design systems here is actually building tools like this. So we spent a considerable amount of time on our team actually thinking about what kind of tools to build, not just about how to go build this. for example, let's see if I can, can I have a history of this file? Let's look at the history of this file, because then that'll be fun.

Dex (24:43.426)
Yes.

Dex (25:05.079)
Yeah, mean, like what you're after here is mental alignment, right? Either with the human and the agent or with the human and other humans, but you need like efficient ways to keep everybody on the team on the same page as far as like what the code base is and how it's changing.

Vaibhav (25:13.739)
Exactly.

Vaibhav (25:20.254)
Exactly. Because otherwise you can't do anything. And I actually want to bring architecture SVG into the top of the file. So how do I see raw history to the history of this file? It's not going to show me all the version of this file. How should I do this?

Dex (25:29.827)
Yeah, there you go.

Dex (25:38.403)
think if you click one of these, see the file at that shaw. You have view code at this point.

Vaibhav (25:50.266)
Like, like, just go. All right, cool. I'll just go down this. So like, I'll show you the very earliest version. The very earliest version had this shitty piece of code. Still very useful, by the way. We actually caught some bugs here. Like, for example, one of the first bugs that we caught by seeing this diagram was we're like, why does the compiler tool change depend on the VM? And that was surprising, to say the least. Actually, let me just pull up a couple more of those. Actually, I'll do it in chronological history, so it's like very, very clear what's happening.

Dex (26:14.517)
Okay.

Vaibhav (26:20.206)
That was the most interesting part of why this toolchain helped. And you guys can actually see how it evolved over time.

Vaibhav (26:29.262)
Okay, maybe I missed one, but it doesn't matter. So yeah, the first thing we caught was, Hey, why does a VM depend on this? Well, it out the VM depend on this because we had some built in types and like built in functions that were hard coding to VM crate that are now in there. So we actually just pulled that out into a separate crate. And now you can see the VM is here, but this is still a little weird. Why does the VM, why does the compiler still depend on the VM? That's still really, really odd. So I think we did this later. Uh, we did a couple more stuff. So then we made a type system.

where the types that are used in the VM, because we have to do bytecode generation, it's actually...

Dex (27:02.849)
Yeah, you need to pull out the type system so that you have like the interface between the two things.

Vaibhav (27:08.334)
Kind of, it's more like the assembly that we can generate. So the way the BAML compiler works is we read all your source code and we generate assembly. That describes it. That's why it's freaking fast now. But what ends up happening is...

Dex (27:20.279)
When you say assembly, do you mean x86 assembly or do you mean your own kind of like assembly-ish bytecode thing? Yeah. Yeah.

Vaibhav (27:25.046)
It's our own instruction set. It's very similar to how Python does it. It's like how JVM works. It's how everything else works. So we have our own instruction set that does stuff. The BAM will bytecode. The BAM will bytecode. Anyway, what ends up happening now is now you can again see the project became a lot cleaner as you can go do this. We've also, we started enforcing a couple of rules on top of that. For example, when LLMs started naming things, they'll kind of name things whatever the heck they want. And it quickly turns into slop that just

Dex (27:31.363)
Okay, the BAML bytecode.

Vaibhav (27:54.994)
it quickly starts inter-depending. So for example, now you're seeing that we finally had the stow tool at this point. What the stow tool did is it enforced naming criteria. It also said that, for example, Tokyo, we know is a dangerous trade. If someone depends on Tokyo, we quickly get screwed because we don't have Wasm support by accident now. And the Wasm build breaks because it imports something that we can't import. For those of you that don't know, Tokyo is a Rust library for like multi-processing and async workflows. And async...

behaves really weird in WASM and in very various languages. So this becomes harder for it to deal with. Then after that, we added a bunch more tests. And as you can see, the tests quickly blew up and we're like, okay, well, this doesn't really scale. So then we made this actually much better. And then we made the design a lot simpler. Say that again. Exactly, because we started coloring by namespace. And then we started, one of the first things that we noticed was,

Dex (28:39.885)
Just the visualization of it. This is the same data, but just like easier to read.

Vaibhav (28:51.426)
there's some really weird dependencies. the way that VM types actually gets used is it goes to BAML snapshot, which then goes all, which then like the best engine weirdly depends on. So there's this really weird dependency here. And like, what's really interesting when you go look at this is your brain automatically probably guesses like, this probably shouldn't be named BAML snapshot. That should probably be in the Beck system. This should be Beck snapshot just because the way that dependencies are oriented and you could spend forever discussing how to name software.

But when you actually just look at this, it's a lot more clear how you actually name things. And even Cloud Code, we just ask Cloud Code, what's a better name for this system? And Cloud Code eventually came up with the name of...

think it's in here. The cloud code was like, we should name this Bex program. And now again, you can see how the diagram became a lot more clear. And that's, think, the interesting part of this is you can go from a really sloppy diagram to a converged diagram that makes more sense over time. And that's really what I find to be really useful when byte coding, which is the clarity of your thoughts and your architecture is really the only gap.

And the better that you can convey clarity and simplicity to the agent, the more likely that you'll end up with a world where the agent is actually going to be able to do something that makes more sense. And the only problem with the current system right now is the layout engine doesn't have a stable way of organizing these namespaces. If we actually change that, I suspect it be a lot easier and lot more robust as well along the way. Wait, let me see if this is...

Dex (30:25.601)
Yeah, getting deterministic layouts, like I don't know if you've used like mermaid versus like graph viz or like DOT. The toggles on it, like the API is to those systems always. And it's either like very low level and you actually have to think about like the algorithm or it's very high level and very brittle. I don't know if you use dot and like rank equals same for graph viz. Yeah.

Vaibhav (30:31.01)
Yeah. Yep.

Vaibhav (30:46.22)
I have. So this uses Graph-Viz under the hood. that's why Mermaid was just not pulling out the right thing. The other nice thing about this is while it does use Graph-Viz, Graph-Viz doesn't support all these customizations. So what we really do is we produce Graph-Viz, produce an SVG, then we do some most processing on the SVG to actually make it nice. So for example, following these dotted arrows is really hard visually.

Dex (30:50.32)
cool.

Vaibhav (31:11.01)
But now it's super easy because these dotted arrows have like arrows along the way so you know which direction the arrow is going at any given point.

Dex (31:17.283)
Yeah, nice, cool. I think we got our research doc, right? It's still writing, yeah. Yeah, okay, so we've taken our questions and we've turned them into research. And now it's gonna give you this document. And you may read this, I mean, again, depending on how large, I know you're doing a very big complex thing and a very big code base, so in this case, I imagine you'll wanna read and skim this research and make sure it's captured all the details you want.

Vaibhav (31:20.654)
And it's almost done.

Dex (31:45.475)
Depending on the size of the task, sometimes find myself just not really reviewing the questions, not really reviewing the research, because the most important and high-leverage part of this is gonna come next. And it'll be clear from the design discussion if something was missed in the research, but I encourage you to review this if you want to.

Vaibhav (32:01.187)
Yeah.

Vaibhav (32:05.08)
So here's what I usually do when I do this. So I basically just say, screw tokens. I don't really care about the token price or anything. I'll just pay the money anyway, because speed matters a lot more than the token price. So what I end up doing is I'd say, okay, there's some questions here. Maybe there's some mistakes in the research. I don't really know. I just start the next process anyway.

Dex (32:11.053)
Yep.

Dex (32:15.458)
Yep.

Dex (32:24.981)
in case and then you go start reviewing it.

Vaibhav (32:27.2)
Exactly and literally I'll start reading the research afterwards. I'm like, okay Well, I'll come back and now I'll read this because it's just like pipelining and if the pipeline is bad Don't really go and kill the other process kill the context. I'll just start again

Dex (32:30.851)
That makes sense.

Dex (32:40.035)
Yeah, Meles had a good question in the chat. you also include a research question for new third party libraries to evaluate when appropriate? I think the answer is basically yes. I think we did an example of this here where we added a web search question, which was like, go read about the WASM best practices. It's not quite a library, but it's an external technology that it ended up sending off a web agent to research.

Vaibhav (33:02.562)
Yeah, and it's probably somewhere in here. Or it'll pop up in the chat soon.

Dex (33:06.849)
Yeah, if you see that you have a web search researcher there in your minimap on the right. Yeah, there you go. So you can go see what it searched for and like what it ended up finding.

Vaibhav (33:10.508)
yeah, right here. Yeah. So.

Yeah, it looked, it literally wanted to figure out how to use wine gen and JS functions, like, which is what I wanted to go figure out.

Vaibhav (33:24.43)
I'm gonna skim this for a little bit, really fast. As you can tell, our syscalls are interesting, to say the least.

Dex (33:26.402)
Yep.

Dex (33:31.607)
Okay, shell, nice, spooky.

Vaibhav (33:34.016)
Yeah, the shell is really important to us. It allows you to build a coding agent.

Dex (33:39.991)
bash considered harmful.

Vaibhav (33:46.326)
Free function start version hot reload. Okay. yeah, we need hot reload as well. So it needs to consider that.

Dex (33:55.925)
Okay cool, so it found a thing that you didn't have like front of mind in your write up, but you're like, yeah, we do need to think about hot reload. Yeah. But you didn't tell it to go include hot reload, yeah.

Vaibhav (33:59.702)
No, no, no, we have, we have hot remote. It's in there. but it, yeah. In my writeup, I didn't remember that. Yes. Yep. Exactly. I'm glad it mentioned this as legacy. Yep. Promise based. So it actually knows how to go bind this. That's perfect.

So this is how we do file system binding in the old system. The new system needs to be a little bit more generic.

Vaibhav (34:32.212)
And as you'll notice, I'm really skimming this. I'm actually not trying to do a very well detailed read of this. There's two reasons to this, just to be very transparent. One reason is we're on a live stream. I don't have time to read this in a very detailed way. And I might be a little bit more detailed, but also like Dex says, I'm just not that worried about the research being really wrong. Like I said, it's mostly objective. I'm just looking for like, did it miss something that I know is foundational that it really needs to have?

Dex (34:44.803)
you

Dex (34:53.656)
Yeah.

Dex (34:58.625)
And it's easier to proceed through and even if you get all the way the implementation, like, there's this huge foot gun that we missed. It's not that hard to just rewind, take your research and be like, cool, go do a follow-up and find all of this stuff and then you resume from there again and you push it back through.

Vaibhav (35:15.406)
Yeah, and then the other thing you guys will notice is like this is actually one of the most useful parts that I find in the model, like this code references. Other research always spits this out now. And that is so pleasant because like it makes grepping for the model so much easier in downstream processes.

Dex (35:29.409)
Yeah, you would be surprised how much of the context window gets used when you start a fresh context on just finding where the stuff is and which lines of the file are relevant.

Vaibhav (35:38.712)
Yeah, I don't think this matters. GC doesn't really matter how garbage collection works. It literally does not make a difference.

That's okay as well. It doesn't really matter. We just need a virtualized file system. It doesn't matter how it read the old system. Yeah, that I think really makes no difference. Okay.

Dex (35:58.605)
how the old one worked. okay. Okay, so what we're gonna see next is the design discussion, which is essentially, basically if you've used the canonical like RPI prompts from the human layer repo or some version of them, baked into that prompt was three steps. There was like, ask the user, know, okay, for...

for a number of questions, do you wanna solve it this way or that way? Asking them, how do you wanna approach this implementation based on everything we read and what was in the ticket? There's another prompt that is like, okay, now what order do you wanna do the building in? It's like, where are we going? And then how do we get there? And then write the plan? And these steps could get skipped.

often. And so what we've done is we've taken a long prompt with 50 instructions and split it up into three smaller prompts with fewer instructions that solve different parts of that planning workflow.

Vaibhav (36:59.254)
Yep, exactly. And then you've been asking a question like, is there a difference of RPI or skill there? No, you can do all this in Cloud Code too. But what I personally find as useful is like this stuff. Like I can organize by task and in Cloud Code, like resetting the context to begin the same task is really hard. Knowing that this was my research prompt and this was like what we're doing design for it is just nice. I didn't label it, it just got labeled automatically. If you go back to some of my other stuff, I can show you like, for example, I do multiple and some stuff. It's just really easy to go understand.

Dex (37:30.092)
cool, so you jumped back to design and then went straight to implementation. That's cool.

Vaibhav (37:33.846)
Yeah, well, I went the other way. Implementation back to design. Yeah, not one.

Dex (37:36.895)
I see. Yeah, okay, so you got to the implementation step and then you realized something was off and you're like, okay, we need to go update the design doc and then I'm going to like proceed from here. Cool.

Vaibhav (37:44.414)
Exactly. And people are asking, like, how does this get organized over here? It's just a files format. Like, the prompt just writes it to a file. You can choose whatever file you want. You can tell the agent to name it differently. I need to update the base prompts to actually start naming these by number. like research, research, research questions should be 01, research, the actual research should be 02, then it should be 03 for design discussion. Because I just want to number stuff sequentially. And especially, like, if you guys look at...

Dex (37:59.628)
that's coming actually. We're shipping that.

Dex (38:07.447)
We're getting rid of the dates. Yeah. We're getting rid of the dates.

Vaibhav (38:11.994)
If people want to see like my other stuff, like you can see how wild this gets. actually I have another one that's Like this one. I have like multiple structured outlines. I've I'll have multiple plans. I have multiple design discussions that V1 V2 the model just picks an arbitrary name. If it's sequentially numbered, it just also reminds me in what order I was working on the files and what order I created them.

Dex (38:36.865)
Amazing. Cool. So let's have a look at the design discussion. I know we have a summary in the chat stream, but I would say probably better to look at the document itself.

Vaibhav (38:46.806)
Yes, I do always read the summary, the way, because it's faster for me to know what I'm going at. But I will never ever start answering those questions without actually reading the full document because it is garbage.

Dex (38:57.109)
did the automatic GitHub permalink work if you click on that link? it open in GitHub?

Vaibhav (39:01.708)
It did. That's the other thing that I found to be extremely useful. So these design discussions create GitHub links automatically for us. it did not work.

Dex (39:09.442)
no.

you might have a issue in your sync. You may have like a merge conflict in your sync repo.

Vaibhav (39:18.986)
Maybe, but that's unfortunate.

Dex (39:22.007)
Yes, we're fixing that.

Vaibhav (39:23.918)
Okay, yeah. Please do. I use this all the time. As you can see, most of it syncs. And like whenever I sync it, what I end up doing is I will just take these at the end of discussion, send it to someone on my team, and they can just go read it with a lot more context.

Dex (39:40.215)
Yeah, cool.

Vaibhav (39:47.918)
We want to bind promises with JS callbacks. That'll do the trick. Thread local storage. Yep, we want thread local storage.

Vaibhav (40:03.438)
nice, it's actually pretty cool. JavaScript class and plain object. That is correct, yeah, it's correct. This might be slightly nicer from an ergonomic standpoint, because it'll make the JavaScript code cleaner, but we could do a one-to-one struct that we code gen, so it should be okay. How does async operations bridge to JS promises? No, Tokyo.

Dex (40:08.855)
Did you get picked the right one?

Dex (40:22.403)
Okay.

Vaibhav (40:30.06)
Yep, this is correct. That is the right way to do this. We don't really want a token dependency unless we need one.

Yeah, we could do this one, which might be slightly faster, but I'll have it go research that. I should call it actually thread. Yes, that is correct.

Vaibhav (40:55.342)
What should the initialization API look like from JavaScript?

Vaibhav (41:03.892)
That is also correct. So one could argue that we might want to construct our parameter. Okay, we'll talk about this in a second. What's your optimization format for arguments? Yeah, we just use, well, this is incorrect. We'll have to come back to this in a second. This is totally wrong though. And we need to have it go, I know what it has to go research in order to go do this.

Dex (41:24.297)
Okay.

Vaibhav (41:32.878)
So once we've done this, you'll notice that this is a lot more detailed in what it does. It tries to show the minimum amount of code that it actually needs behind the scenes. And then it will try and show one of the things I think you guys added now, which I've actually been enjoying. It's like just patterns that make sense, that are relevant from passcode.

Dex (41:55.905)
Yeah, what did we find? Cause it used to be you had to read the whole research to make sure it didn't pick any bad patterns or whatever. And now we just like the research is objective and part of the design is like, okay, based on all the code that the research found, like what things are relevant to this ticket.

Vaibhav (42:12.846)
Exactly. And I think Ralph asked the question, like, what's the actual process? Full process end to end is you research questions, you go research, then you go into like this design discussion, which is going to be a little bit more of a back and forth. And then what we'll end up producing is we'll go from here to producing what's called like a structured outline.

And actually, I want to talk about your structured outline a little bit.

Dex (42:38.933)
Yeah, mean, so design is really like, where are we going? Like, what does the end state look like and like, what is the overall thing? And then this is how do we get there? And so like, there's two skills in doing like, you know, hard problems and complex code bases with AI coding agents. And one of them is like getting the agent to like, you know, point at the right North star goal. But the other skill is like, I think by default, a lot of coding agents will want to do what we call like very horizontal plans of like, do the API layer.

and then do the database layer, then the services layer, then the API layer, then the UI layer. And it's like, you can't actually test anything until it's done. And the last thing you want is to be at the end of 2000 lines of code and it's not working and you don't know where and the agent, like it's basically takes a lot more context. And so if you could order the steps in such a way that there is either like ideally like a unit or integration testable approach that the model can verify that it's working in between the steps.

That's awesome or at the very least like you want to you want to set the order of the steps so that you can the same way you would do if you were coding like you wouldn't sit there and write a thousand lines of code you would write like 50 lines of code and then run a test suite or check something you would write another hundred lines of code and then you would like run a CLI to check if it was working like you Like you can still organize these things in terms of feedback loops and there will always be problems that like you can't like end to end integration tests like obviously if the model can check its own work that's the best because you don't have to

sit there and check stuff, but structuring your plans in such a way that you'll be able to validate it along the way. For easy stuff, not necessary. You just tell the model, go rip the whole plan. But if you're going to be, you want to be in the loop and make sure it's correct as you go, then this is a really powerful thing. And this is basically like, it's not the whole plan. If you've used an RPI plan, it can be a thousand or 2000 lines of markdown.

Vaibhav (44:24.245)
Exactly.

Dex (44:32.259)
I actually no longer recommend that people read those. Like it's a pain. People try to do code review on plans before they actually went to do the PR and it was just basically reviewing the same code twice. And there would be surprises, right? When you're doing a plan, you're like 80 or 90 % there and then you do some tweaks at the end. So people were doing double code review. And so this structure outline is much more like high level and concise. This is the document we use for, for mental alignment on our team and what we.

Vaibhav (44:39.317)
Really?

Dex (45:00.513)
recommend to our users is basically like share this around, share the design discussion around. These are tighter and more, it's all about human leverage, right? Don't make humans read any more markdown than they have to, just like you don't want to make a pull request that is like a pan the aster review.

Vaibhav (45:14.958)
Yeah, think there's a funnily enough, I actually do read the plans and I found bugs in them actually that were not caught earlier and I'll show.

Dex (45:21.539)
Sure, yeah, you can, but you wanna do the high leverage thing first, right? You wanna get the core structure out before you go nitpick the details.

Vaibhav (45:26.946)
Yeah. But sometimes the phases can be correct. So like, for example, I'll give you as a couple of examples. So like there's this concept called the structured outline and then the plan. So like we don't generate the plan immediately. And the reason we don't generate the plan immediately is like really simply, like before you determine all the steps and all the parts and all the tasks that you're or to do is that your agent is going to go do the problem. The first problem that you'll run into is you'll quickly be like, I want to reorder this. And I wanted to switch the order of like to do one and to do two.

Dex (45:36.3)
Yeah.

Vaibhav (45:56.622)
Well, when I run into that problem, what ends up happening? The about what a coding agent has to do, coding agent has to basically delete lines one through N and that's the first fine line, which is hard enough to ask. And then it has to go ahead and replace it earlier. If you have code snippets as a part of your actual word here, the number of lines expands dramatically. So something as simple as like, it's just exactly, it's one of the least context efficient things you can do.

Dex (46:17.633)
It's just not context-sufficient.

Vaibhav (46:23.672)
So you might still want code in here. And I think sometimes we get some and we actually ask it to generate some sometimes in here, but we try really exactly. And like, for example, you can see over here, it actually did put some code here, but even in here, one of the things that you'll notice is as you're doing a lot of design discussions and as you're doing like structured outline review and on that process to go edit it, it creates a bunch of slop and artificially induces phases and steps as it does stuff.

Dex (46:29.709)
Yeah, you can ask it to add more detail if you don't know what it's trying to do.

Vaibhav (46:51.436)
And so what I will often do for a really complicated task is I'll actually have a review, a task, and after it's done, I'll have it then say, okay, now is there a different way that we'd organize this and create a new structured outline? And that's why you have phase one, two, and four down from phase one, five, and seven. And in fact, if I show you guys like the prompt that actually led to this, I'll show that in a second, we went to four phases instead of eight while this is running.

of the native properties. And again, why is this design nice? Finding that prompt is trivial. I just go over here and I know it's a design phase here. And I just bring everyone back to the chat.

Vaibhav (47:32.64)
actually it wasn't, because your thing died, it's in quadcode. But, I'll show you the quadcode. Alpha software in there.

Dex (47:37.411)
Alpha software fam. If anyone asks why you can't have rib-tied yet, it's because we're still working on stability stuff and ViBov is a very good sport.

Vaibhav (47:49.854)
Yeah, okay. So one of the things, oh, was this the right one?

Dex (47:55.875)
Claude attribution.

Vaibhav (47:57.998)
finding the right cloud path is so friggin yeah. Hey, I hate when I add cloud attributions, especially when it's me. And the only thing I'm having Claude do is like, uh, when the only thing Claude is doing is literally just, oh, right here. Oh, that's the chat. Uh, and when the only thing Claude is doing is just something to see, Oh, I did compaction. Do you know how I do I, do you know how I get the full chat out of compaction?

Dex (48:26.307)
We have not dug into that because I don't believe in compaction.

Vaibhav (48:30.938)
I do come back sadly. I'm a pleb. I can't show you.

Dex (48:33.027)
I know you do. I've seen it. Anyways, let's not worry about this. Our design discussion is waiting on our answers.

Vaibhav (48:42.156)
Okay, I'll go back. I'll do some more. I'll do some crud work and go on the discussion.

Dex (48:45.067)
Yeah, we'll compare the structure outline we build and you'll see us give feedback on it and then we'll compare it to the actual plan that gets built and you can see the differences then. Okay, but this thing, it's got patterns to follow and then it's got a bunch of questions for you.

Vaibhav (48:59.758)
Okay, well, first I gotta read all the crap because sadly I read because I'm a heathen. Systies, okay, this makes sense. Completion handler. Okay, yes, yes, I understand this. I'm lucky I can scan this because I know this code base pretty well or else I'd be very sad. This is also one of the nastiness that we're getting rid of. We used to do some nastiness where every time we wanted to build a bridge for any credentials, we'd like pass and I cut some function.

Dex (49:06.667)
It is very sad.

Vaibhav (49:29.078)
Now it just shell. So it's so nice. It's so clean.

Vaibhav (49:37.358)
Grouped callback. So you remember the summary that we were reading where it's like, how should we group this? There's a couple different options. You can do a builder pattern. This is disgusting in my eyes. I hate this. I hate builder patterns unless you really, really want to go do this. This custom struct is really nice, I think. And we could, or we could do something like this. I just don't like this because this is going to create like more more more nested structs. And I really want to avoid having that.

Dex (49:49.918)
Dex (50:04.931)
Mmm.

Vaibhav (50:06.062)
having a flat struck that's like well named is just way more useful for everyone.

Dex (50:10.551)
with just every single function flattened instead of having, yeah, that makes a lot of sense. I agree.

Vaibhav (50:14.995)
Exactly. It's just so much easier. And yeah, that's why it kind of did this. Otherwise I to make like five Wasm structs and like, it's just one.

Dex (50:28.237)
Sick.

Vaibhav (50:32.046)
Okay, let's look at this. How do async bridges work? Wasm bridge. I am curious about this, what the performance application of this is. So like, let's just cue that task up. This is a feature I've been asking desk for a long time. I wish I could just fork this chat thread and just have it go dig into this.

Dex (50:49.911)
I mean, you technically are forking it, but...

Vaibhav (50:52.758)
I know, but I wish they would just naturally do that so I could always revert back to the thread originally.

Dex (50:58.081)
I mean, you can use, you can make a new chat and say, iterate design. And then you can say, I know it's not discoverable, but if you make a new chat and say, Hey, I'm iterating on the design.

Vaibhav (51:04.206)
It's... Let's kick it off, I'm good. It's too much UX work for me. I want your app to do it for me.

Dex (51:08.995)
Yeah.

Better UX is coming. We're going to give you more buttons than just the go-forward. We're going to give you the like, okay, keep working on this in a new chat.

Vaibhav (51:17.356)
Thank you. That's actually my biggest gripe in cloud code too, because I think to really like context max, you kind of need to have, you need the ability to build a fork. What I really want to able to do is I want to say like, I want to start from, I want to start from this cloud code and spin up four questions in parallel and then kind of map reduce and bring them back together. And like that's what I do a lot actually, if I had the, if I get the chance. So I do that sometimes in here too, but it's just the UX makes it so hard.

Dex (51:42.551)
Yep.

Vaibhav (51:44.782)
It's too much of a pain to do it in the optimal way.

Dex (51:49.744)
Yeah, that makes sense. Cool, what about question three?

Vaibhav (51:50.71)
How should callbacks be stored? I do agree thread local storage is correct.

And that can be a one-time thing that needs to be initialized.

Vaibhav (52:09.236)
Ref new. I do like that. Or we could pass it as a global static. But then it's unsafe. I don't want to annoy us. yeah, the closures would be the way to solve this. But I do agree that this would be too much work. Okay, thread local sort is fine. What does the initialization API look like? This is actually wrong. It did the wrong research here. BAML project does not actually depend on this.

Dex (52:38.56)
Okay.

Vaibhav (52:39.067)
And that's just like to go back to the architecture diagram that we have.

Vaibhav (52:46.268)
Vaibhav (52:51.598)
The other nice thing by the way about code layer that I personally like is Cloud Code is too contextualized to my repo, but I have like four checkouts in my repo because I'm a heathen and still can't learn work trees, even though we had that episode about it. It's too hard for my brain. I tried so hard. I can't do it. I spent three days trying to min-max.

Dex (53:05.921)
Why don't you just have one repo and make BAML 1 through 4 be work trees? And it's the same, you don't change your workflow.

Vaibhav (53:11.599)
It's too hard to switch and merge. I don't know the git merge commands for WorkTreat. It's too hard to go do that. I tried telling Cloud Code. doesn't...

Dex (53:16.707)
The same as if the branch was local. It's just git merge branch name.

Vaibhav (53:21.006)
My brain is too puny. I've given up.

Dex (53:23.561)
Apparently. Well, you've got a lot of stuff in there. There's just not room for other things.

Vaibhav (53:27.436)
Yeah. So when we're doing this, BAML playground wasm right now depends on BAML project. It now also needs to depend on Bex engine. And that's just a mistake that we have right now that we, as in it's not clear to the system how we did this. And what I need to go tell it to do is to go fix that problem. So I will tell it that.

Dex (53:42.103)
Yeah.

Dex (53:46.741)
say okay, so for question four.

Vaibhav (53:50.638)
Q4, this is actually the wrong entry point. Really, you want to construct a VEX engine plus a...

Vaibhav (54:11.918)
See how onion skin.

construct.

Back to program.

Dex (54:21.463)
Don't send this though because you have sub-agents running.

Vaibhav (54:25.202)
Yeah, I won't press enter right now. See how onions can product... Please do. See how onions can construct a batch program which allows construction of batch VM plus batch engine.

Dex (54:26.733)
Yeah, we're going to add message queuing too.

Yeah.

Dex (54:44.493)
Cool.

Vaibhav (54:44.814)
Then we want the playground to do something similar Okay, once this is done, I'll fire this off. Another reason why I want forking

Dex (54:54.423)
Nice. Yeah, this is usually how I work too, is like I will just queue up all my answers to all the questions in one message kind of thing, but you can do either way.

Vaibhav (55:10.432)
No speech to text today. I will be, I do sometimes use speech to text. I think it's kind of awkward on stream to use speech to text because I'm both thinking about speech in the context of what I'm going to say on stream. And then typing is my context for like typing. Exactly. I'm narrating, but then speech typing is my context break of like knowing that I'm talking to the code and allows my brain to actually like separate the two.

Dex (55:10.872)
molest is giving you shit for not using speech to text.

Dex (55:22.506)
in their rating.

Dex (55:30.795)
Yeah, but you were also narrating, you're also speaking out loud every word that you're typing. As you're typing it. Okay.

Vaibhav (55:38.254)
I have an animal. What can I say? Give me a second. That's so funny. What argumentalization should be used? Oh, that's a great question. Did find the right type, though. Summary did not have this. We're not going to pass raw bytes because we are not animals. Well, we might. I kind of want to use protobuf because that's what we use elsewhere, but I'm not going to. I don't like...

Dex (56:00.034)
haha

Vaibhav (56:05.9)
We could do this.

Vaibhav (56:10.766)
Add JSON serialization via

Dex (56:17.123)
Ooh, JSON.

Vaibhav (56:20.066)
JSON is a little bit tricky. I think we need custom serialization. Huh?

Dex (56:22.115)
Well, it doesn't support functions. It doesn't support functions.

Vaibhav (56:28.206)
Yeah, it's not just that. It's just that it's yeah, desensitization is tricky because we have like handles. So for context, let me open Xcalibro really fast.

Dex (56:37.389)
Mhm.

Dex (56:43.054)
do need me to send you a scene or you got one?

Vaibhav (56:45.774)
I'll just pull one up. The tricky part of our system is like, so we have this thing called like, Bex Engine.

Dex (56:54.733)
You zoom in a little bit. Or make the text bigger. Yeah, there you go.

Vaibhav (56:56.173)
Yeah.

Vaibhav (57:00.088)
How do I make the text bigger on this thing? Exhale. We have a thing that's called Dex Engine. And this communicates, I guess for now it's communicating to Wasm.

Vaibhav (57:16.788)
This is still like WASM, still in Rust code. And this is basically bridging the gap between the two and they're sending data between each other. Inside the Bex engine, we have some horrible things that we've built that you may or may not care about, but it will help explain the concept of what we're trying to do a little bit more in terms of what we have.

Green, green, okay. Yeah. We kind of have a heap. And what ends up happening is whenever you run a thread in the VEX engine, it allocates on top of the heap. And some things need to have long lived lifetimes. So for example, like a file operation, let's say, or a network request, a network request and a file operation kind of have to have like a separate set system that's like a resource, what we call them.

Dex (57:45.763)
Yes, orange and green. The best color combo.

Vaibhav (58:12.6)
that have slightly different lifetimes because of async workflows. And the heap has some ability to access these systems as well. And what ends up happening is this network resources can actually be passed around from your JS code, which is how the virtualization is working. And this gets passed all the way down. And this goes to the Wasm system. So like we can serialize many types from Wasm to JavaScript.

but sometimes can't be serialized. like for example, like the network type, but we still need to build a point to the same object in both the heap and in JavaScript.

Dex (58:50.721)
Okay, so the Wasm is actually gonna call out to whatever JS run time, which actually originally invoked the Bext engine, so you need to like thread it all the way through.

Vaibhav (58:59.06)
Exactly. that's why, for example, when it asked me about the question that came up over here when we were doing this design flow was why can't we just serialize to JSON using JSON serialization? Well, we can't serialize to JSON because some types are not JSON serializable. They're inherently native types that are pointing to things in memory that need to be preserved as such. Yeah, like a function or like environment variable or like a file descriptor, for example.

Dex (59:05.763)
Yeah.

Dex (59:19.457)
Right, like a function. Or an object.

Dex (59:28.129)
Yeah, yep. Okay.

Vaibhav (59:30.158)
So this is definitely correct. We don't want option A, we definitely want option B.

Vaibhav (59:40.77)
This is Q5. We don't want we sometimes.

Send out handles to the rest types.

Vaibhav (01:00:01.172)
We need that to...

Vaibhav (01:00:07.938)
And then what we should really do is something like option B.

Okay, and then I want to make sure that didn't have any more questions for me.

Dex (01:00:17.291)
Yeah, I don't think you also haven't, you haven't given answers to the, to the first one. Okay. Yeah.

Vaibhav (01:00:17.88)
Okay.

Vaibhav (01:00:22.264)
The other ones are just default answers, so I'll tell it that in question two and one. I'm going save this and say, yes, update.

Vaibhav (01:00:41.773)
I'll let it the doc really fast before I go tell it more things. I'm going to go read this now.

Sorry, there's a lot of reading on this chat. Based on performance analysis, it's so sad. I have never read this much in my life.

Dex (01:00:53.421)
That's what good engineering is, lot of reading and thinking.

Dex (01:01:00.365)
great.

Vaibhav (01:01:05.388)
Okay, so I to do a lot of JS allocations.

spawn local that's fine.

Vaibhav (01:01:25.398)
we definitely don't want this. I do not want to pending wasm stuff. We have to make a new channel to go do things. Ooh, that could be very nice. If we can do shared memory, that means you can get way higher performance, which would be very, very quick. What's really interesting is every time I see code say something like high complexity, it's like the most mid thing that I care about. I don't actually care about complexity when I go write things.

Dex (01:01:50.723)
Yeah.

Vaibhav (01:01:52.632)
Cause like the LM is going to do the work anyway. It's equally as complex with the model. The only question is, does it understand it? And it's totally garbage.

Dex (01:01:58.145)
Well, it's like, is the Zen of Python thing, right? It's like, is better than complex, but complex is better than complicated. Like, complex is not necessarily bad.

Vaibhav (01:02:07.584)
Yeah. Yeah, exactly. So like the alum, for some reason, likes to tell me about complexity and I just don't care. I just want correct. I want forever correct.

Dex (01:02:19.693)
Yep. Complex and safe, right? Complicated is like complex and unsafe, basically. Brittle, yeah.

Vaibhav (01:02:21.009)
yes, so this is

Vaibhav (01:02:26.484)
Exactly. Yeah, so I guess option C where we use Tokyo bind and will definitely, definitely, definitely not work because we're gonna have to do callback shenanigans anyway. Yeah, because we have async IO in like fetch, for example, in JavaScript is going to be fetch. It just won't work. Streaming will also not work.

Dex (01:02:34.861)
deprecated WASM

Vaibhav (01:02:48.342)
No actual async runtimes till you use a spawn local.

I do have a question about this. I feel like this part I don't like.

Vaibhav (01:03:05.068)
That part is really nasty.

Dex (01:03:06.093)
JSPI.

Vaibhav (01:03:13.006)
I'm better on show that Russ wasn't running it.

to do boundary crossing. Yeah, this is kind of what I'm kind of worried about. Because I know Prisma ran into this problem, which is why I'm always really careful about this stuff and why I need to ask about performance. I do want to ask it to see if the other approach is going to be better in some ways.

Dex (01:03:37.027)
So the other thing, I don't think we should do this, but it's worth mentioning on the stream, is another thing that I will often do during design is actually fork out of the design flow to do a different type of research. We almost call it, Prus, did you lose your whole thing? Do you have multiple clipboards? Okay, cool. Amazing. was like, holy shit. I do, but I see people do that.

Vaibhav (01:03:56.268)
Yeah, I have clipboards, of course. If you're not using clipboard history, what are you? You're a pleb. You can't be an AI engineer if you don't have multiple clipboards. Exactly.

Dex (01:04:07.681)
not have 10 clipboards. No, what is the thing? One thing I would do sometimes is like fork out into what I call like proof mode or like learning test mode, which is like, okay, I actually want you to go write some little tiny POCs that demonstrate this behavior because sometimes Claude will, every model will confidently say this is how it works and it will miss key details and like deterministic feedback from the system.

Vaibhav (01:04:38.67)
Okay, cool. Let's read this. I do want to go deep on this thread. And this is again why it's forking useful because like I said, I just want to fork on this one concept without really having to do anything else. And

Dex (01:04:47.531)
Yeah. Yeah. I mean, so like you can, you get to high context, you can always create, mean, I can show you, if you create a new session, you can just say like, use the iterate design discussion skill for VBVSysWASM and it will just create a thread and it's like, cool, what do you want to add?

Vaibhav (01:04:59.086)
Yeah.

Another question I really think about is like, why does this actually matter? Like, why does this matter for our performance scenarios? Like, why do I care? Well, because if we're doing shell, if we're doing any sort of encoding between the systems, like if you're calling shell web request, I mean, each of those in the web assembly world is now going to be effectively 15 times slower. And like that's just like, we could do that. I mean, fundamentally it doesn't really matter. data transcode, transcoding doesn't really take that much. Like, like we said, it's like 15 FPS, but if you can make it faster for no reason other than just

Dex (01:05:05.379)
Yeah.

Vaibhav (01:05:33.932)
doing it, like why not?

Vaibhav (01:05:38.712)
There's a new standard emerging. I don't like to care about that. Maybe I'll look this up while I'm at it. Because I find it fascinating. I'm weirdo like this. It's like what JSPI is.

Dex (01:05:50.817)
I yeah, I'm gonna check this out too. But yeah, this is the idea. Okay, WebAssembly JavaScript Promise Integration API from V8.

Vaibhav (01:05:53.742)
What is your experience?

Vaibhav (01:06:00.502)
Yeah, I know that's why I'm gonna look at this. It looks kind of interesting. This is C code. This is, interesting.

That's cool.

Vaibhav (01:06:17.39)
This is

That's kinda cool.

Vaibhav (01:06:27.19)
I guess it's not widely available yet.

Vaibhav (01:06:36.802)
Yeah, we can't do this, sadly. It's not widely available now.

That looks really interesting though. The fact that you can do transcoding from a slightly more native way means that you just use, you get way, way better performance.

Dex (01:06:43.192)
Okay.

Vaibhav (01:06:53.87)
Specific cost per async operations, don't care about that. I hate waiting for this. I hate waiting for tool calls. That's the most annoying thing in the world.

Dex (01:06:59.233)
Okay, so make another one to go update questions four and five with your answers from the clipboard. So just hit C and just do like use iterate design discussion for.

Vaibhav (01:07:03.746)
That's probably true.

Vaibhav (01:07:13.71)
Use the iterate design discussion skill to update the design discussion for questions four and five.

Dex (01:07:15.821)
You gotta sh-

Dex (01:07:21.411)
I don't think it's going to know what task you're on is the thing.

Vaibhav (01:07:26.284)
It will, because I'm on this task.

Dex (01:07:30.243)
You should tell it what task you're on. I maybe it'll figure it out but We don't currently inject any. Yeah. There you go. Amazing. Thank you This coming it's coming. Yeah Yeah, yeah, it's coming. Yeah, it doesn't yeah, cuz this is just a Claude skill that is But yeah, we're not we let me care We're very careful with like modifying people's system prompts or injecting context that they can't see So

Vaibhav (01:07:39.28)
you don't, okay, I see. You gotta put that task on. That's why it messed up last time. That makes so much sense.

Vaibhav (01:07:57.858)
I agree.

Now I'm going to run the erase condition where both coding agents are going to try and write to the same file. I'm going to be very sad.

Dex (01:08:07.068)
that's fine. They'll try again.

Vaibhav (01:08:09.422)
Okay, cool. Well, let's go on. Let's talk about more like engineering things that we found. So like one of things that we're running into now while this is coding is how do we keep maintaining the shipping velocity that we have without really being stressed about this? Well, there's a couple of things. First thing, this RPI workflow is great. These architecture diagrams and tools like Cargo Stow, which enforce the diagram boundaries across different namespaces is fantastic. But the next thing that really matters here to take it to the next level,

I think is actually about like adding workflows. Like we've been talking about this in our team, which like we don't do code reviews. That makes sense. We probably don't really want to have code reviews enforced. But one of the things that we do have, for example, is we do have like performance tests, for example. What the performance tests do is they run the test and then they run the CI CD. I guess this one's fine. One that's merged.

Vaibhav (01:09:01.035)
They run the test and then we actually run like CodSpeed, which is a phenomenal tool to run performance tests. And what it says is runs a performance test. tells you if anything substantially changed. And if it does, it actually fails the PR and you have to manually go and approve it in some UI that's, I looked at this performance regression and it's acceptable. And that's really, that's really, really useful. Exactly. And then the check won't pass otherwise. And it's a mandatory check for us.

Dex (01:09:18.744)
Mmm, and that's the only way to make the check pass.

Dex (01:09:28.227)
Okay.

Vaibhav (01:09:28.622)
And what that does is it makes life much easier. So now the next step is how do you build that similar kind of workflow into here? Well, you can imagine a new rule set built into Cargostow, which work during CI CD. Cargostow will actually look at the diff of certain crates that you explicitly called out and a certain crates have too high of a line number in them. It failed until you manually approve it and say, okay, I have said that I've looked at this code specifically and I approve it. So like, for example,

Dex (01:09:56.141)
So you want to build a tool that basically requires, like basically requires human review for the check to pass if there's like more than a thousand lines of code change.

Vaibhav (01:10:05.46)
Or some arbitrary specifier. It could be an LLM prompt that decides if it's complex enough. So like, for example, our heap.

Dex (01:10:10.861)
Doesn't GitHub support this? isn't there like a review rules or something?

Vaibhav (01:10:15.796)
Nah, it's too complicated to go set up. I really want an LM prompt, basically, to go do this.

Dex (01:10:19.395)
So you wanna write a custom rust crate to do it instead.

Vaibhav (01:10:24.17)
We're just going to do it. It's easy. Normally this would be hard, but this is going to take me an hour and a half of my time to go by code this and it'll just work. and it's effectively zero effort. There's other things we can do. For example, we can enforce things like if the binary size is too big, require manual approval. And there's a lot of small things that we can do on top of this. That'll just do this for us. And then we can also build Slack integration, get up as a similar thing called like owners, but owners is too heavy. It's like two file-based.

Dex (01:10:30.295)
Yep. Yep.

Dex (01:10:41.667)
Okay.

Vaibhav (01:10:52.972)
I don't care about specific file. I care about the magnitude of the change. And that's the tricky part. That's where there's no real system that does this. And once you get, once you build around the magnitude of change, then you can say something like, Hey, if someone made like a thousand line change, have them at least manually approve and say they looked at the code. And what that does is it just puts a little bit of a brain in someone's head that says, I'm, I approve no slop. All right.

Dex (01:11:14.081)
Mm-hmm. Yep.

Vaibhav (01:11:17.708)
because you still want no code reviews for like small changes because like code all this other stuff are just shipping code all the time. And like if you have good test coverage, you have really good rules on your codebase, it's fine. But for big system, go ahead.

Dex (01:11:28.419)
Well also, I was gonna say, it also requires a lot of trust. like, I think, at my first job we had a rule, it like, there were no required PR, like you didn't have to have a PR to merge a pull request. No pull request was, sorry, you didn't have to have a review, like it wasn't enforced by the system. Nobody would ever merge a PR without a review. It was like enforced by culture instead of being enforced by the system. Yeah.

Vaibhav (01:11:53.708)
Really?

Dex (01:11:55.907)
It basically never happened, but there was no rule, there was no admin override. Anyone could technically click the merge button. By the time I got there, was like 20 engineers on the back end platform team, and you didn't even think about it. It was basically safety through culture rather than through systems that enforce stuff. The same thing with no one had pre-push or pre-commit hooks. It was like, you just ran the tests. It was just part of how you did your thing.

Vaibhav (01:12:22.34)
this is at the anyway, coming back to the original code, option B is actually option B is actually complex. was in this case correct about complexity. It turns out the option that it proposed was basically building its own walls and bind gen implementation using message channels, which is absurd. We're not going to do that.

Dex (01:12:23.883)
Yeah. All right. Yeah. Let's, let's go build some more Wazim.

Dex (01:12:29.603)
Hahaha

Vaibhav (01:12:47.278)
Yes, we will not do that. will refrain and hold myself back and not do this. I would like to. I would like to!

Dex (01:12:54.231)
That's for next week, right? Just build your own, like, fork of wasm-binding and futures from the ground up.

Vaibhav (01:13:00.718)
I would like to do this, I do draw a line.

Vaibhav (01:13:14.054)
Yes, I see. I want to actually look at the code. I wish it would give me some code that let me go understand it a little bit more.

Dex (01:13:21.911)
This is what I say, it's like what you really need to do is you need to send it off to like, can you go build an end-to-end example of each of these?

Vaibhav (01:13:27.111)
This is hilarious. There are no real zero production examples of anyone doing this.

Dex (01:13:33.027)
amazing.

Dex (01:13:37.859)
Well, also the Clawd deep research, the Clawd web search researcher is not as thorough as like a chat GPT deep research. I wouldn't, just because it said I found nothing of this on the web doesn't mean it hasn't happened. Yeah, it's a good signal. Yep.

Vaibhav (01:13:46.989)
It probably means that it's not a common pattern on the internet and that's probably a good enough reason for me not to do it. I've never seen it say this for any sort of coding pattern before, by the way. There's zero examples of someone using this in production. That's a first off for me.

Dex (01:13:55.661)
Hahahaha

Dex (01:14:00.097)
Yeah. Theoretically practical. It's funny that like models will suggest things like this, that it's like, no one's ever done this before and you probably shouldn't, but like we could.

Vaibhav (01:14:10.306)
Yeah.

Dex (01:14:12.259)
Cod's up for whatever.

Vaibhav (01:14:15.854)
This does sound fun. Maybe I will build a high-performance version of WasmBindgen one weekend. That sounds very fun to go do. But I will not do this. Okay, so this is garbage. Yes, let's add context to that part.

Dex (01:14:24.76)
Yeah.

Vaibhav (01:14:39.832)
Let's add context to that part and definitely mark that option B is basically irrational.

Dex (01:14:46.595)
Do you know which one you wanna do?

Vaibhav (01:14:49.038)
option A. We'll take the performance cost for now and then I'll just profile and see if it's actually faster.

What I really love about this task, by the way, is when we're doing this in parallel, what's really nice is when I told her the feedback of like, hey, some of these types have some of these types need to be constructed through Bex engine and Bex program. It actually called the code base analyzer and did another micro research, which is fantastic for me because then I didn't have to go tell it everything. I did a contextualized research on the spot.

Dex (01:15:01.281)
Yeah.

Dex (01:15:10.487)
Yup. Yup.

Dex (01:15:16.823)
Yeah. Yup.

Vaibhav (01:15:20.27)
And now in theory, it should have all the design discussion. The file keeps getting modified. Yeah. Yeah. That's the only problem with coding agents. They don't understand race conditions. We need files that allow for multiple editors at the same time by default. A file system that does that. It looks like a virtualized file, but it kind of behaves like separate files. That would be fantastic.

Dex (01:15:24.696)
it's trying to do edits, but it's competing with the other one.

Dex (01:15:42.883)
Well, you need like, basically you need like the YJS like CRDT thing, basically.

Vaibhav (01:15:47.842)
What is that?

Dex (01:15:49.515)
It's like how Google Docs works is basically like you have like a log of operations and then they're like deterministically mergeable or you can like bounce. It's like, okay, yeah, now we can't have two things right into the same file, but like that would at least let you write to two sections of two different sections of the same file.

Vaibhav (01:15:51.855)
sure yeah, but-

Vaibhav (01:16:08.216)
Yeah, okay, so now we're done with this. I think this one is almost done. So now I just need to go read the code again, read the design again.

Dex (01:16:14.869)
I would keep an eye on that one because if it gets too many, like the file got modified errors, it might resort to like weird said shit and stuff. But yeah, okay, looks like this is on the right track. just, when it keeps trying to do edits, I have seen it like break out, crash out into weird approaches to like, I gotta figure out how to edit the file.

Vaibhav (01:16:31.95)
This is why I usually hate doing parallel rides. This is why hate doing parallel rides, though. It's too risky. It's like, way too risky for me. Okay, it's And I think the permalinks are available. I think people asked for, are these design docs gonna be available? These design docs are in a private reaper right now, but I guess there's no reason that they have to be.

Dex (01:16:41.623)
Yeah, okay.

Dex (01:16:52.343)
We'll copy them in for this episode. I think we can just copy the folder in so that people can see them.

Vaibhav (01:16:56.014)
I don't think the repos has to be private. I can probably just open it up.

Dex (01:16:59.807)
Okay. You should make your repo public then. Public all your design discussions. Open spec.

Vaibhav (01:17:05.024)
Yeah, I don't know about OpenSpec. Maybe I'll copy and paste parts of it, though. I'll think about it.

Dex (01:17:09.987)
When I do this, I just grab the docs and drop them in the AI that works, like the episode GitHub folder is usually what I do. Yeah, and then anyone can come see them. Yep.

Vaibhav (01:17:14.796)
That's probably the right way to do it. I'll just grab all these from this folder inside this task and just swaddle and put them in there. Results. But also I hope many people realize it's not actually just about the final artifacts that we create. A lot of this is the process that I'm going through. Like when I'm doing this work, I am not exactly like I, have to really understand the trade-offs that we're making. And that is purely this, that's engineering. And there's no shortcut to that. How am I using Obsidian?

Dex (01:17:29.443)
It's forcing you to think and ask the right questions and stuff.

Vaibhav (01:17:42.478)
If you notice, every time I read the Markdown, I only ever read it through here because Obsidian is one of the best systems to read Markdown. I've yet to see anything better. And the reason that it's better, by the way, just to be more concrete for anyone that hasn't used it before, is specifically because it has this reader-writer mode and allows me to switch to reader mode and prevent myself from editing the doc by accident because really I just use the model to edit the doc.

Vaibhav (01:18:07.802)
Question four, this is updated. I want to read the summary first. I always read the summary before I do anything else and it sounds like it has more...

Does it have? Okay, I need to go read this more again just in case.

Dex (01:18:20.065)
Yeah, I don't think it ever got your like, I accept the recommendation for question one kind of thing.

Vaibhav (01:18:23.212)
Yeah. Yeah, question four is the original design key references. nice. Okay, I figured this out. figured out how I want to go do this. That's perfect. It now knows how to pass that in. Key references, we're going to pass this in as well. And right now, nvars are not bound to the sysops. We'll have to go change that later. Compile source of this. Yep, we have a custom thing. Contains our camera for GC coordination. That's exactly what we really need.

must be wrapped as Watham objects.

Vaibhav (01:19:01.334)
Yeah, exactly. So art can keep rough subjects alive.

Dex (01:19:19.511)
Okay. And then yeah, we should just give this one more like skim over before we go to the outline.

Vaibhav (01:19:24.992)
Well, I'm going to kick off the outline test while we read the design doc one more time, because again, pipeline, as much as you can pipeline, as much as you can prefetch, the better off you'll be.

Dex (01:19:35.095)
Okay, but the outline is really, really fast. The outline rarely does research. Yeah, you can kick it off. Okay, yeah, you have a bigger code base than me.

Vaibhav (01:19:39.038)
it takes, it takes time for minds. This kind of code, found that it actually takes a while. Yeah. I think it's just like the complexity of the system. got wasm, you have like features across runtimes. It, it just takes a while. I'm like worst case it's ready before I'm done reading it. Who cares? I just throw it away if it's bad and I redo it again. All right. My time is more valuable than anything else.

Dex (01:19:52.15)
Okay.

Yep.

Dex (01:20:02.335)
Yep, human time. Human wall clock time.

Vaibhav (01:20:04.654)
human time is the biggest, exactly. We're only optimizing for wall clock time, not for token time. Because the other problem is like, if I get distracted, the worst thing that can happen is I get distracted and now I'm off like doing my own thing. And I go on Twitter or Reddit or something for like 15, 10, 15 minutes and my brain is switched content for the page, everything in. So it's actually not just a matter of like, I'm trying to optimize for time. The biggest problem is just that like if I'm...

Dex (01:20:27.458)
Yes.

Vaibhav (01:20:33.55)
If I'm screwed, then I just can't. Yes, there we go.

Okay, cool. While this is running, let's go back to reading this.

Okay, we already have all the patterns, all design questions and results. I hate the fact that we don't keep all the options around.

I wish it would dextr, we gotta fix that. Like once decisions are made, I wish it would keep.

Dex (01:20:52.984)
Huh?

Yeah, that's coming. I fixed our background agent and that one is now in the queue, so it's coming.

Vaibhav (01:21:04.33)
Nice, I'm excited. So while some callbacks, this is great.

Dex (01:21:07.031)
What ViBob is referencing is he wants to see the short description of the options that we didn't choose, not just the ones that we did choose.

Vaibhav (01:21:13.184)
Exactly. And again, the reason for that is because it's all about context. like if the model should know later on, if I do a different step, the model should know that I chose explicitly not to follow this pattern. The model and a human that looks at this should also be like, I didn't just, I didn't just buy this. I actually did make some decisions along the way, and I might've made wrong decisions and we can talk about that. But looking at this doc alone doesn't allow for discussion to happen again. It's like basically a done deal in any way.

And when I often see more, like more junior people sharing with me, like how they use AI, the hardest part with it is like, it literally just feels like they hit tab, tab, tab, tab, tab or enter, enter, enter, and put no thought or care into it, which yeah, which basically means I have to review the whole thing. Like I can't skip any parts of the review because I'm like, you put zero thought into it. So I have to assume that you put zero thought into it, the whole place.

Dex (01:21:55.851)
except whatever the model wanted to do. They didn't look at options. Yep.

Dex (01:22:06.231)
Well, and it's, if you're just gonna accept everything that the AI chooses, then like you're not doing the thinking, which is like what the engineers are being paid for. Like if I wanted to just take Claude's output and turn it into a PR, I don't need another engineer to help me with that.

Vaibhav (01:22:12.45)
Exactly.

Vaibhav (01:22:20.214)
Exactly. This is a beautiful design. I love that our SysOps is so modular. Now we can do SysOps Wasm. Boom. It just takes in the callbacks and just binds everything together.

Dex (01:22:32.951)
guess.

Vaibhav (01:22:35.338)
It wasn't fetch and you get the external value you call the sys you pin.

Vaibhav (01:22:45.55)
and then it awaits the promise and we do from JS value.

Vaibhav (01:22:56.238)
Okay, I have to check a few things. Where does the call back? the call back comes in from here. Perfect.

Vaibhav (01:23:06.859)
Okay, these are walls and callbacks.

Vaibhav (01:23:12.782)
That's cool because it's thread local every single method when we actually call sysop just checks if we have this if it doesn't Then we basically just give unsupported

This needs to be co-jinned with a macro. I'm not handwriting all of these.

Dex (01:23:29.419)
Okay.

Vaibhav (01:23:32.15)
Well, we have infinite syscalls. And anytime we add a new syscall, we want to macro it whenever possible.

Dex (01:23:34.563)
Yeah.

Vaibhav (01:23:41.422)
Yes, okay, so let's the code. This is the should expose project engine perfect. It doesn't take in a project. That's wrong

This takes in a program, not an engine.

Vaibhav (01:24:00.71)
I'll see you at the outline for your set out.

Dex (01:24:06.273)
Yeah, this is, yeah, okay.

Vaibhav (01:24:08.995)
it does. Okay, it does. It adds a product pipeline to Bax program. Okay, cool.

Dex (01:24:18.337)
Yeah, and this one read the research too, right? If you go back, I think it should show on the right tab, like all the source, yeah, all the reference documents are on the right. So yeah, as we build this up, basically every document you create becomes part of your accumulated context window, and you're all working towards kind of the final artifact is that plan that then can be basically iterated over with one context window per phase.

Vaibhav (01:24:25.442)
Yeah, it did.

Vaibhav (01:24:43.726)
And you can see what we're doing here, for example, like right now when we send values across the bridge, like we turn an array that's a Rust array into a JavaScript array. That's just what we do. We turn a media type, which is a weird handle that points to a Rust object, into a handle. And that just copies the handle and sends it across. Same with resources, we just send a handle across. So the frontend knows that these are different types that need to be treated differently.

Dex (01:24:48.856)
Yep.

Dex (01:25:07.223)
Makes sense.

Dex (01:25:17.837)
Okay.

Vaibhav (01:25:19.534)
Cool, I that's good. There's one edge case that I saw.

Dex (01:25:21.037)
So you had two bits of feedback, right? You had the program thing, which you think it's gonna figure out, and then there was one other one. You were like, we need to, we need to co-gen. The other one you said you needed to co-gen that with a, a rather.

Vaibhav (01:25:24.866)
Yeah, but I think that one I figured out looking at the prompt for the next one. Everything else I think is good. I don't really have too much callback. Yeah, that was macro stuff, but I'm not worried about that because I have a separate PR in a separate workspace that's doing that.

Dex (01:25:39.48)
I see. Okay. So for now, this is going to be ugly, but then you're going to update it later. Okay.

Vaibhav (01:25:40.653)
Yeah.

Yeah, exactly. And this is what I meant. The structured output actually takes a while along the way. And we still are going to get like a 15 seconds behind the scenes. And I'm not going to make everyone watch me actually implement this, because once you produce a structured output, I let it rip on a while loop, and it just runs the whole implementation, assuming the structured outline is good.

Dex (01:26:07.363)
Do you use the implementer agent in Riptide?

Vaibhav (01:26:10.614)
Yeah, I do. I don't really think about it. I just let it run.

Dex (01:26:13.911)
Yep. Yeah. Once, once you're happy with the strip, I actually want to add a slider for you, like an autonomy slider, where it's like, once you approve the structure outline, it literally just rips until it's ready to send you a PR. Like it makes the plan and then it starts the work tree and then it creates the implementer and then it just goes.

Vaibhav (01:26:27.15)
That would be fantastic. Well, while we're here, I know we're going to start running out of time soon. Do people have questions? Feel free to drop them in the chat for Riverside. Obviously, we'll have questions later on that people might have that they can send on the Discord. But do people have questions about this workflow so far?

Vaibhav (01:26:54.326)
Let me know if there's questions going on next. I'm going to read.

Dex (01:26:58.163)
cool. Can't wait to see if some of the prompts in the AI that works repo. Learn so much. I'm forever grateful. I will continue to learn more about BAML. Joined in late. Can you summarize? no, you can watch the recording. No, I'm just kidding. so we're going through, we're building a feature on BAML, which is, how would you, this is basically adding like the, the support that existed in the BAML like core.

Vaibhav (01:27:13.516)
I'm just giving a summary, Dex.

you

Dex (01:27:27.875)
language repo that powers the VS Code extension and stuff and basically plumbing it through into the actual like BAML VM here, which is the BEX engine and the Sysbinding so that the kind of new and improved fancy like Turing complete programming language BAML can access all the same WASM stuff. is it two way? it like, is basically the idea is like you want to be able to evaluate BAML like new BAML code in the VS Code extension or is it the other direction?

Vaibhav (01:27:57.566)
I want to run BAML code in the VS code extension without you having to do anything. like, for example, like how do you run the new BAML code? The new BAML code allows you to call like shell. How do you run shell in a WASM environment in like a browser window? So we have that bridging for you. How do you have a virtualized file system? Because like you want to make a file open file read, write, we build that bridging for you. How do you bridge network requests? For example, cores requests are a huge problem. If you're in a browser window, because like all these end NDP is disabled cores.

Dex (01:28:05.954)
Yeah.

Dex (01:28:11.981)
I see.

Vaibhav (01:28:27.232)
It's so annoying. How do you solve that problem?

Dex (01:28:27.789)
Yeah.

We got another question. ETA for alpha release. Stay tuned. We'll announce it. I didn't hear if you saw, are you leveraging the JSON canvas spec with Obsidian at all? Would you consider that instead of SVG ViBov? Okay. And then Yibin had a question. Do you ever run into the issue where you run out of context when trying to do research?

Vaibhav (01:28:44.502)
I have no idea what that is. I have no idea what that is.

Vaibhav (01:28:55.79)
I find that because I'm saving a lot of these documents personally along the way, the documents are kind of my contacts. I just like restart a context window with their documents, but I have run out of context and honestly, I just use auto compact. It works fine.

Dex (01:29:09.015)
Yes, can, depending on what you do, I am fine. If I'm, especially if I'm feeling very lazy and I'm just like playing Claude, I'm just like riffing out some random shit, like I'll YOLO it and just auto-compact, I don't really care. It's more like when you're super dialed in and you're like, I'm gonna go ship a thousand lines of code, that's when the compaction becomes really important.

Vaibhav (01:29:29.998)
Okay, and this is where these questions get kind of garbage. This one is trivial. There's nothing special.

the cd call function

Vaibhav (01:29:54.595)
Let's add this.

not a concern.

or handling cranula.

Vaibhav (01:30:09.902)
We would like some decent error types.

Vaibhav (01:30:18.926)
What I don't like about this error handling granularity problem, the way, is I know that this is a design problem and whatever thing that we constructed is going to be kind of bad because it's going to go and update this plan with this error conversion thing. I just don't like that concept. But I will deal with it and I will live with it.

Dex (01:30:24.524)
Yeah.

Dex (01:30:35.573)
Yeah, there's, yeah, go ahead. Yeah, there is kind of a world where like when you look at the enhanced RPI workflow here, it's kind of, part of it is like very structured steps for the human to do and different types of work, but it's also like give the model four options to ask questions about the problem and give you four options to re-steer if it gets something wrong.

Like the research comes out, the research has open questions. When you go from research to design, the design will go find the answers to those open questions. And when you go to design to structure, you may also get like more open questions. And it's just like, how do we guarantee that we're being like thoughtful about any, every like edge case and corner case and detail before we go to implementation.

Vaibhav (01:31:28.394)
Exactly. I'm going to need to read this a little bit more. This stuff is really good. And specifically, one of the things that I'm really looking for is how modular is this? The phases sometimes feel a little artificial because sometimes I just do all of it in one go.

Dex (01:31:41.599)
I often tell it to just combine the phases. I'm just like, phases one, two, and three can be one phase. It's really about at what point is there something worth checking. The phase should not be so big that the model can't complete it in one context window.

Vaibhav (01:31:47.011)
Yeah.

Dex (01:31:57.473)
And it should not be so small that there's nothing to verify at the end. And there's your sweet spot. And it depends on your code base and your taste and how you test things. And if you have a front end web app versus if it's all a programming language, like the things that can be verified automatically is like on a spectrum there.

Vaibhav (01:32:14.996)
Okay, so I found one big design bug, which is this one, which is the BEX, it's adding some new compile.rs. That should just live in the compiler toolchain. It shouldn't live in the playground specifically.

Dex (01:32:15.326)
Yep.

Dex (01:32:22.68)
Yeah.

Dex (01:32:26.027)
Okay.

Vaibhav (01:32:28.494)
That's good to know. I can fix that.

We just...

Dex (01:32:33.219)
While you're giving it that feedback, there's thoughts on plan to implement as is popularized by Cursor versus the more extensive RPI flow.

Vaibhav (01:32:41.726)
I thought you might thought personally like plan to implement only really works for simple tasks. There's no freaking way this wasm thing is going to be one shotable at the end of it. If I do plan to implement, it's just not enough. There is not enough concept here.

Dex (01:32:45.677)
Go for it.

Dex (01:32:55.192)
Yeah.

Dex (01:33:00.323)
Yeah, the way I think about it is like it's a spectrum, right? Like the amount, the like size and complexity of the hardest task you can solve, the ceiling goes up with how much of this context engineering and design that you're willing to do. And so if it's like literally change the color of a button, like, yeah, just tell Claude, hey, here's the file, go make it blue.

Vaibhav (01:33:15.598)
Exactly.

Dex (01:33:21.471)
And if it's a slightly bigger task, then maybe just a plan implement is good. But as the tasks get larger and you want to actually ship large complex things across many modules, basically it's like the payoff of doing more context engineering up front to build a really, really good plan is worth it.

Vaibhav (01:33:41.174)
Like, like for example, just so everyone knows here, like BAML playground wasm is going to now take a dependency on BAML compiler HIR. That is architecturally incorrect. Stow will catch that cargo stow that we built will catch that dependency. it'll like, let's flip the diagram. Exactly. It's going to start building the dependency on this. This is going to start depending on like BAML H compiler HIR. I do not want that arrow to be drawn. It's invalid. I also don't want an error to be drawn where this thing.

Dex (01:33:53.965)
but you don't want to catch it. It's easier to catch it now than halfway through implementation.

Vaibhav (01:34:09.902)
where this thing suddenly has to go make its own compiler inside of itself to make the program stuff that we want. It shouldn't do that. That should be a thing that BAML Project can do or Bex Engine can do. So when I go look into this, what I really want to do is want to make sure this architectural thing is caught. And we talked about a lot of design stuff up until now, and it made one assumption here. If in the research plan, if it was less granular than the workflow that we're doing here,

Dex (01:34:15.203)
Yeah.

Vaibhav (01:34:39.766)
It's very possible this step would have been an assumption that was made by a prior step. And it would just never have been revealed to me and the code would just be slop at the end. And then I would be screwed because then I feel like the process of AI engineering didn't work. And I think that's why so many people feel like the process of AI engineering doesn't work because they try a simple thing, works. They try something complex like we're doing here for Wasm and it doesn't work at all.

Dex (01:35:02.989)
Yeah.

Vaibhav (01:35:05.326)
The real way to do this is just to sit and like understand the intricacies and like the amount of nuance that you have to go higher is like you have to read this line. And like, it's very easy to scroll through this file, be like, yep, yep, yep, yep, yep, yep, not catch this line. And like, that's, that's the hard part, to be honest. It's about having focus to actually go read this.

The nice part is, in my experience, when I have gotten this right, and I've actually detailed and read this, the amount of slot that I generate is very, very little.

Dex (01:35:36.343)
Nice.

Vaibhav (01:35:36.867)
And often I one shot the whole implementation as long as the phases are actually correct. Sometimes, sometimes it one shot.

Dex (01:35:41.923)
Did you, I'm sorry, did you give it the feedback? Do you want to keep this running while we're wrapping up here?

Vaibhav (01:35:47.47)
I'm probably going to have to, I think we're nearing two hours. I don't think this will finish and I'm going to close my laptop and then this research task will take too long. This is like a little bit more fundamental thing that I missed earlier.

Dex (01:35:55.043)
Okay, cool. will, Vibov will ship this at some point and we will link the PR in yeah, we'll link the PR in the show.

Vaibhav (01:36:03.15)
this is gonna merge. Like, I need to do this anyway. This is my this week's task.

Vaibhav (01:36:12.076)
Yeah, it will definitely have landed by the time you guys see the episode live on YouTube. For sure.

Dex (01:36:16.801)
Yeah. I have one more question and then we can kind of wrap this up. But Eben says, have you ran into any issues with RPI with massive tasks, e.g. tasks so large that even RPI starts to hallucinate, or do you usually just split the tasks into smaller ones so that doesn't happen in the first place? What do think?

Vaibhav (01:36:39.662)
What are your thoughts?

Dex (01:36:41.155)
Yeah, I I put it in the chat. It's like, you can always do multiple researches. You can always do multiple plans. I think Kyle shipped a PR last week that was like 20,000 lines of code and it had...

like three structure outlines and then split it into like three or four different plans and like ship it in two parts. But part of it is like, yeah, at a certain point there's a, if you want to ship a 10,000 lines of code in a single plan, like that's just not gonna, it's gonna eat too much of the context window just to read the plan. And so like, yes, as it was always true in software engineering, the more you can break down your tasks, the better. And you can use AI to help break down these tasks. But usually what I will often do is like, if it's really, really big, I will do a bunch of

multiple research files and then create a structure outline that will be like 10 phases and then when we go to plan writing I'll have it carve out just the parts of the plan. Like I'll do like plan for phases one and two because they're actually huge. Plan for phases three and four because that's actually like an individually shippable thing and you can work back and forth with Claude to get a feel for...

brainstorm and iterate on like how can we break this up? How can we reorder the phases so that each of these chunks is like independently shippable?

Vaibhav (01:38:02.35)
I'm going show you guys something just to give you guys an idea of how big these plans versus things get. You guys can like roughly get a rough idea of this. I'm just going to build a tree of every single file in here and then also just tell me like how long everything is.

and they'll give you an idea of at least what I've been doing and how complicated it ends up being, roughly.

Dex (01:38:28.353)
Yeah, I'm excited to see this.

Vaibhav (01:38:30.958)
And it'll give you probably a range.

Vaibhav (01:38:36.95)
And then I will have to call it quits because I do have to go to a meeting.

Dex (01:38:40.258)
Yes, sir.

Dex (01:38:47.107)
I feel like every week on this show... Oh yeah, here we go. This is a number of lines.

Vaibhav (01:38:47.703)
code please okay okay so number of lines is like anywhere from like

Dex (01:38:58.679)
Yeah, the plans end up being around a thousand, but everything else is much smaller.

Vaibhav (01:39:01.261)
Okay, I don't know, man. I don't want to think about this. This is not a thing I want to think about. Looks like Cloud could come up with patterns for us.

Dex (01:39:06.347)
Yeah, yeah, Yup.

Vaibhav (01:39:15.242)
and we'll see. So I've done like maybe how many things have I done?

1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12. 12 tasks on this. You can kind of get an idea. Tickets usually start anywhere from 2 to 70 lines. I had some really big ones. It goes to research questions, which are around this much. Research is anywhere from 400 to 1,000. Designed questions are roughly half that. Shows are pretty low, and then my plans go anywhere from 3,000 lines.

depending on how detailed it's getting. Yeah. Yeah, go for it. Yeah.

Dex (01:39:51.703)
Yep, this is cool. Can I screenshot this for the episode?

throw this on the whiteboard. This is fun. And I'll grab that other whiteboard from you as well. We'll put that on the GitHub.

Vaibhav (01:40:03.246)
And for other context, if I actually look at the code review of how big some of these have been, can show you guys how big these code reviews get as well. Because I've shipped a lot of this code already now.

Vaibhav (01:40:22.766)
Like, you can just look at this. So like, I finished this, which is like adding syscalls of fetch. It was like roughly like 800 lines of code fully done by this workflow. I wrote a, I did not write a single line of code, but I did review all of it with the same level of detail that you're seeing over here. And it worked one shot, no extra work. This handle code, I think this one is another one, like 500 lines of code. Mostly this was like a refactor because I found a bug. I found some slough in some previous system.

Dex (01:40:33.698)
Nice.

Dex (01:40:46.872)
Mm-hmm.

Vaibhav (01:40:52.398)
This one is like, added another 800, 900, like about 900 lines of code is what I added. This is like some stoke wrap. That one is different. Added a debugger. There's garbage collector that I wrote. This is funny.

Dex (01:41:12.769)
this is the thing we were doing, the galaxy brain.

Vaibhav (01:41:15.662)
Yeah, exactly. This is 4,000 lines of code fully generated by this thing. It's a full garbage collector that's like memory safe. I think we had one race condition bug that we caught post this. And we also caught the race condition bug by leveraging AI, funnily enough. Like it was a weird memory race condition bug because we write some unsafe code in here. And then this actually finished off the garbage collector. There's some pretty complicated, we have, anyway, we use like

something called like a semi space algorithm. And I know what I knew about like generational garbage collection, but I didn't know about like semi space garbage collection. And it's just like interesting how fast you can learn stuff and implement things from like idea to merge. It's so fast now the world is such a magical place.

Dex (01:42:02.659)
Exciting. I'm excited.

Vaibhav (01:42:07.126)
It's been really interesting coding within this workflow. I really, really enjoyed it, Dexter.

Dex (01:42:12.799)
Amazing. Yeah, I like your comment about how you are now exhausted all the time because you can actually produce code at the speed of thought instead of at the speed of typing.

Vaibhav (01:42:22.286)
Exactly. That's literally what I'm doing. I'm literally shipping as much, and you can go to a refund, can see it. We're all just shipping as much code as possible at the speed of thought, which is just mind boggling in my eyes.

Dex (01:42:30.797)
Incredible.

Well, lots of new stuff coming. I can't wait to share it with you. This was super fun. I learned a lot. It's always fun to watch people use our stuff and for everyone still watching on the chat, keep an eye out for the launch coming soon. We're doing some stability stuff and rolling out to some more design partners, but hopefully to be able to give people a solo hobby version of this soon so you can mess with it for yourself.

Vaibhav (01:42:58.54)
If you guys find these interesting, all we ask is go check out, join the live stream and come ask questions, watch the videos after the fact. You should hopefully see an episode for next week pretty soon going live. We have most of our episodes starting to get prepped. We do these episodes every single Tuesday at about 10, 10 a.m., though the episode will say 10. And once you're...

Dex (01:43:23.745)
And shouts out to producer Kevin, by the way, who has been helping us with a lot of things. I think you've seen him as a guest on some of these shows. He's automating. I know we did an episode about automated AI that works workflow. And then that thing was unmaintained and it was no longer usable. So now we have a very good engineer helping to run the show here and he rocks. Thank you, Kevin. I don't know if you're going to see this, but I'm going to send you a thank you in Slack anyways.

Vaibhav (01:43:27.085)
Yes.

Vaibhav (01:43:49.934)
Yeah. And then we'll see you guys next week.

Dex (01:43:53.763)
See you guys next week. Thanks everybody.

Vaibhav (01:43:59.534)
All right, what do
