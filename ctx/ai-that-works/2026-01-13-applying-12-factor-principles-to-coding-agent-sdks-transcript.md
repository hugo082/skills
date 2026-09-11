Vaibhav (00:01.207)
Hello! How's it going? Alright. It is a good Monday or Tuesday or whatever day it is. I have been sick for five days and I'm glad to be back in full motion.

Dex (00:01.324)
Yo! What's up, dude? Good, man.

Dex (00:11.822)
Are you back? Did you immediately get better and then go write code for 12 hours?

Vaibhav (00:18.559)
Honestly, kind of. It was so fun. I was so sick for five days. I got the flu and everything and I was just like, I'm back.

Dex (00:25.868)
I saw something on X or Twitter where it was like, all the, all the, can just not get sick guys are awfully quiet this season.

Vaibhav (00:32.832)
You

Vaibhav (00:37.63)
I tried so hard to work on a stick and I just couldn't do it. Firstly, I will say it was awesome to wake up on the chat and then just see so many people from so many different locations chiming in. We got people from all sorts of places all around the world actually on the chat. That's awesome. We got people from Germany. Chamonix, which I don't even know where that is. Chamonix, where's that?

Dex (00:59.8)
Amazing.

Vaibhav (01:07.211)
France? Switzerland, okay. there you go. There you go. So we got a little bit of everywhere on here. So that's freaking awesome.

Dex (01:07.726)
I'm say Switzerland. I think it's a place to go skiing. Yeah, there we go. what's up, Mike?

Dex (01:21.29)
Incredible. I'm not sharp, I just have rich friends.

Vaibhav (01:24.119)
That is the way to be educated apparently about geography.

Dex (01:32.386)
Well, about ski resorts in Switzerland specifically. Sick. Should we do the intro?

Vaibhav (01:39.799)
Let's do it, kick it off Dexter.

Dex (01:41.422)
All right, cool. So welcome to the AI that works show where we talk about you guess it AI that actually works. We do a lot of live coding, do a lot of whiteboarding. The goal is that you walk away with real applicable learnings and things that you can use to build better AI apps that are more reliable, more performant, maybe better, faster, cheaper. I'm Dex. I'm the founder of a company called HumanLayer. We help people use coding agents to solve hard problems in complex code bases. I am joined by Viveov.

Vaibhav (02:10.711)
I'm Vaibhav, I make BAML. We make AI systems more reliable by building a programming language that does a lot of off-leaf thing for you, or on the heavy side.

Dex (02:20.654)
Amazing. And today we are going to talk about a really fun topic that's going to kind of like thread together some of the most, some of my favorite episodes we've done in the past, which are talking about concepts like 12 factor agents and also the ideas behind like.

doing context engineering with coding agents directly. And we're gonna give you a little bit of preview of kind of how we're thinking about better workflows and how to get even more out of research plan implement with structured workflows and kind some of the problems we had.

And then in, was it two weeks? We're going to do a live coding where we're actually going to just like spend a couple hours building features on VAML and kind of show some of stuff in practice. And I think we got Mike here. We're to try to get through the content by like 1040, 1045 ish. And then Mike has a, he hit me up this morning. He's like, I built this project. I'm like, wait, this is exactly what we're talking about on the podcast today. Like, will you come show it off? So I'm excited to see that as well.

Incredible. So let's talk about

Vaibhav (03:29.751)
You want me to screen share Dexter? I'll screen share the white part that you can just draw. OK.

Dex (03:31.438)
I got it. I got it. Let me, let me, let me steal.

Vaibhav (03:36.631)
Go back, take it. If you take it over, I'll just take it over.

Dex (03:38.862)
Yeah, let's just share this window. Sick. Okay, we talked about there's some concepts here and so I'm gonna go into... Yeah, that works. Not this episode. We talked in this episode of 12 Factor Agents, basically the ideas behind... there's no whiteboards on that one. All right.

You can go find the talk on 12 factor agents, it's everywhere. But we talked in 8.5 about advanced context engineering for coding agents. And we kind of talked about like understanding how a context window works when you're working with coding agents and like when to compact into a smaller file and like how all this works and thinking about impact and like research and then planning and then implementing.

And then the main idea behind 12 factor agents was you would basically have this like agent loop that would determine a next, it would call a tool and you would have a ton of different tools you could call and then this thing would just loop forever until you hit your exit condition, right?

Does make sense? Bye Bob, following. This is your like, determine next, we call this like, determine next step.

Vaibhav (04:56.79)
Mm-hmm. Mm-hmm.

Vaibhav (05:03.606)
Yeah, you're basically asking the model, what should I do next? You can think of like a switch statement.

Dex (05:06.466)
Yeah, yep, and then over time you're building up your context window with like, okay, user message, tool, tool, tool, tool, tool.

response, et cetera, until the model says like, okay, now we're actually done. And the, the, the like, kind of like idea from 12 factor agents is like, this was cool because it let you take a, like what used to be a deterministic workflow of like, okay, we do this and then we do this and then maybe we do this or we do this. And this was all, this is how we used to write programs, right? It was like deterministic code. There was maybe some looping and then this would take you back to here until it was done. And then eventually you would get to some end state, right? And the idea with

like 12 factor agents was you could just take all of these like potential, I guess they're not nodes but they're edges, like what are the state transitions available to the model and you could just say like cool here's all the tools you have, here's a thing, here's like a problem.

or like an event or a question or whatever it is. And the model would be like, okay, I have to call this tool. Now we have to call this tool. Now I have to call this one again. Now we have to call this tool. Now I have to call this one again. And then eventually it would like make its way to the exit without you having to hard code all this logic. And so this stuff would be kind of like, was, was the, the, promise of it was like, okay, you write less code. You just give the model a prompt and a bag of tools. And the issue we found was like, as this context gets really, really long, like more than, you know,

and tokens models can get, especially last year in like mid April, models could get really confused and they wouldn't do a very good job. And so we kind of reframed how we thought about this from like tools in a loop to like, you have like a set of like prompts and maybe you have like,

Dex (06:56.424)
small sets where you're like classifying between nodes. And then this would go through some deterministic code, right? And this would have a step and this would have a step. And then you would have over here, you would have like another generative AI step where maybe this one is like a little like, like tools in a loop where it might go like, you know, it might do something in loop back or it might immediately exit. Yeah.

Vaibhav (07:15.05)
Yeah, the idea, the idea I think... I think the idea you're describing Dexter...

The idea that you're trying to describe here is that models give us a way to loosely have, basically have state transitions that are undefined. But the more state transitions that you have that are undefined and the less concrete your system is, clearly the more unreliable it becomes, especially for longer running tasks. Because longer running tasks require more state. So if you have a probability of, say, one thing going wrong out of every 100, if you only have one step, it'll work 99 % of the time.

Dex (07:29.74)
Yes.

Dex (07:39.171)
Yeah.

Vaibhav (07:50.889)
50 steps, think that's going to be like a, that's quickly going to drop like a 60 % accuracy, even if it picks the right step one every 100 times. It picks the right step every...

Dex (08:01.07)
Yeah. Do you want to, do you have that, do you have that graph handy of the like fall off of like, you're like 98 % like accurate, how quickly the, yeah.

Vaibhav (08:07.944)
I do. I'll snap that in there really fast.

summer.

Dex (08:15.426)
find Lang chain had this graph. I think it was like cognitive architectures. and they had this, this was from a while ago, but I think this is still relevant, which is like code versus one LLM call versus chaining LLM calls versus like a router that decides like which step goes next versus like fully autonomous that like decides which steps are available to take. where they had this like

autonomy versus determinism workflows. Let me see if can find this.

Dex (08:54.798)
They had this, well, I'll just draw it. They had this chart that I think was really, yeah, so this is the chart that I was talking about, right? Where it's like, depending on your accuracy, even if you're 99 % accurate, if you're doing 20 steps, that potential to veer off course compounds very quickly, right?

Vaibhav (09:10.742)
Yeah, like you're just not going to have good results if you're doing it right. So like the idea is that the... Yeah, go ahead. Go ahead.

Dex (09:14.51)
Yeah, and so you have two levers. Yeah, go ahead. I gonna say, you have two levers. You can make this gap smaller. You can make the accuracy of the tool calling better, or you can make this context window smaller, and then the poor accuracy matters less.

Vaibhav (09:33.044)
Yeah, that's literally the only two things you can do. Everything else doesn't matter here. For anyone that tries to sell you any product or anything, like the only two things you can do is have fewer steps or have a more accurate step selection system. Everything else is totally garbage in terms of making your system better.

Dex (09:51.098)
and so yeah, it's like more deterministic. There's like two curves here, right? It's like, as you're more deterministic, you're like, you're, you know, what is this? Like uncertainty.

Vaibhav (10:03.552)
Yeah, it's like very variance.

Dex (10:06.508)
Yeah, variance, also like the variance goes up, but also like the other thing that increases here, I really wish I could remember this chart because it was nice, but it was, and the other part was like, it's also like your robustness goes up, right? If in this workflow,

Vaibhav (10:21.046)
You mean the other way around. Robustness goes down as you become less.

Dex (10:26.402)
Well, the thing I want to talk about is like, if you have this full deterministic workflow and one of these fails in a way that you don't predict, then you are screwed. But if you have a thing where like on an error, we loop back to an LLM step over here, then the LLM can try to wiggle its way out of the error in a way that you might not have thought of. Yes.

Vaibhav (10:32.699)
yeah, Yeah, I see what you mean.

Dex (10:51.99)
So there's like this interesting, yeah, this is interesting trade off that I think is really important to think about in AI engineering, which is like.

Vaibhav (10:52.104)
I hear what you wanna say.

Vaibhav (10:57.598)
I think what you're trying to solve is like variance of inputs also goes up. Like the variance of inputs of what you can handle also goes up. But I think the thing that I was talking about is the thing that ends up going down is actually, let me put this over here. The thing that ends up going down is like the consistency.

Dex (11:02.028)
Yeah. Yeah, where the... Yeah.

Dex (11:15.458)
Yes, I like that. That's great.

nice. Cool. so anyways, there's this thing in AI engineering, which is like, where do you want your application to be on this spectrum? Right? You get to decide for a specific piece of work and for the entire pipeline, like how do you want to build this? and the lesson from like, 12 factor agents was this idea of like, let me see if I can find the slides here. let me just, I'm going to pause the share and pull up this one slide.

Vaibhav (11:53.142)
While you pull that up, people asked, is Claude Code still the main workhorse for YouTube? For me personally, I actually rotate still between Claude Code and Cursor. And actually funnily enough, I use the antigravity sometimes.

Dex (11:54.488)
Yeah.

Dex (12:07.618)
What did you think?

Vaibhav (12:10.225)
I honestly can't tell the difference between models most of the time. If I'm completely honest, I feel like I use, I think I got my cursor summary and the funniest thing was like, cursor was just like, you can just see my pattern. I usually just pick whatever model is the most recently picked and I just use it. And that's it. And at some point I changed the model and then I switched and stay over. And that's all I do.

Dex (12:15.667)
Hahaha

Dex (12:30.295)
Yeah.

Dex (12:35.542)
Yeah.

It's getting more of like, what can you build on top of the model to customize it for your workflow and your team and your code base and who's got the best UX and like it's how the end of the day is like, are the outcomes? And I think as far as like the driver model, all of the labs building models are getting pretty good at this, like RL, the model on the harness. And that was an innovation last year that like just made these things like good enough to be actually usable. I guess the story I was going to tell was this idea. I don't actually have a slide for

Vaibhav (12:40.743)
Exactly.

Dex (13:06.21)
I think it's just a story that I was telling so I'll just draw it out. But basically, let me see. Is this gonna let me share?

I had built this...

Dex (13:20.334)
I had built this project where it was like, I have this make file. You you ever use a make file? You're a C++ guy, right? Sorry. Yeah. Are you a Just File guy?

Vaibhav (13:26.921)
Yeah, I hate make files, but I accept them.

Vaibhav (13:34.197)
I honestly prefer now Cargo.Lock and Cargo.Tumble. Cargo is the way to go. People should never use Make.

Dex (13:39.19)
Okay.

Okay, you heard it here first, hot takes. So I had this make file and then I built this tiny little agent and it had two tools and it could do run, it was like read make tasks and run make tasks and it would just run the thing and give it the output, right?

And I said, you know, hey, go build the project. And it freaked it, it messed it up. It got the wrong things. Like there was like a Docker thing that needed to happen. It just like couldn't really understand how to build the project. And this was also like, I think this was like Sonnet 3 or something. This was like before the really good Sonnet 3.5 model came out. And so like I started adding more directions. Like you have to build before you compile.

and then I got parts of it right. And then I just kept adding more and more instructions here. And this is what I call control flow via prompt. And the lesson after the two hours of getting it working was I had literally just written run these seven tools in order and like.

go from there and if one of them failed, it couldn't really figure out its way out of it. And so like, the lesson there was like, okay, if I had just written a bash script to run this make file in order.

Dex (15:00.597)
it would have taken me 90 seconds. And so was like, not everything is a good task for an agent. And if you know the order stuff is going to happen in, then you probably don't need it. Like you probably don't need an agent if you know the workflow order. And that's going to take me to like, what we're going to talk about today on the show is like, how do I apply these 12 factor agent principles to coding SDKs?

Source prompts. So this is a prompt that I'm sure many of you are very familiar with. This is the like OG create plan prompt from human layer. And this is a instructions to take some research and turn it into. So we have like, you know, a research document and then like a task, like a ticket or a PR, PRD or something, like a description of what we want to build. And we take these and we give them to Claude and we get out a like plan.md, right?

You've used this, Viobov? I think we've used this on stream before. Yeah.

Vaibhav (15:59.292)
used this on stream. We have seen this over here.

Dex (16:02.198)
So it's got a lot of steps. So it's got like outer steps and inner steps, step one, step two, step three, step four, step five. This is just to get the setup and tell it like, here's what we couldn't figure out yet. And then it's like, go research the code base and spawn parallel subtasks. And then it's, know, structure out the plan and work back and forth with the user to ask, there's like a design question step of like, okay, here's where we are. And here's like the open questions and things like this.

and then we actually go write this plan file. And so inside of this like single prompt with tons of guidance and instructions, there's actually like embedded inside of it is a workflow. like create plan actually has like several nodes in the workflow that are like research, current understanding, know, do additional additional code base research.

And then it's you know, design discussion with the user. That's, I'll just take a screenshot of this and drop.

Dex (17:11.148)
So yeah, here's our design options.

Vaibhav (17:12.501)
And really the key idea here is like, anything, any process that people embed anywhere in the world often is described as a workflow. Sometimes a workflow is well described and there's a really well understood control flow in that workflow. And sometimes a workflow is like, it's just hand wavy instructions that are approximately what you should do and you need to use your best judgment along the way to adjust things as you go.

Dex (17:20.483)
Yeah.

Dex (17:40.726)
Yep.

Vaibhav (17:42.163)
And I think what you're saying here is like this sounds to be like a little hybrid of both of these.

Dex (17:47.476)
Yeah, mean, so the idea was it it has a lot of steps. And so it's like there's these things and there's things that need to go back and forth. And I'm going to go kick off a couple of these in a sec. So if I go to let's make a new task here.

Dex (18:07.426)
Hang on, if it works.

human layer. So this is going to be.

Dex (18:20.48)
Okay, that's a bug.

Dex (18:26.606)
If I pop in here and set a new session, just say, create plan, we're gonna update the MCP server to use streamable MCP on the HLD service. This is gonna start going through the workflow. I'm also gonna launch another one of these. This is like a thing that we found was like,

Really when we were with customers and people were kind of like rushing through this, there was often like the model would basically skip steps. There's like a ton of instructions in here and it wouldn't always do these two phases, which are the parts that actually make the plan really good. If you just tell it, here's what we want to do. And it like slops out a file. You're probably not getting much better results than if you were like, Claude, go write this code. And so like the thing that made planning really powerful were these things that happened earlier in the conversation state, because like the way this

context window looks is you have your system message, you have your user message, and the system has all the like prompts and tools and MCPs and all this crap. And then you would drop in your user message, and then it would like go do some tool calling that was like pretty sparse, right? It would do some research and things like this. And then the idea was the assistant would ask you like design questions, right? And then you would have a user message.

And then it would ask, you you would go back and forth here and then you would like say, okay, that's good. And then it would tell you like, you know, structure outline or the phases, right? What order do you want to do these things in to make it like testable and incremental and like easy to catch it before it's out off track. And so we would do all this stuff. And then, and then finally at the very end, we would write the plan. And this was like,

10 % of the context window, because these end up being like thousand lines. It could be like five to 10 % of the context window. And then if you wanted to like iterate after this and give it feedback, you're already like close to or deep in one, you're like close to or deep in the like smart dumb line.

Dex (20:33.966)
your performance is degrading because you're so deep in the context window. also, the model is now most of the context window and most of the attention is on the decisions the model made to write about how we're approaching this. And so what we found was often you would get...

you know, you would send your user message with the prompt and the model would go and it would do some research and then it would go straight to writing the plan. And so you're already very much like trajectory, like most of your context windows, like we're going in this direction. This is what we're doing. We're going in this direction. This is what we're doing. And so if you wanted to give feedback here, it was like much lower leverage as far as like being able to adjust the plan mid flight versus these like short back and forth, which are still very early in the context window.

like very context efficient way to deviate from what the model wanted to do before it goes and dumps out all these tokens. Does that make sense?

Vaibhav (21:37.28)
See.

The other thing that actually ends up being true and exactly what you're saying is that let's say you did provide feedback in the second ladder half over here. The what ends up happening is when you provide feedback here and it rewrites the same plan, it takes your feedback and then adjusts it for like parts of it. And it might even catch like some other, it might apply the feedback there, it might apply the feedback there. But almost definitely what I find is like it would totally forget the feedback that it needs to apply over here and the feedback that needs to apply over here.

Dex (21:45.176)
Yeah.

Dex (21:55.427)
Yeah.

Dex (21:59.992)
Yeah.

Dex (22:06.828)
Yeah. Yeah.

Vaibhav (22:08.102)
So it actually became a lot more inconsistent as it did as well because editing with consistency is a much harder task than creating with consistency.

Dex (22:17.92)
Right. Yeah, because you're changing trajectory. This is the same thing of like re-steering the model in the middle of a workflow, right? It's like, okay, it was going this direction. And now you have like noisy instructions where it's like, the user said this and that meant this. So I did this. And then the user said this. So I have to like ignore all the things that came before it. And it's just like more, I hate to describe it as like mental load on the model, but you just want to reduce the number of things it has to think about. And Kyle wrote this really good, sorry, say what?

Vaibhav (22:24.871)
Yeah.

Vaibhav (22:36.071)
It's very hard.

Vaibhav (22:41.512)
Yeah. I've actually personally, I found personally the same thing. What I often found is like if the model, so when you go back and show the diagram again, what I found is like, there's actually a trade off here in both these sides. On the left side, the trade off is it's a little bit slower because it's more interactive, but I usually get a much better result. On the right side, it's much faster. It's literally like 10 to 15 minutes faster to produce the result.

Dex (22:52.481)
Yeah, yeah.

Dex (23:01.644)
Yeah.

Dex (23:06.028)
Yup.

Dex (23:09.667)
Yeah.

Vaibhav (23:11.38)
But the difference is it's often right the first time around. On the left side, on the right side it's just not right all the time. But what I've found is what I will often do is I'll actually kick off two different tasks. Or I'll just do the right task first and if it's like 95 % correct I let it go. And if it's not I actually delete it and then restart from left and then force it to go down the left path manually. Exactly.

Dex (23:19.459)
Yeah.

Dex (23:24.194)
Yeah.

Dex (23:33.066)
and make it, make it do the district. Yeah. Make it do the discussion. And so this is like a.

Vaibhav (23:37.299)
Because it's exactly what you talked about earlier in that diagram of control flow versus variability. Yes, I got a high variance outcome that handled a really wide output. But if it works, great. I'm super happy to have it. And if it doesn't, instead of trying to steer that incorrectly, just go back and start from zero and build a deterministic workflow that I actually need.

Dex (23:59.938)
Yeah, and so like we can do this with prompting and like a thing that people have found works and that we've like recommended to a ton of folks is like, you can look at this one and this one literally just, okay, so this one did ask questions because it wasn't very clear, but if you give it a research doc and like a ticket, it will sometimes just blast through and skip those steps and just write the plan. I don't have a perfect demo of that, but I'm sure you all have seen that. Believe me, it happens a lot.

And so the challenge that we had with that was like, okay.

There's this, there's this doc that Kyle wrote a really good blog post on like writing a good plot, clot MD and he include this study, which is like, you know, how, how many instructions can you give a model before it starts to lose track? And so we had like frontier thinking, ELMs can fall about 150 to 200. This was like six or seven months ago. So it's probably higher, but at the end of the day, like if you went through this prompt and counted the instructions, there's probably over a hundred instructions in this. and some of them are like repeating the same thing over, but it's like,

Every time you put in all caps, like you must, important, critical, never, the model can only attend to so many instructions at a time. And so what we ended up doing in some experiments in the code we'll walk through today is basically like breaking this up into separate workflows and then using structured outputs to like define those workflows.

And so we talked about microagents and 12 factor agents, but basically what we have is we have like, you know, user ticket or like query. and we would pull in like a research doc as well. Usually, this whole workflow can be broken down, but we're just going to focus on planning here. and we put it into a like agent that is just the design phase, right? And so, this thing is basically like goes and calls tools. And then the final answer is like a structured object.

Vaibhav (25:57.15)
That's the actual design.

Dex (25:59.49)
that is the actual, well, it's the actual design. So it has like current state, like is like a string array, know, desired end state.

string array, and then it has open questions. And this is an array of objects that is like, title.

question and then like options that it may want to suggest. So like option A is like A do X, Y, Z, know, B do ABC. Yeah, exactly. Yeah, okay. All right. And then maybe a recommendation also is like recommendation like.

Vaibhav (26:37.662)
Sure, it's like use MCP and don't use MCP. There's only one right answer, but yes.

Dex (26:52.67)
use option A because it's good for these reasons, right? And then you would have like a list of these questions. And so what's cool here is that like, you can still take all this data and format it for the user.

Dex (27:11.896)
but you can also feed this into your deterministic code and you can say like, and I think what we did also was like a like resolved open questions so that it knew where to, it could like put the information somewhere. And this would just be like a, like what are the decisions we've already made? And so every turn of the loop, this thing has an inner loop and an outer loop, right? And so in the inner loop, it's, you know, the standard like clod code, you know, read bash edit.

Vaibhav (27:25.364)
So good, yeah.

Vaibhav (27:40.434)
Yep. It's like the CloudCode loop.

Dex (27:44.396)
Yep. And so this will loop for a while and do all the things that cloud code can do. And then at a certain point that assistant outputs its final answer, and then you have an outer harness, which is like, okay, cool. Like.

All questions answered. And if so, we move into a totally different prompt that is constructed for the structure phase and it has different instructions and it's basically like feeding slices of this prompt into the model incrementally throughout the workflow. And so this looks exactly the same. think this one's structured output was like, instead of open questions, it was, we kept, we kept this stuff at the top because we want to keep feeding that same information in, but we would.

have like the resolved questions and then we would basically feed in the, sorry, all questions answered and then we would take the ticket, the research and the structured object from the design discussion. And then this thing outputs like a list of phases, right?

Vaibhav (28:45.255)
and see you then again.

Yeah.

And I guess a key thing that you're trying to say here is like, look, sometimes it does make sense to have super high variance and that is great. But the problem is the more often you do a task, in this case, RPI research plan implements to render code, the more useful it is to codify something more regularly. Because then you can have an expectation of how I find that so many people go down this route when building anything with AI. You build something and initially you start off saying, you know what, we're going to use, we're going to completely

Dex (29:02.648)
Yeah.

Dex (29:06.925)
Yup.

Dex (29:14.668)
Yep.

Vaibhav (29:19.493)
vibe everything we use AI for every decision point everywhere because if you go back to that chart that we do earlier the XY chart

Dex (29:23.16)
Yep.

Dex (29:27.958)
Yeah, because you don't know what the space of inputs are, so you want to be able to handle a higher variance of inputs. And then, yeah.

Vaibhav (29:30.522)
Exactly. Everything.

And then what ends up happening is you want to bias you and every single person that does AI always does this. Like you start off over here and you're like, okay, well, I clearly want to bias. I want to bias for this direction in the beginning because I just need it to work. And when people try my thing, it needs to work all the time. And then you're like, okay, people try it now for truly a large variance of inputs that you never predicted for. And then you're like, okay, well, what I really want is for this large class

Dex (29:48.531)
Yup.

Dex (29:53.891)
Yep.

Dex (30:00.131)
Yep.

Vaibhav (30:04.167)
of inputs, I want it to work with really high certainty and I want a lot more consistency. Yeah, so then you quickly are like, okay, well, I'm going to lose 20 % variance and instead I'm just going to move my system over. Why is it so big? I don't know how to fix this. We're going to change this because I cannot possibly. You want to lose a little bit of variance and you kind of move yourself over this way just because what you really want is consistency. And then you're like, hey, actually, turns out I

Dex (30:07.788)
Yeah, you want high consistency. Yep.

Vaibhav (30:34.107)
consistency and high variance. So then what you end up doing is you write way more layers like what you did is you have loops within loops within loops that kind of compose well together and that composition is what moves it up on the stack. So you're both able to increase the consistency and the variance by having kind of loops composing within loops and the trick is like this is basically just software engineering. You're basically just saying like I'm going to add a little bit more rigor into my system

Dex (30:44.387)
Yep.

Vaibhav (31:04.017)
and like battle test it a lot more. And I'm gonna apply constraints in the most critical joints possible. And now all of a sudden, I have built a system and not just a prompt and therefore it works way better. But it's often this too.

Dex (31:19.404)
Yeah, and so eventually you end up up here where you're more consistent, but you're also can like tolerate a high like variance of outcomes basically.

Vaibhav (31:27.729)
Yeah, it's probably not as variant friendly as the one all the way on the right. But the winning consistency is still well worth it because if you have a large number of people doing the same, a similar enough task, consistency is actually way more variable, way more useful than variance.

Dex (31:32.867)
Yes.

Dex (31:45.23)
And so this is actually the thing, you talked about this too, for classifiers, right? You have a classifier that is like a really small, tiny ML model that can classify out of a thousand, the thousand most common categories. It can like run on a CPU and do that. And then the 1001th category is other.

And if it goes to other, then we send it to an expensive LLM. And so you have both consistency, speed, performance on the parts that like, you know, are going to happen common. And then you have an escape hatch where you can handle like less common cases. Yep.

Vaibhav (32:20.037)
Exactly. That's literally the route I see every single AI system working at every single one of the times. I think someone asked a really interesting question not too long ago in the discussion. Shush, by, where'd go? I think it's by...

Dex (32:24.278)
Yep.

Dex (32:28.642)
Yeah.

Vaibhav (32:37.939)
Uh, chart, um, Mike? So I don't know who it was. Someone asked this really good question. I'm like, Hey, if I add things like judges or something else that make individual steps better, can I suddenly increase the accuracy of every single system? If you go back to the thing that you were describing down below, Dexter, and the new coding workflow that you had, uh, like the structured output, I think a lot of people are like, Oh, well, I think the more, the next intuitive question to ask is exactly what that person asks, which is, Hey, can I add a judge here?

Dex (32:56.278)
Yeah. Yeah.

Vaibhav (33:07.893)
that kind of builds a judge system here to see if this is good or bad and then makes this work. And I think this ties back into kind of like what we've talked about in the past about latency and consistency and user expectations. You can always add a judge here and like technically maybe it'll get better and the judge doesn't have to be an LLM, it could be a human, it could be a manual eval, we've talked about so many different kinds of evals in the past. But the problem is if you add a...

Dex (33:22.168)
Yeah.

Dex (33:34.274)
This doesn't have to be structured. could be human says, yes, ready to proceed versus, versus like, no, let's, let's keep working kind of thing. doesn't have to be AI generated at all.

Vaibhav (33:38.994)
Yeah.

Yeah.

But the trade off here is like, whatever you do here, it really is about having a process based checkpoint into actually go do this. You think about like code reviews. Why do we have code reviews? Because we don't want people to manually push the main and break main. We want to have a manual process that artificially slows down the system of submitting code because we want to make sure that entropy in the code base is manageable and well understood. In a coding agent workflow, what that person asked about a judge workflow and what Dexter

is doing here is he's reducing entropy in the downstream layers by basically validating and having some level of consensus built at some checkpoints. Now what's really interesting is, and I want your thoughts on this Dextre. What you could really do is you could kick off this process, but then while this is running, you could kick off some background process, which is a very expensive agentic loop who's actually evaluating this in the background and everything.

Dex (34:42.562)
the entire conversation.

Vaibhav (34:45.284)
maybe just even the design phase step and then if it finds some weird thing that you haven't thought of then it notifies you in this phase of like hey it does a pop-up and then says hey I found something is this correct do you want to add this to your design decision or do you want to restart with this context in mind and I think that is

Dex (35:04.172)
Yeah, do you want to roll back to the design phase?

Vaibhav (35:07.574)
Or just append this one information into your current structure phase, or just say it's okay. And what's really interesting about this kind of thing is this is kind of, think, the true benefit of really interesting UX that you can do with agentic workflows, which is you can let the user go down the golden path, but then be double checking on their behalf with just a background script that's doing some really interesting behavior.

Dex (35:20.963)
Yeah.

Dex (35:31.662)
Yeah, you could even kick this off. You know, one of the things that I am like we're working on is like the research process a little slow. This thing does its own research like.

What if we just jumped straight into design discussion and then had the research happen in the background and as you're talking, you just inject messages into one of these conversations of like, I found a new insight or like I found a new pattern to follow or something. Like, do you want to pull this into the conversation? And that's where the UX comes in and like, like finding the right balance of like, how do you get people really, really good results? Cause at the end of the day is like, I want to ship some code in a complex code base.

And so everything you can do, there's so much like out of the box. I haven't, I hadn't thought about this, but I love this of like just doing constant re research in the background while everything else is running.

Vaibhav (36:14.674)
Yeah, and a lot of people I think think of coding agents as different than regular agents, but they're not. The principles that we talk about everywhere apply every single place. Like if I'm building an agentic workflow for my application of any kind, I almost always would recommend someone that's doing a mission critical, heavily human in the loop workflow to build a background agent like that. Because that's the only way to give the user the balance of speed along with consistency. Because it's fast because you're going down the goal, you're assuming correctness as

Dex (36:19.372)
Yeah.

Dex (36:27.948)
Yep.

Dex (36:33.517)
Yeah.

Yeah.

Vaibhav (36:44.688)
move forward, but it's correct because it's pinging you proactively in the background and validating the assumptions kind of more thoroughly as it needs to.

Dex (36:56.44)
All right, I have some homework. You wanna look at some code? All right, sick. So we have a couple basic little scripts here. Let's just jump over here.

Vaibhav (37:00.07)
Let's do it.

Dex (37:12.686)
What is it? CD? What is the name of this episode?

Vaibhav (37:17.97)
applying 12th, yeah.

Dex (37:20.026)
2026.01.13. Yeah. So we can do bun run. So we have some very simple ones. I think there was a hell of a yeah. Bun run source chat. So this is just a really simple hello world of the Claude agent SDK. And so this is just like code that we wrapped around the SDK that just like takes the user message and like tell me what's in the readme. You know. And so this is Claude code under the hood. just wrapped the agent SDK with a non-Tui UI just printing messages as

as go. Okay, so it's gonna try to read the readme. It doesn't exist. So this is a really basic one. What we've built on top of this is basically something called structured planning. So this is those like three steps of the planning workflow with like deterministic schemas for each one. So like step one design, we have summary and then we have open design questions. And then we run through the conversation. I'll run this in a sec.

And then we have the structure outline phase. So it's like, if, let me go find the actual workflow here. Yeah, so we do design discussion and then we pass in the questions to the structure outline. I think this should exit when all the questions are answered. Let's see. Yeah, so we print them out and then.

Dex (38:45.154)
We might have to vibe some changes into this. I was doing this last night, it was working, so I might be looking at the wrong one. But let's run this and I'll show you.

Dex (38:55.512)
Yes, this one. So here's our structured planning demo. So this is going to ask me for design questions.

Vaibhav (39:02.268)
Can you press hide at the very bottom of your screen? Yeah. Thank you. Yeah.

Dex (39:05.258)
yeah, yeah, yeah. And we'll make this a little bit bigger. I want to write a banger read me for this repo. And these are really smaller like promises like research code base, then ask questions about the user wants to implement this when all the design questions are answered, set open design questions to an empty array. And so the model is using structured output here.

we ask it in the actual query. Where is the query? Yeah, here we go. So we use the message generator and then we tell it, hey, the output JSON is this schema here that we have set up for step one.

And so this is going to go do some research and go find the thing. And then when it's done, it should auto advance us basically to the next step of the workflow. I got to go find where do we return? Yeah. So we just return the output. Interesting.

Dex (40:03.982)
Another, while this is running, yeah, so it's like, okay, response, answer questions. it's using the ask user question tool. It's not supposed to do that. Alpha software, guys. I think Opus was extra smart last night. One, two.

Vaibhav (40:23.03)
it's probably, yeah.

Dex (40:33.742)
Structured planning to out output to only advance if no open questions. So this is the idea though is you can stitch these things together with structured outputs.

And then there's other fun things you can do with this. like here, we're using the Claude SDK's built in structured output tooling. So we take the schema, we pass it into the SDK. We say, here's the output format that we want. But we can also do this with BAML. So here's like another one I'll kick off, which is like, we just, don't give it a structured output.

But we just wait till the end and then we run a BAML function that is like parse and structure the design discussion into an object. And so you don't have to use the built-in sod schema stuff. You can also use BAML. So this is like, again, we just have design output, parse design discussion, like turn it into structured JSON. And then we just use the schema as the prompting.

Vaibhav (41:35.538)
So idea is you're doing more like, this is more like a reflection based system where like the prompt is very flowy and then you're basically producing structure output at the very end of the system rather than doing it along the way.

Dex (41:46.946)
Yeah. Okay. So this one finished and so it did output, you know, here's the summary and then here's the open questions. And then we actually take those structured open questions and we ask it, the user can't exit. The only exit condition should be if the array is empty.

Dex (42:10.83)
So this is gonna keep me in the design phase and then the idea is like you can do some like deterministic code to just say, there's no more open questions, let's move to the next phase. And you can wrap this with the BAML thing too, right? You could say like, know.

Vaibhav (42:26.767)
And then what's a trade-off of doing this? Like, what am I losing when I do this?

Dex (42:33.938)
What you're losing is you lose a little bit of fluidity. Okay, so it's the end. Now it's no open design questions, so it's proceeded to the structure outline. So that was working. I just couldn't find the code.

Vaibhav (42:43.567)
Like why, why should I as a developer prefer doing this over using cloud code?

Dex (42:49.826)
So this is Claude Code Under the Hood.

Okay, yeah, this one is using like, it's approved, ship it.

So yeah, so we have this user approved outline false. So the idea here is like we built a create plan prompt and we built it into a product and we gave it to a bunch of people and we found that they couldn't get good results consistently because the model would not actually reliably follow all the instructions in this prompt. And so you, the reason to use Claude code with this basically is like, because you still, you still get a good coding agent. You're just like,

giving it smaller bits of work and you the human are kind of defining the workflow across. And so like you're forcing the compaction workflows in between.

Vaibhav (43:37.029)
Yeah, the idea really is just like being very deliberate about when you're exiting a cloud code context.

Dex (43:44.494)
And basically the frequent intentional compaction, used to be a lot on the user to make decisions about like, okay, I have enough here that is compacted into a file or something. I can go start a new conversation for the next part of the workflow versus like that requires your users to be experts in the workflow, whether it's legal or coding or whatever it is.

but in this way you can kind of like give them the workflow and guide them through it instead of...

Vaibhav (44:17.615)
Yeah, it's like a more opinionated coding agent. A coding agent that says, hey, instead of just vibing with me and letting me do whatever you want, you're gonna force, it's kind of like a style guide is what I'm hearing around like a coding agent where like you're basically enforcing a style guide that says if you're gonna use a coding agent, you must use it with this process. And that has, what I find interesting, yeah, what I find really interesting about this is,

Dex (44:25.005)
Yeah.

Dex (44:39.5)
Yeah.

The straight offs, right?

this chart.

Vaibhav (44:48.355)
What I find really interesting about this is if I were to apply a style guide, a style guide is not really about making sure that all code is always beautiful. It's more about making sure that when someone new joins the organization and someone new tries to learn something, there's less questions they have to ask and there's less that they have to figure out. So...

Dex (45:06.124)
Yeah, it forces, it makes the default thing the correct thing instead of them having to learn how to do this stuff. And it's just the same for coding agents.

Vaibhav (45:10.598)
for.

Yeah. Yeah, exactly. And I like that principle. think if I had to go teach a gene engineer how to go do this stuff, I'd probably suspect that the gene engineer will get way better consistency by following a robust set of steps versus a... How would I describe it? Versus kind of like a... Excuse me.

versus using like a generic cloud code. Because generic cloud code will produce lot unless you know what you're doing. Like on our team, we spend a good amount of time. I think for everything we code gen, we actually spend a lot of time doing building tooling around all the code to actually help us evaluate the code in a really, really good way. And I can show you some of that tooling if you're interested in how we did it. But there's a lot of cleanup that we end up doing.

Dex (46:02.07)
Yeah, I got a couple more things. Yeah. Yeah. So I'll show a couple more things, which is like,

Everyone's obsessed with Ralph Wiggum this week. I know we talked about this back in October, but you can also use this to do things like Ralph. So you don't need the bash loop and you can do these kind of like, can wrap it in a deterministic harness of like, it's either run once or run forever, but you can do your well true in here. You can, you know, look at the, could, you could assign a structured output to this and decide, Hey, have we met the exit condition based on what the model actually like outputted?

And then this is just gonna run forever. I think we have a Ralph MD that is like you were building, there's no specs in this one, because it's just simple, but it's like, yeah, you're building a SaaS platform for burrito delivery operators, right? This is my favorite vibe coding benchmark is how good of a burrito ops SaaS platform can it make? I got this from Ben Sweard-Lowe over at Freestyle.

Vaibhav (46:52.943)
I love burritos.

Vaibhav (47:02.545)
thing.

Vaibhav (47:06.129)
burritos for lunch today. Anyway, sorry. Back to AI. Cool.

Dex (47:07.47)
Hahaha

Dex (47:11.63)
Back to AI. I actually, have, Mike, are you still, is Mike still on? Mike built a actual like more complete version of this for his team, because they wanted to use Ralph and he wanted to build like a structured workflow around it. Let me see, I'm gonna stop sharing. Can I invite Mike up to, how do I invite somebody?

Vaibhav (47:35.634)
you send them the invite link directly.

Dex (47:39.168)
Okay, okay. I think we still have Mike. I did tell him 1040 and we're about 15 minutes behind because I was late today, but let me see.

Vaibhav (47:52.102)
Welcome, Mike.

Mike Hostetler (47:52.951)
Hey, you guys hear me okay? It's going that much man, how are you? Good.

Dex (47:54.381)
he's on. There we go. What's up, dude?

Dex (47:59.638)
I'm good man. So Mike's a buddy of mine. I think we met at AI engineer World's Fair in June. Talked about all things coding agents. He's in all the fun coding agent group chats and he is constantly pushing the edge of I believe he's the the the elixir guy. If you want to do agents in elixir Mike is the guy.

Mike Hostetler (48:15.991)
I am the Elixir Guy.

Elixir and OTP, massive agent swarms and a lot of multi-agent stuff is where I play. So, and teaching, I have a whole team of 25 engineers that I'm teaching AI coding to. So, yeah.

Dex (48:23.214)
You

Yeah.

Dex (48:32.95)
Incredible. And so you had an issue where people wanted to mess with Ralph and you were like, okay, let me give you something a little bit safer than just go YOLO mode in a bash script. Do you want to talk about like why you built that and maybe like share your screen and walk us through the code for five, 10 minutes?

Mike Hostetler (48:37.049)
Yeah. Yep.

Mike Hostetler (48:45.525)
Absolutely. So a couple of problems and where I started from that led me down this road. One, I like Ralph Wiggum. I like the idea of teaching that the context window one shouldn't be filled up entirely. There's the dumb zone. We don't want to run into a lot of compaction because compaction is lossy and you lose intent. So that's kind of one concept that I've really anchored the team on.

The second is the research planning and implement flow. And we've done a lot of work with that. have tailored RPI prompts that in our Brownfield code base, which is a five-year-old TypeScript Firebase code base. There's some, there's some stuff in there. There's some dragons. And so the intent was how do we step out of that? And how do I teach this with some training wheels? So, you know, classic.

idea springs up and. I wanted to strap a deterministic workflow around Ralph Wiggum. And there's three layers, so the top is I wanted to be able to see the prompts that were generated. The research prompt, the planning prompt. I wanted to see the outputs and put those into our code base for learning. Absolutely. I'm going to share here.

Vaibhav (50:06.928)
Do you want to show us as you're talking through it?

Mike Hostetler (50:13.699)
her screen.

Mike Hostetler (50:17.869)
And I will pop up. So this is currently, can't show a proprietary code base. This is an open source code base. And I wanted to close that, the previous version of this. Be able to, in each of our features, again, have a customized research prompt. So I did one as an example for this where I wanted to port over

I had an old version of this called my roadmap tool for my open source project GEDO that used a research MD for every feature I wanted to implement. Think of this as your spec or the research markdown file. I then wanted to translate that into our plan MD. And then from the plan MD, I really liked Ryan Carson's approach of capturing the plan and the research.

and putting it into a structured prd.json. So here we have, what's the feature ID, what branch are we gonna put it on, and then the user stories with the ability to set the state of their doneness as Ralph rolled through this.

Dex (51:31.488)
And so the, and so we talk about like JSON versus Markdown a lot. The, the idea I'm guessing here is like, because this is going to be read possibly by models, but more importantly by deterministic code, right? Having a status enum like, like to do in progress done, let's non-model code kind of orchestrate these like smaller bits into like the actual agentic parts of the workflow, right?

Mike Hostetler (51:35.993)
Mm-hmm.

Mike Hostetler (51:46.969)
Mm-hmm.

Mike Hostetler (51:56.985)
And we have three sample prompts and it's kind of fun because let's see in the implement prompt we have template tags. So these are our. Kind of initiating prompts where every time it goes and does a feature, it pulls that structured data. And then this is the prompt that gets pushed into the agent. Yeah. This is also. Yeah.

Dex (52:06.967)
Hmm

Vaibhav (52:17.208)
and renders each one of them in here. Makes sense. Yep, makes sense. Yeah, I think this is very, this is awesome, because this is literally what Dexter is describing, but clearly put into practice. So I have question for you.

Dex (52:17.504)
Mm-hmm.

Mike Hostetler (52:27.043)
Yeah. Yeah.

Dex (52:29.186)
Yeah, you spent more time on this than I did on my demo.

Vaibhav (52:32.08)
So I've got a question for you, because I think probably from here people can go see how you implemented this and how they did it and I suspect they can go build this. But the question for you that I have here is like, what have you noticed as your team has been using this? What trade-offs have come out of this and what have you lost and what do you think you've gained?

Mike Hostetler (52:52.025)
So it's 24 hours old. We've been doing it by hand. This is the first attempt to formalize the process with this much structure. So one of things I do as an engineering leader is we're using the AMP agent and Claude code. And the benefit of AMP is I go and I read and review their threads. And I use that as the primary coaching tool to help them climb the curve on agentic.

Dex (53:15.693)
Mmm.

Mike Hostetler (53:21.163)
AI engineering and agentic coding. And that is the plan here. That's sort of the intent. That's the idea of what I want to get to because that coaching loop, that feedback loop is really, really critical to help them learn and grow.

Vaibhav (53:35.537)
I agree. I'm, Mike, I'm really, really keen on getting your feedback perhaps about like a month from now on what you learned from this and having you back on to come and basically say like, does this work or not? Because I'll tell you, like I've actually found something very interesting here. When I sat with Dex for the first time and actually did like a proper RPI workflow with him for seven hours, my first instinct was I'm gonna go make my whole team go learn this.

Mike Hostetler (53:44.237)
Yeah. Happy too.

Vaibhav (54:01.24)
And what I really found that was really fascinating was the more I codified it, the less other people wanted to do it. The more Dex codified his way to do it, the less I wanted to do it. I feel like I looked at it and I was like, I like these parts of it and I really want to it in my own way.

Mike Hostetler (54:03.384)
Yeah.

Mike Hostetler (54:07.481)
Mm-hmm.

Dex (54:08.718)
you

Dex (54:12.209)
Hahaha!

Dex (54:18.378)
It's, we used to joke in the like developer, like platform as a service, like world was like, everybody wants a platform as a service, but the requi, the only requirement is that it has to be built in house. Nobody wants to use somebody else's pass.

Mike Hostetler (54:29.539)
Yeah. Yeah. Every project I joke, it's a baby. You're having a baby and the baby takes care and feeding and they like having the baby. They don't like taking care of the baby after it's here. And it's funny to manage it. Yeah.

Vaibhav (54:29.794)
Yeah. Yeah, and it's...

Dex (54:43.886)
You

Vaibhav (54:44.336)
Well, reason I'm really curious about these coding engine workflows is because to me, the world hasn't really settled on Agile versus Agira. I don't like the 70 different ways to do task management. Our team, for example, literally uses a notion checkbox list over everything else. And it works really well for us. But I know a lot of people swear by linear. A lot of people swear by GitHub issues. A lot of people swear by whatever they do.

And even for people that use the same tool, there's no homogenous way of using it because its process is so arbitrary.

I'm really curious if that ends up being true for coding agents or and how true it be. Clearly not every person manages their own tasks. There's some shared way of managing tasks. But for coding agents, I wonder if it is like it's shared across a person. It's shared across a team, across an org, across industries. And you can clearly see how it might vary. And I just don't know where it ends up falling. And that's what's really fascinating to me about this world.

Mike Hostetler (55:28.046)
Yeah.

Mike Hostetler (55:42.734)
Yeah.

Mike Hostetler (55:47.705)
That's a really good kind of thing to pay attention to. We've had some variants, but it's a lot of the people that maybe we interact with are further along in that learning journey versus I think there's a, the majority of engineers out there are maybe haven't even touched Claude code, maybe are just back at that. Where were we even six months ago of pasting code into, you know, the Anthropic website?

And coding that way, and we've just accelerated far beyond it. There's a, there's a vast sort of Gulf of people and they're learning. and I, everybody is just trying to hop to that next thing. And so, so far, I wouldn't say it's, they haven't gone in like parallel tracks in their learning and styles. It's more strung out and I can, you know, among my team, see who's trying to jump to that next level of learning as they go.

and we've focused in on that because we want to get them up the curve, right?

Vaibhav (56:48.109)
Well, what I-

What I would love to do is, what we should do is we should take this GitHub repo that's open source and we should link it on the AI Networks page and send people over to it so then they can go check it out.

Dex (56:59.054)
Yeah, that would be sick.

Mike Hostetler (57:00.857)
So there is a, again, I slapped together a CLI tool. This was a 24-hour vibe code. I called it Reqit for Reqit Ralph. And it, some information there, I won't go into it, but I just wanted to show this example. So I had an old roadmap, again, in my open source project. And with a single sentence prompt, it pulled together and poured it, wrote an entire Python script to port my old roadmap.

Dex (57:04.898)
Yeah, can we see it? Can you? Yeah, okay.

Mike Hostetler (57:29.805)
research and plan MD files into the new record format. The couple of things going on here, just so again, you know where we're going. This is more future looking. We have gone towards giant mono repo repositories. So in my open source world, I manage 20 plus elixir packages that are all set up as get subtrees in my projects folder.

Dex (57:58.702)
Mike Hostetler (57:58.717)
And then we push them back and forth. though this stuff is, this has been amazing for, sub modules. Not sub modules, not sub modules, sub trees. Yeah. They're different beasts that don't have all the problems of sub modules. then.

Dex (58:04.184)
Submodules, so you're a fan of submodules. Submodules were, okay, interesting.

Vaibhav (58:06.927)
I can't

Dex (58:14.35)
Okay. I was like, if I met a single person who likes Git sub modules, I'm like, damn, 2026 is about to get weird, but okay, we'll have to look into sub trees.

Vaibhav (58:22.383)
Subtrees are linked by art locked to commits, right? They're linked to some...

Mike Hostetler (58:31.757)
They go take a look. I probably won't do them justice. I immediately wrapped them all in handy workspace CLI tools. So I don't even think about it anymore. So that's one thing we have going on. The other is there's a new project that is two days old. I did a video on this, but it's sprites.dev by FlyIO. Cloud sandboxes, stateful sandboxes. These are, they,

Vaibhav (58:33.027)
They make it easier to push to the...

Vaibhav (58:41.057)
I see.

Dex (58:41.546)
Okay. Okay.

Mike Hostetler (59:01.559)
have they've cooked with this again. This launched maybe two or three days ago and we're moving to have multiple sprites managed via API. So part of the thinking with this Ralph CLI is I can dynamically spin up a sprite, give it a feature off it goes and a PR shows up and shut down the sprite and that's.

Dex (59:28.814)
Amazing.

Mike Hostetler (59:30.157)
That's where we're going because I want to run six of those at once.

Dex (59:33.742)
Yeah. And you want to be able to close your laptop and come back to finish code. like, so this is awesome. I agree with ViBob. It would be awesome to have, I know this is a day old project. I would love to have you back in like a month or so and find out what you learned and what's working and what changes you had to made. like, this is what we do is we solve a problem and then we put it in people's hands and then we find out which parts break and then we make it better. And then we share our learning. So thank you so much for jumping on and showing this stuff off.

Mike Hostetler (59:36.131)
Correct. Yes.

Mike Hostetler (59:50.787)
Happy to. Yeah.

Mike Hostetler (59:59.159)
Yeah, thanks for having me.

Dex (01:00:02.358)
Vibe, we got time, I know we're over time. wanna do some questions from the chat?

Vaibhav (01:00:05.839)
some questions if we've got some.

Dex (01:00:08.43)
Amazing.

Vaibhav (01:00:10.467)
While we're here, I'll show you guys some coding workflows that I have been doing and how we've been moderating it. If you have questions, just feel free to ask.

Dex (01:00:18.198)
I will keep an eye on the chat while you're demoing.

Vaibhav (01:00:22.607)
I'm going to make sure that don't accidentally screen share something I'm not supposed to.

Dex (01:00:28.952)
You got any API keys hanging around? I'm actually out of credits.

Vaibhav (01:00:32.707)
Not today, sadly. One of the first things that we started doing now is actually building really good visuals around understanding code. So I think one of the first things that I find is when I'm vibe coding, it's actually quite hard to actually understand the control flow, especially in really complicated projects. So we clearly have one, and it's a compiler with a bunch of steps. One of the easiest things to happen on your vibe coding is dependencies and abstractions start leaking really poorly.

Dex (01:00:40.684)
Yep.

Vaibhav (01:01:02.651)
And once that happens, basically you diverge and then it will only get worse over time. And it's really hard at any point to review the code. So what we do now is we just build a little UI that helps us go understand the control flow of code. And now what I can do is I can basically enforce that certain dependencies aren't done. So what we've done on top of that is we've built a bunch of pre-commit hooks. So it's like, for example, we know for sure that no package outside of compiler packages should take dependencies and compiler packages themselves.

they should always depend on BAML project. So we can now enforce that with this. Where we build tooling, that's like literally CI, CD checking that says, hey, if it's a compiler package, only things that belong to the compiler, the LSP can directly call it or these specific projects. Everything else gets this compiler error that says, nope, not allowed.

Dex (01:01:45.516)
Yep.

Vaibhav (01:01:57.72)
And there's really nice ways to build like nice abstractions on top of this that basically prevent leakage. And then also keeping this up to speed does another thing. It actually helps developers understand as your code gets bigger, like exactly what the control flow of code is and understand how stuff should be moving. Cause we can talk about higher level abstractions along the way. So this is like one tool chain that we've been doing really aggressively. The other tool chain that not a lot of people think about is these, these, all these commands, whether it's TypeScript, Python, Rust, Ruby, Java, whatever,

Dex (01:01:57.976)
Sick.

Vaibhav (01:02:27.663)
language you have are always running these build steps as a part of your their scripts. Your build steps add a lot a lot of noise into your context.

Dex (01:02:39.16)
Yep.

Vaibhav (01:02:39.383)
So every build set that you run needs to run warning free. If you're running with warnings, you will get a lot more context bloat than you are otherwise. So we've been seeing in force at compiler time that there are literally no warnings allowed when you check stuff in. And super small things, but these things end up compounding really, really heavily as you build a more complex code base along the way.

So just two small tips, there's a lot more, but we'll talk about to share later, but like build a visual diagram of your code base, understand dependency graphs, and then on top of that, like build CI-CD tooling to produce like context bloat.

Dex (01:03:22.072)
So do you regenerate this, because this reminds me of something we talked about with evals, which is like, okay, you can't like deterministically evaluate whether the new version is correct or not, but a human can look at a diff and just like eyeball it in five seconds. Like as fascinating, like as part of a PR, if this got generated and then you could be like, nope, you added a bad dependency. I don't like that without having to go read all the code.

Vaibhav (01:03:35.491)
So it's actually even better than this.

Vaibhav (01:03:44.791)
It's actually even better than that. WC-L.

Vaibhav (01:03:52.26)
This thing is only 485 lines long, it's an SVG, so you can pass it in either as an image to any agent of your choice, or you can pass it in, and because it's an SVG, it's diffable.

Dex (01:03:59.97)
Yep.

Vaibhav (01:04:04.099)
So what I actually can do is I can actually show Claude code or any coding agent, just look at the diff of the thing, this is wrong. And I have a script to go do this. And it's actually really easy for it to understand. And it's actually really important that this needs to be done as an image, not as an SVG generally, because graph layouts are actually not stable. Anytime you do a graph layout algorithm, adding one node can truly swap in any way. So you need an image representation.

Dex (01:04:04.387)
Yeah.

Dex (01:04:26.157)
Right.

Vaibhav (01:04:34.073)
We also can't regenerate this on CI CD for that reason because it's different in that way. But it is really important that you can go do it from that perspective. But this is, it's a really, really useful thing. If you guys are interested in building this, we can probably open source the repo that generates this. It is very useful for me.

Mike Hostetler (01:04:42.777)
That is really cool. Yeah, it's really cool.

Dex (01:04:54.36)
Sick. We have one question in the chat and then I think we should probably call it for the day.

Louise says, Dex, how much better was the output of using the SDK approach versus breaking out Create plan into two separate prompts and write the output of the first prompt as an MD file and then provide that MD files context to the second step. So this is actually how we did it. we basically have like a version internally of the RPI workflow. That's like five or six steps basically, instead of just three. And so you use like different slides. So it was like broken up the compaction from instead of doing like research plan implement, it's like generate the questions and then use the

questions to do the research to the research today's objective and then use the research plus the ticket to create a design discussion doc and then we create an outline doc and then we create the actual plan and like the problem with that is like some people like

It takes a while just to learn, do the research and then do the plan and then I do the implement. And like, once you get reps with it was like, what are we going to like tell people now you have to learn six slash commands just to do this. And so that's kind of the, the corollary to this is like, if you can build structured workflows and you can use AI to kind of like make recommendations that understands the workflow itself. Maybe you're not forcing people into the next step, but you're showing them in the UI, like, Hey, it looks like you're done with design because the questions are empty. you ready? And like basically making it so the user doesn't have to think like they still have full control and they can iterate.

as long as they want before moving to the next phase. But in practice, it is basically that you have like five, six slices of the original three prompts that get spread out into separate steps based on where are the actual high leverage things for a human to review. The other problem we had is like plans suck to review. They're actually too long. Like we used to use plans as the artifact of mental alignment. We've moved back to actually reviewing the structure outline, which is like the overview of the plan without the actual like here's

Mike Hostetler (01:06:40.953)
interesting.

Dex (01:06:43.472)
of the 250 lines of code we're gonna write in this phase. So to answer your question, like yes. Yeah, what you got? Yeah.

Vaibhav (01:06:47.791)
Do want to see something else? I'll ride along with that line. Well, actually, I...

I actually to chime in with Dex was saying there is like really I think what you're asking Luis is like is there a UX that is better than like serializing to disk and moving out and off and I think what Dex was saying is yes. He thinks that if we codify the process a little bit more then we can basically give the user a much better UX. It's basically like saying like technically we can take all the stuff paste it directly into cloud code paste it directly into Chatchpt or Anthropic and get the result back and bring it back and do the work manually.

The UX of having it with my editor or on my file system directly is just superior. Here the problem... Exactly.

Dex (01:07:30.968)
Because you get all the escape hatches. You can go edit the file yourself and like you can always take a file and struck like feed it through a very simple structured output prompt, right? You take a 500 line design doc. I don't care how long it is. You give that to Haiku. It can tell you if there's open questions in a second.

Vaibhav (01:07:39.236)
Yeah.

Vaibhav (01:07:46.115)
And then on the other hand, you have like these other class of tasks that you know are super simple. So you're okay kicking off to a background agent where you know you have no interoperability with it. That's totally fine. But it's more about understanding what UX you want for the kind of workflow that you're doing. What Dextre is talking about is I'm doing a heavy complex design task. For example, designing, let's say my entire backend API surface area. I want a UX that is designed to be interactive and makes me think about design decisions.

If I just vibe it all the way, I will get the outcome of that, which is a vibed backend, which is good for some use cases, probably not good for if I'm shipping an enterprise reliable API. And I think that's really what the thesis of why Dextre is kind of thinking about how to build structured process in the US workflows here. Dextre, you made a comment about like, you did not enjoy reading plans. I'm about to blow your mind. Ready?

Dex (01:08:16.739)
Yup.

Dex (01:08:26.478)
Yup.

Dex (01:08:37.1)
Awesome.

Dex (01:08:43.342)
Should we make a plan visualizer?

Vaibhav (01:08:45.358)
We have something new that we've been doing. So we write a lot of design docs as a part of what we do, specifically because we make a lot of language features. And every time you make a language feature, it can be really cumbersome of what you end up doing. So, what else?

Dex (01:08:58.508)
Yeah, if you do it wrong, you have to support it forever because it's a programming language and you can't take it away from people once it's there.

Vaibhav (01:09:04.8)
Exactly. On the other hand, you also need a lot of... You also need a lot of...

Dex (01:09:07.598)
Oh, this is better than last time. This is, you've done work on this.

Vaibhav (01:09:12.62)
You also need a lot of feedback from so many other people on the team every time we got designed something. So let's take this example. Like for example, we've been implementing how to do exceptions in BANL. And our syntaxes look something like this. If you have opinions, please let us know. But the whole point of what's going on here is we've designed an exception syntax and we have all sorts of rules around this. The thing is we want to make sure that people can leave comments. So now people can just leave comments right away. But we also want to make sure that this is agentic friendly because most things that live like this are like notions.

where you can't use cloud code or something like that and that freaking blows. Well how do we deal with that problem? Well we deal with this problem by being able to export everything.

and it actually exports everything to a folder structure for you automatically with every single historical version and everything else. And then you can use Claude code to edit all the files. And then all you do is you re-import everything. And it basically creates a new version in a very linear fashion. So it abandons idea of Git because Git doesn't really matter here. I want checkpoints that are stable and well understood and linear. Yeah, you're...

Dex (01:10:10.956)
Yep. You're never merging. You're like rarely merging stuff here.

Vaibhav (01:10:15.03)
Yeah, it's because it's not the workflow for like doing like plans kind of workflow. They're more like reviewable and it lets you have a really nice thing. And then what we have is that we have an AI assistant that actually goes through every single comment that actually happens and verifies whether the comment was addressed or not.

Dex (01:10:31.886)
That's sick.

Vaibhav (01:10:31.956)
manually. So we've actually built this kind of into a workflow because like we still want humans to able to read this really easily. We also want really easy edits for certain kinds of things if I want. So I don't want to think about editing everything manually with AI or having to download it. But I also want the ability to have like long-form decisions and like, like just general, like I think, what is it like? For example, like I can see that there are two comments here and to see this and Aaron's like, do we actually need a finally keyword?

And like, we can just discuss this really quickly and have a conversation here without having to think harder about this. And I think having this kind of thing can be like,

I think this is kind of what you need for editing massive amounts of Markdown files. You want something like cloud code and any coding agent that comes out in the future can edit. And how do you do that? Well, you have a file as a source of truth, but you also want something where humans can collaborate, which means you need some sort of website, you need some sort of sharing system, and you also need some sort of like commenting engine on top of it. That's really nice. No one's built this yet.

Dex (01:11:27.053)
Yep.

Mike Hostetler (01:11:31.671)
Yeah. And none of that exists now. We've talked about, you know, maybe some, yeah, like an evidence tab next to a PR or.

Dex (01:11:38.552)
No one's built this yet.

Vaibhav (01:11:42.754)
Well, it's not even attached to PRs. I actually view this as totally separate. I kind of view this as orthogonal to PRs because it's like design docs. think about it, we have survived for decades where our design docs live outside of our code base. And it seems to work. It seems to work totally fine. And I actually suspect that's actually OK going forward as well if our design docs leave outside of our code base because code evolves much faster than design.

Mike Hostetler (01:11:46.178)
Okay.

Mike Hostetler (01:11:57.827)
True.

Vaibhav (01:12:12.256)
And that's okay. Design docs don't actually exist to help you establish your code base forever. They're to check point your code base at some point in time with a context at that time. And at some later point, you evolve the code with new information. And whether the old design doc still applies or not is totally kind of orthogonal almost.

to the actual code and it's a different decision and if it does, you often in that case would explicitly choose to have comments and other systems as a part of your code system, not as a part of your design doc.

Dex (01:12:45.932)
Yeah. Yeah. And not in like the PR phases. I mean, the thing we always talk about is like, how do you move?

the SDLC upstream and how do you automate it as much of it as possible? Well, making sure that humans have leverage over the parts that matter, like deciding whether we have a finally statement or not. And like in the past, all like mental alignment for software has either been like design docs and architecture decisions, which are good and people who are serious and building serious work always do, but they're kind of a pain. Like no one has fun building a design doc.

Vaibhav (01:12:58.307)
Yeah.

Vaibhav (01:13:04.888)
Yeah.

Dex (01:13:18.668)
Maybe if you're a PM for programming language you do, but most people have fun writing code and we did most of our review and alignment in the PR phase. so, yeah, things like this is one of the most exciting problems right now is as the place where human leverage is most important shifts up to being more about the thinking and the design versus the coding bits themselves, how do our collaboration workflows change? So this is really exciting.

I'm stoked that you guys are figuring out what you want here.

Mike Hostetler (01:13:49.347)
in.

Vaibhav (01:13:51.854)
Well, we were doing this with a bunch of Notion files. We were doing this with a bunch of other stuff. And then we were just like, this is just not doable. And then we literally just spent two weeks, one of our, Paolo on our team, who just recently joined, was just like, I'm just gonna take this problem on. And he built the whole thing, and it's amazing. It's immediately useful. And I think I've been surprised that no one has really worked out a really good shareable markdown experience yet.

Dex (01:14:18.166)
Not yet. Stay tuned.

Vaibhav (01:14:19.585)
Well yeah, we're going to open source this very soon. This is pretty open source, so it should be accessible by hopefully anyone along the way.

Dex (01:14:30.018)
Cool. Well, thank you guys so much. This was a blast. think the big takeaways were, and help me out here guys, my biggest takeaway that I would have you all take away from this is like.

Dex (01:14:44.514)
Don't use prompts for control flow. If you know what the workflow is, use control flow for control flow because it's very, very good. And like start with something broad and robust in terms of being able to accept a wide range of inputs. And then when you learn about what the actual inputs look like, refine your workflow and try to have more happy paths available. And then you can still have the escape hatch of go fully agentic. You guys got takeaways?

Vaibhav (01:15:13.025)
Michael Cheers.

Mike Hostetler (01:15:14.701)
I would agree. There's a place for what I term classical AI, state machines, behavior trees. These are control flows that have been with us for 30 years. And now we're trying to insert this agentic loop with all this non-determinism and you need both. They both have a place. We're figuring out what that looks like, but you have to be on the cutting edge and it's going to be emergent over the next 12 to 18 months. And I'm excited for that.

Dex (01:15:40.93)
Yeah, it's gonna be a fun year.

Vaibhav (01:15:41.986)
big thing is my takeaway for anyone building any sort of agentic workflow is think heavily about the user's UX. Like if your user's UX is a tight loop, let that be fast and then kick off background tasks to do heavy duty verification like what we do here in the UX that I showed you where we take the new version and we validate that every comment was verified so the human doesn't have to do the overhead work. They get a message in Slack saying hey all comments are taken care of or hey you missed these comments. Was that deliberate or not?

design that in your coding agents and decide what needs to be fast versus what needs to be slow. What's synchronous? What's asynchronous? What's a background task? All of these are key design decisions and you shouldn't just overlook them. And if your coding agent builds an agentic workflow and doesn't ask you those questions, well maybe consider using the new workflow that Dex is considering, which actually asks you questions along the way and makes it a lot more deliberate when you go do this.

Dex (01:16:29.731)
Hahaha

Dex (01:16:35.896)
Amazing. Guys, thank you so much. Thanks to everyone in the chat.

Vaibhav (01:16:38.665)
If anyone wants to, I saw some people might want to contribute to markdown editor, hop in the boundary discord, shout out in contributing, I'll show you where the code is and where that goes. Next week's episode is going to be really fun. We're going to talk about a new coding agent that talks about how to use emails and API and what sort of constraints you have to go build around there. If that's interesting, tune in. Episode should be live already on the Luma for BML.

Dex (01:17:02.19)
Amazing. Thanks y'all. Have a great day. See ya.

Vaibhav (01:17:03.405)
Good to see everyone. Good to see you Dex.

Mike Hostetler (01:17:04.131)
Thanks guys.

