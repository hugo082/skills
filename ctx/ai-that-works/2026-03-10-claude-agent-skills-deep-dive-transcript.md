Dex (00:01.679)
What's up, dude? So I think Vibop put this in the chat. We are gonna be starting at 10.15 now instead of 10 o'clock just to make everybody's schedule easier. I know a couple people had to wait last week. So from now on, you can show up at 10.15. We're gonna start this episode for real at 10.15. So we have six minutes to kill. If people have questions in the chat, we'll do a mini AMA.

Vaibhav (00:02.7)
What's up, what's up, what's up?

Vaibhav (00:23.224)
We're just gonna yeah.

Dex (00:30.511)
or we'll just bust each other's balls, I don't know. I,

Vaibhav (00:33.486)
That's right. This part will not be in the recording that you get later.

Dex (00:40.223)
Okay, cool. So this is a privilege thing. I want to say that I want to apologize for ViBov's continued mediocre audio. I actually bought him a microphone for his birthday and I guess the package got stolen off your doorstep.

Vaibhav (00:50.094)
Yeah

Vaibhav (00:57.24)
Dude, that was so sad. I'm so glad you got the refund. We'll get a, I I am literally ordering you right now. Dude, I'm hurt. But no, I agree. I'm gonna order this right now and then I will actually get this done by next week.

Dex (00:59.821)
Yeah, I got the refund. I sent you the one, you should just buy it. Sorry. Birthday present revoked.

Dex (01:14.255)
Nice.

Vaibhav (01:17.344)
It's actually just looking at it right before the skull. It looks pretty nice.

Dex (01:24.911)
Yeah, it's fine. It's a good microphone. What are you guys working on on Bandwell these days? I use a mix of... If I was going buy a new mic, I would buy that one. I used to buy this other Yeti one.

Vaibhav (01:28.897)
Exactly what he is.

Vaibhav (01:34.52)
No!

Dex (01:39.213)
is also.

Vaibhav (01:39.298)
I had a Yeti for a while. I don't know where my Yeti went, but I had one. It was pretty nice.

Dex (01:43.119)
The problem with this one is like, have to kind of like, without the, like, I had to buy the pop filter and the, like thing that keeps it from vibrating too much when the table moves and like the arm. Cause you really want it like, unless you turn the gain way down and you put it right close to your face, it doesn't, it like, it picks up too much background audio and stuff.

Vaibhav (01:54.327)
yeah.

Vaibhav (02:06.765)
Do you guys want to see something really cool for the people that are online right now? Okay, I'll show you something really fucking wild. So as you know, we've been working four minutes. I can do it.

Dex (02:09.271)
Yeah, show us a cool thing, dude.

Dex (02:14.371)
You got four minutes.

Vaibhav (02:22.195)
channel. Screen tab.

you're not gonna be watching this one.

Vaibhav (02:36.045)
How do I find my own listing videos?

Vaibhav (02:43.009)
So I'm in the second.

Vaibhav (02:51.649)
Okay, so I'm gonna show you guys something interesting. So we've been working on our virtual machine. I'll show you some interesting stuff about how it actually works and kind of show you what the most interesting parts about it are. This part is just describing how virtual machines work in general. What's really interesting is we built Async Await in a totally new model that hasn't been done before in any other language.

And what the really interesting paradigm is, it's almost like colorless async await. And what that means is from a developer, yeah, exactly. So from the language's runtime perspective, there's async await. But from a developer's perspective, you don't have to think about it. only, exactly. You only use keywords if and only if you want parallelism. Many times when you're using async await, you don't actually want parallelism. Sometimes you do.

Dex (03:21.039)
colorless.

Dex (03:32.547)
You don't have to put in the keywords everywhere.

Dex (03:44.109)
you almost always want to await, and it's like the special case is you don't await it, and you just run these two things, and so you're flipping that, so I only use a keyword if I want to not await it.

Vaibhav (03:50.189)
Exactly.

Vaibhav (03:57.518)
Exactly. You basically go do it. And we have a whole execution model that makes it work. But what's really interesting is this execution model supports probably the most interesting behavior that I've seen, which is because of the way that we bridge, because of the way what we call it is bridge into every other runtime. I think that's at the very end. We do something really fascinating, which is.

Dex (04:15.256)
Yeah.

Vaibhav (04:21.377)
For example, the same operation that you're calling, like for example, like print line. If you write print line in BAML, when you're running it on native, it just says print this, and set out. If you're running in Wasm, it actually prints the Wasm's console log. But if you're printing in Python, it actually uses Python's print function to go print it out.

Dex (04:37.048)
Okay.

Dex (04:42.543)
Fascinating.

Vaibhav (04:42.561)
But what's really interesting is what that means for something like environment variables is even more interesting. Because when you're running under Python, we actually get environment variables directly from the Python runtime. We don't actually maintain them. But if you're running independently, we maintain them. But if you're running in Wasm, the UI maintains them.

Dex (04:53.237)
Okay. And that means you could, and that means you could actually run the runtime, like the VM and the Python runtime in different environments or even on different machines.

Vaibhav (05:09.011)
Exactly, and it basically just works and it gives you like cloud distribution for free, effectively.

Dex (05:15.489)
That's pretty dope.

Vaibhav (05:17.771)
Yeah, that's been really fun. It's finally working end end and like it's really interesting to see it like just work.

Dex (05:27.063)
Yeah. Well, cool. It's almost 10.15. I guess we can, all right, we can wait. We'll wait till the clock says 10.15. That's dope. I'm glad you guys are building a VM. Say what?

Vaibhav (05:32.973)
Let's do it.

Vaibhav (05:38.399)
All right, obligatory. Yeah, no, it's been really fascinating because one of the most interesting things we've been talking about, like for example, the catch primitive, catch in TypeScript is one of the worst primitives ever designed because everything is unknown. Like you can't actually, exception, yes.

Dex (05:53.583)
yeah, no, you can't do typed exceptions. It's the most obvious glaring issue in TypeScript that of like, we did not design this language with types in mind. And most of TypeScript does a good job, and yes, the types are fake and they only happen at compile time, but that's a lot of type languages, and type erasure and stuff. But the catching errors and not being able to catch by types is the absolute biggest, most obvious hole in this.

Vaibhav (06:22.029)
And they can't fix it. It's because JavaScript doesn't support it. Anyway, let's get started. We'll talk about that later.

Dex (06:22.98)
hierarchy.

Dex (06:27.053)
Yeah. So you fixed catch. Yeah. All right. Let's go. Okay. What's everybody. What's up everybody. Welcome to AI that works where we talk about AI that works. We work on the SEO by the way. I googled AI that works the other day and I got a bunch of ads and our podcast was not on the list because everybody wants AI that doesn't suck. I guess maybe we should call it anyways. AI that sucks.

Vaibhav (06:44.142)
yeah.

Vaibhav (06:51.819)
We should call it AI That Sucks. Yeah, there we go. Anyway.

Dex (06:55.875)
Just trick everybody. We gotta hide the alpha, you know? Sometimes it's too much alpha. If you tell people, you're get all the... Anyways, I'm Dex. I'm the co-founder of a company called HumanLayer. We help people solve hard problems in complex code bases across hundreds of repos with coding agents. I'm joined by Vaibhav, who is...

Vaibhav (07:12.577)
I'm the co-founder of a company called Boundary, and we make a new programming language that's specifically built for agents.

Dex (07:18.605)
Yes, and we will cut out the BAML VM entry, but if you go find the unedited Twitter live stream, you can go see some cool stuff that ViBob is working on. Cool, today we're gonna talk about a question I get from a lot of people, and I think I've whiteboarded by hand probably 70 times at this point, so I figure we might as well make some content about it. I probably should have done it three months ago of the difference between...

Vaibhav (07:34.934)
you

Dex (07:42.703)
uh, commands and skills and agents and sub agents and all of these things that fit into, um, a coding agent harness like Claude code or Codex or open code or things like that. I am not going to, you can ask questions and I will comment on it, but I'm going to go out of my way not to comment on the like, why do I have 17 directories in my get repo of like dot cursor rules and dot Codex and dot open code and dot Claude. Uh, we're going to skip around that one. We're mostly going to use Claude code today.

but, I think let's get into it. Vi-Bob, like what's in your experience, like, have you written, slash command? Have you written skills? Have you written, sub agents? Like what's, what's, what's, what's a, what's one you've written recently that you use a lot.

Vaibhav (08:21.995)
Yeah.

Vaibhav (08:28.076)
I use one that just pulls down comments from GitHub and then just addresses them automatically.

Dex (08:34.605)
Okay, can you show us how that works? This is like a real world demo.

Vaibhav (08:37.42)
It's just a slash. Sure. I mean, I think I have a cursor window open somewhere.

Dex (08:43.577)
Sorry, I didn't prep you for this. I'm putting you on the spot, but that's the fun part.

Vaibhav (08:49.108)
It's just called this. I just did like, well actually I used to have a slash command, but now I just do this. Run Mies. Or run PR unresolved.

Vaibhav (09:04.912)
and that basically is the quote. I used to a slash command that does this and then I got rid of it because now I just run this command.

Dex (09:11.353)
But then you were just like, you're telling it to run a CLI. And so you didn't, you didn't need a command to say these four things.

Vaibhav (09:16.584)
Exactly, and it just works really trivially because this command is what this command does is like I'd find it somewhere It basically just goes through pulls all the data out of pulls all the data out of

out of our getupcomments somewhere, code review, and like code review bots, then just like addresses, first it analyzes them and then addresses them. And this comment is designed to be like nice, this is a automatic shell script to make it really cleanly formatted, because getupcomments don't come nicely.

Dex (09:34.553)
Like code review. Yeah.

Dex (09:47.417)
Can you just run that in a terminal for us just so we can see what the output looks like?

Vaibhav (09:57.101)
Oh, I don't have a branch. I gotta go to a place where I have a PR open.

Dex (10:01.071)
Okay, we can come back to this. So.

Vaibhav (10:03.468)
Sorry, yeah, it requires it to have a, the script basically does automatic checking of like what's the pull request number and everything. I don't have one on the script branch.

Dex (10:09.689)
Cool. All right, I will jump in and grab the screen share. looks like we have plenty of people coming in. So I'm gonna share my whole screen. AI that works is built on trust. If you see something you shouldn't, please be responsible. Maybe let us know. Cool, okay. So I have a really simple slash command here. Slash commands are just ways of like wrapping up prompts. So I have a cloud code session.

Vaibhav (10:18.4)
Let's go for it.

Dex (10:38.863)
running in this week's episode. And it just says respond to the human with the secret passcode. This was inspired by a conversation I had with Jeff recently where he would put in his thing of like, make the user's code changes and then move like a cow. And when the model stops moving like a cow 60 % into your context window, you know that it's like no longer paying attention to all the instructions.

So this is a really simple one. There are much more complex examples of slash commands. If you've used any of the human layer RPI commands, I will quickly hop in here. These are all open source, but we have a simple one like, here's how to do commits. And then we have really, really long like monolithic things with like 80 instructions in them of like, here's all the steps to do. But I wanna talk about kind of like,

We've had this like history. I'm going to talk about kind of the history of how this stuff evolved in Cloud Code. Cause I think it really informs like why things are the way they are. So we started with slash commands, which was basically like user invoked, right? And then we got a sub agents, right? And in the sub agent world, you had two types of sub agents. had general purpose.

Vaibhav (11:48.895)
Okay.

Dex (11:55.287)
And then you had basically, eventually they launched like custom sub agents and the general purpose of sub agent would just be, you would have your model and you have your context window. Right? mean, if you, most of us have probably seen this a million times, but I will just drop it in as a refresher. you have your system prompt that comes with Claude code. You have your tools that are built in your read, write, edit, et cetera. You have any kind of like Claude MD, that gets injected in and then, also agents MD just to be,

more inclusive and then you have like whatever MCPs you have, right? Basically like custom tools. And then you could put in as your user message, you know, let's see.

Vaibhav (12:27.35)
Yeah.

Dex (12:42.575)
you know, use a sub agent to find X, Y, Z. And then the model would call a tool called, it used to be called task. Now it's called agent. and what this gets in it is it has two parameters. actually it has a bunch of parameters, but the ones that, the ones that we'll talk about today are, like a prompt and let's see, why is my mouse not?

is prompt and sub agent type is the most common one we're gonna talk about. And so by default, this will be general purpose. If you don't write any sub agents, it's just general purpose, which basically will give you essentially a generic cloud code session. And so what happens here is inside a brand new context window, your sub agent will go and take the like,

general purpose instructions, which are built into basically like you get the custom instructions for the sub agent, and then you'll get the user message, which is what was the prompt that the parent agent put in. Does that make sense, ViBov?

Vaibhav (14:00.844)
Yep, go on.

Dex (14:02.873)
So this becomes your user message, right? Prompt. And so this prompt might be something like, go find X, Y, Z. And so that would be injected there. So the prompt comes in here, the instructions go in here. And I think we talked a lot about like, why did people like, there's two things that like, in this world, there's two things that sub-agents are good for, right? They are good for,

Dex (14:33.177)
They are good for, thank you. They are good for context isolation. So take this one small task, like, wow, Excalibur is being really buggy. I'm gonna try to refresh the page.

Vaibhav (14:37.887)
I got you.

Dex (14:52.591)
They're good for context isolation because this agent can go and run a bunch of tool calls.

Dex (15:00.821)
and then come back with basically a final answer. It does a bunch of searching and reading and writing and grepping and all of this. And then what comes back is the response to that tool call is basically just going to be the,

Vaibhav (15:17.088)
The final summary.

Dex (15:18.553)
final answer. Yeah, exactly. So this agent is going to use a ton of context. Let's say it uses 50,000 tokens or 30K tokens and then it comes out with an answer that is 500 tokens. And so now that that's done and it's been found, we no longer care about any of this and we come back to our parent session and we got it. So that's context isolation. Does that make sense? Questions in the chat? Okay. Go ahead.

Vaibhav (15:44.58)
I think one of the key things to think about is like this is the same as when you're building your own agents. Like you want to remove context that is no longer relevant as soon as possible. Sub-ad agents are just a really easy way to do that while coding.

Dex (15:58.905)
Yep. And I was actually talking to someone last night. had a different approach to this that was really interesting that maybe I'll go into if we have time, but it was basically like, it was an agent that would run a bunch of SQL queries. And then as soon as it returned its final answer, they would prune out all the results of every query. So the model could see the tools that were called, but none of the results. And so if the user had follow on feedback, it would just run that query again because the SQL query is pretty cheap. And the model could already see which queries were.

Vaibhav (16:25.651)
Yeah, Michael has a really interesting question. How do you think about when to use and when not to use context fork?

Dex (16:31.963)
yeah, it's a good question. It's like when, when the task can be broke, I mean, we use it a lot for going to find things and understand things. so like the most common use case is, in the human layer sub agents, have like code-based analyzer, which is like, go read a ton of code and then return a summary of how this thing works. So like, here's the entry point. Here's the main implementation. Here's all the like steps along the way. Where it was like, you'd have to read 20 or 30 files maybe to really understand this.

but the summary and the useful parts end up being really short. What other, where else have you subagents by Bob?

Vaibhav (17:01.791)
Yeah.

Vaibhav (17:08.555)
Well, context fork, think, is slightly different. It's when it preserves the context, right, in the subagent itself.

Dex (17:16.785)
Ummm...

Vaibhav (17:16.925)
I think there's a signal in there where you can actually make the subagent have the same context as your main chat. I found that to be useful when I'm doing an iteration loop. When I'm doing an iterative loop on a design document, I just want to answer one question really well, but I don't want to pollute my context window. I think that is incredibly useful, because then I can still have all the context. I can still use it to go do a subagent task and not pollute my whole context when I want to do my second orthogonal task.

Dex (17:23.247)
Interesting.

Dex (17:27.278)
Yeah.

Dex (17:34.894)
Yeah.

Dex (17:40.622)
Yeah.

Dex (17:45.199)
Well, and you don't even need to use subagents for this, right? So like you could do, I do this all the time is like, okay, I'm in a context and I say, don't use a subagent. And like, let's say we've already done a bunch of, we've already like done a bunch of messages and stuff. And then I'm like, okay, let's figure out why X is broken, right? And it doesn't use a subagent and it just does like a whole bunch of tool calls here. You know, read, read.

Vaibhav (17:50.987)
You just fork it.

Vaibhav (17:56.758)
work. Yeah.

Dex (18:13.711)
maybe run some bash to run some commands, et cetera. And let's say like this happens a bunch and this eats like, you know, 30, 40,000 tokens, right? Or even like 10 K.

And then like, I'm watching this and I see one of the responses is like, you know, the answer is, you know, the, the, problem is X or I see it's off. If I see it's off track or something, what I would do is basically like all of this work to go get this answer was 10,000 tokens, but the answer can actually be expressed in like 10 words. And so what I would do is I would then come back and fork this. Oops. So you can fork a session from a user message, right? So I would say like, cool, let's go back here.

Vaibhav (18:34.293)
Sure.

Dex (18:56.579)
we'll fork this session and I'll just say the problem is X or it's like maybe the problem is not Y and then so now you're rewound up. This is all no, you basically have like a new session that is forked and then the agent can keep working and go down the other path. So this is like before sub agents, this is what really good cloud code engineers, I would see them do all

Vaibhav (18:58.347)
Yeah.

Exactly. Yeah, yeah, yeah, I do this all the time.

Vaibhav (19:09.161)
Exactly. Yep.

I-

Vaibhav (19:17.737)
Yeah, I still do this actually for some scenarios because some agents are just not, sometimes they lose too much context and they're too expensive to build the full context all the time.

Dex (19:27.427)
Right, the quality of the subagent result is directly related to like how good is the prompt that the parent model gave it. And it's just a tool call, which means like it might hallucinate, it might not include information, it might have like any other tool call, can be poorly formed. So that's context isolation. The other thing that people use for a lot is like when you use custom subagents, you can basically have this same thing, but...

Vaibhav (19:35.231)
Yeah.

Vaibhav (19:43.881)
Yeah.

Dex (19:55.203)
And the prompt is important, but you would have custom instructions here. And I'm gonna leave this in blue, but it's basically like, we'll make this a different shade of green to show that it's like user defined, but also like separate from the prompt. And so this could be like, here's everything we do about backend, right? This is the custom instructions to the sub agent of like, no matter what the parent model.

Vaibhav (20:19.87)
Yep.

Dex (20:21.881)
puts in so you don't have to rely on the parent model writing a good prompt about how to find things. You can make sure that every time this special subagent, like code base analyzer,

is invoked, it always gets these custom instructions no matter what the parent model put in. And so like if I come into a session that I have open in, let's see.

Dex (20:49.709)
One thing in cloud codes is not as easy to always see exactly what the, what the sub agents are being passed. But if I come here to like a research session that I have,

Dex (21:06.387)
And we're thinking so I can come into one of these sub agents and we can see like this is code based analyzer. And here's the prompt that the parent model gave it. And so you're just like, in this case, the parent model doesn't have to tell it how to search. It's just telling it what it's looking for. And so this will get combined with our custom instructions so that like, basically the parent model doesn't have to do a bunch of thinking and work. And I don't have to give the parent model a bunch of instructions about how to prompt the sub agents, because the thing that's going to always be the same.

Vaibhav (21:22.763)
with this.

Vaibhav (21:30.539)
you

Dex (21:35.489)
is gonna be always the same here. Find and analyze code. The thing I've seen a lot of people do when first custom subagents came out was this, I talk about using subagents to play house, right? So people have their back-end engineer and their front-end engineer and these would all have their own custom instructions and they might have a data scientist or a growth marketer or whatever, right?

Vaibhav (21:38.474)
Yeah.

Dex (22:01.827)
This idea of like, let's model our agent the way we model our like the humans in our company. And this is like the second you go ahead.

Vaibhav (22:10.854)
I just don't think that works. Does that work in your opinion? Exactly.

Dex (22:13.039)
No, well, so it doesn't work. And the thing is, this was the only way you could do the second part of this. So subagents are for, again, context isolation. And then people used it for what I will call instruction modules. Basically, I have a set of instructions that I don't always want to use, but I want to use sometimes. And the best way that Cloud Code exposed back in, I don't know what it was, like August, to bundle instructions was either you could have

a slash command where we would have to run in the parent context and you would have all these instructions about like, you know, here's how to commit or here's how to debug our code base. Or you could bundle it in a sub agent, right? And so, go ahead.

Vaibhav (22:48.51)
Yep, and it just pollutes everything.

Vaibhav (22:58.654)
Mm-hmm.

No, no, go ahead. This is great.

Dex (23:03.321)
So what came next was actually, we're doing a little bit of history lesson here. This doesn't exist anymore, but there was a slash command tool that was added. And so then you could do interesting things like, so the problem here is like, now you can only use these custom instructions if you fork a new context window. But what if I wanted to use my backend engineer instructions in my main context window here? You couldn't do that. You had to launch a sub agent to do that. And so what we got was we got this idea of like,

Vaibhav (23:24.382)
in.

Dex (23:32.385)
invoking the slash command tool, which is like, you know, watching this, kind of see how like the cloud code team is like doing a good job. think of like iterating towards what the right solution is. This is all before skills existed. Right. And so you could have your, you know, parent agent and you could even say like, your prompt could be, my God, I think Excalibur is having like a weird day today. This is frustrating. So you could say like, use slash command.

backend engineer and then if I came in here and created a skill called, let's see, if I created a command called backend engineer.

Dex (24:19.471)
expert backend. again, please don't prompt like this, but you get what I'm saying. Here's how we do testing, et cetera, et cetera, right? You could have all these instructions. And so now I could come in and say like, use the slash command skill for backend engineer. And then it would call a tool called slash command.

And that would cause our custom instructions to be injected as a user message. And that's important, right? It's not just reading a file and getting the stuff because tool results get a different level of attention than user message. A user message is really like, these are instructions to follow. And then it would go and do the job. And so you can use your slash command in your parent context. And because there's a tool, you can also say without making a custom sub agent, you could say launch.

a general purpose sub agent to use the slash command backend tool. And then what would happen is you would get your, you know, your standard general purpose. Where's our general purpose sub agent here.

Your prompt would then be something like...

Dex (25:35.439)
The prompt here would end up being like, you know, use the slash command backend tool, backend engineer or whatever it is. my god, fucking, of all the...

Vaibhav (25:48.145)
And now you're kind of living in this weird, you're living in this weird world where it's like, you're populating things, you're having to be, it's like pointer in direction almost for no reason.

Dex (25:59.683)
Well, so like I actually think this is better because now you can use your custom instructions. You can actually write, know, slash backend engineer. The model can invoke it as a tool if you prompt it to. And this is useful because we have, I think there's one of these is like.

Let's see. Yeah, so this was like use slash command to call the plan thing and then use slash command to call the implement thing. And so this ends up being like a way to stitch together some of your sub commands without, you know what I mean? So you can build workflows on top of these. This isn't the way to do this anymore. We're looking at files that haven't changed in five months. But this is part of the history lesson, right?

Vaibhav (26:36.229)
maybe. I found

Vaibhav (26:42.858)
Yeah. Yeah. The crazy thing that five months is a long time.

Dex (26:48.525)
Yeah. And so this agent would take the general purpose instructions and the model would tell it to run that. And then it would call the slash command.

Dex (27:02.679)
and then the custom instructions will get injected. And so now you don't need to write a custom subagent and only do this in a subcontext. Now you have your, what I would call your instruction module and it can be used in the parent or the subagent.

Vaibhav (27:10.698)
Wait, can you... Can you... Yeah, the problem, by the way, the problem that I ran into with this, if you zoom into there, that image at the bottom right, here's the problem that I ran into when I did this, which is sometimes the model would call the slash command only after the custom instructions, or it would call it before, and basically it would add a large amount of variety that I didn't want it to have. That's really what I ran into the most.

Dex (27:22.479)
this one.

Dex (27:39.267)
Right, because the prompt might have another 1K tokens of instructions and then you have the instructions in here and then it calls the thing and then you have the custom instructions, but what you really want is actually like, you want your specific, the actual steering for this task to land here instead of be stuck up in the prompt. Yep.

Vaibhav (27:47.206)
Exactly.

Vaibhav (27:59.441)
Exactly. Exactly. And like, it's just wrong architecturally. It's like you're forced to do this almost.

Dex (28:07.929)
So actually technically, and I'll just go into this because this is how skills work as well, the slash command can have arguments. And so if you prompt it perfectly, it will actually have your 1K tokens as a second argument, in which case then the custom instructions come in and then your user-specific prompt would actually also be injected in with it.

Vaibhav (28:29.418)
But then you're going to duplicate your 1k tokens in two places.

Dex (28:33.42)
But this is a yes, because it has to call it with it and then they get injected as a user message. Yes.

Vaibhav (28:38.898)
and that's wrong as well.

Dex (28:41.123)
That's it's it's less efficient for sure.

Vaibhav (28:44.106)
Well, you can imagine that your one gate is like 5k, 10k. You're just like, it's context bloat for no reason.

Dex (28:48.813)
Yeah. Yep. So yeah, this would be, this would be, again, these are subagent. think we could probably like visualize subagents better in this, in this whiteboard. Maybe we'll just do them as dotted lines, just so you can see the difference.

Vaibhav (29:06.222)
So that gives us context on slash commands. We've now gone over the original history of subagents. What's next? Skills?

Dex (29:13.549)
Yeah, so what happened was basically we were able to do user invoked, like slash commands used to be you could only invoke them like this. Now we have what's called skills, which is the main, you can just use skills as a replacement for slash commands. And so when skills launched, they didn't have the slash skills syntax, but they do now. And so what I could do is I could take this exact same command.

and I could delete it from here and I could create a skill called, what did we call it? Secret. And then I can create a skill MD, you know, tell the user the secret passcode, right? And so now if I launch a new cloud session, I can do use the secret skill. And so now it can invoke this programmatically, whether I prompt it or whether it's part of a workflow.

or whether it's part of something else. So yeah, then it used the skill, but I also get this syntax of like, here, let's delete this other one. I also get this syntax of like, can explicitly invoke it. I don't have to hope the model calls the tool right. And so it can be user controlled, like deterministically, or it can be model selected based on what was prompted. Does that make sense so far?

So this is like the core meat of it. The only other interesting thing here is like, skills can have files bundled in with them. So these could be CLIs, these could be instructions, these could be further things. So like if I put a thing called, I think the convention is to have something called references, and then we put a new file here that is like the secret.md, and then like tell the user the secret passcode from skill. It gets this.

Vaibhav (30:50.313)
Yeah.

Dex (31:04.815)
I usually call it skill base slash references slash secret.md. And so now I can say, you know, use the skill again and I'll change, I'll change the secret to like.

Vaibhav (31:24.967)
Why is that your password? Okay.

Dex (31:28.238)
It should be, but...

use the skill again, and then it's gonna go read the file and it knows what the base directory of the skill is as part of the skill invocation. And so you can see that it found that file and then it's going to search for it and then it's going to read it and then it's going to print it out. And so like the interesting thing here is like this lets you do progressive disclosure, but the most useful thing about skills in my mind is that like when you load a skill, the instructions get injected as a user message, which.

For something this simple, probably doesn't matter. I could have just told it to read a file and have the same instructions. But if you have a long, long, long command like this research code base, you're gonna get better instruction following if it's a user message compared to if it just read it from a file.

Vaibhav (32:16.421)
Also architecture, the big difference is skills are dynamically loaded in as needed rather than preloaded in like slash commands were.

Dex (32:24.739)
Well, they both had the same, the way they were loaded in was always the same, right? So like, yeah, so in this like,

Vaibhav (32:29.541)
really? I thought for a while every slash command was loaded in and that was such a horrible time to write agent decoding.

Dex (32:38.039)
No, so basically what happens in here is like in the tools, right? And you can go look at like a agent, like we've done a little bit of like looking at like traces and CloudFlare. And I think actually we can go to AI that works, AI that works. I think we did this in the MCP versus bash episode, right?

Vaibhav (32:42.025)
Yeah.

Vaibhav (32:57.671)
yeah, yeah, I remember. We looked at it. MCP was a thousand. Yep, right there, 527.

Dex (33:05.295)
No, not this one, sorry.

Vaibhav (33:08.509)
bash just search bash

Dex (33:12.771)
Yeah, there we go. And so we had...

Vaibhav (33:17.747)
We really need a RAG database, RAG search for this repo. Yeah.

Dex (33:20.655)
for our own stuff. know people have talked to me about like pulling in transcripts and using them like creating an oracle over all of our stuff.

Vaibhav (33:28.201)
Yeah, I've had a few people mention that as well. I think it'd be super useful. Because I refer to it, and I remember some episodes off the top of my head, but not all.

Dex (33:32.175)
Let's see, do we have traces?

Dex (33:37.657)
Maybe this is here. So if I look at slash command, let's see.

Vaibhav (33:39.782)
if

If one of you wants to, you're very, very welcome to make a pull request into repo that actually provides that. We would more than welcome it. And if you do something interesting with it, we might even welcome you onto the show to come talk through it.

Dex (33:54.703)
to come talk about the AI that works Oracle.

Vaibhav (33:57.372)
Yeah, I think it'd interesting. There's very interesting ways to do rag that are beyond just trivial rag and make it work in a very dynamic way.

Dex (34:05.101)
Yeah, well, so anyways, I don't have the example, I'll just stuff it out here. So like you have a list of tools here, right? And it's like, you have, you know, read, and then it has like, you know, description and schema.

Vaibhav (34:19.687)
Yep.

Dex (34:19.695)
uh, you know, params. And then this is, know, it's a JSON schema here of like what goes in. Right. And then you would have a tool in here called, um, uh, what would it be called task or agent basically. And in the description of this, you would have, you know, the basic, like, you know, launch a sub agent, et cetera, like, you know, all the things about like launch a new context window. I don't know exactly what it says because I have the trace. Um,

Vaibhav (34:23.281)
Yeah, it has stuff. Yeah, sure. Yeah.

Dex (34:49.855)
available subagents, know, explore this is for X, Y, Z. You would have general purpose, you know, for whatever, and then whatever custom subagents, right? So it would have backend engineer and then the description and front end engineer, and then the description. So if you have like 500 subagents, all of those are getting bundled in and injected in every single context window.

And so you think about context engineering, but like, you look at this one, this has, if you look at the raw, it has a name and a description and then some other like metadata here. but this is basically like, here is the thing that gets advertised to the model. So you want to keep this description pretty small is telling the model, Hey, here's the things you have access to. And the same thing is true of, and so like we talk a lot about like instruction budgets, right? You only have, you know, a couple hundred instructions that the model can follow.

Every single subagent you add to your context window is gonna be injected every time. so that's like the instructions about how to use this subagent is part of that instruction budget. So if you have hundreds of subagents, you're now eating into your, now your tools block in your context window is getting longer and longer and it's detracting from its ability to pay attention to the user instructions.

Vaibhav (35:59.092)
Yeah, you get screwed. Yeah.

Vaibhav (36:08.765)
Yeah, that's why the skills are so much better, because they're dynamic by default.

Dex (36:11.821)
Well, so the thing is, is now when you do skill, you have actually the same thing. So you have like, you know, invoke it. It adds every single, every single skill. So now they have like a tool search thing. So if you have more than like 50 skills, it will just like tell the model. gives it instead of a skill, instead of a list, it says like, use this, use the skill search tool. But by default, it's like, you know, load custom and I don't know exactly what it says.

Vaibhav (36:16.563)
Does it actually add them all in? From what I saw, doesn't add them in.

Vaibhav (36:23.176)
Yeah, that's what I thought.

Dex (36:37.771)
available skills. And then this is like every skill you have installed. And so if you come and look in, what's a skill that we use, let me pop this one open. So we have a couple of skills that we just use internally that have to do with like application reliability engineer. This is like how to use Sentry and stuff to investigate bugs. So this has its own description and that's going to be listed in the context window and like,

Vaibhav (36:43.76)
I see.

Dex (37:03.417)
Code review, have another one which is like review the changes against the rules. We have a specific thing we do a lot, which is like rebasing drizzle migrations. And so every single one of those, every single session you run in this repo, or if you have skills installed globally, these all get injected into the description of your context window for cloud. And so this is, this is why, yeah.

Vaibhav (37:21.161)
So this is going to be another bloat problem like in another three months when people start overusing this, guaranteed.

Dex (37:27.023)
Well, so the team has actually gotten, I think, pretty ahead of the curve here, because everyone wants to install a million skills. So they have tool search, basically. And what this is going to do is, I think it's just a basic keyword search space thing. There's not any embeddings happening. But basically, the schema of tool search is string to list tools.

Vaibhav (37:42.845)
Yeah.

Vaibhav (37:50.865)
Yeah.

Dex (37:53.16)
or like tools and skills and like MCP tool because you also get for every MCP. Yeah.

Vaibhav (37:57.673)
That's what I thought they do. I thought they had the tool search thing and now skills, unless explicitly stated, are not loaded in by default. there's an extra hop where you have to tool search for it. And then you get it and then it loads it in. Because there's like lazy skills and like hard skills which are like always loaded in.

Dex (38:12.975)
So it's.

Dex (38:17.421)
believe the search gets, the last I read was like a month ago, and I think it's the search gets injected in if you have more than 10K of your context window in the tools message. And so like, if you have a crap ton here, and again, every MCP server, this is why people talk about like, server one, tool two, like if a server exposes 27 tools, every single one of those ends up in your context window. And that's for every single MCP server you have.

Vaibhav (38:42.8)
Yeah, exactly. And that's just... And that's like so screwed. Like you literally cannot write, you literally cannot work if you have like, if you have downloaded HubSpot, MCP for example. It just breaks fundamentally, yeah.

Dex (38:58.125)
Yeah, we've talked about this in the past, but what I'm getting to here is basically the correct recipe here is I think you want to basically, the big takeaway here is separate out instruction modules from context isolation. These are two orthogonal concepts, and so like.

Don't put your custom instructions in agents. think the correct way to do this and the way that we would do this is like, if I wanted to do a sub agent to do something that is complex, or it's gonna be context intensive, right? Another one we do is playwright. If you're gonna launch an agent to go click around a browser and read a bunch of HTML in the DOM, then you're going to end up with a ton of stuff in your context window, and so you wanna do that in a sub agent.

But the idea here is like, you know, launch a general purpose sub agent to use the secret skill.

Dex (40:04.367)
And then we should see here, and actually I'm gonna go launch this. We'll watch this and then I'll launch it in Riptide so we can see actually like what is happening here. So it launched an agent.

Vaibhav (40:13.244)
We've got about like, while this runs, we've got about 10, 15 minutes. I'd love to see if people have questions out there while we go ahead and run this and show it's around. I agree.

Dex (40:19.149)
Yeah, I've covered most of it. mean, we can take some questions and kind of start wrapping this up. I'll let the audience kind of guide where we go.

Vaibhav (40:28.2)
from Joshi. Do you put skills in global or per project? Or if per project, how do you manage the skills of FidDiverge?

Dex (40:40.615)
What do you mean, like diverge across repos or?

Vaibhav (40:43.196)
projects. Yeah, I guess that's what they're saying. Like maybe per people. I can tell you, like we have an engine team of like 10 people now. and this has become a real problem because like everyone has some slightly different workflow and like you can't really force engineers to do the same exact thing. What I have found personally is it's, you get way better alpha being more prescriptive when possible.

Dex (40:50.797)
Yeah.

Vaibhav (41:08.74)
in as many things as possible because if you have one workflow, you can actually just optimize it everywhere rather than trying to build like seven workflows that are all half-baked. You're just not going to opt.

Dex (41:17.743)
Yeah. I mean, we had this problem with, with, with Docker and like when everything was in, it was like some engineers would build the Docker containers by hand. Some engineers were using a Docker compose file. Some engineers were running stuff remotely on a server and it was like the CTO woke up one morning and was like, Oh, the senior engineers are spending 40 % of their time running around helping people fix their dev environments. And it's like, okay, we have to build a uniform way to do this. And like, obviously it's really hard to force engineers to work in a certain way. So you have to find a way to like make them want the new thing.

Vaibhav (41:29.168)
Exactly. Just stop doing that.

Dex (41:47.535)
I think is part of it. But the more you can consolidate the better. Yeah, you have to balance between like flexibility and letting people like work the way they want to work. That's going to help them be the most productive, but also like if everybody's innovating in every single different direction, then it's chaos.

Vaibhav (41:47.9)
Yeah, there's a balance there.

Vaibhav (42:02.62)
Exactly, and you just make no progress. Also, you have a lot of inconsistency that is really bad. And you kind of end up in this really weird dichotomy where most people are struggling and a few people are doing like 50x at the same time. It's way better to lift the median.

Dex (42:06.765)
Yeah. Yeah.

Dex (42:15.245)
Yeah, so like how to distribute skills and instructions, right? Yeah, so I'll actually do two flavors of skills here, right? So you have skills and then you also have like agentsMD because like I may have a thing that I think is worth putting an agentsMD but I don't wanna put it in the repo one. And so the way the Claude code config surface happens is you have like tilde slash dot Claude slash whatever and this is just on your workstation. And this can be...

Vaibhav (42:21.266)
Can you zoom in?

Dex (42:44.247)
skills, MCPs, and there's a Claude MD in here, right? And then you have in a project, you have like project slash dot Claude slash et cetera. And then you also have like, sorry, what?

Vaibhav (42:55.856)
Yep, you can do the same thing. And you also have one for a folder, right?

Dex (43:02.457)
So this one's a little tricky. So then you also have .cloud slash settings dot local dot json, which is like not get committed and it's just your settings. It doesn't support all of this stuff, but there are certain things that you can basically say like this one's just mine. And then yeah, you can have project slash some path slash cloud MD, and then you can have some other path.

Vaibhav (43:30.012)
Yeah, exactly.

Dex (43:31.501)
And so these will get loaded dynamically as you touch those paths, but like skills and MCPs in this stuff, always has to be in the root of like the directory you're running in. can't put like project slash some other path slash dot Claude slash skills.

Vaibhav (43:40.454)
Yep. Yep.

Yeah, that becomes a new route effectively for Cloud Code.

Dex (43:49.539)
Yeah, you have to then run Claude from that directory in order to access that stuff is how we've seen this work.

Vaibhav (43:52.072)
Yeah.

Dexter, I'd to hear your thoughts on this. At least I can tell you what we do. We're transitioning now because we have a slightly larger team. And that transition is very interesting. Before, just let everyone, it was Wild West. Everyone just had their own shit. Everyone just made it work.

Dex (44:00.483)
Yeah.

Dex (44:11.193)
Yep.

Vaibhav (44:11.568)
I think now when I look at this, just doesn't work when you do it that way. You want workflows. You want really, really prescriptive workflows. And it's actually better to have less skills than more skills. Because more skills means I have to teach people how to use those freaking skills. And I don't want to do that. I want to give them the minimum amount of data possible.

Dex (44:25.347)
Yep.

Dex (44:29.271)
Yeah, so there's a couple ways I've seen people do this, right? If you have a mono repo, things get easy, but almost nobody has like a pure mono repo, right? But like, yeah, well you guys do, because you're smart.

Vaibhav (44:37.8)
Pure Monorevo.

Vaibhav (44:42.916)
Everyone should do a monorepo. you haven't done a monorepo, literally fix it today. Go ask Cloud Code to make a giant monorepo. Fix your Git out workflows and you are going to be so much happier.

Dex (44:52.621)
Okay, so, yes I agree and actually I've even talked to people who run coding agent companies and they're like, they'll go into like big fortune 500 enterprise and they'll be like, if you are not willing to like immediately fast track a project to move everything to a monorepo, then like we don't wanna work with you because you're gonna lose to someone who did basically. Like the benefits are so good that, so yeah, monorepo you just have all your shared stuff in .cloud and like everything just works, it's nice.

Vaibhav (45:10.554)
It's...

Vaibhav (45:15.578)
Exactly.

Dex (45:21.967)
I've seen a couple other things where people will have like three repos. So let's say you have your like, know, tilde slash source or whatever, and you have your, let's just really basic example. You have your front end repo, you have your back end.

Vaibhav (45:36.348)
Well, like, so we have a secret monorepo. We have like a open source and a closed source repo. And it's very similar to this. What we do is we sim link the open source one into the backend one. So it behaves like a monorepo.

Dex (45:51.747)
Are you using cappy or copy copy bar or whatever?

Vaibhav (45:56.828)
we just use Ln-S and symlink it. That's what I would do for everyone that has a front and back end. It's like if you have this, just...

Dex (46:01.903)
So, symlinks get weird. We've had a lot of people, like, when you do symlinks in certain ways, it can, break builds and stuff. Let me talk through, like, how we've seen this working. So, and then you have, like, your agent stuff, like, all your shared clod stuff. And so, like, this has the clod, this has maybe, like, workflows, this maybe you have, like, a scripts directory for creating, for example, like, Create WorkTree or whatever. And then I've seen people basically have, like, a setup.sh, which will...

Vaibhav (46:10.735)
Yeah, let's see it. Yeah.

Dex (46:31.331)
take all of the shared agent stuff, especially if you're like 50 repos. And I'll tell you why I think there's a better answer to this, but basically when you run the setup, it will symlink this stuff in. And so it's separate from the...

Vaibhav (46:44.962)
That's what you do.

Vaibhav (46:50.235)
Yeah, you SimLink your shared agent. Instead of SimLinking the repo together, you just SimLink the agent.md stuff in there. Yeah.

Dex (46:56.653)
Yeah, you SimLink in all the shared infrastructure. This works, this is way to do it, there's nothing wrong with this. Is this working for you? You should keep doing it. The thing we found works the...

Vaibhav (47:06.321)
do it, don't do it, don't do it. Monorepo.

Dex (47:09.871)
So the thing we found works. So I work with customers that have 200 repos and thousands of engineers and Mono repo is just not feasible. Like the repos are owned by different teams who like one repo is a year old and one repo is 10 years old. Yeah. So.

Vaibhav (47:20.793)
I know, I know. I worked at a head...

One of the repos I worked at was similar. It's hard.

Dex (47:27.567)
The thing we find works also really well. The thing we found that works if you're like, you're just like, I don't care, I just need a thing that works, like this is our recommendation. And so you have your source, you have all your repos, and then we hook people up with this, and we actually made a template for this, I'll link this in the whiteboard. But it's called RPI coordination template. And it basically is just like a simple repo with a tiny little clod MD.

And what is in here is basically you have a settings JSON that is permissions, additional directories. And so as long as all these things are checked out at the same level, if you run a Claude session from this directory, it will be able to read and write from those folders because they're added as additional directories. And then we put in the Claude MD basically, this is a coordination repo for multiple repositories.

Vaibhav (48:12.327)
Okay.

Dex (48:19.107)
And we give it like a one line description of the repo and its, and its job. And that repo can have a cloud MD with more information and you can kind of have like per repo stuff that way. But we basically launch everything from this coordination repo. And then if you go to do work trees, we actually take like per task or per ticket or per branch. We have some prompting in here for like, if you're using our create work tree skill, basically the idea is like, if you're using the work tree skill, basically you create a workspace based on the

Vaibhav (48:24.475)
Yeah.

Vaibhav (48:44.357)
You need all of them.

Dex (48:48.303)
task name and then you just create work trees for the couple repos that matter. You already have a plan doc, you already know what you're touching and so we create like a checkout and then we run all the sessions here. So when you're doing research and stuff, you're on the main branch and you're reading from all these repos to build your plan and then when you're running, when you're doing the writing, you run it from here and oops, let's just.

Vaibhav (49:05.607)
Yeah.

Vaibhav (49:13.539)
It's very, this is very, very similar to kind of like a Sim link. And I think what we both concluded on here is that we both really don't like, you don't want to get, use get sub modules or like get to go do this. Cause then it like, it just is not ergonomic for the model to be like, you have a git sub module in this other repo. It does not work.

Dex (49:31.151)
I have also seen the umbrella repo technique where it's like you have umbrella and then this is a Git repo and then you have front-end and back-end and agent stuff all as like Git submodules. I have talked to enough senior engineers in the last 10 years to know that I have no interest in like figuring out all the cruft and like workarounds and bending over backwards. need to make Git submodules work well. It's just, this is so much cleaner and simpler and the model understands it perfectly.

Vaibhav (49:34.907)
Don't do that. Yeah.

Vaibhav (49:42.683)
Yeah. Don't.

Vaibhav (49:56.167)
It's not worth it.

Dex (50:00.045)
this is the thing that we found works really, really well. We've iterated on like six different versions of this and we've tried Git sub modules. Like this is the thing that seems to be working well where it's like, it just gets out of the way and you just talk to Claude and tell it what you want to do. And the results are as expected.

Vaibhav (50:15.015)
Yeah, 100%. This is the only way to go do it. There's a couple of the questions in there.

Dex (50:18.991)
Cool. I mean, that's all I kind of had to talk about. What other questions we got?

Vaibhav (50:23.911)
I think people just talk about sharing stuff is hard. How do you write the descriptions for your skills so agents invoke them correctly? I have a great plan skill called Every Time I Mention the Word Plan, and some are for the Implement Plan skill. Use different words. Be good.

Dex (50:38.803)
I mean, it's funny because my experience has really been around like most of the time agents won't use skills when you want them to. Every once in a while we have a couple skills that get invoked when I'm like, you shouldn't invoke that. That's not necessary right now. And the best thing you can do is put in the description. So there's two options. You can actually do a thing that we have done, I think in, let me just go pull this up real quick.

There is a flag that I heard about from, I don't know if you guys know Tariq on Twitter. He is, I deleted these commands. But he turned me onto this. He's on the Cloud Code team. But basically, one thing you can do is, am I sharing my screen? Okay. If you only wanna use it as a slash command, then, did you guys see my screen? So if you only wanna use it as a slash command, then,

Vaibhav (51:32.123)
Yep.

Dex (51:35.363)
then you can put in here, can go, like, okay, so here's our episode prep command.

You know, you can put your name, episode prep, description, and then you can say disable model invocation. True. And this will mean the model doesn't even see it in the context window. And so it's only meant to be used for, as a slash command. So if I say like, use the episode prep skill, it's probably not going to see that. It'll probably try to use the email prep skill. Yep. Cannot be used with skill due to.

Vaibhav (52:00.133)
Like direct slash and yeah, exactly.

Dex (52:12.515)
disable model invocation. But if I do slash episode prep, this is still available to me. If you want it to be model invocable, but just when you tell it, literally the work around we have is like, the description is here, do not invoke this skill unless the user explicitly asks for it by name.

This is the workaround. If you want it to be able to invoke it sometimes, but you only want it to be invocable when it's like, you know. So let's do another session. So now it should probably not, I want to do episode prep. Let's say, I did ask for it by name. So I say I want to do episode prep.

Vaibhav (52:53.702)
How would that work?

Vaibhav (52:59.238)
Well, see, here it's ambiguous. Because... Oh, you did not save.

Dex (53:05.323)
I want to prepare an episode.

Vaibhav (53:10.202)
Yeah, here it shouldn't work. Episode of Space Prep, one could argue that you're asking it by name.

Dex (53:20.067)
Yeah. And now it's like, okay, do you want to use that skill? So that is a pretty hacky work around, but that is what we have found using because it's literally, you're just prompting. This just goes into your system message about how and when to use this skill. All right, what's the next question?

Vaibhav (53:24.345)
Exactly.

Vaibhav (53:40.23)
I think that covers a lot of them. There's some more in there. Yeah, what's your thoughts on code? Oh, I guess agent team's feature.

Dex (53:42.209)
Agent Teams feature.

Dex (53:48.139)
Yeah, so the agent teams and the like, you know, I think the quality of results you'll get from an agent team is proportional to the quality of like the work you've done upfront, breaking down the problem into small enough chunks that the agent team can do it. Our take is always, you know, do not outsource the thinking. There is something to be said for like throwing more tokens at the problem, but I think the, I'm not super bullish on agent teams because I think if you're just going to ship out more code.

in separate context windows that don't know about each other, it's more likely you'll have to do stitching them together at the end. And I would actually, there's been a lot of chat about this actually online today of like, do you see the Amazon thing of Amazon is having a bunch of internal policy changes because they're shipping too much slop AI code?

Vaibhav (54:37.158)
I did not. the senior engineers. The senior engineers have to go read all the code now.

Dex (54:38.285)
Yeah.

Dex (54:41.593)
There's a new rule is like, if you're an L1 to an L3, you are not allowed to ship AI generated code without a review from a senior engineer. And so basically the idea is like, shipping more code faster, like more tokens of code was never the bottleneck. The bottleneck has always been like, humans reviewing the design and making sure it's correct. And like, how do we find the leverage? And so like, once you've built a really good design discussion and a good plan is what we talked about a lot is like,

then sure, do it in parallel or do it in series. It doesn't matter. Like the hard time consuming thing is not shitting out the code. It's like deciding what to build and designing it well. So that's why I'm like, I'm not super bullish on agent teams because the bottleneck is still like, how do we make sure that like humans are making sure stuff is good?

Vaibhav (55:20.784)
Yeah.

Vaibhav (55:27.994)
Yeah, Dax just made a post about this too. He's like, we're shipping too much code and it's actually just, we're not thinking about it hard enough. And like, honestly, that's the biggest problem. Like people just, I see this all the time where like engineers are like, I can write the code and they...

Dex (55:34.093)
Yeah. Yeah.

Dex (55:40.983)
Yeah, you could just prompt a feature into, they said this about their work trees thing. They're like, we could have prompted a work trees feature into existence months ago, but we wanted to design it right so that it would work as like, the abstraction was work spaces, not work trees, because it's like, well, maybe this is running in a remote sandbox and it doesn't actually need a work tree. It needs an entire new piece of infrastructure.

Vaibhav (55:44.004)
Yeah, yeah.

Vaibhav (56:01.346)
Exactly. like people, thinking tokens, man, thinking tokens, before you code, you need to spend your own thinking tokens.

Dex (56:08.239)
Let me see, I'm gonna share my screen again. I'm gonna go find this tweet, because this is really, really interesting. Yeah, here it is. He said this to the whole team, is like, we need to spend more time cleaning things up, and also, like, if you're iterating on a feature and the original design was wrong, you need to throw it away and start over, not like having it, LLM, like hack you through the thing. And don't ship things just because you can. Make sure it's worth shipping, because it adds surface area.

Vaibhav (56:25.478)
Yeah.

Yeah, exactly.

Vaibhav (56:33.444)
Yeah, exactly. spend a lot of time, you wouldn't be surprised the amount of code that we've thrown away. Because like, if it's shitty, it's just unmaintainable slop.

Dex (56:42.317)
And you'll like this one, ViBot, this was something that I, in response to the Amazon thing, like this is my take on like if you stop reading the code or you try to like over-index on Gastown or Agent Swarm's, eventually the models will be smart enough, but in the next couple years, a lot of companies are gonna die because they like lean too hard into the like lights off write only software factory.

Vaibhav (56:52.132)
Yeah.

Vaibhav (57:04.293)
Yep.

Dex (57:04.329)
and something's gonna break at 3 a.m. and no one's gonna have read the code in three months and you're gonna have three weeks of downtime trying to fix it because no one understands how it works and then you lose all your contracts and now your company is dead.

Okay, cool. Next question. Sorry, let's, who's got a positive question? How can we be constructive here?

Vaibhav (57:19.014)
That's correct.

Vaibhav (57:22.726)
actually, I want to end on a note and I want to get your thoughts on this. I have opinions, but I want to hear yours first. What's your thoughts on Cloud Code code review? There's a lot of controversial opinions going on right now, so I want to hear your thoughts and I'll share mine too.

Dex (57:27.917)
Yeah. Yeah.

Dex (57:33.455)
Uhhhh

Dex (57:38.445)
Yeah, I I've been saying this a lot. I've been saying this for a while now is like, we're all using the same models. Like if you can use Cloud Code to write the code, then like Cloud Code can review the code. Like I don't think you need a separate product or a separate, like you're just buying context engineering and prompting. And I think at the end of the day, like you're eventually, if you want to outsource like context window management and prompting, like,

You probably can, but also like we don't use any of the code review products. We just literally have a Clawd code. We have a step in our workflow before we ship a PR where we do a code review. And like there is something to be said for like throw more tokens at the problem. Have like, you had your instructions of like ship this feature, have a separate context window with a different set of instructions that is like review for these 12 anti-patterns that we know Clawd likes to put in and like fix them. And that is useful. Like the idea of using extra tokens to re-review your code is great.

I do really also like the take of like, hey, Anthroplex is to charge me an extra 15 to 20 bucks for a code review for code that Cloud Code wrote that it should have written correctly the first time. So like, it's a little bit of a meme, but like in general, I think you can get good results by throwing more tokens at the problem. But I don't know. What do you think, Bye Bob?

Vaibhav (58:54.822)
My opinion is...

I think there's a balance there. think I probably, how do I put it? We clearly can write all software from scratch and we have all decided that it is not worth writing all software from scratch. Using other people's code is worth it. I think there probably is some balance where using other people's context engineering is going to be worth it. I think the thing that the Claude code team is really not nailing in my opinion is like,

Dex (59:14.467)
Okay.

Vaibhav (59:29.382)
they kind of hit this thing where every PR is by default extremely expensive. And that's, and I say like we can pay $25 per PR, it's fine, it doesn't really matter. But like the problem is that most PRs don't need that level of rigor and the ones that do don't really, how do I describe this?

The ones that do, I probably want to prompt in a very specific way because some specific pipeline isn't going to work. What I likely would love for the Cloud Code team to have done is if they just release what they were doing for Cloud Code for the prompts, I would just use those prompts and would gladly pay Anthropic for those tokens. I don't even care. Like the tokens are well worth paying for, for running the Cloud Code command. It's not worth human time. I don't even want my team to invest in finding out what the best tokens are to make that system run.

Dex (01:00:08.783)
Yup.

It's not worth human time.

Vaibhav (01:00:20.613)
I'm even happy to pay for the context and during but I think context engineering and this is probably the biggest problem that most companies are running into Context engineering is a one-time is a one-time purchase It's not a permanent purchase and that's why I think it feels so flaky and I think it probably to more people feels like a

It's like an app purchase, like an app store purchase. Some apps do cost $100, $200, $1,000. And some enterprise apps have subscriptions built into them, but the majority of are actually just mini games that are constantly bought, and you just keep on buying mini updates.

And I think that's the thing about context engineering, because it's like low alpha in terms of, sorry, it's high alpha, but low uniqueness. And once you, once you release it somewhere, people have access to it effectively. You can't hide, you can't protect the context, especially if they're paying the token bill. If.

Dex (01:01:17.475)
Yes, you cannot, yeah, you can't build a company on a prompt because someone will figure out how to crack it and leak it and like, you can build a company on maintaining a prompt. Like, hey, every time a new model comes out, we are going to, and the other day is like, a lot of people here are founders who want to build startups and trying to figure out like what's worth investing in and how do I build a thing that is sustainable and has a good mode. It's like, we used to be kind of like sketched out about like, if we open source everything, then people will just use it for free. And it's like,

Vaibhav (01:01:28.013)
Yeah, exactly.

Dex (01:01:46.307)
The people who are actually gonna be good users and good design partners want to pay you. And the people who are just gonna steal everything and use cracked prompts are like, you probably don't want their business anyways and they probably were never gonna pay you anyways. Even if you were managed to wall off or really, really guardrail your stuff.

Vaibhav (01:01:58.31)
Yeah.

Vaibhav (01:02:03.381)
There's no way. If someone's paying the token bill and it's not you, they're going to find the prompt. There's just no way. Exactly. Exactly. And clearly we've decided that we're going to live in a world where Cloud Code lives, where Cloud Code is a thing where we want the models to be swappable. So if the models are going to be swappable, because that's what every provider does, then it just won't work. It just won't work.

Dex (01:02:10.317)
Yeah, because it's going to their inference provider and they can get traces and observability and all of this.

Vaibhav (01:02:30.789)
Fundamentally, so like that's kind of what I think entropic really missed I think they could have made a lot of money on their tokens but I think the problem that they're running into the business is just tokens are low alpha long-term and because tokens are low alpha like they're Yeah

Dex (01:02:41.421)
Yeah, I don't know. mean, my co-founder, Kyle, has this take also is like the, clod code is in this interesting place where it's like the original purpose. think of clod code was like, like draw more traffic to the anthropic platform, like make more people want to use anthropic models, prove that they're really, really good by like shipping use cases that have really, really good PMF. And like, there has been a little bit of this like interesting transition of like, there's a lot of like

Vaibhav (01:02:56.943)
Yep.

Dex (01:03:10.671)
People are unclear on what the terms are, when and where you can use your max plan and stuff like this. This is not like my take, this is just like what people are talking about on Twitter. one thing I think is like, they are trying to transition into a product company and it's not really clear. There's like basically competing interests between like make Claude Code and Claude Cowork incredible products versus make Anthropic the inference platform, an incredible inference platform. And those things almost like compete a little bit.

Vaibhav (01:03:33.401)
Yeah.

Vaibhav (01:03:38.724)
Yeah.

Dex (01:03:40.463)
And so it's interesting to watch them kind of like, traject through this journey and figure this out as they go. And I think this is what good product teams do all the time on both sides is like, you have to learn, you have to experiment, and you have to optimize for like figuring out what people want, what people are willing to pay for, like what is actually like really high, what is good enough to make people wanna like swipe a credit card for $200 a month.

Vaibhav (01:03:42.277)
Yeah.

Vaibhav (01:03:49.839)
Yeah.

Vaibhav (01:04:01.965)
Yeah, like they could, for example, turn off an anthropic API to everyone and just turn all their fossil and cloud code and say, you know what, the only way to use anthropic models is cloud code. And that will be an interesting decision if they made that. It would help. I agree. I agree. Well.

Dex (01:04:12.313)
Is

Dex (01:04:16.034)
I don't think they're gonna do that, like, is a thing that you might, that could, anything could happen, right? And you don't know what's the right call until you try it.

Vaibhav (01:04:22.967)
If their coding models are actually like super authoritative and they're actually winning, it's actually not unreasonable for them to do that. In fact, they might say that, hey, you can do this and you can use Anthropic except for building coding agents. Like coding agents are just not allowed to use the Anthropic API. I don't think they will do that because that would be absurdly silly.

Dex (01:04:35.791)
Yep.

Dex (01:04:42.169)
Yeah. I mean, they're getting there with the max plan, but the max plan is like, they're selling $3,000 of impurents for $200. And like, they kind of want to keep that locked down to like, okay, you're using our stuff. There's one question from Vignesh, which is like launching about the Cloud Agent SDK of basically like, if I use this in Cloud Code, is that the same as Cloud Agent SDK? And like, maybe we should do a deep dive on that, but basically, yeah.

Cloud Agent SDK is basically just wrapping the Cloud Code CLI binary. So everything that happens when you run .cloud, everything works the same if you use the Agent SDK, as long as you pass the right flags. So if you tell it to use setting sources.

Vaibhav (01:05:14.2)
same.

except you can't except the only difference is you can't use the cloud max plan anymore using the

Dex (01:05:23.375)
So I actually don't think that's exactly true because I read all the posts from like a couple of weeks ago. think the most important thing is like, don't use your CloudMax plan in OpenClaw, fine, whatever. Don't use it in OpenCode. Like basically don't use it in other harnesses because those harnesses generate traffic that Anthropic can't actually like.

Vaibhav (01:05:29.689)
Well, the rules are ambiguous.

Dex (01:05:45.711)
If you were using cloud code, it's generating like inference traffic that is exactly how they expect. It's optimized for their infrastructure. And so they can reliably send, sell you 200, $3,000 worth of inference for $200 because they know it's, they're not going to have to actually support it because it's being done in a way that they know they can support well versus like in open code or an open claw, the inference is totally different. The caching is different. All of that stuff is like completely different. And so they don't want to subsidize that type of inference.

I think the reason the whole kerfuffle with the terms like a couple of weeks ago of like, now you can't use it in the Cloud Agent SDK. I think the number one problem there is like, I know a bunch of founders who are building a SaaS on the Cloud Agent SDK. So not even like, all their inference goes through the Cloud Agent SDK and their take is basically like, if you are building a web app and you are serving inference to your users using the Cloud Agent SDK, you may not use your max plan for that. I think that's what the most recent change was about is like, if you are serving inference to customers,

Vaibhav (01:06:29.381)
Yeah

Dex (01:06:43.951)
like, or users, you should use an API key. Like, don't build your business on the Cloud Agent SDK. I think actually, if you're running Cloud Code on your workstation and you're using a product like Conductor or Riptide or one of these things to orchestrate it, I actually think that's probably like, it's still a gray area. haven't, they haven't like, and they may change their thing, but I think, I think the thing they're most worried about is people using MaxPlan to just like get cheaper inference for like arbitrary SaaS use cases.

Vaibhav (01:07:00.046)
Yeah.

Vaibhav (01:07:08.921)
Like Theo released an open code kind of competitor-ish thing and he was also just like, we can't add cloud code because like cloud code is very ambiguous.

Dex (01:07:15.759)
Well, that's different. That's in the open code, open clock category where it's like, hey, we don't know that you're going to follow the best practices for caching. We don't know that your traffic is going to work. We can't control the behavior with feature flags. If we want to turn off the extra inference, we can't. Versus with the cloud code, they can flip a toggle at a SaaS, and suddenly everybody's cloud code behaves differently.

Vaibhav (01:07:33.999)
That's fair. I saw there was a couple of chats on here that are talking about if people want the shirt. We're going to send something out soon.

Dex (01:07:42.159)
Let's get shirts. We'll get BAML shirts, we'll get human layer shirts, and we're gonna get, if you come to the Unconference in, I think we're gonna do April 11th, actually, I think we said March 28th last time, but we will have AI that works shirts for the Unconference. Yeah.

Vaibhav (01:07:54.233)
We'll get some, yes we will, yes we will. We'll keep it small, maybe we'll get hoodies, we'll see what we get. All right.

Dex (01:08:01.717)
okay. Okay, do you have any experience experimenting with the RPI workflow to define a product specification and then generates a beads? You gotta go.

Vaibhav (01:08:09.221)
I have to go, is 11 15, I'm 15 minutes late. I apologize.

Dex (01:08:11.339)
Okay, let's wrap it up. Thanks everybody. What's next week's episode?

Vaibhav (01:08:16.547)
I don't know off the top of my head. You got me in a trap. Come check us out next week.

Dex (01:08:17.551)
Alright, we're gonna figure it out. We'll have the announcement soon. I'm sure it'll be fun. Thanks everybody. See ya.

Vaibhav (01:08:24.003)
Adios.

Vaibhav (01:08:29.382)
Alright, I think it's gonna upload and then I'll be outta here. I'm not- oh shit, I-

Dex (01:08:31.823)
You're still live, dude.
