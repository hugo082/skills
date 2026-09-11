Vaibhav (00:01.47)
All right, welcome back. AI that works and I am late. Sorry about that, everyone. Back to you. Thank you for showing up as always. We've got a episode that I am super excited about today that has, I think, come up many, many, many times. But before we get to that, let's do brief intros. That's sure. Take it away.

Dex (00:02.168)
We're on.

Dex (00:22.562)
What's up y'all, I'm Dex. I am the co-founder and CEO of HumanLayer, where we help people get coding agents to solve hard problems in complex code bases.

Vaibhav (00:33.258)
And I'm Vive off. work on BAML where we make a new programming language for building AI pipelines. And today's topic is prompt optimization. Prompt optimization is I think a topic that has come up a lot on Twitter. I see it almost everywhere. And one of the most interesting things to really think about is what happens in a world where models can write really good prompts. Are we there yet? Does it actually work? And what is this JEPA thing? Like what under the hood, how does it work? What is it?

Is it just magic sauce? Can anyone write their own JEPA? Is there going to be new optimizers on top of JEPA or is JEPA a general class of optimization? That's really the questions that we want to dive into today. that, then most important, go ahead.

Dex (01:14.893)
and

No, I was gonna say it's a super interesting topic that I'm really excited about because I think we've spent a lot of time on prompting and the nuances of prompting and two dots versus three dots. we did the whole like RTFP, read the actual prompt kind of thing. And so it's really interesting too. I'm excited to get your take, because I know this is kind of like fresh in the...

the world of BAML and the world of prompting. know DSPy's been around for a while, but JEPA's this new standalone library that does basically the same approach, but a little more flexible. So I'm excited to, know you and Greg dug in a lot, and I'm excited to see what you learned and what your take is.

Vaibhav (02:00.723)
What's your

Vaibhav (02:05.706)
Yeah. So, spoiler alert, we did build a prompt optimizer while we were here, last week, and I think it's live and shipped already. So while we're out there, we should be able to see, hopefully live prompt optimization on the flow. But I'll tell you my personal opinion. And my opinion has always been this, like, is a prompt optimizer going to do a better job than a human that really understands the problem? Probably not. It's just really, really unlikely.

Just like an LLM is not going to do better than an average human at most as a skilled human at most problems. On the other hand, is an LLM going to do a better job or some algorithm going to do a better job of giving you a better prompt at a piece of code that you're never going to look at or care about? A hundred percent yes. There's just no doubt in my mind on that end. And there's a spectrum because like software quality is basically based on the amount of time and love you give it. And if you have no

love to give to a certain piece of software, it just can't get better even if you wanted to. So an optimizer is great for that scenario.

What's your take, Dex? Have you used any prompt optimizers to this date?

Dex (03:17.669)
I've messed with DS by a while back. I have not played with JEPA yet. I sit next to a guy in a coworking space who is like, was way into RL like a year ago. And it's just been like a head of the curve on all of this and was building platforms for like, Hey, let me take your like agents long horizon trace and then like do a JEPA ish thing that he was basically an algorithm that he had come up with. That was like,

okay, how do we optimize your tool definitions and your prompt and all these different things to like improve the trajectory of your agents? So like, I've been thinking and talking about these things a lot, but I haven't actually gotten to mess with Jepa, but he was telling me, actually like, I think we talked about this episode like two weeks ago. was like, Josh says there's this new toolkit, which is like JepaPy, which is like a low, it's like, I guess lower level or more flexible or whatever it is. But I mean.

One thing that I've been playing with is a lot that it's related is like, cause, cause optimizers don't work unless you can give them automated feedback. And like we talk about this in code, but coding agents a lot is right. The model can't go and like solve, solve its way out of a puzzle. If it has no deterministic like back pressure or feedback system to tell it if what it's doing is working, which is like unit tests, integration tests, all this kind of stuff is really useful. So I'm, I'm, I'm a level before.

optimization because we're still figuring out like our flavor of evals for especially like building workflows with coding agents and breaking up coding agent workflows into different into like smaller pieces, which actually might be its own a good episode topic to do soon. But

Vaibhav (04:51.189)
Yeah. I think the way I'll describe how I think about these coding optimizer problems and let me know if this makes sense. So a lot of people, and then we'll hopefully get into the actual jet park pretty soon. We actually have a special guest is joining us today. We should hopefully be in pretty soon. Um, so the way I've thought about coding agents, it's actually very similar to how Cody like Claude code, for example, when it edits Jupiter files, Claude code doesn't actually edit the Jupiter files raw. Cause if you ever looked at a raw Jupiter file, it's just a giant Jason blob. So Claude code is a special tool.

Dex (05:19.201)
There's a lot of noise in there.

Vaibhav (05:21.117)
Exactly. Cloud code has a special tool in it called edit Jupyter file or read Jupyter file where you give it an instruction and actually, notebook, edit notebook, read or whatever it has. and sorry, I don't know the tools as well as you do. and the reason that they had to make that tool was because they want a constrained way of editing the style that is more specific than per se, like then just editing a raw Python file, which is just basically a said command. Now,

Dex (05:26.861)
It's actually Notebook, Notebook Edit is the name of the tool I have.

Vaibhav (05:50.376)
with prompt optimizers, you're doing something very, very, very similar. What are you doing? You have a file that describes your prompts behavior. And what you want to do is you want to apply some edit on top of that, on top of that file, but in a constrained way that only edits a certain part of that file. And that's what I think you really just want a special tool for this. So having like, why do you not want to use general edit tools? It's because of that reason. So like, let's say you have a file that

as at least for me, I don't typically write like one data structure per file. I usually have tons of data structures and sometimes related, sometimes not related, more related to a concept of that file exposes than just that one function. But when I run a prompt optimizer, I almost want the prompt optimizer to only pull out the most relevant parts of that system, read all of it, understand all of it, and then edit accordingly. And that's where I think comes into play.

Dex (06:39.432)
Interesting. And this is kind of a thing we've talked about a lot, which is like, can you, can you break down your problem into individually testable, individually evalable, like parts of a pipeline? And then also you want to test the thing end to end, but you kind of, those are like two, almost like two different ways of thinking about the problem, right?

Vaibhav (07:01.329)
Exactly. Cause I want to, well, kind of, I think that's one part of it as well. The thing I was specifically talking about was just like the pure syntax. Like if I have, if I have a function, a prompt that has like a system prompt and a message, a user prompt, and I have like a data model that I'm returning in it, that data model may have more nested data models with inside of itself. I might have a class within a class, like in a receipt case. Yeah, that's it. Sorry. That's probably better. let me screen share and then get you on there. Screen.

Dex (07:21.9)
Do want to whiteboard these ideas a little bit?

Vaibhav (07:31.145)
my board.

Dex (07:35.04)
what's up, Greg?

Vaibhav (07:36.733)
We have got the guest online. Nice. This is Greg. I'll let him do a brief intro about himself and then we'll get to prompt optimization with him really quickly.

Greg (07:37.407)
How are you?

Greg (07:48.361)
Cool. Hey, I'm Greg. I've been working with Vybov and Aaron at Boundary for a little over a year. I work on the compiler, various features in the language, and most recently I've been helping out with this JEPA implementation.

Vaibhav (08:03.028)
Thank you, Greg.

Dex (08:03.04)
Greg is not saying is that he's actually smarter than both of us probably put together.

Vaibhav (08:08.678)
Yeah, but that's a, that's okay. People, people can think differently about us and that I accept that for now. so there's like different ways that I saw this. So you might have like a class, like class item, class for C and then in the same file, you might have like a class resume of some kind. When you actually give it to, when you give the model a prompt optimizer, it's actually a really important question to ask yourself. Like what is the model? What is the optimization system actually going to see? Is he going to see everything or are we going to perhaps hide?

Greg (08:09.041)
in my sleep.

Vaibhav (08:38.588)
some parts of it and only send it only send it the purple parts, for example, and like void out the rest. And there's two different approaches here. One, I think my naive solution before I actually chatted with Greg about this. And I remember having this conversation is, well, you just only give it the parts that you wrote, obviously. And then Greg brought up a really interesting point, which is like, yes, but in a shared code base where you're slowly discovering things, you might actually want to use shared types across your code base. So doesn't have to reoptimize that part of the system over and over and over again.

I don't know the exact...

Dex (09:09.642)
Because the types are part in like in BAML especially but in any structured output system the type is part of the prompt because it's the instructions that you're asking it to do the output

Greg (09:14.815)
you

Vaibhav (09:18.908)
Yeah, we're not just that. think Greg, you, the specific thing you were mentioning was like, you might have like a common system instruction that you're using in a bunch of other places in your code base. And perhaps you've optimized this previously in the past. And let's make the opacity zero. And however, this prompt yet isn't using this. This receipt prompt isn't using this, but you might still want to let the optimizer know, by the way, we do have this common string that we know is used in a lot of other places.

And why might you do that? So it doesn't have to rediscover that. The discovery process is just saying, oh, I have this available. It's a tool that I could access. How do you give the optimizer that kind of information? And that is a very hard thing to do in an arbitrarily big code base. Cause everything I, at least, uh, am I summarizing this correctly, Greg, from the way you described it?

Greg (10:10.205)
Yeah, you are. There's that aspect of it. You need to be able to optimize over everything that's an input to your prompts. But also you might be optimizing not just for a single prompt, you have to simultaneously optimize for all the prompts that you're going to use in your pipeline. Because otherwise you're on the risk of over-specializing that system instruction for one particular prompt. And then it would do less well on the other prompts where it's used.

Dex (10:37.804)
Okay, so we're avoiding overfitting, basically.

Vaibhav (10:38.248)
Yeah, I didn't even think about that actually. It's like, yeah, you can easily overfit a prompt, especially if you're using a data model in like seven different contexts. For example, it could be an output of one prompt, but an input into another and changing in one place might have totally different consequences in a way that's really hard to predict. That's interesting. Now, before we go really into this, I know Greg, you spent a lot of time looking to JEPA. Can you just describe to us what is JEPA?

What the heck are these words? What does it stand for? Is that even relevant? And how does it actually work?

Greg (11:09.725)
Yeah, sure, sure. So intuitively, JEPA is a four-letter algorithm that expands into two words, genetic Pareto. And this is kind of an evolution from, yeah, genetic Pareto, P-A-R-E-T-O.

Dex (11:18.816)
You

Vaibhav (11:26.1)
Like this?

Vaibhav (11:32.435)
Pareto, sorry. Okay, that makes sense.

Greg (11:35.453)
Yeah. So this is kind of like replacing or it's superseding GRPO. Is that G? I might be getting the G where it's mixed up. My apologies.

Vaibhav (11:36.157)
Okay.

Dex (11:47.18)
GRPO, that's the reinforcement learning algorithm, right?

Greg (11:52.125)
Yeah, group relative prompt optimization, maybe. So that old one is a very like, that's the hardcore AI way of optimizing prompts. You're using fine tuning and gradient descent to figure out how to get a prompt that more optimally satisfies the test cases.

Dex (11:57.591)
Yes, policy optimization.

Greg (12:18.143)
which makes lot of sense. But then JEPA is kind of like the bitter lesson, but for prompt optimization. couldn't we just do the simpler by, forget about fine tuning, forget about gradients, just have an LLM suggest better prompts for you.

So that's half the story is let's not fine tune. Let's just explore the space of possible prompts with LLMs. But it's a little bit more complicated than that because calling LLMs is expensive. And in TRPO, the number of rollouts you have to do to get a really good prompt can be like a couple tens of thousands maybe. So we can't be doing tens of thousands of LLM calls just to find a better prompt.

So have to be a little bit smart about how we're going to search the space. And that's where the words genetic and Pareto are coming in. When you optimize, you're specifying, like, what does it mean to be optimal? It's a combination of, how many tests you pass, how many input tokens to use, how many output tokens, what's the latency? And then you can also have custom metrics. And Pareto here means the Pareto frontier, which is, of all the set of prompts you've looked at so far,

which are the ones that are special in some way? Like which are the ones that are the best in some dimension? Those are your set of like candidates. And the genetic part of this algorithm says, not just are we gonna have a list of various prompts that are good in special ways, but sometimes those prompts are gonna meet each other and make babies. And that's how we're gonna further explore the space of prompts.

Vaibhav (13:58.418)
It is audio, just I.

Dex (14:00.498)
Greg, we lost your audio.

Vaibhav (14:02.387)
Greg, lost your audio. Come back.

Vaibhav (14:09.331)
no! Okay, today's Wi-Fi Kahoot is very weird.

Dex (14:13.964)
the technical difficulties.

Vaibhav (14:18.685)
Do you wanna try muting and unmuting again? Sometimes that works better. And I guess we'll have to cut this out of the actual online clip that we post later. That's the best part about this. Now that we are actually editing the clips, we actually can cut out all this noise. But, okay, Greg will hopefully join back in. You're muted now.

Dex (14:28.801)
Ha

Vaibhav (14:43.897)
And in theory, you can unmute. While this is going on, think probably the biggest questions that people are gonna have on this, at least my first instinct is how do you actually explore the new prompt space? Is there a prompt that does that? How do you control that prompt? Does JetBud prescribe a very specific way of doing this, et cetera?

So if you want, Greg, what you can do is since we're in the same space, why don't you just come over and sit next to me and then we'll get the audio working right away. You can bring your laptop too. Sadly, we're gonna have to.

Dex (15:14.752)
Hahaha

Dex (15:19.566)
Isn't your mic on your AirPods though? You're gonna have to switch your mic?

Vaibhav (15:23.859)
So I'm gonna switch to speaker mode, but I can just.

Dex (15:25.63)
Or you could be really gross and give Greg one of your AirPods.

Vaibhav (15:30.483)
I'm not gonna force Greg to do that and make a decision on screen for that. But maybe I would have if it wasn't on screen. All right, my microphone and camera switch. Nico, we got another bug.

You can mute but you can't switch mics. Okay, I will be back. Greg, can you try talking?

Dex (15:55.212)
Alright.

Yeah, no, Greg's audio is pretty bad.

Vaibhav (16:01.788)
is your mic is down?

Dex (16:02.956)
All right, VibeOff's coming back.

Dex (16:09.291)
Okay.

All right, he's coming back. You guys get to hang out with me right now. I'm gonna start going through questions. GRPO is model training, tuning training. Yeah, my understanding is GRPO is not changing the prompt, but it's doing, it's a reinforcement learning algorithm. So you put the model in an environment that has feedback and back pressure, and then based on your reward function, you like back prop that through the weights to do fine tuning.

Vaibhav (16:35.696)
Bye.

Vaibhav (16:41.104)
Thank you. Cool. So let's start screen sharing again. And then Greg should be audible. In theory, Greg, give a test. Test. Test, test, test. Can hear me?

Dex (16:53.651)
man, this is gonna suck for your editor, but we will make it work.

Vaibhav (16:56.272)
Thank you Mario in advance. Am I very quiet or what's the subject? You're good.

Dex (17:02.92)
No, it's just the audio is gonna be on Vi-Bob's track and the video is gonna be like we want to focus Greg's and he's gonna have to like stitch them together, but it's cool. We'll make it work.

Vaibhav (17:11.406)
Yeah. Cool. So let's go into how does JEPA work? there, firstly, does JEPA come with an optimized prompt that it says you should use this or you must use this? Yeah. The DSPy, when you start using that, comes with an implementation of JEPA that's partly in Python, or the whole thing's in Python. But yeah, part of it is prompting. there's a prompt. There's actually three important prompts.

One is called generate candidate or something like that. And that's taking a single prompt and saying like, how could we improve this prompt given its performance on the test suite and also given the other factors we want to optimize for. There's a second prompt called combine prompts, which takes those two prompts from the Pareto frontier and then has them make babies and see, you know, like, how would you combine them to get the best of both worlds?

to make a new candidate. So that, and just to clarify there, that means like take one prompt that's really good on being like token efficient and one problem is really good on accuracy and try and bridge the two together. Does combined prompts give metadata about what the specific, why the prompt was chosen from the Pareto frontier? That one it's, it gives like rationale on how the combination was done, but the choosing is not generally done by an LLM. Okay.

But there's

Dex (18:39.148)
Okay, and the Parade of Frontier is basically computed based on the metrics that you decided, like latency, accuracy, test performance, token costs, all these different things. Are those metrics prescribed or do I, as a engineer, have to kind of like pick and choose a set or do I have to build those from scratch? Like, I know I've worked with metrics in DSPy before, but like, what's the, what do you get out of the box versus what do you have to really like engineer?

Vaibhav (19:08.048)
Yeah, that's a good question. What you get out of the box is just a single metric, which is what fraction of your tests pass. And then if you want to optimize for other things, there are ways to ask for that. In our system, it's command line flags. Cool. And then you said there's three prompts. Or is there just two? What's third one? The third one is reflect on how the prompt performed and get a score and how did it

How did it perform? So it sounds like for me, what the steps of JEP are, if I were like pseudo-code it, step one, have some initial prompt that performs poorly and define a bunch of test cases for it. Step two, run those, the sums build a metric for that prompt. Step three, run generate candidates to discover and more prompts that I might want to Step four, run each of those end prompts with

the same original metrics I had, or perhaps I'm sampling thereof. And then step five, recompute those metrics, pick define the Pareto frontier, which could be my original metric or the new metrics that I've computed. Step four, run combined prompts to try and explore more prompts on top of that based on some definition of what came out next. Step five, run reflect on performance. And I guess that gives me a direction of like which one I should select or something on that direction.

Step five, generate candidates and do that again forever. Yeah. Is that about right? That's about right. Yep. Basically, you've always got some set of candidates on your Pareto frontier. In the beginning, that's just your single original prompt. And then you generate a new candidate. There's always like one candidate generated at a time. It seems natural to generate a whole bunch, but the way it works is usually just one. OK. And you reflect on that when you run through all the tests. And then you

generate new candidates. And the way you do that can be either just like a greedy hill climbing on the one that you've already worked on, or it can be the combination of two. If you have two or more in your Pareto frontier, you can combine those. there's various ways of deciding at each step which one are you going to do. That's all down in the micro optimization details. yeah, different. So what I'm hearing is combined prompts is optional, only if you actually have multiple prompts that are optimal. Yeah.

Vaibhav (21:35.792)
Otherwise you typically don't run it. Ah, yeah. Got it. And then a generic candidates otherwise typically go straight to reflect.

Dex (21:44.214)
So is combining prompts is part of generate candidate, right? Like I feel like this diagram is not quite there. Like reflect on performance probably happens before generate candidates.

Vaibhav (21:58.082)
Yes.

Dex (22:00.116)
and generate candidate could either be a net new prompt or combining existing prompts.

Vaibhav (22:05.36)
That's right. There's a really good diagram of it in the JEPA paper, if one of you wants to Google JEPA archive.

Chepra Archive.

Dex (22:16.246)
probably makes more sense than trying to reproduce the diagram of a bunch of PhDs.

Vaibhav (22:21.625)
ARXIP. one second. What is it? Yeah. Nice. I'll just put it on there. Upper right, Wikipedia. That's the guy. nice. That is the one no sync can of yet. So yeah, it's a bit hairy. And some of these blocks we can ignore, they're just optimization things. Which blocks?

Dex (22:27.176)
It's this one, right?

Dex (22:34.518)
This one, right?

Vaibhav (22:46.192)
The D train, don't think really. That's not like the essential, thank you. Okay. Yeah. So initialize. Then you determine if you have a budget and if you do, you run evals on everything. And then you ask yourself, well, first you have a candidate pool. Sorry. Yeah, it's going the other way. And you just pick one prompt out of your candidate pool.

And then you go ahead and just determine which prompts are actually the best based on some metrics that you have. And then you run either your reflect, you run turn, you run your reflect prompt or your system or a prompt. Yes. Got it. okay. Well, I guess this is all good in theory. Let's run in practice. I know you said you've been, you kind of have something. Can we just look at it and just, I know a lot of people in there are asking like, how complex are these prompts? How hard is this actually do?

You would just want to take over screen share and just show how it runs? Yeah, sure.

Vaibhav (23:48.656)
I think it's going to be a lot easier because at least for me, when I first saw JEPA, I think the way I was looking at it is like, it's a library that I kind of wanted to use, but it also felt kind of overwhelming at the same time because I didn't want to learn all of it from scratch. And then the other part was like, I don't actually know how well it's going to work. So I don't want to invest time into learning it because it just takes time to learn anything.

Dex (24:09.174)
Well, and you got to figure out like, where's the overlap with my intuition that I already know how to do and where's the, where's the, and what are the actual like net new things that I'm going to have to learn and build intuition for and like basically put in my 10,000 hours on to be able to get value out of this thing.

Vaibhav (24:14.253)
Exactly.

Vaibhav (24:27.84)
Yeah, so we started like diagramming and talking about the implementation. It all sounds kind of complicated, but I think what you'll see is like running it is actually pretty easy. And you don't have to dive into the weeds to have it do what it says on the tin that it does. So on the right, we've got a demo function, extract subject.

Its job is to analyze a sentence and extract as a person the subject of that sentence and their age. And we have an easy test here. The sentence is Ellie, who is four, ran to Kalina's house to play. The subject's name would be Ellie, the age of before. And then we have a more difficult test. Meg gave Pam a dog for her 30th birthday. She was 21. So that kind of puts the LLM through its paces in terms of tracking references. So what is the answer there? I guess you have one. The answer is...

guys don't know cheating? You gotta do it without reading the test. sorry, yes, I'm not good at English. But it sounds like the subject is Meg and then the age is 21. Because someone else is 30, that makes sense. You got it. I am at least as good as a bad LLM. You are better than Haiku. I will take that as a compliment.

Dex (25:41.196)
And it's unlikely that the dog was 21. That would be a weird gift.

Vaibhav (25:49.363)
But I can see why LLMs would be bad at this task. It's quite hard for an LLM to, I think, be good at this kind of thing. So I did not give the LLM a lot of help with my LLM function. I just had to extract the subject. And here I also gave it the output format. Just for fun, let's try not doing that. So how could the LLM possibly...

know what to return.

Dex (26:17.43)
Do you need this sentence in there?

Vaibhav (26:19.889)
We probably would, but maybe we're just cranking out demo functions all day and we're a little tired and we forgot. So let's start with it having one of them. Okay. One or the other. Let's give it a sentence. Yeah. Let's just give it a sentence. Oh, we're not even being careful to delimit the sentence from the prompt or anything. I mean, okay. Get rid of the sentence too. guess screw it. Yeah. Let's see. Let's just see what the model does. I think this is the cool thing about prompt optimizers. Like in this case, we have something that is totally invalid. We have not put the input into the prompt.

We don't even have the output type in the prompt. The model knows nothing. So let's just see what happens. All right. So here we go. Can you clear the screen and run the prompt at the top? And then do me a favor. Can you zoom in too? Zoom in a lot. Zoom in a lot of it. There you go. you go.

Dex (27:00.64)
Yeah, zoom it in a little bit.

Dex (27:05.144)
man, the Bamagen.

Vaibhav (27:12.964)
Thank you. OK, so you don't have to run this. This is just how we get our tokens into the environment. you're calling an LLM. So when you optimize, you're going to have to pass some credentials, like an anthropic API key. We're going to run BAML CLI, optimize. You have to pass this flag called beta, because this is a beta feature not ready for production yet. And then just to speed things up, we're going to limit the number of trials to three. So let's see what happens.

this little viewer comes up and it's going to start analyzing the initial prompt. I didn't even realize we have a Tui. Tuis are nice.

Dex (27:54.636)
This is a TUI. I do want people to stop calling TUIs CLIs. Like somebody launches things like, this is the new XYZ CLI. And I'm like, this is not a CLI. This is a TUI. A CLI is like inputs and outputs on the command line.

Vaibhav (28:08.197)
Yeah. So what's interesting here is like you're showing me the prompt down below. Yes. So this is the original prompt. Yeah. And we're getting our metrics. The only metric that we're starting with is the accuracy. How many tests passed out of how many we wrote. And that's zero. Now we can scroll down to see the first candidate that optimization wrote. And we see what it did was it put in a system role.

and then gave way more detailed instructions. That's instruction than I would write for sure. Extract the grammatical subject. That's a really good disambiguation. In this Tui, I have to apologize my scroll bars don't work. So you have to zoom out if you want to see more. And we also see that the optimizer knew to put in context.oppo format. So we did not just copy paste the stock JEPA prompts from dspy. They wouldn't work for BAML.

Dex (28:52.263)
Hahaha

Vaibhav (29:06.128)
Those prompts need to know how a BAML prompt works. They need to know about Jinja and output format and that kind of thing. So now they know, so you don't have to. And then what else happened is we ran the tests and we see that on this first candidate, we already got up to 100 % accuracy. So that is convergence. The algorithm stops as soon as you max out your metric.

Sure, because there's no better way to go. It's like, if your metric is 100%, where else are you going to go? As I'm saying that, realize I might be lying. If you set trials to three, might be like, it runs all the way out. And then once you have these metrics, you just pick one and you hit return on the one you want. And it's going to overwrite your original demo prompt. On the way. On the way.

And I don't want to do that because I want to keep my old crummy prompts for other demonstrations. I'm just going to queue instead. So now we have this. Can you go back to the run information, the file directory? yeah. And zoom in for me on the screen as well. Can I zoom? I don't think I can zoom here, but I can zoom on the browser, the file browser. that's very weird. So the other thing you get is a run history. So you can actually go into here and just see like any of your run histories down there.

and just see what's going on. So you can actually see like the past prompts.

Dex (30:34.12)
this is the new BAML file. Is this done by actually your, your manipulating the AST itself to generate the new code, right? So you can just like splice in.

Vaibhav (30:45.85)
is right.

Dex (30:47.66)
Cool. And the candidate generation gets the full BAML source or does it get the AST representation?

Vaibhav (30:55.94)
gets a subset of the ASD representation. It gets everything that's reachable from your original prompt. Yeah. So we talked about this earlier in the very beginning. It's like, if your code base is big and every code base where you need to optimize your prompt is a big code base? Otherwise you don't need to optimize your prompt because you're probably not doing something very serious. So in that world, do you give the optimizer the minimum set of code it needs to actually think about?

Dex (30:59.541)
Okay, cool.

Vaibhav (31:22.596)
So we actually go through the AST, say you want to optimize this function, we pull out everything that you might actually need and put that in.

for you. Now, there's a really interesting thing in here, which is like, but what is the JEPA prompt? I know you told me it does BAML stuff, but what is the JEPA prompt? And what if I want to change it?

Dex (31:31.02)
Okay.

Vaibhav (31:42.48)
Good question, Vypah. Yeah, so that is, that's actually.

Dex (31:47.139)
yeah, yeah, it's okay. These are the prompts that it uses to generate the candidates and reflect and things like this, right?

Vaibhav (31:53.316)
Yes, exactly. What is that generate prompt? What is a combined prompt? What is the reflect prompt? Where do they live? How do I edit them? How do I control them? How do I use the model that perhaps I have a proprietary model that I fine-tuned for this?

Dex (32:07.903)
sick, and of course this is implemented in BAML as well, nice.

Vaibhav (32:10.5)
Yeah, as everything should be.

Dex (32:13.004)
Hahaha

Vaibhav (32:16.475)
Yeah, so it's a fairly heavy BAML file. We had to basically teach the LLM reliably how to write BAML code in a prompt in this file. It's called JEPA.baml. When you first run optimization, you're going to get this .baml underscore optimized directory in your project. And most of the files in there are run history. But there's also this directory called JEPA inside.

which contains the JEPA prompts. You can customize those before you finish running optimization. So you can run optimization basically in dry run mode and you'll get this JEPA.ML file. I was gonna turn it to light mode. I don't know how to do that though under computer.

Dex (33:07.2)
You have a Zed, I love Zed and it's so fast, but I have found that the command prompt palette does not, like I had to go Google what do they call soft wrapping in this one, in Zed. It's got a different name than in VS code.

Vaibhav (33:18.864)
Yeah.

Vaibhav (33:25.616)
There you go. I don't know that these are for people to read or not, but it might be. Yeah. So in this Java prompt, show me the three prompts that you talked about at the very beginning. Here we go. Reflection functions, proposed improvements. Okay. And that takes in a function, takes in failed examples. And then, that's interesting. Can you close WordRap so we can see all of it?

Vaibhav (33:51.792)
That's actually right.

Dex (33:52.012)
So it'd be...

Vaibhav (33:54.501)
I'm Emmanuel.

Vaibhav (34:03.312)
All right, so I'm actually really curious about what all the things that we send into it are. OK, so you always give it success.

Dex (34:08.948)
Yeah, and want to see that. Can we see the types of these two would be really interesting.

Vaibhav (34:12.718)
Optimize.

Vaibhav (34:16.296)
you didn't tell the band my VSCO.

Dex (34:17.566)
You guys need an LSP for Zed, bye, Bob.

Vaibhav (34:20.899)
I think we do have one. think Greg just hasn't downloaded it. Yeah. I'm IDE-elite. Yeah. So optimizable function tracks a function name, prompt text, reachable classes, reachable enums, and the source code of the function. Okay. So you actually give it both the prompt text and the function source. And why do you do that? Is that because of like pulling in code from template strings and seeing the full prompt rendered out?

Dex (34:25.194)
Ha

Vaibhav (34:51.28)
I forget exactly what, but I think it's that we needed to know not just the prompt and not just the function name, but also like the names of the arguments and the types. yeah. Makes sense. You need the names, the arguments, and the types. like, we could optimize this and make it even better, but this would definitely make it possible. Makes sense.

Dex (35:11.84)
And when you say reachable classes, is that basically every class in the namespace that is accessible? Basically, like, I have 50 BAML files, it's going to include every single class that's available in my BAML source directory.

Vaibhav (35:24.802)
Now, just the classes that you mentioned in the inputs and the classes that you mentioned in the outputs and any classes that you.

Dex (35:32.724)
and then traversing that tree that those things all reference recursively. Okay, cool. Okay, so if there's other classes, if I didn't put person in the signature, then the optimizer wouldn't know that I had a person class. Okay.

Vaibhav (35:36.624)
Yeah.

Vaibhav (35:45.678)
Yeah. Now I could imagine a scenario where you want to explicitly tell the model, I also have these other data types and we include those as well. But I would say that's like an extra thing that you do, but the default thing should be to give it the minimum set of code that you want to optimize on.

So let's go on. let's just read the prompt. I'm actually really curious how this prompt pans out because I think that's, it's one of the most fascinating things. I, it makes sense that the proposed improvements knows the failed and successful. Uh, what's optimization objective? Uh, that is the list of all the metrics that you care about in their weights. So, um, that would be something like accuracy, 50 % input tokens, 25 % completion tokens, 25%. Got it. And you're just telling the model, I care about this in this way and they can't really.

I guess they can't really actually understand the weights. You're just giving some relative subjectiveness. So giving an accuracy of like 0.51 versus 0.5 doesn't actually make a difference since it's going into a model input. But you're really trying to give it relative importance. like, this is twice as important as this other thing. So you don't need to be specific, just like orders of magnitude is what you're trying to convey. Exactly. Got it. Current metrics, that's like the result of the current prompt. How well did that?

Dex (36:53.782)
Cool.

Dex (36:59.656)
against your optimization objectives. Cool.

Vaibhav (37:01.648)
Okay, now I have another question. Did you JEPA the JEPA prompts? Excellent question. No, I did not JEPA the JEPA prompts. But I'm sure if we did, this would work even better.

Dex (37:07.37)
Hahaha.

Dex (37:14.56)
Yeah, how would you compute metrics of the, you kind of have to know a dumb prompt and then know the best final prompt and then optimize against its ability to reach that, right?

Vaibhav (37:25.392)
Yeah, so the inputs would be prompts and outputs would be performance of the optimization process over those prompts. I can tell you one, like, you maybe get a hint of why that becomes kind of a pain to do here on line 104. Usually in BEML, your prompt starts with a single hash and then the quote to make a raw string. Double hash is if you need...

Dex (37:37.057)
Yeah.

Ha

Vaibhav (37:52.418)
If you need to use single hash quote inside your prompt for some crazy reason, then you can use double hash to get an extra level of rawness. The more recursive...

Dex (38:02.006)
How many hashes are supported? Can you have 50 hashes? Seven is the max? Okay.

Vaibhav (38:04.465)
Seven. Seven hashes of... So you can have seven different types, layers of hashtags within hashtags within hashtags in your system. If you want to optimize your optimized, optimized, optimized, optimized, optimized prompts. Well, I want to go down and see a couple more things. What are the most interesting things that you discovered when you're actually writing this? Let's see. I think I ended up iteratively adding a lot of stuff.

I didn't realize at the moment I would need, but in hindsight it's extremely obvious. So one example is what you asked about before, like the full text of the function. And this is like an interesting factoid for prompting in general. It's so hard to remember your own implicit knowledge when you're prompting and to remember the fact that you have to be explicit about all those things. And yeah, this was...

Implementing this was a huge reminder of that because when I look at a prompt and I see it fail, it's fairly obvious for me to think about how to improve it. But it's not obvious for me to like enumerate all the things that I know when I'm doing that. So yeah, just seeing optimization fail over and over and realizing, wait, is because of course this prompt has no idea what the failure cases were. it knows the test fails, but it doesn't know the source code of the test that failed. So it doesn't know what it's trying to get the prompt to actually do.

Ah, because it's not actually sufficient to that the test failed. You really want to say the test failed because this specific field is missing and you want to be as rich as possible on that. And not only do you want to do that, if you only show the failure message, let's say you have five asserts in your test case, whatever test case you write, and the second one failed. Well, if you gave the failure message a second assert, the model can't look ahead and say, also need to look at all these other failure scenarios as well and optimize for all that as well.

Otherwise what might happen is you pass the second one, now the fourth one failed. And you're just wasting iteration time. And because the molecule can reason about source code, putting the whole source code in there is way more optimal than just the failure string itself. That's really interesting. I didn't think about that. would have, the naive person in me would have just put the error message of a search statement. And I can see why that's just strictly worse in a lot of scenarios.

Vaibhav (40:26.82)
Let's go on, I want to see more of these prompts. So we have the new improve function, this seems to work. I assume you do a lot of stuff in here that you can render different stuff in here. We're rendering the current metrics.

Vaibhav (40:41.21)
and then we include some instructions about writing demo. Got it.

variance. We've got two optimizable functions. So merge variance is the combined prompt prompt that you have.

Vaibhav (41:00.336)
and that's where strengths come from. Strengths come from...

Dex (41:04.972)
Where do those, yeah, what generates those strengths? We can focus on this one first, but I also want to see how we're generating the strengths. Okay, that makes sense. The reflection step is what tells it, okay, here's what these ones are good at. Okay. And reflection model is just an LLM that supports thinking or something, right?

Vaibhav (41:09.008)
reflection reflects

Vaibhav (41:19.6)
So this problem

Vaibhav (41:27.12)
We'll point that in a second. yeah, I agree.

Dex (41:30.028)
these are just names for which LLMs are doing which parts of the work, basically.

Vaibhav (41:34.818)
Yeah. Do you want to? I can show that really Yeah, do it. In our case, the prompts all have their reflection prompts, and they all share the same model. But you could change that if you want, because you can customize JEP without VAML. yeah, right now we've got that set to Cloud Opus 4.5. And as models get better, you could choose different models here. Or if you discover that.

For some reason, the combined models function is taking too long, and you think it's a fairly simple task, you could specify different LLM providers, and you could use those in your different prompts in Jepa.aml. So you kind of pick and choose how much power versus price you want for the different stages. And I get, yes, that's interesting. You can choose not just the model you want, but actually swap to different models for different stages.

That's very fascinating. I didn't think about doing that. Does JEPA do that by default? I don't know. OK, got it. You mean our implementation? Yes. No, no, we just use one model for everything. What does JEPA do by default? No stance made? You mean, well, there's different implementations. The DSPy implementation or the default JEPA library implementation? I know there's a command line argument that you can choose which provider to use. But I don't know how much control you have over which specific.

Got it. Cool. Let's go on. Let's go back to the second prompt. So this prompt looks pretty straightforward. Merge to variants. Makes sense. And then it kind of just looks at both functions as this is the better ones. Got it. So this is You don't give any ideas about the scoring or anything or the final objective in this prompt. You purely just say these are two good systems. Make them better by combining them in some way.

myself what's in

Vaibhav (43:30.81)
Yeah, I think you're right. Yeah, we don't reiterate. And that might actually make this prompt perform better if we remind it the relative weight. Cool. And then let's look at the next thing. Right there. Analyze failure patterns. That's what I've been kind of loosely calling mirror reflection. the whole algorithm kind of thinks of these three together as reflection. sorry, being a little inaccurate. But yeah, this is the one that's more like introspecting on how did the model do and why.

So it specifically looks at failure. Yes. So I'm guessing if you have no failures, you don't call this. You might call it with an empty list. OK. Or maybe you don't call it at all. OK. Yeah, I think it gets called with an empty list.

Dex (44:14.772)
And what's the output type of this?

Vaibhav (44:18.992)
failure analysis, which doesn't tell us the time. Let's go look at that.

Vaibhav (44:27.736)
Okay. Okay. So like in what ways did the thing fail? Common patterns to be totally honest, I could not remember what that does at the moment. And recommended focus, like looking at all the failure cases, what would be the most fruitful thing to optimize if we were going to make a new version? And naturally that comes from like, you know, was it mostly failures?

in tests that happened or was it mostly that like there were too many alpha tokens or too many properties? Got it.

Dex (45:03.094)
Question, like, so I understand there's probably some been tweaks made to the, how do I say it? Sorry, I just, I saw what you had selected in the search bar and it made my brain skip a beat.

Dex (45:22.684)
there's some tweaks to this, that you have done to make it more BAML specific, but as far as the types and the outputs and things like this, to what extent does this follow kind of the core JEPA paper? Like was common patterns one of their things? Are they just out putting all this in Markdown instead of structured output? Like what is, what, what percent has this kind of departed from what's prescribed in the paper versus like

what you wanted to do to make it more BAML, one, more BAML fluent and understand BAML code, but also more, hey, I want to use the structured output things that BAML is really, really good at to build a best in class JEPA implementation.

Vaibhav (46:05.521)
Yeah, it's like 50 % faithful, 50 % departure. And you mentioned some of the departure, like we have BML specific stuff we need to do. But also like DSPy has been focused on this exact problem for a couple of years or something. So they have like a ton of different ways of customizing their JEPA implementation. You don't have to use JEPA, there's like many different optimizers you can use in DSPy. We didn't want that to

Dex (46:11.295)
Okay.

Vaibhav (46:35.484)
be like our core focus. We just want to basically take the best algorithm and give something that's kind of like convention over configuration for the most part and just let you get some level of optimization. There's some tunability, but we're not trying to go like all the way and completely faithfully implement that algorithm that they are sort of kind of carrying the standard for and constantly improving and pushing the state of the art on.

And also because they're pushing this to the art and they're like purely focused on this, they kind of have a different set of constraints. Like we're, we absolutely want to stay focused on like the core BAML story where...

you always have the types in hand and the prompts in hand. you sort of want to be, although you don't have to nitpick the writing of the prompts, it is still part of our thesis that you should always see the prompts. And you should see the prompts before and after it gets rendered. And that comes through in our UI. And it's like a philosophical difference from DSPy, which is exploring another developer experience that says you shouldn't have to look at your prompts. That's kind an implementation detail. And these are just like

philosophies that push them in different directions and that's a reason for more of the departure between the two. Yeah and I would say

Dex (47:52.556)
Right, you define your output types and your input types and some very high level around like what does good look like and you don't think about prompting.

Vaibhav (48:00.401)
Yeah, and furthermore, not only you don't, it's very, very hard to actually get the prompt out if you wanted to. And I think the difference really is like, I suspect most of these categories and stuff, these structs that we've defined, philosophically probably follow the exact same steps because we followed the JEPA paper pretty closely. But the exact prompt itself, like I don't think JEPA says, thou shalt write this prompt. I think JEPA is more of a process.

and the way, the mechanism of doing it. And I suspect that the data models themselves enable things like, for example, building up to E that we showed earlier that make it very different. If you don't have those data structures, you can't build a two E. You just have to look at like raw strings, right? Cause you need structs to highlight things red or green. You need like arrow keys to navigate to the right system. That just requires structure in some form factor or another.

Dex (48:55.041)
Yeah, at the end of the day, under the hood, you want to hide, if you're okay with hiding and black boxing everything.

You can just have LLMs passing Markdown back and forth to each other all day. But if you want to actually be able to structure the output and give someone visibility into how the optimization process is going and what's the steps and the rationale, all these different things, then you're either, you're, you're going to have to structure it at some point. So why not make the plumbing be structured rather than, rather than just, okay, there's Markdown flowing everywhere. And at certain points we will, we will generate structured objects from those pieces is like the only other way I could think to do that. But again, it's like.

Vaibhav (49:02.136)
Yeah, exactly.

Dex (49:30.031)
This, yeah, this makes a ton of sense.

Vaibhav (49:32.292)
Yeah. And then the other side effect that you get here is like, because all these prompts are now exposed, they're no longer like an implementation detail. You as a developer might find that, hey, just like we found a beneficial to tell the element a little bit about DML and like ginger and small things like that, like how do you escape strings? And tricky things that like you might not want to include. You as a developer might be working in a very specific domain. You might actually want to tell it about specific types that you have in your code base. You might want to tell it about, you might want to tell it about like

very domain specific information that only the optimizer needs to know about. You might want to tell it certain certain things about your eval set. Like, hey, like don't over index on this specific test. Because like this test is just known to be extremely hard and we don't really want to care about it. And typically the way to go do that, I think would be very hard. But one of the most important things that we're thinking about when we're thinking about prompt optimization was like, how could I as a developer not only have control over my prompt and my types, but also have control over the optimizer.

because the optimizer itself is a prompt and types. And I think that is like the more interesting system here. And then soon, I think someone else asked about this is you probably don't want to optimize pure. You probably don't want to optimize just like LM functions. You probably want to optimize entire workflows. And that might include optimizing LM functions. That might include optimizing control flow around LM code. It might kind of be a combination of both. And you want the model to be able to do all of that. And I think that hopefully it's a thing that we can enable soon as well.

which is beyond just like, make the prop better. It's make the whole system better.

Vaibhav (51:10.606)
What's your- I know, I'm-

Dex (51:11.021)
some very cool links in the chat here. Yes, a meta optimizer for optimizing LLM optimizers. Someone already did JEP perception.

Vaibhav (51:20.464)
Yeah, I figured. It's like the most intuitive thing to do on top of that. But a question I have for you is, I guess the nice thing here is, one question I did not see answered that think someone else asked a little bit ago is, how do I write my e-bills?

Greg, how do I run my evals? Yeah. We didn't want to change the language to let you write evals. And we wanted everything to be in BAML, as opposed to in DSPy, everything's in Python. So we kind of shoehorned evals into our existing test infrastructure.

Already in BAML you can write test cases like this. You choose a function that's on the test. You give it its arguments. And then you can write some assertions over the running of that BAML function. Those are the evals that we have to work with.

In the future, think we could extend this pretty easily through the CLI arguments. If you wanted to pass a CSV file full of pairs of inputs and test cases, we could do things like that to streamline this, again, without changing the BML language.

But yeah, does that answer the question? Yeah, you just write a bunch of asserts along the way. And then the next question I have is like, I think we were talking about as a part of the JEPA algorithm, a large part of it is not just finding one metric or two metrics. What metrics are there? Like what metrics can I run? What can I not run? Where am I shoehorned? How do I write a custom metric?

Vaibhav (53:02.2)
Again, because we were trying not to change the language at all, we had to use existing stuff to put custom metrics in there. And we have this thing already called check, which lets you name an assertion and make the assertion soft. Checks are not hard failures. So using this, we can sort of discriminate between different types of failures. And you can have multiple checks that are called the same thing.

Maybe we'd put this one in a different class.

Vaibhav (53:36.516)
I'll put this one in our test about. And now that we've got a check that has a name, we could use that as a weight when we run optimization.

Dex (53:52.424)
sick. So it will default weight everything equal and accuracy comes from the like failed versus past assertions, but you can add additional checks that won't show up as failures, but they show up. You can use them to power ancillary metrics.

Vaibhav (53:54.448)
Yeah.

Vaibhav (54:05.85)
next.

Vaibhav (54:13.518)
Yeah, that's cool. That is cool.

Dex (54:15.425)
That's freaking very clever, clever. Like I love like, hey, what are the boundaries of the language and what does it afford us? And then how can we use it to deliver this thing without, you know, adding an entire new language feature.

Vaibhav (54:27.684)
Yeah, that's really cool. What about if I wanted to optimize for like input tokens as well? yeah, that's a hard coded one that's called comps tokens. Yeah, got it. Okay. Got it. So then you can just go to it. And I noticed that it doesn't have to add up to one. So I guess I can put it in whatever I want and the model will just figure it out. We use advanced norm tech.

Dex (54:35.405)
So you have a bunch of built-in ones.

Dex (54:45.963)
Yeah, what if you put in like prompt tokens matters 100 times as much as accuracy?

Vaibhav (54:52.432)
You will get very short. First enter, let's run it.

Dex (54:59.863)
You

Vaibhav (55:02.96)
What? Hcheck. you might have to write check colon Hcheck. Check colon Hcheck? Yeah, it's check colon Hcheck. It's how we namespace it. there you go. The error message told me that. Sorry. It was in my break brain. While this is running, so funny. So what is p to, it actually shows me a prompt token.

Dex (55:06.061)
doesn't like your H check.

Dex (55:19.981)
Ha

Vaibhav (55:29.296)
That's cool. So you actually show me prompt tokens because like now it's relevant to my metric. By default, you don't show it. And this is going to be a tough one to optimize because remember our baseline prompts was very sparky.

Dex (55:29.453)
Yeah.

Dex (55:40.301)
Okay, so now it's passing, but the prompt tokens went up to 86.

Vaibhav (55:44.048)
Not, yeah. So it's on the Pareto frontier but not because of the main metric of cargo.

Vaibhav (55:55.216)
It's not even making sense. I want a shorter...

Dex (55:58.926)
I tried another one. It looks like the age check isn't passing for some reason. That seems like maybe a blip or a bug.

Vaibhav (56:10.296)
Yeah, it's probably a bug. We haven't released this yet.

Dex (56:13.9)
we made it shorter. And it still passes.

Vaibhav (56:16.279)
that's pretty good actually. yeah, and you see how it made it shorter? It used aliases for these. that's cool. That is cool.

Dex (56:24.289)
Ha ha ha!

Dex (56:28.371)
Alright, hell yeah, I'm glad I asked.

Vaibhav (56:31.504)
That was a good question. think if we give them more than three trials, it would probably cut some of the fat from this prompt as well. Prompt optimizers are pretty good. I think the key point here is like, I think we shouldn't live in a world where we have to write handwrite our prompts. We should live in a world where we can have prompts be automatically generated because it does help us explore the state space much, much better. But

Dex (56:43.277)
That's sick.

Vaibhav (56:58.082)
I think living in a world where you don't ever read the prompts is also a problem. Like for example, the fact that we all just looked at this really quickly. I remember earlier, there was a whole point that someone else made of like, isn't it overfitting? If you don't look at the prompt, you can't possibly know if it overfit by accident or not. The metrics are not enough because like we said, one of the benefits of JEPA is you don't need a lot of sample points to end up with a good solution. But then it's very, very easy to accidentally have overfit.

if your sample points are actually not representative of the actual overall problem. And you gotta see the problem. Now go ahead.

Dex (57:31.853)
And you're talking about a thing, sorry, go ahead. No, you're talking about a thing that I think is super, super important that we talk about a lot. Like we did the evals episode. You're like, dude, just do the, for the first pass, like it's like 80 20 rule, right? Like your human intuition is incredibly powerful. And if you can just look at something and know if it's good or not, that's way cheaper than designing 50 metrics or trying to figure it out. And I think a challenge in AI, if you're going to build like AI that works and production systems is like,

You can't lead too far into this futuristic, like, when the models are amazing, we won't have to think about anything and they'll just like inception, optimize the optimizer for the optimizer. And then it's like, okay, but what's actually possible today? And what is a really valuable use of my human intuition and leverage? Which is like, cool, use an optimizer, but also look at the prompts because you can in five seconds see if something's been over optimized, overfit or whatever it is.

Vaibhav (58:24.067)
Exactly. Exactly. I think that's the world that we want to live in is like some blend of those two systems. Well, it's super easy to understand that. funnily enough, I have another question that I think a lot of you are asking is like, does JEPA thing seems super complicated? And that was my first opinion of it too, when it first came out. It's just like, man, it's going to take forever to add up the demo. That's why we haven't added for a long time. But how long did it actually take Greg? Like literally from concept.

to working and I guess to merging soon. It was three days. Three days of work. Fully, with all this tooling that you're going to see over here. It's not that hard to understand Java. It's not that hard to even build it on your own. Most of these systems that you're building are not that complex. Anyone can go build them. You can build it on your own. You don't have to be tied to, you don't have to use our system. You can use your own system if you want to go build it. That's the whole point. So.

Dex (59:20.718)
Okay, so the new to-do list app that everybody implements in 2025, was everyone should build a coding agent from scratch. And in 2026, everyone should build a prompt optimizer from scratch.

Vaibhav (59:31.396)
That's right. Everybody should build a prompt optimizer from scratch. That's what we should title this episode. We'll take some more questions from people on here if they have anything to share. And I see the first one over here, which is, would BAML keep the original prompt versus a suggested one before a developer accepts the improved prompt? So how do I actually replace the prompt in my code? So right now, if I quit, they won't update my prompt at all. How do I actually replace my prompt?

The CLI gives you an option. You select the one you want. Like here, I'm selecting different ones. If I hit Enter, it's going to replace. OK. There's also, like, you can run the thing in non-Tui mode, and then you'll get like a pop, like a question, you know, where you answer by hitting 1, 2, 3, 4, 5. Like, which prompt do you want to replace your existing one, or none of them hit Q? Got it. it. So you just select, and then we just replace the AST with all the updated code accordingly. Yeah.

Okay, let's ask another thing. During optimization, are input and output types treated as hard contracts? Types can't be changed during optimization? Correct. That was a decision that we had to think about because of course you can optimize the types themselves, like the fields, what fields there are, what their names are. because users are generating client code, like TypeScript and Python code through CodeGen from the types, we didn't really want to mess with that.

because then optimization is going to change something about the way that you have to consume those types in your application. And that seemed like too much of a pain for users. So that's why we only let you change the prompts and metadata on the types, like descriptions and aliases, which don't affect the generated client code at all. But we could pass in an argument that says types can be changed if we wanted to. We could, yeah. Cool. That's interesting.

Dex (01:01:18.99)
Dex (01:01:26.51)
Guys, this was a blast. This is super sick.

Vaibhav (01:01:29.422)
Are the docs live? Yeah, yeah, we have docs for all this. risky.

Dex (01:01:37.794)
Hahaha!

Vaibhav (01:01:41.138)
Mario, just check it.

Dex (01:01:42.83)
Was that a chat message you complained of Ibov how much you hate going on his podcast?

Vaibhav (01:01:48.136)
AI that works is a mandatory company-wide attendance policy. And prompt optimization. Okay, so we have a docs on prompt optimization on there that I guess, does that click on it? It clicks. it clicks, nice. And it tells you exactly how it runs and describes some of the behavior on here that we showed. Cool. I'm actually funnily, you know, it's funny, I'm probably going to do this for most of the prompts that I get.

Dex (01:01:55.458)
Hahaha

Dex (01:02:10.155)
this is dope.

Vaibhav (01:02:16.017)
Because for example, whenever I go and show people different prompts and help them migrate over, I just run this manual prompt optimizer in my head. But this is just so much better. That's another reason we didn't implement that at Boundary Prompt Optimization, because we already have BIPOC.

Dex (01:02:34.094)
Yeah, ViBov, the human prompt optimizer. I have one last question. I know we're gonna probably wrap up soon, but I'm curious. I know ViBov built a coding agent in BAML like four or five weeks ago for one of the episodes. Have you all thought or tried to apply this to longer horizon multi-turn style systems? Like, you build a coding agent and then plug this into Sweebench and see where you can get with it?

Vaibhav (01:02:37.182)
Vaibhav (01:02:58.447)
You

Vaibhav (01:03:04.26)
You should be very excited for what we're going to release in January. Hopefully, I think in theory, should work with this optimizer out of the box with almost no extra work.

Vaibhav (01:03:18.448)
And that will be really fun. And Greg is sad because he feels like maybe I just signed up for more work. But it's going to be really fun, specifically in the form of how to define custom metrics, how to define custom evals. Check is a great solution. But I think there's a more interesting one that we could build that's even better. And then most importantly, is this open source? Is this public? Can you go see how we actually build it? The answer is, of course. Like we said.

Dex (01:03:18.817)
I'm excited.

Dex (01:03:26.787)
Ha

Vaibhav (01:03:48.592)
This stuff is not hard. It's pretty easy. So there's no point in trying to close source this. Can you show the code really fast, If any of you are interested and want to go look at these prompts in more detail, want to go read some of this stuff, want to read how the harness around it works, I think that's going to be really interesting. So we probably won't link this code directly in the AI.Works repo, but we'll point to it here.

Vaibhav (01:04:12.058)
See you soon.

Vaibhav (01:04:16.337)
Oh, even better. And like the whole harness and everything is in here. There's some defaults in here that I guess probably have the regular prompts as well. And you can just read all of it. And you can just like go through, understand how we optimize the prompts, understand how we built the harness around it. Cause the harness is just as interesting as the actual prompts themselves. And I think it's worth ever taking a look at it.

But hopefully this is gonna be fun and everyone's gonna have a lot of fun and hopefully use cases that come out of this as well.

Any other questions? we'll move on. Now, for everyone else that's still here, remember, this is AI That Works. We host events every Tuesday where Dextra and I talk about various topics in AI. We typically try and do our best of showing real code. And I know today we didn't show real code, but we did show a system that works that you can use that I think will be out today or tomorrow, where you can actually run an optimization function. Hopefully, the use case of how we described.

Dex (01:04:49.614)
I'm excited to see what people build with this.

Vaibhav (01:05:16.814)
a JEPA makes sense everyone, you can try and build your own JEPA if you'd like. And then next last two weeks episodes I think are going to be really fun. Next week we're actually gonna, we're gonna close out the theater with two of what I think are gonna be my favorite episodes. My favorite episode is gonna be next week, which is gonna come through Dexter, where we're gonna hear Dexter's background story and exactly how he got to building where he's going, how he got to YC, how he got into the whole.

session of being a founder, what it's like being a founder in this age, how he met his co-founder and the whole journey behind code layer, context engineering and everything around that session. So I'm incredibly excited for that conversation and understanding that.

Dex (01:06:02.272)
And then after that, we're going to do the same thing to Vaibhav and we're going to hear his story of getting into YC, getting told that his idea was bad, pivoting 12 times and landing on deciding to do the hardest thing that anyone's ever done.

software which is like creating a brand new programming language and

Vaibhav (01:06:23.82)
Operating systems might be harder, just to be very clear and transparent. But I at least I think so, but I think it'll be a fun conversation. And I think Aaron's going to be joining me as well. So it'll be a lot more fun because he's a lot more entertaining than I am.

Dex (01:06:30.209)
Interesting.

Dex (01:06:36.494)
I was sick.

Dex (01:06:40.696)
Ha

Well, thank you so much, Greg, for joining us. Thanks, Vibev, as always. This was a super dope topic and we will see you all next week.

Vaibhav (01:06:50.49)
Sounds good. Bye bye.
