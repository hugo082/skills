Dex (00:00.526)
Oh, wow. This is again. Here we are again. AI that works. What's up, guys? How y'all doing?

Vaibhav Gupta (00:08.961)
How's it going Dexter?

Dex (00:10.926)
I'm doing great. currently in an undisclosed location taking care of some business, but I wasn't going to miss the pod because I'm very excited about the topic today. Do you want to introduce our guest? I am in an undisclosed location. I'm in a very colorful conference room.

Vaibhav Gupta (00:23.266)
Where the hell are you?

Vaibhav Gupta (00:28.802)
It looks like you're in a Willy Wonka factory if I'm completely honest.

Kevin Gregory (00:29.424)
in a bright yellow room.

Kevin Gregory (00:34.012)
Hahaha

Dex (00:35.756)
You know, you're not far off.

Kevin Gregory (00:37.106)
Good

Vaibhav Gupta (00:38.626)
well guys, good to see you again. think today's episode is one that I think funnily enough, I had a few DMS this week just talking of purely about multimodal evals. And I was like, I was like going straight forward. was like, my God, this is a perfect episode for the timing of what's going on. And then Kevin here, who's many of you might've seen from a previous eval episode that we did.

had actually gone through it and gone really deep into this problem. And I was like, well, there's no one else better to have than Kevin right now on this timing.

Kevin Gregory (01:14.482)
I appreciate that introduction for me. I was I was on the podcast. Gosh, month ago, month and a half. to remember. Lose track of time. But, you know, in a previous large scale classification pipeline evals. But Kevin Gregory, I work an ML engineer at Evolution IQ and we build claims guided software for insurance companies. So hopefully we build AI that works.

Dex (01:43.905)
Yeah, mean, when you're in, I mean, that's the thing I think that is like, don't talk about enough on the show is like, know, VibeOff spends a lot of time and we try to bring out guests who are working in industries. It's a lot of like, things that you can apply and like vertical AI. One of the things that led to like the whole 12 Factor Agents thing and the context engineering thing at the start was like, hey, like, let's go talk to a bunch of people who are actually like,

shipping real AI products to the enterprise with high reliability in situations where like, it doesn't work. Like, let's blame the AI is like not an acceptable excuse. Like it has to work. It has to work almost as good as deterministic software. And how do you get the reliability? And exactly, exactly. What's the hard problem, right? What's the thing that a lot of people may want to just like note out on and...

Vaibhav Gupta (02:24.64)
I mean, if it doesn't, it's just not interesting. Right?

Dex (02:35.746)
how are people who need to solve real problems for serious businesses actually like putting pen to paper and solving this stuff?

Kevin Gregory (02:43.334)
multimodal email is something that we do a lot at Abolition IQ. There's a lot of medical documents that come in with insurance claims and you can OCR it and get text and just kind of treat it as a text input or you can just do multimodal but how do you do that? How do you build it reliably? Which do you choose? There's all sorts of considerations that go into making those decisions and building out those pipelines.

Vaibhav Gupta (02:43.446)
So

Vaibhav Gupta (03:04.619)
So with that in mind, I think what we should do first is let's just lay out the problem that we're working on for everyone so that way we can have it understood. So I'll screen share. I'll show off the Excalibur draw. And Kevin, why don't you just take us through and start posting some general diagram of the problem that we're investigating here together.

Kevin Gregory (03:24.21)
Sure. So you just want me to start drawing an Excalibur?

Vaibhav Gupta (03:27.83)
Yeah, the weekend is going in.

Dex (03:28.332)
Or if you want to talk through it, can try to take notes if you want to do like the broad strokes and I can annotate it.

Kevin Gregory (03:29.81)
Yeah.

Kevin Gregory (03:34.768)
Yeah, so many people on this call may be familiar with something called the cord data set, but what it is, it's receipt data. And the goal with this is to say, okay, how can we build a pipeline that takes all these different kinds of receipts and...

extracts the information from the receipt, such as the item amounts, the grand totals and everything like that, and does so in a reliable fashion. And what's interesting about receipt data is that there's a lot of, for one, the actual size of the data, or the size of the images are kind of all over the place, right? Like receipts are, you know, everyone, I think here's probably been to CBS and gotten the receipt that's like 30 feet long, and it's kind of comical.

And and things like that are not at all what the LLMs are expecting right they're expecting kind of a certain specific size and dimensionality and So receipts Yeah, absolutely So these were actually interestingly enough from Indonesia So these are Indonesian receipts Yeah, wow, there's yeah look at that

Vaibhav Gupta (04:32.748)
Do you want to post some of the images here just so we know what we're looking at?

Vaibhav Gupta (04:47.519)
Okay.

Kevin Gregory (04:51.876)
So it took me a minute to figure out why the commas and decimals were different. It's because it's Indonesian. And you can see there's just, so there's a kind of a normal length one there. And here is a really small one with only one item. And I'm just scrolling through and randomly picking them. So I'm not kind of, you know.

Vaibhav Gupta (05:13.14)
And interesting, they're like, not only are they receipt data, it's like receipt data that's like randomly blurred or like hidden away too.

Dex (05:13.485)
Okay, so then.

Kevin Gregory (05:19.378)
Mm-hmm

Dex (05:19.575)
This is like redacted for privacy or what?

Kevin Gregory (05:22.642)
I suppose for privacy, not a lot of vendor information here per se. It really focuses on the totals themselves. This is just the data set. This is from Hugging. It's a Hugging Face data set. Yeah, I mean, I can just...

Vaibhav Gupta (05:35.884)
Got it.

Vaibhav Gupta (05:40.342)
I mean, can see how this is not only this silly, it's comically silly in the form of CVS. In that scenario, you can barely see the total. If you really squint, and you can make out some pixels of what it might be.

Kevin Gregory (05:48.604)
Right.

Dex (05:54.103)
I this one in, I don't know if this is actually, this probably is not actually part of the data set, because you cannot see the actual totals.

Vaibhav Gupta (06:00.416)
I mean, if you squint at it anyway. But I think the point here is like, and some of them are like grease stains, some of them are clearly have shadows and all sorts of other problems on them. Yep.

Kevin Gregory (06:07.096)
Mm-hmm. There are some that are crinkled at different angles So

Vaibhav Gupta (06:13.571)
So like really real world, really, really real world data is what I'm seeing.

Kevin Gregory (06:18.234)
Mm-hmm. Yeah. it's another thing that's interesting is, and we'll kind of get into this when we start exploring and kind of discovering the things I did and the mistakes I made and what I found is some, seems like some of the restaurants randomly have different taxes that they apply and those can appear in different ways and don't always get added to the total it looks like. It seems it's PB1.

Vaibhav Gupta (06:20.48)
Okay.

Kevin Gregory (06:44.53)
You see this in this purplish one right here that I'm kind of moving around. Yeah, this PB1 is a restaurant tax that is only there sometimes. And so, yeah, so it's. Sometimes it is, sometimes it's not. You can tell here it is because it's the only one that ends in a two and the total ends in a two, but it seems like.

Vaibhav Gupta (06:56.446)
And it's not even added to the total, you said?

Kevin Gregory (07:07.138)
Sometimes it's there, sometimes it's not there. I also discovered that sometimes there are just discounts applied. So it's a kind of thing where the more you look at these, the more challenges you find. And that's kind of the point, right, is you have to just start building the system and build a system in such a way where it allows you to easily and quickly uncover these things.

Dex (07:33.431)
Okay, so what is your output data set look like? Like I'm wondering, like, do you like have a table model? Are some of these fields optional? Like, what do you actually want in your structured outputs here? You said item amounts, grand totals. Like, do you have either a document or a BAML struct or something that kind of just demonstrates all of the things we might want to pull out of one of these?

Kevin Gregory (07:44.604)
Sure. So.

Kevin Gregory (07:52.284)
Yeah.

Kevin Gregory (07:55.793)
Yeah, I've got a BAML file and I can just post quickly because I'm sure it'll be... Yeah, yeah, yeah, yeah, yeah, that's perfect.

Vaibhav Gupta (08:00.738)
Yeah, just post screenshots in here for now. We'll get to the code in a fast and we'll go dig into it later. Or even the extracted JSONs. If you have like extracted JSONs, they might be interesting as well to just take a look at really quickly. Just so we can understand what the final end output is.

Dex (08:06.604)
Yeah, yeah, because yeah, well.

Kevin Gregory (08:13.81)
Ummm... Yeah.

So this is the BAML class. And this is of the final, right? Initially I didn't have the unit discount or the rounding or things like that in there. You'll kind of see me discover these things as I... Yeah, interesting, right? Yeah.

Vaibhav Gupta (08:26.418)
Rounding interesting, okay. I Think this just looking at this like my first gut instinct is just like like Like my first gut instinct is like I'm surprised that you need quantity for things like receipt data like this. I can see why but it's It's not how I buy most things. There's I mean sometimes I have quantities, but usually I just say like what it is

Unit discount is interesting that you needed that in there. Like this thing obviously flags me in a very weird way.

Kevin Gregory (08:57.648)
Mm-hmm.

Dex (09:01.388)
hahahaha

Vaibhav Gupta (09:03.778)
The fact that you need this is really interesting. I really wonder why you call this grand total instead of total, but I can see why you have subtotal. sounds like you have... It just like... Go ahead.

Kevin Gregory (09:09.042)
See ya.

Kevin Gregory (09:15.334)
That's it. Subtotal, yeah. Subtotal versus grand total. I wanted the LLM to be really clear on what the, know, that there is, those are two distinct fields and don't get them confused.

Vaibhav Gupta (09:29.63)
I see, and like we can look at this and we can clearly see that it's... And it seems to be working mostly correctly.

Kevin Gregory (09:35.972)
Mm-hmm. Yeah. It's good. And there are some edge cases where, I mean, that you'll see that when I look at the receipt, I can't even figure out, like, what is going on in this receipt. The numbers don't seem to add up. You know, so it's very interesting. It's very interesting.

Vaibhav Gupta (09:53.283)
So, okay, so before we go into this and really ask, really ask, okay, so someone asked a question, dumb question, why did rounding stand out immediately? Well, the reason rounding stood out to me immediately is like, when I think of receipts, I don't think of rounding my totals. I usually just swipe my credit card and the number is what it is, so I don't, I, at least living in America, we generally don't round stuff. You might round stuff for tip and tax, but.

Dex (10:21.28)
Gas stations. Gas stations have fractions of a penny.

Vaibhav Gupta (10:22.722)
for gas station. I guess. OK, but that's rare.

Dex (10:27.254)
Or they used to, maybe they don't anymore, actually. Maybe that's like, maybe I'm aging myself.

Vaibhav Gupta (10:29.634)
I have no idea.

Vaibhav Gupta (10:33.706)
And then, so it just stood out as something weird that I would pull out because it's just not a, my gut instinct doesn't say that I would round by default. And then another question that someone asks is, why not do OCR and pass to an LLM? I think for that, have a really, maybe we should just do OCR really quickly on all these images. And just to show what OCR does and at least Kevin, I'm not sure about your take on this or Dexter.

Dex (10:55.317)
Yeah.

Vaibhav Gupta (11:03.734)
But my problem with OCR that I have always seen is OCR loses structural assemblance whenever I do that. So like in the case of this thing up here, in the first image on the top right over here, if I were to do OCR, I would get a one and LM dumpling chili SC and 68 comma zero, zero, zero. Yeah, I don't know. I would have to infer the space and have to be like, they're rotationally in the same angle. So.

Kevin Gregory (11:08.871)
Yes.

Dex (11:24.533)
the spacing.

Vaibhav Gupta (11:32.332)
Therefore it's correct. But if the image was taken at like a slight angle like this, all of a sudden I can't even use OCR to be like, I have to go find like the normals of the image. And that's just a more complicated problem in my experience.

Dex (11:47.341)
Yeah, okay. So I think probably for the rest of this episode, like before we get to the code, think it would be really interesting to one, maybe Vaibhav very briefly recap just like the four or five categories of evals we talked about in the last eval episode of like runtime guard rails, vibe evals, like deterministic evals, this kind of stuff. And then talk about Kevin just really high level, the architecture of your pipeline. And then we can get into like,

What checks did you put at what parts and how is it implemented? How's that sound?

Vaibhav Gupta (12:22.658)
Dex, I love that you're asking me to do this, Kevin showed me a screenshot of his dashboard. I think you should just pull that out. It's going to answer half the questions really quickly. Let's just start with the final dashboard that we ended up with, Kevin. The final one. And I think we can start with what we ended up with, and then we can walk up to the journey of how we got there and what was the process of discovery. Because I think there was something that stuck out to me that when you DM me is like, I think one of the things that Kevin told me about this is like, this problem was way easier than I thought.

Dex (12:29.292)
Alright, let's start there. Alright, let's start there.

Kevin Gregory (12:29.49)
Okay.

Final one.

Kevin Gregory (12:40.434)
Sure.

Kevin Gregory (12:52.526)
It was a lot easier than I expected. Yeah.

Vaibhav Gupta (12:55.201)
And first, like for people that were asking my handwritten documents or anything else along that lines, like this problem is way easier than you think. But I think the key takeaway here that we had when Kevin and I were talking about this was it was only easy because the mechanism that Kevin used to break down the problem is what made it easy. And we'll talk about it in a

Dex (13:13.26)
Okay, so the design of the system mapped nicely onto the design of the evals because we had all that in mind from the start.

Vaibhav Gupta (13:22.111)
Exactly.

Kevin Gregory (13:23.782)
Yeah, and I took a very similar approach to this that I took to the large scale classification pipeline, right? Of what information is going to inform how you change the pipeline, right? Like what information is going to tell you where the errors are, what they are, and show you exactly what's going on. And then how do you display that in a way that just knocks you over the head with how obvious it is what's going on, right?

So this is the final one of I ended up doing 350 receipts total instead of 100 I showed you yesterday. Just to kind of fill it out a little bit more. And you can see here, right? This is the, these are the evals data completeness. Are there receipts and grand total grand total calculation does the sub total. mean, so

These two grand total calculations, subtotal consistency and sum validation are just looking at different pieces of if you add up just the transactions, does it equal the subtotal? Does it, the extract is subtotal plus the taxes and roundings, does that equal the total? So it's just basic summations that are supposed to happen. Unit price accuracy, right, that is number of items purchased times the price should equal the amount.

extracted for that line item and then positive values, right? If you're extracting something, it should be a positive value, right? You're paying for something, it should be positive.

Vaibhav Gupta (14:46.018)
And it's funny that there negative failures there. That's actually what's very surprising to me.

Kevin Gregory (14:51.906)
Mm-hmm. Yeah. And so, I mean, what we can do real quick is we can just look to like, okay, so there are what? Two that failed the positive values. So it's extracting negative values somewhere. And that might be correct, right? The eval itself might be wrong, but we can just look at that. let's see if we go to the detailed results, we can quickly just scroll to, let's see, this one. If you failed, that's not the...

So we can quickly just look to see where it failed with the positive. Here we go. This one had positive values. Or I'm sorry, this one failed the positive values. So we just look at the receipt. And so let's see, are there negative values here? No, there aren't. I'm not seeing any. the discount. It extracted a negative value for the discount. And it extracted that as a.

line item not as a discount because if we go here because we can see the extracted data right next to it yeah it thinks it we purchased a DISC and that it's not a discount on the amount but we purchased we purchased something called a discount it does right because the grid

Dex (16:05.803)
Hmm

Vaibhav Gupta (16:07.17)
And what's funny here is that does lead you to having the right answer in the end.

Dex (16:12.085)
because you had one and minus one on the row.

Kevin Gregory (16:15.57)
That's right. So, because the summation all works, but it's interesting.

Vaibhav Gupta (16:15.658)
Yeah.

Vaibhav Gupta (16:21.366)
And what's really interesting here is if you had, example, let's say you had built your software. Can you scroll up a little bit where you did the minus DLC in the data set, in the data, in the extracted data?

Kevin Gregory (16:29.637)
The minus DSC.

Kevin Gregory (16:35.042)
I'm here.

Vaibhav Gupta (16:35.362)
What's funny here is you could imagine someone saying, hey, unit price we know always has to be positive and writing an absolute value on there, programmatically. And that would clearly lead to the wrong output here.

Kevin Gregory (16:46.012)
Mm-hmm. Mm-hmm.

Dex (16:49.547)
okay. So if you worked around that it had negatives by just flipping every negative to positive and assuming it was an LLM error, you would actually break the thing because these two errors happen and cancel each other out probably like, correctly structurally like from whatever system this came from. But yeah, you make assumptions that nothing is ever negative and you end up with Yeah, okay.

Kevin Gregory (17:10.769)
Mm-hmm.

Vaibhav Gupta (17:11.212)
And what's interesting here is like, this is just like one of the grant, one of the failures here in terms of negative, but I suspect you're saying this, Kevin, because I see like you spend a lot of time looking through the data and every time it said, gave you something negative, you're like, shit, that's real world data. It's actually negative.

Kevin Gregory (17:26.352)
Yeah, yeah, exactly. And it's so fascinating.

Dex (17:29.419)
Question in the chat that I think is relevant. So none of these receipts have a golden data set, right? The hugging face data set doesn't actually have the right answers with it.

Kevin Gregory (17:41.351)
So the Hug Your Face data set has, it does have what they call metadata. I looked at it some and compared it. It was...

Honestly, it would just would have taken a lot longer to incorporate into the pipeline because it has a lot of quirks to it that I needed to spend a lot of time figuring out. And I think my goal with this was to try to build a, you know, like in the real world, right? We don't have the goal and data set. So how can we try to get closer to building that on their own was kind of the attack that I took with this. But yeah, hugging face does have what they call metadata, which has a lot of information, including the actual amounts.

Vaibhav Gupta (18:23.478)
My gut says that for most people working on AI pipelines, especially like multimodal data, they don't have a golden data set, like exactly what Kevin is saying. And I think if you go back to the original dashboard, Kevin, the homepage, instead of the detailed view, my first gut says it's really important for people to be able to almost elevate from like having no golden data set, only random data, to first building a proxy of like, is the system mostly working?

and which evals are at the most risk of failure. So in this case, like we looked at positive values, even though positive value is failing, it's actually not a true failure. It's a failure where if you look at it, it's actually correct. So we almost are like, okay, cool. Positive values are thing will spot check, but they're almost always going to be correct. Now we can go look at some validation or subtotal consistency or grand total consistency. And what's interesting to me is even if some validation and subtotal consistency is wrong, grand total calculation seems to be way more correct.

And being able to design from this and then slowly escalate to making a golden data set from this data is way more interesting than actually saying, let's go make a golden data set from day one. Cause it's just so much slower.

How, by the way, how long did this take you? Timing wise.

Dex (19:38.315)
Do you have... Sorry, we get to... Like... Alright, answer that question, then I have a question.

Kevin Gregory (19:45.926)
This whole thing probably took me three to four hours.

Vaibhav Gupta (19:51.188)
including running the system.

Dex (19:51.529)
Okay, but how, they're good.

Kevin Gregory (19:54.33)
Including what?

Vaibhav Gupta (19:55.552)
including running everything by putting the whole UI and everything.

Kevin Gregory (20:02.234)
It was really fast. Maybe I'm exaggerating, but it was not a substantial time investment.

Vaibhav Gupta (20:11.722)
Interesting. That's actually way less than I expected, to be completely honest.

Kevin Gregory (20:15.826)
Yeah, yeah, that's what I was saying when I meant that this is, um, yeah, I want to say the stopwatch.

Dex (20:24.372)
I mean, this is what we say about like code in general is like, think someone was, someone was posting that like, code is now really cheap and software is really cheap and like update your priors about how and when and why you build software. And one of my favorite comments was like, the writing of the code was never the hard part. Like it's important to get it right. But like when you have the design and I know you demoed a similar dashboard to this. like,

Kevin Gregory (20:43.964)
Mm-hmm.

Dex (20:49.322)
You kind of already knew what you wanted and you knew how the system would be designed and you knew what kind of data you needed, like formatted on disk and you knew how you would run it. And it's like, that's the hard part that I think takes a lot of iteration and time and like designing systems is still people tell me like, I talked to someone yesterday, like, should I still learn to code? Like, is that going to be a waste in five, 10 years? And I'm like, knowing how to design systems is going to be really, really important. And like they talk about like programming is building a theory. Like.

Kevin Gregory (20:54.898)
point.

Vaibhav Gupta (21:15.778)
Bye bye.

Dex (21:16.138)
And building a theory and designing this stuff, I think is really, important. don't know. That's, that's, that's my take on like, yeah, this was fast because you knew exactly what you wanted and you knew what the design was.

Vaibhav Gupta (21:20.768)
Yeah.

Kevin Gregory (21:27.666)
Yeah, that's a good point.

Dex (21:29.118)
And that stuff was hard earned. That stuff probably took months or years to develop.

Vaibhav Gupta (21:29.174)
Whoops.

Kevin Gregory (21:31.474)
Hey.

Vaibhav Gupta (21:35.394)
Let's go back to day one. When you first started this project, Kevin, what was the first thing you did and what did you end up doing next? How did you end up in this final design in the very first?

Kevin Gregory (21:43.314)
Sure.

Dex (21:45.322)
Goodnight.

Kevin Gregory (21:47.462)
Sure, the very first thing I did...

Dex (21:47.851)
Yeah, and I'd love to know, yeah, okay, sorry, tell the story. I'd love to also know like a little bit more detail, like how it actually works. Like not every line of code, but like how do the different components of the system fit together? And like, what are the interfaces that you created to make this work well for you and be kind of like be able to evolve it. all right, let's go to baseline. Number one, 21 receipts, okay.

Kevin Gregory (22:06.738)
Sure. Sure.

Yeah, so I started with just very basic like training wheels, right? Like I don't want to spend a lot of money on LLM compute if nothing's working. So this is using GPT 4.0 and right out of the gate and you can see that the amounts aren't, it's okay, but there's a lot of mistakes, right? So the sum validation is the biggest one that we're missing. And if we look at that, let me just look and look at one of these.

It's so interesting to me because it's so, it's so tempting to think that and to forget that LLMs are just math and computers behind the scenes and there's not, they're not actually people because you'll just see flat hallucinations here that are just plainly wrong. I mean, I don't know one right off the top, but it's missing something here. You can tell it's off by.

a lot, right? 17, 3, 200. And if you would kind of scroll down the extraction here and the receipt, you'd find that there's just one that is just completely missing or just completely wrong. So my first thought was, okay, so what if I just use a smarter LLM, right? So instead of using GPT-4.0, what if I use, yeah.

Vaibhav Gupta (23:21.986)
Before we show the results of the smaller alarm, question, did you have all these evals designed from minute one?

Kevin Gregory (23:29.138)
Yeah, I did. So my thought was, so if I'm extracting receipt and I'm getting things like the subtotals, I'm getting the item amounts, the grand totals, I actually went back and forth with, it was a sonnet and cursor and said, here's kind of what I'm doing, let's brainstorm, figure out what some good runtime evals would be.

Vaibhav Gupta (23:52.64)
Okay, so the first thing you actually did wasn't actually do this. You just stopped and thought about the problem for a little bit.

Kevin Gregory (23:58.675)
So the first thing I did was look at the receipts. That's the very first thing I did. I downloaded the data, looked at the receipts. That was, yeah, and that's when I realized that, this is not American currency, right? We're somewhere else. So yes, the very first thing I did was looked at my data, just spent some time.

Vaibhav Gupta (24:01.461)
Okay.

Dex (24:02.761)
Always look at your data.

Vaibhav Gupta (24:12.48)
Okay.

Kevin Gregory (24:18.098)
Just like we did with the whiteboard, right? Just looking at different receipts and wow, there's all these kind of different things Some are greasing some of some handwriting some of random discounts. Well, I mean I didn't see that right off the bat, but Looked at the data

Dex (24:30.761)
What I love about the design of this so much is you didn't have to do any hand labeling. You needed no golden data set. You designed a system to evaluate the accuracy of extraction solely based on like the invariant that you know should be true about the receipt.

Kevin Gregory (24:49.124)
Exactly.

Vaibhav Gupta (24:50.114)
Okay, so you looked at the data. literally, I'm guessing you just downloaded it and just scrolled through images and like picked random ones and like skimmed really fast. Okay, so step one, looked at data. Step two, what did you do next?

Kevin Gregory (24:55.751)
That's it.

That's it.

Mm-hmm.

Step two, I set up the project, set up the repo, set up BAML, and went back and forth with an LLM to figure out what runtime evals there should be.

Vaibhav Gupta (25:21.324)
So really quickly, what do you mean by set up the project? So does that mean you started loading the image files, you started running a small test harness in Python where you could like loop through images really quickly, or was it purely just like initialize? okay, so not really anything, just so you could have a folder to work out of. Okay. Okay. And then I'm guessing you defined your receipt data model very cursely.

Kevin Gregory (25:36.72)
It was purely just initialize. Purely just initialize. Exactly. Just got, so I got a folder to work out of.

Kevin Gregory (25:49.553)
Mm-hmm.

Vaibhav Gupta (25:50.976)
very trivially.

Kevin Gregory (25:52.787)
Mm-hmm. Yeah. Define the received data model in BAML.

Dex (26:02.409)
Okay, so the original one didn't have all of these like rounding grand total tax stuff.

Vaibhav Gupta (26:05.356)
Can you show roughly what the original receipt data model was? Do you have that somewhere? Or you can just write it. If you just want to write it really quickly, like be like receipt V1, I'm just really curious what you ended up.

Kevin Gregory (26:10.066)
No, I don't have it, but...

Kevin Gregory (26:16.39)
I mean, I can just kind of pretend here, right? So this is what it ended up being. But the initial one, the initial one was literally just, yeah, absolutely. Hang on.

Vaibhav Gupta (26:24.374)
Can you zoom in a bit, Kevin?

Vaibhav Gupta (26:29.919)
There we go, that's perfect.

Kevin Gregory (26:31.226)
Okay, so the initial one was literally just item name, quantity, unit price, total price. And then for the, that was the transaction data. And then for the receipt data, all of this was gone and I just had transactions, subtotal. No, I think I just had transactions in total initially. It was just add up all the transactions that should equal the total.

Vaibhav Gupta (26:59.862)
Got it. Okay. And then, then you went through like a cursor conversation from here and you said, what are some runtime emails that I can do?

Kevin Gregory (27:05.425)
Mm-hmm.

Yeah. And then that got me to update this so I had the subtotal and the tax. Which made sense to me.

Vaibhav Gupta (27:20.236)
Got it. And that was, it didn't really like disagree with what you were thinking. It was like, this seems obvious. And the runtime, the cursor conversation led you to have, and if you pull up again, what evals you were showing, the evals you had were data completeness, grand total calculation, unit price accuracy, subtotal consistency, positive values, and some validation. And then that.

Kevin Gregory (27:21.361)
Yeah.

Vaibhav Gupta (27:47.294)
Once it described those, added subtotal and tax. now you have a data model and then evals that you have.

Kevin Gregory (27:55.022)
Exactly.

Vaibhav Gupta (27:56.163)
Perfect, cool. And then you ran that on a very cheap model. I guess the model that you're most familiar with, which is GPT-40. I just feel like it's not even that cheap. It's just about familiarity. It's just like the model that you probably, it's your go-to model for a task.

Kevin Gregory (28:05.138)
Mm-hmm.

Dex (28:08.297)
Can we pseudo code out kind of like the core loop here? It's like for each image. I mean, I guess it's pretty clear, right? You take each image, you run the extraction, you do the math, and then you record which of the checks passed and failed. And they're all just pass fail. Okay.

Vaibhav Gupta (28:15.97)
you to see the code.

Kevin Gregory (28:27.374)
Exactly. Exactly. The rules of pass fail.

Vaibhav Gupta (28:32.834)
Okay, and do you want to show that? Actually, this is a good idea. Do you want to just want to show that code? I know we're going to share the repo and it's going to be in the AI that works. It's going to be in the AI that works repo, but do you want to show the code really fast?

Dex (28:35.421)
Be interesting. Yeah. It'd be interesting to see the code that like takes the extracted data.

Kevin Gregory (28:42.064)
Mm-hmm. Sure.

Dex (28:44.585)
Or like show, yeah, show one of the evals or one of the like, just like the code that like takes the output and does the math on it. I mean, it's pretty simple code, I'm sure, but it'd be kind of interesting to see it for real.

Kevin Gregory (28:53.318)
Mm-hmm.

Kevin Gregory (28:56.914)
So let's see, it's all zoomed in, so it's a little off. So.

Vaibhav Gupta (29:03.468)
You have an image, you produce extracted data on it right there.

Kevin Gregory (29:07.108)
Right, so this is the extracted data. if we... Mm-hmm.

Vaibhav Gupta (29:10.055)
and you have error handling to be like, sometimes it fails. Which is also fail. Which is also fair, yes.

Kevin Gregory (29:15.6)
Yeah, which is actually, the dashboard keeps track of how many failures there are. Which, spoiler alert, I tried to do Gemini 3 last night and I got a ton of extra action failures. yeah. Then, not sure what's going on with that, but somebody figure it out.

Dex (29:27.145)
Mmm.

Dex (29:32.201)
They said this one's supposed to be better at tool calling.

Kevin Gregory (29:36.952)
I don't know, maybe it is. Maybe I was doing something wrong. It's very possible.

Dex (29:39.113)
No, I mean, I'm sure they said that and it's not as true as they want it to be.

Vaibhav Gupta (29:40.566)
You can speak to it.

Vaibhav Gupta (29:44.684)
Yeah. Okay. And then you produce an evaluation result.

Kevin Gregory (29:44.838)
Yeah.

Kevin Gregory (29:49.476)
Right. And if we just look at, say, evaluate grand total calculation.

Vaibhav Gupta (29:57.515)
It's just like, it's just a model. Yeah. Okay, cool. So there's like, there's no, there's nothing fancy here. You're literally just doing that. tolerance is interesting because you have floating point numbers. Makes sense. So you have to go build tolerance out.

Dex (29:57.929)
And then you're just doing math on a JSON object.

Kevin Gregory (30:05.553)
Nothing fancy. Literally.

Dex (30:11.57)
Cool.

Kevin Gregory (30:13.52)
Mm-hmm.

Dex (30:16.21)
Did you have tolerance from day one or was that something you added later when you saw some of them were like off by one cent?

Kevin Gregory (30:16.487)
Yeah.

Kevin Gregory (30:22.194)
I had this from day one.

Vaibhav Gupta (30:23.628)
Yeah. I suspect, yeah, if you're ever doing floating point math calculations, you will always have this error. need like, you need a tolerance. You don't have a choice.

Dex (30:23.975)
Okay.

Dex (30:33.586)
Cool.

Kevin Gregory (30:34.306)
Um, yeah, it's very, it's very basic. Like I said, this task was, it surprised me as to how easy this task ended up being. I was expecting a lot more kind of, I was like, have to a lot more time on it.

Vaibhav Gupta (30:45.602)
And you know what I find really interesting about this is if you wanted to add another e-val, it's actually really easy for you to add one here because like you just add one more to the list. It's effectively zero cost.

Kevin Gregory (30:51.686)
Mm-hmm.

That's it. That's it. Yeah, that's it.

Vaibhav Gupta (30:58.198)
That's cool. So I could see why you said this basically took you three hours because you basically have two separate pipelines here. You have one pipeline that does the actual extraction. You have a separate pipeline that runs the evals on those platform on that extraction. They're disjoint. They have no dependencies except the shared data model between them, which is the receipt data object that you showed us in the receipt.baml file. And then you have a third system that visualizes the results of the second system.

Kevin Gregory (31:26.02)
Mm-hmm. That's right.

Vaibhav Gupta (31:28.244)
and you just have a data contract between them that shows how to go render.

Kevin Gregory (31:32.858)
Mm-hmm. Yeah.

Vaibhav Gupta (31:33.77)
and last time

Dex (31:34.396)
Okay, so the evaluation results get written to like a JSON file right next to the extraction results.

Kevin Gregory (31:40.441)
Exactly. Yeah. I mean, if you look results, we can look at this one, detailed results. This is if we scroll up, you see the evals. This is what the Streamlit app is reading from here.

Dex (31:56.649)
So this is for a given receipt for an image path. So this is how lets you render all that stuff if you need to. And then, okay, cool.

Kevin Gregory (31:58.995)
Mm-hmm.

Exactly.

Vaibhav Gupta (32:04.628)
Exactly. And that's how he loads data dynamically. That's how he pulls up all the information about it. It's all.

Kevin Gregory (32:07.783)
Mm-hmm.

Dex (32:10.182)
And is the extracted data embedded in here as well? In like this JSON object or does it have to look that up? yeah. Okay. Cool.

Kevin Gregory (32:14.928)
Yep. Yep. It's right. That was what I pasted in the whiteboard. Yeah, it's right down here. So yeah, it can just read this and the Streamlit app has everything that it needs.

Vaibhav Gupta (32:25.13)
And the reason that this was so fast for you to do Kevin, from what I understand is last time when you built your classification system, you actually spent a lot of time on designing this shape. Like you're like, what is the shape of the data? Extract the data out here. There's a bunch of evals that have these names and these results. And then it has that the model information. Cause I want to be able to compare same image on different models. It has to have a run information because I might run the same thing multiple times based on things that I changed along the way.

Dex (32:25.883)
I love that.

Kevin Gregory (32:33.522)
Spent a lot of time. Yeah.

Kevin Gregory (32:47.505)
Yep.

Vaibhav Gupta (32:54.806)
So your reason was shaping the data shape for the tooling before you actually really built it. But once you've designed the tooling, it's effectively zero work to make any different system use the same two ways.

Dex (32:54.92)
I

Kevin Gregory (33:08.178)
Yeah, you know, that's actually a really good point. I hadn't realized until you just said all that how much my work on the previous one kind of set me up for this to go really, really quickly. Yeah.

Vaibhav Gupta (33:18.38)
Yeah, that's actually very similar to how I have seen most AI, like most companies that we've worked with have actually had a very similar response where like, I think the work upfront feels so painful and so annoying. Cause you're like, why am I doing this? I can just like one hack this, like not think about this and just do a one-off. But it turns out if you do one-off work, every single project takes the same amount of time consistently. But if you do the upfront work upfront where you just stop and

Kevin Gregory (33:43.334)
Mm-hmm. Yeah.

Vaibhav Gupta (33:46.614)
think about the design system a little bit better. The next project similarly just takes way less time because most of the fundamentals are truly the same. Now I'm curious on the design. go ahead.

Dex (33:59.762)
And I actually, just to echo your point, I really like this pattern. I naturally stumbled into something like this when I was building like a PII extraction and like scrubbing pipeline where like I was writing after each step of the pipeline, you want to write the JSON because then you, the human can inspect it. You can resume from a past result. You can test incremental parts of the pipeline. Like the results actually can become like the bits that you use to build more like.

baked golden evals, golden data sets, golden like test sets so that you can you can know that and like having JSON is nice because it's human readable and machine readable for some some people some people say JSON was meant for humans. I don't know if I would go that far. JSON was meant for was made for machines.

Vaibhav Gupta (34:43.7)
mean, this one was meant for humans. If machines were the only thing we cared about, we'd all use protobuf.

Dex (34:48.584)
That's all right, fair enough. Yeah. Anyways, no, I think the structure makes a ton of sense. I'm like, I can't imagine building any kind of AI pipeline. My question actually for both of you is like, do you have thoughts about how this would scale? Cause like once you have a hundred thousand images, is it actually like performing to do this in JSON? Or do you have thoughts about like, you move this to like, obviously same structure and like checkpoints along the way, but like, what are the limitations of doing it this way?

Vaibhav Gupta (35:16.386)
Well, I don't think JSON itself is necessarily bad. You could store it into an S3 bucket instead of JSON. It's the same thing. Like, like it's S3 bucket with paths. The fact that you're a file system is the storage layer itself doesn't matter.

Dex (35:31.144)
What if your results gets too big to like store into memory? Like you have to then figure out how to like, you have to do some kind of like sharding. Yeah, but you need to pull it down to do each incremental step of the pipeline.

Vaibhav Gupta (35:34.722)
Yeah, that's one thing, just put it into S3.

Vaibhav Gupta (35:41.633)
that, sure. Put it into MongoDB database then like put into MongoDB data and like query only the fields that you have. Like Kevin did over here. If you scroll up Kevin, like the, the JSON struct that he's storing is basically is scroll up. It has a thing called evaluations. Literally you can pull everything, but the extracted data and only pull the evaluation side of it, which should be small enough. But, we all know how to do like

Dex (36:02.503)
Yeah. But I mean, if you have 500 million records, you, I mean, that's probably too high to be reasonable. Like that's the number of like.

Vaibhav Gupta (36:09.526)
No, but even with that, we know how to do pagination on databases. We know how to do like...

Dex (36:13.957)
Yeah, you can't do that in S3 though. Like, I agree. you need, that was kind of my question. Like, you need something that supports, like, slicing and filtering and pagination, right?

Vaibhav Gupta (36:21.566)
S3 does that too, like AWS has built a bunch of software on top of S3 that has all sorts of querying, pagination, S. I'm not saying you should use S3 necessarily. It's just a dip. You can solve this problem as another engineering problem rather than having to think about like saying I have a bunch of data that is somewhat structured and I want to query it with some aggregation is a well-defined problem that I'm certain Claude code consult.

Dex (36:46.085)
Okay, so ViBob thinks my question was boring.

Vaibhav Gupta (36:49.046)
Well, maybe not.

Kevin Gregory (36:50.162)
can tell you though, if I had 500 million records I would not be using a Streamlit app. No way.

Dex (36:52.231)
Like, would you put this in-

Dex (36:56.421)
Yeah, no, this I mean, like this feels like a really good you have either of you ever worked with parquet is basically like G zip JSON in s3. Yeah, okay. I'm sure people are already is there say what

Vaibhav Gupta (37:01.644)
Yeah, yeah, it would be great for pro gaming. This would be great for- or like LensDB or something? Or LensDB or something? This would be great for that.

Kevin Gregory (37:02.14)
Yeah, yeah.

Dex (37:11.557)
I don't know enough about LanceDB to comment, but...

Vaibhav Gupta (37:13.782)
Well, specific lens thing is really good for like multimodal datasets on top of it, which makes it really, cause it does like the one-off links to like, not saving in the actual data. Now I have one more question Kevin, what did change in this pipeline versus your previous pipelines you made? Were there any architectural changes you did have to make?

Dex (37:17.543)
Yeah, okay.

Dex (37:25.841)
I like this question.

Kevin Gregory (37:35.741)
The, I think the biggest one was in the previous pipeline. we had multiple checkpoints because that we had, I mean, I don't know how many people on the call were part of that, but it was a large scale classification pipeline where the first thing we did was we dumped a bunch of categories into an embedder to filter that down. And then we took just the top, however many categories and then dumped those into an LLM with the actual query. And then we get the final response. So we were able to check.

each one of those steps, kind of what's going in and out of each step and figure out where the problem is. Here it's kind of just a one shot, right? There's no break points or probes in order to check and see where things are kind of breaking down. It was one prompt. I guess you could kind of say with the different evals, there are all these kind of different little points, but still there's not the, it's not the same, I have multiple checkpoints here. I think that was probably the biggest one.

Vaibhav Gupta (38:32.716)
Got it. Got it. OK. So the fact it was like a structurally a different problem because you only had one checkpoint and no incremental progress along the way to measure. So you weren't analyzing multi-steps. were analyzing one. So I'm guessing your JSON shape did change to represent that. OK.

Kevin Gregory (38:39.79)
Mm-hmm. Mm-hmm. Yeah.

Kevin Gregory (38:49.207)
Definitely, yeah.

Dex (38:51.76)
And the last one, didn't you also have to hand label the data? Like there wasn't like an answer key for this stuff, right?

Kevin Gregory (38:56.294)
Yes. Yeah, I had to hand label the data. And last one, there was no real way to do, what is that? can think of runtime evals.

I remember reaching out to my family members and me and handling the data and say it was items in a hardware store and what basically categories they should fall into in the hardware store. Another thing that's interesting about the previous problem is that the previous problem had multiple right answers. That was something that we found that was really interesting in that previous one was, you know, like I don't remember any of the examples, but something such as

Dex (39:19.015)
That's right, you.

Kevin Gregory (39:34.685)
blanking, but like in an air conditioning filter could be an HVAC or it could be in an air conditioning exactly and those could be two different categories and so it was interesting last time as we went through the mistakes and we actually said hey these actually kind of are correct so instead of having one answer you have a set of right answers and we would check to see if our output was in that set here

Vaibhav Gupta (39:40.756)
and air conditioning.

Kevin Gregory (39:58.983)
there is a right answer, right? Like they paid a certain amount for whatever, know, whatever they ate. So that was a different kind of way to think about it as well.

Vaibhav Gupta (40:02.882)
you

Vaibhav Gupta (40:08.108)
That's actually interesting. Go ahead, Dexter.

Dex (40:08.71)
What did you, I was gonna say like, so what did you use this, we're getting a little short on time and there's one good question in the chat, but like, what did you use this for? Like, did you actually take the eval and then go back and try to improve the models and switching the models? Did you change up your prompt at all? Did you, were you able to use this to drive improvements in the extraction? Yeah, let's look at the prompts.

Kevin Gregory (40:25.641)
yeah, yeah.

Vaibhav Gupta (40:27.65)
What a short plot.

Kevin Gregory (40:30.426)
Yeah, yeah, I can show you. think, yeah. So here's the actual, here's the prompt that, that's not it. You can see I played around with extracting number of transactions, but I didn't end up needing it. Mm-hmm, exactly. Didn't end up needing it, because this worked so well. I this is the prompt, right? So each transaction or each item, this is what,

Vaibhav Gupta (40:41.378)
like as a pre-step.

Kevin Gregory (40:56.794)
You want for each item on the receipt and then all these receipt totals, right? And these didn't all like I didn't discover all these right out of the gate, right? Like we said before, rounding. Discount on total.

Kevin Gregory (41:15.957)
Those didn't, like I didn't have those right out of the gate. Those came from kind of iterating and experimenting.

Dex (41:23.91)
So you iterated the data structure and the prompt together because of this thing that like we do all the time on this show, which is like prompting through your output format, basically.

Kevin Gregory (41:28.455)
Yeah.

Kevin Gregory (41:33.509)
Right, and I mean, we can see here, if I go to, let's see, I think it is, yeah, it's this one. So if we load this, which, note, one of the biggest improvements I made was just switching to Gemini Flash. You can see I tried GPT-40, then Sonnet, and then Gemini 2.5 Flash, and you can see the difference it made just right there.

going from 4.0 to Gemini Flash almost made this, it only has one mistake. So if we look at the mistake, you can see it's here.

Kevin Gregory (42:11.334)
Surprise, surprise, it has a discount of 19,000. And I mean, now the discount, know, the discount's here because it's part of the data model now. But before, there was no discount. And so it was missing that discount amount. And you can see the difference is the 19,000, which is the discount. So it's like, so that's when I saw that and said, yeah, go ahead.

Vaibhav Gupta (42:26.86)
Got it.

Dex (42:31.878)
Okay, so you started with a small set of receipts. You figured out what can we learn about making the data model and the prompt better with that small set. And then once you got those pretty, pretty good and you said, even if one of these is failing, right, you can basically say like, okay, that one we're not gonna try to solve. Let's do a bigger data set. Let's see what other problems we hit. And so you built a tool that basically like when things are not passing, you can immediately dig in and use what you learned from the eval to go improve the prompt.

Vaibhav Gupta (42:34.757)
I love you.

Kevin Gregory (42:40.166)
Mm-hmm.

Kevin Gregory (42:59.47)
Exactly. And you can kind of see my journey just by looking at the named runs, right? So we're here at Gemini Flash. I added just a discount on total field. And then I noticed that there's some item discounts. It's like a percentage of the item. So then I added that. And that's pretty good. So I jumped up to 50 receipts, or 51, because I forgot it started at zero, whatever.

Dex (42:59.546)
Go find more corner cases. I love it.

Vaibhav Gupta (43:24.29)
Okay, then you have to retry it, logic.

Kevin Gregory (43:27.078)
retry because I was getting extractive failures and like fuck it like let's just do exponential retry and then that worked really well

Dex (43:31.846)
Can we see the receipts? Can we see the results from each of those? Like the 50 and then with the retry logic? Like I'd love to kind of just like see it progress over time. Just like the high level analysis. Yeah. Okay.

Kevin Gregory (43:36.028)
Yeah.

Sure.

Kevin Gregory (43:42.706)
So we load here. Yeah. So here. And then if I do the retry added, you can see the unit price accuracy. Yeah, it just got even better.

Dex (43:53.478)
It's even better.

Vaibhav Gupta (43:55.779)
Well, sure, yeah, because it's just like, sure, there's just some weird flakiness. Let's just like run it. Cool. Okay, go on.

Kevin Gregory (44:01.171)
Yeah, exactly. And then next one was same thing, but 100. And again, similar performance, it's doing well. And this is where you get to the point where, ViBob, this is the one we saw yesterday. And this is where we start looking at the mistakes. It's like, don't know how I would label this, right? These are the interesting ones, right? So if I come down here,

Dex (44:04.292)
And then what was the next one?

Kevin Gregory (44:29.426)
I mean, we'll just look at this one, difference of 3,000. Let's see if this is an interesting one or not.

Vaibhav Gupta (44:35.522)
And what's really interesting is like, clearly Kevin hasn't looked at the data on the fly. He's literally just looking at it right now and it's like, I see something is off by 3000. And like here I can see that it literally double counted the 3000 of the discount and the tax.

Kevin Gregory (44:43.857)
Mm-hmm.

Dex (44:51.526)
Wait, what's the discount?

Kevin Gregory (44:53.072)
Yeah.

Vaibhav Gupta (44:53.154)
It just added a $3,000 discount. I have no idea why.

Kevin Gregory (44:56.581)
yeah, you see that? Yeah.

Dex (44:56.835)
I'll be-

Vaibhav Gupta (44:59.636)
I don't know why I'm doing this.

Dex (44:59.861)
it thinks that's a-

Kevin Gregory (45:00.786)
Well, what's also interesting is like this.

Dex (45:04.72)
What are the 50,000 and the 17,000 underneath? that's the cash and change. Okay, okay, okay. Huh.

Vaibhav Gupta (45:07.266)
That's the class that they paid and then we got a class for it.

Kevin Gregory (45:07.324)
This is the catch and the change. Yeah. So here it double counted it. So I would probably iterate on the prompt on this one. But if we just look at a couple of others, like let's see. this, I think this is that discount one that I got confused on. Yep. There's that. Yeah. We we saw this one. Yeah.

Dex (45:18.8)
Maybe I thought it was. Yeah. OK.

Vaibhav Gupta (45:29.482)
I think what's really important here is I want everyone on the call to really quickly realize how fast we're looking at understanding this data. The key part here is understanding the problem. And I think someone in the question, someone in the chat asked that important question is like, isn't this stupid? Aren't we doing manual prompting? Should we do like an optimizer? And in theory, you could use an optimizer, but the real problem is the reason that we can't use an optimizer is because real world data is messy. You can optimize if you know exactly what you're optimizing on.

Kevin Gregory (45:40.497)
Yeah.

Vaibhav Gupta (45:58.721)
But we don't even know if it's correct, like if our evals are actually correctly defined. Like in the case of earlier in the chat, we talked about negative values. We did see correct negative values applied. And if we were optimizing on that failure, the prompt would be like, don't add negative values ever. But that doesn't actually mean that that's true. So while an optimizer can be useful, it's only so and so that it's useful once you understand the data.

Dex (46:22.745)
can overfit.

Vaibhav Gupta (46:24.598)
Like it will overfit for what you are telling it to optimize for. And if you don't have good definitions of the final outcome, you will lose. Like it won't.

Dex (46:33.817)
It would be cool to take this data set and run it through a prompt optimizer and see if it can improve the eval performance. That might be a fun, we don't have time to do it today, but I thought I'd like doing like a JEPA or like doing the like BAML DSPy like Frankenstein pipeline that someone's someone talked about.

Vaibhav Gupta (46:37.985)
Yeah.

Kevin Gregory (46:39.73)
That would be cool.

Vaibhav Gupta (46:51.404)
Yeah, I think it's really important, like fundamentally, regardless of what you use, it's really important that people look at the data. Like the tooling that you build around looking at the data, while it sounds stupid and silly and slow and arcane, this was actually the thing that'll help you speed this up. Cause the real thing you want to optimize is a data set of 10,000 receipts. You don't want to optimize on data set of a hundred receipts. And if you think about it, the best example that I think is very tangible for most people is actually self-driving. So when you work in the self-driving space,

There's tons of data of cars driving perfectly fine on a nice sunny day on empty highways. That data is completely useless to every self-driving car company out in the world. What I want to see is a car carrying three other cars on a tow truck that looks like a car headed towards your direction with a median that's completely in the middle of the road because it's broken. That is useful data. And it's the same thing in here. When I go and build like a prompt optimizer, what I really want to do is I want to find the data that is relevant.

Dex (47:42.265)
You

Vaibhav Gupta (47:50.124)
to then go build the optimizer on.

Like that's what is a real fundamental question. Like how do you find like the most odd data sets that are actually going to help me decide this? And then you can go ahead and build. What I would say is like, turn this into a golden data set and say, Hey, I found these weird edge cases. Let me go and define the perfect JSON for each of these data sets. This is exactly what the final output should be. And now go eval that against that for these specific, very small data sets that I have.

Kevin Gregory (47:55.516)
Yeah.

Kevin Gregory (48:13.106)
Mm-hmm.

Kevin Gregory (48:22.822)
And I think to your point, if I was, this isn't, we're doing this really quickly, right? Once you've done something like this before, right? Building it again for a different system is fast. And now we're iterating through it very, very quickly. Like this whole thing, understanding the problem space a lot better, you can do in half a day or a day tops. And then you're much better equipped to do what you're saying. And...

build your golden data set, build the right JSON, and then maybe do a prompt optimizer. But it doesn't take much time in order just to invest a little bit upfront, and then you'll have that to inform the decisions you make down the road.

Vaibhav Gupta (49:02.464)
Yeah, it's really about like, think it's really about like deep understanding of the problem and how much effort.

Dex (49:07.769)
And you want to lean. Yeah, I don't know if you want to keep talking about the optimizer thing, but like there's a question in the chat is like a human won't be able to find the best prompt manually. And I think like I want to I want to double down on sorry, what do you say?

Vaibhav Gupta (49:19.116)
yeah.

Vaibhav Gupta (49:22.645)
I must agree.

Dex (49:24.419)
Okay, it's like it's almost like it feels like it's like this this perfect world framing of it where you have access to infinite data every single potential thing that you might hit ahead of time. Then yes, like a prompt optimizer will do better. But I also think like, by under optimizing you lean into the like emergent capabilities and generative nature of these systems where it's like you don't know exactly what it's going to be capable of. And you're

you're better off prompting less and less specifically and having a good feedback loop like we've built here.

Vaibhav Gupta (49:59.192)
Well, you know what I would do here is like, let's say I shipping this in a product for actually making this like for like auto ingestion receipts on like Brex or like Banking app or like any sort of like FinOps application, like Concur or any sort of like receipt management system. What I would do is I would go ahead, if you look at the top level data set, can you go up Kevin?

Dex (50:08.261)
Yeah.

Kevin Gregory (50:21.554)
Vaibhav Gupta (50:22.741)
Yeah, like let's say I'm filing like reimbursement for my company analysis.

Kevin Gregory (50:27.814)
Yeah, this one. Yep.

Vaibhav Gupta (50:28.291)
What I would see here is like, look, what I want to ask myself is I want to ship a product. I don't actually care about hitting a hundred percent. Here's what I care about. I care about the user's problem being solved. The user's problem here is entering receipt data is fricking annoying and really hard. So here's what I would do. I would look at this data and be like, okay, cool. We're hitting a really high percentage success rate. Like it's mostly correct. What's the exact percentage here? Do you know what it is, Kevin? If you scroll up over grand total.

Kevin Gregory (50:43.058)
Mm-hmm.

Dex (50:56.495)
Yeah, if you can save me having to enter in a receipt. Yeah.

Kevin Gregory (50:57.026)
97.

Vaibhav Gupta (50:59.043)
Like three, 3 % failure rate. Like I'm at a 3 % failure rate, 99 % of the night, over 95 % of the time, I won't have to enter the receipt. What I would say is great. will ship this app, but because I have all these guarantees built into it, but I will do secondarily is into my UI UX. I will build a system that says something else, which is, I will say, I will flag that for the user and say, I found a mistake.

can you please double check every single entry manually? And I would literally force them to check, check, check, check, check every single thing in the UI to make sure they actually validate against the actual receipt. And now the system is 100 % correct.

Dex (51:41.151)
And yeah, it's about bridging that gap with human in the loop, right? As long as, if you're saving me, if I only have to do that one in 20 receipts, you're still saving me a shit ton of time. Because without the system, I would have have to do every single one of them.

Vaibhav Gupta (51:45.175)
Worm.

Kevin Gregory (51:52.132)
not only that, you would have had to manually enter it versus checking for accuracy. Huge difference.

Vaibhav Gupta (51:56.386)
Yes.

Dex (51:56.813)
Exactly. Yeah.

Vaibhav Gupta (51:58.82)
and only checking the ones that fail my checks, which is also a huge difference shift. like the burden just went from like uploading receipts being like a painful task that takes like a couple minutes to being something that takes 90 % of the time, one or two seconds, and then 10 % of the time takes 30 more seconds on top of that. So my burden is way less, but I could go even further. What I could do, we could build a second system here that says,

Kevin Gregory (52:01.287)
Yeah. Yeah.

Vaibhav Gupta (52:25.237)
the LM is actually going to be wrong. We'll assume that the model will be wrong. And then we'll build a second system on top of it that says whenever we get a grand total calculation error, we'll actually at tell the model, Hey, your error is wrong. Your grand total is completely wrong. Here's how much it's off by update the original data model to produce here's the original data model. Here's the error that you have re updated to go do that. And now we can run the grand total calculation again off of that error. So

not only building in the runtime checks as a, as like a thing I'm doing for evals, but actually building into the product and saying when it's wrong.

Dex (53:00.65)
as a just like self-correcting, like, hey, retry, cause there's an issue with this kind of thing and not even sending it to the human.

Vaibhav Gupta (53:06.455)
reach and here's the issue. And then if it, and I let that run up to three times. And if that fails the third time, I send it to the human. Or I might even show the human the UI and let the human know, Hey, I found an error. I'm working on fixing it. Give me, give me like a second and I'll fix it. And the human can basically then review, either review or not fix it. It's up to them. And that's kind of like a few other things that you can do here. And I think it's more about

Kevin Gregory (53:23.493)
Mm.

Vaibhav Gupta (53:35.907)
understand that evals are not purely about like offline evals, but how you can make them be online evals so that you don't have to prompt optimize and then end up with the perfect prompt. Cause if you can only ship your product when it's perfect, you will lose the battle of shipping.

Dex (53:50.127)
Yes, yes. That's a great takeaway. Kevin, you had one piece of advice to someone who wanted to build a system like this, what's the one or two biggest takeaways from your side?

Kevin Gregory (54:07.861)
Gemini, so the first one's Gemini flash is seems to be the best at OCR. So like it's notably better than Sonnet or 4.0. So just going from 4.0 right here, same prompt, same data model, everything to flash right away. Noticeably better. Yeah.

Vaibhav Gupta (54:28.867)
That's cool.

Kevin Gregory (54:31.074)
So that was the biggest thing that surprised me. And the second one, I mean, we've said it before, but it's, you gotta look at your data. won't, maybe to some people, the rounding, the discounts, the different taxes, maybe that would be obvious to some people, but particularly the discounts and the rounding weren't obvious to me. Even after I looked at some of the receipts initially, I still missed it. I didn't check 100, right? And so it took...

building this out and then looking at the errors and seeing like, okay, I understand what the error this is making. And, know, this is obviously gonna be present in a lot of receipts because these receipts just tend to have, you know, this data tends to have this feature. So it's looking at your data and there's no real magic way around that that I found. You have to understand the problem.

Vaibhav Gupta (55:20.373)
And what's really interesting about that is it's like changing the shape of your data isn't just like changing the prompt. It's actually about changing like the data model that your code is using around the system.

Dex (55:33.22)
Okay, question for you guys. Knowing what you know now, you don't have to name any names, but there's a lot of companies out there selling evals, either selling the problem of you must be doing evals or selling products that help you do evals so you can improve your stuff. What do you think about evals as a business?

Dex (55:57.036)
And you can no comment if you want to, but I'm curious seeing what we saw today and

Vaibhav Gupta (56:03.069)
Okay, I'll share my opinion really fast.

Dex (56:05.635)
Yeah.

Vaibhav Gupta (56:07.277)
There you go. Okay, in all honesty, I'll tell you at least my take on it. I think obviously everyone wants to make money doing something. And it's not like it's not valuable, but I think it's very similar to how front end works. You don't really buy front end. You can buy someone to build your front end. You can buy someone to host your front end.

Kevin Gregory (56:08.602)
Hahaha!

Dex (56:13.537)
Okay.

Vaibhav Gupta (56:36.311)
But you don't buy your UI components typically. The UI components are yours and your businesses. I think eval is very similar. You got to design the eval. Like the metric itself, anyone that's telling you is selling you a metric is scamming you because the metric is so domain specific, so problem specific that it doesn't really matter. And then everything else is just like harnesses to run stuff. So if you're going to, yeah, exactly.

Dex (57:01.507)
That's what Joshi just said. Aren't existing eval solutions mostly harnesses to run? I mean, I remember when Brian came on and he was talking about their decaying resolution memory and he was showing some of their code and he was like, hey, are you okay sharing kind of some of your closed source stuff? He's like, yeah, I can show you guys the code. That's okay. I will never show you guys the evals. The evals are the thing we keep super tight. And it's like, okay, yeah, that's actually the hard work of building the product is like developing over time.

In the same way he didn't want to outsource his memory system, he didn't want to outsource his eval system because it was really, really tailored to his product and his problems and his users.

Vaibhav Gupta (57:31.821)
Yeah.

Vaibhav Gupta (57:36.932)
Yeah. And I'm not saying there's not value in paying someone to run your evals for you. Um, but I'm also not saying there's like a necessary need and an urgent need to go do that either. Um, in my opinion, like what Kevin just did over here, this was like, clearly it take him that long. It did take him some design time and some system design time. And I guess if people use his source code and point it, point cloud code at this repo and say, Hey, design me an eval system works kind of like this or like chat with chat with

look at this code and help me think about how to design evals for my own system. Like what design system I can use there. I'm certain they could do it in maybe not three hours, but probably not one week either. It's probably like a one day process to go design this out. And like my, my thought process is like, just do that. And then if you decide that, Hey, this is, we're running evals on 500 million datasets and we need to run like an offloaded distributed system and we don't want to own that. Great.

Go pay for that. You're running like 500 receipts, just run on your stupid machine. it's like, AsyncIO is not gonna break on your system. If you wanna have a shared distributed system that everyone can see these results and you don't wanna go build that for your team, then just go do that. It's not gonna take you that long to go do that, but also pay someone for that. That's not a bad thing to have. Like building up this versioning system, if someone has designed it in a way that is really beautiful and good, like,

Vercell has done a great job at shipping front end UIs with staging environments on pull requests. Like all that stuff is really, really good in Vercell.

Dex (59:13.325)
That has nothing to do with writing front-end code, but it makes writing front-end code better.

Vaibhav Gupta (59:16.969)
Exactly. And you can build your own system for that, but like, I don't want to. I don't want to say like for a PR launch this preview URL. just.

Dex (59:23.479)
We built our own at Sprout. was incredibly valuable though. It was the most useful part of the dev platform at the whole company.

Vaibhav Gupta (59:31.159)
Yeah, but it's so much better just pay someone for it. and I think that's kind of what it comes down to. It's like, you got to pick the parts of your eval system that are actually useful. If you don't have like a hundred people looking at random evals results all the time, then you probably don't need this. I would just go ahead and straight just like host it and just send it over, like send over like a tail, what's a tail scale URL to your teammate and go do that.

produce a bunch of JSON files, can share over some, like check them into Git if you want. It doesn't really matter. And I think it's just about designing the system you want and like paying for it, I think can be useful, but it also isn't like a necessary thing that you have to do. E-Bells are necessary, paying for them or not.

Dex (01:00:18.755)
Okay. Amazing. This was super fun. Kevin, thank you so much for jumping on and sharing. I can't wait to, seems like about every six weeks you've gone and changed the rules of the game. So hope to have you back again soon. This is great. Bye Bob, any last thoughts?

Kevin Gregory (01:00:25.04)
Yeah, absolutely. Thanks for having me. This was great.

Kevin Gregory (01:00:34.822)
Yeah, that'd be great.

Vaibhav Gupta (01:00:34.943)
And all the code is already on GitHub, I guess.

Kevin Gregory (01:00:40.488)
I haven't pushed it yet, but I'll do that.

Vaibhav Gupta (01:00:42.531)
Push it, make the PR, we'll merge it in. I guess for everyone else that's still listening, this is A.I. That Works. If you guys are interested in this kind of concept and you like seeing this kind of content, come check out the subscription over here or check out the YouTube. We'll usually post the videos one week afterwards. Really appreciate this time with Dex and obviously Kevin for making up the time. It's been always a wild ride and thank you everyone for joining the chat as well.

Kevin Gregory (01:00:45.009)
We'll do.

Dex (01:01:09.699)
Fellas, thanks everybody.

Kevin Gregory (01:01:10.012)
Thanks.

Vaibhav Gupta (01:01:12.333)
Bye everyone.

Dex (01:01:22.605)
No, stop the stream. It's still live.

Alright, you're just gonna leave me hanging out in here?

Vaibhav Gupta (01:01:33.659)
Okay, I have to stop.
