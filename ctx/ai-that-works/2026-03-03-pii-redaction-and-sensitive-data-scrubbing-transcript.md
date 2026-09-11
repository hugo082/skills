Dex (00:00.172)
I gotta go talk at the conference later, so I, I am, I spent a lot of time obsessing over my outfit and then I just decided to wear a white t-shirt. Hi everybody, sorry we're late. Yeah.

Vaibhav (00:11.023)
All right, thank you for the API key. Whoever dropped the API key, very generous of you. We will be using that today in the session.

Dex (00:18.198)
Yeah, yes, I hope you bought a lot of tokens.

Vaibhav (00:23.663)
Or at least you will be.

Dex (00:27.692)
Yes, AI That Works this week is sponsored by Kirin. Thank you, Kirin.

Vaibhav (00:31.755)
You

Dex (00:34.356)
I'm sorry relate. Someone actually was in the chat being like, you know, we should probably move this meeting by 15 minutes. So if I, Bob can stick to his own schedule, but, schedules are hard. We're both running big companies. I, sorry, we're both running small companies, which makes it a big job. so thank you for your patience. Everybody. this is the AI that works show where we teach you real AI techniques that actually work in production, have been proven.

Vaibhav (00:46.325)
Schedules are hard. Today was especially hard.

Dex (01:04.269)
in companies of all sizes from small startups to giant enterprises. I have here one of my favorite people in the whole world, Vybov, who's going to tell us today about PII and redaction and how to do that right and cleanly and fast and how not to overcomplicate it. Yes?

Vaibhav (01:23.523)
Yes, indeed. I think PII is going to be a great topic. So let's get right into it. So because I know we're running late, we're going to go straight to whiteboards. Can you send me the whiteboard link text? thought.

Dex (01:30.111)
let's do it.

Dex (01:36.514)
Alright, I am getting the whiteboard. You know, I was just sitting here for 15 minutes waiting for you to show up, but like, why would I actually go do prep when I could just sit here and BS with the audience?

Vaibhav (01:41.711)
You

Vaibhav (01:47.183)
All right. But while we're here, let's go chat. Everyone that has had to do with PIA data, I think there's two classes of PIA data. And I want to talk about both of them in slightly different ways. Class number one is if you leak it, are, you are legally liable and there's zero risk tolerance for that data. And class two is you would strongly prefer not to leak the data. And I put those, I put those in two slightly different categories because the way that you have to handle them, the way that you think about them,

Dex (02:10.958)
I sent it to you.

Vaibhav (02:17.396)
is fundamentally different. And I think that's often the first mistake that people make. They think about everything in a single, in a single class of data. So I'm sure tab. So we have the whiteboard going on. So when we go through like class one, just really quickly, the way that you, at least I think people should think about this is the fact that if you really must not leak this data, then you have to build.

security controls in your code base. I'm not even talking about FAI layer. I mean in your code itself to prevent that data from leaking. So for example, a really trivial example of this is RBAC. If you're going to use RBAC in your databases, that's a great way to prevent a security control. But most people don't design security controls for their companies because you don't need this.

Most people do not need class one security. You should not do this even if you're in the medical space. Most people like you just need to make sure the data is secured sturdily in the database layer. But what you do with it post is it can mostly be handled by keeping all your system running on intranet. As long as you're running an intranet, most of class one is kind of dealt with.

Dex (03:29.678)
I have beef with this.

Vaibhav (03:33.601)
okay. Tell me your beef.

Dex (03:35.746)
I'll get into it. Keep introducing the topic and I will get into the zero trust versus beyond corp versus just using a firewall as your security boundary.

Vaibhav (03:37.806)
Okay, right.

and

Vaibhav (03:46.895)
Okay, At least the way I model it is like, look, if you're using an intranet, then really your only leakage is whatever tools you have. That comes with all the consequences of using intranet, which means you can't use all the best tools out there because they don't run on an intranet. But if you truly, truly... Go ahead.

Dex (04:01.326)
Can we use a 60 second explanation of how you think of intranet?

Vaibhav (04:08.814)
Yeah, my way of thinking about internet is it is hardware that either you loan or you control that is completely firewall off of the rest of the world, except for very, very, very fine grained APIs that you have explicitly allowed.

Dex (04:27.648)
Okay, so it's basically an environment that has no inbound or outbound access to the public internet.

Vaibhav (04:27.788)
And by control, I mean you can.

Vaibhav (04:33.442)
Yes, and again, please note that I come from writing assembly code. So like my model of the internet may not be perfectly accurate with those that have worked on real cloud systems. So just keep that in mind. But effectively.

Dex (04:46.648)
That's okay, I'm here to correct you and tell you what you're wrong about as usual.

Vaibhav (04:51.541)
Is this how you think about it though?

Dex (04:54.938)
yeah, I think, I think it makes sense. I think there's something to be said with like a lot of, a lot of folks have like, there's this thing that came in vogue in like the mid 2010s, which was like, okay, you have all these servers. And basically the idea was like, if someone can cause cause you have like personal VMs, right? You have like laptops that live outside of the physical building, right? This is like, you have to be in the building. Like if you imagine like a file share or something, like you have to be physically in the building and then you have like a user workstation.

Vaibhav (05:19.646)
sure, yeah.

Dex (05:24.652)
And somehow you need to create some kind of secure route between that person from their home internet can get in via like a VPN server or something. And the idea is like, if it's like once you're in the network, everything is open to you, then like all these boxes can obviously like you have other firewall rules internally, but things like MTLS, like basically the way Google does this is everything's on the public internet and every single node in the infrastructure has to authenticate to each other rather than like.

Vaibhav (05:31.5)
Yeah, yeah, yeah, yeah.

Dex (05:53.354)
Once you're in the network, you can do whatever you

Vaibhav (05:56.032)
Yeah, this is again why I'm not a cloud engineer, because I don't know the stuff.

Dex (05:58.669)
Anyways, this is an AI show. We won't talk any more about cloud, but it's a good intro of like, you you may not need a bunch of AI to do this if you can solve it at the end.

Vaibhav (06:09.069)
Yeah. And this is kind of why I said like for class one, like if you, if you mess this up, you are legally liable. This is a control plane that you have to build and you just have to build this regardless of the fact that you're using AI or not. The part that I think off good.

Dex (06:21.484)
Yep. so things, things like PCI, like if you manage credit card numbers and store them, like every single node that touches a credit card number has to be basically what we call air gapped where there's no, not only can no one get into the servers, but nothing in that network can go outbound because even if someone, say the defense in depth is even if someone compromises your entire network, they still can't get out of the network to send the data they stole.

Vaibhav (06:37.601)
Exactly.

Vaibhav (06:46.775)
Yeah, exactly. And like that's kind of the level that you need for that. and there's, if you're building AI pop in there, again, nothing you can do, but just pure software. There's, can make cloud code, write it and everything, but like fundamentally just software. And you have to like do a security analysis and make sure that you're not leaking data. I am not talking about any of that today. We are going to be talking about class two, which is you would just like to not leak it. and I say like to, because like it just, it perhaps it erodes customer trust. Perhaps it erodes like.

your ability to trust the AI foundation models to not leverage the data incorrectly or store data incorrectly. There might be a variety of reasons there, but there's something around the fact that you don't want to give this data to someone else. Maybe you have HIPAA compliance and your stuff can only run locally, but you want to use OpenAI as best models. How do you get around that sort of system? So, first thing I think you have to recognize is it is effectively impossible to get 100 % PII guarantees on here.

Dex (07:34.414)
Let's do it.

Vaibhav (07:44.108)
And the reason I say effectively impossible to get 100 % guarantees is because if any of you have ever played, think the best way that at least I model PII is it's really, really good masking. You want to mask the data in some way that sends the concept of the data across, but doesn't actually send the raw data itself. And if you've done that, you've done a pretty good PII system. So I'll talk about why I think it's really hard to provide a guarantee and the best analogy is video games.

If you've ever played an online video game, many of these video games ban certain words. Because they're not, They're not, They're not friendly. Is the way that I'd use them.

Dex (08:13.558)
Okay.

Dex (08:24.59)
They're not conducive to the gaming company's goal of creating a healthy environment that invites people in and causes more people to play the game. In most cases, it's like people will spend less money on the game if they jump in and every five minutes they're getting called a slur or something.

Vaibhav (08:30.199)
fostering a positive exactly that they all talk about.

Vaibhav (08:44.627)
Exactly. So, but, as many of you that may be gamers probably know, those rules are very, very, you can make the word unicorn mean something new all of a sudden in a certain ecosystem without it doing anything. And there's also various ways to say the same word with slightly different spelling, slightly different, slightly different annotations that gets the same concept across, but basically makes it impossible for the gaming companies to prevent all of it. And you can only really react.

Dex (09:11.906)
Right, well, because they were using regex for almost the entire history of this. And every company has just this long, like, you thousand line regex that it, I mean, you can probably go download a regex off of NPM that is like profanity filter.

Vaibhav (09:16.874)
Exactly.

Vaibhav (09:25.357)
Exactly. like step one is like you do regex, but then like step two is like, you use an LLAM, but the problem with step two is you kind of live on this spectrum of like, where do you want it? Where do you want to live? You want to live on, you want to live on the line of sometimes we'll let stuff leaks happen and we react or do you want to live on the line of data doesn't make it through.

Dex (09:51.469)
and maybe you degrade the experience in other ways because you misidentified. You're always gonna be either like, you would rather have false positives or false negatives, but it's hard to get it perfect, right?

Vaibhav (09:57.762)
Exactly.

Vaibhav (10:06.985)
Exactly. And that's exactly what it is, degraded experience. And you have to choose which side of this line you want to toe in every single AI product that you're talking about. And when you've done this, you just have to design the system. So, for example, let's say we're talking about healthcare data, and we want to make sure that social security numbers never leak. Well, it just depends on how our users are going to be using social security numbers.

If social security numbers are always going to be a unique identifier, well, then like you could, and they follow some pattern. You can learn it as red X that pattern guarantee that happens. But what happens when a customer literally just types in a pattern that looks like a social security number, you can't actually prevent that. So how do you make that system better? Well, one, there's two options. One, you load up all the social security numbers you know about in your system and you mask against only those.

Right? And now if that happens, you've done this. But now you've done something by accident, which is you've discovered a service area that people can have where they can just type in numbers that look like social security numbers and discover the ones that you then...

Dex (11:11.906)
And if it gets rejected, then they know it's a real social security number, right? This is the spear phishing thing, right? Where it's like, okay, I type in an email that I think exists and if the service allows it, then I know that that person already has an account.

Vaibhav (11:15.071)
Exactly. Exactly.

Vaibhav (11:23.265)
Yeah. So as you can see, there's a whole bunch of problems that you run into no matter what solution. I think it was something like that for how that company had the leak. As you can see, there's a bunch of problems with how we can design security systems and all these problems have almost nothing to do with AI. All of them have to do with pure software. And I think that's the first mistake that people make, which is they think that this is an AI problem. like the PII system is just a software problem. And if you're going to go ahead,

and build a PI redaction system using an LLM instead of regex. All that happens is you've just decided that you're now just shifting the thing to be more towards the degree. A data doesn't leak and you're living less reactive and more proactive, but you're going to have a slightly degraded experience. And that may be okay, but you just have to design for that in your software. So for example, if you have a redaction, how would I do this? If I'm just a regular consumer chat app,

I would just give the option to every single customer after I do some redaction to just remove the, say, remove this redaction specifically. And I'd make that a part of my UI UX. If I'm building a backend system, let's say, let's say what I want to do is I'm a company. want everyone in my company to use quad code and everything else, but I want to accidentally prevent them from sending secret code names through the, of the company and company projects down to open IR and thropic.

How would you do that? Well, solution one literally is run AWS and Anthropic on your own company's bedrock system. It's you have that system, but it doesn't leave your network. You're okay.

Dex (12:56.396)
and then it doesn't leave your network, right? Then you're doing basically the internet thing where it's like, okay, now I know that like, and like basically the way thing about this is like, you're always gonna trust some external people with your data. And most companies will basically always trust like their infrastructure provider and a few like systems of record. Like yes, everyone sends data to Salesforce. Salesforce has a copy of the data, but Salesforce is a giant enterprise with really good security and a great track.

so we trust them. And same thing with AWS and Workday and like, so even the biggest, most security conscious enterprises in the world probably have like five vendors they trust. There's certain organizations who run everything in concrete bunkers underground. Don't ask me how I know that. But in general, in general, like, yeah, you have a couple vendors you trust. And then there's like the next tier of trust where it's like,

Vaibhav (13:27.433)
Exactly.

Dex (13:52.193)
Okay, we're only gonna trust 100 vendors or rolling it or like if you're a startup, you basically send your data everywhere because you don't care because like no one trusts you anyways.

Vaibhav (13:55.946)
Exactly.

Vaibhav (14:00.133)
Exactly. But in that world, so let's say we don't do class two. Let's say instead of what we're going to build is we're going to build a proxy system that captures every request coming in from quad code, coming into quad code and proxies it before it goes to the entropic in our network. And we capture that proxy and we basically provide a degraded experience to everyone in our company to react to certain systems. And if certain work, yeah.

Dex (14:23.342)
When you draw this,

So the idea is like, have my workloads running in my data center.

Vaibhav (14:32.617)
So like here it's like.

Yeah, and this is often how people are doing LLMs as PIA reduction. They often will do something like this.

Vaibhav (14:48.204)
where they send it, like it looks like it's going to Anthropic from the programs perspective, or it really goes to a proxy in your network that you set up, which remaps Anthropic. And then you run some LLM.

Dex (14:55.704)
Yeah. And this has basically like if upstream equals, you know, API dot anthropic.com do something otherwise like pass through just, just send it to the upstream provider. Yep.

Vaibhav (15:05.42)
Thanks.

Vaibhav (15:09.992)
Exactly. Exactly. Yeah. And there's different ways that you can do this. You can make it so you don't proxy every network request, only proxy purely the entropic ones directly from here. So you don't send every network request through here, but you can send a lot of, and some of them go directly to the LMP Provider or any network request. There's ways to architect that, that's the software. But I the more interesting part is how do you design this proxy system to be good and fast? And that's what I want to talk about. Cause I think the eval side, most people probably understand what you do. You just build a test space and you just

Literally what you're evaluing for is what side of this do you fall on for every single test case that you have. And sadly, there's no way to build the test case upfront. So really what you have to build is you have to build an evolving test case that just collects data from prod and slowly builds a bigger and bigger bigger test suite. And then you just decide on which scenarios are you allowing the degraded experience and which scenarios are you allowing a reactive experience. And once you decide that,

It basically does it for you. It's not that hard to build. But any system that doesn't regularly show you the list of redactions and allow you to control that and tweak that over time, in my opinion, is basically garbage. So someone just asked about, do I have opinions about Amazon Comprehend for PIA redaction? Maybe, maybe not. Honestly, what I would do is I'd take a text prompt. I'd send it to a very small LLM. I bet a 3B or even a 30B LLM running on a local network.

Dex (16:38.242)
Yeah.

Vaibhav (16:38.356)
and just say, what would you redact out of this? And just give it a class of redactions like addresses, names, whatever you care about specifically, like project names, etc. And it'll just tell you if any of them exist. And if they do, then you redact.

Dex (16:51.79)
Okay, so your proxy might actually include some local model classification, basically.

Vaibhav (16:58.634)
Yeah. Or at least a, yeah, exactly. Yeah, exactly. Or am I even, it may be even more than classification. What I would do is I would just do like a rewrite as well. You should think of this more like an agent loop than a single LM call is what you're really doing.

Dex (17:13.422)
And I know you're probably gonna get into this, but I know you have a really cool kind of like two, three step pipeline for doing PII redaction with LLMs. I assume we're gonna get there and we're just kind of like talking about like, hey, before you reach for AI and trying to do all this fancy stuff, this is a generally solved problem and you only reach for AI if you really wanna optimize it or you really wanna kind of like, cause I think what's interesting here is like, this isn't actually a line, this is like a zone.

Vaibhav (17:25.47)
Yeah. Yeah.

Dex (17:43.713)
and it's like, okay, there's gonna be this blurry area where you're on one side or the other, and better techniques let you make it narrower. And so you have less things that you wanted to not leak that you ended up leaking. You know what I mean? Okay.

Vaibhav (17:57.42)
Exactly. That's actually the perfect way to think about it. This like in machine learning, it's like a zone and really like it's not, it's not, and most of the thing of this is unbiased on it's really a bias zone. Right? So like you could have exactly.

Dex (18:08.31)
Right, you pick which way your bias goes to and like, this is where your false negatives and false positives are gonna be landing on either side and it's in this zone,

Vaibhav (18:16.563)
And you can choose, do you want it to have a no bias zone? Do want to it be a really narrow zone? Or do you want to have it be a bias zone? They're all fine.

Dex (18:25.506)
We actually, we talk about this a lot in quantum mechanics when like, haven't read a quantum mechanics textbook in a while, but I did like reread it like 10 years after doing undergrad. And like, there's a lot of the techniques and mathematics that you do to understand, like you have this particle that could be in any of these states and you can apply certain types of math or certain types of experiments to just narrow the window of states that it could be in to make it easier to measure or easier to like achieve some, some goal in the world.

Vaibhav (18:53.503)
Yeah, exactly. I think there's two really interesting questions in the chat, I want to talk about, or three of them actually, that are all really good. So one, does PIA redaction require LLMs? Can't deterministic code handle it? And that's kind of related to what are the tools pre-proxy for, actually, that's really the second question, which is why an LLM that parses actual call instead of a LLM that generates regex to match the actual request? They're kind of related because we're living in like, you're basically living in like three different worlds.

Dex (19:00.429)
Yeah.

Vaibhav (19:20.211)
And I think the way that I think about PII redaction, at least for myself is PII. And I realized we should have conceptualized this at the very beginning. What is PII redaction? There's basically, look, there's only three types of PII redaction. There's like rule sets, which are basically saying like, I absolutely will not break this rule. And regex falls into rule set. And these are, I'll even go further and I'll say that they're static rules. Then there's dynamic rules.

which are rules that are injected into the system at runtime and stored in some database somewhere that then get added and modified and running it in certain ways. And then there's what I'd call like generative rules.

that help you go do things. So why might you want any of these? Well, there's a couple of reasons why you might want all three of them. Static rules are useful because they're fast. They're non flexible and they're fast. So in terms of like the, the leaky system architecture that we define, they're basically reactive and fast because you can only add them reactively. Dynamic rules are also very similar. They're very reactive and fast. A generative rule, however, has the benefit of being

Dex (20:17.356)
Yeah.

Vaibhav (20:30.175)
having much more higher coverage. So it's proactive, but it's slow and costs money. And obviously it has way more false. It has different kinds of false positive that it allows. So it's not that it's not that why would you do one of them? It's more about you choose the tools at hand based on the kind of system that you're designing. So if you know that you have more malicious actors or you have really broad inputs, you definitely will need some gendered rules to deal with this. Cause right now, for example, how would you mask out a street address?

Dex (21:00.108)
Whoa!

Vaibhav (21:00.125)
A street address is like really, really hard to do with some rejects. And like what I would use a general rule to say, like, yeah, exactly. Like it's really, really hard to go do that. Right. But a general rule for removing street addresses, I believe all, a lot of us believe that we could redact street addresses out of system.

Dex (21:07.468)
without also redacting anything with a number followed by text.

Vaibhav (21:26.671)
phone numbers are another example of like where it works really well. And again, another question, a street address or a public company versus an individual. Justin brought that up. Like once you detect a street address, then you could write control flow that says, find the street address using an LLM search across some known addresses of large companies and allow those like public con what's considered a public address is allowable. But if it looks like an address for an individual, don't allow it. And that's a blend.

of some gendered rule to find the address, possibly some hard coded system to find public addresses for like businesses, et cetera, and allow those and then, and if conditions, the basis are like individuals are banned and hidden away automatically. And that's a hybrid system that lives in there. Does that answer the question for people listening on like where this falls in?

Vaibhav (22:21.812)
Cool. And we can, if you guys want, we can actually write the general rule for what a street address kind of thing looks like. And we can talk about some other examples on there because I think that might be interesting. What's also really interesting, and when I think about PI redaction, most people think about it like you're trying to remove secure data, but it's really about any redacted system. And when you might want to substitute a word with some other system. So take timestamps, for example. I know a long time ago, we had...

we were talking about timestamps and how you build relative timestamps. Well, the LLM needs a consistent view of time in its whole chat window. If you suddenly start changing time zones on it without qualifying the time zone, it, it can't, it doesn't make logical sense. in some, you know,

Dex (23:00.802)
Yeah.

Dex (23:09.646)
Well, unless you're using a super beefy reasoning model too, like it's not actually gonna be able to do the time zone math of like, okay, cool, that's UTC, that's PT, even if in the weights it knows the offset given the time of year or whatever it is, like the chance that it's actually going to like meaningfully.

We always talk about this, Like, yeah, the LLM can do it, but like, don't make the LLM do things that it's either like not good at, because you're gonna detract attention away from the task that only the LLM can do. If you can do things deterministically, then don't make the LLM do them, because it's gonna be faster, cheaper, and more reliable. And the thing that only the LLM can do is going to be much higher performance, because you're not having it try to reason through three possible, like three different problems in one question.

Vaibhav (23:53.831)
Exactly. And time zones are perfect example for this. We're like, well, the user is going to write in times, but you want to PII redact the time that the user writes and put a canonical time zone into there. That makes more sense.

Dex (24:06.488)
So this is just the general high level concept of like creating a some sort of interface layer between like what the code sees and what the user sees versus what the LLM sees and translating it on the way in and translating it on the way out.

Vaibhav (24:22.334)
Yeah. And that's exactly why I started off the conversation with this idea of class one, class two, because you treat them differently. Class one is a pure software problem. Design your control plane. Class two is why do you not prefer to strongly leak it? And often the reason is user experience or user trust. And in both those systems, all you're building for a pipeline is just a masking system. And that's it. And it's all the same architecture everywhere. So for those of you that really want to really in-depth walkthrough, go watch the time and the time.

the daytime video that we had before, you'll get a slightly different perspective on how to model this. But today we can talk about how to build a PI redaction system for gender rules. But that's a general concept of PI. Let's write some code. Let me open this up. Cursor. File name window.

Dex (24:51.086)
Yeah.

Dex (24:59.694)
We're gonna write some code.

Dex (25:07.438)
I love that you're always like, let's spend 20 to 25 minutes on the fundamentals before I just give you a thing and you go run off to implement it. Like know when and why to use this. Like that's how you get great results.

Vaibhav (25:20.872)
Yeah, I just, think most of the AI stuff that most people really need is actually has nothing to do with the code. The code is like the easiest, easiest part. And like what people really, really need to understand is how to like map concepts together. It's like the first time I learned about Redis. so like, again, coming from a systems world, I don't know anything about cloud systems, but the first time I learned about Redis, the way I related it was it's basically the equivalent of an L one cash. I'm like, cool, this makes sense to me because I can map it to something that I really understood. And I think.

With the AI world, what is really helpful is can we map these new concepts into something that we all really quickly understand, and if we can, then great, and our life gets a lot easier. Let me open this folder really fast.

For some reason the school did open.

SPI reduction. Okay, I'm going to screen share.

Dex (26:14.05)
Mesa.

Dex (26:17.605)
if you want

Vaibhav (26:18.738)
And then you can take, you want to the questions really fast,

Dex (26:21.174)
Yeah, yeah. So yeah, I mean, most people are asking for examples of generative rules, which is what we're going to do right now. The other thing is any thoughts on test environment before deploying? Like, would you use synthetic data and forecast what new data will need to be redacted?

Vaibhav (26:25.748)
Okay.

Vaibhav (26:36.938)
What are your thoughts?

Dex (26:46.318)
I don't know how synthetic data would necess... Like, if I already know the shape of the data, then I'm gonna put it in my evals and I'm gonna build systems to test against it and I'm gonna be intentional and human in the loop on like, what are the types of things we need to test? I might ask an LM to brainstorm that list and help me review it, but I think like...

Having an LLM generate fake emails is kind of an extra step compared to just asking the LLM, like, what are all the patterns that an email might take? Like, it's two answers to the same question. And so I wouldn't necessarily use synthetic data because, anything that the LLM can generate based on its weights is a thing it can reason about based on its weights. There may be...

Vaibhav (27:37.275)
I agree.

Dex (27:38.318)
There may be some really tight corner cases you might find, and I'm curious if you find, I would love to be proven wrong here, of like, if you ask the LM to generate fake emails, it comes up with a better test set than if you just ask it to think about what types of emails might exist and what the patterns are.

Vaibhav (27:56.402)
Yeah, I think the way that I really model is you have to decide what is the risk to your product if a PI redaction fails. And based on the level of risk, it tells you exactly how much testing environment you need ahead of time. If the risk is it's nice to have, but they're not going to be pissed, just ship it and collect real data and build a reactive system.

Dex (28:10.371)
Yep.

Vaibhav (28:18.107)
If you're where you're literally collecting prod data in real time, you build an eval harness on prod data that says, did we have a leak? Did we have a leak? Did we have a leak? Did we have a leak? And you're asking another LM to judge if the PII failed. And then.

Dex (28:27.064)
Yeah.

Dex (28:30.754)
But we're all, it's all the same models. It's like, if you're gonna, yeah, you could ask it for the same model four times and maybe you would catch more things, cause you're like, you know, have a high temperature and you're rolling the dice.

Vaibhav (28:38.442)
That's not what I mean. mean, imagine that's not what mean. I'm talking about like a system where like you like imagine you have a function that's called like redact.

I'll just do this. So you have a functional redact client.

and AI and GP.

or a mini, prompt, whatever, I don't really care.

But then you can have another function that says, like, check redaction.

Vaibhav (29:11.495)
Where it takes the input, takes the redacted string. And it produces it. It produces it. Exactly. Right? And like you could, this is kind of like your eval function. And this is your prod function. And what you're really doing is in prod, you're running this all the time on your code. You're running, and we'll change the shape of this in a little bit. It should not return a string. It should not consume a string, blah, blah, blah. And this one, for example, should.

Dex (29:15.534)
What's a Boolean?

Dex (29:33.646)
Yeah. and then you would like sample it every hundred records and just kind of like try to get a feel for like what's getting through.

Vaibhav (29:42.022)
Yeah, exactly. Or you could run out on hundred percent if your company really needs redactions, run out on a hundred percent of your queries and you basically to see it's like, what did I, what did I miss a redaction? And if you did now you can take all the data that returned true for this. And now you can build a set of rules that say what types of data are we missing or redactions on the most. And maybe you find there's a category and if there's a category, you add a new rule into it. If there's

Dex (30:05.166)
You could even use this as like a JEPA metric to optimize your other prompt, right?

Vaibhav (30:11.387)
Exactly. That's what I would do. Like fundamentally, that's really what you're doing. You're building a metric and that's the right word for it. Probably where you're trying to see this. And then you can build analysis systems on top of this to say, are we missing? If you select star of all the input and redaction pairs where check redactions was where we failed to capture redaction, then can we see a pack? Is there a pattern in all of those failures? And if there is a pattern, then how can we update our system to go do that?

Does that kind of give you give everyone an idea of how we would design this in like a truly prod system?

Dex (30:46.254)
Yeah, there was one other question, like as we keep building this out is like, can you also include your scenario where the system requires passing like some, like you require passing some PII, like a healthcare member ID or for like some healthcare AI system.

Vaibhav (30:59.977)
Then you either then you have to decide like are you okay sending it to an external model if you are then send it if you're not okay Send to an external model and you want to send the concept but not the exact model It's very similar to a date time problem. We're going to send the concept of time But not the actual time that the user wrote

Dex (31:13.133)
What?

Dex (31:17.634)
Well, and I think you've picked a very specific type of redaction goal, which is like, I want to check this is safe before I send it to open AI or anthropic. think a lot of the people I've talked to who are interested in PII redaction are actually, it's more so like their cloud environment has a ton of PII, know, driver's licenses, personal financial information and all of this kind of stuff. And what they want to do is they want to like,

give and the rules and the regulations say PII must never be downloaded, must never be live in a dev environment, must never be downloaded to developer workstations. And so it becomes quite hard for people to like debug problems if the only place you can touch the data is in production. And so they've built pipelines that basically take all the production data, do like, you you do the extraction on the images or the uploads, the PDFs or whatever it is, which we've talked about. And then...

you create redacted versions that are actually saved to, and this is probably class two data where it's like, okay, look, if a customer, if a user's like driver's license number ends up on a developer workstation, like that's bad. And like somebody in compliance should know and we should fix it. But it's also like, it's not existential to your company necessarily.

Vaibhav (32:34.717)
Yeah, so how do you, that's just again in my opinion, that's, I would say is,

How would I describe it? Like that's just a problem with PII data. And like the way that we solved it, at least when we built Face ID, is we just had two data sets. So like we collected like super secure data sets that were a pain in the ass to access. And you can't run them on your machine. You have to submit a cloud job. It has to run. It gives you like metrics about that. Technically developers could have been malicious and leaked data out of the system, but no one, no one would do that. Cause they're, it's just liability and no, no.

developers aren't trying to be legally liable for things.

Dex (33:19.458)
Yeah, Snow has a really good question, which is also my question and my general question about LLM as judge as a technique is like, why would check redaction be able to capture the misses if redact didn't?

Vaibhav (33:32.101)
It's because checkered action is a fundamentally different question. It's not that you can't, the way that you wait, let me finish my previous point really fast about data, which is the way that you solve that problem on data. The way that we solve the problem in face ID is we have two data sets. literally went through and got to be able to sign their waivers. said developers allowed to have access to your faces for like 60 days. And then we just had for building a face ID and then like developers could just access certain faces. And like, had to go ask employees in the company to sign that up.

Dex (33:40.162)
Yeah, yeah,

Dex (33:53.282)
for building Face ID.

Vaibhav (34:01.032)
And like, that's how we iterate it fast, right? And we got some external people to do that too, but that's kind of how you iterate fast. And you still put a time horizon on it, the data secured, but that's at Google scale, right? You go down a level to like the next tier of company. Again, you just, you just build a totally separate dataset. You have to make it your data. You have to make your data set super swappable at runtime. And that's end workload that you have to build. If you don't do that, then you live in the pain that you're talking about, which is like, now we have to deploy it to the cloud. just, you got to solve the data ingestion problem.

Dex (34:01.07)
Yep.

Vaibhav (34:29.736)
if you really have secure data like driver's licenses and such. I think building the redacted models is kind of dumb. It doesn't let you really test your system out if you do that. And the only reason to build redacted models is if you work with external customers or if you work with external contractors or you want to try new models out on parts of your pipeline.

Dex (34:42.936)
Okay.

Vaibhav (34:58.3)
but not your whole pipeline and you want to send a redacted form to there before you decide if you want to onboard that vendor to your system. So there are reasons to build redacted systems. 90 % of the time, I would just build customer waivers or like data waivers that release data to developers over some time horizon and you just build a renewal system there. It's much faster to implement.

Dex (35:17.322)
Interesting. Cool. Yeah, so I know you have a really cool pipeline for like detect PII, redact PII, restore PII, and some of it's deterministic and some of it's not. Are you interested in kind of walking through that? I know there's another code example out there somewhere. I don't know if we have to write it all from scratch, but I would be really interested to kind of like run some of the tests from that system and like kind of walk through how it works.

Vaibhav (35:20.082)
Cool. Check for actions.

Vaibhav (35:43.452)
While we were talking, was grepping on my code base to find it and I could not find that directory right now. So sadly unfortunate.

Dex (35:48.46)
Isn't it in like, it's in BAML examples repo, right?

Vaibhav (35:52.397)
it might be. If you can, let me see. I do not have it locally on my machine as possible that PII. If you can find it in there, let me know. It probably would have the word over death. I know the example you're talking about. I know you, I've shared it. So like, I know which one you're talking about, but I just couldn't find it. I thought I had it, but I sadly could not find it.

Dex (36:07.213)
it's maybe it's gone.

Dex (36:19.992)
BoundaryML slash BAML examples.

Vaibhav (36:23.432)
As far as I can tell, it's not in there, but if you find it, let me know. Also, what the heck? Did we release an API key? That's funny. Oh, no, we did not. Okay, let's talk really quickly about how I would build a system and how I'd build dynamic rules as well, because I think that's really what people are interested in. So here's what I would do.

Dex (36:27.148)
Okay.

Vaibhav (36:50.116)
I would personally break this down into a couple of different things. I'd make a class that somehow models rules of some kind, and there's different kinds of rules. There's static rules, there's red X rules, there's like pseudo dynamic rules and everything else. And then I basically give a redaction of rule. I'd give it a single rule because like, again, if this is super important, my company, I just want to know the status of this risk. And I'd say like leak risk.

Dex (37:19.425)
Okay.

Vaibhav (37:21.019)
Added to this.

Dex (37:25.27)
And are you going to put reasoning in there too, or is it literally just, yeah, okay, cool.

Vaibhav (37:25.704)
And I would literally... Yeah, I just get the reason. I just get the reason. Because I want the reason out there. And I would just go do this. And this would be a really simple thing. What are the risks in this message of leaking sensitive information? you just... Really, really simple. Doesn't get complicated at all.

Vaibhav (37:56.56)
And now you just get a leakage risk and this will basically solve the problem for you.

Dex (37:59.999)
And your rule is just like a string is like, Hey, you must not include addresses or something, right?

Vaibhav (38:05.115)
Yeah, and this is really specifically, I would say, generative rule. Name, string, description. And possibly examples. And then this would basically do it for you. And I'd come up with probably some way to print this that's probably better. Hold on, name, description.

Dex (38:14.766)
Give it like name and description. Examples. Yeah.

Vaibhav (38:28.291)
and I do this.

Vaibhav (38:32.999)
Example one.

Vaibhav (38:37.959)
And I would just dump this out. And that's how I would build the rule. And it just wouldn't be that hard. This should mostly work. And then what you could do next is you could make this an array. And then you could basically get... Yeah, and then you just turn this to an array. now, again, this is just based on how good the models are. The better the models are, the better this gets.

Dex (38:47.502)
and then you could loop over all the rules.

Dex (39:01.3)
XML? Let's do XML, dude.

Vaibhav (39:03.38)
you like XML? Honestly, I think, I just do this. And like this, this works really well, in my opinion.

Dex (39:06.176)
I love XML.

Vaibhav (39:18.703)
And this works really well.

Dex (39:20.44)
Can you write a test? we, can we like, can we actually like run this end to end?

Vaibhav (39:25.473)
what I do is string and then I would probably alias this to like ID so the model thinks of this as slightly differently and then it just like comes off as an ID yeah let me do like this

Vaibhav (39:46.235)
All set.

Vaibhav (39:54.224)
We're really trying to do some PIA redaction, so we want this to be quite good and handle some weird edge cases as well. So for example, what's an example of a gendered rule? It would be something like the text street addresses, which RedEx would fail at. Give me five or six examples of gender rules and a couple test cases for them.

Dex (40:13.154)
Gotcha.

Vaibhav (40:15.143)
Yeah, okay, I'll write some. While this is writing, I suspect that this will probably just work, but I want to go talk about some of the questions that people had, which was like, why do I believe that check redaction would work? Well, I think the best analogy for this is actually like data labellers. like, scale built a whole business model on this, which is, it's fundamentally different for a model to label something than it is for someone, something to check something. Checking and labeling are two different tasks. The redact method is a labeling task.

The check method is a check task. You're validating. It's not to say the model cannot catch it. It's just spending intention in different ways to do different kinds of tasks. like humans are very, very similar. Answering a multiple choice question is very different than grading a multiple choice test. So that's why the check-redact method is likely to capture something as an eval system as it won't. That said, of course, it's an LLM. It's a probabilistic system. So it might also fail. So you have to...

You kind of have to build evals on top of evals on top of evals. And at some point you're just like, okay, we trust the system enough. It's like distributed systems. You build fallbacks on fallbacks and fall off and system fail. Like that's good enough. And that meets our requirement. And then you stop. And then the way you check for this is you just AB test all the time. So you just sample like 5 % of check reduction and be like, Oh, is that actually a correct redaction? Like did there are check redaction system fail? You just spot checking all the time.

Dex (41:35.746)
You're just spot checking it all the time or you're like doing the thing we did in the eval's flow, right? Which was like the, you snap, you snapshot the results of different cases and then you eyeball the diff basically.

Vaibhav (41:48.142)
Exactly. And you just do that over and over again until you find pretty good confidence there. And then someone asked, why is this different than LM as a judge on an eval? Well, it's not really about LM as a judge. It's about where are you running this in your orchestration system. LM's as a judge are just functions that you are running on your data. It doesn't matter. But what we're really trying to say is...

I don't want to run this in my main control loop. I want the data to come to some data storage layer. And then I want to trigger the system more like a post analysis system. If it runs in my main prod loop, my users get a degraded slow experience. That's really the more important part about how you architect this over everything else.

Hopefully that answers questions to folks out there. And then which model do I recommend running locally? Honestly, just depends. Local models have gone so good. I've seen people use 3D models, 30D models. I could swap this out to a local model actually really fast if I have one running. I think I...

Dex (42:48.436)
You even had that customer that was doing like specifically for classification was like, actually swapped in a like CPU running like classical ML model that was just like, okay, the top thousand cases just run on my CPU and it's custom. then the 5 % of other cases get shelled out to like a GPT.

Vaibhav (42:52.856)
1D models.

Vaibhav (42:56.568)
yes, yes.

Vaibhav (43:06.865)
Yeah, so I have Olamajama 3, so we can just see if this works. Where did that? yeah, it wrote a bunch of test cases for me. So let's go.

Dex (43:13.697)
yeah, can we run one of these? I'm really interested to see, kind of, like, of course it's like LLM, just like so much content. I'm like, just write the one test and then I'll tell you how to write the next one.

Vaibhav (43:16.775)
from all.

Vaibhav (43:24.945)
So this is like clean method with tricky words. Let's look at this one. made a couple of rules spelled out numerics, the text, phone numbers. And again, like why are we doing this? It's like, how do you regex this? You can't, if you really want to ban phone numbers, you really can't. Go to.

Dex (43:41.634)
This is like when people put like namespace at space the company I work at dot com. Like because they don't want any bot to come and find their email because everyone's regexing and it's like people find ways around this stuff to share emails.

Vaibhav (43:53.252)
Exactly.

Vaibhav (43:57.677)
Exactly. So like, basically, if you really care, you kind of have to build this and like, we're to see what this broke. So this was the input, the quarterly revenue report showed Q3 at a 12 % increase in enterprise segment, the Virginia office outperforming patients. You can clearly see how you may not want to leak some of this data if you're building like a financial firm. We've seen no risks.

Dex (44:16.362)
Implicit location fingerprinting. Wow.

Vaibhav (44:19.588)
Yeah. And it's, again, it's like, this is a rule that a human wrote. You can imagine a human writing something like this, the idea and everything could be defined. And if we go read the actual rule.

Vaibhav (44:33.124)
you can actually read the rule like they added a thing called like implicit location fingerprinting right over here and it says

Vaibhav (44:45.186)
It says identify a specific person's location without a formal address. So it's specifically talking about no formal address and like, this likely will leak the, if you know exactly what company's talking, then you know what the Virginia office is, almost definitely. All right, exactly. And like clearly,

Dex (45:00.502)
Right, because that's probably could be found publicly on the internet of like if you company name Virginia office you can.

Vaibhav (45:07.482)
Yeah. And then you're reading this one, like partial identifiers in context. Like this one is kind of looks kind of garbage. Like this isn't actually identified like remaining invoices account signed, but they don't really have the data about them. like clearly this

Dex (45:18.318)
Okay, so you found a bad extraction. How would you iterate on this? How would you go make the prompt of the rules better?

Vaibhav (45:22.182)
Oh, how would I edit it on this? Well, what I would think about here is I'd be like, okay, well, if I have partial identifiers in context, like what's the problem here? The problem here is like, I'm actually not detecting. What am I doing? Let me, I have to read this a little bit more carefully. Detecting generic things.

Dex (45:37.964)
Yeah, the question is always like, is the rule dumb or is the execution of the rule incorrect?

Vaibhav (45:47.567)
Generic words don't leak information, but specifics do. Okay, so let's try running this again. Whoops, I pressed an enter there. We are working on making the compiler better for this, actually.

I just see this, I'm like boom, it's gone. no, it says this here, what was the previous one? Let's see what says.

Dex (46:11.02)
No it's not.

Vaibhav (46:16.774)
Oh, it just removed the none. I don't really care about that.

Dex (46:18.912)
says risk. you probably shouldn't have a risk level none because then it's going to pick out stuff that's not actually risky.

Vaibhav (46:25.784)
Yeah, well, it's going to bias. The reason I put that in there is I'd rather computer wise remove that out like programmatically. Yeah, because if I don't add a none option, then the LLM thinks it's bad.

Dex (46:32.664)
and then you would filter that in the explicit color. Yeah, yeah, yeah. Okay.

Dex (46:39.608)
Yeah.

Vaibhav (46:43.014)
I would do this actually. I might actually consider this way. Maybe you only want to risk high and not, cause that might actually like prompt the model in a better way.

Dex (46:50.986)
Right. And you could do like a discriminated union of like, is risk versus is risk false and then different fields required in either case, but this makes sense.

Vaibhav (47:00.894)
Exactly. And then if I go read this, I can also do something kind of nice, is, do that in a second. If it produces a none, I can just drop all the developments really fast. And let's just look at which one, unconventional addresses, Virginia office, that's probably correct. And then partial identifier, so we got rid of this one, and then puts a location, following and printing. So like this is, there's two, we got rid of both of them by removing the none and the medium.

Dex (47:20.429)
Yep.

Vaibhav (47:28.39)
And that's kind of how I would iterate. I'd be like, oh, the medium risks don't really seem likely. I really only want high risk scenarios. So I would just produce that. The second thing I would do if I wanted a medium risk, because I'd just run a second prompt on this and say like for all medium risks, run a second analysis to go see if these are real leaks or not.

Dex (47:44.643)
decide to bucket them again into more things. I'm actually talking about this at the coding agents conference later today in Mountain View of the idea of people hear about context engineering and they think about, people think about context and the rag and retrieval and how do we get more information? Or, if I'm giving the model too much information, then I'm not doing context engineering well.

Vaibhav (47:48.813)
Exactly.

Dex (48:13.368)
But it's also about like, and actually I think more importantly is about the number of instructions. Like you have an information budget in your context window and then you have an instruction budget. And the more like rules and instructions you're giving the model to all follow at once, the less well it can attend to any specific one.

Vaibhav (48:32.942)
And this is kind of the analogy. Like I'm really just bouncing, right? So like when I first have, when I first have like, when I first have like this medium thing, what I ended up having is like, this where I have too many false positives. Then I add another layer where I basically rerun all the medium risks and check if they're actually, they're more none or more medium. And then, then I remove some false positives. So if I have too many, I just add a step that removes them. And now I've removed them. You're just layering code on top of itself. So like,

find the right balance point to where you want. And like the balance point is likely going to be like somewhere over here in this case for this example. So I want to kind of move. I'm moving the system and if this still has too many false positives, then I just had another layer over here that balances me from here to here by adding another step along the way. Does that kind of make sense?

Dex (49:24.462)
I see, I see, okay, so you kind of are like narrowing, you're almost building this like funnel where it's like, you do the, chip off, you have the, like when you're chiseling marble, right, you have the big hammer and then you have the little hammer and then you have the tiny little like polished cloth basically, and you're just refining and refining and refining and trying to get it to the point where like you hit that sweet spot.

Vaibhav (49:36.9)
Yeah.

Vaibhav (49:46.636)
Exactly. And this is kind of what I did to make my life easier. I was like, okay, well, I tried one thing where I was like, do I actually need medium? I was like, maybe not for this example. So I just removed it and it worked and I just run more test cases and see, but maybe I do need medium for some scenarios, in which case I would just add another layer. And now I just move backwards this way.

And that's kind of the thinking behind this, if that makes sense.

Dex (50:10.018)
And you would each one of these is kind of a separate prompt in your pipeline, basically.

Vaibhav (50:14.371)
Yeah, it could be a prompt. can be an agent loop. really depends on how you frame it. But if you're bouncing between systems, this is kind of the idea. You're just slowly narrowing and giving, giving every subsequent step less and less context, but more and more specific context.

Dex (50:27.692)
And then Hanyi has a great question, probably for another episode is like, how would you do PII redaction in other modalities? Like if you wanted to use an LLM to like blur out like sensitive fields on an image.

Vaibhav (50:41.125)
Um, that is a very hard question. I don't know if we have generative models that are perfectly good at this yet, sadly, but what I, you can just use, like, I would probably use like Google's image, Magin models and just see if they can like blur out section of an image. And what you'd build is you'd build the same reduction pipeline, but this is like, uh, this is actually, um, this is actually the wrong name for this. Let's rename this.

Vaibhav (51:08.655)
This is more of a... why did not work? Detect. Redaction. This is more of a detect redaction pipeline than it is anything else. If that makes sense?

Dex (51:17.9)
Yeah. I mean, what if you were to like kind of take the image and ask a model to like detect all pieces of text that needed redaction and then you feed it that to another model that could draw bounding boxes in the thing for where that text is and then you could have deterministic code that basically just like blacks out those sections.

Vaibhav (51:26.233)
Exactly.

Vaibhav (51:37.519)
That's the next way to do it as well. That's one way to do it. You can also, if the image models get better, then what you can do is you can say, detect all the things that are like leak risks. And once I have all the leak risks, send it to another model that takes all these leak risks and produce an identical image ahead of time. But that has some funky things because you're really changing the original model. The bounding box one will be a much more robust approach to solving the same problem.

Vaibhav (52:01.677)
And that's kind what I would do. Any other questions as we're chatting about this? From anyone else in there?

Dex (52:01.976)
That makes sense.

Dex (52:08.142)
Alan asked the exact question, don't you get bounding boxes on the OCR words? So then yeah, once you have bounding boxes, then you're ready to rock.

Vaibhav (52:13.224)
The problem with using OCR is if you're using OCR here, you run into a problem where you don't get the benefits of LLAMs as they generate redactions because OCR doesn't work in that way. And the minute you turn a piece of image into OCR, you lose structural sentiment. For example, I'm going to take a screenshot really fast of this.

Dex (52:38.39)
Right, you're just going to have the raw text and not the sections or the ideas or the hierarchy of this thing, right?

Vaibhav (52:45.549)
Exactly. Like you don't, you, you just get the text. You have no idea that, these buttons are unique buttons that just lost to you. They kind of just reads as prompt. Carol. And now you have to build heuristics to say, if this thing is like next to itself, then it's probably in the same sentence. And in this case, they're not in this case, they're not in this case, they are. So you end up building these weird heuristics.

Dex (53:02.604)
Yeah.

Dex (53:06.552)
And we talked about this in the, we did a PDF episode where we went super deep on like multimodality and the different techniques and like, I don't know, know, I

can't tell that story. Damn, I know someone who's gone really deep on PDFs recently and is like, basically using an LLM to do like slightly more expensive but poor man's OCR, like a really small like model design for this, like PDF to image and then use an LLM to OCR the image to text.

Vaibhav (53:36.921)
Yeah. I would much rather use all on for this. The other thing that I would recommend is that when you watch our dynamic video that we did recently, these redaction rules can actually be built dynamically. And like, as we're building out these rules, you'll notice that there's these kinks, like maybe sometimes someone wants high, low, maybe users want to define their own type of risks. Maybe they want to define their own category of genetic rules that behave in interesting ways. You can use a dynamic type system to go solve for that. Like for example, go ahead.

Dex (53:43.95)
Yeah.

Dex (54:02.934)
Or you could even, so like dynamic type system, okay sorry, keep going. Like yeah, dynamic type system is part of it. The other thing you could probably do is you could inject, and this is what you talked about dynamic rules, but like you could have dynamic generative rules, which are basically you take information about the user, you tell the LM, the user's email is this, here's where they live, here's their phone number, et cetera, and you say.

you basically like do a different prompt per user based on their information to make it easier to find that user's PII.

Vaibhav (54:34.72)
Exactly. Like it's yeah, exactly. You can basically be like, can offload the dynamic data to your system. So let's say you're building a sys admin company whose job it is to help companies like major enterprises using cloud code, prevent their keywords from being leaked into the system. Well, you can build this system, but then you can give them a user like company controlled category system where they go add categories dynamically based on what every company has. So some companies might be like restricted keywords.

Some companies might have like super mega sensitive, be very biased on this rule. And instead of adding descriptions here, they can actually define categories of leak categories that they care about rather than you categorize them as like five to 10 hardcover categories. They can define new categories. And this, this is really how you go to the next level, which is you build infrastructure, you build this bouncing pattern, you build all the code around this for all the shapes and the data are owned by the, by the company that you're selling to.

And that kind of makes sense. Like the rules, the categories, the hierarchy of logic is owned by them, but you own the control plane for how everything runs. You own the control plane for like when this bouncing happens and doesn't happen and you're still liable for accuracy, but you give them like knobs and probes into the system to get exactly what they want every single time.

Dex (55:56.631)
And this maps onto the concept from the, it was like the doctor note take intake thing where you maybe want to give some UI to a knowledge worker to kind of explain their schema and configure the schema that they want for the extraction. This is that same concept again, but for letting them configure what is, what is sensitive.

Vaibhav (56:18.176)
Exactly, exactly that.

Dex (56:20.908)
What's an example of a user defined category? like, I'm trying to like rock, and maybe it's just because we've been talking for an hour, but like, what's an example?

Vaibhav (56:24.739)
Bye.

Vaibhav (56:29.284)
I think for example, like Q like magic, what's it called? Like magic, how to describe this, like project names. Some companies use secret project names as a part of their system. That's, that's, that's a keyword that you want to have. And some companies don't care about that stuff. bet some companies deeply care. And like, you might want to have like composable things. Like remember in the doctor scenario, I said, you want to tell the doctor, you want to have a field that you can be a bulleted list.

And under the hood, means string array. But from a doctor's perspective, you're just like bullet points, which they understand. So you might have a field here called address, but you may not want the, you may not want the company, the knowledge worker to define what an address means. And you might want to say it's like individual, like individual addresses versus business addresses. You don't want them to think about that. You're just like, you want to redact this concept. And like, yes or no. So you're kind of building bin building blocks.

Dex (57:04.898)
Yeah. Yep.

Dex (57:14.231)
Okay.

Vaibhav (57:26.904)
but also giving them the ability to build their own building blocks for new things that are very, very specific to them. So like,

Dex (57:33.74)
I see, okay, so they would write the name and they would write the description and they would give some examples and then they would add a category which is like an enum that they manage which is like, I don't know, my mind is jumping to like Jiren linear where you can like create labels and you have like a set of labels that are accessible.

Vaibhav (57:37.092)
These are the traditional...

Vaibhav (57:49.111)
Exactly. Yeah. And you might offer some built-in labels like social security numbers, like it's like a true PII, which is like a description.

Dex (57:56.621)
Yep.

Vaibhav (58:06.03)
socials so sure or like It's like even this high-risk PII

Dex (58:15.51)
Yep. But then there's might be another one like the, we, in my platform, I need to redact out dietary preferences for some reason, which is like kind of personal, but like in my case, I want to make sure it doesn't.

Vaibhav (58:16.226)
Right? Like you might have these.

Vaibhav (58:23.265)
Ex-Exactly.

Vaibhav (58:27.936)
Exactly. Exactly. Things like that. Or like maybe you're building a thing for therapists and you want to make sure like specific, patient traumatic events don't Right. And like, how do you define trauma? No one would define that, but like you as a category need like trauma oriented gender rules. You might have five rules under the trauma category that are like special. So it's things like that, that you really want to expose. like whenever you're building these systems, like phase one,

Dex (58:50.328)
Yeah.

Vaibhav (58:57.54)
build the system independently. Don't think about your end users. So you're going to build this detect redactions function. And after you build the detect redaction function, the next thing that you want to build is test cases. And the next thing you want to build is like this check redaction function. And you want to have this running. So now you have a loop that's running in prod that detect redactions run stuff and then periodically runs check redactions on X percentage of your data and gives you an eval suite to constantly add more and more test cases. Once you've built, go ahead.

Dex (59:25.646)
would you use a smarter model in check reduction since you're using it low volume? Or how would you think about that trade off?

Vaibhav (59:34.028)
I would just spot check and just look at the quality. It's like you're, you don't need to build evals for everything. Like many times you can just look at a hundred samples and be like, is this roughly what it is? We know redactions is a constantly moving target, but check redactions are like pretty well defined. And like, you'll get a sense if you're looking at the data regularly, you should get a sense of if check redaction is working or not without building evals, just because you're going to be looking at the data at some cadence anyway. And if you're feel like you're

Dex (59:59.841)
Yeah, I could see a system where like it checks the redactions and rather than returning a bool, it returns like, here's the one that looks iffy either like it's too aggressive or it's not aggressive enough and just sends a slack message and be like, Hey, we found this one. then like give the user a UI to be like, no, it's fine. Or like, yes, add this to our eval suite. And then you get a PR and then someone can go iterate on the prompt to make sure that that pass is consistent.

Vaibhav (01:00:23.775)
Exactly, exactly. Or you can do the thing that Google did where you could run on the cloud and you can pull the real customer data and run the system, but you can't access that. You can't pull the message locally. So you get a unique ID of a new check reduction system. Regardless, once you build the check reduction system, now you have this. And then you're like, okay, well, now we detect that certain customers are asking us for customer actions. And we can't keep adding customer actions every single time. So how do we give them the power to design their own reduction?

Dex (01:00:36.461)
Nice.

Vaibhav (01:00:53.015)
That's when you get to the next phase, which is you start designing dynamic, dynamic redactions, which aren't just like users adding names and categories, but you're giving them more control over like what redactions actually mean along the way. And then now you've built a full system because you, get check redactions. Now you expose your check redactions to your end users who are building dynamic redaction. Now you're basically, you've even given the feedback loop.

Dex (01:01:17.386)
and then you give them a pipeline to turn to basically give you feedback human in the loop, but you're making them do the work of like, yes, that's good. No, that's bad. And then you just kind of like store the results and then you can ingest them periodically and improve the system.

Vaibhav (01:01:31.479)
Well, you don't even have to improve it for them. You can actually just run check redactions automatically on all of these systems and all the rules that you have. And then you show the user for their defined categories. Here's some examples of recent redactions that failed. Are these good? Are these bad? Do you want to change your rules? Do you want to change your dynamic system to capture these better?

Dex (01:01:47.511)
Yeah, it's almost not like failed, it's like flagged. It's like, hey, we weren't 100 % sure about this one. Like, do you want to give this a new category? Do you want to say this exists as part of an existing category, et cetera?

Vaibhav (01:01:52.321)
Exactly.

Vaibhav (01:02:01.705)
Exactly. And that's kind of what you're building out here. So it's like a recursive system, but you're leveling up. First, you're doing it for yourself. Then you're empowering your customers. Then you're empowering our customers with the RL, with the feedback loop and like the control plane so that they can have iteration loop. And now you've become truly infrastructure and like, you're just moving bits along the way and letting our customers do the job they need to do.

Dex (01:02:23.896)
That's sick, dude. I love the journey we went on this one from like, regex out a social security number to like, build a system that lets your users define their own redaction tools and like an outline of how the UI would...

Vaibhav (01:02:40.225)
Yeah, and then there's another question from SnowRef. It's how do you do actual redaction? This is actually really easy. It's like function redact. So you basically give it leaks, leak risk as an input, and you just ask it to produce a new string as an output.

Dex (01:02:56.236)
Yeah, think I found the repo and I found the commit history, but GitHub is down so I can't go find the redaction example, but we should try to ship that. yeah, it basically builds a map of the mappings and then the model basically the extract, the thing the model extracts is like the key it replaced the thing with.

and then the actual data. And so you have this map where you can basically deterministically remove the data and you can deterministically swap it back in when you actually need access to it.

Vaibhav (01:03:27.907)
Yeah, I remember that code. That's what I was like. I really wanted to show that code. I just couldn't get it. I couldn't find it again. I was like, ah, that's unfortunate. But,

Dex (01:03:34.614)
You should open up Claude and the BAML examples and tell it to find the commit where the PII shit was removed. Yeah.

Vaibhav (01:03:40.065)
Yeah, it's probably in there. But the redact function itself just looks like this. You give it inputs, you give it all the leaks that happened, and you just ask it to rewrite the text and redact information from it, and it will do the trick. It should not actually... So there's like a couple of LLM functions you need here to make this actually work.

Dex (01:03:52.76)
Great question.

Dex (01:03:59.278)
Cool, we will try to find that code and share it out by the time the email goes out on Monday with this episode, we will try to find that code. Cool, I think we're at 105. Sorry we're a little late today, folks. Thanks for jumping in, and what are we talking about next week?

Vaibhav (01:04:16.447)
I we're talking about agents and skills.

Dex (01:04:19.15)
Oh my God, yeah, that's right. No. So I got really tired of explaining the difference between sub agents and skills and commands and how they all work and how they tie into context engineering. So we are going to talk about how all that stuff works and all the different ways you can combine them. And I don't know, we've already talked about like skills versus MCP. So we're not going to go super deep there. But just like, I think there's some, basic structural things to really like understand that we can dive a little deeper on of like.

how I kind of glue all those pieces together and how we've seen a lot of people who are really good at agentic coding kind of using those things and moving around. So, Matthias, you are on the Luma event, you will get an email of the recording. So thanks everybody.

Vaibhav (01:05:05.943)
Yeah, if you're on Zoom. And then stay tuned in end of March or early April, we're going to have an in-person event for those of you that want to attend SF.

Dex (01:05:14.412)
Yes, still locking down venue and dates, but the AI that works on conference, we're trying to do it March 28th, which is a Saturday. So if you're in SF, mark your calendar. If you're not in SF, don't buy flights yet. But we are working to confirm that.

Vaibhav (01:05:29.923)
Adios everyone, have fun, good luck.

Dex (01:05:30.968)
Thanks everybody. See ya.
