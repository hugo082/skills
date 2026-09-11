Dex (00:00.162)
You got a real mic, dude. Finally. Amazing.

Vaibhav (00:01.915)
We got a real mic. We are back on schedule with perfect audio. Hopefully there's no background noise. Hopefully you guys can hear us. We finally made enough MRR to afford a microphone.

Dex (00:10.072)
It sounds great, dude.

Dex (00:17.995)
really? You're making money now?

Dex (00:22.86)
No, no, you want to be, you want to be pre-revenue. Then it's a pure play.

Vaibhav (00:26.306)
sorry sorry we're totally totally totally no revenue i take it back

Dex (00:32.526)
You're gonna burn those tokens, dude. Drill baby, drill. What's up, dude? How you doing?

Vaibhav (00:40.059)
I'm doing good. Unconference was tons of fun. I'm so glad we got to put that together. We had a great turnout. I was so surprised. think of everyone that showed up, over only 15 % of people that were accepted didn't show up, which is insane for an event in SF, to be honest.

Dex (00:48.654)
We show off some photos.

Dex (01:01.442)
Yeah, we had like 80 people approved and I think like almost 70 showed up. Something like 65.

Vaibhav (01:05.391)
Well, we had 80 people show up. I think we had like about 100 people approved. But yeah, like right under 100, but it was insane.

Dex (01:08.942)
Okay, yeah. And everyone who didn't come, pretty much everyone who didn't come sent me a text message like, sorry I can't make it, which never happens.

Vaibhav (01:15.297)
Exactly. Yeah. It was wild. We'll do a quick little recap for folks that weren't there. So you'll see a post from us pretty soon. Hopefully you'll get an idea for what we got up to. We'll write a blog post about it and share it around. But we're going to do another one in three months. It'll be fun.

Dex (01:33.71)
We're doing another one in three months. We'll get it the calendar a little ahead of time so that you can actually plan your travel to SF if you want to come.

Vaibhav (01:42.809)
Yeah, and we'll have a lot more room for more folks the next time around. So it should be easier for us to make sure that everyone in the community can definitely make it in.

Dex (01:50.67)
Amazing. Sick dude. Should we introduce the show?

Vaibhav (01:55.545)
Go for it, all you.

Dex (01:57.442)
Welcome to AI That Works, where we talk about AI That Works. This is the show with the worst SEO of all time. There is no podcast with worse SEO than AI That Works, but we're appreciative for all you here trying to pump it up. We'll get to the top someday. This is all about going beyond the demo and building things that actually work in production that you can put in products and sell to customers that you can put in your startup, whatever it is.

I'm Dex, I'm the founder of HumanLayer. We help people build cool shit with coding agents, especially in large complex code bases. I'm going to let Vybov introduce himself.

Vaibhav (02:31.29)
I'm VybOff. We're working on a programming language that hopefully is designed for agents first and no other language has done that to this date. So what happens when you run auto research on VybZ mode and build new syntax?

Dex (02:44.62)
Incredible. I love that. I talked to Jeff Huntley a lot about when he's going to finish Cursed Lang. And he actually told... Or no, was when is he going to finish his Lights Off Software Factory? And I think actually the alpha there is something around like we need new programming languages before the agents can actually build full Lights Off Software, otherwise they vibe code themselves into a slop corner.

Vaibhav (03:02.223)
Yeah.

Vaibhav (03:06.552)
Yeah, you need a totally different paradigm of software development. Like the CI CD needs to change. Everything needs to be different if you're going to run automatic loops. But that's not what we're here about today.

Dex (03:15.778)
Yep. Cool. So yes, today we're to talk about a really fun topic. We've talked a lot about Crispy and research plan implement and like how to get coding agents to ship better. One thing that we have found internally and also working with a bunch of users is there is one area where doing a lot of planning and reviewing markdown docs, it's great for like back-end like system stuff. It is not as good for front-end code. Like I can look at...

I'll even pull up, let me see, I think I can find one of these design discussions.

Where is it? Yes. So, are you ready?

Vaibhav (03:59.667)
Incorrect. Lean is not a good programming language. It's unusable. Anyway, go on. Show me what you got.

Dex (04:02.562)
no, no. This is not a TLA++ talk, thank you very much. So I have this thing, in, let me go turn these on. So we have this feature called tips. I'm reset all of these. And so now we can display these tips. They're supposed to help you through the Crispy workflow here. They don't work very well. People don't read them and they just leave them there.

Vaibhav (04:28.046)
They're useless.

Dex (04:29.26)
And they also don't click, well you already know how to do it. They are useless, you should turn them off. Which I don't even know if you knew how to turn them off. The point is, is we want to translate them to modals so that they just show up once and then you say got it and you're done and you don't have to read it again. So we have a bunch of copy changes here. And it has some front end code. Like I can look at this front end code and I can know does this like follow our design system.

Vaibhav (04:35.13)
I

Dex (04:57.154)
But I can't look at this and know whether it's going to look good or not. And so like what you end up doing, something that you often do in front end is you can vibe code back and forth with the model and get it to look how you want. And in this planning flow, you actually don't know how it's going to look until much, much later in the system. And so even here in the structure outline, we kind of...

I can read these components or I can read this like overview and I don't know if this is gonna look good or not. So I want to talk about some stuff like basically like we talked about learning tests before. Do you remember this one, ViBob?

Vaibhav (05:34.222)
We did, we've talked about them quite a few times. They're super useful. I use them all the time.

Dex (05:37.187)
So.

I'm actually going to go grab something from that whiteboard real quick.

kinda need a folder for this, but.

Vaibhav (05:49.474)
While we wait for that, I'm kind of curious for people that are on the stream. How many of you actually use AI to write UI? And how many of you feel like you're getting massive alpha on them? What's working, what's not working? I'm curious. One of the things that I know I struggle with is it definitely doesn't have the taste.

Dex (06:17.356)
the taste of making good UIs.

Dex (06:22.606)
think of the chat.

Vaibhav (06:25.32)
figma MCP.

Dex (06:27.852)
So the Figma of MCB is interesting. It's a way to go. What I'm going to try to convince you today is that you should probably just not use...

for this one.

Vaibhav (06:40.986)
I don't think we had them.

Dex (06:43.486)
no, sorry, they just didn't get pulled into the episode. Okay, I'm ready. Here we go. Yeah, I'll get into the Figma. Basically, what I'm showing you today is what we do instead of the Figma MCP. So basically, you have these assumptions. You can read the code to understand how the system works, and then can go make a plan, and that assumption carries through, and then you can implement, and then you get to the last phase, and you're like, that assumption was wrong, or there was some decision we could have made earlier on.

but we didn't find out until implementation. And we talked about basically in the planning phase, writing like learning tests and proof-based development, basically writing these little scripts that verify that the code works the way you think it does, or the external system works the way you think it does. So you find out your unknowns during planning instead of like during implementation. This is the same idea, but it's for unknowns about how

is how are things going to look and how are the UX experience is going to be. Does that make sense?

Vaibhav (07:48.633)
Yeah, I think that's, there's a few people in here talking about Stitch. They're talking about a couple other platforms, Stately AI, Figma. It sounds like some people just use ChatGBT directly.

Dex (07:56.109)
Yeah.

So what we end up doing a lot is basically we'll do our research and then we'll do our design discussion.

And then, well, sometimes instead of going straight to the outline and the implementation,

we'll pause and we'll do as part of our like quote unquote research, part of our pre-building is we'll make storybook stories. So we don't really use a lot of Figma here because Figma is just a wissy wig editor that agents are not that good at like interacting with, but they're really good at writing React code. And so storybook is this tool, it's been around for 10 plus years at this point, I think, basically since the beginning of React, where you can basically take your component,

And let me go pull up the code here. Nope, that's not it.

Dex (08:55.694)
Let me go back to our AI that works storybook.

Dex (09:06.254)
So you can take your component here and you basically have, we basically have this really simple like button story, right? And it has, this is our component that we would like build for our app. So I can come in here and I can change the font, System UI Sans Serif, we can change the border radius to 100 px and now all of our buttons are super rounded basically.

Vaibhav (09:32.738)
So I know a few people that use Storybook and I've know people have tried to use Storybook beforehand. I know we even tried to adopt it. Tell me why this is better now for agentic experience. So I get that it's super componentized. What am I getting? Show me what happens.

Dex (09:36.099)
Yeah.

Yeah. Yeah.

Dex (09:45.932)
Well.

Dex (09:50.082)
So yeah, so what we get to do is we get to do things like.

for 01, make all the buttons super, you know, what's a component you wanna make? Make a page for reading articles in a news story. So basically, you can vibe code your components and your building blocks and essentially,

So this is the thing I would use in my app and I can explore it via props in all of the different ways I might want to display it. And so in React, you have this idea of props versus state, right? So if your component is super stateless, then all it does is it takes these props and it renders something. And so Storybook helps you get that right and you can use it to test all the different ways your item might display. Does that make sense? Yep.

Vaibhav (10:40.697)
Okay.

Vaibhav (10:49.515)
Okay, so I understand that. Now I've got more questions, because I can see how the agent loop here is much faster. What I do is I ask an agent to build this thing. I go look at it visually or maybe have an agent use Playwright or a computer use to go access this locally. And I kind of this hot loop that can do something nice. And I can paste screenshots and also other stuff around it. But how do you make your code actually persist in that way? What I run into is I don't have stateless components.

Dex (10:56.163)
Yes.

Vaibhav (11:18.251)
All my components have state. They have to like use a factor or something else. Yeah.

Dex (11:20.366)
We'll get into that.

We'll get into that. So that's the idea that we get into that and like the difference between like pure and wired components. And actually it's actually written an article about this funny enough, because that's what we were talking about. But you can basically text like, okay, if there's no image, what shows up? Okay, I actually don't like that it says no image. want, if there's no image in the props, just don't show no image, just...

Vaibhav (11:28.813)
Okay.

Vaibhav (11:50.985)
use Whisper Flow or Super Whisper.

Dex (11:51.912)
straight to the text. No.

Vaibhav (11:56.014)
Okay, while you do that.

Dex (11:57.442)
But the idea here is like I can go get the like basically like the stateless all of the different like states that my component would be in and I'll get to a more realistic example in a sec. Here is like a storybook with a bunch of components from Riptide. So we can come and like do our theming stuff here and stuff. This is an example of like how we tend to work. Let's see this one doesn't have.

any interactive controls, huh? But where this gets to is basically like, built a, we built like a very small, like dumb little web app here. And this is wired with a backend and a front end and all kinds of stuff. And I could vibe code against this, but it's a lot more context to pull in. If I just want to like work on a single component, one, like it becomes a lot easier to build with. You know what I'm saying?

Vaibhav (12:56.601)
So, yes, okay, I understand why this is faster, but I guess you can't really test interactivity with this.

Dex (13:05.56)
So you can, that gets a little weird, one of the things that we end up building for these.

Vaibhav (13:08.62)
Okay.

Vaibhav (13:15.171)
Cause this is really freaking cool. I know for our playground, for example, I'd love to see this kind of stuff where I could like visualize stuff and just render out state into this.

Dex (13:22.134)
Yeah, and so this ends up being one of the stories that we'll build. so think these have basically, yeah, so you can't actually, these are all clickable, but they don't actually work. that's because the, well, so it's not that it's not running React, it is full React.

Vaibhav (13:29.794)
Okay.

Vaibhav (13:39.553)
Makes sense, because it's not running through the full React server.

Dex (13:49.262)
But if you come into, basically have pure components that just take props and render, and then we have the wired components. And so this has been for a while, like a pattern since, I don't want to say like 2014 or something, where you would take, you would create the wired version and this is where all your state and interactivity lives. In this case, it's pretty like small, but it's like, this is fetching data from an API and stuff. And so the separation that like the architecture thing here that I would like,

Vaibhav (13:54.701)
Okay.

Dex (14:18.392)
have people take away is you have basically, okay, they pulled in some loading states and stuff like that, but then you have your table with all the information. And so the fetching of the information is in a wrapper component, and then you have this pure component that is just the display logic.

Vaibhav (14:36.217)
That's interesting. That's very fascinating. I say this because while we're out designing the BAML playground, we have a really weird scenario. We actually run web workers and WASM code in the browser, and that gets you a really weird state with lifetimes and everything else for these WASM objects that you need to refer to.

Dex (14:48.908)
Yeah.

Dex (14:54.221)
Yes.

Vaibhav (14:58.05)
fuzzes things a little bit, I can see how it would be incredibly useful to just have pure UI elements for rendering things and be able to test and debug that.

Dex (15:06.124)
Yeah, and we can actually create like you can create storybook stories for the wired components as well or you can create the interaction layer in storybook. So like for the

Is anybody else's whisper flow like crashing all the time now?

Vaibhav (15:23.467)
I'm telling you, slop code is everywhere.

Dex (15:25.656)
For the 03 data table stories, can you create a separate group of stories that actually demonstrate the interaction, like the sorting and stuff like that? I'm not sure if there's a good way to do this in Storybook or if we just need to mount the wired components themselves, but we need to not actually fetch data from the API in Storybook since this is like an interactive playground.

I think Storybook does have like, can program in interactions, but basically like the architecture of your app ends up looking like, and we actually have separate packages. So we have like a, you know, we have the core repo and then it's a turbo mono repo. So we have like the apps folder, which is like all the things that actually run. And then we have the packages folder.

Vaibhav (15:57.197)
I see.

Vaibhav (16:13.069)
Yeah.

Dex (16:19.02)
And so we have a packages slash UI that has all of our like building blocks. And this is where basically all the pure components live. And then for Riptide UI versus like say Riptide Cloud.

Vaibhav (16:19.05)
Yeah, we have the same thing.

Dex (16:36.172)
If you go to these two different things, you can come and look in, here's Riptide, it has like a visual language, it has buttons and things like this. And then you can come to, know, cloud app and it has the same visual language and it's actually like using the same buttons and everything here. Like this is the exact same component that's being imported in both places. So like part of this is like use a component library. But the other part of it is like you always want to have your like

Vaibhav (16:54.551)
Yeah.

Dex (17:06.548)
pure component

Dex (17:11.522)
And then the only job of the wrapper component is basically to do a bunch of business logic, right? You have your like hooks, state, et cetera, that push props into the pure component that just renders. And so you would never actually run, render the pure component in your thing, but we can have multiple different wrapper components for like, okay, in the cloud we're fetching from different APIs. so, yeah. Yeah.

Vaibhav (17:11.746)
like be render only.

Vaibhav (17:35.648)
So I'm going to ask another follow-up question. So this is actually really interesting. How do you not get laggy UIs when you do this? Because it seems like you're going to get a lot of re-render loops in the wrapper component that will cause everything sub below it in that subtree to re-render. And now you have a laggy UI.

Dex (17:53.846)
I mean, part of this is like, I mean, I am not the person to lead an episode on React optimization and performance and memos and re-rendering and all this kind of stuff. But the idea there is like every component that you render matches this same pattern. So at any point, you can just take the pure thing off the shelf and make it look different. And so this app that we built has, you know, it has users. I can come in here and search for Avery.

Vaibhav (18:01.314)
Fair. Yeah.

Dex (18:23.18)
And then I can click on this user and I can get there. Didn't build a very smart, but then there's like a to-do system, right? So I can see all this user's to-dos and like, let's say I wanted to like change the look of this one. I don't like that. This is like, like grayed out when it's finished. I could pull up the entire app and then create a data state locally that matches that and then go try it. Like this is fetching ideally like fetching real data from the API, but because we have this as a pure component.

Vaibhav (18:48.961)
Understood.

Dex (18:51.542)
I can come in here and go to the to do card and we have every single state modeled out. And so I can test all of these. I can come in and actually like edit the props of any of these to see, okay, how does it behave in various different states?

Vaibhav (19:07.286)
Okay, that's cool. Yeah, I can see how this is nice. Well, you spelled it borken instead of broken.

Dex (19:10.704)
I don't know what the actual states are,

Yeah, well, don't think we have. Yeah, I think we have like... Is it crit? No, I think it's critical.

Vaibhav (19:18.226)
Just FYI.

Dex (19:24.858)
let's see. Critical priority, priority critical. Yeah. So the idea here is you can come in and change this. You can set the true, like is deleting. You can look at all the different loading states, is toggling. So you can check the loaders and things like this. You got all the things that might be passed into this. You can, you can kind of separate concerns between like the fetching and the data management and the state management from actually just like, how does it display in every single state?

Vaibhav (19:25.048)
Probably low is probably a priority.

Vaibhav (19:54.316)
That's cool. It looks like people in the chat also use this kind of approach. How many of you have actually used something like this or actively used something like this in your current workflows? Storybook, think, is open source, right? Yeah.

Dex (20:08.258)
Very open source, although they do collect anonymous analytics if you don't turn

Vaibhav (20:13.711)
that's the least you can do for an open source library. Offer them that. I'm just pulling this up really fast.

Vaibhav (20:26.615)
That's cool. This actually tempts me to want to make storybook for some of our stuff to make it easier to go build. We have the same thing where we have a Wasm component, where we have a native component, a pure web component, and having rendering for that would make life much, much easier to draw out.

Dex (20:32.898)
Yeah.

Dex (20:44.942)
We find it really, really useful. The thing we use this for a lot is like, you look in, if you're building a coding agent, there's like a million different outputs that the coding agent might give you. So I'll go back to sharing my screen. And I actually might just pull up the actual Riptide one real quick. All this code that I'm showing you, by the way, is all pushed to the repo already. But there's edits, there's diffs, there's grep, there's all these different things where we're just taking the raw data and rendering it. Every single row in this.

Vaibhav (21:09.174)
Yeah.

Dex (21:14.938)
is actually a is a separate stateless pure component. And so if I come into

Vaibhav (21:20.074)
Hmm.

Dex (21:31.49)
I come here and I run this storybook.

Dex (21:38.062)
should just.

So here's like the real production one with all of our different UI components in it. So here's like the draft action buttons. Here's all of our like keyboard shortcut stuff. Here's like the badges on the sessions. But I want to find the actual like conversation events. yeah, it was really, really helpful for like iterating on our like mermaid renderer because like you don't actually want to go like generate a document that has mermaid in it in every single case. So I can just come in here and just put like

Vaibhav (22:04.119)
Hmm.

Vaibhav (22:07.925)
Yeah, makes sense.

Vaibhav (22:15.081)
It just works.

Dex (22:15.436)
And now I can edit the mermaid thing. This one is not rendering very large, but yeah, you see what I mean?

Vaibhav (22:18.241)
That's cool. But I see, again, it's pure render only. I like this a lot. This is really interesting. This is really fascinating.

Dex (22:23.416)
Yeah. And so here's the conversation event message. Here's the coding agent thing is like, can literally see every single possible thing that the model might output.

Vaibhav (22:30.313)
And now I can see how your iteration loop is much faster, both for you and the agent, because you don't have to run the whole app, you don't have to run everything, you're literally just editing data in this place, and you're just telling the model, here's what I'm doing.

Dex (22:40.28)
Yep. And then you iterate. It's like, we found this data state we don't support. I write a little JSON. It's kind of like how you would do unit testing, right? But it's unit testing for visual stuff, is you would just figure out how, yeah, okay.

Vaibhav (22:48.053)
Yeah, exactly. But I've got a question now. Is there a hook to get storybook to print out a PNG via CLI command? That would be the next OP thing that I would want.

Dex (22:58.862)
I think it has some stuff for doing that. I just use agent browser basically.

Vaibhav (23:03.937)
Okay.

I think I'm gonna, I'm so gonna go on the PNG loop, because then can run an automatic loop with my agent to just like be like convergent until it looks nice.

Dex (23:15.682)
Yeah, so I've already been using, I actually, use the agent browser skill from Vercell, but that one is not installed in this project. So it found the, G stack install that I had never removed, but G stack ships with a browser agent. It was actually one of, one of the parts of that project that I do really, really like. But this is going to go take the screenshot and then yeah, I think we can open this, open it in my default app. Yeah, I know, right?

Vaibhav (23:16.598)
What?

Vaibhav (23:32.587)
That's so funny.

Vaibhav (23:41.355)
cheese stack mentioned. Dex is secretly going for fundraising through Gary Tan. That's his goal here. No, I'm joking. Probably not.

Dex (23:48.76)
Scary tan have money? I don't know. No, don't open it in my browser. Open the PNG dump.

Vaibhav (23:55.648)
He should have named it Tanstack and just beat them on SEO.

Dex (23:58.382)
I posted that a while ago. was like, missed opportunity to call it the tan stack.

Vaibhav (24:04.917)
the one true tan stack.

Dex (24:07.17)
Yeah, so you can, yeah, can screenshot this stuff. We use this also like to, like, we'll do this in PR review too, is like, we will as a team review just the storybook stuff. Like, I'll pull it down and just look at the components. I think it even, they have a paid thing where you can even leave like comments on it, but you can see how this ends up being like, if you can pull in your design system and you can enable people, I think this is way better than Figma, because it is just the code. There's no translation from.

how are we gonna take the thing in Figma and turn it into React code, but it's just as interactive if you're gonna use AI to do most of your designing. Oh, your audio just got really bad. Did your mic switch? Oh, there we go. Yeah, it's better. Yeah, so you can see how like.

Vaibhav (24:48.159)
Yeah, sorry. It should be better now. I was trying to disable noise.

Dex (24:56.554)
If you could get your designers, cause like Figma and code, it's all just markup and flexbox and like all this stuff, all these concepts are the same between like design systems and actually writing the React code at this point or writing the markup or whatever it is. And so I think like the thing that we see people doing is like kind of eliminating, like they still have a design step and they still review mockups, but the mockups are just the React components.

And then when you go to implement it, there is no like translate the Figma into React. It's just already there implemented with your design system in code. And it just, it's, it's already like approved by everybody. All you have to do is like the front end engineers job is to then work with AI to wire up all that data.

Vaibhav (25:39.767)
Huh, that's really interesting. I think the idea of being able to limit, how do I put it? The idea of being able to build that hot loop is really the hard part. And it sounds like this seems like a tool that might help.

Dex (25:55.148)
Yeah, I we use this iterate on UIs all the time. We use it to fix bugs in UIs all the time. That's how our storybook gets so big is every time we hit an issue or something looked bad, we would just like, okay, Claude, I need you to like reproduce this state with props in storybook and then we'll figure out how to address it.

Vaibhav (26:11.145)
Okay, so now tell me, big is your storybook collection here?

Dex (26:15.36)
It's too big and I need to clean it up and it's really poorly organized. But.

Vaibhav (26:19.095)
So that's the next question. In code, I feel like I know how to refactor code. How do I refactor the system? You said you were about to go do this.

Dex (26:23.244)
Yeah. I mean, it is all still code. mean, the only thing that you're really working through is like, okay, every single one of these is a code file, right? So you come in here and you see all these different items and you're... Claude likes to rip out a ton of these. And the other thing Claude will like to do sometimes, it will like draw something here and then also write the component in the application instead of creating a thing that can be imported in both places.

So that's another thing to watch out for if you're doing this is like making sure Claude understands this concept of pure versus wired. It's not super baked in the training set, but if you prompt it properly, you can get there. But we have stuff for comments. So this is like how we display comments in the app and conversations. So we riffed all of this out as a team, but

Yeah, I need to come through and reorganize this and make it like anything else. It does become bigger and there's a taxonomy of like, how do you order things? How do you organize things? That's true with like all code. but it's sort of similar as a learning test, right? Like, so Kyle wanted to integrate this charting library for some of our dashboards. The first thing he did was he came in and got it working in storybook. And then once those components were baked, then it just works everywhere.

Vaibhav (27:46.775)
That's really pretty cool. I think this is something that I might try taking a hack at if I get bored in the next week, which I probably will.

Dex (27:48.108)
Yeah. So.

Dex (27:53.516)
Yeah, I don't have a ton more content. We can do questions. We can architect some stuff out. I can answer your questions. But I just thought this was a useful thing that people would probably get a lot of benefit out of as you try to become more AI native.

Vaibhav (28:08.448)
Could you summarize the problem that you solved with this workflow? Someone's just asking me to summarize everything.

Dex (28:15.414)
Yeah, so I guess the biggest problem here is like number one is like taking non React code designs and turning them into React code creates this like extra feedback loop where you need to take what the designer did and then put it into code and then get their thumb sign off on it. And then the other thing is like the same way with unit tests, like if you want to test a logic change in your code,

you have two options. You can go reproduce that state in your app, which may take a lot of clicking and running and running curls and things like that. Or if you can isolate it and reproduce it in a unit test, then all you have to do is make that test pass and then things are working again. And it's the same thing for this is like you don't have to go spin up the whole web app and click around and create the state that reproduces the bug. You just as long as you can figure out, OK, these are the props when this component is in XYZ state.

this is what causes the crash or the ugly rendering or whatever it is, then you don't have to like go generate all the data. And it becomes really easy again with like unit tests, I can make a change to the component and I can click through the 20 other versions of it without having to go reproduce all those states. So it makes it really easy to iterate in the same way that unit tests make it really easy to iterate on problems or changes to backend.

Dex (29:50.124)
Yeah, you want to test your like pass result thing. You have to actually go write a program, spin up the playground, run it in the program, make a change, and then do that loop.

Vaibhav (29:56.777)
Exactly. this is so ugly because it shows pass, pass twice. And I know this. But that's because the data object that I'm rendering here is not as nice. Whereas if I build a sentiment classifier, text.

Vaibhav (30:14.97)
again it's gonna render the data and it renders the data in this parsed way but again this is probably isn't how I want to show like a sentiment type so I may want to have a different way to show a sentiment type sound is flaky I think it's my game sorry I may actually want to go ahead and like increase like render my sentiment type slightly differently and in order to do this I probably want to today what we have to do is go build this whole thing out now if you guys are curious I can actually show you exactly

Dex (30:39.618)
And you have to make a call to the LM to test if your change looks good. Like you actually have to run the full program and like, so how do you unit test UI? You have to have pure components. Yeah.

Vaibhav (30:44.243)
Exactly.

Vaibhav (30:48.458)
Well, technically, we have a hot reload loop here. So once you run it once, you can do it. But it's still not as nice as what it would take. And for example, if I run, oops, that was a not what

Dex (30:55.15)
Well, and if you wanted to send it to somebody else and they wanted to see it on their machine, they would have to go do all of this.

Vaibhav (31:01.056)
intend to show. I will have to run that again and hide the prompt. OK. For example, for rendering the prompt, we want to make this prompt rendering be a little bit nicer so it actually shows it to you in nice UI formats. I can't really do that here. So I will have to go ahead and build a UI component now for rendering the prompt. What is BAML for newbies? It's basically a programming language that makes alums good at doing things and make

output is really good. Proto buffer LLMs, that's a good way to describe it.

Dex (31:34.67)
It's not really a good For Newbies answer because protobuffs is a weird advanced concept, but...

Vaibhav (31:39.614)
Not a good newbies, yeah. It basically will make your elements just perform better without any effort, and it's interruptible with any other programming language. So can use it as a length chain replacement or a pydantic replacement or a Versailli ISDK replacement. But like, it...

Dex (31:54.626)
Yeah. Question from Rajesh, how do we add new feature in a big existing old UI repo? Our Cloud Agent hallucinates a lot. I mean, if you want to make coding agents to work well in big repos, you should use Crispy or RPI, which we've talked about a lot on the show. But, and like sort of the second question.

Vaibhav (32:10.358)
We're about to do something.

Watch this.

Dex (32:14.926)
Your internet's been a tiny bit laggy, but let's see if we can make it happen.

Vaibhav (32:20.245)
my internet's being bad? Or is it my sound?

OK, watch this. I'm actually going to ask it to go do this.

What I want to do right now is I want to migrate my repo to use a little bit more storybook components for the TypeScript component, especially for the shared components in the playground. Can you build one of the components, specifically the data renderer, as an output for the result of an LLM call into a storybook system? This is actually the prompt that I would write all the way. And I'll let this run really fast.

Dex (32:34.158)
Do want to do another question?

Dex (33:00.088)
Yep. We also, only see your, we only see your VS code window or whatever it is.

Vaibhav (33:06.538)
Let me share my whole screen so you guys get the whole thing.

Dex (33:07.916)
And yeah, you'll probably want to ask, if you ask the model to bootstrap storybook and like add, there's like two things, there's two things here, right? And this is getting into like Alan's question as well. It's like, you want to bootstrap storybook and then you want to like purify components. You want to take components that have display and business logic mixed and set that, split that up.

Vaibhav (33:27.158)
I pick.

I picked one component that I already know is a pure component. So I specifically did that already. But Dexter's point is correct. noticed I did this very contextually. I recognized what Dexter said about wired and pure. And I did not ask it to migrate all of my stuff. I supposed to say, can you build one of the components? Specifically the data render as an output for the result of a, it should be called function call into a storybook system. I know this is going to work better. So I'm just going to let this rip. Can I run, I'm actually, sadly Dexter, I think I'm going to run in cloud code because it's going to take too long.

Dex (33:33.496)
Perfect.

Dex (33:59.054)
Just run a free forum, Just run a free forum. Create a task. And then just make a session.

Vaibhav (33:59.31)
in our API workflow.

Vaibhav (34:09.311)
well I was gonna run the plan mode and then run this because freeform will not work that's why because I do want a little bit of plan mode because I don't want all the code to be slapped

Dex (34:12.578)
Okay.

Dex (34:20.588)
You could do freeform and jump straight to structure outline skill is what I do sometimes. It's basically like a mini plan, but that's fine.

Vaibhav (34:29.791)
Sorry, I do really like Riptide for almost everything, but for this specific demo.

Dex (34:34.968)
This is good feedback. No, we want to try to make it more accessible for like tighter, smaller workflows like this one-off shit.

Vaibhav (34:42.259)
Yeah, like what I

I want this, and I just want to run it. And this will do something. While this runs, cool. I think this will probably address most you's questions of how good it is. And we'll get a really quick answer very fast about whether or not we're able to produce a good outcome for migrating to Storybook in a new code base. If this works, then we know it works in new code bases, brownfield code bases, pretty standard.

Dex (35:13.624)
And you could do it incrementally, right? You could just do like Bootstrap Storybook and you get like a couple of those like Hello World stories just like with some buttons and then you could say like, cool, take this component and add it to Storybook and like split it into Wired versus Pure or if it's already Pure, can just do it that. You could just say like, okay, put this Pure component in Storybook. You generally don't wanna have your like stateful components that are making API calls and stuff in Storybook. That's not what it's for at all. But yeah, let's see what this comes up with.

Vaibhav (35:40.532)
Yeah, cool. While this runs, Jack, you asked how do I build a classification workflow? Here's like one example really fast.

Notice this UI is really bad because we don't use Storybook. We're working on it literally right now, thanks to Dex. If you want to build a classification example, it's something like this. A classification is basically a function that takes in a chat history or a user message, and it spits out a category. In this case, I have categories defined as an enum. No, we don't take sponsorships. We only show code that we are proud of showing and tools

Dex (35:57.614)
haha

Vaibhav (36:19.447)
will be like actually using. So hopefully it's unbiased content.

And then you just define the prompt. So the prompt is written like this. You can see the prompt. So like in this case, I've got a quick little test case. And like if you just run this, we can see what this runs as. It runs as account issue because it says I can't access my password login credentials. If you have rid of account issue, we can see what it pops up it as. And it comes in as technical support, which again is probably right. So you can just like build evals and test cases as you want to go and quickly understand this workflow. And for like more complicated systems like extract receipt, you can have a receipt

data type, you can pass in images and then it kind of just like works for you and there's small things it does like if the LMS is up on JSON you still get the right type and it plugs into Python type pretty straightforward. We still don't have a plan, god dang it, I was really hoping I'd talk for a minute and we'd get back to plan mode.

Dex (37:15.758)
Yeah, your code base is really big, dude. You gotta make it little. A little cute little code base.

Vaibhav (37:25.045)
Yeah, I know. It's very unfortunate. Yeah, this website is just promptfiddle.com. Yeah, it's a hard part about big code bases. Once you have a bigger code base, sadly, agents just runs. Everything in them is just slower. But this is also why I wanted to run plan mode, because I didn't want the full plan mode that Crispy has, which is very, very rich.

Dex (37:27.456)
I know, this is the thing.

Vaibhav (37:49.846)
Because that would take like 15, 20 minutes to go get anything out of. But this plan mode is also going to take like five minutes. But I think it should hopefully one shot it. And I think I have no changes in this repo. Yeah. There

Dex (38:08.334)
Thanks

Vaibhav (38:13.383)
Yeah, it's basically RPI++. What is WCAG type stuff? I don't know what that is.

Dex (38:24.494)
What WCAG? Web Content Accessibility Guidelines. mean, accessibility, I think just use Shad Cian and RADx UI and they do all that for you. But yes, Storybook also will do things like audit your contrast levels and like tell you if your contrast is high enough for certain guidelines. So yeah, they definitely have plugins for that as well.

Vaibhav (38:29.841)
Vaibhav (38:36.116)
Yeah.

Vaibhav (38:48.533)
That's cool. then I definitely want to make sure that, Dexter, by the way, you will have to take down the stream because I shared my API key. in, yeah, we'll have to do that. that's a great idea, actually. Let me go rotate my API key. Well,

Dex (38:56.828)
Okay, which APA? Just go rotate it, dude.

Dex (39:03.79)
All right, while Claude is working, ViBob's gonna stop sharing and rotate his API keys so I don't have to go delete the Twitter stream. All right.

Vaibhav (39:07.945)
Well, I'll share a different screen. that's so annoying.

Vaibhav (39:18.535)
I wish it would have it so much easier to just...

Dex (39:18.766)
Let's see, when will Riptide Beta open a bit? The UI to choose Crispy versus Free Mode would be the best of my week. Ignacio, it's coming. We are cooking hard on a bunch of things right now.

Dex (39:35.086)
Let's see what else. I'm just looking for other questions here. Yeah, storybook won't help if your designer is Claude. Yeah, at the end of the day, like certain things, you just wanna write the code. But storybook is really powerful. Like you can do all the things in the browser, right? You can right click, you can inspect, you can look at the padding, you can figure out where weird spacing is coming from. Like you could do all the things you can do in Figma, but you're just doing it.

Vaibhav (39:36.361)
Log into chat.jpt as we speak.

Dex (39:58.988)
directly in the browser. I get it. Some designers are gonna roast me for this. They're just like, you don't understand design and Figma does all this stuff that I could never do in React or is painful to do in React or don't make me write code. I'm like, that's fine, I get it. But the teams I'm seeing moving the fastest are getting folks to adopt AI and your options are either get your AI to write Stitch or Figma or Canva.

and interact via MCP and do all this stuff that's not really in distribution compared to just writing React code, which is very much in distribution. The models are really good at it. And it's the same way it's like, know some folks, I'll let you read this. I definitely know some folks who are like, they build coding agent tools and they work with large enterprises and they say, if you're not willing to migrate to a monorepo,

then we are not gonna work with you because the teams that are willing to migrate to a monorepo are just gonna get so much better results from agents that like it is not worth our time and like you're not gonna get as much value out of this unless you're willing to do that. And I think this is the same thing where it's just like, yeah, it's new skills, it's a new way of working, but there is so much upside to being able to write, do all your design with Claude code in a, you know, like.

place where cloud code is really good, which is editing files on disk, that if you adopt this, like, yes, it's new skills and maybe it doesn't have everything, but overall you're going to go faster. You're going to enable more, more types of people to contribute to the visual and design of your website. And you're going to make it so much easier to take designs and get them straight into production that I highly advocate for like, find, find a way to like,

move things out of Figma earlier and earlier in the process and get them into actual built components.

Dex (41:50.606)
Our designer started using AI to code and he hates Figma now. There you go.

Dex (41:59.118)
Okay, Justin said he only spent a tiny bit of your token.

Vaibhav (42:02.26)
Okay, we are good to go, tokens are saved and my API key is now swapped. Sadly, sadly yes. And then sadly I do have to read this so I can't just vibe it because I have opinions and I like to read at least the plan.

Dex (42:07.938)
Thank you.

Dex (42:17.186)
Let's read it. Always read, you have to read the plans. You should read something.

Storybook eight. Are we on storybook 10?

Dex (42:32.878)
Yeah, you should get Storybook 10 as the latest. This is why we do plan mode.

Vaibhav (42:38.108)
Yep, because it would have installed, this is the problem with the models having baked and stuff.

Yep, that repo is maintained by us.

Vaibhav (42:54.398)
What is this? Cloud is so annoying sometimes. it took a while to reset the API key. That's so annoying.

Vaibhav (43:07.656)
Yeah, I agree. The web search fetch loop is really dumb.

Vaibhav (43:15.654)
I think by 11.15 we should have storybook components running. It should be very easy to have it running end end. Yeah.

Dex (43:22.08)
Okay, I believe that. Yeah, I had a bootstrap storybook and had five components in about five minutes earlier today, so.

Vaibhav (43:30.194)
This is actually the problem that I run into most of the time. Sure, I don't care. This is the problem I run into most of the time. I didn't know Storybook 8 was the latest. And I would have been slightly lazy and I wouldn't have checked. But because Dextre knew off the top of his head, boom, we're actually getting the right fix. This is probably one of the most annoying things. I wish there was a way to cross-check versions of stuff and force the model to use the latest stuff. There's this Crayton's.

Dex (43:51.171)
Yeah.

Well, if you used Crispy, it would have used a web search researcher to go find out what the latest storybook was instead of using the default Claude plan. No, you could, but you could tell it to search the web for the latest storybook. Although you could have told this Claude that.

Vaibhav (44:00.468)
It doesn't do it by default. It doesn't do it by default. Yeah, but then I have to tell this exactly. It's like it has nothing to do with that. Just like I just have to go.

We had the same problem when we used this crate called Salsa. It's a Rust crate for building compilers and caching and stuff in them, so they're fast. We had the same problem, where by default it did not use the latest version of Salsa. Now that we use the latest version, it does the right thing, but the initial plan was a year older.

Dex (44:40.46)
Yeah, so Joe's talking about doing mock-ups in Figma Make and or Google Stitch and then create plans with AI based on that. The challenge there is that you're not going to know how it looks until your plan is actually implemented. You can't read the plan and know whether it's going to look good or whether it's going to honor the like thing that you wanted to build compared to actually just pausing and having it build the pure components, which is really easy to do. Like you don't need a plan to build one pure component.

Vaibhav (44:40.883)
Dex (45:08.332)
or a family of pure components from an outline. And then what I will always do is just like riff back and forth and vibe all the states of that component. And then we'll go do the plan that is like working across four different systems across two different repos to wire everything in. Yeah, what do you got here?

Vaibhav (45:24.756)
There we go. That looks pretty good. That's really nice. I like that. It's actually showing all the objects. This is exactly what I want. Let's run it. And notice I kind of skipped a few things, but I did want to read this part. And I was like, oh, that's what's going to show me in Storybook? Great. I'd be very happy with these stories.

Dex (45:32.322)
Yeah. Yep. All right. Ship it.

Vaibhav (45:48.562)
That's cool. That's cool.

Dex (46:02.574)
So now we cook. You might want to, as soon as it bootstraps storybook, you should be able to just.

Dex (46:12.31)
I where it's actually gonna put it. Yeah, there you go.

Vaibhav (46:18.611)
You know what I hate about ghosty? It doesn't do split terminal. It's so annoying. No, or maybe they do, but I don't know how to do it. See? My newb coding abilities don't allow me to use tmux. Oh, they do have pains. How do we do that, Prayash?

Dex (46:20.684)
Yeah. They don't have pains yet?

Dex (46:30.71)
interesting.

Dex (46:40.844)
Yeah, Frash, teach ViBob how to use his terminal, Split right, there you go. Wait, it was there. File.

Vaibhav (46:50.067)
oh my god are you kidding me that's so hard I think I just got leveled up this is why I secretly do this podcast so I get taught how to use basic stuff

Dex (46:52.108)
Hahaha!

Vaibhav (47:09.651)
We do the same thing as what Dexros, we have this core package playground that we actually ship into a Wasm component, a pure React component, everything else too, so it looks the same everywhere. I know all of you like these command shortcuts, but for me, I'm a clicky boy. I like clicks.

Vaibhav (47:38.567)
Still don't have storybook running. I hate coding agent sometimes. I'm just burning money out here All right Dexter while we wait because

Dex (47:46.074)
bank says, was this episode sponsored by storybook? Just wondering how many other tools workflows you guys tested. Look, man, it's not about the tool we're using here. And actually like in 2014, when react was brand new and storybook didn't exist, our designer on the team I was on built a version of storybook. Like it's not hard to build a component that renders other components with random props. You could probably vibe code a version of storybook that does everything that you want in.

the next in, in, in not a lot of time. If you know what you want is you basically want to, I want to be able to see six versions of this component with different combination of props. Like, yeah, you don't necessarily need storybook. We like it because it has a couple of affordances and it has things for like, if you have a theme switcher in your app, it does themes nicely and stuff like that. but no, we don't do sponsors here. We just talk about technology that we're excited about.

Vaibhav (48:40.723)
What is this? Why can't I run this texture?

Dex (48:45.592)
Dude, don't talk to me, talk to Claude. Okay, here's your result display. Doesn't have any of your styles, but.

Vaibhav (48:53.799)
Why does it my style?

Dex (48:55.244)
I don't know, Tell Clotted, it's probably still working. But click on some of the other items.

Vaibhav (49:03.955)
And there we go, it actually made, I mean not what I wanted, but it's got something.

Vaibhav (49:14.003)
I do want redaction there. Look good for it for recognizing that. I'm actually gonna hide the authorization key by default so I never have that problem ever again.

Ugh, this is disgusting. And this is literally what it sends. This is why it sends us.

Dex (49:28.974)
Nice.

I don't know if the logic is redacting or if it just put redacted props in, but yeah, ViBop, you're chopping up again.

Vaibhav (49:40.877)
open back i'm gonna get a wire here with the heck is going on in our office

Vaibhav (49:53.619)
way i think it did everything but didn't pull up my

Dex (49:54.445)
soon.

Dex (49:58.84)
So, I don't know, you can tell it like, hey, this looks like shit, it needs more styles. Or yeah, drop in the screenshot.

Vaibhav (49:59.029)
So what I'll do is I'll copy and I'll...

Vaibhav (50:07.717)
I feel like I'm missing the styles here.

Dex (50:12.706)
Yeah, so bootstrapping this and getting the styles brought in and stuff like this is one of the things that is just like you have to figure out. And like I was able to bootstrap an AI that works version of this pretty easily because we have a storybook and I just pointed at our other storybook and I was like use that as a starter template. So I don't know, maybe we need a skill for like setting up storybook and extracting styles.

Vaibhav (50:30.001)
This is kind of cool too.

Vaibhav (50:35.495)
This is kind of cool.

Dex (50:37.583)
you like the onboarding?

Vaibhav (50:39.279)
I do like this. literally would just tell Claude to do this. And then I'm done. That's how I would migrate over now that I saw this.

Dex (50:41.516)
Yeah. Yeah. Yeah. So we won't do it in five minutes, but there's one other question is like, do we integrate snapshot testing? Like snapshot testing is another good sort of thing here where you can make sure that like the layout of your stuff doesn't change too much.

Vaibhav (51:00.081)
That's cool. That's cool.

Dex (51:02.616)
but placeholder. I think the snapshot testing stuff is, it can get a little brittle sometimes and it's, I like to test things visually right now.

Yes, if you really wanted to scale stuff and prevent regression, then snapshot testing is a way to test your business logic and make sure your layouts haven't changed. But I think the problem with snapshot testing is it's only as good as the data set that you create. So you have to be pretty rigorous about, when something breaks and fails in production or whatever it is, then you've got to pull in that data and make a new snapshot test out of it so that people don't accidentally break it in the future.

Vaibhav (51:47.151)
anything else on QA and browser-based agents for QA?

I mean, I think automation just gives you all the wins and the losses of automation. The more you automate, more like to think about when COVID happened. Like, why do we have that toilet, like toilet paper gate? Well, it's because like, like genuinely it's because our supply chain is so intrinsically tied together because it's fully automated that you break one thing in the supply chain, everything downstream of it breaks. And obviously that didn't happen with toilet paper. Cause like, it turns out people don't actually, people just hoard a toilet paper as opposed to needing it. But did happen with like technical stuff or like some supply

chains broke for like how long shipments for like computer car computers and cars ended up happening and that's because something

Dex (52:25.74)
Yeah, cars got really expensive because chips got delayed, Like the chips they needed to put in the cars.

Vaibhav (52:29.658)
is what ships are delayed and then all the ships that they had pre-bought like apple doesn't just randomly have shipments that happened in december all those things are pre-bought every single what's what the heck is going on on my internet

Vaibhav (53:00.732)
Can you hear me now?

Dex (53:03.054)
you're back.

Vaibhav (53:04.09)
Okay, sorry. I have no idea what's going on with my wifi today. I'm gonna have to get a wired connection. there we go, it's loading. But like, I think the point is like Apple doesn't magically, yeah, Apple doesn't magically get shipments working in December. They pre-buy all of that stuff. If any of you know what like futures markets are, like people don't just like hope that wheat or corn are gonna sell eventually. They actually, farmers like pre-sell all their wheat and all their corn ahead of time. And the reason for that is because people like stability in systems and that's one of the things that you need

Dex (53:12.428)
there you go.

Vaibhav (53:33.957)
need automation, you need long-term stability. And then when you end up in a world where, for example, you automate everything with QA, you will have a faster system, but when things break, you have to really slow down and then fix it. So it's just like the trade-off that you make. And what I personally find is add as much AI as your QA system is going to be able to handle in terms of how much slowdown can you accept when you really have to stop and reset.

Let's see if it works. This is sick! And now you can see that arrays are not good, so I can actually just tell it this and I can say, great. This is what I love. yeah, this is broken right now, I know. We can see over here that arrays don't work well.

Dex (54:13.678)
This is a thing, like this is actually broken in the product too, is what you're saying. Yeah, so now you can just fix the display without having to go reproduce the use case. There you go.

Vaibhav (54:25.554)
We can see over here that arrays don't render well. We should do something clever for them.

Vaibhav (54:35.95)
empty arrays render differently than closed arrays which is nice. This one I'm gonna have to fix later too. don't like this. This is so nice. Thank you Dexter for doing this and we can see exactly what the win here is. Like I don't have to like produce everything all the time. I can just come up with all these edge cases and just decide exactly how we want to render it right away.

Dex (54:54.382)
Yep, and as soon as the user comes up with an issue, you just paste it into the cloud, you'll be like, hey, here's a bad state, add it to storybook and then we're gonna fix it.

Vaibhav (55:03.32)
Exactly. like, I can actually see exactly, and like, it's going to do this, and like, probably, boom, it actually does this. And it likely, and it made it an array of objects. And it's actually like showing me different things in here to give me what it does. And it, I agree, this still kind of looks bad. So I still want to kind of think, exactly. This is freaking awesome. Our playground is going to get a lot better just thanks to this.

Dex (55:10.392)
Nice. I mean, it still looks bad, but I get it.

Dex (55:20.568)
But you can iterate on it, and you don't have to iterate it on the app, you're just iterating on the pure component.

Dex (55:30.146)
Nice. See, I pitched this episode, I'm like, it sounds dumb, but I bet this is really useful for a lot of people who are trying to figure out agentic coding and the new SDLC. think doing these component preview style things, whether it's in Storybook or something you vibe coded or one of the many other things that does this is gonna be really important.

Vaibhav (55:49.459)
Yeah, it's kind of weird, it looks kind of tacky, which is why I don't like it, but as a general rule of thumb, it's going to look nicer to do this than it will to do anything else. So I love this, this is great. Thank you Dexter so much.

Dex (56:01.228)
Yep. And yeah, and you can control the stage and the frame. Like you can actually put a static image of VS code in here. And so this will all display in the VS code thing. Like you can customize a lot here.

Vaibhav (56:15.244)
no, mean we don't have to... what do mean, like the frame?

Dex (56:18.712)
Like see that white border around it? Like you can customize that. You can pick what color it is. You can make it literally a VS code thing so all of this renders inside on the left, on the right side of a VS code pane so it looks more realistic. You can do whatever you want.

Vaibhav (56:20.945)
Yeah.

Vaibhav (56:32.658)
That's cool. That's cool. No, I think I just like this idea. Even this alone, this has been something I've been trying to get to for a while. It's just easier to do this now because I iterate faster. I think iteration speed is under a lot. Go ahead.

Dex (56:44.642)
Yep. So just make sure that it's... Make sure it's actually importing your shared components and not just vibing out a bunch of shit in storybook that doesn't actually impact your app. That's the one thing I've seen Claude do sometimes.

Vaibhav (57:05.318)
It looks like it made this and it looks like it made stories.

Dex (57:09.262)
Yep. So just go, I would just go, yeah, okay. So you modified result display. I would just look in result display.stories.tsx and make sure it's like importing your actual shared component. But I'm, I have high confidence that it's happening properly. So yeah, the structure of this is an interesting file. So you create like versions of it. But it looks like these all come off of, yeah, story type of result display. So it is importing it and using it. Great.

Vaibhav (57:35.758)
interesting and this is what it actually renders now.

Dex (57:39.32)
Yep. So it's just like, render that component with these different sets of props.

Vaibhav (57:45.394)
I see. I see. Yeah, one of the things that I've been trying to think about, I'm going see if I can get a hackathon project here, is I really want users to be able to customize how their objects render in the playground. So imagine you have a class, and you want to say, I want to render this class with a custom React component.

Dex (57:59.854)
Vaibhav (58:01.015)
Exactly. Because that's how we do this. That's how the system prompt and the user prompt renders differently. That's how the HTTP web request renders like this instead of just a plain object. We have a registry of you can register things to different types. So you could imagine...

Dex (58:11.357)
So you can.

you could set in your test function in BAML where you're testing a prompt and getting an output, you can set a custom component. Instead of just printing the JSON, it actually shows the user card streaming out or whatever it is.

Vaibhav (58:29.105)
Exactly, exactly. And I feel like that'd be so freaking cool. Like right over here, one of the things I want to test. Go ahead.

Dex (58:32.567)
Alright.

You go ahead. No, it's good. I just, it's still 11.15, so we should probably wrap up soon.

Vaibhav (58:39.825)
I want to try one more thing and see if this looks cool. want to show an array of HTTP requests. Because I want to see what that UI looks like. Because this is something I couldn't have done before. array of HTTP requests. That's not something I could have.

Dex (58:51.384)
Mm-hmm.

Dex (58:55.618)
Yep, so you may not even be able to produce that state in the app today, but you can test it this way.

Vaibhav (59:00.689)
Exactly. I actually cannot produce- I mean I can but it's kind of annoying. But it's- wait-

Dex (59:05.259)
And so now you haven't built all the wiring for handle array of HTTP requests, but you can decide if it looks good and if it's even worth building before you go do all of

Vaibhav (59:14.392)
Exactly. And now I'm like,

you know i don't like this i can be like hey if it's an array of objects actually just make it like a pagination thing which could be kind of nice to able to just like paginate through the different elements of well thank you this makes life much easier much cooler to navigate across and i'm excited to be able to add storybook

Dex (59:28.236)
Yep. So, it's cool. Alright.

As a thank you, you're going to record the episode intro now. You're going to talk about what we talked about.

Vaibhav (59:41.903)
All right, I'll give a quick little primer. For anyone else that's watching, thank you for watching as always, and I hope we get to catch you next time. Next week's episode, I think, is on... What is it going to be on?

Dex (59:56.408)
I like how you said, think is on as if you actually had an idea of what it was gonna be. Let me pull up the calendar.

Vaibhav (01:00:00.899)
I was really hoping my thinking tokens would have loaded fast enough, but they did not. We can do evals again, but I think there's an episode that we already have planned. It works. It works. It's really freaking cool.

Dex (01:00:10.262)
Are you finally ready to do evals?

Dex (01:00:15.854)
Okay.

Dex (01:00:20.078)
Cool, that sounds good.

Vaibhav (01:00:20.303)
It'll be on something, check out the Luma, you'll see the email, you'll see it around. Let's record the outro, or guess the intro, and then we'll get back to it. All right. So.

Today's episode is something that I'm really excited about. It's a new thing that I'm actually going to learn from Dextre. And by the end of this episode, thanks to what we learned here, we'll actually have watched the migration of our code base to use this new technique. This new technique is called Storybooks. And the idea of Storybooks is how do you build learning tests or unit tests for your UI components so you can iterate extremely fast with an agentic loop that doesn't require you to reload your app state continuously. One of the things that we do in our playground today is we actually have to go ahead and every single time

we have something working or not working, we literally have to go and run the LLM all the way through and through to go look at the results. What I would love to do is be able to iterate with an agent purely on the UI. And as I iterate on it, be able to test things out very quickly for different types of scenarios. That's what this episode is about. How do we all do that in our agentic loop? Let's get started. Cool. Hopefully, the outro was good. Time to peace out. Adios, amigos.

Dex (01:01:25.23)
Let's do it.

Dex (01:01:30.594)
Good stuff. Thanks everybody. See ya.
