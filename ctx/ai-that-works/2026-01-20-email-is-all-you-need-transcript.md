Dex (00:01.878)
What's up?

Vaibhav (00:03.444)
What up, what up, what up? How's it going?

Ethan Byrd (00:03.869)
Hey-o! Going good.

Dex (00:06.222)
I explain to the guys that when we do a Twitter live stream, the first shot becomes the thing that shows up in people's feed. So you always got to make a fun face in the moment the stream goes live.

Ethan Byrd (00:16.98)
Vaibhav (00:16.986)
Dude, it's kind of wild that faces get views, but faces get views.

Dex (00:23.436)
Yeah, we should really get some better looking guests than you and me, Bob, to it.

Vaibhav (00:26.964)
We probably should just like, all we do is AI swap it out, man. AI swap it out. Nano banana in front, animated after that.

Dex (00:34.06)
Yeah, we'll get you the OBS streaming plugin that just replaces your face with a much more Chad version of yourself.

Ethan Byrd (00:34.451)
I should just be a VTuber.

Vaibhav (00:42.514)
That's right. Well, hopefully in about six months I'll be the chat version of myself. I've been going to the gym every day finally after a long time.

Dex (00:49.868)
I feel like I heard that a year ago, dude. I feel like you're like, I'm getting back into it. I'm getting a trainer.

Ethan Byrd (00:50.539)
you

Vaibhav (00:52.868)
last year I lied.

Yeah, last year I didn't actually do it. This year I actually got a trainer. I do too. I am too, I am too. Well, welcome back everyone. We're back to our regular show. We're going to talk about AI that works as we usually do every single Tuesday. I'm your co-host, Viveoff. I work on BAML, which is the programming language for building AI agents. And this is my co-host.

Dex (00:59.18)
I hope it works out this time. I'm rooting for you, baby.

Dex (01:21.796)
and I'm Dex and I help people solve hard problems in complex code bases with AI coding agents. And we build an IDE that is actually coming soon. The old one was open source. The new one is coming for real. I'm super excited. And we are joined today by a very cool person who I've known for a long time. And Viobov hit me up a couple of weeks ago. like, we're going to do any episode with Ethan about using AI over email. And I was like, this is amazing.

Like before we started doing coding agent stuff, I worked on email and like, how do we stitch agents in the email? So, super excited to have Ethan on.

Vaibhav (01:58.374)
I also heard some really fun news last night that apparently Dexter started using it already because it's so freaking good and it does actually work.

Dex (02:07.852)
It's good. Yeah. have the, deploying the Lambda today. I ran it. I set it up with ngrok on my local and, yeah, I got it so that I could, I think we did an episode a long time ago about like using Markdown as your CRM. And so, I mean, I can talk about how we applied it at the end. but yeah, now I can forward emails from people and Claude will read the emails and update Markdown files with the status of various things we're doing. And then, send me an update in Slack. It's sick.

Vaibhav (02:35.571)
Before we get into it, think let's just, want Ethan, I want to hear your perspective on something before Dexter and I share ours. When we talk about email, like what about email do you think makes it useful for agents? Cause I think when we think about agents, most people think about chat boxes, think about so many other mechanisms. Like why in your perspective is email good?

Ethan Byrd (02:36.755)
No.

Ethan Byrd (02:40.895)
Yeah.

Ethan Byrd (02:58.847)
I think it's like, it's not that email itself is that great. It's just that everyone uses it. It's already where people live. It's already where business data is. Like companies have been trying to not use email for forever. mean, email is older than the internet itself and it's just how, like, I mean, how often do you guys live in your Gmail app or whatever, wherever you guys use email?

Vaibhav (03:22.918)
Well, to be candid, we have a no email policy at our company. We only use Slack and Discord. I fricking hate email, but... But I do understand that when I was at DShawe, we used email exclusively for everything.

Ethan Byrd (03:26.898)
Amazing.

Dex (03:29.135)
Ugh, I would hate that.

Ethan Byrd (03:39.261)
No, no, I mean, yeah, it's just that like email is where people already want to do a lot. I it's like where I book all my meetings. It's where I talk to, you know, customers. It's where I like, it's just, it's just where like everything. And then for larger companies, there's also like compliance stuff. Like they need things to happen over email because they need that paper trail. Right. But it's just that like, it's already that universal communication layer, that method. Right. That's why it's like, it's, I think it's where agents are going to go.

Vaibhav (03:47.091)
That's true.

Vaibhav (04:03.036)
Okay.

And then when we talk about what makes email hard, what makes email hard for agents? Like when I'm an agent system around email, yeah, what's the hardest part?

Ethan Byrd (04:14.804)
The hardest part is that right now, if you need to build something with email, your only solutions are going to be things that like, mean, SES, like it basically puts the email into an S3 bucket and says, good luck, right? The other, the other, there's a lot of other incumbents. Yeah. There's a lot of other incumbents that have done a lot of cool things with email over the years, but they've kind of lost the plot, especially on developer experience. Like they became like marketing companies because they focused on outbound. Like they focused on like getting your email into.

Dex (04:29.505)
Been there.

Dex (04:41.279)
It's every.

Ethan Byrd (04:44.97)
not to spam. Like that's their entire business model pretty much.

Dex (04:48.491)
Every email company that I've ever seen, even the ones that start as transactional, they eventually become outbound. And like, I don't know if you've checked your email lately, but it's like, it's the founder of a SF startup. Like I get so much spam and automated stuff. And it's like, it's so lame that like the system is set up that incentivizes that, but we don't have to get into pontificating the future of JIT, but it's like, yes, all of these tools are designed to send emails because sending emails is also really fricking hard, right? You have to.

Vaibhav (04:58.349)
It's so freaking annoying. Yeah.

Ethan Byrd (05:08.458)
You

Ethan Byrd (05:15.656)
Yeah, yeah.

Dex (05:16.653)
warm up the IPs and domains and do all this demark and like, yeah, but it makes a lot of money. So people invest a lot in that. But yeah, I mean, even a year ago when we were building human layer, we did exactly what you said. We built a agents that can receive emails feature. Uh, that was like super janky at the time. had a couple of customers using it and it was like, yeah, it was like SES. We didn't even put it in S3. We put it on an, uh, on an SNS message because that was like less infrastructure. Problem is SNS messages have a max size of like

Vaibhav (05:18.148)
and profitable.

Ethan Byrd (05:19.773)
Yes.

Ethan Byrd (05:39.572)
Yeah.

Dex (05:44.371)
some number of megabytes and so most of the emails with attachments would just explode and it's just like all this infrastructure. So you can, yeah, can glue it yourself and like cloud can write terraform and it kind of works, but yeah, it's not, yeah.

Ethan Byrd (05:49.162)
Yeah.

Vaibhav (05:56.477)
So I've got a question. What I find, what I find actually the most interesting part about email as a medium for building agent six is something we'll show some code really fast everyone. But what I find really fascinating is actually the asynchronous workflow that it naturally forces you to think in. Like when you think of email, I think so many people, when they build like you a server side stuff, they naturally start thinking in synchronous workflows because they're like, my backend does something. Then I respond. I do streaming. It's all synchronous. But in the whole process, email, you almost have to build async systems.

Ethan Byrd (06:03.914)
Hmm.

Ethan Byrd (06:09.577)
Yeah.

Vaibhav (06:25.746)
You have to be like, Oh, I can get email and get a second email. That's like a, uh, you can't, because you don't own the UI, you have to design your system to be robust to that from day one. I think that part of agent design is really fascinating personally. And I think that's what makes agents good. Like what makes a chat? Like when I talk a stupid example, when I talk to a customer support rep, what makes it good? I can say something and say, oops, I messed up. meant this. And like, you can't, if I build my own chatbot on my own website, most agents,

Ethan Byrd (06:26.122)
No.

Ethan Byrd (06:36.105)
Yeah.

Ethan Byrd (06:47.21)
Hmm.

Vaibhav (06:54.894)
still can't handle that. Like, I don't know if you've gone to any, it's like cancellation interrupts, like, because like most people are like, I own the UI and there's so much work I have to do in the UI layer to bridge those systems together. But in the email system, it's actually, you have to do zero work because the UI layer does that for you automatically. But on your backend, you, yeah, exactly. And on the backend layer, you get the benefit of doing this where you just do it correctly the first time around. So I find that kind of fascinating about emails, to be honest.

Dex (06:56.886)
Like cancellation.

Ethan Byrd (06:58.419)
Yeah.

Dex (07:12.909)
but you also have constraints.

Dex (07:23.885)
And I want to throw one more thing in because I like, this is obvious to the three of us, but I don't think it's obvious. I had talked to other smart founders and like I was pitching them an email idea that I had for agents last year. and they kind of came with this take that I think probably a lot of people will feel was like, wait, email is for boomers. Like, why would I want to send an email to chat GPT and get an answer, even for deep research or whatever, like I'll just go to the website. And I think they're really interesting, like unlock here and we'll go over some of the use cases that you all built. The thing that I loved it for was for delegation.

Right? Like for me, like Slack is great for internal, but Slack is super chaotic. And I actually liked that an email inbox is like one thread where I can just go through things one at a time versus having to jump between channels and stuff. And the idea of just like, I got this note from a vendor. Okay. Can I forward it to an agent that will create a task for someone to handle it? Or like I got an thing from a customer. Can I forward it to an agent that will update my CRM? Like it's, it's more about delegation, I think then, some of it is, it's not all like.

Ethan Byrd (07:53.96)
Hmm

Ethan Byrd (08:05.066)
Yeah.

Dex (08:22.017)
fire and forget. Some of it is like, hey, this person hit me up, go research them and tell me if they're worth my time or not. You know what I mean? Or like, tell me who they are. You get a response and then you know how to reply. There's all these things that I think when you embrace async, can, there's like productivity goals, productivity things you can unlock when you can like burn down a backlog quickly without having to like actually go do every task.

Ethan Byrd (08:28.254)
No.

Vaibhav (08:43.538)
I completely agree. Well, with that, let's get to code. Cause I think code is the most fascinating part. All right, Ethan, let's get the screen share going. Let's first, let's see what you built. and I know I think you said this is going to be open source, by end of day today. So

Dex (08:48.973)
Let's do it.

Ethan Byrd (08:52.605)
Yeah.

Ethan Byrd (08:57.416)
Yeah, so we'll just go over what kind of the site that I built to kind of show off. Let's see.

Vaibhav (09:05.2)
Email. Yeah.

Ethan Byrd (09:10.568)
Okay, because of Max's permissions, I'm going to have to rejoin this meeting, of course. Classic. All right.

Vaibhav (09:14.738)
Dexter, while he does that, got a question for you Dexter. So clearly you thought about working on email, why didn't you double down on email?

Dex (09:17.056)
All right, Ethan's coming back.

Dex (09:28.567)
I found a thing that I was more excited about, but I'm still very excited about email. I just, was more excited about the other thing. Welcome to being a founder.

Vaibhav (09:37.093)
Yeah, I agree. I always found that really fascinating when I thought about email. once I, I think just UX workflow, I think that was the first thing I told you when I heard you were working on email stuff. Like email is just a new UX. Like whether it's email, SMS, there's like some inbound channel that agents need. And just like when I go on a website on my mobile phone versus my browser, I want to see it differently. I want the agent to respond differently. You basically kind of need a bunch of ingress channels for your agent to say, I need to accept email. I need to accept Slack message. I need to accept.

text messages and you got to build the chip. You got to kind of build it. You got to build the system for all of them. And if you don't build all of those inbound channels, like your agent just kind of sucks. It's like, imagine having a website that only works on desktop. It would be crap. Imagine having a website that only works on mobile. It would also be crap.

Dex (10:06.689)
Meet users where they are. This is 12 Factor Agents.

Dex (10:24.161)
Yeah, I think, I think also AI unlocks some really interesting new modalities of like, could build in an application that only works over email. Like I sent an email to a service and that's how I sign up and I get an email back. And like every time I communicate with this thing, instead of having a dashboard, I go to the footer of the email just contains like the like main, like stats links, whatever it is. I, I've prototyped an app that I never ended up shipping, which was like a dinner scheduling app or literally like the way you do it is you send you like

Vaibhav (10:33.747)
yeah, what the?

Dex (10:51.787)
You send an email to a thing and then it tells you what dinners are coming up and then you tell them, say the ones you want to RSVP to it. It like manages all the state internally, but the only UI is email.

Vaibhav (10:58.554)
Yeah, exactly. Yeah, for a lot of things it's great. Ethan, let's get back.

Dex (11:03.627)
And like, don't know if you guys know Attila, Attila from Bond book. he built a travel agent that works over email. Like you log in and you put in your credit card and then you never use the website again. And you just say, I want to go here. And it comes back with flights and you can go check them out. Anyways, let's, let's do code.

Ethan Byrd (11:11.643)
Mmm.

Ethan Byrd (11:19.652)
Yeah, so let me just show off what I built to kind of showcase how easy it is to build stuff with email now. So this is email works. These all work. You can email these right now. So there's a few basic ones with AI. Of course, it uses VAM1 to the hood, because why would you use anything else? And so you can forward any email or forward anything to it. You can get a TLDR. You can parse a PDF or something like that, get structured JSON out of it. This is something that like

like receipts at Mercury uses. Like if you've ever used that, it's like actually magic. Like you can forward a receipt and it automatically like attaches it to the expense or whatever. You could build one of those very easily with this. And then, you know, uses like OCR, fun stuff. Verify is really cool. This is how we use like DKEM and SPF and DMART to know if that's like that. So if you've ever gotten like a phishing email and you want to see if it's legit or not, you can just forward this to verify. And I will tell you if it's legit or not.

Vaibhav (12:14.539)
And all of this is open source? The code for this is... Nice.

Ethan Byrd (12:16.668)
I will open source all of this, yes, absolutely. And then I made these two fun things very quickly this morning, so we'll see if it breaks. But I made ideas, so you can actually email ideas to emailworks, and if it's a legit idea, it will actually go to the ideas page. I don't know, I just emailed some sort of emails. So once again, try to break this, it'll be fun. And then, what do you want?

Vaibhav (12:36.217)
You

Dex (12:40.225)
You know what I want? I want a to-do list. Snooze is kind of like this, but every time I forward it, I want it to like log it and then send back to me my list of to-dos. And then I could reply and be like, those four things are done. And it just keep, yeah.

Ethan Byrd (12:52.506)
Yeah, you could build that super easily with this. and no, that's like, so the gist of why this is cool is that it's just really easy. So if you wanted to build this today with anything else, it just would be very, difficult to get the email data that you need without having to call a bunch of extra APIs and you can't even get the raw email from most of the incumbents. pretty wild. The reason I built this truly is because like,

it didn't exist already. I could not believe that everyone had made it this hard. So yeah, like I'll show off the code for this real quick as well. I am not using SCS under the hood from the chat. This is my own Mail Transfer Agent. It's the only way that I could make it where it actually works.

Vaibhav (13:34.994)
Okay, so I have an idea. Let's do something really quick. I'm gonna screen share. I'm literally gonna send these emails out to this and just see if it works. You guys are gonna see my screen and my email, so we'll see how this goes. Okay, so I'm just gonna send this. Do I just forward it?

Ethan Byrd (13:42.65)
Let's do it. Let's do it.

Dex (13:43.967)
I just tried snooze, it's dope.

Ethan Byrd (13:51.332)
boy. boy. Be careful, bro.

Ethan Byrd (13:59.995)
Yeah, can forward it. And then if you want Verify to work very well, you'll have to use Gmail's forward as attachment, because that's the only one that preserves the full decant header. I can still get some data out of it if you're using Verify. But everything else, you can just do a normal forward. It works perfectly fine.

Vaibhav (14:11.535)
guys.

Vaibhav (14:17.009)
I'll just do a normal forward and we'll just try verify at email.works. That's it.

Ethan Byrd (14:23.611)
Yeah, and we'll see what it does.

Vaibhav (14:26.777)
Okay, let's verify this email. Let's do another one. I'm not going to go through DocuSign.

Ethan Byrd (14:32.719)
Forward like an image or like a PDF or something.

Dex (14:34.582)
Do a, or like you can do a snooze. could.

Vaibhav (14:35.569)
So extract at email.works. Okay, do that.

Ethan Byrd (14:42.307)
Yeah, let's see if it breaks it. See if all my changes this afternoon broke it, or yesterday.

Vaibhav (14:52.561)
What email do I want to show? That's a real question here. I probably have some emails that have images sent. Oh yeah, my eat sleep wasn't working. That was very sad. Okay.

Ethan Byrd (14:54.542)
Huh

Ethan Byrd (15:05.785)
You should have the response to the verify one that you said.

Vaibhav (15:09.361)
Right here.

This is legit. I wish it. Go ahead.

Dex (15:12.268)
legit confidence 70%.

Ethan Byrd (15:13.787)
Yeah, because once again, if you just forward it, I don't get the full headers. It's just how Gmail works. But yeah.

Vaibhav (15:20.303)
Yeah. I mean, this is probably a legit email. just want to, I just want to, they're just spam. So I want to delete that cause marketing email.

Dex (15:26.156)
So you could do like a snooze like, remind me to tell this person to go away.

Ethan Byrd (15:31.897)
Yeah, absolutely.

Vaibhav (15:33.633)
at snooze at email.works until this Friday.

Okay. Has the extract email come in yet?

Dex (15:50.038)
Amazing.

Ethan Byrd (15:53.718)
It has not. Let's see if it died for some reason. Who knows?

Dex (15:58.303)
Open source, folks. It's not a real AI that works if we don't hack around on the code live during the episode.

Ethan Byrd (15:59.727)
Yeah, we will.

Ethan Byrd (16:08.111)
Yeah, I can show you the code for it as well and we'll see what happens.

Vaibhav (16:08.389)
Yeah.

Ethan Byrd (16:13.531)
and try to debug if there's a problem with it.

Vaibhav (16:17.345)
I'll stop screen sharing. I'll bring it back up if it ever runs. Why don't we look at the code? Let's see what it looks like. Cause I think I want to understand how this stuff works and actually go through it.

Ethan Byrd (16:23.163)
Yeah.

Yeah, absolutely. Let's do that.

Vaibhav (16:29.915)
Best part about being open source is we can actually talk about the code and go into it and like look at it.

Ethan Byrd (16:34.681)
Yeah, and I will, like I said, I'm open sourcing all of this. I just didn't get a chance to fully open source it yet. Cool. So.

Vaibhav (16:41.563)
Please no send grid. There is no send grid. I know that much for a fact.

Dex (16:44.236)
Dude, I tried to sign up for SendGrid while I was in Paris and my account got blocked because it was like, you don't look like, and then like, you literally like can never log into SendGrid again. You have to make a new account.

Ethan Byrd (16:45.004)
No.

Vaibhav (16:54.577)
Can you zoom in for me, by the way? So perhaps the thing that I'd love to see is let's just go see the, let's walk through the code of the extract agent.

Ethan Byrd (16:55.259)
Yes.

Ethan Byrd (17:08.003)
Yeah. So let me just like to get there, right? So there's a lot, there's, there are a lot of stuff here just cause I'm going to open source this. And so like, there's just a lot of, you know, logging in a bunch of extra crap, but this is literally it. Like this is like, this is all the code that you need in order to get the, like the handle, web hook event with my Mac. So I spent a good bit of time making a kick-ass TypeScript SDK. And so under the hood, like this handle web hook will give you, you have, just have to pass your secret. It's just your.

API key effectively and then the headers and I verify the header. I make sure that it's all, it's all legit. And then you actually get like this full fancy email received event type. Like there's no nonsense abstractions. There's no weird names of anything. It's just, it's exactly what you would expect from email event. And then once we, you know, we just have like a gigantic switch statement on, on that. And then we have our agents. like, for example, in the extract agent,

Vaibhav (17:55.451)
Okay.

Vaibhav (18:00.173)
Let's, let's just go straight from the top. Let's go to, let's go to switch statement and walk our way through it. Just so I think I like, so we have the headers up too. So you see exactly here setting the agent too. And then you basically have like a map of agents. Yep.

Ethan Byrd (18:04.557)
Sure. Yeah.

Dex (18:04.714)
Yeah, I want to see the switch statement.

Ethan Byrd (18:10.235)
So that's how I figure out that. Yeah. So here you go. Yeah. So we determine what the agent is. I've been adding a bunch of them, and I'll add a bunch of them, and you can deploy your own of this and add whatever you want. But we're using magic strings here. We're not afraid of those. so for the extract, we determine that it's the extract. so the easiest way to do that right is like.

Just read the emails. Like I said, you get these full Zod validated types at runtime, so you can understand where... This is how easy it is to get the two header on an email with MyMax. And then with Detect Agent, we determined that it's the agent type from that. And so we go to this fun little... Is that our nested for loops. Once again, we're not afraid of nested for loops either. And your boy is a CS 101 question.

Vaibhav (18:46.864)
Got it.

Vaibhav (18:57.352)
got it, okay.

Ethan Byrd (19:05.915)
And then we do the loop. So we want to go to extract, and here you go. this is how like...

Vaibhav (19:16.325)
that's probably why it failed because I have no image attachment in the email that I sent.

Ethan Byrd (19:21.683)
if you were doing, I should have been paying attention. Yeah, parse is the one that will, I mean, it should have responded and told you that we didn't work, but we can figure out why that didn't happen. And we can also, we can change that right now. But if you want, so we can talk about, if you meant to do like a parse, we can go through parse. But parse is like the easier one, right? So this is, once again, this is how easy it is to download the attachment. Like this is like, don't, we don't do any weird nonsense. You know, we parse the attachments and we just give you like a signed URL to go grab it from. And then we also, you know,

Dex (19:22.252)
extract his images only.

Ethan Byrd (19:51.225)
have an easier way for you to grab those. And then in BAML, if you want to, so we can actually go to the BAML for this. Where did I put my BAML folder? Somewhere. Yeah, so, ooh, I'm showing Vibe off my BAML. Let's see how this goes.

Vaibhav (20:08.624)
I have no opinions.

Dex (20:09.631)
Yeah, roast his prompts.

Ethan Byrd (20:11.258)
So let's see. So we download the attachment, format the part. So we have to like, we we, you we format it a bit and then we go to beat up parse document. Yay. Right. So that is the simplest one. And then we'll find parse document in here. Parse document. Right. So this is my excellent prompt for this. And, know, with VAML, you just, can, you can pass it in as like parse content.

or you can actually pass it in as a raw PDF. So we actually do have the parse PDF as the well, because BAML has PDF types. So you can actually pass that in easily. And we're using 5.2 into the hood, but I have no opinion about that. You don't have to use that if you don't want to.

Vaibhav (20:56.144)
You can use any model you want. Nice. So can you show me the parse document structure? I'm kind of curious what kind of information you're pulling out of it.

Ethan Byrd (21:03.352)
Sure. well, so you parse document, like I let VAML decide or I let them decide like on how to get it. So like, you know, it's more of like an example of what kind of like JSON you could get from this. Like, so of course, like with VAML, like if you had a specific like a receipt flow, like you would make, you would obviously make your own interface, like just for like receipts, like things that you understand, right? But for this, like it's, this is kind of like me showing off VAML to be honest, because it's a way of showing off how like the,

the agent or the model can just determine magically what this JSON would look like, right?

Dex (21:37.811)
I had one of these that was like extract a schema that could be used to create a linear ticket. So I wanted to like turn a thing into a task and linear would extract, know, title, description, labels, assignee, that kind of stuff.

Ethan Byrd (21:45.4)
Yes.

Ethan Byrd (21:52.323)
Yeah, and yeah.

Vaibhav (21:52.592)
So then what we're doing here is we're getting the attachments super easily. We're getting the email data super easily. Then now it's just data shades. It's either a PDF type or it's a string object of some kind or an image object. Then I pass it to an LLM through some function and that gives me a new TypeScript record after that again.

Ethan Byrd (22:00.026)
Mm-hmm.

Vaibhav (22:18.031)
And then what do I do with the TypeScript record after that? So then you create a formatted email, looks like you have some way to render that.

Ethan Byrd (22:23.48)
Yeah, so there's a lot of ways, like I was saying, sending email, honestly, for a lot of it is a solved problem. There's a good bit of solutions for this. Honestly, some of them are still way overkill. I actually am using Resend for this project just because it was the easiest one for me to use right there. They've actually done a lot of really cool stuff with React email, and they did a lot of other cool things with all that work about making sure your emails get into inbox and stuff like that.

Vaibhav (22:31.417)
Yep.

Vaibhav (22:39.63)
Nice.

Ethan Byrd (22:50.586)
But yeah, so like we just do some magic. email HTML is just terrible. It's like a whole thing. But once again, Claude's very good at it. So who cares? And yeah, so we create this email template and then we just we send it back. We forward it back to the person.

Vaibhav (23:05.743)
so that's how this actually works. And then you just use recent to send. you basically, so the general architecture of this is how to draw this out is you have a web hook that you can register somehow that gives you a really nice clean email record. Then you have nice little APIs to go get like, to go get, like email bodies and content from the email for like in the form of attachments for basically for like long content. You don't want to fetch on every web request and you don't want the web to really give you cause it would be like megabytes long.

Ethan Byrd (23:11.096)
Yeah.

Ethan Byrd (23:15.534)
Mm-hmm.

Vaibhav (23:36.324)
and then you basically pass it to AI functions because AI functions are really nice transformation units, for doing arbitrary transformations. And you just create an email system. That's fricking easy. What the heck are we doing here? no, what I mean by that is like, that's really freaking cool. Like the fact that adding, I don't mean to be dismissive anymore, but what I mean is that now if someone wants to go build an email system for the agent,

Ethan Byrd (23:48.569)
Yep. I don't know, man. It's like, so like, like we can walk through like some of the crazy so like

Vaibhav (24:04.535)
it should actually be trivial for them to go do this is what I'm really hearing.

Ethan Byrd (24:09.026)
No, I mean, once again, I think this is where a lot of the best ideas came from, but I wanted to make an agent like this, and I had deep research on it, I had a bunch of other things trying to find a better solution to this, and there was nothing that just made it this easy. I was like, holy crap, I just want the headers, I want the raw email, I want the body, or I want forwarded information, I want to know if it's forwarded, how is there nothing like this? And there just wasn't. And so, yeah, this just makes it trivial to build any agents.

Vaibhav (24:36.672)
Okay, so I've got two questions coming from the chat. go ahead Dex.

Dex (24:37.771)
Do you guys want to do your questions? And then I think it would be dope to just like kind of whiteboard out at a higher level, how one or two of these works. And I can also share kind of how the thing I built on my MX works that I'm really excited, really excited to deploy today.

Vaibhav (24:54.745)
Cool. Let's do that really fast. So I think there's two questions that I really like. Is ingestion just everything at once or is it a pre-processing? Just the raw email with images and all that?

Ethan Byrd (25:08.814)
So, okay, so is the ingestion everything all at once? Is there any preprod?

Vaibhav (25:13.071)
I think the question that John is trying to ask here is, how are you doing this? And think the whole point of this is if you go back to your switch statement at the very top, I think the whole point is, at least from what I understand, correct me if I'm wrong, Ethan, is that depending on what tool you're doing, each tool, each action basically determines what parts of the email it cares about. So ingestion, for example, we saw in case of extract only looks for images.

Ethan Byrd (25:16.42)
Mm-hmm.

Vaibhav (25:42.839)
If you don't have an image and you pass it in, doesn't extract anything. Parse on the other hand, pulls out all the information from everything.

And I think that's kind of the point is like you, have access to everything, but you don't have to use everything. You don't want to. That's just control at that point, just code. You just write whatever code you want to get the data you want.

Ethan Byrd (26:01.537)
Yeah. Yeah. So like there, there have been like other tools that are like in this space, like people understand this problem, but like their solutions have been like just more abstractions. Like, you know, you call an API to create like an agent inbox and then link your tools. Like developers know more than you, like they just want access to the data and they'll figure out how to do it. So like in this case, like I just have a switch statement on the two header, right? Because I have specific tools for specific inboxes, but there's no inbox to it, right? You just.

you send it to verify at, I just, know how to handle that, but I could make a new one only in code, right? I don't have to create a whole new inbox for that. But like, if I wanted to make just an, you know, agent at email.works, and then I wanted to do a bunch of different parsing on the body, and then try to determine which actual agent to call under the hood, I could do that, right? Because like, everything is there for you to do that. the entire philosophy of MyMX is just like, I don't really...

Dex (26:45.834)
Right.

Ethan Byrd (26:56.265)
I'm not opinionated at all. I just give you all the data that you need. It's all parsed. It's in JSON, ready to go. And you build whatever you want to do with it. You know more than me.

Vaibhav (27:03.307)
It's kind of a... If you've ever seen Slack's webhook system, it's very similar to that, where Slack's webhook system just gives you a giant payload no matter what event they send you, and it's your job to build a system around that to do whatever you want with it. It's like one endpoint that...

Dex (27:03.563)
And you could...

Ethan Byrd (27:07.363)
Hmm.

Ethan Byrd (27:12.441)
Yeah.

Dex (27:16.725)
figure out who sent it, figure out what channel it was in, figure out whether it has an attachment, all of that. It's just like, you just get the whole thing. And like, guess, yeah, you could, you could riff this to just like have the entry point be agent at, and then use another structure generation to decide which like code paths you wanted to route it to, basically. You could say, this looks like an extract request. We're going to go do extract.

Ethan Byrd (27:18.584)
Yeah.

Vaibhav (27:23.702)
Exactly.

Vaibhav (27:35.896)
Yeah.

Ethan Byrd (27:38.669)
Yeah, yeah, 100%.

Vaibhav (27:40.301)
Yeah, like the switch statement doesn't have to come basically based off the two header. It could be based off of an AI. It's like, even, even though I sent extract, you could actually reroute at the parse. Cause you're like, there's no image, there's no image here. You could have done that for example, in this code, even though the user kind of messed up effectively.

Ethan Byrd (27:54.711)
Yeah. Yeah. Like, yeah, 100%.

Dex (27:56.875)
Yeah. So there's some questions about like which parts of this is SMTP, which parts are recent. I think it would be helpful to kind of draw the architecture of like, where does the black box of something like MyMX, like whether it's MyMX or anything else, like what is the problem to solve by that black box?

Ethan Byrd (28:01.657)
Mm-hmm.

Vaibhav (28:06.668)
Yeah, I agree.

Vaibhav (28:10.646)
Okay, before we do that, I think we're saying a word a lot that no one probably has ideas of, like MyMX. Ethan, you want to screen share and maybe describe that a little bit? Like what part of this code is MyMX? What part of this is your code? And then kind of just hook that up. So it looks like all of this code is open source and none of this looks to be MyMX. And what is MyMX?

Ethan Byrd (28:16.749)
Hmm.

Ethan Byrd (28:23.341)
Yeah. Yeah. So.

Ethan Byrd (28:30.529)
Yes, exactly. So let's see.

Yeah, so my MX is what is the ingress layer for email basically. like to answer someone else's question, like is this running as SMTP server and extension? So I use recent for only for outbound, but inbound, which is the problem that my MX is actually solving is is it is my own server. Like I have a VPS behind an ALB and it's running post fix and it's running the mentor. Like it's it's actually you know, parsing.

Full SMTP, it's responding with SMTP return codes. Like it's all SMTP under the hood, right? So like I had to build my own mail server for this because it was the only way for me to be able to get the data that I need from this because even SCS is just terrible. Also like latency, there's no way that I could be a wrapper around anything besides just running my own mail server. And so what is MyMX? It's like all you have to do is you give us an MX. So as Dex actually pointed out yesterday, you technically need to give me a text record too, sorry.

It's not just one MX record. But you give me one MX record on whatever domain you want and you can do it on a subdomain and I will support like wild cards for subdomains. And so you can give me one MX record on that domain, tell me a text record. The text record is just so that my MX knows like which my MX account is linked to that specific MX record. And then you give me a web book and then bam, everything is just there.

Dex (29:56.181)
Show us, show us, you're talking about DNS records. Show us where we set up the DNS records. Go to the app and show me the page.

Vaibhav (29:59.119)
Okay. Yeah, just let's just.

Ethan Byrd (30:01.196)
So do one of you guys want to go through the onboarding for this? Or do you want me to do it?

Vaibhav (30:05.07)
No, just do it, just do it, just do it.

Dex (30:06.75)
Just show us the thing. I'm just going to you're talking a lot and we're looking at a thing that has nothing to do with what you're talking about. So go to settings and show me the MX records stuff.

Ethan Byrd (30:09.271)
Okay.

Ethan Byrd (30:14.39)
Yeah, so let me just, I'll just make a new write. So if anybody wants to sign up in this SMTP is the worst is the beta code. We'll probably be changing that in a bit. But yeah, so like, you know, we'll create an account and do all this other stuff. Let's just do.

Vaibhav (30:22.018)
Hahaha

Dex (30:23.102)
Nice.

Vaibhav (30:30.99)
While you're doing that, is MyMax open source?

Ethan Byrd (30:36.504)
MyMax is not open source. Parts of it will be open source, more than likely, but that will be in a bit. So.

Vaibhav (30:38.051)
Okay.

Dex (30:48.556)
Okay.

Ethan Byrd (30:52.556)
you

Dex (30:53.426)
Yeah, sorry, was just trying to get the DNS records shown on the screen. I mean, we don't necessarily have to go through a full onboarding here.

Ethan Byrd (30:58.328)
Yeah, give me one second. I will actually go through the full onboarding, but just give me one second.

Vaibhav (31:02.956)
Yeah. I mean, you don't have to go through the full onboarding. What I'd love to see is if you log into email.works, I'm guessing you have an account for email.works on here. You just want to show that. Yeah. I just want to see how I set it up to make it work.

Ethan Byrd (31:09.462)
I do.

Dex (31:13.14)
Here, I'm gonna share and just show you what I'm thinking here. So I go to my app, I come into settings. That's good, it doesn't show the crude email address as I was sending to yesterday to test this. But like, yeah, you add an endpoint and then, sorry, not a webhook endpoint. Where is the DNS setup stuff?

Ethan Byrd (31:13.154)
Yeah.

Ethan Byrd (31:34.188)
So you go into domains at the top if you want to add a new one and then you do add domain. You got to give me the, you yeah, exactly.

Dex (31:36.271)
that's right.

Dex (31:42.411)
so yeah, you basically just get these two records and you add them. And literally what I do is I just paste this into Claude and say, use the, use my like dev environment CLI to go make these records.

Vaibhav (31:43.544)
Nice.

Vaibhav (31:52.234)
Nice. And then, go back. I want to see the thing that you set up, Dexter. Sorry.

Dex (31:57.192)
Okay.

Ethan Byrd (32:00.14)
This is not a Gemini 3 Pro site. I actually wrote a lot of the CSS myself, but I shamelessly copied a lot of post hogs feel.

Vaibhav (32:06.562)
Okay. So you, you have one for codeler.gg. and so what did you set up there? Show me how you set it up. And like, after you set it up, what did you do? You set up a web book.

Dex (32:17.93)
Yeah, I literally made a Claude session. Where is it?

Vaibhav (32:18.465)
And then.

Dex (32:26.964)
it's here.

Vaibhav (32:27.988)
Managing an email server for your own domain is actually stupidly hard. It's so annoying. If anyone has ever tried to build a system that responds to emails in an automated way, it is a fucking crap shoot. I have done it a few times. It is not fun. One of the only reasons I pay Gmail to have a custom domain is because I don't want to run a mail server. It is so shitty to run a mail server.

Ethan Byrd (32:33.036)
This is really, really hard. Like, yeah.

Dex (32:57.822)
Yeah, so I sent an email to, that's lewd. right. All right, we'll cut that one from the video. But I had someone write in about, we'll have to actually cut this person's email out as well. But someone emailed me about Codelayer and I responded to them and then I forwarded the email to MyMX. And then basically what I had built was a system that was like email goes to MyMX.

Vaibhav (33:00.653)
Ha ha!

Vaibhav (33:06.144)
Hahaha

Dex (33:24.178)
And then in production, this goes to like an AWS Lambda testing locally. I was just running. Yeah, I was running and Grok pointed to, which is the thing that lets you just host local servers on the cloud to like a local TypeScript server. And then what this would do is like launch a GitHub actions workflow, which would, you know, read the email, hand it to Claude with a prompt Claude would make some updates.

Vaibhav (33:27.822)
Yeah, which is your webhook basically.

Dex (33:56.05)
it would like commit plus push. think we said, I have a lot of like, you know, user info. We just like keep a CRM and markdown in a repo, in a private repo. And then it would like set a Slack message with like, hey, here's the new files I created. And so the Lambda would basically do the same thing, but in this case we use ngrok. Yeah.

Vaibhav (34:08.3)
Nice.

That's cool.

Yeah, it's the same code. So I think John asked the question, this seems more like setting up an email alias and email server stuff. And I think it seems like that at first glance, but the hard part about email is actually not about like writing the code once you have a really nice structured location. The hard part about email is actually getting the email in a way that's programmable. That is the hardest part.

Like it wants if you've ever used SES or anything like that when you get out empty JSON when you get an empty blob in s3 It's strongly untyped. It is not friendly to work with and also using s3 apis to load files I know everyone thinks it's like it's it's just a pain It's so much easier to deal with this as a web hook system Which is an event driven system than it is to actually treat it from a perspective like I have to manage a state of the truth of emails along the way

Because even if I get an SES notification, I still have to build a webhook of some kind that triggers on the file being written. And then I still have to build like event chains. For example, if I get a reply to an email, how do I deal with the replies versus the original email coming through? is, that event chain is not fun to build on your own. And that's, think the real value problem of having like really nice structured formats for emails that are unopinionated and don't force you to.

Dex (35:25.416)
Yeah.

Vaibhav (35:33.048)
kind of treated like an email alias. The fact that the to email, like we talked about, is not a unique web hook per to email, but rather a generic web hook means like, if you guys saw at beginning of this episode, what we did is I sent an email to extract that email that works. And it turned out I didn't have an image. Ethan could fix that code to basically say, if you don't have an image, actually send it to the parse code instead of the email extract code, which extract requires an image, parse doesn't. That itself would be really, really helpful. And that

control flow of treating even like a almost like a code flow is I think what the real benefit here of that is.

Dex (36:10.587)
Okay. So you have in your, in your, in your code that receives this, you have like the my MX SDK, which does like SIG verification and stuff like this. And then this can go to literally whatever you want. You can do a switch on the two address. You can do, you know, parse the intent.

And then you can go downstream to like some AI thing.

And then basically at the end, what a lot of these, God, whoops.

Vaibhav (36:45.355)
Yeah, get good, Deathsweeper.

Dex (36:47.613)
I suck at this. All right, we're just gonna go outside the box. And then what Ethan was doing, I guess, is like sending to resend, which actually like sends the response back to my inbox. And then when I reply to that, I can just send it back through the whole pipeline and the email will have all of the like, you know, my reply and then the like, you know, what is this email that works reply? And then it's like original email that was sent.

Vaibhav (36:59.341)
Exactly.

Vaibhav (37:17.237)
Okay. Now that we've talked about the basics. Yeah, exactly. Now that we've talked about the basics, I'm ready to go into level two really fast. Pull up that diagram again. no, you're drawing or Ethan or Ethan's drawing. We'll see. but one of you guys is drawing. Let's say I wanted to build, a command, a cancelable structure here where I could cancel things.

Dex (37:19.613)
Does that make sense? Yeah.

Dex (37:29.51)
Okay, let's go. Yeah, are you drawing? Show me what you got. Okay.

Dex (37:44.445)
Yep.

Vaibhav (37:44.939)
where because the user sends a second email like changes the operation of the first email. How do I do that? System design interview on the fly. Let's go.

Ethan, let's go. Check us out. How are we doing this?

Dex (37:55.881)
Okay, we got the email and then I immediately send a second email that says actually no, do it a different way. What do I do in my app?

Vaibhav (38:03.146)
Yes. All right, Ethan, lock in. It's time.

Ethan Byrd (38:06.891)
So, okay, just repeat the entire, like, acceptance criteria of this. Like, so what's the user story?

Dex (38:11.625)
So the original email is like, tell Kara I want to meet Tuesday. And then like five seconds later I'm like, crap, no, I have an onsite. No other detail, no other updates, just crap, no, I have an onsite.

Vaibhav (38:27.616)
Yeah. How do I build my agent to handle this?

Ethan Byrd (38:28.887)
Hmm.

Yeah, mean, so the easiest way to do this is just to have a database, fun stuff. Like the thing that...

Dex (38:38.793)
Draw it, you got the dock open, right? Yeah, come draw with us. Ethan doesn't know the Excalibur hotkeys, but he will. Yeah, if you just scroll down a bit. Yeah, there you go.

Vaibhav (38:40.012)
Try it. Yeah, tell us.

Ethan Byrd (38:42.399)
boy. right, I have, I do not, okay, here I am, hello. Cool, okay, yeah, so if you have like the, okay, so you're obviously gonna need to kind of make like, like gonna make a cylinder or something, because we need a data, yeah.

Dex (39:03.081)
This is a two, yeah, okay. No, there's no database icons in Excalibur. You're gonna have to hack it.

Ethan Byrd (39:10.347)
trying to ask me to enable dictation. amazing. Okay, so like the easiest way to do this is to have like, you would process these events and you'd put them into a queue as well. So I mean, I would use a queue for this. There's lots of different queues you can use for this. If you're doing this like on a very easy little, know, Bercel Next project, you could add, you know, read this to it. You could add upstash. You could actually ask, you know, use SQS if you're very brave.

Vaibhav (39:12.064)
Here, I got it, I got it. Utah, yeah.

Ethan Byrd (39:38.484)
But you would add a queue for these types of events. So MyMX would let you get the... So I would put the full blob of the email into the queue, the entire full blob, just so you can handle it. And then you have a little handler that pops off that queue. And in that handler, that's where you're trying to determine what to do with this event. And so for a meeting... So for this thing, it's like a calendar app, right? So you're either making meetings...

Dex (39:50.633)
you

Ethan Byrd (40:06.397)
on your calendar or sending out invites to calendars or like canceling things like that. So this handler is relatively straightforward, right? You can do an agent, you can probably do this all with like just true like text parsing, but you'd have an agent that would determine the actions that you're taking on this, right? Invites, canceling, whatever. And all of it, yeah.

Vaibhav (40:09.185)
Yep.

Vaibhav (40:25.932)
So you kind of, just to be very clear, we kind of have a two webhook system. You have one webhook that actually receives the email that comes in. This is webhook one. Then you push that to a queue and you have a second, almost like a webhook, which basically says whenever the queue has a value, I run this code. Yeah, queue listener. Exactly. Okay, cool. So I have two lambdas that I spin up. Go on.

Ethan Byrd (40:41.663)
Yeah. Yeah, exactly. Because this is what's kind of crazy about YMX is that you can just treat it like any other API. My original idea for this was actually to make it where you can call APIs over email. And someone mentioned this in the chat. That's all this is, right? It's like you're making emails into APIs. So you call this API, just like any other gigantic public API that you would have, you don't want to just run everything sequentially. You want to put it to some queue so that you can have rate limiting so you can do all that.

other fun stuff you put into that queue, you get the full email blob, then you go do something on that. And so they would have concurrency limits on the handler. You'd probably once again do a bunch of other stuff where you're checking to see like, is this like

Vaibhav (41:23.724)
How would you build concurrency on this?

Ethan Byrd (41:26.187)
So if you're using.

Vaibhav (41:27.392)
What is a key for concurrency? Yeah.

Ethan Byrd (41:30.635)
I mean, so the key here, so you actually get in the helo of the email, you get the IP of who sent it. That's like something that you can't get around. also get like the, so one of the other reasons that like MyMX is so nice for stuff like this is that I can give, MyMX will give you like the DKM, the SPF and the DMARC in the same way that you saw on the verify. I can tell you if this is a real person or not. So first of all, if you got it from somebody who's not,

Like you don't believe that you want to do this if you got it from something looks spoofed. Like MyMax will drop a lot of things in there so you don't have to worry about people doing crazy stuff. But if you get something that's like obviously not verified, then you just wouldn't handle it. But if it's something that is definitely verified, then that's your key because you know who that is. So that's what keeps someone from even potentially accidentally sending you like a hundred emails a second. So that's the key is where this person came from and you can make a key for people who are saying you could also do a key on

the customer, the endpoint. You could do it on, like if Dex is your customer and he's signed up for this service, then you would make sure that Dex himself can't get a bunch of events processed from there. And then, of course, in a real queue, you would also have global limits because you're going to hit your OpenAI key too many times. So you only want to handle like five, 10 of these concurrently or whatever. Great.

Vaibhav (42:39.926)
Got it. Got it.

Dex (42:52.56)
Okay, so how do we handle the cancellation?

Vaibhav (42:52.98)
Got it, first we... Yeah.

Ethan Byrd (42:56.052)
Yeah, so in your handler, right, you would have, I mean, we could draw up the schema if you want, but the gist is that you would have these events, you would create events, and then you would create actions on those events. I would imagine probably two tables, like events and then actions. And you can have foreign keys to, from the actions to the events themselves. The events have GUIDs, the actions have GUIDs. And then when you have a specific action that the user wanted to

take on that event, because this is how you could also support other people modifying those events unilaterally, like someone subscribing, or confirming that they're going to come to an event, or someone else canceling it. And then the queue listener would write, make sure that the event exists if it needs to create it, or maybe the action itself would create it so you don't have to do that wrapper around it. And then it would create the event, and then it would process those actions on the event, and the event would have a state, either canceled or.

whatever you want to do depending on how granular you want to get the support for the system or how you want to actually show this data to the user at the end point.

Vaibhav (43:59.862)
Yeah, this was a trick question for everyone else listening because I know Ethan has built a very complicated queue system before in the past for processing tons of AI events that are tons of like a huge stream of AI processing pipelines on the scale of like, how many commits did you process in your...

Ethan Byrd (44:07.35)
You

Ethan Byrd (44:20.322)
man, I actually wonder where we're at. It's, in the millions and millions of commits for sure. Even rap.dev, which we did. I mean, that, that was, it was, it was about a, I think about a million commits or something like that. It was wild. And then file changes, was like 10 million file changes.

Vaibhav (44:27.411)
Yeah, rap.dev. How much was that?

Vaibhav (44:33.163)
Yeah, like building a Q process. Yeah, something stupid in terms of the number of file changes. But I think, go ahead Dexter.

Dex (44:34.619)
Okay, so.

So the.

Okay, so like when the second message comes in, I just want to like draw out the logic. It's like get like active events for maybe for a user or like for conversation. You have some key that is like, so you have some grouping, right? Based on like the event, like the new event. And then.

Vaibhav (44:55.455)
for some unique ID exactly.

Vaibhav (45:07.147)
I think the... Go ahead.

Dex (45:07.572)
If any events running, then you would like event dot cancel, which would like market is canceled and like stop the processing somehow.

Ethan Byrd (45:17.238)
Yeah.

Ethan Byrd (45:20.854)
Yeah, because you could also have a lock on this, right? Like you could even within your queue, you could actually have a lock on each event or like each action so that only one, you know, queue handler can actually process this at once. You don't get any like weird states.

Vaibhav (45:21.151)
Yeah.

Dex (45:34.236)
Yeah, but what I want is I want this one's like halfway through processing and then this one comes in and I want to cancel the AI is about to go call a tool to make a calendar event. And I want that to not happen. You know what I mean? I wanted, I wanted to take my like, crap, no, and replace it with this one, which has probably the whole thread since I replied to myself, basically.

Ethan Byrd (45:38.165)
Mm-hmm.

Vaibhav (45:45.279)
Yeah, so.

Vaibhav (45:54.06)
Should I draw some stuff, Dexter? Okay, cool, let's do it. So basically, the way I model this in my head is you have multiple types of events. And the first thing you do is, if you think about SQS and how the queue ends up working, is you basically email thread. Every email thread gets put into its own queue of keys of most recent and most not recent, and you can build this keying system through SES.

Ethan Byrd (45:56.233)
Hmm.

Dex (45:56.273)
You're up.

Ethan Byrd (46:15.71)
Mmm.

Vaibhav (46:22.845)
You also have to build a round Robin system around like how you prioritize email threads, because you probably don't want to be like boxed on one specific email thread. But what you do is you guarantee that you will never ever, ever process two emails from the same email thread ever concurrently with the queuing system. Now, if you do it this way, what ends up happening is now you've built a system that's going to pop off of this email thread.

off the system. So we're going to take this thread 1 and we're going to mark this as T0 because we're zero index. Everything else is incorrect.

Dex (47:01.384)
I'm move this down a little bit.

Vaibhav (47:01.739)
Yeah, do whatever you want. You t1, t0. Now we're going to start processing t0. While we're processing t0, we might actually write a bunch of arbitrary code. Get rid of these dots.

Vaibhav (47:20.127)
While we're processing D0, we might write a bunch of arbitrary code, handle thread. That will do a bunch of stuff. And we can actually control this code because it can do a lot of stuff. But like Ethan said, we will eventually have, and as Dexter said as well, we will eventually have some database that represents the state of truth for every user that needs to be communicated with this code. At some point, like...

this code will communicate with this database. It will read and write from it whenever it wants. Now, what I would do is I would build a system that says read actions are always available and read actions are never blocked in this system. We always allow read actions from async candidate to here. At the point of write, we actually do a verify on write.

Ethan Byrd (48:07.656)
Hmm

Dex (48:07.889)
Yeah.

You have like another queue. Well, so yeah, here's my question is like, would you actually create another queue? Cause like what you could do is you could queue up all of the right actions as like, you know, planned rights and just like only flush them at the end if this job doesn't get interrupted.

Vaibhav (48:31.007)
Well, that's one way to do it. But the reason that I wouldn't want to flush immediately. So that would be for certain use cases. That's actually a perfect solution, by the way, just be very clear. You, you, you, you, the rights and you treat it like a transactional right rather than a non-transactional right.

Ethan Byrd (48:42.897)
Hmm.

Dex (48:43.143)
Yeah, exactly. You don't commit the transaction until you've kind of like finished the processing and maybe you even have a grace period of like, make sure no other email comes in in the next 60 seconds. And then we flush the rights.

Vaibhav (48:51.401)
Yeah. But, but what I would do instead is I would actually say that if the verify and write, what does verify and write do? Well, verify and write goes back to his queue and says, do we have any other elements that are on the email thread? If we do at the point of verify and write, in addition to this, so we would do this transaction thing, but we would also have a thing that says, if at any point we detect that there's more emails on this email thread, then we'd actually cancel this whole process and cancel it all.

Dex (49:19.505)
you just blow up the transaction and roll it back.

Ethan Byrd (49:20.597)
Hmm.

Vaibhav (49:22.141)
you blow up the whole thing and you roll it all back. And then what you do is you have

Dex (49:25.147)
because the T1 is gonna contain all the information from T0, because it's a reply. And so then you run it again. Okay, okay, I got you, this is sick.

Vaibhav (49:33.951)
Then, yes, then, exactly, exactly. Then you basically pop the element off the queue and then you rerun it again with T1. You basically treat T0 as a discard event, then you treat it as a whole thread. And now you have a solution. And you basically have to treat this like, these are basically called yield points, it's how you think about it, it's a yielding point. You have a yield point that you're able to go crash off this and now you pull T1 and because, hopefully, if myMX is the right thing, you actually get T0 as a thread in T1.

This should in theory work. Any email provider that doesn't do this is trash.

Dex (50:05.768)
I mean, it's kind of actually similar to how like LLM context windows work, right? Where like every email contains every previous message that's happened. It actually works, makes it work really nicely for LLMs as they're trained to like read conversations.

Vaibhav (50:13.384)
Well, it- it- it-

Vaibhav (50:17.802)
It's only kind of true because it could technically be false that this is not the case because like someone could edit the past history. So what I would really do if I was to build a system to be super robust, what I would really do is I'd actually take the first thing that happens and in a guaranteed ways, I would actually take this blob and write it to S3 every single time. And then what I do is when I load T1, the first thing I do is I'd say, are there any other blobs in my S3 bucket? And I'd actually then load T0 from S3.

Ethan Byrd (50:20.789)
Yeah.

Vaibhav (50:48.554)
and I'd verify if T0 has a rewrite or not in T1. And if it does, then I would also preserve T0. If it doesn't, I throw T0 away from S3. And now I have a really secure email chain that is actually linear because email can be guaranteed to be linear. It's basically a linear control flow that does this. There's a problem with branching that you have to deal with. So you have to think about how you build email threads in the case of branching. But that's a data modeling problem on this layer, not in the processing layer. Now there's one last thing that you want to do, which is...

Just like you would do a verify and write, you also want to do this at send time. So at the point of sending, you want to do another verification that actually does this. Exactly. Because at some point you're going to handle the thread in the very end, not only are you doing database things, you might actually want to reply on email as well. Reply on email has to have this.

Dex (51:25.032)
You're talking about sending the reply.

Dex (51:33.522)
Well, so this is, yeah, this is the difference. This is why I think it should be planned rights because like a transaction can only impact your database and you can roll back a transaction on your database, but you can't roll back an email send or a calendar event create. And so if you're going to be interacting with the external world, even if it's just sending a reply to the user, you kind of need to like cue up all the changes you're going to make and then flush them at the end.

Vaibhav (51:45.779)
Exactly.

Vaibhav (51:54.749)
Exactly. But also like users are understanding of this. I'm assuming that your processing takes at least 30 seconds. If you're running some, any sort of like real alum workflows, if you're not, and you're just replying really quickly, that's separate. But if you're processing, it's taking like at least 30 seconds and they changed an email like 31 seconds later and they happened to get a reply. That's not going to, that's not going to change anything. But what you should do in that scenario is whenever you let's say you had that race condition. Well, now you have to design for that. Whenever you run T1, you have to check.

Did you send an email in that time window?

Dex (52:32.871)
Did I like the, processing workflow.

Vaibhav (52:33.554)
And exactly. Did the processing workflows send an email? So first we look T0 from S3, we do all this. And in between the time that T1 kicked off, did I send another email because of some weird race condition and the way that it came through? Like technically the sender sent it, but then I sent it in between that time window, which can happen. It's just networking. There can be all sorts of weird race conditions. If you did, then you have to add more context into your LLM workflow saying, this is the email that I sent and pull that down.

And now you have, you have the true upgraded chain where you probably even want to provide that context to the user. I already did this because let's say you have a scheduling agent and you schedule the meeting, you sent the email and literally right as you press send the email came, the sender also sent send. So you sent, they haven't received and they sent as well. So what do do now?

Dex (53:17.177)
Yeah, okay, so...

Yeah, okay. So you need to tell the model when it replies to the second email, it has to know that it has already responded and that needs to be tracked as an event, even though it's not existing and you have to like synthetically inject. By the way, this hasn't shown up for the user, so it didn't come through in the context window, but this also has happened.

Vaibhav (53:39.346)
Exactly. So for example, I might've said, I have sent the email. I've, I've scheduled a meeting on Friday. And then I said, actually, I really, I I'm okay with Friday, but I prefer Saturday or I prefer Monday. So, but you've sent the Friday schedule already. Well, the coding agent may actually prefer to send an email. says, Hey, I saw you sent this, but I've already sent the email and the confirmation. Would you like to still move it? Because moving a meeting that is sent is worse than not changing the first time you send it. And now that's your agent.

Dex (54:06.725)
Yeah, or canceling it or yeah.

Vaibhav (54:09.157)
Exactly. That's your agent's prerogative. That's agent design at that point. But context collection, that is your problem as a person building an application. So that's how you would have to go build this.

Dex (54:18.801)
Hell yeah.

Dude, this is deeply putting the engineering back in context engineering, dude. I love it.

Vaibhav (54:29.418)
Hopefully this was fun and little educational.

Ethan Byrd (54:30.932)
No, this is amazing, yeah. So just a couple things off the top of my head. So first is, MyMax does not have a threading API yet, but it will have it very soon. And so I will have information about threading in the JSON for you, because that's one of the other big philosophies here is you don't need to call an API. Yeah.

Vaibhav (54:49.435)
Like I said, every email that doesn't have that is trash. currently, my MX is trash, is what I'm hearing. But it will be good. I'm good.

Ethan Byrd (54:53.96)
Yeah.

Dex (54:54.499)
Oooh.

Ethan Byrd (54:57.716)
It will be not trash very soon then. yeah, but like, you know, like, let's see, like, well, no, like, like Kava was saying in the chat, like, there's going to be like, the reason this is like really hard is that like, all like you were just saying, like, people can modify the emails, like they can, they can change it. So Myamex will actually have two different versions of this. They'll have like the, the, the one that comes from the email itself, kind of like the naive approach, but we also like use your past email history in order to give you the thread.

Vaibhav (55:03.037)
I'm joking, but yeah.

Ethan Byrd (55:27.856)
based on like what we know is true based on the emails that you've already received, right, which is the one you should probably trust more, right.

Vaibhav (55:34.494)
Yeah, the tricky, the other tricky part about threading, be really honest, is actually not the part that's running. It just is a massive JSON payload. It just increases the payload size that I need for my Lambda. And that's kind of, that can be quite cumbersome at some point to go see that. Like even when you open up a Gmail email, actually for long threads, it actually doesn't load the full payload because it's just too long. And it's like the amount of bits that you send across the wire just too high. doesn't make sense.

Ethan Byrd (55:47.326)
Yep, yep, we, yeah.

Ethan Byrd (56:00.692)
Yeah, so we give you the full payload. We give you the raw email. We also give you the raw attachments up to, think it's like 256K. It won't be inline anymore, but once again, it's not an API call. It's a signed URL that you can download. So don't actually have to, you just get it. But that will be configurable that's on my roadmap so that you can, if for some reason you want your Lambdas to be, the payloads to be wasteful. Because also, for example, I know that Vercell, their serverless functions have, I think it's like six megabytes.

Vaibhav (56:09.552)
nice.

Vaibhav (56:20.115)
Nice.

Ethan Byrd (56:30.672)
limit on the body size. So, you know, there's things like that. So, yeah.

Vaibhav (56:37.865)
Well, folks.

Dex (56:39.355)
So apparently actually the title is email is all you need, but apparently you also need a 10 years experience in systems engineering. If you wanna build it as tight as VibeOv. Yeah, actually a Cloudmax subscription and the transcript of this episode is probably all you need.

Ethan Byrd (56:47.564)
Or a Claude

Vaibhav (56:48.285)
hahahaha

Vaibhav (56:52.041)
Or just take this video

And then you're done. Realistically, yes. You're welcome. I do take commission and tips. I do work for tips. So please set in my way over on as a like button on the YouTube.

Ethan Byrd (56:58.068)
Yeah.

Dex (57:06.567)
We do not take tips, we do not take commissions. You cannot pay us to talk about a thing. We talk about things that we are excited about. You will never be able to buy an episode of AI That Works. I'm just gonna go on record saying that. I think everyone can already tell that that's the case, but do not send vibe off tips.

Ethan Byrd (57:11.988)
You

Ethan Byrd (57:17.716)
You

Vaibhav (57:18.889)
That is true, I agree. You can send me a like on YouTube though, I will accept that.

Ethan Byrd (57:22.676)
You

Dex (57:27.611)
There you go. Like and subscribe fam.

Amazing. Ethan, this has been super fun. I'm gonna just scroll the chat, see if we have any other questions, any final words. Otherwise we can wrap it up and send these fine people on their email hacking days.

Ethan Byrd (57:44.732)
No thanks for having me guys, this was fantastic.

Vaibhav (57:45.066)
I usually hate talking about non-open source code and I really hate bringing that on because I think it's really important to have open source code but I genuinely thought this was really freaking cool when I first saw it. I first hand seen how hard email to do. So with that, like if people want to sign up for MyMX, how do they do it? How do they sign up? How do they get the key? Can you show that one more time?

Ethan Byrd (58:10.547)
Yeah, I'll put it in the chat as well. But yeah, just go to mymx.dev, do sign up, and the code is one word. SMTP is the worst. And just sign up. And we have a very generous free tier. So don't worry about it. Just start building.

Vaibhav (58:25.8)
And then the code for email works. That's going to be completely open source. We'll attach that to the episode details, perhaps, and then show that over on there, perhaps on the AI.Works repo itself.

Ethan Byrd (58:36.371)
Yep, EmailWorks will be completely open source. I'll probably keep adding a bunch of crazy stuff to it. I'll also accept pull requests on it if people want to add crazy stuff to it. Like, let's do it. Let me know. Hit me up.

Vaibhav (58:46.825)
So to everyone that got lost while I was yapping, I apologize. I love yapping about systems design and sometimes I get lost in the sauce. But hopefully the email that we send after this will be a lot more, what's it called, sound.

Ethan Byrd (58:53.331)
You

Dex (59:02.119)
We're going to get Claude to turn your rambling into some nice mermaid diagrams so you don't have to try to draw it.

Vaibhav (59:06.097)
That's right. That's right. This was tons of fun. Thank you for joining us, Ethan, and donating some of your time this morning. Thank you everyone that stayed on and watched. Next week's episode is, I think, going to be really fun. For those of you that want to watch the recap, recaps go live every Monday, every following Monday. You'll get an email as well if you're subscribed to either the Luma or the email chain that we have. Next Tuesday, we're going to do live coding. Vibes are all you need.

Ethan Byrd (59:06.149)
Hahaha!

Dex (59:34.628)
this could be sick.

Vaibhav (59:36.233)
Yes, we're going go back to agent decoding and talk about exactly how you use coding agents to build interesting features. If you guys are interested in garbage collectors and heaps and other stuff, we can yap about that while we do.

Dex (59:49.265)
No, I can't do another garbage collector, dude. I was on with ViBot for two hours on Saturday building garbage collect. We gotta pick something else.

Vaibhav (59:56.937)
It was a fun, but okay, we'll pick something else. I was thinking, the reason I was thinking that is, you know, we can do some nice little system design with actual diagrams, nice and slow, while Cloud Code does its thing. So we can talk about trade-offs. Yeah. Exactly. I think it'll be really fun. Anyway, thank you everyone for joining. We'll see you guys soon.

Dex (59:58.863)
I had fun, it was good. yeah. We do garbage collectors.

Dex (01:00:12.667)
That's how it should be done. Yeah, pop over and hey, here's what we're actually doing. I love it.

Dex (01:00:22.919)
We'll see you next week. Thanks.
