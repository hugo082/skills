Dex (00:01.676)
What's up everybody?

Vaibhav (00:03.024)
Hello, hello, hello.

Dex (00:05.858)
Is it dead or not? What's the deal? What's the answer? Are we going to figure it out?

Vaibhav (00:07.62)
I don't know.

Oh, people are here, all right. We weren't sure if the link was working. There was a little time zone, a little kropotcha. But we should be good to go and we'll get it working next week.

Dex (00:21.582)
You're telling me that LLMs are bad at time zones?

Vaibhav (00:25.18)
A topic we have discussed too many times. I think it did. I think Kevin's machine is in CST and it just picked 815 instead of 1015.

Dex (00:26.744)
the Claude scheduled the meeting in the wrong time zone.

Dex (00:37.358)
You know, I think we should do an episode about handling time and time zones.

Vaibhav (00:44.412)
We'll do it again. Let's run it back. No joking. There's a pass up so people are curious

Dex (00:46.062)
Yeah.

Dex (00:50.646)
Yes, if you want to know about how to get LLMs to tell time, the answer is don't.

Vaibhav (00:56.358)
Exactly, like many things with LLMs, have them do what they do best.

Dex (01:01.995)
Yep. Cool. Let me get the whiteboard fired up. Vybob, you want to introduce us and the episode?

Vaibhav (01:08.272)
Let's do it. Hey everyone, my name is Vyva and this is the AI That Works podcast. As you folks may know, every Tuesday, Dextre and I get together and we spend an hour yapping about something with AI that is hopefully practical to everyone out there. I work on a company called Boundary where we make the programming language panel.

Dex (01:27.758)
And I am the founder, CEO of HumanLayer where we help people solve hard problems and complex code bases with coding agents. And today we're talking about, you do it. Sorry, no, you do it, go. All right, so me, all right, go.

Vaibhav (01:37.788)
And today's topic, go ahead. No, no, you do it. Okay, today's topic is all about MCP. MCP, think is, we get an on again, off again kind of relationship with MCP on Twitter from what I see. Some days it's the next, it is the next, it's like the next coming, what's it called? Some days it's the next thing that's gonna save us all. The next day it's horrible and we should all move away from it and then it's back. And then it's gone and then it's back. Let's talk about it.

Dex (02:06.318)
Well, and the craziest thing that I see is like, there is an infinite wave of people discovering the most basic thing that we kind of talked about last summer, which is like, oh, if you have a bash tool, then like maybe you should just use CLIs instead of MCPs and it's more context efficient and things like this. And we're not going to talk about it. I we will bring that up today. And I think it's a dimension of the conversation, but I think we want to go a little bit deeper than that surface level debate.

Vaibhav (02:14.139)
Yeah.

Dex (02:35.466)
And we will touch on it, but like basically all of the different types of AI applications you might build, all of the ways you might consume AI and Vybov's very loves saying that MCP is not useful and like there's way better things for it. I may be the last MCP debate, was the anti-MCP guy. And so today I might be the pro-MCP guy.

Vaibhav (02:55.609)
And

I don't really think it's a... How do I put it? I wouldn't really say it's...

Vaibhav (03:09.819)
the team was blocked by me. I wouldn't really say it's hot or not in either direction. I think the way I always think about it is like on the internet, people really like hyperboles when you speak because people like axiomatic thoughts because no one wants to go ahead and discover everything from first principles every single time. in, and even from my own software design. like, for example, in Google, there was a rule, thou shalt never use a raw pointer. That is a really, really, really good rule for like 99 % of code.

In Rust, there's a rule that says thou shalt never write unsafe code. Again, a great, phenomenal rule for thinking about code as a whole. And it saves 99 % of people. It just saves 99 % of people from making a mistake that they would make if they had to think about that decision. So when I think about MCP, and at least I personally say MCP is useless, I really just say it from that 99 % perspective. More likely than not, your product is not going to benefit from using MCP.

rather than it will gain the benefits that MCP actually brings. What's your take Dexter? And then we'll go into, think a better conversation that actually talks about, how do I put it? That talks about like, what is MCP? And we can go define it right.

Dex (04:29.302)
Yeah, okay, cool. Yeah, we can talk about it. like, think, I mean, my take is basically like MCP as a protocol has a lot going on. And actually, I think my co-founder, Kyle, put this best, which is like, MCP does not cause context rot. The same tools in a CLI could also cause a bunch of context rot in terms of just using up too much of your context window with like garbage or inefficient token, inefficient prompts and things like this. So it's like,

the way you design the tools that is most important, more so than the actual, the protocol or the transport or the standard. You can build incredibly valuable, tight, useful tools using MCP the same way can use CLIs with a bash tool. and I think there's, there's other nuances of like, who should be embracing MCP because I think in the early days it was like, this replaces tools or this replaces SDKs. that's

That's not what it's for, but it does give you this interesting plugin ecosystem and makes your software extensible in a really powerful way. And so I think we can run through all the ways that think that people use MCP wrong. And then we can talk through what maybe some of the right ways might be. But all right, you want to start drawing? Yeah.

Vaibhav (05:41.094)
Let's do it. Let's first define MCP. Yeah, I'll share the screen and then like, why don't we both just define what we think MCP is? And today's episode is going to be a lot of whiteboarding. So if people have questions along the way, ask us. We're going to try and be really responsive and keep track of every question out there so we can keep answering everything as it comes up.

Dex (06:03.598)
Alright, you want to give the initial one and then I can mark it up with my thoughts or we can draw a second version?

Vaibhav (06:12.155)
the chat window separate from the Riverside window. So I can actually see things. So I'll tell you my story behind MCP, why I think it exists. I think we discovered a thing that said, we want agents. Then we said, yeah, we want agents to have these things called tools.

And then we said, hey, this is really cool. But not only do we want agents and tools, we actually want agents that have tools that are actually defined not at compile time, but dynamically. So then we evolved into a world where we had dynamic tools.

Dex (06:49.292)
Yeah. Yes.

Yes, you have no before before MCP you had every agent framework you had your length chains and your crew eyes and all these things and you basically had to import Python code to use a tool and so to use a file search tool or a access search tool or whatever it is you had to go install that like library into your package.

Vaibhav (07:07.32)
Exactly.

Vaibhav (07:13.819)
You have to do some, some, some crap like this.

Dex (07:17.164)
Yeah, you had to write the function or you had to import the function.

Dex (07:23.212)
Yes, exactly.

Vaibhav (07:24.347)
Like you have to do some crap like this. And then you're like, and then people are like, this is really annoying. I want to import the function. But then we realized if we import the function via tools and we eat all of us have to use the exact same definition of tool. If we want to import this exactly from line chain, like, well, you forgot the other 50 imports that you need, but otherwise yes.

Dex (07:46.917)
Yes. This is an example.

Vaibhav (07:48.604)
So you did something like this and then we're like, if we all want to build agents around this, then we have to go ahead and then go ahead and actually load. Then we have to be like, okay, now we're to use the same version of tool from here. So we all have to use something like lane chain dot tool. And this is just like, that could, but then many people are like, this is crap. I don't want to use like chains to, I want to use my tool or I would need some other tool. So then that happened.

Now we live in a world where everyone really wants to this. So once people want to do dynamic stuff, it is useful to have some protocol layer that helps define some of this stuff. So once we want a protocol layer to go to the agent, then you need some protocol for doing this. And you want to treat this almost like a package manager, and hence MCP was born. And what MCP's job is, at least in my mind, is it has two jobs. One, list all tools.

Vaibhav (08:47.798)
two.

Dex (08:54.517)
I think they call it execute tool, but yeah.

Vaibhav (08:56.651)
call function. I'll say call function. And I'm going to call this functions for now because that's all they really are. I think it's useful to think about it that way. So like MCP in

Dex (09:05.186)
Yeah, a tool is a function with a signature that is like the signature can be passed over the wire as a JSON schema.

Vaibhav (09:11.831)
Exactly. And this is basically, I think the main definition of what MCP is. It's a protocol that attempts to list all functions and then call all functions. And if we, at least for me, this is how I define the MCP protocol. And I think I'm trying to, and I would say like the main difference here isn't so much as, this a protocol? Is this not a protocol? Is this MCP? I think the main thing that we should really talk about is

MCP is a specific manifestation of someone trying to do this. There's many ways that we could implement the list all function and then call function protocol, but MCP is one specific implementation detail.

Dex (09:43.276)
Yep, I think.

Dex (09:52.632)
Can we pause just to go a little bit deeper on this like dynamic function discovery thing? Like you're familiar with how the Google cloud SDKs use discovery to build the SDKs dynamically at runtime. Know about this. Okay, so this has been a thing that people have been doing since way before MCP actually. And so if you are running Python code and you write something like, you know, from Google cloud SDK import, like Gmail calendar.

Vaibhav (10:05.527)
No, I'm not actually. No.

Vaibhav (10:18.063)
Dex (10:22.518)
Like, what is happening under the hood there is the code that you're actually importing is actually calling a schema endpoint that is hosted on Google's web and sending back the schema of like, here's all the endpoints you can call, here's all their parameters, et cetera. And so like when you run, know, const, you know, or sorry, I haven't written Python in a while. My emails.

Vaibhav (10:33.2)
I know what you're talking about, yeah.

Dex (10:50.984)
equals gmail.listMyEmails, etc. Like, this function does not exist in the SDK. This function is like at import time. At import time, the library is doing like, know, gmail, you know, for function in schema, you know, gmail.set, you're doing like a Python like set adder to attach a function.

Vaibhav (11:01.573)
Yeah, it's like a dynamically loaded attribute.

Dex (11:20.908)
like create, get, call schema basically. And it will be like function.name.

function.schema.

You see what I'm saying?

Vaibhav (11:37.797)
me.

Dex (11:38.84)
So you're creating an attribute on it dynamically at runtime. And this is like a model that's been around for a while. So they never have to like update the code when the upstream API has changed. And the SDK is just a way to discover what can be done. And it knows how to communicate with that API.

Vaibhav (11:54.907)
So, and then this obviously comes with a trade off that when you go use the Google library by default in Python, it doesn't auto complete and a bunch of other stuff in there. think Bodo three suffers from the same problem with AWS for the same exact reason. And I think this is like why you have to do download these extra packages to actually make auto complete work for like my pod.

Dex (12:16.962)
Yes. Yeah, because you can't, there are no types known at compile time. They're only known at runtime.

Vaibhav (12:20.142)
Yeah, exactly. At compile time. You gotta run the code to get the types.

Dex (12:26.23)
Every time you launch the program you're rebuilding the entire tree of function calls that are available and there's hundreds of methods on here Okay Okay Yeah Anyways, so this is like a good like this is kind of like the the same idea that is underneath MCP except you're doing it as like generating schemas to pass to the agent live So anyways, I'll you keep going

Vaibhav (12:30.946)
I think they have some caching and stuff as well by the way. I do think they do caching to make it so don't have to download everything from scratch every time. But I think the-

Vaibhav (12:47.576)
Yeah. And the reason Google does this and the reason Google does this is because like fundamentally what is a practical reason for doing this? Because discussing that helps us discuss the MCP protocol actually, which is like in Google's world, this thing, the number of times that you add new top level features here is very, very sparse. You don't add these very often. So these get supported as like first-class citizens, but the number of times that like these things change.

is much much more rapid and it allows them to iterate

Dex (13:18.286)
They're constantly adding new parameters and flags and filters and all this stuff.

Vaibhav (13:22.56)
Exactly. And it allows them to have people use the old SDK without worrying about versioning of their cloud SDK, unless they really want a new one. And basically allows their Python SDK to be much more stable than their internal ship rate. Cause otherwise they'd have, they'd be shipping a new version every single fricking day.

Dex (13:35.16)
Yeah.

Dex (13:40.75)
Yeah, and so the MCP version of this would look something like you would do your, I'm gonna do this picture one more time down here. So you would actually like, you have your MCP SDK in here, right? And this would call, when you launch it, it like lists all functions for the server, for N servers.

Dex (14:08.11)
The Excalibur changed how the hotkeys work. They changed the hotkeys recently and it's really annoying. changed how escape works. know, for end servers, list all the functions and then basically, rather than giving you a Python SDK, you get this big like, you know, tools block that is, you know, the JSON schema of all of the tools. Can we look at one of these? Like, do you have an MCP inspector running? I can pop this open real quick.

Vaibhav (14:09.626)
Today's not an Excalibur draw for you.

Vaibhav (14:16.655)
I see.

Vaibhav (14:33.146)
I don't, but do you want to screen share? Also, while we pause, I'm going to make one more request for you. Dexter, you should move your camera down so we don't get a floating head cut off in the YouTube feed. There we go. Let's get some shoulders in the YouTube feed.

Dex (14:37.1)
Yeah, I will in a sec.

Dex (14:43.382)
Yes, okay, great.

Yeah.

Vaibhav (14:48.728)
And while Dekshar pulls up MCP Inspector, is this, forever in watching, is this how you've thought about MCP in the past? Is this exactly how you go model it? Is there a different way that you've been thinking about it?

Vaibhav (15:02.744)
What the one other thing that I actually, as you continue, I'll show another, another thing as soon as you get MTV inspector up and running. But once you get that four end servers thing, I think this is where I see the biggest roadblock for people because this is dynamically injected. like take Google's pro take Google's case. Google controls the SDK. Google controls SDK. They have a CI CD process out there and it's basically going from Google servers to Google client.

Dex (15:06.508)
Yeah.

Yep.

Vaibhav (15:31.525)
So it's a well-trusted relationship between both ends. And the documentation and everything for it is also served on Google's services. So it's basically a closed ecosystem behind where everything runs. The big difference between MCP over here is that this is not a closed ecosystem. This is actually the opposite. It's an open ecosystem. You can add whatever servers that you want to add, and those servers can effectively execute any code they want to execute with almost no auditing. And if for whatever reason,

Dex (15:34.871)
you

Vaibhav (16:01.464)
you actually go ahead and have the end servers. Like many times list functions can be a remote. Your MCP server can be a remote thing that you're running rather than a local machine. What ends up happening is you're effectively running untrusted code or unverified code on your system all the time that has a dramatic impact on your agent's performance. We've talked about this many times before. Like Dexter says, the models get into the dumb zone.

Dex (16:07.054)
you

Vaibhav (16:29.718)
once you had 20 to 30 % context rot. And I think the GitHub MCP was famous for this. It added like 50,000 tokens. If you just added the GitHub MCP, HubSpot did the same exact thing. Yeah, it was 60,000 tokens. The HubSpot API does the same thing. You add those two APIs, you're already at like 100,000 tokens in.

Dex (16:38.19)
It was like 60, dude.

Dex (16:46.958)
Yeah, OK, so this is the MCP inspector. You just run it with, you know, NPX MCP inspector. And then you can give it any server and basically what it lets you do is so I'm going to connect to the linear MCP. And so you can connect here. This is actually going to do like an OAuth loop, which is what some well made MCP servers will do. But now what this lets you do is actually like call the underlying.

Vaibhav (17:15.354)
linear functions.

Dex (17:16.781)
Yeah.

Vaibhav (17:18.394)
and once it loads.

well, okay. It will unload in one second, I'm sure.

Dex (17:26.221)
Yeah.

Vaibhav (17:27.524)
But again, the real problem here is it not so much should you use linear or not. The big difference is in how MCP operates, in my opinion, versus how normal package imports operate in source code. So for example, if you're running JavaScript code and you import a linear library or the linear NPM package, what ends up happening is you're not actually importing all the source code. Technically you are. But by the time JavaScript runs, it does a lot of tree shaking.

Dex (17:40.184)
Yeah.

Vaibhav (17:56.206)
And by the time it tree shaking, you actually don't have all the code in there. You only have the code that you're actually using. problem, and in source code, we do this to minify the bundle size, make sure our code bases are small and like efficient. And we're only including source code that we actually want to run. Now the big difference with MCP and agents in my opinion is MCP is kind of like an all or nothing game. You get the MCP or you don't get the MCP.

And what that means is in systems that are extremely sensitive to bloat, so in the case of like LLM calls and context windows, you basically have a zero sum choice. You either use all the features or none of them. And that's just not how we do software. I want to be almost very particular in how MCP works. And now if I want to go do this, I end up in this world where I have to do a bunch of filtering logic to say, only give it these functions out of the linear functions in order to go use them.

but because I don't actually implement the MCP server myself, now I live in this really weird world where I can't actually exclude certain functions and tool calls because I don't know if the MCP server relies on some order of tool calls to actually work. So I can't even whitelist or blacklist certain functions out there out of the MCP call. So I effectively have to take it all or nothing unless I do an incredibly thorough code inspection.

but if I don't have the implementation details, I can't even do that. Does that make sense, texture?

Dex (19:28.086)
Yeah, I mean, there's all this stuff you can do with like wrapping MCP servers and stuff. Did you go back to sharing? Yeah, let's bring the whiteboard back. Yeah. I think the biggest issue that we had was like people saw MCP and they thought like, does this replace SDKs? It's like instead of like writing code and calling an SDK, do I just call the MCP server instead? And I think that ends up being like...

Vaibhav (19:32.634)
I'm gonna bring us back to the screen share, by the way.

Dex (19:55.308)
the thing that bit a lot of people, right? It's like if you are writing the code, then...

Vaibhav (19:55.768)
Incorrect. Yeah.

Dex (20:04.92)
then you should just write the code and use an SDK rather than doing all this complex protocol stuff in your app. The thing that makes MCP really, really interesting, and you mentioned it's like, I don't control the code of the server. The thing that makes this really, you're doing the wrapper thing. Yeah. So you could create your, yeah. I think what makes MCP really useful and valuable is like, I have my app.

Vaibhav (20:24.057)
I'll talk about this afterwards. Now go ahead.

Dex (20:33.71)
Like if I want to build an agent and I wanted to have like, let's, let's say I have my agent and I wanted to have access to like read, write file system. And I wanted to do things with GitHub and I do want to do things with linear, like, Oh, I can go get that stuff from MCP now. Right. But MCP has its own auth stuff. has its own, all kinds of things to, access this stuff. And so your other option would just be to like, use the, use the GitHub SDK, use the linear SDK.

Etc. And like if you already know what functionality you want, then I would say like just use the SDKs. But what makes this really, really interesting is if like there's functionality that you want to let your users bring new functionality to your app. Let's say I have an agent and like the user wants to bring a JIRA MCP or something.

Vaibhav (21:03.555)
Mm-hmm.

Dex (21:28.12)
And I don't want to integrate Jira into my app. The user can bring install and configure and own the MCP. And I, in my application, if I'm building a chatbot or something, I now suddenly have a way to let my users extend the functionality of my application without me having to do anything. As long as I implement an MCP client, I can give my users the ability to bring whatever tools they want. And that in my mind is what MCP is for. MCP is not

for a different way to call APIs. It's not for like, hey, I want to give new things to the, it's like, from this perspective, it's like Anthropic builds Claude code, but they give users the ability to extend and customize Claude code through MCPs. Claude code's a kind of example. We'll get into the bash thing in a minute, but does that make sense?

Vaibhav (22:19.383)
I think I agree. think that is the only justifiable reason to use MCP to let your users bring their own code to attach to your harness. That's it. Every other use case is garbage. Don't do it. In my opinion, like do not use MCP to talk to get up. Literally just have Claude code, use the get up CLI to add the code functions you need. It'll work better. Have Claude code. And I'm not saying write the code. That's dumb. Have Claude code, write the code. Like definitely don't do that. But like.

Dex (22:28.472)
Yes.

Vaibhav (22:47.447)
be deliberate about the way that you go do this. Because what you're really doing, and I think that's the unpaid tax that people don't think about, which is the minute you add an MCP that you're not trusting, that you don't really control, you've basically consumed a certain amount of the model's intelligence at that point. So your agent has just gotten deterministically worse in all of those scenarios.

Dex (23:04.515)
Yes.

Yes. I mean, this is the thing we talk about a lot in terms of like even making prompts and skills better is like you have an instruction budget for every model and the more instructions you give the model, the worse it will perform at adhering to any one of them, including the user message you just sent it. And every single function definition in an MCP server use an instruction. It's an instruction of like, here's how to use this function.

Vaibhav (23:21.742)
Exactly.

Vaibhav (23:30.551)
is a distraction. Yeah.

Dex (23:35.448)
Here's how this field needs to look. All of this stuff, the model is trying to attend to because it doesn't know what's important until yeah.

Vaibhav (23:41.922)
Exactly. Like unless you have a user that you're like, Hey, I want to make sure users can go do this. It's better for you to go build. let's say you want to support like every single ticketing system out there. Your users will have a better quality guarantee using your agent harness. If you build OAuth directly into your app with, with, linear, GitHub, Jira, whatever else you want for issue tracking. And then you just build a bridge from your system.

Dex (23:58.936)
Yes.

Dex (24:05.325)
Yes.

Vaibhav (24:08.525)
that says when the user wants a ticket, we just use their OAuth and system to get their ticket. In the case of a user OAuthing into multiple systems, like GitHub and Linear, then we tell the agent we have two functions, ticket GitHub, ticket Linear, all tickets, and we expose all three of those functions out there. But if the user only has one OAuth, then we show the agent only all tickets, and like search tickets. It doesn't even have to know where the tickets are coming from to solve some of these issues. And that's

context engineering design and MCP if you use it naively. And again, this is why what I alluded to is the 99 percentile rule. Don't use MCP because if you by default use MCP, you're like, I can just use this package and go do it. Your agent will do the wrong thing because now you have the linear and the GitHub SDK when your user only authed into GitHub. And now you could say, I exactly.

Dex (24:57.006)
But you're still passing all those instructions.

Vaibhav (25:00.075)
And it's not to say, Hey, of course, some of you might say, we could be clever. We could say only give the OAuth ones that you've logged into. agree. But you're still, if you go look at the actual GitHub MZP or the linear MZP, you will literally just go see how much redundant tokens it has that are purely like useless tokens. If you've looked at what the cloud code team says, they fight for every tool that gets added into there. And every single ticket tool goes into this is how to put it.

Like why do they fight for every tool? Because they know adding a tool is context float for 99 % of users except that 1 % that needs it. So unless you're certain all your users need something, don't add it to the context window.

Dex (25:44.876)
Yep. So this is, this is like kind of how I model this is like you have this long tail of tools that you want to let users bring in their, whatever it is, but like the things that you have a high percentage of users and like over time you can add first-class things for all right. If someone, if there's some MCP that starts becoming really popular and lots of people are using it, then that's your signal to go pull. Yeah, exactly. Migrate it and build a first-class integration.

Vaibhav (25:51.906)
Exactly.

Vaibhav (26:02.804)
Migrate it.

Vaibhav (26:07.38)
Exactly. You're basically going to tell users, we provide you long tail support, but we will do, but, but they will work worse. And because the user brings the MCP, they're almost primed to believe that it'll work worse because they're bringing the code, not you.

Dex (26:16.568)
Yes.

Dex (26:24.782)
So you do all your context engineering, you do all your prompt engineering, you do all your like token pinching on these things that are going to be used a lot. And then for the long tail of you, it's the same thing we talk about with like, how do you do your prompts? How do you do your workflows? Like use an agent, like shell out for, for, for less common things, shell out to, you know, the generic off the shelf, like just make it work and it will be lower quality. And then over time, understand which things are worth investing more time.

Same thing we talked about in the reasoning episode almost a maybe a year ago where it was like, yeah, make it work on 03 or oh, I think it was 01 at the time. It's like make it work on a really beefy reasoning model. And then if you find a use case that's being used all the time, then go optimize the prompt for GPT-40 Mini.

Vaibhav (27:10.742)
Yeah. And then like also like, for example, if in your agent tool, you're detecting that, these MCPs haven't been called for a while, literally tell your users, do you want to temporarily disable these MCPs because you're not calling them at all? Like educate your users through your application code to make it better for them. Don't just let them shoot themselves in the foot. Like that's really the goal of our jobs as engineers building these products for end users. We really want to make sure that our users don't hurt themselves.

Dex (27:23.749)
I like that.

Vaibhav (27:40.196)
And don't perceive our apps to be the problem when they use an external MCP and they're like, what's going on?

Dex (27:46.018)
Yeah, there's a really good example of this is is the cloud code. They have this slash context command where you can see how much how much how many tokens are being taken up by all your MCPs, all your skills. We talked about this in the in the episode we did, I think two weeks ago on like agents and skills and like every single one of these adds things to your system prompt. And so it's like give people ways to visualize it and then over time give them tools to to improve it. I want to ask you about I think we talked about tool search. Have you looked at OK?

Vaibhav (28:13.122)
Wait, have one, wait, before that, there's one really good question in here that we should answer. Jack asked, why not just use a single function called getTicket source, Jira or linear, slug? And I can at least give my two cents and maybe you can have two cents. One is if you only have a single source that the user's authored into, I don't want the model to even think about the idea of a source. I just want it to know it has to get tickets and operate on that.

remove that like axis of dimension. Because if it thinks it can choose from these functions, then it will. And like, for example, if I have OAuthentic.

Dex (28:44.13)
Yes.

Dex (28:49.602)
Yeah, the same thing with like directories, right? If it's like, if you know that the agent is working in a specific context with a directory, don't put the directory in the system prompt and make the agent pass that directory to every tool. Just remove the directory as a parameter because the deterministic side of the system is going to inject it.

Vaibhav (29:07.402)
Exactly, exactly. And then why not do the full thing? Let me put the code out here and I'll explain this.

Dex (29:08.749)
Aye. Aye.

Dex (29:13.634)
Yeah, yeah, pull it up while you're doing it. Like I do think Jack's idea of like, do you like collapse tools into as like smaller thing as possible? Like if you can make that schema dynamic based on based on what they have off in, and if they only have one, then don't show don't don't have it be a param. I think that's great. And I think yeah.

Vaibhav (29:25.867)
Exactly.

Vaibhav (29:32.493)
Here's how I see people doing this. I see people doing this and this is bad. What you really want to do is exactly what that sure says, which is you basically want to say like what the options to this thing are dependent purely on the user. I dynamically pass in various things based on what's there. And in the case of it, in the case of nothing, this list being single fold, I might even remove the option to have that. Say that again.

Dex (29:55.406)
remove that from the schema.

Dex (30:00.226)
you just remove it from the schema entirely. just have the model pass the slug. And then you have a closure over that function definition where the known users connected thing is just passed in.

Vaibhav (30:02.592)
Exactly.

Vaibhav (30:12.088)
Exactly. That's the right way to model this. The why did I say this? Again, it's a 99 % tile rule. I know if we say go do this, 99 % of people are going to go do this. This is going to lead to a worse agent experience. It's easier to write multiple functions. Uh, really what I should.

Vaibhav (30:36.94)
That's what you should be doing for linear versus...

And most people are not going to go and do the effort to go write this level of code. So if they're not going to go do it, don't like give 90 % of the people don't give them a chance to make that mistake on your team. And again, it's based on how big your team is and how large it is. If it's a whole bunch of cracked engineers and it's just like a few of you, great. Go do this. Go do this. Cause it's easier to enforce. If all of you are using Claude code to go write the tool. Remember Claude is just the laziest engineer out there that just happens to be really fast at typing code.

It's going to do the first thing. So just make sure you audit for that sort of behavior under the hood. Every parameter that goes to a model that is, and you just use this by like Dexter's model here is actually the best way to look at this. Everyone I know that's building great agent really understands deeply what tools are calling it and what frequency and for tools that are highly frequent audit the heck out of them. Literally be like, do I need these parameters? Do I not need these parameters? It's a description bat. That's how you make your agent quality go up.

Dex (31:21.165)
Yeah.

Vaibhav (31:44.321)
along the way.

Vaibhav (31:49.868)
Dexter, you were saying something before this about talking about what's it called.

Dex (31:56.174)
Just scroll down to the code I'm writing. This is kind of the idea of the closure, right?

Vaibhav (32:00.112)
yeah, yeah. Exactly, exactly.

Dex (32:07.768)
So it's like if there's zero, then you just don't include it. If they don't have something connected, don't return anything. If the length of the sources is one, then you return a closure over that source. And then if they have multiple, then you return the full tool that has access to both sources. But the idea here is like you are putting some annotate. The idea here is this defines the schema that

Vaibhav (32:20.993)
Exactly.

Dex (32:32.748)
Like the signature of this method defines the schema that is passed to the model.

Vaibhav (32:38.742)
Yeah, so like, I think one of the questions that we get asked is like, how do you go do this? And the thing is like, this is actually really, really hard to do in most languages. You just fundamentally can't do this in Go very trivially, or Rust, or Java. And like...

Dex (32:51.256)
Well, cause in Go, Rust and Java, can't like, there's not good tools for like inspecting and turning a method. I mean, you could do it, but to turn a method signature into a JSON schema, like in TypeScript, wouldn't do that. Even in TypeScript, you would do this with Zod. You would create the schema and then you would create, and then you would attach the implementation with the closure.

Vaibhav (32:57.93)
you can do reflection is hard reflection is

Vaibhav (33:06.676)
Well, try doing this in Zod actually. It's really hard to do this dynamically. Dynamic types are hard to model in TypeScript. The only language that makes it moderately doable is actually Python.

Dex (33:16.6)
Well, in Zot, I would just do this at runtime, right? I would just say like, you know, tool schema equals, you know, instead of, instead of this, I would do, you know.

Vaibhav (33:24.492)
Yeah, you have to do like a builder pattern along the way. Yes. But that still doesn't give you the type safety you need to guarantee that everything that's being passed in is actually correct.

Dex (33:26.668)
Yeah.

Vaibhav (33:35.032)
What you really want to do is you kind of want to omit certain fields and certain properties and put default values in them. You want to go manipulate them. And I think this is kind of why people don't end up doing this most of the time. Because it's actually kind of hard and annoying to go do this. And this is why... Go ahead.

Dex (33:49.548)
Yes, and Evan makes a really good point. like, seems like it's tailored to how you want, like, it depends how tailored you want your agent to be to the ticket retrieval use case. And so if you're building a chat pod for lawyers, you obviously wouldn't do this, but you would do something similar for pulling documents from all the various places that like serve case law or whatever.

Vaibhav (34:02.829)
Yes.

Vaibhav (34:08.446)
Exactly. Because like if you have like 70 different queries, all sources, like one for every state that works out there, you just don't want to deal with that. You just want to have one query from the agent's perspective. It's very similar.

Dex (34:18.572)
Yeah, ticket sources could be states. could be area codes. could be,

Vaibhav (34:22.2)
You know how like Open, I don't know if you saw this, like Open Code does something really cool with like grep. They call it grep, under the hood they call it rip-grep because they're just like, exactly, because it's incorrect to make the agent think about grep versus rip-grep. You just let the agent think in the form of grep and let it do what it needs to do under the hood. It's basically the same thing, it's closure.

Dex (34:30.7)
Yeah, I think Clyde Co does that too.

Dex (34:41.676)
And then you're RLing the model on a way smaller set of tools and you're optimizing it for a very deterministic set of things.

Vaibhav (34:49.15)
Exactly. That's, think how I think about, and this is like, again, when you go down to this world, try doing this with MCP. It doesn't really work. Like this is, this is like engineering that you have to know that has context about your application. You can't just like outsource that part of the thinking to it.

Dex (35:06.818)
And again, this is all everything we do on this show. And Evan's question is like, I'm new to AI that works. Are we coming from the perspective of agent builder, MCP server, MCP end user? This is really about like, you are building an application to serve users, I think is the primary thing we're talking about here. Obviously as an MCP server builder, you should give people as many levers as they can to context engineer. Like the GitHub MCP has flags that let you turn off sets of tools. You can say, I only want the repo tool set, or I only want this and that. And that's definitely part of it.

And you should be aware of this so that you can like engineer your stuff in that way. But I think the, yeah.

Vaibhav (35:42.858)
Like I would say, I would say like, for example, like there's a reason Claude code stopped pushing MCP as much and moved towards skills. Cause when it comes like Claude, like in their documentation, they had a whole phase about MCPs. The phase is not moved on to skills. Why? Well, because even if you want to make your application extremely flexible, it turns out MCP is both too strict and not strict enough at the same time. So it doesn't give Claude code the ability to actually let users manipulate

code as much as they want as skills do. But then also at the same time it doesn't, it provides some of the same problems. It's addressing kind of the same problem surface area over there, if that makes sense.

Dex (36:29.142)
Yeah, there's a really good question about tool search and I think it might be interesting to actually draw the context windows and what the difference is because I I think what what cloud code did with the with the tool search is they made some interesting choices and so if this is your context window.

Vaibhav (36:34.412)
Yeah.

Vaibhav (36:47.167)
yeah, Cloud Code did some, I think the way that they did tool search is how most people should just copy it. Like don't think.

Dex (36:52.75)
Oh, so so I actually I actually don't think I actually disagree. So I think the tool I think the tool search is good. I think it's like anything else is like letting users bring their own MCPs. You're going to have this long tail of things where people can customize the tool and the performance is not as going to be as good on those tools. And overall, the more the more MCPs you bring, you're going to degrade the overall quality of the agent compared to if you and your team context engineered every single tool in that context window. The challenge I have with tool search.

Vaibhav (36:56.965)
okay, that's great. That's my favorite topics.

Dex (37:22.898)
is so you have your system message. Sorry, I'm going to change the stroke here. So you have your system message and then you have your tools and then you have eventually you have your user message. User and then the assistant is going to call some tools.

Dex (37:47.246)
We're going to have to slop clone Excalibur, dude. I'm sick of this. And so this might be like read and then edit, right? And then you have your final assistant message.

Assistant, right? Let's say it's a really small change. What they did with tool search is they have like search and then you have to do read and then you have to search again and then you have to do edit.

And my take is basically like I've seen the agent have to search for the right tool like W. Sorry. Let's say it's right. Just to be more clear. Like search for the right tool where what I would probably do is in the tools message because of what they basically did was they replace all the tools with this is my understanding. They may have changed this, but I've seen recently the agent have to search to find the right tool where they just give you search and then you can like call.

Vaibhav (38:28.255)
Interesting.

Vaibhav (38:35.659)
Yeah, with a certain search.

Vaibhav (38:45.087)
I thought they do give you the basic things like at read, write, and a couple of other basic ones.

Dex (38:51.074)
Like I said, I've seen the agent have to search to use the right tool and search to use the skill tool. And so my take is basically like, instead of just search and run, you should have like search and run. then those things that you built into your system, whether it's, you know, right edit bash, whether it's, know, fetch, fetch ticket. and so like the things that are super, super common should be here and you should just offload.

Vaibhav (38:54.71)
I see.

Vaibhav (39:06.891)
Yeah, exactly. Yeah, yep. That's the correct way to go do this.

Dex (39:15.694)
the more complex tools. if you're building a super general purpose agent, if you're building ChatGPT and you have no idea what tools are going to be in there, then yeah, sure, put tool search in front of everything. But if I were building ChatGPT, I would keep the web search tool as part of the main context window and only offload. You know what I mean?

Vaibhav (39:15.98)
Yep.

Vaibhav (39:34.025)
I was, I don't know if we can share this, so I will not talk about this. I saw this on the codex theme and like it, it's the same amount of thinking. I'm pretty, that's why I was like, I was pretty sure Claude code adds edit and write. Cause that'd be insane to not have in there. Like why would you make the agent search for the edit, read and write tool? That would be absurdly incorrect in my opinion. Same with grep. Like it's just 90 % of what Claude code does.

Dex (39:55.342)
Yep. that's take on it. If you're to build tool search, it's very nice from a mental model perspective of just, you have this interface between the model and the tools, and it always accesses them the same way. And it does introduce complexity, just like introducing complexity and doing all those weird closures around the tools to make the schema better. But coming back on the point, our goal here on this show is to teach you how to push the boundaries of what the models can do.

And so if you want to be, I'm not going to call it lazy, but if you want to be like simple in your architecture and just everything happens through tool search and we don't have to think about it, that's great. But somewhat one of your competitors is someone else building something similar is going to push the context, like window to its limits and context engineer the most important use cases and their users are going to get 1 % or 5 % better performance. like our goal here is to give you the tools to like.

Vaibhav (40:35.104)
Exactly.

Vaibhav (40:46.611)
it in.

Dex (40:49.474)
be at the bleeding edge of like, what can the models do for a certain task, giving a certain set of tools.

Vaibhav (40:54.441)
In terms of alpha, there's only two alphas in today's world. Your agent performs a little bit better than the base market. I guess three alphas. You have extremely good distribution or you have a shit ton of VC money that you're willing to burn to subsidize costs. There's only three alphas that you can have. And like two of those, you already know if you have them or not. We can't really help with that. We can just help with the last one. And that's what we're doing here. We're just trying to give you that last bit of alpha. Cause even if you have the other two, you can get a little bit more.

you can operate in two or three dimensions now instead of just one. Is the way to go.

Dex (41:26.632)
yeah. And the way I think about, actually drew this for the first time, recently. The way I think about this is like, you have the like jagged frontier of models, right? They're good at certain things and they're not good at other things. and so like, you can basically say like, okay, the, the model, let's rotate this. There's, there's some frontier of like, okay, cool. Like the model can get this task, right? You know, 90, 90 % of the time, right. And it can get certain other tasks, right? You know,

40 % of the time, right? I don't know why I drew this in radial coordinates, but it's fine. And then if you're willing to do this context engineering, you're going to be able to push the boundary on certain tasks. And so maybe this one you're getting 50%. And this one you're still 90%, but there's other tasks where you're getting significant gains, where your version can do better than what the status quo is.

Vaibhav (42:02.429)
I love radial coordinates, it's okay. Radiance all the way, Okay, go on.

Vaibhav (42:14.763)
Exactly.

Vaibhav (42:20.352)
Exactly.

Dex (42:23.904)
And people say like, what am I doing? All this context engineering. And then the models get smarter and I get bitter lessened. And then like, now I'm now all of my code needs to be thrown away because the agent can just do it. And the idea is like, as that frontier pushes out, let me copy this. like a new model comes up. Exactly. A new model comes out and the frontier extends in certain places. If you are willing to put in the time and do this context engineering.

Vaibhav (42:23.991)
Yeah.

Vaibhav (42:38.379)
Yeah, so does yours.

Dex (42:49.314)
then your frontier will also extend and you will also be able to do things that other people aren't able to accomplish.

Vaibhav (42:56.183)
Exactly, exactly that. I want to go back and address a couple more points. Well, I think we discussed a lot of what MCP is about and where we think it has its like primary use cases. It sounds like the primary use case is long tail tasks. And really like, should you add an MCP client into your application? It's just a matter of how many long tail tasks do your end users actually have? If you're a cursor, a lot of them, sure. Add some integration there. If you're cloud code, sure, add some integration.

but clearly MCP isn't working enough for even those people to go ahead and invest a lot of energy, not in growing MCP, but rather in a whole new way of doing this. They've tried sub agents, they've tried skills, they've tried commands. They're trying these things because clearly the old system is not working. Now I want to do something Dexter. I don't know if you're down. Can I just put on my like system design hat and just like tell you why MCP is like from a software engineering perspective incorrect?

Dex (43:44.6)
Yeah, let's do it.

Dex (43:51.662)
I love nothing more than the system design corner.

Vaibhav (43:54.4)
All right, let's do it.

Okay, so here's my problem with MCP. from just like, the theory is fine. I think the theory is sound. I want a protocol where I load dynamic tools coming in and I can put them into my agent, do shit with it. The problem is in the implementation. The first problem is just clearly one of the biggest use cases of MCP is to bring external data sources in. That doesn't work in the case of auth and security protocols. MCP just doesn't have auth built into it and there's no way to really make it fundamentally good for auth. And the reason is,

Like once I have an MCP and I call it list functions and I call a function in there, there's nothing in here that says this thing might not do something malicious that also calls an MCP and does some weird like chain attack effectively on my data. So like if I'm a, if I'm a vendor, let's say I'm a Fortune 500 company that sells on NASDAQ and I need to be, if anytime I have a security leak, I need to able to list that to my, all my investors and let them know something happens.

Well, if I'm a vendor that has to has this happen to, I have to have the full protocol layer of every single place that this is defined and where the leaks can happen. You just can't know that with MCP. mean, technically you can trace the code, you can do things, but because most people don't use MCP, again, if you want to use MCP in the most MCP way possible, should be an HTTP server, like we did with linear just now.

Dex (45:14.796)
I was going to say, how is that different from a REST server? What does REST or Protobuf or GRPC get you that MCP doesn't or that MCP makes it really hard to do?

Vaibhav (45:29.812)
What MCP makes it really hard to do is actually just have a clear understanding of what you're actually paying me. When you call a rest server, there's some entities you've trusted on this side. And that has like, for example, like two off. Once you have your auth token passed onto you, you're right that that person can go do this. But the problem here is once you give this information to an agent, it's a much more risky, pain point and it's much harder to like, how do I put it? The way that I, okay. Here's what I think about versus yes.

Dex (45:56.43)
I think, can you, can you like, just, cause I'm not following, can you slow down a little bit and maybe draw it from scratch?

Vaibhav (46:02.134)
Let me do it from scratch.

At least the way I think about off over here is like, okay, what does MCP buy you on top of what? Why is MCP any less, any more risky than rest? I think that's what you're asking.

Dex (46:15.768)
So this is a drawing of MCP wrapping MCP, right? And I'm not sure how that plays into the point you're trying to make.

Vaibhav (46:19.285)
Yes.

Vaibhav (46:23.922)
Once you have MCPs wrapping into MCPs, effectively the user's credentials, you somehow, in order to make this actually work correctly, the way MCP is designed, you need some way from here, from this other function call that's actually running, to kind of wrap back to the end user and OAuth onto here.

Dex (46:45.42)
I see, yeah. And all of the OAuth stuff that's been built for MCP is basically like, clutched in and you do it with wrapper servers. Like the way that MCP Remote works is it fetches your OAuth token and it stores it to disk. And it's like your personal OAuth token.

Vaibhav (46:58.365)
Exactly.

So like once you start doing this, this is just not architecturally sound. Because what you're really doing is you've basically leaked how OAuth works. You've now leaked how this client up here has to do OAuth. Oops, let me make this. You've now leaked how this client has to do OAuth.

Vaibhav (47:23.112)
all the way over to this client. They both have to do auth in the same way.

Dex (47:27.182)
because you're forwarding the credentials between systems is the only way to, to kind of like just like basically transfer an identity or a permission to do a thing.

Vaibhav (47:29.437)
Exactly.

Vaibhav (47:37.064)
Exactly. And if you're not doing this, then you're doing something even worse. Which is, you're taking credentials from here and forwarding them directly to here. Which is definitely way worse. Right? Yeah.

Dex (47:45.206)
Okay. Can I frame this in a different way? I think this is going to be a little bit like 50 % overlap with what you're saying. But here, I'll draw it down here. So let's take, for example, the idea of like a browser agent, right? And browser agents exist because sites don't have OAuth. Like if I had the option between a browser agent versus like an API call, I would always, always, always as a software engineer, rather use the API than have a browser agent go do the thing.

And let's use the world's worst example. Let's say we're doing a travel booking, right? And so the agent is the browser agent is on a page and it has like cool like here's your flight that you're gonna buy

Vaibhav (48:19.126)
Okay.

Dex (48:28.704)
And here's the form, right? It's like, okay, cool. Like, you know, credit card number.

dates, etc. And there's like a submit button, right? And if you were going to build like a naive permission thing, basically the agent is logged into the travel booking as me. It is me. It has my login. It logged in with my email and password. If you wanted to build human in the loop here, you basically have to come back to the human here and you can say like, cool, I'm ready to book this flight. Gonna book flight for cost on

dates with credit card. And then the human says yes, and then the agent goes and clicks the button, right? The submit button. You're relying on a ton of things going right there. And again, obviously browser agent is much less reliable than output of JSON that calls an API. But you're relying on the agent reading the form correctly, filling out all the fields correctly, and not accidentally hitting the submit button.

There is no deterministic way for you to guarantee that the agent will not do a thing that you have not approved. Same thing is kind of true for APIs is a little more secure. But what I would really like to see, you look at GitHub OAuth. Have you seen the GitHub OAuth? Have you ever created GitHub Personal Access Token? Yes. So this is what I would call basically state of the art for fine-grained auth.

Vaibhav (49:51.658)
Yep, I have. Where it has like the multi-scope access token.

Vaibhav (50:01.494)
Oh, a stripe is also very similar. Stripe.

Dex (50:02.88)
FGA. Yeah, Stripe is very good too. Where you have literally like a million check boxes here of like things you could give this token for.

Vaibhav (50:08.5)
And you select, yeah.

Dex (50:13.198)
the best case here, if I wanted to give an agent like access to like, like, let's say I wanted to give it access to merge PRs on a repo, the most granular state of the art full OAuth, like if you were being as secure as GitHub allows you to be is you can give an agent access to merge PRs on one repo. And that is way too broad. Like if an agent asks me for permission to do a thing, I want to know deterministically that you're the agent.

Merge this PR on this repo for the next 30 seconds Otherwise, you have to come back and ask again and we have technology for this. It's called JWT's And there was actually a paper called rich authorization which is like a subset of the oauth spec where you actually just sign a token that is like You know, so the agent could could basically furnish token, which is all of those parameters, right? And it has like, you know cost flight

and it has an expires in. And this is unsigned. The agent sends this to me the human.

I sign it with my like, YubiKey or Face ID.

A's ID, whatever my passkey is. And then GitHub on the server side, GitHub server has my public key and they can validate it basically. And so now I've created a system where like when an agent asks for permission to do a thing, I have deterministic like guardrails around like it can only do exactly the thing that I approved and the...

Vaibhav (51:33.162)
validates it.

Dex (51:54.764)
The enforcement of that is rather than having a long-lived OAuth token or something like that, it is for the most risky stuff, it is a one-time action. And maybe I can issue a token like, hey, you're allowed to browse my bank account and read all my transactions for the next 30 minutes. You auth a session to go look at my stuff. But when it wants to send money, that's a permission escalation.

Vaibhav (51:59.754)
It's a one-time action kind of.

Vaibhav (52:11.199)
You wanna see something? I'll show you something really cool actually.

So Bruce really asked the question, I wish these odd services would just go solve this. And the reason that these odd services don't do this is really simple. Changing your authorization tokens is a shit ton of work. Building scope API keys is, exactly, building scope API keys is also very challenging. That's why like Git, Ammon, and Stripe are one of the two companies that are known for this because they've done it really well. And most companies just give you a dev key.

Dex (52:32.012)
And it's incredibly risky.

Vaibhav (52:46.139)
If this was easy and useful, it would be so much more prominent. I think the other analogy that I want to bring back to this like security thing I was talking about is very much like if any of you ever use Plaid to log into a bank account, it's very similar. Plaid does something really nice. Plaid acts as almost like a man in middle, a trusted party between myself, the bank, and the website. The website never gets my bank credentials, ever. It's not even allowed to access them in any meaningful way. Only Plaid and...

Dex (53:13.996)
But Platt has them.

Vaibhav (53:15.477)
Plaid has them, but the website using Plaid does not. And that's actually a very common, like, it's a very similar architecture to what MCP kind of aspires to want to enable, which is like, I have this server, I have this MCP, but only the top level server gets access to all the auth credentials and doesn't make its way down to every sub processor down below. It's kind of like this primary server has to be like Plaid. So to really make MCP work, you kind of need to build Plaid for MCP before

MCP can actually work in this layered approach that was initially imagined. Because that's how you actually secure everything. You have to have one central source of trust that does all sorts of authorization. doesn't work here because OAuth only works when it's in a browser situation and directly communicating their website. Once you start going to like secondary or third degree websites, you can't really OAuth in the same way anymore because the tokens aren't, they don't give you the same level of security that like an OAuth promise is supposed to.

So once you add a man, like a man in the middle system here that both the end user and users trust, then OAuth suddenly works again. And now MCP can actually work. It's like, why do I think like MCP was not built in the right way from a system design perspective? Well, because like these things should have been thought of and like, and even if it wasn't thought of, even if it wasn't thought of, it should have been natural to extend it rather than having to redefine the protocol to make all these things work on top of itself.

Dex (54:44.29)
Yep.

Vaibhav (54:45.045)
And like, I look at like MCP versus rest, rest is so freaking good because we haven't had to update it. We started with rest and we actually had rest with like multiple methods. And now we just, we, we de-scoped rest. That's how good it was. We just use put, we just use get and post for 99 % of things.

Dex (55:04.374)
Well, we is, I actually have this argument all the time. can, we can have another episode about, we used to call it Twitter rest because Twitter was the, in 2011 was the first API to start get rid of all the other methods. If it changes data, it's a post. Otherwise it's a get. There's some weird like CDN edge caching things you get if you use all the other methods. But yeah, I, yeah, the fact that rest supports headers made it so that we could basically, we built OAuth on top of rest.

Vaibhav (55:12.041)
Yeah. Yeah, that just said get imposed. Yeah.

Vaibhav (55:19.593)
because it's simpler.

Vaibhav (55:31.446)
Exactly. We didn't have to invent something new. And that's what is a sign of a well-designed, beautiful protocol. And I think the bar for a protocol is infinitely higher than the bar is for a package. So I think MCP cannot withstand the standoff time because it tries to live up to the bar of a protocol. If it tries to live up to the bar of a package, I think it can be fine. But if it's trying to be a protocol, we have to hold it to a higher degree. And only the things that can work

in the protocol layer are things that are well designed and tested and can only withstand the test of time. By definition, MCP has failed that because the cloud code itself has abandoned it in favor of skills. So therefore, like...

Dex (56:11.288)
Well, skills are kind of just offloading the entire auth thing to like, hey, look, if you need to auth to a system, the skill just instructs you how to use a CLI or use curl or whatever it is. they're using the existing protocols instead of the MCP protocol.

Vaibhav (56:20.821)
but that's my point.

Vaibhav (56:24.923)
Exactly, because they realize that it doesn't solve the problem. So by definition, it cannot live up to the standard of a protocol. That's... yeah.

Dex (56:31.342)
One thing we haven't talked about that I think is worth touching on is like this whole context thing and skills and all of this, like skills only work if you have a bash tool. Unfortunately, if you don't have a bash tool, like, and you can't call a CLI, then like you're actually back to, can't do much with a skill. It just ends up being a prompt module, right? It's just a prompt that tells you how to use the existing tools. And I think in the enterprise,

Vaibhav (56:54.799)
Exactly.

Dex (56:57.614)
very few systems are willing to give a model access to bash or to an open coding environment where you have access to stuff. And people really want to keep it very locked down in terms of like, what exactly can this agent do? it's the sacrifice. When you use a bashful, you sacrifice a little bit of like security and determinism for the sake of like more flexibility and like better context engineering or better context, you know, I don't know what to say.

more efficient context usage, which gives you better results and better performance. But the trade-off is that you have to be willing to let that agent kind of like flail around in this environment and potentially do some scary things.

Vaibhav (57:35.082)
Yes. I mean, like I said, I think the right model for this stuff, and here's what I think is going to play out. like Evan, you brought up a good point. Like people do use this. Where like people do use these systems. So like there's value in like using them for whatever it is, whatever use case it is. And like if your customer needs an MCP integration to make it work, go ship the damn thing. Like there's technical purity is not correctness here, in my opinion. Like you ship the thing, whatever the users need to make the sale. Assuming it's not.

Please don't do fraud.

Dex (58:06.51)
The difference between me and vibe of an old man yelling at clouds is that we're trying to give you all the tools and understanding to go fix these things

Vaibhav (58:14.773)
Yeah. When I go think about what we're really trying to build here, and I think this is what's lacking, is MCP is really a poor man's attempt of trying to build a app store-like ecosystem, extensions-like ecosystem. What is VS Code? Well, VS Code is an editor that we all use and then build extensions. And the extensions are what give it user-built capabilities along the way.

And that's what makes it so powerful. And they to build a whole SDK and ecosystem around it to make it secure, safe, and et cetera, et I would say iPhone is very similar too. We use all these apps that are user defined code that we all run, that we all like to trust and use. I think these agent harnesses are lacking that because one, they're moving so fast that they can't actually codify what their API is because they'll just break every app effectively along the way. And there's no real yet like...

platformy definition for these agent harnesses. They're kind of like live in this weird world of their shell script, but also a platform at the same time. And that's why I think there's so much debate around the right architecture around these, because you're trying to platformize something that runs locally on the user system without very good architectural boundaries that are defined.

Dex (59:31.66)
I like it. Should we close on that?

Vaibhav (59:36.981)
Yeah, exactly. Get off my lot, no joking. I do hope we can invent something really nice. I really do hope that we end up in a world where people can invent new modules and source codes and run them securely along the way. If you look at Vercell, Vercell ships a thing that's like just bash. Go try that. It's really freaking powerful. It's really freaking cool how it works. It allows you to have bash in an emulated environment. It's just a superpower. And I think we'll invent more things like that that are gonna make it MCP more powerful as we go on.

Anyway, I think that's that for today's episode. think next week's episode is going to be a vibe vibes episode

Dex (01:00:16.94)
Well, sorry, excuse me. The name of the episode is no vibes allowed. The entire point is here's how you use coding agents to ship production features where you actually care about the code and the architecture.

Vaibhav (01:00:21.66)
No vibes allowed, exactly that.

Vaibhav (01:00:30.388)
Exactly. We'll ship a new feature, we'll live code for about two or three hours. You'll get a good feeling for how we actually discuss systems along the way. And then for those of you that are interested, on April 11th, we have a date locked in. We are going to be holding a podcast. We're going to be holding a podcast episode, but live in San Francisco. It's going to be called AI That Works, The Unconference. It's going to be very similar to an episode, to a show that we held last quarter in SF.

was tons of fun and it's like, it's an audience driven episode. So we actually do our best. We try and select for the most intense advanced builders out there. We bring you all out there and like you guys build agenda along the way. You suggest what topics you want to talk about. People get five to 10 minute talk slots that they bring day of they show real code. We have a really in-depth discussion about it. If any of you are interested, you'll see the link go out live on our Twitter's and on the email that follows up on the episode.

Dex (01:01:00.132)
it's good.

Vaibhav (01:01:30.056)
Come join, come hang, it'll be a blast.

Dex (01:01:30.392)
Yeah, it's going to be great. Yeah, I don't know exactly how we're going to pick content, but last time the thing we did that worked really well is like you come in while you're having your coffee in the morning, everybody writes a talk title on the whiteboard or whoever wants to give a talk and put a talk title on the whiteboard. We pick someone to go first. We may do some voting and some sorting. We may do multiple tracks, but like last time we had about 40 people and what worked well was like one person goes first.

Vaibhav (01:01:43.292)
and just vote for them basically.

Dex (01:01:54.52)
And then when you're done talking, you go to the whiteboard and you pick the talk that sounds most interesting to you and that person goes next. And we just do that for a couple hours and everyone shares cool stuff that they're working on.

Vaibhav (01:02:03.632)
It was one of my favorite days that I've spent a while. So hopefully you guys come join.

Dex (01:02:07.426)
Yeah, so if you're in SF or you can make it to SF April 11th come through we'd love to see you and thanks everybody. We'll see you next week. Bye bye.

Vaibhav (01:02:15.218)
Adios!
