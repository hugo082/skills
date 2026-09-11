Dex (00:01.64)
Alright, ViBov, we're gonna have a new rule and I'm gonna be the host of the episode and if you're late, I get to spend, I get to talk about whatever I want until you show up. It's not gonna be good for the audience, but it'll make you show up on time.

Vaibhav (00:01.934)
Hello.

Vaibhav (00:07.96)
Yes, that is the right way to do this.

Vaibhav (00:13.25)
you can just make fun of me non-stop. And I think that's probably the best way to do this.

Dex (00:19.874)
That's true, we'll just hang out and I'll share my screen and we'll have Nano Banana make funny pictures of you. And we'll take prompts from the audience.

Vaibhav (00:30.606)
Welcome back everyone. Today's episode is going to be the standard vibe coding episode, or I guess it's not vibe coding. Exactly. Sorry, sorry, sorry. I've elevated, it's vibe with a V-A-I-B. It's slightly different. There we go. Exactly.

Dex (00:37.878)
It's called No Vibes Allowed. Don't call it vibe coding, dude.

Dex (00:46.35)
vibe coding, vibe of coding, which is somehow the opposite, lexically close, but definitionally the opposite of vibe coding.

Vaibhav (00:55.95)
Exactly.

Dex (00:58.19)
Amazing, I'm excited to get into it. So real quick, this is AI That Works. Usually we do some whiteboarding, we talk about AI content and how to get the most out of your AI tools. I'm Dex, I'm the co-founder of a company called HumanLayer. We help you get better results out of coding agents. Vybov, I'll let him introduce himself and then talk about how today's show is gonna be different.

Vaibhav (01:19.032)
Yes, my name is Vaibhav and we make a programming language called BAML. Today, I think we're gonna talk about something fun. It's a language feature we've been wanting to do for a while. And then when we do this language feature, the thing that I really wanna show is how we go and code from scratch. Like how do we go into the compiler, how do we go into the AST, how do we do design all the way through, all the way up until this feature works. Today's feature is actually gonna be something, go ahead.

Dex (01:46.414)
Bye Bob. Real quick, before we get started, your audio is absolute trash and there's a ton of background noise.

Vaibhav (01:55.527)
leave and then come back and see I think it won't let me change my mic

Dex (01:59.598)
Okay, standby folks, we're gonna build something cool, I promise.

Dex (02:13.121)
me on stream? Alright, let's do the thing. Hold on. Google AI Studio.

Dex (02:24.941)
Let's see.

Dex (02:28.919)
Let's a picture of Ibov.

Dex (02:44.566)
to share my screen.

get to it.

Dex (02:51.071)
Okay, let's make a full screen version of this guy except he's like covered with clocks and alarms so he's never late to anything and he's got a bunch of really nice audio equipment.

Vaibhav (02:53.895)
Okay, how's my audio now?

Vaibhav (03:06.611)
How's my audio now Dexter?

Dex (03:08.767)
It's somewhat better. You can't grab like a conference room or anything.

Vaibhav (03:11.625)
So, well, if we're gonna watch me really code, we're gonna wanna watch the screen. But if the audio's trash, I will.

Dex (03:19.519)
Okay, alright, no, this is much better. Did you order that mic I sent you? Yeah, here we go. This is Vaibhav when he's ready to podcast.

Vaibhav (03:23.963)
Okay, let me... I actually did. It has not arrived yet.

I wish I was that buff. Give me like a few more months. I'm gonna go to the gym regularly. So I think I'll get there. But, okay, so I think today's episode is going to be one where we talk about a really new feature. It's called testing. I think if we're in the AI world, I want to show a couple of different constructs. I want to show how we design the feature. I want to show how we implement it. And I want show how we communicate with Claude about all the nuances about it as well.

Dex (03:37.805)
Okay, that's true. Okay, you're up, buddy.

Vaibhav (04:01.331)
This is going to require a little bit of background knowledge for folks in the compiler, so I'll try and go a little bit slower and make sure I educate folks along the way about how we go make these design decisions, why certain design decisions get made. And then the goal is to just show how we one-shot everything. Like at the end, I'm not going to touch the implementation loop, it's just going to work. We're going to do everything up until design, but we're going to be really, really, really thorough at design. It's all about the...

Dex (04:24.309)
You're just gonna, you're gonna one shot everything past the design.

Vaibhav (04:28.443)
Exactly. It will just work. It will just work. This is a workflow that I've been adopting now for a while. I've showed like multiple 10,000 plus line PRs without, by being able to do this.

Dex (04:29.869)
Okay, cool.

Dex (04:39.741)
this is your design and then like turn the design back into a ticket basically, right? That's sick.

Vaibhav (04:45.511)
Exactly. So I'll show you guys what it looks like. But before we do that, I'm going to show you roughly how we do this. But before we do that, I'm going to screen share. We only really have to see one screen the whole time. We're going to want to see...

I won't share my whole screen, I guess.

Vaibhav (05:12.198)
Okay, can you guys see my son?

Okay, so first let's just really quickly talk about testing. Dexter, can you send me an Excel result link by chance?

Dex (05:24.521)
Yeah, let's do it. Yeah, because we're going talk about the feature at a high level and then we're going to go down into the weeds of how to build it. Let's get this going. I will drop it in the studio chat. Does that work? Perfect.

Vaibhav (05:39.39)
Perfect, let's do it.

Vaibhav (05:51.514)
Okay, so first I want to talk a little about how evals work and how evals have to work in agentic pipelines because I think that will help inspire how we go through this. So I want you to imagine this.

Dex (06:01.227)
This is great, everyone's been asking for a new EVALS episode.

Vaibhav (06:04.902)
Yeah. So imagine I have a black box that produces, that takes in some input and produces some output. The thing is, this is basically what all agentic pipebunds are. They're black box that produce some input and some output. The problem is because they're black boxes, how do you build understanding of what the system, where it works and where it doesn't work? So I'm going to use a different example because I'm going to use an example that I'm somewhat a little bit familiar with. I will not explain anything in detail, but I'll describe concepts that I think would

makes sense. So let's take Face ID for example. We all have Face ID. Face ID happened in the year I think like 2019 or something or 2018 or something is when it came out, maybe 2017. But it's like in that timeframe. Yeah, I mean.

Dex (06:48.973)
Classical ML, no LLMs exist. Transformer is a twinkle in some researchers eye.

Vaibhav (06:55.422)
Yeah, it doesn't even matter how it's implemented. Just imagine this black box that takes in some input image, input image, and then returns back to you, and perhaps some sort of the person's signature of some kind. What did say?

Dex (07:15.863)
Because you're not giving every person their own AI model. The model has to be able to identify different people.

Vaibhav (07:21.434)
Exactly. So we give it an input image and a first signature and we say unlock or don't unlock, right? That's basically the signal. Well, yeah, exactly. Well, if you're to go build this test suite, you're going to train this. You're going to continuously build a new black box until your unlock works. That's effectively how you're going to do this. Well, if you're going to do this, the first thing you'll want to do is build a bunch of data. Well, the nice thing to do is actually to say, I'm going to build a bunch of data. That's like,

Dex (07:28.503)
Yeah, Boolean classifier.

Vaibhav (07:50.566)
bunch of rows stacked on top of each other, where each one is a test suite. It's like a test case. I'm going to do the...

Each one of these is test cases.

Dex (08:05.387)
And you're using these for back prop and like loss function.

Vaibhav (08:09.83)
No, just for evaluating the system working. And then what am going to say for all this task?

Dex (08:13.269)
And each of these has an input image and a signature.

Vaibhav (08:17.95)
and an expected output. Well, what am I going to say for each test case? For every single test case, I'm going to say the following. I'll be like, oh, my model is, my black box is good. if I have a, if 95 % of my 90 % pass, this is good. That's a success.

Dex (08:41.591)
Right, Face ID can not recognize me 5 % of the time and it's still a very useful feature.

Vaibhav (08:47.898)
Exactly, but now I might want to say something different. I might want to say so I've defined some sort of success metric here And like it's not to say success is like the expected output is what I want It's like I might even say six. might define success slightly differently. I might say success is Success is either the expected output equal equals Like HID the result

So there's two definitions of success that I am willing to expand.

Vaibhav (09:23.005)
or, oops, I spell this wrong, or face ID, give way, Both of these can be considered success because I just never want to accidentally unlock the throne. Right. I'm biasing towards preferring correct unlocks. So technically I can have a test suite that says it never unlocks. Go ahead.

Dex (09:36.069)
I see.

Dex (09:42.999)
Yeah, if it doesn't recognize me, that's fine compared to if it thinks someone else is me. A false positive is way worse than a false negative.

Vaibhav (09:54.202)
Exactly.

Exactly. So we're already getting in some nuances. We're now have a 95 % pass rate. Well, now you'll notice some other nuances here. So what I really want to say is this is a 95 % pass rate. That's my target is kind of what you want. Well, if I have a target of 95 % and this is what's working, well, now I run into a problem. If this black box is being optimized for this, it's very easy to just have a black box that always returns false. And now you've built a system by accident that is that

Dex (10:24.941)
that passes 95 % of the cases.

Vaibhav (10:27.257)
Exactly. what's kind of interesting is I almost have like two criteria. I almost have like a name metric where it's like...

Dex (10:37.131)
you have two scores. have the like, did it get it correct, and then like, did it accidentally, yeah, okay.

Vaibhav (10:45.265)
Right. So, and you're already seeing how nuanced testing is becoming.

Dex (10:50.477)
Can I invert this one? Since, like, we're do, like, actual expected in both cases.

Vaibhav (11:02.747)
And these aren't real metrics. I'm just literally making them up.

Dex (11:06.475)
Right. But this is how you're going to construct your cost function, right? Like the total loss is, yeah, go ahead.

Vaibhav (11:10.333)
Don't think about its cost function, how you're training the model. Think of it more like, how am going to produce a benchmark that says if my system is working? Because this is not a model. You can think of it as like two models, heuristic.

Dex (11:21.279)
this is, okay, so this is not actually signal used to train the model. This is signal used to tell if we made the model better or not at like a holistic level.

Vaibhav (11:31.569)
This this is signals that says, can I ship this thing? It's like, that's why like, this is like face ID is like two models he risks takes a bunch of stuff under the hood. it's, it's not just like one thing. It's not about training at all. It's merely about thinking about testing for non determinates deterministic systems. But you can see like,

Dex (11:36.394)
Yep.

Dex (11:51.147)
Yep, and the whole point of testing is how can we automate the process of building confidence that something is stable enough to ship and is better than what we had before.

Vaibhav (11:59.645)
Yeah, and in the prior world, we lived in a world where you build this metric and you build this metric of some kind. And remember, every metric can be gamed, so we had to go ahead and go fix this. But what we had to do over here was we built this metric and then a human would go and update this system in here to make it better. And then they'd run the metric again and they'd go do this. Well, we live in a slightly nicer world now. We live in a world with LLMs. So if you have a metric, in theory, you should be able to have an...

an LLM, a coding agent, go and update this system, get the metric and go do this. But the idea is this just gives us a signal about if we can ship or not. But you can clearly see how this is good or bad. But this gets even more tricky because this is actually not how I would do this. What I would do is I would actually take this whole thing and then what I'd say is I'd actually split this into two parts. And what I'd say, for example, is something like this.

Dex (13:01.153)
You have two sets of test cases.

Vaibhav (13:03.921)
You have scenarios. have testing scenarios. One scenario is glasses.

Vaibhav (13:28.039)
So you can see the scenario already. You can see how.

Dex (13:30.709)
And so you could see, hey, look, our overall went up, but our glasses went down. Or you could see our glasses went up, but our non-glasses went down. You slice and dice the kind of like test cases into a bunch of different categories.

Vaibhav (13:36.551)
Yeah.

Vaibhav (13:44.029)
Yeah, and I might just say, hey, if glass is a glass's signature...

Vaibhav (13:50.779)
I expect this to remain at an 80 % correctness rate, but when I use Glass with a non-Glass signature, I expect this to drop to a 60 % rest or rate, and I still pass that. Again, FaceID does not have these kind of scenarios. I'm merely making up numbers just to prove the point of what I'm trying to say. But the way you think about these non-determinative systems and the way we think about our agentic outcomes has to be thought very scenario-specific. So there's two things to think about when you think about testing.

We want to make sure that people can build scenarios of some kind. And scenarios are really interesting for a couple of reasons, but they need to be like almost product oriented scenarios is how you have to come up with it as. And the way that we do metrics is also not done the way that we used to. We kind of want metrics that are like named metrics that all that all contribute to final like aggregation of the actual data set. If that makes sense. So if we're going to build testing, go ahead.

Dex (14:44.245)
Okay. Okay. So this becomes, this becomes basically like a fairly wide data set of like each individual test case has multiple dimensions and you can group and shape the data along any of those five, 10, 30 dimensions and analyze how the behavior changed across any of those.

Vaibhav (14:56.303)
Okay.

Vaibhav (15:09.934)
Exactly. So you kind of need to understand all of that before you can even think about how we're going to do testing. But now there's one last, go ahead.

Dex (15:15.937)
Does, can I throw in one, did you ever have to work with OLAP cubes? Does the word OLAP cube mean anything to you? Okay, we won't go down that path. If anyone in the chat wants to hear about OLAP cubes, maybe we'll do an episode on that.

Vaibhav (15:33.424)
So I have no idea. Well, can you give me a one second primer of what that is? I'm actually curious.

Dex (15:38.665)
It's a like standard old school BI tools. would only let you have like, you would basically create a cube. So it was a three dimensional data set. like a sales data set would be like, it would have like two dimensions and a metric. would be like sales volume and your dimensions would be like by region and by, you know, product. And that was every BI tool you had to like reduce the data set to three dimensions or basically two dimensions and a value to be able to analyze it.

Vaibhav (15:47.132)
Uhhh...

Vaibhav (16:06.854)
That sounds arbitrary, why they would pick three dimensions, but I understand why, it's because humans can't think in more than three dimensions, but still.

Dex (16:14.817)
We gave Mark some PTSD. My job, my work here is finished. I will let you get back to the AI.

Vaibhav (16:20.602)
Okay, there's one last scenario in here that I think is very important, which is typically when you write test cases in most languages, they're statically typed. So you type out the test and you type it out. The problem is the way that you actually load these is all this data is actually not in your code base. It's often loaded from a database or some other scenario and executed. your tests don't even...

Dex (16:43.115)
Yeah, and it could be SQLite or JSON or Postgres or some like SaaS app where you store all your test cases. Yeah. Yep.

Vaibhav (16:47.837)
or an incredibly secure PII storage system where you don't even want your engineers have access to it and you want it to be ACO controlled and only runnable on test harnesses.

Dex (16:57.323)
That's right. They send their test code to some like secure enclave and only from that infrastructure can the test be run or something.

Vaibhav (17:03.44)
Yeah. And like locally, it a different database that you do have access to. So you can run stuff locally and in a secure enclave where like the test set is hidden. But the point is for non-determined systems, there's like a lot of key criteria. Criteria one, you need a way to break down stuff in the groups of scenarios. You need aggregation metrics, not just like Boolean assert or falses. Like there's like soft scenarios you want to go check in. Criteria three, you need to the load data from production databases of some kind or like data sets of some kind.

Dex (17:08.459)
Yep.

Dex (17:11.809)
Yeah. Yep.

Vaibhav (17:31.674)
and dynamically defined test cases.

Dex (17:34.113)
Yeah, and in your word, production is less like production as in like the SAS environment that the customers use, but it's more production in the sense of like, this is the very highly regulated environment where there's a lot of rules around where the data is allowed to go and even if it's allowed to leave that particular environment at all.

Vaibhav (17:53.596)
No, in Face ID, yes. But in the case of agentic systems, the answer is no. You actually just want to be to pull data from prod and just get the data from prod and just be like, turn this log I have into a test case that I run. And I might even want to say run the last five, take all the logs from last month and run 1 % of them as test cases, is what I wanted to go sample. So it's almost like a moving target. The test doesn't really mean anything, but what it really signifies is not

Dex (18:08.898)
Yep.

Vaibhav (18:23.676)
What I'm measuring for is are my agents performing well for the way that my users are using my application, which is a moving target in some sense, because it's capturing user behavior and your agent at the same time.

Dex (18:34.038)
Right.

Dex (18:39.371)
Yeah, that's what a lot of these like eval platforms like claim to help you to do.

Vaibhav (18:43.869)
Exactly, but that's the kind of system you have to build. But to build that, you have to build tests. So before I go show anything else, I want to show you how you would do such a thing in Python. I have wisdom teeth problems. It's very sad. I know. was like, I thought... Dude, I'm 32. I got lucky, and I'd be one of the few folks that never have to get them removed. But I got very, very... One second. I a test in Python.

Dex (18:57.767)
Aww. Have you considered getting them removed?

Vaibhav (19:12.688)
Show me how I parameterize tests in Python and in TypeScript where I have to load data from a database where each one of those database calls is a test case.

Alright, I'll show you an example. Yeah, it's very sad. I thought I was 32 and I got lucky because typically if you don't need to buy a 25, you're solved. But no, I'm unlucky. Fadi is asking a really important question. Is this testing in production? Well, you don't want to test in production, you want to test locally, but you want to be able to test using production data. Is... Exactly. Oh, prepositions makes sense. Is preposition the right word? In, on? I think so. But maybe not.

Dex (19:24.567)
Yes.

Dex (19:44.087)
Testing on production.

Vaibhav (19:52.668)
I'm not good at English. Even on the loop, sounds are wrong. So this is how you do this in Python. The first thing you can notice is you parameterize this by case, and this is what it kind of looks like. It's just not a very good way to go do this. It doesn't feel very ergonomic, and you're not even thinking. Why don't I like this?

Dex (19:52.855)
Human in the loop, human on the loop, I don't know.

Dex (20:14.977)
Why don't you like this? I mean, like the ability to write arbitrary code to generate your test cases is very powerful, I think.

Vaibhav (20:22.5)
Yes, so we do want that, but I just don't think that in Python, so few testing scenarios after you revolve around this, that this is almost like a hack in the way that it ends up looking, in my opinion.

Dex (20:32.267)
Yeah, this is we used to call it in like go we call this like to I mean everyone's called every language you have like table tests where you write the test logic once and then the input to every test case is just data. It's kind of lispy. I know you hate functional programming, but this is a very FP style thing.

Vaibhav (20:45.5)
Yes, yes. But I think what we want to do is we want to make it a little bit more native in the way that it works. You can do, there's like a few different ways to do this in Python. I want to show you how TypeScript does it too. TypeScript does this. I really like the TypeScript approach. It looks much more clean, in my opinion at least.

Dex (21:02.059)
Because you don't have to use a fancy framework in decorators. It's very clear of like, hey, you call a function to declare a test case and then you can just loop over it and things like that. Yep, declarative.

Vaibhav (21:08.525)
Exactly. The thing I don't like about TypeScript is like, where are these magic words coming from? These are so confusing to me. Like the fact that you first describe a test case and then you like, I think they use it in some frameworks versus test. Those words are kind of like confusing.

Dex (21:27.693)
So this is BDD, right? This is the thing of like, I mean, this exists in every language. I don't know why I caught on the most in TypeScript is probably because you have a lot of like testing front end applications where you want to describe behavior rather than like, this DOM element has these properties or whatever. But yeah, I...

Vaibhav (21:32.367)
Yes.

Dex (21:44.191)
I agree that it's a little bit of a weird way to nest your test cases and when all your code is indented 30 times because you had a bunch of before-alls or after-alls or nested cases and stuff. then the assertion library, expect it to be whatever is actually orthogonal from the BDD test case words, but yes, I agree it's little wonky.

Vaibhav (22:04.855)
Exactly. The other thing that goes into it is, this is the next part of this, is once you start actually looking at these, you start discovering things like before all, before each, and then you're like, okay, well, how does that work? Well, it turns out when you go into Google's code bases, Google has a policy that says you should not use before all, before each. Tests should be extremely local because you end up overgeneralizing for things that you really shouldn't. It's much better to make every test individually self-contained.

when you go do this and it's just easier to model.

Dex (22:33.719)
So do you think that extends to like, cause like there's two flavors of that, right? There's like, and the Go team has talked about this a lot and actually the Mitchell Hashimoto does a really good talk on like testing in Go. And they basically said like, not only do we not use like before each before all, which can be a little bit like opaque from like you're reading the tests and you actually have the logic you have to scroll up to the top of the file to see what the setup is. But what do you think about like test helpers? Like.

Vaibhav (22:55.874)
Exactly.

Dex (23:01.569)
things inside the test case where it's like, you know, await, set up database record for this, set up database record for that, start server. Like you take the logic that is like repeated in every test case and build it into a helper. Okay.

Vaibhav (23:04.29)
That's fine.

Vaibhav (23:13.957)
That's a great practice. Cause like, and the reason that when I started thinking about this problem, started thinking really hard about, we use a lot of rust in our code bases and I realized rust doesn't have before agent after all. And I only realized this when I thought about this really hard and I was like, I've never regretted not having that for the last two years of my coding experience in rust. I'm really three. don't know.

Dex (23:32.429)
I mean, I'm sure there is a BDD testing library in Rust and I'm sure there are Rust code bases that follow that pattern. Yeah.

Vaibhav (23:36.763)
No one uses it. There's no chance because like Rust is like macro driven. So you just use macros and like it just, you just add, just write a shared function. You just say that is what happens a few times. And that's a lot easier to think about. So now that we've decided a few things, we decided we want to enable this sort of scenario driven testing with like metrics and everything else. We've decided that we want to go ahead and not have before each and after all, cause it's complicated.

Dex (23:42.763)
Right. Okay.

Dex (23:49.738)
Mm-hmm.

Vaibhav (24:06.715)
There's a few things that are implicit. Because of semantics, we want to able to describe the name of the test with strings. This is a way better way to describe the scenario than glasses, underscore glasses. Making the variable name is arbitrary. We don't really want to do that. We want to use strings to describe things when possible, because it's very scenario-driven. Now we can actually start beginning on this.

Dex (24:29.655)
Yup.

Vaibhav (24:33.423)
So it's very important when you do full agented coding, at least in my opinion, to totally understand the surface area of everything you're doing. And all these conclusions that I'm sharing are actually... I wish I had done this from scratch. I have not. I have done a lot of legwork. Well, I should say my co-founder has done a lot of legwork in doing this.

Dex (24:35.339)
Yeah, what is... Yeah.

Dex (24:55.371)
Yeah, this is the next thing I'm interested in is like, can we look at the desired syntax and like what we think the feature should look like?

Vaibhav (25:04.122)
So I think I can share it on here. So this is like a very, the first thing that we'll look at. There's a little bit more niceness that I'll go and update in a second. But this is kind of what we want at a very, very trivial level. You want to able to say you have a test, a test runs this, and then a test runs arbitrary code. It's nicely sandboxed. It's you're running very, very trivial amounts of code. And then most importantly, you want to have some sort of metrics. So we'll talk about these metrics in a second really fast.

and what these are versus assertions. But the syntax is pretty straightforward. We've done a lot of legwork already comparing its existing syntax and existing patterns and other things. We were deeply inspired by Zig's ergonomic syntax. So that was a bias that we have already. Zig's way of doing testing is really nice. Zig is phenomenal the way that he testing. But I want to show a couple of things as soon as I go down here.

Dex (25:47.597)
Nice. We like Zig.

Vaibhav (26:01.163)
Actually, I'll show Obsidian. I think I have a better version of Obsidian. And then let me switch this to dark mode. I apologize, amigos. I actually like reading in light mode. Call me a heathen. But it's phenomenal.

Dex (26:13.581)
You can leave it. Why do you want to change the dark mode?

Vaibhav (26:16.688)
okay, well if people don't judge me, I'm gonna leave it light mode in that case.

Dex (26:20.885)
I mean, I was going to judge you either way, so.

Vaibhav (26:23.77)
Let's quickly look at this and see what it looks like.

Vaibhav (26:34.362)
shift plus? Nope.

Vaibhav (26:39.298)
Okay, so this is like the smallest possible test case that you can have.

Ignore this bottom part Where you basically have let's say you have a and perhaps a just something that is able to judge the quality of an input So you give an input now, but it gives you a float back Well, then you have your actual function. It's gonna translate It's a function takes some language and then a target and it produces some string back out all your guaranteeing that it's not no That's the only hard guarantee you make then you make a lot of soft guarantees Soft guarantees are saying oh, I want to guarantee that

I want to contain that this contains expected thing and the quality is more than at least 0.7. It's very soft.

Dex (27:17.619)
Is the difference between assert and check sort of similar to like the like, like I know a lot of languages support like a, like non-blocking failure where it's like, Hey, I want to know that this failed, but I want the test to continue executing.

Vaibhav (27:36.236)
I wouldn't even think of as a failure. Think of it as a metrics collector. You're collecting a metric that is named something that processes on these two elements.

Dex (27:39.649)
Yep, yep.

Dex (27:45.451)
Yeah, most frameworks that implement this not as metrics would just be like, cool, we're going to print that this check failed, but the test will continue to run. And then if there's at least one failure, then the test fails. we let it run all of the evaluations before we actually exit the test. Yeah.

Vaibhav (27:51.373)
Exactly.

Vaibhav (28:00.282)
Exactly. So this actually has nothing to do with whether the test fails or not. This is merely about giving you a metric. If you go back to what this is about, I don't care that this test failed. Like it's fine that we got a bad unlock some of the time. just, the whole scenario might fail if exactly. And if the percentage is less than 0.1 % is more than 0.1 % then the scenario fails, but not the individual test.

Dex (28:07.734)
Okay.

Dex (28:15.147)
Yeah, I just want to know the percentage.

Dex (28:25.363)
I see. So you're going to have like another like, assertion on the entire scenario or the entire test suite that like makes assertions about the values of the check metrics.

Vaibhav (28:37.036)
Exactly. So now let's define scenarios. Well, scenarios are test sets. Test sets have names, but they run arbitrary code on them. And then in every scenario can define more tests.

So it should read pretty straightforward in terms of what's happening so far and how this is being designed and what you're getting out of this question so far.

Dex (28:59.851)
Okay, so this is going to emit a separate metric for every test case based on the ID and the trace. Okay.

Vaibhav (29:05.594)
Exactly. So now the problem is, when I run tests, I want tests to run extremely fast. So if we run tests extremely fast, we first break this process down into two processes, collection and then execution. That's how good testing libraries do it. Libraries that don't do a full collection sweep at the beginning, I think are incorrect. I should be able to list out all my task cases really, really fast. At least, I think so.

Dex (29:19.275)
Yep.

Dex (29:33.773)
Okay, so you don't want the like async iterator where you feed one case off of the collection at a time.

Vaibhav (29:41.498)
No, and the reason you don't want that is because, again, we go with the principle, I want tests to run extremely fast. So if I want a test run extremely fast, means tests should run maximally in parallel. If I'm running tests maximally in parallel, well, then you got to know what they are. Like parallelism is impossible without pre-collection, is the claim that I would make. So we must run collection first. So that's like another assumption that we're starting with.

Dex (29:53.771)
Yep. And so you need to know what they are.

Dex (29:59.362)
Mm-hmm.

Dex (30:03.073)
Yep. Okay.

Vaibhav (30:11.254)
And again, I know that there's a lot of background before we get into the actual code, but it's really important that we all deeply understand the problem before we code. So today's episode will be slightly longer if you watch me code the whole time. But I think once we're all caught up with all the knowledge, then we can go start the coding side of it. So now we go do this. Well, if I'm going to run this in production, there's another element of this that we actually have, which is if we go back to the system over here, we talked about correctness. Well,

Correctness is kind interesting for FaceID. Remember, this thing is a non-deterministic system. Same inputs might produce different outputs.

So what I might really want to say is, even though I have this, I actually, what's this test case should actually run three times with a little bit of jitter on every input as I run it, or this, or this test case should just run three times in general. And when I run this test case every three times, I want to guarantee that, Hey, it, none of the time should bad unlock at least one of the times should unlock. And that's considered correctness. That's considered bad unlock this.

Dex (31:19.181)
okay, so you're like taking the max and min of the three cases, basically.

Vaibhav (31:25.785)
Exactly. And at least one pass guaranteed none fail. And that's considered a good system for this one. Well, that gets really tricky to go right. There's two ways that we can go do this. The one way you can do this is you can, you can literally triple every test case. Well, you can, for every test case, instead of being a test case, these are all test scenarios where you have a three thing and you build an aggregation metric.

Dex (31:27.36)
Okay.

Dex (31:32.919)
Yep.

Dex (31:36.908)
Okay.

Vaibhav (31:52.665)
But really the tricky part is you're kind of building some sort of aggregation logic here, is the idea. So you're no longer running the test as you thought you were. You're kind of running the test in different ways and with different principles. So how do you go do that? Well, what you really need is you want something where you can actually design the thing that is running tests at the same time. So you want to be able to choose how you run the test. So in this case, this is a quorum runner. A quorum runner says run it up to five times, at least three must pass.

And if at least three pass, this works. Well, what is a quorum? Well, there's a couple more things I can show you, but I'll just show you what a quorum is. A quorum is just a thing that returns a lambda that takes a test. It knows how to run that one test and then produces a test report. So it just tells you exactly how it's going to run itself. So this quorum says you'll run this up to and you'll run this five times and you'll guarantee that at least this many of those times passed and you'll just produce a quorum test for this.

So it's a really simple loop. You run this many times and you collect the pass rate and that tells you whether or not this test actually passed. It's a way in testing to like advance the testing to change the test report to meet some other criteria based on your execution model. If that makes sense.

Dex (33:07.925)
How would you consume this? So I'm defining the run once as a inline function that is passed into the quorum runner.

Vaibhav (33:16.825)
Well, run once actually just comes directly from the test that you defined. This is run one. It's going to run this block of code. And every single test produces... Exactly, it's unexplained. You don't have to think about this. Every single test...

Dex (33:25.439)
Okay, so it's not explicit.

Dex (33:30.773)
The run once call is basically just a internal wiring of the thing the user wrote in the test case. Okay.

Vaibhav (33:39.573)
Exactly. And then you got a run report out of this and then a run report can produce another test report out of this. What's interesting about this is you actually can do a lot of metrics like this. For example, you can build a retry runner where you have run once and you run and if any of them pass, you instantly return. If none of them pass, then you return a failure with like the logs of every single failure that happened. Then you'll go ahead and there's a way, for example, like you might want to say,

Hey, run this, but I want to change what client it operates on every single time. Like I want to change this to like switch models as I go. Yeah. And I just want to go run my test case for this. You don't really want to change your test case for this. You kind of want to change the runner of some kind. It's kind of what you're really doing and how you want to think about this.

Dex (34:10.999)
Yep, GPT versus Claude. Yep.

Dex (34:20.779)
Yeah. Okay. So this is parameterizing across a matrix, basically. Instead of just loading a list of test cases, you're giving me the ability to create a matrix runner.

Vaibhav (34:25.845)
Exactly, but you're thinking about this

Vaibhav (34:31.097)
Now the next thing you want to go is you want to say, well, once you go do this. All right, well, there's a document here.

Dex (34:38.955)
And so sorry, that quorum nine seven means we're going to run it nine times and we require at least seven of them pass. Yeah.

Vaibhav (34:46.326)
Exactly. But also what's interesting is because it's just functions, you can kind of define your own execution model for any one test as you want. You can also require this for test sets. Test sets can also have quorums built in.

Dex (34:55.255)
Sick.

Vaibhav (35:01.559)
And what's really interesting is if you wanted to build some level of serialization, for example, you can also build serialization because you can just say when you implement a quorum, when you implement a runner, one of the things that you can do is you can just say one of the things a runner takes in as a parameter is a semaphore. And before you call run once, you require the semaphore to exist, then you call run once. And because it's a shared semaphore across multiple tests, it basically guarantees that tests are not.

They're running in parallel, but they're definitely not executing in parallel. They're locked.

Dex (35:34.241)
Hmm, okay.

Vaibhav (35:35.245)
And that kind of makes sense. So this gives you the ability.

Dex (35:37.535)
I mean, I don't see how that would actually make my test. If the slow part is the test harness, then yes, those things can happen in parallel. But if my actual execution is not paralyzable, isn't that going to be the slow part?

Vaibhav (35:50.585)
but you opt into when you want tests to run in serial. So the idea is as a developer, you say that these tests have to run sequentially, these tests can all run in parallel. And you as a developer have to make that claim. We can't provide that for you.

Dex (35:58.337)
Yeah.

Cool.

Dex (36:04.002)
Yep.

Vaibhav (36:05.687)
Okay, cool. So now that we've done this, now you've seen the level of document that we've done and the level of history that we've done off of this. Well, this is still not enough. We have to go to the next step, which is we'll take this ticket, and I've done a little bit of this work, so I want to share some of this, where you'll want to go ahead and take this ticket, and then you'll run it through the standard RPI. So I literally copied and pasted that file directly in there. It's either this one or a different one.

Dex (36:30.593)
This is the BEP file that has all that. Okay.

Vaibhav (36:35.179)
I literally just copied and pasted everything in there and I said, go do this. And it does the RPI standard process, zero loop. didn't do any work. just told, I just gave it to,

Dex (36:38.85)
Yep.

Dex (36:43.745)
You just auto advanced it through to design.

Vaibhav (36:46.201)
I auto-advanced it to design. I think I did one thing in here. No, I didn't. I fully auto-advanced it to design. And then once I got to design, this is where I started playing with this, and I'll show you a little bit of my chat log already. We're still not done yet. So I'll show you a little bit of my chat log. I told it the syntax. I told it start going with it. It did the research questions. I did some more research. It produced a design file. It then went ahead and wrote the design document.

Then I started looking into the design document, and I started thinking a little bit more about implementation detail, because the system so far is very clearly about syntax. What is this UI? This UI is called Riptide. It's freaking great. Dextre, you should talk about it when you want to.

Dex (37:33.663)
We'll talk about it at some point. mean, I'll let you talk about it. It's a tool that we're working on for agentic engineering.

Vaibhav (37:42.024)
So I went through that and once I produced this, I then did a bunch of research and it started asking me questions about all these design questions that came up. Well, one of the things I started answering some of questions and I said, this global testing. Okay, so let me do a little bit more background. Well, in order to write the syntax, there's two levels of a compiler that we have to have. A compiler does a couple of things. A compiler takes some syntax and puts it into the execution model, the actual runtime of the language.

So what does this syntax actually say? Well, the syntax basically says something like this. This desugars directly into, let me write this into Rust to get some nice highlighting.

Vaibhav (38:28.185)
This desugars into something like this. code over here, this test set code, turns into a call to a global global testing called register test set. You register the test set with this name. You take all the stuff in the body of the system and you just put it directly into here. So you just copy and paste into the body of the lambda or the closure. It copies into here. It takes in a parameter called test set. Every other test set that's

Dex (38:52.735)
Mm-hmm.

Vaibhav (38:57.912)
constructed here immediately goes testset.register, testset.register, and it just registers itself recursively.

Dex (39:03.661)
Okay, so these can have arbitrary depth. You can have a test set that groups test sets.

Vaibhav (39:09.684)
Exactly, like this then takes in another parameter called test set and then like if I had like if I had like a test foo here that does something else This code over here would just say test set dot register test

And you can kind of see how this runs all the way through. And then all the runners just get passed in as the last parameter over here.

as one example of how to think about this. Yeah? Okay. So now that we can understand roughly how this desugars, you can tell that I put some thinking in how this implements, but not all of it. So then I start, once I had the design doc, I found some other problems with this approach. I realized, we can't actually register global things because we don't have global variables in VAML because global variables are kind of bad and evil for various reasons, and they make it really hard to reason about code.

Dex (39:43.913)
I'm following.

Vaibhav (40:09.08)
So we haven't added them in yet. So because of that reason, we don't want to go and think about this. So I started telling it, oh, what if instead of a global variable that just passed in this magic, we have a variable in a package called testing that's a registry variable that's still static allocated once by the runtime, but slightly different. So it took my feedback and I started considering this and it made some suggestions to me. I'll show you what suggestion it came up with.

And the thing you have to learn about these models is they're extremely sycophantic. If I suggested something, even the best models, and they almost always are, because they're taking a prior that is very reasonable, which is if I'm telling it to consider something, I likely know something that the model doesn't, it's going to listen to me. So this is why I junior engineers sometimes struggle with these models, because when you're a junior engineer and you tell a model something, you tell it to it without letting it know that's an idea you're considering.

not that it's an absolute fact that you should do. It's basically just going to listen to you. So whatever mistakes you have are going to compound really fast. It's really important to suggest the models very softly. If it's a suggestion and not a thou shalt do this, you need to tell the model this.

Dex (41:19.179)
Yeah.

Dex (41:27.479)
Well, and this is the whole reason why we started doing these design discussions this way, right? Is like, hey, don't tell me how to do the thing. Give me a bunch of options because either, if you just tell the model to do the thing, then it's going to just, you know, token tumble out, whatever the first thing it starts going, whatever the first token it spits out, takes it down a path. It's just going to keep following that path because that's the next most likely token. If you ask it, which of these things we should do, it's going to try to read what you actually want and be the most helpful.

Vaibhav (41:49.364)
Exactly.

Dex (41:55.061)
And so the really valuable way that these models work is really like, okay, tell me all the options and I, the human will do some thinking and you know, there is some value in brainstorming. Like the model can pull more things from your code base. can pull more patterns in, but like, know, we, yeah, what do we say? Do not outsource the thinking. If you let the model make decisions, you're rolling the dice.

Vaibhav (42:22.007)
Exactly. So let's go on and take a look at more of this. So we now have the model trying to do a global variable that's defined in some global thing for some reason. And it started thinking about this. It's still a global variable. It's just a global variable in a special magic singleton in the test package. Well, testing package. We can't call it testing. We can't call it test because test is a keyword in the language that makes it really ergonomic to read like that. So it has to be called testing.

So it did this, it started going into this, it did a lot more research, independently of the research. You can see my prompts, they're very, very small things. So I started having spec out what the testing package should look like. Once it did this...

Dex (43:03.051)
So you saw in the design doc that that was missing detail and you were like, Hey, we need to add that detail to this design doc so that we have like clarity and align.

Vaibhav (43:09.047)
Exactly. Cause it, I wish I could show the history of the design doc over here. We should, you should add that indexer so I can show. Okay. Um, cause then I could show the design doc, but at this point, the design doc had no BAML code of what the testing package looked like. Purely rust code is what it spoke about. And like the spec of the language syntax. So I want to see like, what does a testing package look like? It produced something. And then I was like, ah, this just still feels a little wrong. Um,

Dex (43:15.584)
It's coming, it's coming.

Vaibhav (43:36.663)
And it's just intuition. can't tell you how I had this. was just like, I really don't like having this magic static variable allocated somewhere. So it started coming up with ideas. Um, and once it did that, I was like, just doesn't feel right. I don't know how else to put it. It's, it just felt wrong. then

Dex (43:44.735)
Okay.

Dex (43:55.553)
where you just, have a magic basically. It's not quite a keyword, but it's injected into the, I mean, JavaScript had this problem too, is like, if you were running your tests in a test runner, you didn't even have to import, describe, and expect. They thought it felt like magic, and like, no, I agree, I hate that. I wanted to follow the same rules as the rest of the line.

Vaibhav (44:02.506)
It's basically

Vaibhav (44:09.641)
Exactly. Yeah.

Yeah, because then can't command click on describe and know what it's doing. It's really hard to understand. So I wanted to not have too much magic. So instead what we said is, instead of this function, D. Shogun like this, it started doing a bunch of stuff. Instead of doing a function like this, one of the things I realized is I actually agreed with it for a while. I was like, slopping. was like, okay, registry is the only magic. Everything else is just regular functions.

Dex (44:19.659)
Yeah. Yep.

Vaibhav (44:44.408)
But there's nothing else. And then I said, yeah, we have an existing assert key, but we want the ability pad, so assert comes with package. Small thing about like...

Dex (44:54.167)
Okay, and this is the idea is like, do you want these to be like basically functions in the language or do you want them to just be like magic things that are written in Rust and have no like the quorum thing, right? It wanted to just make that a Rust function versus have it be a BAML function.

Vaibhav (45:08.105)
Well, there's two ways that can do this. You have two options when you write a cert. You can do the Python way, which is you can write this, or you can do a TypeScripty way and do more like this. And the main benefit of being able

Dex (45:20.555)
Right, because Python has operator overloading, basically.

Vaibhav (45:25.035)
What's not about operator overloading? The main reason that you don't want this and you prefer this is because now you can do really interesting things like you can make an automatic differ built into equals. That shows you the diff of the two objects by default. If you do this, you're basically

Dex (45:40.331)
Right, because they're in, you have hooks around the inputs and the outputs versus just assert true versus assert false. And then you, the human, have to kind of describe or put in the logging to be like, if it is an error, then render the diff of the thing and like, the human, to, yeah.

Vaibhav (45:52.552)
Yeah, you have to do like.

Vaibhav (45:57.079)
Like this is just so weird to me. And then like this also changes execution order. Cause if for some reason you append, you modify the elements in this expression, then like this changes in some weird way. It's like, you don't really want to do that. You want to make a search really easy to read. It's a lot more semantic. You can write things like contains and like now you can actually write a proper string. You can make it sprint, print this out. And also when you think about like agentic systems, it's not just about that.

Dex (45:59.339)
Yeah. Yep.

Dex (46:07.245)
Yeah.

Dex (46:17.047)
Yep.

Vaibhav (46:26.303)
agentic systems can benefit a lot more from that diff because the diff is much more like agent friendly by default because you're like instead of printing on both objects you can literally be like everything is the same except for elements five and six in the race. Here's the here's the element of those two things and you can literally dump those out.

Dex (46:44.833)
Okay.

Vaibhav (46:45.877)
So anyway, that was another implicit decision that we had made. Well, explicit decision we made with lot of other background research along the way. So we did that. We've updated the design decision. It goes through and recognizes my questions. And then I think my next question here is...

Dex (46:54.185)
Mm-hmm, I like it. Okay, cool.

Vaibhav (47:07.286)
is this. So I read all of this, I was like, cool, I agree with this. And remember, we're still the old testing registry is the only magic. Everything else is regular functions. There's nothing special except for this top level global variable that we have called registry. And remember, we hate global variables. So like that's still rubbing me wrong, but I'm accepting this for now. And then I do the next part, which is we have produced we have produced a design document.

Vaibhav (47:36.121)
We've produced a design document at this point.

Dex (47:39.455)
reflects all of your decisions, right? You've basically taken everything that's happening and like compacted it into a single doc.

Vaibhav (47:45.789)
it still doesn't show the ticket2.md. Anyway.

Dex (47:48.683)
We do not have ticket in the artifact. Ticket or ticket to do not show up in the edges of the nodes.

Vaibhav (47:52.096)
Okay.

Yeah. So the ticket, remember, is I did a lot of Claude code work to produce the original spec that you saw on the BEPS website that we started with earlier. Well, Aaron did all that work. I did not do any work. We did all that work. And that's a totally separate process, like a lot of background work, a lot of understanding to produce a good ticket. Then we went through and just ran it through RPI to produce research questions, research fully automated, and we produced a design discussion.

Dex (48:06.85)
Yep.

Dex (48:16.3)
Yep.

Vaibhav (48:23.254)
Then you saw me iterate, and we can see timelines of how long this takes, just so we have a little bit more clear concept of what this active time is more important. So I kicked this off at 8.07. And then...

Dex (48:31.809)
Yeah. So that was 8pm. Yep.

Dex (48:42.221)
So you were taking breaks to play League of Legends in between this is what you're telling me.

Vaibhav (48:42.567)
and

yeah, so the way I code now is I pretty much just have like two agents running in the background arbitrary tasks and I just play League while I code and it's freaking great. SPF's got nothing on me.

I'm sorry I should say that, but you that depends on who you want to be.

Dex (49:01.933)
Listen man, you want to be the next SPF, just don't bring it into the podcast, okay? I like doing this show. I don't want you to go to jail.

Vaibhav (49:05.504)
Dude, Eggman's such a freaking... What I don't understand... Well, you know what I don't understand about certain founders? It's like, how do you make a startup that, like, just... You just literally... Anyway. I can't... I don't want to say this. I'm not gonna comment on anything going on in the startup scene right now on the internet that we all haven't heard about. I'll just not talk about that.

Dex (49:18.377)
Ha ha

Vaibhav (49:28.31)
Anyway, so that was 808 when we started that, 807.

This is ticket two. Okay. So it took me about two, like two and a half hours to come to this point of liking this design decision. Once I found the design decision, then I told it a very specific task, which is take ticket two and then create a ticket two. So that means take all the design discussion and literally just create a new ticket as if we had all this learnings from day one. It's a...

Dex (49:58.689)
And it's already read your ticket one. So it kind of knows the shape and the level of detail that you want in a sort of more PRD style thing. Like the design discussion has tons of code-based context and you kind of, you're basically like take all those decisions and, and, and distill them out into another like high level, almost like PRD style.

Vaibhav (50:16.054)
Exactly. So then it does that and like, it's actually kind of... And then it does that. And then when I read this is when I finally realized some mistakes. I like, oh, I realized, oh, well, we don't actually have like this yet. It's not theoretical. It's coming in, but it's not there yet in the existing languages we have it right now. So it added some notes. Then I went ahead and read more. And then I said, oh, I realized something.

as I read the final ticket. Because remember, when you're in the design discussion mode, you're not reading the whole concept as like a story anymore. You're kind of reading, you're so much in the weeds, it's hard to zoom out. So I was so stuck in the global variable mode, and it took me another like, it took me another like 30 minutes of processing, of like iterating on this and actually reading the file. There's a step in here when I'm actually reading and you can just see when I start reading because like the time just jumps. Yeah, like I just started reading. Like I just, I disappeared for like,

Dex (51:11.202)
Yes.

Vaibhav (51:15.71)
20-30 minutes and I just read. The whole thing. I read basically the entire design discussion. I read the entire ticket.

Dex (51:22.743)
Camilla would like to see Ticket 2, the final version that you have. Okay.

Vaibhav (51:26.098)
I will show you an example before I get into the details because I think it's going to be useful to have some more context. As I go read the ticket, I catch something. like, I don't know, my brain ticks off at 11 and I'm like, Hmm, I don't like global variables. I really never liked them. It was like a hack that I accepted instead of it doing the global variable thing. What if I just pass in a registry as a parameter instead of it saying,

instead of this compilation step doing this, what if this actually decompiles into...

Vaibhav (52:05.631)
the following.

Vaibhav (52:10.056)
and test

or file and then like file name and you just pass in the test registry into here.

Vaibhav (52:25.148)
of who knows what this type is. With Agenda Coding, one thing I found is very useful.

Dex (52:29.983)
And then instead of global test thing, you get to use test registry.

Vaibhav (52:35.154)
Exactly. And now all of these have become nicely recursively defined because this is also a test registry and this is also like whatever type this is is the same type that this is.

Dex (52:47.083)
Yep. And so you had just have one thing, basically you have one global thing that gets passed into all the declared tests for every file that ends up like basically rolling down into every single test instance. Okay. Okay. The thing you just wrote is that what Claude came up with, or like, guess, I guess that's what you, that's what you passed in in your prompt of like, Hey, let's keep iterating on ticket two.

Vaibhav (52:59.633)
Exactly, and it just kind of works with very very very low effort if that makes sense

Vaibhav (53:13.493)
Exactly. like this was again, this Claude did not come up with this. I had to come up with this. Um, so like, this, I had to come up with the design. can see what, and you can see the level of that I gave it. was very, very little. was just like, Oh, I spill it. He said like, Oh, instead of any new top level, let's cause we don't want global variables. You can just say every single test set in a file gets a single test operation. It gets hoisted into a Lambda. So I'm trying to be very technical in the way that I speak to it. So it's a little bit more understanding.

Dex (53:17.419)
Yeah. You designed it.

Dex (53:26.465)
Yeah. Yep.

Vaibhav (53:43.221)
I don't think I was trying. This is just way I speak, actually, so maybe I'm a little weird. But then I just said, do this. And it just did the thing, and then it's producing the output. Then I started thinking. I was like, here's all the options that we have for it. And it produced something. It produced a bunch of options for me to consider. And it actually suggests A and B. And options A B are very interesting. Option A says, a new testing init per file. And option B says, per package. And they're slightly different.

but it has different implications. And I asked it to try and tell me which one is better, because I don't want to think about it. So I do offload some of the thinking, but not all of it. So it actually said package B.

Dex (54:18.594)
Hahaha

Dex (54:27.405)
Well, you give it a chance and then it gives you the reasoning and you're like, okay, yeah, actually this answer makes a lot of sense. It's like, oh, we're already doing a knit per package, so we might as well do the test and knit the same way, right?

Vaibhav (54:38.338)
Yeah. And then I was like, oh, we can't do per package. I realized something. There's like some semantics in the language that actually make per package really hard. And the model doesn't have the context about how the package works, probably fully, to know that off the top of its head. So then I was like, oh, we can do per namespace. And we can also do per file if that would make the most sense. But per package basically has consequences. What they are, just ignore that. It's just what I...

Dex (54:50.365)
Mm-hmm. Yep.

Vaibhav (55:04.437)
The point of that is it's useful to have a strong background in your code base to be able to navigate these systems. And I hope by this point, you all can very clearly tell if I had Vibe coded this in the traditional Vibe code coding style, this would not work. There's so many assumptions that the system got wrong already.

So it started doing this and it...

Dex (55:27.725)
We talk about it as like these markdown docs are basically an opportunity to have the model dump out everything that it's thinking so that you can do brain surgery on it before, like, okay, here's all the patterns you wanna follow, here's all the decisions that you think are the right decisions, give me as many opportunities and give the model as many opportunities to tell you at a high level what it's thinking so you can re-steer before you drop down a level, basically.

Vaibhav (55:51.313)
Exactly. you can tell that this is pretty rapid back and forth. fairly engaged. And the times when I disengage are when I'm playing League or when I'm reading the documents. But it's pretty straightforward in terms of just reading most of this. And then this is just a pseudo plan mode with custom agent plans that we have. So there's just custom agent commands, skills that come in here.

these skills that you can find, like create plan, iterate plan, etc. And you can go do this. So then we came up, it actually realized this, like, it actually decided not to do per namespace. And that's a correct call. I can't describe why, because there's a lot of context that I have to fill in. It's not useful. But it chose per file. And then it actually said per package, we actually chained them in and we call every per file thing once in the package. And it generates this per package function as well.

So now we have a package registry of tests and a collection registry of tests that does this. What's really nice about this is this does a couple of nice consequences. This makes us that startup time for the program is not delayed by test collection, which is really nice from a system over here. And then I was like, I still wasn't convinced. was like, should we do per namespace again instead? I was like, I really wanted to explore the space of this.

Dex (57:03.311)
Mmm. Yep.

Vaibhav (57:15.252)
And the only thing I don't like about this is the cloud is only using its existing context here. It's not making tool calls or search to code base. So I know there's some faulty hood here. So it actually does per it actually comes back with a pretty existing thing. And like, actually, this is a line that convinced me a little bit. And you'll see later, I try and fight it really hard. All right, I try and fight it really hard. I'm like, I really wanted to do per namespace. It's because it's easier to execute to reason about.

Dex (57:37.738)
Hahaha.

Vaibhav (57:46.004)
So then it.

Dex (57:46.381)
from a user perspective or from a maintainer of the language perspective? Okay.

Vaibhav (57:50.804)
from a maintainer perspective. It's easier to reason about. And then I think I convinced it for a little bit. It does this. And then I said, okay, now this is still Claude. It's still doing stuff. It's still doing stuff. Okay. And then it made some assumptions. was like, namespaces are folders that start with NS. That's like how we do namespaces in VAML because we'll talk about that later. So like...

For example, the model understands this. This is not in the main space, it's just in the top global namespace. This is in the namespace. All the files in this folder are automatically in the same namespace. It works very similar to Go, if you've seen Go before. In Go files, everything in the package is shareable across files. Files don't mean anything. In an agent-friendly world, you actually want files to mean almost nothing, because agents just cat files all the way around, all the time, and file scope is...

Dex (58:26.733)
Hmm

Dex (58:34.733)
Yes.

Dex (58:47.787)
Yep, and they're just grepping and yeah. The semantics of the, yeah, you don't want the path to be meaningful.

Vaibhav (58:55.604)
Well, you um, you want minimal impact from the path meaningfulness. You want some grouping level from the path, but we can tell by namespaces later, um, and the trade offs there. So it actually did all this. And I looked at this and I was like, Oh, this is not a valid syntax. It made a bug. So again, you'll see that I like, as this is happening, while all these changes are happening, it's actually making a bunch of changes, but I'm actually reading while the changes are happening.

Dex (59:06.581)
Mm-hmm. Cool.

Vaibhav (59:22.066)
That's why I'm able to go and skim through this really fast and give a response within less than a minute. I've been producing the whole document because I'm reading it already as it's happening. So then I found this bug. So I had this prompt queued up. Please ship queuing Dexter so I can queue this and it'd be faster for me.

Dex (59:39.565)
It's coming. Well, this is why next time we do a No Vibes Allowed, sometimes these episodes we would try to do them in an hour and it's just you can't

Vaibhav (59:49.364)
I mean, you can already see that we started this at 8 p.m. It's now 11 22. And that doesn't include any of the work I was doing with Claude before 8 p.m. iterating on that to make it slightly better. So it's been like three and half hours already. So then I had to go and produce this. I was like, oh, this isn't valid, caught this mistake. was like, oh, and then we had to go riff about how we're going to go deal with this. And then I was just like, let's do the simple thing and just like dump variables in.

Dex (59:50.029)
The last time we did, yeah.

Yeah. Yeah.

Dex (01:00:01.922)
Yep.

Vaibhav (01:00:16.488)
positional order and it's up to the user to make sure the positions are correct. Exactly. We haven't decided how named a few words are going to go. So now it's solved this problem. I fixed another thing in it and I'm trying really, really, really hard to make sure that there's no mistakes because any one mistake in this ticket is just compounding mistakes I have to deal with earlier. I am for full correctness.

Dex (01:00:17.793)
positional args. Sure.

Dex (01:00:36.235)
Right, you're gonna go ship thousands of lines of code and a mistake here could lead you to basically having to throw out the whole thing. Because this is 200 lines of spec that's gonna turn into thousands of lines of code and so the impact of one wrong line is pretty significant.

Vaibhav (01:00:46.578)
Exactly.

And it creates like drift from the model when it sees like two possible truths. Then it's like, which end I do in any point down the stream, can now drift on any one of those directions. And like, you can't steer that because I can't keep up with the rate at which Claude writes code. I just pass, it's impossible for me to read code at that speed. At least for me. Some people are much better readers than I am. People that did debate, for example. So then we did this, it produced this. And then I was like, then I said, I've

Dex (01:01:08.62)
Yep.

Vaibhav (01:01:19.316)
As you can see, I'm really trying to go better than the namespace thing. I'm probably just on something. It's like 1130, my brain's not working correctly, and I'm really stuck on namespaces. And then it does some stuff. So then it tries to do per namespace. And then I was like, and then it changed it back to per file. It's really fighting me really hard on this. And then at some point...

Dex (01:01:27.394)
Yep.

Dex (01:01:39.671)
Well, you're also deep in the dumb zone, man. know you're using the one mil context, like it's not able to, like, I usually try to recontinue it at over like a hundred K tokens.

Vaibhav (01:01:52.372)
I think the model is actually correct here. I actually should not be doing in the... I should not be using namespaces. I'm in the dump zone in my brain is the problem.

Dex (01:01:59.821)
Yeah. Maybe that's part of it, right? Yeah, that theory that like Opus gets dumb at 2 p.m. or 3 p.m. Pacific time and it's like, maybe you get dumb at 2 p.m. Pacific time because you just had lunch and you don't care as much anymore.

Vaibhav (01:02:11.056)
I definitely get dumb at 11.30. So then I was working and I was like, nothing has B Rust. There's some magic thing that we have that allows in BAML for you to say, hey, this is actually data that's in Rust, not in BAML. And that allows you to do something well there. And then you can just say that this can be pure BAML. It goes ahead and makes updates. It recognizes my...

its correctness, it cleans this up a lot. And then I realized, shoot, I haven't thought at all about how to actually build the test harness, the one that can run everything as parallely as possible. So then it goes and starts thinking about this more. And once it does this, it comes up with a bunch of options and I can just help it rule out certain things. It's like, I want test sets that can run in parallel.

And then I was like, we can introduce a semaphore construct. And then now you can do serial. Because once you make parallel to default, you now need to give users a way to make serial possible. So I think the best construct there is a semaphore.

Dex (01:03:16.907)
Yep. Yeah. So if their test case itself isn't parallelizable, they can opt out of the auto-paralysation for certain sets. Yep.

Vaibhav (01:03:23.395)
Exactly. So then we actually started riffing on what it means to be a test runner. And we realized what it means to be a test runner is instead of just telling you what it runs, it's a function that takes in a function that produces a new function that produces a test report. So it's a little bit easier. It's a decorator. Exactly. You can think of it like a decorator. And then we started doing this. was like, this works pretty nicely. You can define a semaphore. Then you can say that these run locked. So

Dex (01:03:34.967)
Yeah.

Yeah, it's a decorator.

Vaibhav (01:03:50.491)
It's not that they're running serially, it's that they run now in order. So now we need to define a serial construct in a bit, and we'll see, we'll start coding in a second. We're almost done, we're almost caught up to where I am right now. So, but the story...

Dex (01:04:02.189)
This is good. You've done a good job of compressing four hours of thinking into a 30 minute podcast episode.

Vaibhav (01:04:07.512)
actually I did go to bed at some point. I don't know when I went to bed. Let's go see.

Dex (01:04:10.667)
Yeah, this is in the morning. Is this where your decisions start getting a lot better?

Vaibhav (01:04:15.647)
Yeah, I think so. Yeah, I think I just the last thing and I just went to bed at 11. I was like, I'm done. I'm not doing this anymore. So I woke up and I started coding again in the morning. Yeah, it this morning. I was just coding. This problem was interesting. And I was like, I just needed a new brain power to think about this. And that's when I was like, parallelism is the thing. I think there was a slack thread or something that caused me to think about this. So we started thinking about this. We started doing parallelism this time before Constraint came up.

Dex (01:04:23.041)
Yeah. This was this morning.

Nice, okay. Yeah.

Dex (01:04:39.542)
Mm-hmm.

Vaibhav (01:04:45.598)
the model produced a bunch of options. And then I actually realized the runner is the code that can run during collection. The runner code can actually run during collection. Yeah, the problem is if the runner code runs during collection, we can't actually tell you what can run in parallel. It's not information we have, because I thought what would be really nice from a CLI perspective is what if you could show in collection what is going to run when in parallel. But because it's arbitrary code, you actually can't shh.

Dex (01:05:11.751)
like to be able to kind of like parse it almost into a plan so you can present it to the user. Yeah, I like it.

Vaibhav (01:05:17.107)
Exactly. Right? But it turns out you can't do that because of arbitrary code. Once you write an arbitrary code, presenting certain things becomes impossible. So I had to tell the model that. But then I told it, basically what I was telling it was everything is basically just lambdas, even a test set. It initially said test sets, runners, are now just aggregations as well. The problem with test set runners being aggregations is a couple of things. One, it's weird that these things take in different types. That's the first thing that I noted. It's like, oh, why does this take in a function that you can avoid?

and then produce a test report. This just feels off to me. It's the best way that I would describe this. And then this takes in a type that is not the same type. So that's the first thing that I noted. And then the model is like, yep.

Dex (01:05:51.425)
Yeah. Yeah.

Dex (01:06:00.469)
Yeah, okay, instead of void, it should return the test report and then you can do, yep, that makes sense.

Vaibhav (01:06:04.453)
It's exactly, it makes more sense. Not really. That's how you should think about it.

Dex (01:06:08.459)
Yeah. And then you can wrap the thing without changing the type, and the code doesn't have to know whether it's wrapped or not.

Vaibhav (01:06:17.425)
you nailed it. Exactly. So now we basically are running this as a, now it really looks like it's like an identity decorator. It's more of how you think about it. A decorator takes into the self and produces self back out. It's not just decorators.

Dex (01:06:19.435)
Yep, cool.

Dex (01:06:28.684)
Yep.

Yeah, and that's like one of the biggest issues with Python and typed Python is once you throw a decorator on, all the types, you don't get any guarantees anymore because the decorator is, you're not gonna pass a bunch of type parameters into a decorator. Yeah.

Vaibhav (01:06:39.333)
Everything breaks. Exactly.

Vaibhav (01:06:47.092)
Exactly. So now you get this system that is able to give you this, and now you have this, so now you can produce... And you're noticing the model is doing most of the heavy lifting. Because the context is pretty good and it understands what it's trying to do, the model can roughly get far along. So then I was like, okay, this is pretty good, this all makes a lot of sense. I was like, before we go and update ticket 2, just show me the full code. I want a C code. And there's two reasons for this.

Dex (01:07:14.081)
Yep.

Vaibhav (01:07:16.639)
One is by seeing code right here, I'm heavily biasing the model towards this code sim bit when it writes a ticket. Because otherwise, it's going to invent this code sim bit and write the ticket. But also, it prevents me from writing a ticket that's bad in the first place.

Dex (01:07:32.343)
This is interesting. So you're doing a thing that is a little bit different from how I use this tool in these workflows. So you're locking up a lot of the design concept, not locking, but you're allowing a lot of the design concept to exist in the context window. Whereas when I'm using this, every single question I have is like,

update the doc and so it's like I read the doc, I write to Claude, Claude updates the doc, it's like a unidirectional flow. I think that's for me is mostly about like context anxiety is like I want to know at any given point every single thing I've said to you is tracked somewhere outside of this context window because I always treat the context window as something where like it might veer off or my session might shut down or whatever it is and I always want to be able to resume from the document.

Vaibhav (01:08:20.775)
So here's how I think about this and why I do it this way.

Dex (01:08:24.109)
Yeah.

Vaibhav (01:08:26.927)
When I model context windows, we all know models are heavily biased towards most recent instructions a lot. We know that the model is going to prefer these two texts way more than it prefers things at the top. It just will. It's not that I'm losing information, it's just that I don't really need perfect recall on this section. I'm not worried about the traditional dumb zone because what I already know...

Dex (01:08:36.236)
Yep.

Vaibhav (01:08:57.112)
is like what I know is like the most recent messages are not in the dump zone.

I know the model is going to bias towards this. Likely what the model is actually biasing towards is this plus...

Vaibhav (01:09:22.63)
like the system message. This is probably highly prioritized in some way.

Dex (01:09:22.967)
Plus the system message. Yeah.

Dex (01:09:29.005)
Yeah, these are the models of training to attend to the most recent thing. And this is what we talk about is like, they forget what's in the middle. This has been, this has been like common knowledge since the chat GPT days.

Vaibhav (01:09:31.568)
Exactly.

Vaibhav (01:09:35.323)
Yeah, but...

Exactly. like because of this, I'm not too worried about this because like, look, I'm actively engaged. Everything up here is stuff that I'm actively participating in. Whether it's serialized to disk.

Dex (01:09:47.467)
you know the last couple, all of the things that you care about are in the last couple messages and so you're not worried about being deep into the context window. Yeah.

Vaibhav (01:09:55.492)
Exactly. And then more importantly, my brain is much better at holding onto like long-term ideas and consistency for this entire conversation. So I'm not worried about it, like the model making a huge mistake because one of the models aren't that bad. They won't make huge mistakes, but details are my responsibility. So like,

Dex (01:10:14.635)
Okay, so yeah, it might forget a detail from 15 messages ago, but you know, you're confident that's locked into your head and if the model forgets it, you'll just remind it.

Vaibhav (01:10:22.802)
Or even if I, it doesn't matter if it's locked in, I'll recognize it. I, I, the burden is on me to recognize. It's kind of that deal.

Dex (01:10:29.973)
Yes. Yeah. I would rather have the guarantee that whenever I make a decision, it's locked into the dock. And basically the model can just reread the dock at any point, either in this conversation or in a new conversation and basically have all the things that are important. so I'm, yeah, go ahead.

Vaibhav (01:10:44.753)
The problem that I run into with that approach is that for really like heavy design constructs, this, hopefully everyone can tell at this point, this is a very, very heavy design construct. This is like, there's a lot of design space here, a lot of room for mistakes. If I were to serialize the disk, every single design decision, I would move at half the rate. And I want to move fast. Like it's like serializing the disk, extra tool calls, extra wait time, extra consistency the model has to maintain.

And I'm actually wasting tokens doing that. So like, that's why I don't do it for like heavy, heavy design tests.

Dex (01:11:16.023)
Cool. Yeah.

Cool, alright, let's keep going. I just wanted to like riff about that for a sec.

Vaibhav (01:11:22.81)
Okay. So now we produce runners. It produced some code for me. This looks pretty good. It's like, okay, cool, this is a test runner. It still doesn't do this for test sets, but that's okay. That's not what I'm focusing on. I want to focus on one thing at a time, because if I distract the model, it'll do things poorly. We're to focus on the test runner only. It defines what quorum looks like, and I read this code, I'm like, does this seem right? Do I like this? There's things I don't like about this, like what summary is and other things, like it seems too much magic, but...

I hand-waved that for now. I'm not thinking too hard. I am thinking about composition, because that matters to me a little bit. You can see the model almost doing thinking in its system as it's doing this. It's kind of interesting here, what it's doing over here. It's proposing different ideas for how we might want to do composition to make the user's life easier. It's like a decorator on a decorator, but with some execution logic around it.

Dex (01:12:22.422)
Okay.

Vaibhav (01:12:22.706)
So it's proposing some ideas to me, it's on my collection, I'm like, okay, well, this looks pretty good. And then I realized a problem, which is you can actually redefine how test sets run, only tests. But I can redefine how collection works. And this is just me validating the assumption the model make. Before I try and change something, it's really important for me to give the model a context around what it has baked into its design philosophy. And I want to really reinforce that. And once I've...

Dex (01:12:40.364)
Yeah.

Dex (01:12:50.945)
Mm-hmm.

Vaibhav (01:12:51.962)
reinforced it's like yes it's doing something like this and then I then I really have it trying to articulate this for me and when it tries to go articulate this the model will come up with the same hunch that it is and I realized let's just make it a lambda is the best option again and it starts proposing options then I give it everything else because it's already seated directionally where I'm going

Dex (01:12:54.753)
We need to match the same thing, yeah.

Vaibhav (01:13:17.681)
And then it now produces what I want the symmetric runner and now it has a really really nice chain and then it kind of just works along the way through and now I start talking

Dex (01:13:20.289)
Yep. Nice.

Dex (01:13:27.501)
It's so annoying that Claude couldn't come up with that the first time. That the models are just like, yeah, let's actually add more complexity. And you're like, nope, nope, narrow it down, narrow it down, make it look pretty. Yeah.

Vaibhav (01:13:36.529)
Exactly. Yeah. And again, I still haven't written to the ticket yet. So I know, Camilla, asked to see the ticket, but I haven't even written to the ticket. all in context of what I'm doing so far. And now I started going into details. Now let's talk about summary and metrics. Let's talk about all this other stuff. I to find a JSON type when I go do this. Then it produces some more data, blah, blah, blah. That's not really interesting. It updates the mental model.

update the test ticket so then it has a really quick thing and I guess it updated the ticket without me telling it to. And then think I had to go at some point. I started reading actually, it took me like 12 minutes to read the ticket. Then I told it to go read the ticket and when I read this I like I don't like the dollar signs but can you put underscores instead so it changed the name. Changed the name, changed the name. Cool and I think that's it, that's where we caught up to.

Now, while we do this, let's take a look at what the final ticket looks like. Any questions so far from folks out there about this process? We're caught up with the real time now. We're in live mode.

Dex (01:14:47.501)
Are you gonna write the code?

Vaibhav (01:14:49.458)
Yeah, we'll do it in a second. I'm just gonna do the next part of the task, is just reread this ticket to be completely honest and like make sure that this is correct.

Dex (01:14:57.569)
Yeah, this is super high leverage.

Vaibhav (01:15:03.029)
Cool. But this is my day-to-day. When I'm coding, this is exactly what I'm doing. And this is what I do whether I'm being recorded or not being recorded, or I'm on a screen. It takes a good amount of time for me to iterate. And I give myself that time, and I do a lot of long context. That's why I like longer models, because I keep everything in the context window for most of my behavior, and then I write the disk at some checkpoints, effectively.

Vaibhav (01:15:29.425)
So then I produce a ticket and then I go read this. I'm go read this really fast. I might make more mistakes when I go read this because I'm skimming rather than reading it in sequence.

Dex (01:15:41.547)
No, read it in real time,

Vaibhav (01:15:45.169)
Oh, it's going to be too slow. It's going to take 15 minutes of just silence. And we don't want that. So we'll show you guys roughly what it is. And the most important part of that over here is I'm not too worried about the syntax form. All of this makes sense. I know it's not going to change too much syntax. We've already discussed all this. What I want to go check is the execution model and what Dsugars do. And this is going be important. Cool. So I read this file. now it actually gives a file name when it does this. It makes init test four, blah, blah, takes out a registry. This function returns void.

Dex (01:15:50.293)
Okay, alright.

Vaibhav (01:16:14.927)
Redshift registered test. It actually registered this test, which is kind of nice. For the first one, we'll just translate hello. It does this, and the testing quorum gets passed in. Perfect. This works. Mike asked a question. Am I actually monitoring how much of the context window is being used throughout this process? Are you also taking compaction into account? Well, I used to. Before, when the models did not have a million contexts,

Dex (01:16:26.732)
Nice.

Vaibhav (01:16:43.41)
I would actively manually compact at certain checkpoints because I find the value of the continuous contact chain useful. But now it's a million contacts, I just let it rip until I get pretty far. I think the biggest I've hit is 800,000 tokens. And it works.

Dex (01:16:58.029)
We published a blog post with some early findings and honestly might be going back to Opus 4-5 for certain things. It actually might be interesting to have, know, Kyle's done a lot.

Dex (01:17:13.565)
to turn. It's the same model. It's not like they added more intelligence to it or more attention. They're just using things like yarn.

Vaibhav (01:17:22.481)
Yeah, as long as you're-

Dex (01:17:23.181)
We don't have to talk about that today. That's like a good other, maybe another episode.

Vaibhav (01:17:28.323)
As long as you're aware of this construct, of this is what a long context is, you can use the model well. But you have to be aware of this. And you have to make up for the lack of knowledge that the model has on old context window. It is your responsibility as the present steering to go do this.

Dex (01:17:42.805)
Okay, but also, but also, if like the middle of your context window you're just gonna pretend like it doesn't exist or it's barely gonna impact you, why not just start a new one?

Vaibhav (01:17:51.643)
convenience.

Dex (01:17:53.324)
Yeah.

Vaibhav (01:17:54.545)
It's just like convenience, to be honest. And something that doesn't impact you, it just has less influence. I think it's false to say that it won't impact you, it just impacts the current steering less than the most recent messages. It's the best way that I would use to describe it. So this looks pretty good to me in terms of what's happening. It feels like we have registration, we have all these other things working. I like the naming convention here, this looks correct.

Dex (01:18:00.076)
Yeah.

Dex (01:18:06.445)
Mhm.

Vaibhav (01:18:22.573)
It has the per package chainer where we have one global init test function that takes in a registry and passes this all in. Now it's actually really clear what you have to do. You have to construct a new registry type and then you just call init test. Now you have all the tests being collected. What's really nice about this is you only have to collect the tests that you care about. So we can pass in some special flags into here to make sure that collection doesn't run for certain things. So like this could be state the registry keeps.

Dex (01:18:29.025)
Yup.

Dex (01:18:45.089)
Right, I'm curious as like in the CLI when I actually execute testing, like what sort of filtering stuff is available to me and like we haven't touched anything on like how do I tag test to be able to slice and dice.

Vaibhav (01:18:52.602)
Yes, so

Vaibhav (01:18:57.506)
Exactly haven't touched on that at all

Dex (01:19:00.033)
But you know that this architecture is going to make it easy for you to add that feature later. And that's like one of the things you're designing for, I'm sure.

Vaibhav (01:19:07.696)
Someone asked a question like what made me switch out. Honestly, it's just one of my philosophies when I go and like code with these systems is I think the way I would say humans are lazy, coders are extremely lazy, and I am probably one of the laziest of all of them. So why do I not manually come back? It's because if I can get away without doing it, I will not do it.

My way of doing that is I just libmist test on different scenarios. So I've implemented like three or four features using this approach. And like I got great outcomes. And because I got great outcomes, have empirical evidence that I'm not being impacted by like manually controlling context. There's other reasons to manually.

Dex (01:19:51.693)
Well, it's also like the dumb zone in keeping the context window small is about optimization. And it's also like, it's a rule of thumb. When I say like, hey, try to stay under a hundred thousand tokens. That's really like, if you don't know what you're doing and you have no intuition, like that's all you can go off of. But obviously for certain tasks, you can go up to 800,000.

Vaibhav (01:20:00.336)
Yeah, exactly.

It's a great rule of thumb.

Dex (01:20:12.855)
for certain tasks, can, you actually only want to stay below like 50,000 tokens because it really requires a ton of reasoning and thought. I don't know what that would be, but like it is a guideline, not a rule. And there's like, you know, there's a lot of nuance here of like, yeah.

Vaibhav (01:20:13.262)
Yeah, but you gotta be...

Vaibhav (01:20:25.486)
Also, it's correlated with the amount of effort that you want to put in at the time. If you want to be highly engaged in the process, go further. If you want to be highly disengaged to background text, you probably don't want to go as far. Because it just like let the model make... If you want the model to make less mistakes, stay small in context. For the model to make more... If you want to be lazy, use bigger context. But then you have to make up for the laziness in some other ways.

Dex (01:20:32.065)
That's right.

Dex (01:20:49.005)
Well, it's... Yeah, have to basically, it's like, in every message you send, you're gonna make sure that all of the last three messages continue to get kind of like repropagated. The things you care about are gonna get reiterated by the model so it stays in the recent context. Cool.

Vaibhav (01:21:04.898)
Exactly. So at this point, I'm very happy with what this does. It produced everything up to this point. Now we have the next part that we're going look at, which is old style migration. So we use some old tests in Babel that look like this. And we're like, how do you migrate this? Well, this is desugars directly. It's kind of nice. You don't have to think about it. It just works. Like there's nothing special here. And then arg names just get dropped.

Dex (01:21:18.987)
Yep.

Dex (01:21:26.827)
And this emits all of the things already that you would need to power something like the VS Code extension and things like that. Like everything's still being emitted by the telemetry layer.

Vaibhav (01:21:38.512)
Kind of, but again, we're not talking about that right now. One of the most important things that I found to be useful when I do a genetic system is work on the layer that is the most foundational. First, get that working. Keep that extra context of like, got to make the CLI work. We got to make the VS code extension work. We to all this stuff in your brain. Be aware of it. Steer the distance.

Dex (01:21:43.094)
Okay, okay.

Dex (01:21:50.817)
Yep. Yep.

Dex (01:21:58.477)
Yeah, but don't force the model to design all of that. This is what we call vertical slices or like tracer bullets. It's like get the foundation there, make it work end to end, and then you can add more functionality in versus trying to design the entire thing up front.

Vaibhav (01:22:03.148)
It will.

Vaibhav (01:22:13.104)
Exactly. And now the ticket starts talking. So at this point, the ticket has talked about desugaring. So we talked about desugaring. Now the ticket is talking about what does this mean for the language. For the language, we have to introduce a keyword. have to introduce test set and width. We already have test as a keyword, so it's slightly different. So doesn't need to introduce that. And then it says, okay, we have to delete the assert keyword. We don't have assert keywords anymore because the assert keyword is just a package. It's not a keyword anymore. And then...

Dex (01:22:40.748)
soon.

Vaibhav (01:22:41.553)
we introduce some new standard library packages. The standard library package introduces a testing package and the testing package is described as such. I'm not going read this really fast, I'll read it in a second. Then we describe the runners and what they actually describe. They're just type aliases that point to that are lambdas.

We defined a JSON type in the BAML standard library, which is just described like this. Just helpful. We should go do that. It's nice.

Then we do report types, where we define all the report types are. And then I need to go think about this. I haven't thought about this enough yet. We need to go think about this. don't like unknown here. We gotta go flush this out in a second. As I'm skimming this, I'm reading this in real time with everyone right here. So I'm just flagging for certain things. I'm like, see unknowns. Don't really like that. Don't like some of this stuff. We'll to get around this.

We have a Semaphore type. Now this is a pretty advanced, so probably just gonna wait on this and not think too hard about this right now. Because Semaphores require release constructs and other things that we have to go deal with, garbage collection. We need to defer semantics on Semaphores. So I'm likely gonna tell the model Semaphore is like an additive thing. So I'll just tell the model here.

Dex (01:23:47.277)
Mm-hmm.

Dex (01:24:04.685)
Sim four out of scope.

Vaibhav (01:24:06.562)
is a feature thing we do because to invent it we need to add defer slash instructor semantics and those.

Vaibhav (01:24:24.528)
So I'll just let it know that. So it can kind of know that we might want it, but not that we'll implement it right away. And then it just tries to tell me like, lock semaphores. Yeah, so we're just not going to do like semaphores and stuff for now. It's just too complicated because I don't want to think about differ. And like, that's a whole depth I have to go, we have to go right, like Leiclerc has to go right to go solve some of this problem.

Dex (01:24:44.737)
Differ, you mean like the defer keyword in Go, where you can basically say, before this block exits, run this function.

Vaibhav (01:24:52.984)
Yeah, like Go does that really, really, really well. I really like that. It's like, on return run defer.

Dex (01:24:56.149)
Yep.

Yep. On or panic.

Vaibhav (01:25:05.191)
Yeah, panic is bad. I have a panic alert, that's separate. So that's about more test set runners. I look at all these. All paths is kind of interesting. think all paths seems like kind of redundant. But that should be the default behavior is the way I described it. So there's no reason to have an explicit all paths. So let's comment that in.

Dex (01:25:26.593)
Mhm.

Vaibhav (01:25:29.419)
All pass seems like a default behavior in test sets. I don't know why I would ever create this.

Vaibhav (01:25:37.871)
I'll send this as soon as it's done.

Vaibhav (01:25:42.924)
It's going take a while. So I'll go read this. Quorum to regular BAML functions. people can run their own. Think about this. Scheduling.

Vaibhav (01:25:59.415)
is handled by sharing.

Vaibhav (01:26:10.671)
Now I'm going go read this. This is probably the most tricky part, which is I have to read how our execution model will work.

registry.

Cool, now we have a collection. Once you've done a collection, then you to go ahead and... for each leaf...

Vaibhav (01:26:33.903)
at test.org.

Vaibhav (01:26:47.898)
This looks correct. As far as I can tell, this looks pretty good. Spawn all children awake. Yep.

Dex (01:26:50.155)
Okay.

Vaibhav (01:27:08.281)
Cool, yeah, this looks pretty good. We're gonna go run this and then go do this. I think this will work. And then this is very recursive, this is kind of defined nicely. This is the only special thing that has to be kind of built in, which is fine.

Vaibhav (01:27:27.373)
Yeah, we can just do a very, very simple thing.

Over here

Check Package along the way, soft asserts.

Dex (01:27:43.127)
So they just output metric results.

Vaibhav (01:27:46.905)
Yeah. The problem is that I don't really want to think about how metric results are going to be aggregated yet, because if I think about this right now, have to think about how aggregations happen. For example, asserts are very obvious when they happen. When you have an assert, it raises an assertion error. When you run a check, and you can write this in any arbitrary code anywhere, when you run a check, the question you have to ask is, what happens if a user writes a check statement in a...

Dex (01:27:55.223)
Yeah.

Vaibhav (01:28:16.481)
in an arbitrary function. What does that mean? What does that actually do? So that's kind of soft. what I'm going to do is assert package is in the clear.

Vaibhav (01:28:40.057)
feature work.

Vaibhav (01:28:56.814)
What that means.

Vaibhav (01:29:07.526)
Okay, So, Maul is going to go do this and then he'll just let us know how to go do this, where it's like serialization is feature work. Don't want to think about this. Every test will run in parallel for now. And then also, we need to go deal with the assert package and check, where check is marked as feature work.

Dex (01:29:30.103)
Okay.

Vaibhav (01:29:31.49)
Okay, I honestly think this ticket is pretty good as is. There's a few other concerns I have, which are mostly around like, this unknown stuff feels wrong. I gotta think about this. But, good.

Dex (01:29:35.297)
Let's ship it, dude. Let's go.

Dex (01:29:47.511)
So how about you just remove the things that you're unsure about so they don't come into the model as like pre-banked decisions, just be like, remove that section, and then it'll come up in the design discussion and you can iterate.

This is something I do all the time. I'd rather not have a bad, if I'm not sure about how to do something, this is also how we take a two sentence thing and turn it into a big design discussion. If I'm not sure about the implementation or how I want it to look, it's like, cool, go get a bunch of code-based patterns, go get a bunch of code-based context, and then I'll have a much more grounded discussion later with all the patterns available.

Vaibhav (01:30:02.796)
I, yeah, exactly. But.

Vaibhav (01:30:24.142)
In this case, I can't really do that because this is all novel stuff we're adding and there's no patterns for it to copy. Like I just have to model what like, what does a run report do in an app? It has an outcome. And that's like pass, fail, error, duration, milliseconds. That's reasonable. It has metrics, which are going to be metric result. We'll look at in a second. I have no idea what output means here. Um, like, so what I'm actually going to tell it is when I go look at all the data structures that it added, it added a lot of unknowns.

Dex (01:30:37.089)
Yep. Yep.

Vaibhav (01:30:52.515)
help me understand the unknowns.

Dex (01:30:58.283)
Yep, that's what it is. Yeah. Give me, lay everything out on the table so I can remix things, take things out before we go actually write code. And then we're kind of like down a path that's harder to steer off of.

Vaibhav (01:31:19.758)
Okay, cool. And I think this is the last part. And once this works, what we can do is we can actually take this whole ticket and then just go wild and then let it go through. And we'll do another round of design discussions, but often what I find is the second design discussion is so pure and so clean that I don't even have to think about it.

Dex (01:31:39.905)
You just take all the recommendations and rip through.

Vaibhav (01:31:43.412)
It mostly just gets me all the way there. And I'll run this in a second. I also do a lot of things to where I let the model just run stuff in parallel and I just waste tokens in favor of speed ups. So like, for example,

Dex (01:31:46.156)
Thanks.

Dex (01:31:57.163)
Yeah, well it's not waste tokens, just like there's a chance it might be wrong and if the... This is good.

Vaibhav (01:32:03.95)
This is great. Nice. So like for example, like let's say I'm in the design phase and it produced a final document and I'm like, I'm pretty sure it's correct, but it's not a guarantee yet. What I will do is I will actually kick off the next phase of like outlining and creating a plan right here. And I'll just let it kick off. And then by the time I go ahead.

Dex (01:32:24.941)
Should we, by the way, should we give people a little intermission? I personally gotta go run into a bio break. If we're gonna keep shipping, let's do it. All right, we'll be back in a couple minutes, Folks, friends.

Vaibhav (01:32:32.142)
Let's do it.

Vaibhav (01:32:38.156)
If you have questions, feel free to drop them. I'll probably sit around and read this a little bit more. How do you collect the learnings from these runs? What's a feedback loop post shipping its outcome? What do you mean by that, buddy?

Vaibhav (01:32:54.516)
What do mean by learning from these runs?

Vaibhav (01:33:09.166)
think what if, let me read this response while you reply back. Let's read all of this. So what unknowns did it add? It basically read it as reading none of the unknowns. That's freaking great. Let's get rid of the unknowns and produce a very small thing. When it read the unknowns, it went through, produced strings, lot of blood, is great. Extra child report, and this is great. I think this is phenomenal.

This just tells us where this is. Pass, fail, error.

and it's not dropped entirely.

Perfect.

Vaibhav (01:33:51.886)
Great.

Vaibhav (01:34:06.818)
Let's go do that. This can be computed.

Vaibhav (01:34:18.454)
And then we'll do a couple more changes real fast while this executes. We have the real types.

Vaibhav (01:34:27.47)
The train goes to pass fail.

there.

Vaibhav (01:34:46.19)
The question you asked was how do I take the learnings from these runs and how do I use it to measure things? I'm going to mute that,

Dex (01:34:49.439)
I'm back.

Vaibhav (01:34:56.373)
there you go. Yeah, the question that you had was how do I take learning from these runs and then how do I use that to measure feedback based on what it's good or bad? Might want to read to back to how the communication went and see how to improve. I think that's just like a macro level thing that you think about as an engineer generally. It's like if you've ever worked on a team, it's useful to just read your code and say, as I read this code, do I have people that are like...

I'm to describe it. Like how often, how many comments do I get on my code reviews? How fast am I shipping? How many bugs do I have post shipping? It's like a macro level thing. It's not a thing that I really do actively where I go and like read the, where I go reread the context window. I try and just be really deliberate as I read the context window and I just like have a proxy of like, am I shipping or not shipping? If I am, if I'm, if I'm landing things into main, I'm likely doing okay.

And then the next thing I look at is how big are the size of tasks I'm able to land, how fast am I able to land them in. And I just measure those two quality metrics and that gives me really good idea of what's working.

Vaibhav (01:36:11.949)
along the way. Cool. We have literal types. then rate is confused, and then we can remove pass rate. Perfect. I think this is perfect, and then I think the last thing here is we're done. So let's go and update this. I really shouldn't use a model to update this. I should have just done this by hand. But the only reason I use a model to say that we have literal types instead of having its string, but have it be like one of these three types, is because I just don't want the model

Dex (01:36:38.871)
Yep.

Vaibhav (01:36:42.478)
to go understand this really fast. In cases like three references in the codebase that I perhaps missed while scanning this, I would just not want to think about this.

Dex (01:36:55.809)
This is it, yeah, as if you changed it in one place because you saw it but you didn't see some other thing downstream. Like the model's much more likely to actually change it in every place that matters. Yeah, see? There you go.

Vaibhav (01:37:00.48)
Exactly.

Vaibhav (01:37:04.201)
Yeah. And like, see what it did over here. It actually, exactly. It just did a better thing than what I would have done. and it did that a nicer way instead of duplicating this. Justin asked a question, would you sort traces logs tied to session IDs and the PR so you have a finer detail of the replay to analyze failure state? Not really. the reason that I wouldn't do that is because like, once you've checked in this code, the code has now become the source of truth. If you have bugs, you just iterate from that code.

If this code is so bad that you can't recover from it, then you would like, then what I would do is I would just roll back that code and do it from scratch again. Like you just got to pick one or two things in that dimension, but I wouldn't really store the logs.

for this kind of thing.

Dex (01:37:50.093)
I will say during code review, I'm gonna steal a screen share for like one sec. We did add...

Vaibhav (01:37:55.437)
Oh, I can show you the code review really fast. It's freaking great. I know what you're going to show. Let me show you a real practical example of that. Oh, it's even better than that. I think you guys did this phenomenal. So as a part of building testing, one of the things we realized we needed was closures because everything that you saw was implemented using closures. So when I was implementing closures, I was actually able to just show you what closures look like.

Dex (01:38:00.557)
They'll link to the task or whatever.

Vaibhav (01:38:22.761)
And Closures did this entire process in the exact same way. I did the exact same process I showed everyone on the call really fast. And part of that...

Dex (01:38:31.428)
you don't have the task thing.

Vaibhav (01:38:35.316)
I do, I do. It's just that this one doesn't have it. It's because it was updated. It does put a link to the cloud version of the ticket. Okay. I think I have it on different PR if you want to see it. Yeah.

Dex (01:38:42.155)
Here, I'll show you. Let me show my screen. I'll show you. So what we get here is...

Dex (01:38:54.509)
we're writing commenting on.

Vaibhav (01:39:03.277)
you

Dex (01:39:06.455)
So I can come to this pull request and we have a couple different links that get added to the top. So you have the artifacts, which is just the list of.

of the artifacts for this task, which in this case there are a lot. It includes screenshots and stuff like that. But we also have a link to the task. So this is a deep link into the Riptide app that actually opens up and like you can come in and see, okay, cool. Here's all the things that Kyle did to implement this. And so obviously like I'm not going to come here and read every single one of these sessions, but you get where I'm going with this. That was the thing I wanted to show off is like you can, yeah.

Vaibhav (01:39:18.338)
Nah.

Vaibhav (01:39:40.321)
Yeah, it might be useful to build an AI chat that can ask people questions about the implementation without asking them directly. Anyway, so now we have this ticket. Let's do the next part. whoops.

Dex (01:39:48.971)
Yeah, yeah. Cool, all right. You gotta show your screen again. I stole it.

Vaibhav (01:40:04.565)
Now this is the best part. All you do is you hit copy, you copy the content of this file, you make a new task, you paste this into there, and you just don't think. It's great. And you just auto-advance everything through. And that's it. That's the process. Literally the process is...

Dex (01:40:24.321)
Did you do the other auto-advance? Are you just auto-advancing through to design?

Vaibhav (01:40:28.277)
Yeah, and actually I want to disable this one and you'll see why in a second. While this happens, it's just going to go through and produce the code.

Dex (01:40:40.491)
You have an update to install, by the way.

Vaibhav (01:40:40.653)
Yeah, that's not happening right now. This code's And debug that level. But what I don't do is measure the high level metrics and iterate. Just wondering how far we need to go down the context window for decks to be happy. Oh, that's funny. Yeah, I think for the context windows, you you don't have to decide what you're okay with and what you're not okay with. And like how much effort you want to put in. For some tasks, I do the same as decks, and I stay very far out of the dump zone. But for a lot of tasks, I...

Like the bigger tap, I just let it rip and it works for me at least.

Dex (01:41:15.853)
Yeah, think it's like, I think Craig, no, Chris on Twitter said this really well, which is basically like, if you want to read a bunch of documents and summarize them or write a new document, it can be, you're totally fine at 120 or 220 or 320k tokens. It's if you want to do like multi-turn tool calling and like.

run the test and then fix something and then run the test again and have that like feedback loop kind of thing. I think that's where you see the model starts to like basically have a like a spin out crisis.

Vaibhav (01:41:49.098)
The trick really, Dexter, is just make no mistakes. No joking. But it requires...

Dex (01:41:54.391)
That's true, we gotta type make no mistakes, ultra think.

Vaibhav (01:41:58.796)
Exactly, then you're good. I don't know why all these noobs don't do that. But yeah, I think the real problem is just the more open your design doc is, the more assumptions the model will make, and then the more assumptions it makes, the more mistakes it make in implementation because it's inconsistent in its implementation, and your tests will break, and then you end up calling a lot of tool calls redundantly.

Vaibhav (01:42:27.734)
So that's kind of the premise, right? There it is. And whereas if we do the level of design that we did here, where we literally spent hours writing that first bet that we shared, then we spent literal hours, like five hours of time producing ticket two. And that's purely to just take that ticket and make a better ticket.

Dex (01:42:28.086)
I follow.

Dex (01:42:52.269)
And then you're gonna ship two weeks worth of like, if you were tab tab tabbing in cursor, it would have been a week or two of work. In, you know.

Vaibhav (01:42:57.964)
Oh, well, I haven't tabbed in so long. I don't type code anymore. I'm too lazy for that. Typing code is 2... That's 2-2024.

Dex (01:43:06.976)
do that for me.

Dex (01:43:10.997)
I can't wait to get codecs in here too. We're really interested to see how this workflow works with codecs and if that can push the frontier even more.

Vaibhav (01:43:21.236)
Yeah, I like maybe I think the models roughly work in the same way. I think it's like, the difference for me is not really how good the models get. The difference for me is like how big of a task I'm pushing through to the model and in the same unit of time. Like this testing thing closures, I would, there's no way I could have input in closures in less than a week and a half without actually thinking about it. I'll show you why actually I actually have the closure tasks. can show you.

Vaibhav (01:43:50.656)
Like, while this is running, somewhere in here. I wish I had search texture, please give me search.

Dex (01:43:53.591)
You gotta go to archive tasks, not archive sessions. This is sessions. Command K, archive tasks.

There you go.

Vaibhav (01:44:04.844)
water closures. There's like a couple.

Dex (01:44:06.829)
down two more.

Vaibhav (01:44:10.956)
I did a lot of closure work. We'll see which one it is on this one. my god.

Dex (01:44:17.119)
Yeah, sorry, that's a bug. Yeah, find the one with lots of sessions in it, right?

Vaibhav (01:44:22.39)
Okay.

No, because lots of sessions will... Yeah, so one of the things I actually... Nope, this is not it. This is the implementation.

Dex (01:44:29.665)
Yeah, lambda expression, okay.

Vaibhav (01:44:40.012)
This is the one with the fat. I it's gonna be this one. Yeah, one of the things, nope, not this one either.

Okay, we're gonna open the cloud because I cannot do this. I'm sorry. I'm dying. I'm dying. The back is killing me.

Dex (01:44:54.965)
Watch your users, use your software. That's my advice. We're gonna fix this.

Vaibhav (01:45:11.565)
And I want to show the amount of detail that I go into why these models are so powerful. How do I see archive tasks?

Vaibhav (01:45:22.262)
How does the archive task in here, Dexter?

Dex (01:45:23.649)
don't know if you can see those in the cloud. You might be better off just popping to the archive task list and unarchiving a bunch of them and then navigate.

Vaibhav (01:45:26.368)
my god.

Vaibhav (01:45:34.604)
Kill me now.

Dex (01:45:34.989)
just use E.

Vaibhav (01:45:38.589)
No, because that's going to pollute my context window.

Dex (01:45:39.703)
Can you use up and down or J and K to navigate this?

Vaibhav (01:45:43.284)
work.

Maybe it's this one.

Dex (01:45:48.759)
Damn, that's so annoying. All right, we're gonna fix that.

Vaibhav (01:45:52.3)
I can't even find the right task. Okay, I'll just unarchive this. You win.

Dex (01:46:03.915)
Yeah, maybe download the update. No, I'm just kidding. We haven't fixed that.

Vaibhav (01:46:09.084)
Anyway, one of the things that I do when I go implement stuff is I actually have a checkout of most programming languages ripped off in my own repo.

Dex (01:46:21.805)
Yep. Oh, so you're just like, tell me how Go handles this.

Vaibhav (01:46:26.844)
Literally what I do. I literally have to go research and produce documents like how does Go handle this? does XYZ handle this? How does Python handles? How does TypeScript handle this? And I had to go research like how closures work in every single language. Because I just couldn't have possibly made a good design decision without that context. And like this is where the model speed up comes up in. So like a lot of times before we often would make execution trade-offs and shortcuts because like it's not possible to make the right decision. But now you can literally just

Dex (01:46:45.324)
Yep.

Dex (01:46:55.095)
Yep.

Vaibhav (01:46:56.743)
make the right decision every single time without having to think about it. I think that's the real value prop here of what these models actually enable.

Dex (01:47:04.215)
Yep.

Vaibhav (01:47:08.733)
I've just made some progress. It's so slow, I hate waiting for this step. But it is a very useful step, so I'd let it go.

yeah, what's new with you? I have none. It's cause the-

Dex (01:47:19.927)
Why is this taking so long? Wait, what is it doing? It's just doing research. We are actually building evals to make research faster.

Vaibhav (01:47:27.995)
well I can help you with that. You see these new tests? You can literally just write some tests and then make your life way easier. You can add a metric.

Dex (01:47:37.441)
Well, so we're doing evals on coding agents. But I, yeah, go ahead.

Vaibhav (01:47:42.119)
It's the same thing. You just build a metric of how fast does the research step take. You just build a latency metric on top of it. And now you can simply go ahead and just build a test set of a bunch of different scenarios. Like long tickets, short tickets, code bases of different kinds. And then just now you have a metric. And you can go optimize whatever implementation you want.

Dex (01:48:04.525)
Amazing. so you're building a, like the vision for this is like a toolkit for building generic evals.

Vaibhav (01:48:13.353)
Yeah, that's exactly it, because you can write arbitrary code.

Dex (01:48:16.535)
Can you call my typescript from inside a test function? Do you have bi-directional bindings or do I have to write it in BAML? Amazing. Amazing.

Vaibhav (01:48:23.635)
Yes, Yes, sir, we have lambdas. So one of the things I'm designing, I have a separate thread for this, is how to bind lambdas across languages. So once you bind lambdas across languages, then you can call a texture function and just run it inside of a BAML code base.

Dex (01:48:40.389)
Interesting. Okay, yeah, because that TypeScript function would be literally like taking a coding agent SDK and like running it on like a long horizon, like do an entire research task and then come back and give me the like, basically do like a JEPA style thing where you give the model the ability to change not just the prompt, but also like.

Okay, we're going to use like this, there are like six prompts, right? Cause there's each sub agent prompt. There's each sub agents model. it's almost like more to where have you played with auto research yet?

Vaibhav (01:49:04.192)
Mm-hmm.

Vaibhav (01:49:11.123)
I haven't yet. I think for me, those harnesses are kind of interesting. But I sadly don't have the time. I think too much about the substrate layer. For me, the substrate layer is much more interesting.

Dex (01:49:20.055)
Well, thing with auto research doesn't work well unless you have a good way to collect metrics and signal about how things are performing. And so I think this would actually work really well with auto research once it's shipped.

Vaibhav (01:49:33.865)
Yeah, I have really, really high confidence that this will ship by end of day today. There's a whole nother process that happens after this is implemented, which is then our auto reviewer CodeRabbit complained about a bunch of stuff. And then I'm like, I should have a phase in our con bottom board called CodeRabbit, where it's merely just a task where we wait and go check it out, because it's so slow.

Dex (01:49:57.176)
wait for CodeRabbit to do its thing, and then do you actually read the CodeRabbit results or do you just pass them all back to Claw?

Vaibhav (01:50:03.379)
I actually have Claude go and summarize them for me because CodeRabbit's not, again, it's like...

just depends on how much of the automatic stuff you want. Like the more automatic stuff, if you spend so much love and care into making your design discussion good, cause you're shipping like 25,000 lines of code. Well then, and then you just suddenly slop it all away. Cause Coderavid gave you like 50 comments. It's just, you're just adding, that's pure slop at that point. And like you're adding slop at the final layer. So it's like, you just got to read and decide how much slop you want. Cause like a model's incentive is to like,

Dex (01:50:21.58)
Yup.

Dex (01:50:27.457)
Yep.

Vaibhav (01:50:38.889)
It's always going to come up with something. Exactly. It's always going to come up with something.

Dex (01:50:39.159)
generate more tokens. Yeah, and it's very steered. I was posting about this. It was like the idea of just like, yeah, if you ask a model if the code is good, then the model will be like, yeah, it's great, it's comprehensive, it's got unit tests, everything's working. And if you ask the model, hey, is this code bad? Like tell me what's wrong with it, it will find a bunch of like bad patterns or bad architecture. And like, it's just gonna go out of its way to tell you what it thinks you wanna hear, which makes it completely useless for like deterministically evaluating if something is good or not.

Vaibhav (01:50:51.317)
Yeah. There you are.

Vaibhav (01:51:00.296)
Exactly.

Dex (01:51:08.823)
And so the thing that we talked about, like in the JP Morgan emails episode that we did like six, seven, maybe nine months ago, it might've been a year ago at this point, but it was like, you do a bunch of Boolean classifiers on the thing you're evaluating and then you use deterministic code to attach those to value good or bad. The model is just saying like, is it X? Does it do Y? And then you build those up in code world about like, okay, like here's the actual score based on all those flags.

Vaibhav (01:51:09.054)
Yeah.

Vaibhav (01:51:38.714)
Exactly. I think that is... I think I found something, by the way. I think I know which one this is. Yes.

Dex (01:51:44.525)
you got it?

Unarchive that bad boy. Before it's too late.

Vaibhav (01:51:51.242)
No, it's not this one. It's the other one right above it. I was looking and I was like, ah.

Dex (01:51:56.479)
Alright, I'm kicking off this task right now.

Vaibhav (01:52:00.97)
Lambda closure. Thank you.

research questions. I wish I could... wait, I'm dumb. I can just list out all the files in my directory and I know exactly which one is going to be in.

Dex (01:52:16.781)
Command J.

Dex (01:52:21.005)
You know we have a terminal on the task screen, you can just hit command J.

Vaibhav (01:52:25.055)
yeah, you do have that.

Dex (01:52:27.469)
Tasks, slash tasks.

Vaibhav (01:52:36.81)
I think he's it. wait, can I just do like, I don't really know how to use terminal to be completely honest.

Dex (01:52:41.085)
LS-R LS-R

Vaibhav (01:52:45.354)
There you go. Yeah, I kind of struggle with terminal now because... What are you telling?

Dex (01:52:55.821)
There you go.

Vaibhav (01:52:57.514)
Let's see if one of these have it. Or it's been removed. I have one of

Dex (01:53:00.914)
no, "-r is actually reverse, sorry. That was right though, that was good.

Vaibhav (01:53:08.434)
Our NADs look like research, or like research from other languages.

Nope, not this one.

Dex (01:53:18.317)
Do you could do like head-n 30?

Dex (01:53:34.2)
yes.

Vaibhav (01:53:40.422)
Aha! I found it. This is what I wanted.

Vaibhav (01:53:49.31)
What is this task? Okay, we can just open this file. I don't really know what this task is. I'm going make my life easier so can find this much more easily.

Dex (01:53:56.993)
Yeah, yep, we're gonna add search.

Vaibhav (01:54:01.162)
So I did a lot of work here to actually go find exactly how the filters are represented. I had the repos and I just made a go research through it. And like, just, I don't have to think about this. So like if you're implementing something and you know you have other language, like things that are like baseline research for like the standard way that stuff is done. In our case, like we're building a language. There's a lot of prior art that's already discovered. Everyone should have one of these downloaded because otherwise you can't possibly go ahead and like, you can't rely on web search to find this information.

when you can just find stuff in the code itself, and it does a really good job of doing that. I also prompt it to go search for the web as well, because sometimes the web is a shortcut to understanding how code actually works. And then the other thing I do is I actually read this and make sure it's sound. It's very easy for me to check if something is sound or not, because you can just double-check as a software engineer if something makes sense. You don't have to check if it's correct.

you're checking your soundness because correctness requires too much work. I don't need to be a primary source reference for every single thing out there. That's too much, way too much engagement.

Dex (01:55:04.511)
Mm-hmm. Yeah, that makes sense.

Vaibhav (01:55:08.902)
my god, that's so slow. Okay, finally. Let's produce the research questions.

Vaibhav (01:55:17.254)
Normally when I do this, actually run like two tests in parallel because that's what allows me to actually make progress because if I only do one thing, then it's kind of boring because of things like this. Like this thing has been running for like 15 minutes now. it's so long. Yeah.

Dex (01:55:25.068)
Yeah.

Dex (01:55:28.941)
it really? Yeah, you have a big code base. This is why we need to get faster research. There's a lot of people building specialized models for fast code search now. And I actually think being able to parse out the entire call graph and iterate through there is a really interesting problem that we're exploring as far as just custom tools that integrate with the LSP.

Vaibhav (01:55:50.09)
Yeah, this will take some time. This will probably take another 10 minutes. This is also why I League games in the middle, because like if I take a

Dex (01:55:51.885)
So this is gonna go to the research again. There's kind of a, there's a trade off here between like, okay, we're gonna spend time doing, making sure that this context window is fully objective. And it does involve like doing multiple passes over the same code. But the benefit is that you get research without opinions.

Vaibhav (01:56:09.299)
The thing is...

To be really candid, I think it's actually not bad that it's slow. I don't really care. I just have a different workflow now. Instead of like letting things happen sincerely, like this whole task from like ticket to like research or like design discussion takes like 15, 20 minutes, maybe 30. I don't care. I just switch tasks and I go do something else. Yeah.

Dex (01:56:18.082)
Yeah.

Dex (01:56:29.025)
You go to everyone. Yeah. And it's like, this is what I found is like, you can paralyze two hard tasks at a time. If it's, if it's more than two, then it's like your, your attention may fall off. mean, it depends on how, how, how long your, your gap is, but yeah, I find that it's really valuable to have one primary task and then one or two secondary tasks. The only thing that I think is, is required to do this well is that you need to ensure that, how do I say this?

Vaibhav (01:56:35.284)
Easy.

Dex (01:56:59.051)
You need to make sure that you have a number one priority and it's not like, we're gonna bring these both along and like keep them up to like, keep them like tied with each other. It's like when the primary task is unblocked, I go back to it. Even if I'm in the middle of something on the secondary task. This is how I think about it. Because otherwise you end up with more work in progress instead of just like the thing that is the most important is always getting the most attention because we want to optimize for like the lead time total for a task. I'd rather ship.

Vaibhav (01:57:13.094)
Interesting. That's interesting. just...

Dex (01:57:27.549)
one thing in three days and the second thing in five days, then ship two things in like four days. I mean, obviously like it ends up being about the same and actually like you finish them both, but it's like, if you want to optimize for like delivering shipped code to your code base, the cycle time on an individual task is super, super important and high leverage. And this comes from like factory, like production line theory, not from, this isn't even a software.

Vaibhav (01:57:56.202)
That's actually interesting. I haven't thought about that way. I...

I usually just go with the flow to be honest. Which maybe is why I'm not shi- Well, I may not be- I may not be sh- No.

Dex (01:58:06.475)
That's fine, well you are a super genius so you get to bend the rules including around the dumb zone and things like that.

Vaibhav (01:58:14.11)
Well, the thing you framed is actually really interesting. actually don't need to, I think I would ship faster if I did it that way. Or if I have a primary task. So I think I'm going to try switching to that approach.

Dex (01:58:23.725)
You should try that. You should also read, I'll get you a copy of the book called, do you ever read The Goal?

Vaibhav (01:58:29.7)
No, what's it about?

Dex (01:58:31.477)
Okay, so the goal was this book that came out in like the 70s. And it was basically, it was a book about a guy who had gone to Japan and seen how Toyota did lean Kanban style stuff. And it's a fiction book, it's a little silly, it's like a guy, he has to save the factory and there's all this random drama storytelling stuff. But basically what they came out with was like, the insight is that in the 60s, 70s, they had all these MBAs.

Vaibhav (01:58:44.916)
Mm-hmm.

Dex (01:59:00.909)
and it would bring people into a factory and your job was to like optimize one station. So it's like this machine in the whole, let's say there's 50 stations, 50 things that have to happen to produce a car engine or like some physical part. And each person would come in and optimize their one station and no one was looking at like the end to end flow. And it's actually like the more you optimize a station that is not the bottleneck, the less efficient the overall system becomes because you have like

The more work in progress that is piling up, if this system is cranking out parts and the thing after it is slow, it doesn't matter how efficient this thing is because whatever the slowest thing in the workflow is, that is your constraint. And you should always be like optimizing for the end to end flow rather than any one particular step. Just find the step that is the bottleneck because the more inventory you accumulate in factory, it's like parts that cost money. And in code it's like

tickets sitting in progress or tickets sitting in review or whatever it is. And so it's like, this is like the original like scrum agile, whatever it was like start work from right to left, right? Take the thing that is almost done and everybody focuses on fixing that. And then you move to the left and then you move to the left. And so it's like, you're always want to finish work in progress and you always want to optimize for like, what is the slowest part of this pipeline?

Vaibhav (02:00:09.979)
And finish it. Yeah.

Vaibhav (02:00:18.473)
I agree.

Vaibhav (02:00:21.865)
I agree. It's very hard to do on software. It's hard to measure what's working in progress, but that is the right model. 100%. Yeah, I'm going to try that. I think having a good primary is really nice. I don't think I do that actively. Maybe subconsciously, but I don't do it close. I try and basically just, if I'm working on something, I just take it to a checkpoint, then I do the next thing, take it to a checkpoint. I just keep swapping checkpoints.

Dex (02:00:29.099)
Yeah.

Dex (02:00:47.371)
Yeah, and so there's the idea of like, okay, let's move these tickets along in parallel and that's what people think is paralyzation. But really it's like, when everything is further along, that gets your attention, even if the other one falls behind.

Vaibhav (02:00:57.233)
Yeah, yeah exactly. That's interesting. That's going change my way of parallelization now.

Dex (02:01:01.633)
Yeah. I remember that was like, I was like two years into my, or like a year into my software engineering career. And I was like at a one-on-one with my boss, amazing dude. And he, I was basically like, I'm really frustrated because like we had this issue where like we had a lot of regressions on the front end and it was like, kept slowing things down. or it like, felt inefficient. And he was like, look, you need to understand that there are inefficiencies that are not bottlenecks. And I don't care if you're at a thousand person enterprise or a two person startup.

If you are optimizing inefficiencies that are not bottlenecks, you are wasting time and you are adding no value.

Vaibhav (02:01:37.169)
That's funny. I agree. mean, yeah, it makes sense. That's a very, very interesting way to frame it, I like that.

Dex (02:01:44.973)
Yeah, that's good. I will find you a copy of this silly old book from the 70s. The craziest thing about that book is like here we are on a podcast like doing thought leadership or whatever you want to fucking call it. Just riffing and vibing. Yeah. The craziest thing about that book is it's famous. They've sold 10 million copies. I was talking to one of the original founders of Chef and he said, know, well, you know, the book was actually written to sell the software. And I was like, what? I was like,

Vaibhav (02:01:55.657)
Yeah, I'm just coding.

Dex (02:02:13.963)
Yeah, I was like, what software? He's like, exactly. You could write a book or a piece of content that changes the way the world thinks about a problem and nobody knows that it was actually like you were trying to sell some like, know, COBOL supply chain optimization software. Like that part died. The commercial thing died. The thing that lived on was like the idea.

Vaibhav (02:02:36.189)
the book. Well, that's why you got to, you know why they messed up. They should have just led the book with here's a software we're selling and why. They just forgot that hook at the beginning.

Dex (02:02:47.489)
Yeah, well they were on the, what was it, the sell the problem kind of thing.

Vaibhav (02:02:51.529)
Exactly. That's the hard part about solving the problem. If you solve the problem, then it's time out. You gotta solve the thing at the same time. That's part of why we invented this testing thing. think most people have probably never... We've done a lot of episodes about evals. I've seen a lot of code bases that have done evals, but...

Vaibhav (02:03:12.368)
mom and salad rock can't show that one. Let me put it back. I have it.

Dex (02:03:14.889)
I can send it again if you need it.

Vaibhav (02:03:30.116)
I found it. That's what I find really interesting though about all this stuff, which is like, if you don't think about evals in this approach from the very beginning, it's really hard to like, it's really hard to go and like, go ahead and come back and solve this from like first principles. It's kind of very similar to like, once you saw that next to like, shoot, this is actually useful in my current research tasks, cause it's the same thing. And like, but once you break down evals in this way, what you really think about is like, this is not about faith. I need this like any,

non-determinative system.

Vaibhav (02:04:05.926)
which inherently means any system where any point in the call stack use math.random or datetime or a model of some kind. And any system that does any of those things needs to think about testing in a foundation in different way than software that just does control flow. And in fact, it's actually not just any of those systems. It's any time where you have an external dependency where you make a network request that you don't control.

There's this really interesting problem in system design where someone's like, you have a black box API that you call. It takes a really long time to solve the problem. It's designed to be an ambiguous problem by definition because you got to go solve that problem. How do you deal with a black box that you cannot control? That's out of scope. You got some questions?

Dex (02:04:51.147)
Yep.

Dex (02:05:07.509)
I mean, we have mostly people just saying that supply chain and procurement and operations is a useful place to get ideas about software and how to build better software teams.

Vaibhav (02:05:17.458)
Yeah. And they want access.

Dex (02:05:22.261)
I said DM me on Discord. We're getting ready to actually do like a proper launch of this stuff and like put up a, you know, stripe page, swipe a card and like actually get rocking with it where like anybody can sign up. We wanted it to happen in March and we had a bunch of random infrastructure shit that we got pulled into. But now the infrastructure is super stable. I don't know if you see at the bottom, it says sync degraded.

Vaibhav (02:05:22.968)
yeah.

Dex (02:05:50.207)
That is a system that Kyle built, which is basically like we had some issues with our sync provider and it used to be when the sync provider was down, there was zero chance that your app was going to work. And so we built a like background path that is like a little bit slower and less performance. But if the like hot path is broken, you can still, the app is still usable and it just uses like a polling base sync.

Vaibhav (02:06:16.411)
nice, that's kinda cool.

it's so slow. I hate waiting for this. Well, if anyone's curious, you got a couple of...

Dex (02:06:22.935)
We're working on it. Finish your eval system so I can make the research faster.

Vaibhav (02:06:27.75)
Well, we're doing that right now. I mean, at this point, all I'm really going to do is produce the research. I'm going tell it to go answer the open questions, and then I'm going to hit the design phase, read it, and then go ship it again. There's not really much more I'm going to do beyond that over here.

Dex (02:06:29.825)
Yeah. Thanks, Justin.

Vaibhav (02:06:48.904)
So we can watch me do it, we can let it run in the background. What I'll do is I'll make all these public links so everyone can go read all of it and I can make the whole task public. So people that are curious can just go watch it in real time and go record and replay. And then obviously by the time that you see this video on YouTube, there's going to be a GitHub link to this actual PR that's fully made. So we can go ahead and include that at the end as well. What do you think, Dexter?

Dex (02:07:16.311)
Yeah.

Vaibhav (02:07:17.671)
This is going to work. This is a fully automated process. I did this, I guess I already did this with closures. Here's proof in the book.

Dex (02:07:21.899)
Okay.

Does that mean you want an auto advance that allows you to skip the design discussion?

Vaibhav (02:07:30.471)
No, I actually need to read the design discussion to make sure it's correct. I have to know, I have to deterministically know that it's correct.

Dex (02:07:38.305)
That's your last check. We thought about making some of the more advanced things, like, okay, if you really know what you're doing, you can auto advance the design discussion, but you have to unlock it by doing 100 sessions or something.

Vaibhav (02:07:52.455)
Ignore how many lines of code I deleted, like how many lines of code I added. And like this is mostly just pure Rust code. I mean, we can look at how many sessions it was. We don't have to guess. We can just like, no. Because I think...

Dex (02:07:56.533)
Nice. Can you do this in like a couple days?

Vaibhav (02:08:09.191)
Great archive task.

I think this was the big one is when I started implementing it. It was...

Vaibhav (02:08:25.167)
12.08 a.m.

I guess you don't have the date here, which is unfortunate.

Dex (02:08:31.085)
That's crazy.

Vaibhav (02:08:34.631)
I think it took me two days to implement all of closures. I started at midnight and then I finished at 3, 54 a.m. next day. So it was 36 hours of time with sleep in there. With two sleeps actually in there. So it's pretty straightforward to implement. But all fully vibed, fully advanced, fully auto-advanced all the way. Once I do this part, I just auto-advance all the way through.

Dex (02:08:46.433)
Nice.

Vaibhav (02:09:05.989)
There's not really much I do in that approach.

It works, but I spent a lot of time in building that perfect ticket to make that really, really possible.

Dex (02:09:21.197)
I'm writing this down as a ticket.

Vaibhav (02:09:25.957)
Yeah, there's a couple of open questions. I think the workflow is very, very dynamic. I wouldn't say I've hard coded this workflow and I know what to do. I have a pattern. The number of times I loop, the number of times I answer the question is very task specific. So there are building blocks that I use, not really things that I can yet automate. Because I don't have a good way to dump all my context into, all that context in my head, into my ticket on day zero. So it just can't do it. It's not possible.

Dex (02:09:59.701)
Interesting. man.

Vaibhav (02:10:00.071)
Did I make a mistake actually?

Vaibhav (02:10:11.271)
Oh, okay, that's good. No real risk. It's just a very tiny change. I don't care about this change.

It's very scary sometimes when I forget to import stuff. I was like, oh, did I not sync against the latest repo? That's actually the hardest thing about WorkTree. You have to remind yourself to sync and get pull before you start a task.

Dex (02:10:31.147)
I can show you a CloudMD snippet that will force the app to do it. We didn't want to be as opinionated on this as we could be. But did I send you my latest blog post on how to...

Vaibhav (02:10:48.327)
Now, what do you do?

Dex (02:10:50.397)
so I will, let me share, I'll share my screen while this is running. so essentially what we have is, share screen, entire screen. it's really simple. we just use these XML blocks. so it's like important if you are doing X, Y, and Z, and it just like gives Claude because the system messages like only follow this instruction if it's highly relevant.

Vaibhav (02:10:55.003)
Yeah, go for it.

Vaibhav (02:11:19.569)
Mm-hmm.

Dex (02:11:19.809)
here's the, here's the snippet that it actually puts in is like, you know, you should not respond unless it's highly relevant to your task. So the way you get it to follow your cloud MD is you'd be very explicit about when is this, you know, relevant to your task. and so.

Vaibhav (02:11:32.903)
Makes sense, yeah.

Yeah, you awful of the thinking the model rather than the model inferring it you're explicit about when it's relevant

Dex (02:11:41.109)
Yeah, it's just a little bit more, yeah, exactly. Instead of saying always write the tests, you say, so we have this in our, like, we have this template for doing multi-repo stuff with this. I think we talked about this before, but it's basically like, important, if you are using the RPI Create Research skill, always git pull the branch or whatever. Actually, we already have this in here. You know, check to ensure the repos and questions have the latest from the Git remote.

Vaibhav (02:11:53.638)
Yeah.

Vaibhav (02:12:04.123)
Nice. That's cool. That's actually good. You know what's funny? We actually don't have a CloudMD file that we use. I just have not found a good use case for it.

Dex (02:12:14.539)
Yes, this is the only thing we use CloudMD. I mean, I'm not going to pull up our exact CloudMD, but it's basically like, it's a map of the repo and then it's this kind of shit. It's like, okay, if you need to query the database, here's the exact shell command to run. Otherwise, ignore.

Vaibhav (02:12:29.991)
That's cool. That's cool. So I've got an idea. I think I should post a PR at end of the video. I think we've got a few folks online that probably want to keep you having, but I suspect you also probably don't want to watch just Claude auto loop through. I'm not going to watch Claude auto loop through. I'd rather just parallelize some other work. But I suspect...

Dex (02:12:46.891)
Okay, do you wanna just like go off video and leave the recording on and come back or what do you wanna do?

Vaibhav (02:12:53.319)
I can leave the recording. Do you want me to do that? I can leave it running. It's just going to run with no audio.

Dex (02:12:56.683)
I mean Riverside will auto edit out all of the, or Mario can just edit out all the space in between. It's better than having him have to deal with like two separate recordings.

Vaibhav (02:13:06.371)
I have to do something special here in that case where I have to go ahead and go do this. I will make it record that whole video. I'll make it go record that whole...

It'll make it hard for me to paralyze if I want to saw it or run. okay.

Dex (02:13:21.505)
I mean, you could literally not share and just turn off your camera and mic. We could come back in 20 minutes when it's done.

Vaibhav (02:13:27.639)
this is gonna take more, because it's gonna take...

Dex (02:13:30.189)
Okay. All right. Well, let's what we can also kill the stream and just put the PR up since you're going to ship this anyways.

Vaibhav (02:13:35.589)
Yeah, it's gonna ship by end day today. So people are curious if you watch out in the Banelore repo, you can take look for it. You'll get to see it live. But if you wait, you'll get to go see it. You'll get to go see it in Monday. The only thing that I'll do is I'll make every single task on here.

Dex (02:13:46.029)
Why don't we do this? When it's ready, we... When we do this, when it's ready, let's just hop back on a Riverside stream. We could just record quickly skimming the design discussion and go look at the PR. And we can just have Mario edit that into the end. Just ping me in a couple hours when it's ready.

Vaibhav (02:14:05.799)
Yeah, we can do that if that's useful. There is, I think what I can do actually, if people want to see the second half of the stream, what I can do, I can actually show what I did for closures. So you can actually see what I do in the second half of the stream. Because this is all automated. At some point it stops being automated and I take over once it's actually implemented everything and I'll show you what that point is. I think that's probably the most important part that people want to have.

Dex (02:14:26.434)
Yep.

Vaibhav (02:14:34.247)
So the first thing is like now this now this thing is fully been built and like this one then I step in again I don't automate creating the pull request Once the implementation is done. I actually start reading the code I and we have really good test harnesses in our system. So I specifically go look at testing harnesses I'm like, cool. I found some bugs. So I found this I'm like, okay, cool. I Found some bugs. I then it goes and fixes them

takes so long to fix bugs it's very annoying because it doesn't use subagents it's very hard to scroll through. Okay once it does this I mean coding agents are great because I just step through and then it finds more bugs. I wish I could just quickly scan to my next user message.

Vaibhav (02:15:24.592)
Yeah, it's hard.

Vaibhav (02:15:29.286)
I can.

Dex (02:15:35.435)
And if you DM me on Discord, by the way, I just accepted all my last Discord DMs and I am trudging through the ocean of people trying to get me to launch a crypto coin, but I will find your messages from legit people and answer them.

Vaibhav (02:15:46.97)
That's fine. Now the next thing I say is like I find more bugs and I keep looking at them and I keep looking at more and more bugs. I basically just go through here and I actually am really iterative on the... Oops.

Dex (02:15:56.289)
We don't see your screen, by the way.

Vaibhav (02:16:01.146)
Thank you, doctor.

Vaibhav (02:16:07.194)
What I end up doing basically is I go through here and once the implementation is complete, I just start reading my test cases and make sure the test cases are good. we have what's called snapshot tests. So we actually have test cases and we print out the text files, what the output of that serialization is, what the inner representation of the data models are. And I go read that, like, I keep on finding more and more bugs. And every time I find bugs, I have it go fix a bunch of stuff. And you're to see me iterate through and try and fix each bug one by one.

Dex (02:16:24.011)
Mm-hmm.

Dex (02:16:30.829)
Mm-hmm.

Dex (02:16:35.298)
Yep.

Vaibhav (02:16:36.602)
But it's very rare that I find very, very foundational bugs at this phase. Because if I've done a good job earlier, then I shouldn't find foundational bugs. And sometimes I do. And then I do the most absurd, stupid thing, which is I actually nuke all my work. I kill the branch and I start from scratch again. And I make the ticket explicitly have that call out. And I do the design discussion, follow everything out, make a new ticket, and then start again.

Dex (02:17:03.979)
Yep. Yep.

Vaibhav (02:17:04.12)
and then I auto roll back because it's faster to restart from scratch with a good basis than it is to incrementally fix certain things.

Dex (02:17:13.419)
Yep, and there's an intuition there, right? If it's only 5 % wrong, then I will just riff back and forth with the model on it. But if it's 30 % wrong, then I know it's easy to just start over because all I do is drop the thing in and rip it and it goes, spends a bunch of tokens. The tokens are cheap compared to the amount of effort you're gonna spend trying to re-steer the model after it started going down a bad.

Vaibhav (02:17:19.087)
Exactly.

Vaibhav (02:17:31.078)
And you can see that I sent almost 15 messages at this point, with a lot of optionality of how long this context chain gets when it gets to incrementality. And then once this is done, like... And then I ask it to describe... I actually sometimes ask the model, like, this feels large. I want you to consider this. And the model's like, but that's actually really easy. That's because, again, I'm not reading the code, so I need the model to describe things back to me.

And once it does this, then I have it go produce a PR. And once it produces a PR, I actually have this fun little script that helps me get data back from LLMs that go and describe the feedback back. I just run a, I don't know where that command went. There's another thread somewhere that has some of this information. That when I get the comments from the AI coding agents and I just let it rip in a roll. That's basically what I'm going to do over here is like once this is done, it's finally proposing a synthesized document. I'm just going to let it rip in the same way.

Like it's a very straightforward loop. This is the process that I use end to end for almost every complicated task. If I think it's going to end up being like 5,000 plus lines of code, this is like, this is the process that works for me.

Vaibhav (02:18:48.806)
And that's it. Hopefully everyone enjoyed this.

Dex (02:18:49.625)
Nice. Cool. All right. We will either post the PR or we will put a little snippet on the end of the video when we publish it to YouTube that has us going over the results.

Vaibhav (02:19:00.065)
Exactly. And then let's do one last thing. Let's record an outro that will secretly put us the intro on the YouTube, which is about the in-person event on April 11th.

Go for it.

Dex (02:19:12.621)
Cool. That was great. So in this episode was a lot of fun. We went through a ton of how ViBob likes to code, how he takes working with models using long context, using short context, building design discussions, iterating on the specification for the language. And the other example was, know, what was it? 16,000 lines that you wrote for...

Vaibhav (02:19:35.141)
closures.

Dex (02:19:36.545)
for the closures feature in BAML and being able to do lambdas. So super exciting time. I think you'll learn a lot about how we do agentic coding and like what the frontier there kind of looks like for being able to ship a lot of really high quality code without slop. The only other update we have for y'all before you get into it is we are doing an unconference in San Francisco on.

April 11th is a Saturday. If you are in SF, come by the YC office and Dogpatch. We're gonna have essentially, what we did last time that worked really well, we might do a couple tweaks on this, but it was basically like, you come in, you get your cup of coffee, you chat with people, there's a whiteboard up. If you have an idea for something you wanna talk about, five to 10 minute lightning talk. Obviously, no pitches, no selling, but if you are working on a hard problem and you think you learned something that would be interesting to a group of really smart AI engineers.

write your topic on the whiteboard, we'll pick someone to go first, and then when that person is done talking, they go to the whiteboard, they pick the next most interesting talk that they wanna hear, and we just kinda like loop through like that for the rest of the day. We'll maybe do some breakouts and split up between like pipelines versus evals versus coding agents. We may keep it all single track, we're gonna see how it goes. But if you're in San Francisco on April 11th or you can get here, we'd love to see you and just come connect with other members of the AI that Works community.

Vaibhav (02:20:57.603)
Yeah, we've got sadly limited high count, but I think if you guys are fans of the show, you've been here for a while, let us know. We'll make sure we try and make space for everyone there.

Dex (02:21:07.317)
Amazing. And Kieran says to the editor, please keep the 6-7 in. So I don't even remember that coming up. I'm too old for that one. yeah, enjoy the episode and we hope to see you live in SF. Cheers, guys.

Vaibhav (02:21:12.161)
at some point in the video you'll see something.

Vaibhav (02:21:20.239)
See you soon, this episode's gonna be fun.

Dex (02:21:25.111)
Alright, that was great. Excellent work.
