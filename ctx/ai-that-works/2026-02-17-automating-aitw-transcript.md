Dex (02:14.603)
Yo!

Dex (02:23.341)
Okay guys, we are getting connected here. Kevin's hanging out, killing time. I love it.

Dex (02:34.049)
Ladies and gentlemen, the wonderful Producer Kevin.

Dex (03:22.039)
Can you hear me now?

I can't hear you.

Dex (03:36.321)
Sorry, folks. everyone else says you're muted.

Dex (03:43.568)
my god, yes, it's not my fault. Suck it.

Dex (03:53.355)
Antonio says, don't think he wants us to hear him, actually.

Kevin Gregory (03:58.51)
Okay, can you hear me now?

Kevin Gregory (04:02.337)
Dex, can hear me? my god, I have been talking. I have been talking for five minutes.

Dex (04:03.879)
there we go.

Dex (04:08.166)
Hahaha!

Kevin Gregory (04:10.765)
my god.

Dex (04:12.139)
Welcome welcome to the life of a podcaster of a AI thought thought leader hype hype influencer boy It happens to me all the time What's up, dude? I'm good man. Well now you got a practice run. You know, you're all warmed up

Kevin Gregory (04:24.703)
Unbelievable.

How's it going? Good morning.

Kevin Gregory (04:33.271)
That's right, that's right. Hey Mario, can you cut that out of the video? Mario, for everyone else, Mario's our video editor. my God.

Dex (04:36.797)
Hahaha

Dex (04:41.453)
Yeah. Actually, Mario, can I just get the clip from the beginning of Kevin just talking silently into nothing for five minutes? That would be excellent. OK. So what's up, everybody? We're going to get started in a minute. My bell's running a little bit late. But he will be joining us soon. We got Kevin here. I think we mentioned yesterday, if you saw the email, we are talking about, we did an episode

Kevin Gregory (04:47.831)
Just silent. Unbelievable. Unbelievable.

Dex (05:11.295)
a little while ago on, by the way, this is AI That Works. This is the show where we teach you real AI techniques that work in production for real hard problems. I'm Dex. I'm the founder of a company called HumanLayer. We help you use coding agents better. Kevin, do you want to do a quick little intro and then I can kind of talk about what we're making today?

Kevin Gregory (05:30.647)
Sure, sure. So Kevin Gregory, I work for Evolution IQ where we build software that, it's insurance tech software for disability companies that helps the examiners take the right action on the right claim at the right time.

Dex (05:46.604)
That makes sense. And yeah, over the summer, me and ViBot spent two days building a bunch of automations to automate the show. Because when we do the show, there's a ton of stuff of taking the transcript and turning it into a summary and then making a good email that doesn't sound AI slop and then getting the whiteboards and uploading the video and generating thumbnails and posting the next episode and all this stuff. And we built some lightweight automation. And then our process changed. And it was a little bit brittle. And so we stopped maintaining it.

And then Kevin started helping us out and Kevin actually automated all this stuff properly. And so today we're going to talk about a bunch of different types of AI and applications of AI for and how to glue this all this stuff together to make this show run smoothly. Does that sound right?

Kevin Gregory (06:35.105)
Yeah, yeah, that sounds right. I think there's a lot more processed pieces that go into it than I think most people realize.

Dex (06:37.846)
Amazing.

Dex (06:43.532)
Do you want to just start writing out or explaining what are actually all the steps that need to happen for AI that works every week?

Kevin Gregory (06:49.687)
Can you?

Kevin Gregory (06:53.483)
Yeah, can you send me the Excalibur link? I don't...

Dex (06:57.952)
can send you a new Excalibur like yes let me get you people assume it just gets auto created as if there's some sort of automation that makes an Excalibur board for every episode but

Kevin Gregory (07:00.621)
That sounds good.

Kevin Gregory (07:11.103)
If only. Maybe AI content pipeline re-revisited. I'll have that figured out.

Dex (07:17.524)
It will have automatic Excalibur boards. Yes, here you go. It's all yours.

Kevin Gregory (07:20.599)
That's, yeah, wouldn't that be nice?

Kevin Gregory (07:27.189)
second to get it up and running the whole

Kevin Gregory (07:37.485)
It's a whole thing going between my my slack and my personal laptop So it's yeah, it's a it's an issue. I need to figure it out, but

Dex (07:42.784)
Mm-hmm.

Dex (07:47.099)
you want me to put it in the I could put it in the chat here in the Riverside chat. You got it? OK, cool.

Kevin Gregory (07:50.03)
No, I got it. got it. Yeah. Okay. Okay. So let me share my screen.

Kevin Gregory (08:06.221)
Okay, so there are a lot of pieces that go into this. so our decks, keep me honest here. So I think the first thing is someone has an idea for an episode, right? So.

Dex (08:23.596)
Okay. Right. By Bob says I want to teach people about semantic streaming or latency or whatever it is.

Kevin Gregory (08:31.423)
Right. So typically that idea is just a topic. It's nothing really more than a topic, right? Like Dex said, I want to, yeah, understanding latency, right? That's it. And so then what we need to do is we need to come up with after that, we need to kind of flesh that out a little bit more. And I have not used a ScalaDRAW in a minute, so bear with me as I kind of figure out all these hot keys.

Dex (08:38.709)
one sentence.

Dex (08:42.476)
Yep.

Dex (09:02.846)
U.S.C.L. the guy now or something.

Kevin Gregory (09:03.315)
After, I just don't do a lot of drawing and architecting on in my day to day.

Dex (09:12.557)
Well, the next automation, I don't know if you saw, have, they have Claude has can hook up to an Excalibur MCP now. So we can, we should, we should do an experiment where we hook up the audio stream to Claude code and then just kind of like dump little like snippets to it and say like, draw what we're talking about. Sorry. Anyways.

Kevin Gregory (09:29.293)
That would be cool. That would be cool. Yeah.

So the next step is to flesh out the episode, because we have a lot of episode ideas, and I think part of it is like, okay, so we have this idea, let's put it in the backlog, on the back burner, and then at some point we get to say, okay, so for next week, what episode do we want to do? We pull out the topic from our topic bank and say, okay, what do want to talk about in this episode? So at that point, yeah, this is a description. Right.

Dex (09:59.126)
And this is basically like two to three sentences, right? Because this is the summary you need for the event. Yeah.

Kevin Gregory (10:05.9)
So the description and then maybe a full episode title.

Dex (10:09.74)
So do you want to show an example on like one of like, like what goes into one of those? guess it's like what's on one of the Luma events, right?

Kevin Gregory (10:15.562)
Yeah, I can open them up.

So we can see, so this one, right? So say we had a topic of, Kevin, I want you to do some automating. Let's have an episode where we go over it, right? That is that first box. So that is this box. Let me just move the alt to my other screen. That is this box here. Kevin, let's have an episode at some point where we talk about every way that you've automated the AI that works podcasting. Okay, cool. And then once we get to the point where it's like, okay, we're doing this episode on this date.

Let's actually come up with the title, which is going to be AI content pipeline revisited and then the actual description, which is this part here. Right. So what are we going to send out to people to get them interested and get them to join?

Dex (11:00.748)
I'm excited to get to the AI part of this. So far this is just you hammering me and ViBob to fill out the cards induction.

Kevin Gregory (11:02.302)
Mm-hmm. Yeah.

Kevin Gregory (11:10.474)
Yeah, I know. Speaking of which, you're gonna be hearing from me later today.

Dex (11:14.601)
Amazing. I'm ready. Do your worst.

Kevin Gregory (11:19.916)
And so one more thing that is required is kind of a human input into this whole process is Luma calls it a slug, but it's the short Luma URL. this is, typically I come up with this, I don't really hammer Dex or Vybomb for this too much. Luma slug slash URL, because this is pretty easy to come up with, but it is one piece that

Is kind of one more human input to this whole process and what that is is that something where? Where is it when we have Luma comm slash? whatever like this one, I think is Luma comm slash AI pipeline or AI AI content generation right this right here Luma comm slash AI content generation and all the episodes have a quick short They call it a slug Yeah

Dex (12:15.948)
Would have called it a slug. Yeah. Okay, cool. I use that word all the time. I use the word slug all the time. And some people are like, not everybody knows what that means. And I'm like, well, they can learn. Yeah. Doesn't make sense. Yeah. Alright. Okay, cool. So, we're...

Kevin Gregory (12:25.936)
Yeah, Google exists. It is a weird word though, like it is, it's a weird thing to call that. Yeah, because the default is just some, yeah.

Dex (12:36.716)
Sorry, go ahead. OK, so we're generating a slug. We take the description. We take the title. We make a slug. And then what comes next?

Kevin Gregory (12:37.694)
No, was...

Kevin Gregory (12:44.586)
And then and then I have a clock code command that kind of kicks off the whole. I call it the episode. Yeah, the episode prep. So the first thing that I do is. I have to generate an image for the episode, and so you can see the go back here, this image here. I don't know how to easily get to it.

Dex (12:54.314)
Here we go, okay.

Kevin Gregory (13:13.27)
go back one more time. Let's go to Luma. So this image is AI generated.

And so that's the first thing that the pipeline does is it takes the description and it takes the title and it runs through a couple of things and uses Nano Banana Pro to generate this image. And the way it does that is it has a base image and really all it's doing is it's coming up with the subtitle and this kind of graphic here in the middle. It's really all it's doing and then it's kind of generating the actual image itself.

Dex (13:22.892)
Okay.

Dex (13:51.744)
And for the record, we used to just have a giant Figma board that would, that just had all of these. Every episode we would manually like paste in an image, to figure out what the next episode title would look like.

Kevin Gregory (14:05.738)
Yeah, well, it's being annoying. But yeah, we had a long string. Yeah, we had a long... So the f-

Dex (14:08.396)
I can show it to you. Just like tons of it. Okay. And do you want to show us kind of like how that, I mean, do you want to go like high level and then dig into the code? Or do you want to like jump, like show us the code for this part and then jump back, zoom back out again? How do you want to go through this?

Kevin Gregory (14:24.264)
I'm fine doing it either way, honestly. think... Yeah, we can go in and... Yeah.

Dex (14:27.274)
Okay. I mean, I would love to kind of see the...let's jump from the whiteboard. Are you able to pull up the CLAWD command and we can kind of like figure out...if we hit something that needs whiteboarding, we can pop back to the whiteboard.

Kevin Gregory (14:34.388)
Yeah, absolutely.

Kevin Gregory (14:38.324)
Yeah, definitely. So is this zoomed in enough, first of all?

Dex (14:39.788)
Okay, cool.

I think you can probably make it little bit bigger. It's enough, but I would...yeah, there we go.

Kevin Gregory (14:47.404)
All right, cool. So actually over here, you can see there are just a handful of clock commands. This social one existed before me. I didn't do this one, but.

Dex (14:56.682)
Yeah, I wrote that one. It's not very good. The tweets it writes are very bad. We should rename it to cringetweets.md.

Kevin Gregory (15:00.876)
They're very bad. But episode...

Kevin Gregory (15:06.732)
Dex's cringe.mb. But yeah, so the way it works is we do episode prep and then, I even think email prep at this point is deprecated, but we do episode prep and then once the episode airs, we do find clips because that gets us, we've started generating shorts that go on YouTube and find clips suggests shorts to our editors. And then once the episode is done and the YouTube videos are uploaded, we run the complete episode.

Dex (15:08.908)
Yeah, exactly. Sorry, go ahead.

Kevin Gregory (15:35.2)
Cod code command and that does that kind of finishes everything. I'll go over kind of all this and I think what's really interesting to take away from this is it's I think it's very easy to Have an all-or-nothing mindset when it comes to automating right? I want it to be push button. I want it to run one command and then everything to happen

Dex (15:54.102)
And everything is, you have this kind of fired up almost like interactively, right? It's like run the command. I don't have to know which arcs to pass into it. Claude will ask me what things need to go into it to make the next thing happen.

Kevin Gregory (15:57.939)
Exactly.

Kevin Gregory (16:04.939)
Exactly, but I think something else to keep in mind is even if you automate 95 or 90 % of something That's still a huge win, right? So we're at the point now where the emails that it generates are good Typically only need one round of comments, but we still have to review them right you and you'll see in here. I don't have it come create the Riverside event create the description and

post a vibe of LinkedIn, right? I am a human in the loop there to make sure that everything is buttoned up and correct before it posts a vibe of LinkedIn. And same with the emails.

Dex (16:39.414)
There's almost this like, I think about this a lot, people talk about like sandboxes and it's come up a lot with the open-claw conversation of like, you kind of want to like define what are the boundaries outside of your agentic sphere that you want human approval. Like what requires approval to go out of the box? And it's like posting publicly on LinkedIn, sending an email to thousands of subscribers, these sorts of things you want to like guarantee. And so you've engineered this process so that...

Kevin Gregory (16:46.345)
Mm-hmm.

Kevin Gregory (16:56.906)
Right.

Yep.

Dex (17:05.857)
The things that you can change later are kind of just get happened automatically. And the things that are, let's say, one way are done manually.

Kevin Gregory (17:16.605)
Exactly. That's a great way to put it. And so think automating doesn't have to be an all or nothing. So.

Dex (17:17.91)
Okay, cool.

Dex (17:22.476)
So, sick. Yes, this was the entire thesis behind HumanLayer. It was like, okay, automate the things, but also maintain control and guardrails around the parts that are high impact. But they're also high value, right? If it can write the post for you and get it right 90 % of the time, and you're only making changes once in every 10 times, that's great, but you still wanna have the, it's worth reviewing it every time, rather than trying to automate it to 99.9 % quality.

Kevin Gregory (17:34.527)
Mm-hmm.

Kevin Gregory (17:49.045)
How much time did this whole process take you before all of this? Maybe what, two hours a week?

Dex (17:54.188)
so before we had the, one of it, which was like the web app that like had like Firebase and would like pull all the stuff. And it was like probably like three or four hours a week. And once we built that automation pipeline, it was like one hour a week between the two of it. We'd say, get a call for like half an hour and knock everything out. and then our process changed and they're like the, the, the, web app actually like.

Kevin Gregory (18:07.455)
Yep.

Kevin Gregory (18:15.391)
Yeah.

Dex (18:21.014)
broke down and I was never able to run it on my machine because I never got all the right keys and stuff. It was just like, we stopped using that. And then rather than going back to spending three or four hours a week, we were already used to spending only 30 minutes a week. And so we just like stopped doing our homework on the show. And then we would get together like once every four weeks, we'd be like, holy shit, we're so behind. And we'd get on for like two hours on a Saturday and like catch up on everything.

Kevin Gregory (18:25.492)
Mm-hmm.

Kevin Gregory (18:45.715)
Yeah, this process takes, once we have the title and the description, this whole process probably takes about 10 minutes total. And most of that is hands off. Yeah.

Dex (18:52.426)
Amazing. my god, I can't wait to see it. Also for the record for everybody watching, I have not seen this. I just know that things are happening and I'm super excited to learn how this works at an end.

Kevin Gregory (18:57.643)
Yeah.

Kevin Gregory (19:03.445)
So, and we can actually create an episode here if we want to. We don't have to actually post it, but we can watch it work. So, okay, so yeah, so here's the first part, right? It gets all this information from the user. Any additional guests, right? Sometimes we'll have guests on, like in the email episode, we had that guest on. So anyone else that is a presenter, we wanna add them to the Riverside event. So this is all it needs, right?

Dex (19:06.931)
Let's do it.

Amazing. That would be sick.

Kevin Gregory (19:32.734)
title description, which number is it, the date and the slug and then the guests. And then the first thing it does is it creates the image. And this entire thing is just CLIs that clog code calls, right? The first thing that we need to do for the image is kind of the first module is it creates a subtitle. And so I think the subtitle for this one is it's like AI that makes this podcast work or something like that.

Dex (19:59.006)
subtitle, that's the thing that goes on the image itself.

Kevin Gregory (20:02.077)
Exactly, it goes on the image itself. So it creates a subtitle and then it asks the user if they like the subtitle and if not, then it reruns it and then it creates the image. And so the image is kind of just that figment image that we all saw before.

Dex (20:05.025)
Okay, sick.

Kevin Gregory (20:24.287)
And we can actually do this, right? So I mean, we can...

Dex (20:27.594)
Yeah, what episode do you want to make?

Kevin Gregory (20:29.993)
Well, next week is supposed to be another No Vibes Allowed. Do you want to go ahead and do that? And we can just create a test one, right? It doesn't have to actually be... Like, we don't actually have to publish it all the way through.

Dex (20:45.344)
Yeah, sure, let's go fire that off.

Kevin Gregory (20:49.235)
Okay, so let's open up ClonCode. All right, so let's do, it's just episode, there it is, episode prep.

Kevin Gregory (21:04.747)
And so it takes a minute to get fired up. And this is all using Sonnet. Yeah, yeah. This is just using Sonnet 4.5, right? I'm not even using Opus 4.5 or, you know, the new 4.6, because I don't want to burn that many tokens. Okay, so.

Dex (21:08.93)
as Claude is want to do.

Dex (21:24.15)
Check you're using the, and it's using the Ask user question tool. know they've added more steering for this, it's good.

Kevin Gregory (21:28.147)
Yeah, this is new. Yeah, this is new, yeah.

Kevin Gregory (21:35.455)
It's so interesting because I was doing this as a practice so many times and I'm sure you saw a bunch of Riverside events come and go. And every time I did it...

Dex (21:42.828)
Oh yeah, have, there's one day last week I have like 10, have like 12 test events on my calendar. I was wondering where those were coming from.

Kevin Gregory (21:46.379)
Yeah, yeah, yeah. It's so funny because every time it does, the interface is a little different. It's so interesting. Okay, so episode title. So we can just do it however we want. I'm going to do, I found this to work really well. We'll just call it, what? No Vibes Allowed February.

description.

Kevin Gregory (22:18.442)
uh, see decks, any, any thoughts here? can just say in this episode, we will do another live coding event where we

Dex (22:32.149)
Where we use advanced context engineering principles to ship real features.

Kevin Gregory (22:44.36)
Are we doing it in yours this time? Or BAML?

Kevin Gregory (22:51.594)
We can just put, it's not code there anymore, right? It's riptide. All right, we're just at real features in riptide. we can, So episode, yeah, exactly. Episode number, think, see, I always forget. And this is something that I'm going to eventually automate even more. It probably could, it probably could. I just need to point it to how to do it.

Dex (22:57.515)
Yeah.

Dex (23:02.026)
Amazing. We can come back and tweak this or whatever.

Dex (23:13.261)
I was going to say, can Claude figure this out?

Kevin Gregory (23:20.274)
So that's gonna be episode 46. And then the date is going to be the 24th. And then the Luma.

Kevin Gregory (23:37.108)
I'm just gonna call it no-vides.

Kevin Gregory (23:42.303)
February, And then no additional guests. So we just do that and then it gets cooking. So the first thing it's doing is it's making the subtitle and the image and it's going to give us the image and ask us if we do or don't like the image. And we can, for a while, I didn't have a good feedback loop. It was just like, I don't like the image regenerated. I don't like the image regenerated.

Dex (23:51.58)
Nice.

Dex (24:12.118)
Yep.

Kevin Gregory (24:12.77)
and I went back into it and I created another kind of feedback loop in there where it figured out it allowed me to tell me what I did or didn't like about the image and then update the prompt and regenerate it kind of with that, that, that new feedback, which I found to be way, way, way more helpful.

Dex (24:35.304)
Interesting. Okay, cool. Here's our BAML response. Yeah, what is the, do you want to pull up the code for this while it's working? Or at least the BAML functions?

Kevin Gregory (24:36.85)
Mm-hmm. Okay, so you see it's got

Kevin Gregory (24:43.22)
Sure.

So, let's see, BAM source. for Thumbnaps, so first it has a subtitle.

So just generate subtitle. You're generating artifacts for podcast episode AI that works. So I'm not going to read the whole thing because this is all going to be pushed. But you can basically see it's like given the topic generate a rationale and a subtitle. I've found that when you have it generate the kind of the rationale that leads to what it's ultimately producing, it does it better because you give it that thinking space.

Dex (25:21.622)
We're doing the chain of thought, via structured output fields. Cool.

Kevin Gregory (25:25.266)
Exactly. And gave it a couple of examples. And then just, yeah, it takes the feedback and that's, that's.

Dex (25:36.042)
And what's the output schema?

Kevin Gregory (25:38.75)
The output schema is just the rationale and subtitle.

Dex (25:41.9)
Okay. Okay. And how does the thumbnail work? Because you're using like, NanoBanana for this, right?

Kevin Gregory (25:46.152)
Yeah, use Nanna Banana for that. Yeah.

So this is stuff that I came up with. Contact engineering. Ship it. I like it.

Dex (25:50.848)
Okay, cool, so a minute

I... okay. We can iterate on that one.

Kevin Gregory (25:57.45)
Dex doesn't like it. Yeah, and we can tell it, so maybe we do this now. So Dex, what don't you like about it?

Dex (26:06.892)
I don't know. It's too campy. sounds LLM generated.

Kevin Gregory (26:18.686)
Hopefully, hopefully this feedback works. So all right, let me regenerate the stuff tied with your feedback. Cool. So it is working. So that's the BAML function. Unfortunately, BAML doesn't have an image generator yet. So I did have to just go straight to the NanoBanana API for that.

Dex (26:35.999)
Okay.

Dex (26:39.958)
Cool. But are you generating the prompt for the image in BAML?

Kevin Gregory (26:41.417)
But...

Kevin Gregory (26:46.826)
Deep, I think so. This was the first thing. Yeah, so the thumbnail. some of these might be deprecated. Yeah, there it is. Yeah, there it is. Generate icon prompt. So that's what gets fed into the Nano Banana thumbnail generator, which happens in this CLI here.

Dex (26:49.612)
It's like a thumbnail, right?

Dex (26:58.747)
I see. Yeah, generate icon prompt. There you go.

Dex (27:11.072)
sick.

Kevin Gregory (27:15.53)
There's this generate icon image. I've got a bunch of little mini modules here that this one like loads the base image, which the base image is here. This is this guy. And then Nano Bananas just put in something here. Main title, subtitle, adding in this number.

Dex (27:34.316)
Okay, so you pass this in as one of the arguments to NanoBanana and then you tell it to like, in the text and add the image. Sick. Okay.

Kevin Gregory (27:38.504)
Yeah. Exactly.

Alright, so let's see what it came up with now. So the news is contract tension... okay.

Dex (27:51.084)
You gave it away to chain the feedback in.

Kevin Gregory (27:55.016)
Yeah.

Dex (28:01.128)
Ooh, look at that terminal UI.

Kevin Gregory (28:08.807)
Oops, oops.

Kevin Gregory (28:13.545)
Alright, let's see what it's coming up with now. Shipping, content engineering, shipping feature is not hype. That's the new subtitle.

Kevin Gregory (28:25.309)
But we can...

Dex (28:25.748)
Hmm. Because you told it it was too hyped and so it said, this is not hype. Okay. We'll get the idea. Yeah, let's move on to the next part. So this is cool that you've built in the feedback stuff, though. I like it.

Kevin Gregory (28:30.505)
But again, we can iterate on this. don't want to spend a bunch of time just... but... yeah.

But let's see what image it generates, right? So this is the image.

Kevin Gregory (28:49.161)
Right? No Vibes, Love, February. And you see this is the subtitle. It came up with this little graphic, which...

Dex (28:52.854)
Did it put a calendar with a heart because Valentine's Day falls in February?

Kevin Gregory (28:58.277)
I don't know. I think so. Which is just kind of crazy. No fun. So yeah, would... Exactly. So we would iterate on this a little bit more. But we'll just keep going. So I'll say, I like it.

Dex (29:03.656)
Okay, okay. This is why we need humans in the loop for parts of this.

Dex (29:13.749)
Yeah, let's just keep rolling. It can be an inside joke. The people who see that episode are like, I know why it has a weird image.

Kevin Gregory (29:17.725)
So say I like it.

Kevin Gregory (29:22.601)
That's right. So the next thing it's going to do is create the Riverside event. Riverside, this was a fun one. This had, Riverside has an API, but it's very expensive to get to the account level where you have the API. So now you can see it is, shoot, shoot, shoot. It is doing, it is a browse, it's doing this live. It's opening a browser and it's creating the event.

in Riverside with kind of all the elements that we've created or told it to and it's doing this live.

Dex (30:00.459)
Hello?

Kevin Gregory (30:00.989)
You see, it's gonna add, this is all the stuff that goes into it, right? It's gonna add decks. It doesn't do great at the time. So it created the event. But the next step is I could have it automatically post that to ViBub's LinkedIn, but that's not a great idea because you saw it just got the time wrong. It struggles to figure out how to get the time exactly where it wants.

Dex (30:09.342)
Interesting.

Kevin Gregory (30:29.385)
Which is kind of a strange problem that I didn't anticipate. So there's a browser agent that I can open that part.

Dex (30:29.505)
Yep.

Dex (30:38.54)
So the create Riverside event is done by the API and then you tune it with a browser agent.

Kevin Gregory (30:44.219)
No, it's all done. It doesn't use the API at all. It's all done with the browser agent.

Dex (30:49.02)
sick. OK. So this is really fun. This is like, OK, we found a thing we wanted to automate, and so we just did it with a browser agent. So how does this work?

Kevin Gregory (30:51.091)
Yeah.

Kevin Gregory (30:58.049)
so what's fascinating is, it uses, let's see, where's the, so this is the seal. where is it actually?

So this is the test session. So let go to CLI. That's where it kind of starts. So we go to CLI and let's see if we close. So the README is probably very helpful. I forgot I wrote a README. It's been a couple of weeks since I did this. So what it does is it actually opens a browser. It logs in.

and then it does the schedule session, which it basically just clicks through all the things that I would individually click through, right? And it's so cool because I used Dex, I used your product to build this and what it was doing is you could see it when it didn't know how to do something, it would take a screenshot of the dashboard before the schedule and it would figure out here what it needed to click.

and kind of where in the window it needed to click, and then it would code that, and then it would run again.

Dex (32:12.534)
Okay, so you built your own browser, like this thing that like agent browse and agent browser and like all these like playwrights CLIs do under the hood is like a sub agent move. You basically built this like screenshot, click, screenshot, click, screenshot, click kind of.

Kevin Gregory (32:23.623)
Mhm.

Kevin Gregory (32:30.781)
Well, that's how it was, that's how it figured out what to click and where to click, right? Now that it's rolling, it doesn't click anymore, or it doesn't take the screenshot anymore, so click. It doesn't take the screenshot anymore. Exactly.

Dex (32:41.162)
Right, because it figured out what Dama elements.

Okay, so as Claude is writing the automation script, it's using this to build the actually, like, mostly deterministic browser automation.

Kevin Gregory (32:55.805)
Yeah. Yeah.

Dex (32:57.165)
I see. Yeah, I like this big jump towards the sort of like, I don't know how to say this, the thing that the agent learns while it's working, which is like screenshot, okay, I gotta click here, and then you end up throwing all that out versus like, okay, we figured out the workflow, now let's bake that into a deterministic code that we no longer need to use AI to learn about the page, assuming it doesn't change that often, right?

Kevin Gregory (33:21.883)
Mm-hmm. Right. Yeah. One interesting thing, though, for anyone who tries to do this on their own or do something similar, it is very... The best way I found to build this is to watch what it is doing, because it was clicking the wrong thing for a while. It's in one of these... Yeah, so it's supposed to click...

Dex (33:25.59)
Okay, cool.

Kevin Gregory (33:51.629)
There's a maybe it doesn't matter, but it was supposed to click on like new Yeah, new here supposed to click here and it was clicking on here, which is what's new and It was getting it was getting a pop-up of like new features in in the riverside and then it was trying to figure out how to close the pop-up and so it was going down this rabbit hole that it was creating and it couldn't figure out and it kept closing it then re-clicking then closing it and it just kept getting in this loop and

Dex (34:01.365)
Ha ha ha ha ha!

Kevin Gregory (34:19.952)
you could watch it happen, right? So when it's opening a Chrome window, you can just watch the Chrome window and make sure it's doing what it should be doing.

Kevin Gregory (34:30.568)
And so that was super helpful.

Dex (34:32.012)
Okay, okay. So can we run this? Will this open a browser or is it totally headless?

Kevin Gregory (34:38.33)
It did, right? Did you not see it? okay. Yeah, so.

Dex (34:40.039)
I missed it. No, I missed it.

I believe you. There was one moment where I got a Slack message I had to reply to. Sick. Okay.

Kevin Gregory (34:51.174)
Yeah, so it did it. mean we can we can cancel this and rerun it. But yeah, it did open the browser and now what it's saying is. The Riverside event is increased successfully. Next step your action required. Turn on the live streams and upload the generated thumbnail image. So if we just click in.

Dex (35:08.951)
And this is stuff that like, is this just stuff that like you could automate but you just haven't yet? Or is this stuff that is like too hard to automate?

Kevin Gregory (35:16.538)
So the thumbnail image, I could automate and I will. The live streams, that is where it gets posted to your X account and VibeOps LinkedIn.

Dex (35:28.204)
I

Kevin Gregory (35:30.268)
So if we just, but if we just open this.

Kevin Gregory (35:37.064)
It goes right to the page. All I would do is edit session, come in here and click these, upload the thumbnail and press update session, and then I'm done with Riverside.

Dex (35:50.368)
Yeah. Okay.

Kevin Gregory (35:54.013)
So now I can just say done. And now it's gonna create the Luma event, which Riverside is what we're all on. That's where the actual like video conference happens. Luma is where the event exists and it gets emailed out and kind of manages the guests better. Dex, am I understanding how these two pieces work together better? Yeah.

Dex (36:20.268)
that make sense? Yeah, no, I mean, yeah, we use Riverside for the hosting, but we use Luma for the actual, like, invites and reminders and sending blasts out to people and like, hey, this is the thing that actually puts it on your calendar and all of that. Okay, so it just did be Luma via some CLI. That's, I assume, using the API and not...

Kevin Gregory (36:28.008)
Mm-hmm.

Kevin Gregory (36:32.315)
Yeah.

So now what it's doing.

Kevin Gregory (36:39.1)
Yep, that uses the API. that one's easy. Let's go back to episode prep. Let's see. Event. it's, all right, so created the Luma, which a couple of interesting things, right, that I realized when we come up with the episode title, right, no violence allowed. We actually need to prepend the title with this AI that works tag, right?

But when Dex, the 5-up, I are coming up with the title, we're not gonna put that every time. So we needed to add that to the title before the Luma event.

Dex (37:18.977)
Yep.

Kevin Gregory (37:21.224)
So it does that, which that's all just the API. That's very basic. Nothing, nothing crazy there. It updates the episode meta MD. So what this does is, I don't know if a lot of people know this, but if you go to boundary, boundaryml.com slash podcast, this is the actual page for the podcast. And this pulls from our GitHub repo.

and the meta MD file that exists in each folder helps inform what is on that website.

Dex (37:57.984)
Yeah, you want to pull one of those up just so we can kind of like see what's in there? Basically, this is an RSS feed that we host in the GitHub repo that is built off of these meta MVs so that it can like build those little like cards in the...

Kevin Gregory (37:59.593)
Yeah, I'll pull one up. I'll pull... I'm gonna pull up the last one.

Kevin Gregory (38:11.506)
Mm-hmm.

Yeah. So it has basically the number, the title, the description, the Luma link with the slug. And one thing, I forgot to say, one thing the Luma CLI does is it checks to make sure this slug is available. And if it's not, it asks you for a new one.

Dex (38:24.938)
Yep.

Dex (38:34.965)
Nice.

Kevin Gregory (38:37.016)
And then it has the YouTube, the URL to the video, the link to the GitHub repo. And this video, obviously, the episode that we're creating, the video doesn't exist yet. So what it does is it just links to the podcast page on YouTube, which is kind of a good for now. And yeah, so it does that. Let's go back to, I need to double click on some of these so I don't keep losing them.

Dex (38:54.475)
Mm-hmm.

Yep.

Kevin Gregory (39:09.474)
And it reads a couple of the past ones and then it runs this tool, which all this does is it updates the what the RSS feed reads.

Dex (39:18.356)
Yep. Yeah, so there's another script that translates that YAML file, not YAML MD file, into actual like RSS XML. Yep. Okay, cool.

Kevin Gregory (39:27.643)
And you'll see it happen here because first what it needs to do is it needs to create the directory in GitHub. And now it's creating the meta MD, which if I just click here, you'll see it's just the podcast page. And in the complete episode CLI, that'll get updated to the actual video. And so, yep, let's do that. And then it's going to rerun the manifest, which I won't push this code because I don't want to.

Dex (39:33.249)
Yep.

Dex (39:42.197)
Okay.

Kevin Gregory (39:56.552)
mess up Vyvalve website. But, yes.

Kevin Gregory (40:04.891)
think it's mad at some linting stuff from past episodes, but it's not a concern.

And then it is at this point, it's pretty much done. It's just double checking a couple of things. And that is it. That is all it takes out to prep an episode. Once we have the title and the description, we can kind of just roll with it. Just run this and you got the thumbnail. It's created in Riverside. The Luma event is created in the RSS feed. We'll pick it up and that's it.

Dex (40:29.024)
Yes.

Kevin Gregory (40:43.985)
That's how an episode gets created. But you can see...

Dex (40:46.198)
This is dope. Okay. And this is only part of it, right? Because there's also what happens after we record the episode, right?

Kevin Gregory (40:52.815)
Yep, that's the next command, the complete episode. So this is what it does to prep an episode, create all the artifacts and make sure everything lines up. Whereas you, I mean...

Dex (40:57.334)
Yep, cool.

Dex (41:04.653)
This is great. Yeah, this is the kind of thing we used to just sit and like slog through for again like an hour every Tuesday it was like there was a slot on my calendar. I was like, okay, we got to go get the next episode ready.

Kevin Gregory (41:15.217)
Yeah, and there's so much room for human error. Like, so many times I would forget to put the Meet the Speakers in the description. It's just like, damn it, like, I, you because we would go back and forth like that in the description, right, and then I'd be like, all right, we got it, and then I would paste it in and post it if I was LinkedIn, and I would have forgotten to done the Meet the Speakers. And so now it just happens. It's so nice. Cool.

Dex (41:40.684)
Yeah, this is dope.

Kevin Gregory (41:43.016)
And so now, now that we've created the episode, the next part is, obviously, we have the episode. then after that, so episodes happen on, today's Tuesday, happens on Tuesday, I don't know why it took me a second to think through that. So episodes happen on Tuesday. Now what we wanna do is the Riverside uploads the transcript,

the Tuesday afternoon sometime. And so now what we're gonna do, now we start getting to the stuff that's a little less deterministic. This is where it starts to get interesting. The only parts that we've had so far that there's back and forth is in the subtitle and the image generated, which the image itself doesn't really matter too much. The subtitle's more important because the image is kind of just like a cute graphic that ends up getting overwritten. But.

Dex (42:35.382)
Yep.

Kevin Gregory (42:36.827)
This is where things start to get fun. So the next thing that we do is once a transcript is uploaded, we run find clips. And what this does is this suggests some clips to our video editor for shorts. And I come in here or open the find clips.

so we can see what this does.

Kevin Gregory (43:04.231)
So what we want to do is we want to find clips for like the episode that just ran. So like today's episode or yesterday's episode, depending on when this gets run. So it checks the current date. It gets the folder. And it makes sure that there's a transcript.txt and a meta.md in the directory. So we have to go download the transcript from Riverside and just paste it into one of these, the proper folder.

Probably is automatable, but it takes 30 seconds to do. So I just kept it at this.

Dex (43:42.27)
Yep, that makes sense. So you could make another browser agent.

Kevin Gregory (43:46.745)
Right. Right.

And then it pulls the title and the description from the episode MD. And then there's another CLI that extracts the clips. And so we can look at that quickly. So we go to clip extractor CLI. So extract clips. So something interesting is you'll see there's a part, there's one element that we have that writes the emails and there are several steps.

to that. And the first step is to extract kind of the key takeaways for an email. And I thought that would be really

Dex (44:27.828)
At this point, the email's already been written, or are you doing this before? Okay, okay, cool.

Kevin Gregory (44:31.725)
No, not yet, not yet. So what I thought is that would be useful to reuse just that BAML function that extracts the key takeaways for the clips. Because you could dump the whole transcript in and say, give me high impact clips. But what I thought would be more helpful is you give it the transcript, say, give me high impact clips. Also, here are the key takeaways that I want you to kind of focus your attention on.

Dex (44:38.817)
Crazy.

Yeah, cool.

Dex (44:54.452)
Yep, sick. Okay, so you're taking the high level email structure and then passing it in as, you know, one thing to remember, key takeaways, episode title, nice.

Kevin Gregory (44:57.039)
And so if we do fine clips.

Kevin Gregory (45:02.662)
Mm-hmm.

Yep.

Kevin Gregory (45:13.351)
And I mean, getting CLIs for ClonCode to run, game changer, right? It makes it so easy. Because there are things...

Dex (45:19.306)
Yeah. Well, and you mentioned you're using Sonnet for this, which I think tracks with lot of what I've seen a lot of in good AI engineers I know have been talking for a while, which is like, Sonnet is great at tool calling, right? It's actually almost too good at tool calling. All it wants to do is just go do stuff all day, and it doesn't think that much. But again, for short little workflows like this, where you can offload all of the

Kevin Gregory (45:25.701)
Mhm.

Kevin Gregory (45:35.388)
Yeah.

Dex (45:45.696)
hard AI. I mean, it's not really a sub-agent, but it's the same model of like, let's have a separate context window that goes and does the thing. And your top level model is just orchestrating all of these tools that under the hood are doing their own AI.

Kevin Gregory (45:59.513)
Right, right. So let's say we're creating clips for, right. So let's just say we're just doing it for this one because we don't have the transcript for today's episode. So it's going to make sure there's a transcript and then it's going to run the two BAML functions, which we'll see kind of pop out in the terminal. And it's going to give us some clips.

Dex (46:02.38)
Cool. Okay, and it's actually asking you which episode. Yeah.

Dex (46:23.66)
Maybe it'll come up with the same one. mean, the one that we got for this episode, one of them was really good. I ended up posting it on Twitter. And you could go find it if you want. But it's like the best engineers are using back pressure to figure out to be able to run their agents kind of autonomously for days because the agent's able to check its own work, right?

Kevin Gregory (46:26.151)
Yeah.

Kevin Gregory (46:35.942)
Yeah.

Kevin Gregory (46:43.533)
Mm-hmm and this is another point where we use a human human a human in the loop right our video editor Mario All I do is I send him the output of this which I'll show you what it looks like in a second I sent it to him in slack and I say hey Mario. Here's some suggested clips He I think I mean, I don't really know Mario's background But he seems to be really good at this kind of thing. And so I think it's like hey use your discretion All right, do these clips look good?

Are there other clips that you think would be better? This is, think, kind of just more of a suggestion for what clips we're going to post.

Dex (47:19.21)
Mario is a good editor and a good content person. He is not an AI engineer. So this guidance helps him kind of pick out which parts of this are really, really meaningful to our audience.

Kevin Gregory (47:30.073)
Mm-hmm. And again, it probably, I imagine, saves them quite a bit of time, because it doesn't have to think through, all right, three separate clips. kind of almost like primes it a little bit and says, here are kind of the three clips that we think would be useful. This is kind of, you can either use them or it can act as a warm-up, it can get you started, or you can just not like them at all. It just depends. So let's see. So if we can, it gives us it.

prints this out, it makes a JSON file. Yeah, it does. This is the first time I've ever seen this get printed out. It's so interesting. Every time I run it, the output is a little different. So it makes a JSON file where it has the rationale, the transcript, certain, and the speaker, and the actual transcript, and then the hook. And this is...

Dex (48:01.28)
But it makes a JSON file somewhere, right?

Kevin Gregory (48:23.556)
I do this a lot where I structure the thinking, Like give me the rationale before you actually give me the output. So let's see, are there any good...

Dex (48:28.278)
Yep. Yep.

Kevin Gregory (48:39.462)
are there... Yeah, yeah.

Dex (48:39.788)
I mean, this makes sense. I get this. Cool. Okay, so this is how you make the clips using the transcript. What else is worth digging into here? I know we're at 850, so we can... yeah, build in the email. This was the one where it was like, it's very easy for... I I'm sure everybody here is bombarded with AI slop emails. We work really hard to... And we end up doing a lot of like...

Kevin Gregory (48:46.32)
Right.

Kevin Gregory (48:50.468)
The emails. The email.

Dex (49:07.925)
Hand editing of the email. This has been true about this show for a very long time. Vybov has eventually claims to have figured out that... And it sounds like you have figured... You guys worked together to get the right prompt to make it not feel AI generated. And of course we still review that before that goes out.

Kevin Gregory (49:12.646)
Mm-hmm.

Kevin Gregory (49:24.472)
Yeah, and Vibebob is a master at figuring out something that's AI generated, right? I would have an email that I thought looked good, and Vibebob would say, this sounds like AI slop. So many times.

Dex (49:35.18)
He reads a lot of it the man reads a lot of AI outputs

Kevin Gregory (49:41.861)
Yeah, it's uncanny. So the complete episode CLI is, or CLAWD command is the last one. The first thing it's doing is it goes to YouTube, looks for AI.Works, finds a YouTube link for the most recent AI.Works and updates the URL in the meta MD file. So we'll just say yes so we can get to the email portion. But I can just go ahead and show you what the email portion looks like. And this is the...

Once we did it this way, we ended up getting much, much better results. Like Dex said, we still review it and typically we have one to two updates. Typically it's just one, but I mean, it's way better than the four or five or six updates that we were doing. So the first thing that we do is we extract the email structure, right? Because you could, the most naive way to do it is to say, here's the transcript.

Write an email, have three takeaways, and have this sign off.

Dex (50:45.836)
Okay.

Kevin Gregory (50:45.968)
That didn't work. That just didn't work. So the first thing is this email structure, right? So the output, so let's see, where is it? So extract email structure where we give it the transcript, the title and the description. And you say, extracting key information. We want compelling subject line, what the session covered.

two to three bullet points with the main insights and the single most important takeaway and then any mention of an upcoming session. And then we have an example email that we feed it. So this is the.

Dex (51:19.626)
Yup.

And this is just coming off the transcript and then the example email. And the example email is just the past one that we, you know, as humans built one that we were happy with, right?

Kevin Gregory (51:30.148)
Mm-hmm.

Right. And then the title and description.

Kevin Gregory (51:39.3)
So this is just the structure, right? This is not writing the email.

Dex (51:39.51)
Cool.

Dex (51:44.396)
So what is, yeah, what is this? Okay, so the structure is just, and then what do we push that into a template or do we give it the structure and have it, okay, compose is also an LLM, cool.

Kevin Gregory (51:53.307)
Mm-hmm. Yeah, so compose is the next one. So compose email is to be transformed, the structured email, into a polished email newsletter. Here's the subject. We cover a lot on...

Dex (52:04.94)
So this doesn't see the transcript at all. It just sees, we're doing like a two-pass generation where we kind of, it's almost like, I mean, it's a dumb analogy, but almost like a Laura or something. We're like, okay, let's make it smaller and more specific and then we're gonna expand it back.

Kevin Gregory (52:09.287)
No.

Kevin Gregory (52:22.786)
Right, right, because the transcripts are typically really long and I don't know, the context might very well degrade with that really long transcript. And if, I think the idea is like, if this first function works really well, then the compose email will work. All right, so this first function is really the key one to focus on. So you kind of have to trust that your helper functions work sort of.

Dex (52:32.129)
Yep.

Dex (52:37.856)
Yeah.

Dex (52:48.492)
Yeah, no, this makes sense. Okay, cool. And then we compose it and then what is like, I'm really curious the guidance you're giving it on like how to make the tone.

Kevin Gregory (52:57.538)
Yeah, so it's so funny, right? We haven't identified AI patterns, right? Which basically all that is is, hey, this looks like the following email sounds like AI slop. You always tell it because it always does. It always does. It always has repeated sentence patterns every time. So you just tell it. It sounds like AI slop. Tell me why it sounds like AI slop.

Dex (53:01.307)
nice!

Dex (53:09.293)
You just always tell it sounds like slop. Okay.

Dex (53:18.667)
Yep.

Kevin Gregory (53:24.034)
Right? So there's a subject, the body, and the call to action. And then we say, analyze the email, identify specific patterns that make it sound AI generated. So name the pattern, give me an example, and explain why this sounds artificial. And so all.

Dex (53:25.471)
Dex (53:39.628)
Cool. This is the LMS judge. Like, just throw more tokens at the problem and make it think more and then you just keep turning the crank, basically. Okay.

Kevin Gregory (53:48.806)
Yeah, but all this is doing is this isn't rewriting the email. This is just saying what the AI patterns are. This is just, hey, here's an email. Why does this sound like AI? And then the final part fixes that. It says the following email or the, yeah, it was written by AI. It sounds like AI slop. Fix these patterns to make it not sound like AI slop.

Dex (53:55.596)
Yep.

Yup.

Dex (54:10.43)
Incredible. Are you at any point like logging out the intermediate like objects? Like I thought I think it would be fascinating to like have it just like print out basically like here's the original email, here's the patterns we found, here's the fixed version.

Kevin Gregory (54:12.2)
and

Kevin Gregory (54:20.152)
It would be fascinating.

Kevin Gregory (54:27.617)
I'm not, but that would be very cool. That would be cool.

Dex (54:30.38)
That be a cool demo. Okay. Maybe we'll post those three versions as part of the episode. I don't want to make you go live code a bunch of print statements, but if you want to, we could try that. That would be a really cool demo. Okay.

Kevin Gregory (54:36.965)
And we think.

Kevin Gregory (54:41.421)
Yeah, we can try that. Yeah, let's do it. let me, well, let me just cancel this run because I forget, well, shoot, let me, I forget when the lock goes into place with clog code. So let me go here and we can just put break points.

Dex (55:01.562)
nice. OK.

Kevin Gregory (55:04.933)
So let's do that here, here, here, yeah, sure, why not?

Dex (55:12.918)
Cool.

Kevin Gregory (55:14.147)
And so now let's just rerun.

It's going to take a minute to get there, but that's okay. We'll just kind of auto accept everything on the way.

And then there's also one other thing is even after this, I have Claude do one final pass.

Dex (55:38.026)
Okay, so once it gets it out from the script, you're like, go make this even less sloppy.

Kevin Gregory (55:44.718)
Yeah, exactly. But it's pretty specific on what it's looking for, right? So let's see. So really it's just making sure that it still follows the structure that we want. Because it could be very easy when it's fixing the patterns for it to kind of lose that initial instruction of, we want the greeting, the opening, we want, you know.

Dex (55:53.955)
yeah, you do have a, yeah.

Kevin Gregory (56:10.457)
the sign off by vibe of index, right? It'd be easy for it to lose that. So we do one final pass to make sure it still has the structure that we want. And I could have another VAML function that does this, but I don't.

Dex (56:20.822)
Okay.

Dex (56:28.17)
You know, it's interesting when you mix in different system prompts and different models and different harnesses of the like, straight inference, just an API call versus like, hey, this thing is running with like, you don't know all of the random contexts it might've picked up while running the slash command that might be randomly helpful to make it slightly better.

Kevin Gregory (56:48.313)
Right, exactly.

And I mean, this getting this email tone right took so long that I'm really hesitant to make any changes to it. So we'll do we'll do agent to pack back pressure deep dive. So we just did. So it's going to do the folder, update all the stuff, regenerate the JSON manifest so it would update the.

Dex (57:01.309)
Mm-hmm.

Kevin Gregory (57:16.837)
RSS feed to be pointing to the correct YouTube video. But again, I'm not going to actually push this code because we already have that. But let's just get to the... I should have just commented everything else out now that I'm doing this live, but... Whoops. That's what happens when you do stuff live, right?

Dex (57:22.7)
Yeah. Yep.

Dex (57:31.03)
Ha

Dex (57:35.594)
That's good.

Kevin Gregory (57:37.413)
Alright, so, yeah, we'll just do that. It's fine. It's fast.

Dex (57:42.38)
Yeah, we'll do this and then we'll get to wrapping up and we'll make sure we include our key takeaways and one thing to remember so they land in the transcript. If anyone has questions in the chat, by the way, feel free to let them rip.

Kevin Gregory (57:50.661)
Yeah, there you go.

Kevin Gregory (58:03.941)
All we're getting closer and closer to the generate email. So at some point I do save out the email JSON. So it has a subject body and call to action, because that just makes it easier to structure. But yeah, let's see. What happens with breakpoints in Claude code?

Dex (58:12.715)
Yep.

Dex (58:16.0)
Yep. Yep.

Dex (58:24.34)
And others? You go ahead.

Dex (58:30.604)
Bro, I was literally about to ask you the same question. was like, have you used the breakpoint thing in Claude code? My thought was going to be you were going to grab the CLI invocation and then run it yourself so you get the inner... Because Claude doesn't have a PTY, so you can't actually go back and forth with it.

Kevin Gregory (58:33.879)
Yeah. I...

Kevin Gregory (58:44.581)
I should have. Yeah. Yeah. I'm just realizing this now. Yeah, it's gonna get mad.

Dex (58:53.964)
Okay, so what script did it run?

Kevin Gregory (58:56.517)
It ran just to generate email CLI. we just... Yeah. So, complete episode. Let's go to...

Dex (58:58.668)
So can you just grab that CLI so you can run it?

Dex (59:09.588)
my favorite part of the show is like hey what if XYZ

Kevin Gregory (59:14.533)
So let's see, agentic back pressure.

Kevin Gregory (59:27.045)
just come in and grab the description from the MetaMB.

Kevin Gregory (59:38.821)
And what else do we need? We also need transcript. So just the path of the screen, transcript and the path to output. So the path to the transcript is just this copy path. And then the output will just do the same except just call it.

Dex (01:00:01.217)
Yep.

Dex (01:00:06.54)
Cool.

Kevin Gregory (01:00:08.322)
Message file directory. Don't like that.

I'm gonna give it the full path. Yeah, yeah, yeah, yeah.

Dex (01:00:16.373)
the folder path.

Kevin Gregory (01:00:21.124)
Let's just go ahead and source.

Kevin Gregory (01:00:27.958)
Email generator.

Source email generating email.

Dex (01:00:33.184)
I think you just need the folder path. Like you just need to add the episode date to the front there.

Kevin Gregory (01:00:37.948)
yeah, I think you're right.

Dex (01:00:46.101)
Yeah.

Kevin Gregory (01:00:48.844)
my god.

Kevin Gregory (01:01:05.635)
Hmm.

I think what if we just do

Email here, it's not in the init. Source, email, generated.

Kevin Gregory (01:01:25.518)
Well, this is kind of stuff that clogged typically cleans up for us. Yeah, it just figures it out. So, but I can, I will.

Dex (01:01:28.736)
worse than Earth Wars. yeah, okay.

Dex (01:01:35.028)
If you see the end of there, I bet it will work because you just like you need your UV and that you need your UVV and that the route probably.

Kevin Gregory (01:01:55.512)
Yeah, there we go.

Dex (01:01:57.322)
Okay.

Kevin Gregory (01:02:00.149)
There we go. no, forgot the, no, no, no, but I got the path of the transcript. Okay, so let's see what the structure looks like.

Dex (01:02:04.812)
Yeah, those are all. Okay.

Kevin Gregory (01:02:11.01)
you

So subject, learning tests and proof driven dev for black boxes, what we covered. And then let's just do it, continue.

Dex (01:02:22.144)
Yep.

Kevin Gregory (01:02:27.076)
you

Kevin Gregory (01:02:31.948)
And so the next thing that it's doing is it's composing the email and this is almost certainly going to sound like AI slop.

Kevin Gregory (01:02:45.292)
Okay. Actually, let me just do this. Yeah. Okay.

Dex (01:02:47.596)
Draft out body. Yeah. There we go.

Kevin Gregory (01:02:54.498)
Alright Dex, why does this sound like AI slop? yeah.

Dex (01:02:55.756)
You got an dash in there. You got AI powered assumption vetting sounds super hypey.

Kevin Gregory (01:03:03.78)
The problem with assumptions, AI power assumption vetting. Let's see, another dash.

Kevin Gregory (01:03:14.51)
fuzzy external contracts. mean, if I'm over here, he'd be able, he would like nail why this sounds like AI slot. The guy's phenomenal at that. But yeah, so if we do another continue, we get the AI slot patterns. Yeah, yeah.

Dex (01:03:23.263)
Ha

Dex (01:03:31.754)
Yeah, well, let's see what AI thinks the slot patterns are.

Kevin Gregory (01:03:36.74)
This'll be fun.

Dex (01:03:37.91)
This is fun, because we also talked about doing an episode on how do you make the content sound authentic. And so you're getting that as well here. It's verbose listing enumeration within sequences.

Kevin Gregory (01:03:57.463)
So meta-commentary. humans do not exclude explicit structural labels like call to action. That's actually true. No one actually puts call to action in an email, right? You have one, but you don't actually say this is the call to action. That's very silly. Inconsistent tone and register. let's see. Juxtaposed with high technical terms like, deterministic feedback loops and proof different jet proof.

Dex (01:04:06.71)
Yep.

Dex (01:04:10.156)
In the email, yep.

Dex (01:04:20.95)
Highly recommended.

Kevin Gregory (01:04:26.734)
driven dev. I don't know if I totally agree with this one because we do like the unicorn emoji, but that's okay. That's why we have the clog code that comes there at the end and does the final cleanup.

Dex (01:04:34.784)
Yeah.

Dex (01:04:38.272)
Yep, okay, cool. Overuse of jargon.

Kevin Gregory (01:04:40.484)
And then overuse and density of jargon and buzzwords. Yep.

Dex (01:04:44.876)
I kind of like the jargon of buzzwords in this one particularly, but anyways, yeah, okay cool. Let's okay. So let's see what it cleans it up to

Kevin Gregory (01:04:49.388)
Yeah.

Kevin Gregory (01:04:58.208)
What does fix patterns? What does that, what does that output look like? it's another draft. Perfect.

Dex (01:05:19.102)
Here's a quick recap. Instead of super quick recap, I like that.

Kevin Gregory (01:05:22.371)
Yeah.

Dex (01:05:28.288)
what we call back pressure. I like this. Yeah, this is less like... it actually explains the terms instead of just like using them.

Kevin Gregory (01:05:30.851)
Yeah.

Kevin Gregory (01:05:34.506)
Mm-hmm. Right.

Dex (01:05:38.305)
Nice.

Kevin Gregory (01:05:40.792)
Yeah. And then the command would do or the club code again, we do one more cleanup to make sure it, it has the structure that we want. And then that email would get generated and then that would get sent out. Well, it'd get reviewed by you and invite Bob and then it would get sent out.

Dex (01:05:57.3)
Amazing. Yeah. OK, this is dope. This is super interesting. I know you guys riffed on this, like how to make the email less sloppy, but I hadn't actually seen it. I love this is like a classic vibe of like, OK, take the output and then do a different structure generation on it to find all the things that are wrong and then bring the input and the what we found wrong and pull those together and then actually generate the new thing.

Kevin Gregory (01:06:17.782)
Yeah.

Kevin Gregory (01:06:21.699)
So what would we say our key takeaway here is, Dex? For me, mean, there are a couple. It is hard to get AI not to sound like AI slop. Even after all this and multiple AI reviews, we still need humans in the loop to clean it up, and we still typically do one or two rounds of edits on it. So it's hard. It's hard to do that. And then I'll say the other main thing that I learned is,

Dex (01:06:27.468)
yeah. Go ahead. Let's hear it.

Kevin Gregory (01:06:51.873)
Figure out, like we said earlier, figure out where it's okay to automate and where it's not okay to automate. If you're gonna send out an email to 2,000 people, make sure that you don't have an AI doing that because if it messes something up, then that's a really embarrassing mistake.

Dex (01:07:12.052)
Yep. And I think another thing here that is almost like starting to become taken for granted, but back in over the summer, it was a whole episode topic, which was like using Claude code for less technical tasks or using Claude code as kind of your top level orchestrator for a process where you can actually, the agent gives you a little bit of robustness and flexibility and almost like squishiness over a set of deterministic tools.

and kind of using just like a dumb tool calling model with a simple to like go execute a process and like I think skills are kind of in this direction but yeah this idea of like make a prompt that is everything you have to do you can always leave in like stop and get the human to do this part and then you can slowly fill it out with more and more automations as you go

Kevin Gregory (01:07:59.916)
Yeah. And something that we saw was the actual instructions in the Cloud Code command were wrong. I moved a function add the init and into it, I renamed it. And the instructions were wrong in the Cloud Code instructions, but Cloud Code was able to figure it out. So it's almost...

It's almost like a front end for CLIs in some way, where you don't have to be super specific. You don't have to be exact in what everything is supposed to do and how it's supposed to look. And it's smart enough that it can kind of fill in the gaps and sand out all of those burrows for you.

Dex (01:08:29.685)
you

Yep. And then over time, always have this up like I think I do this a lot for our internal processes. I have things where we send our monthly updates to investors. I have things where we like send a weekly sales report to the team of like how our customers are doing all this kind of stuff. And it's like, it's only half automated right now, but every
