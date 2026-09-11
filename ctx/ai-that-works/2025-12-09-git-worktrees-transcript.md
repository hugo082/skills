Vaibhav (00:01.459)
Alright, hello hello hello, we are back. It looks like we are back to our regular show. Welcome back Dexter, good to see you again. This is AI.

Dex (00:04.302)
We made it.

Dex (00:14.634)
Very excited to be here. It's gonna be a fun time. We got some good content teed up for you. We got the audience trickling in ready to rock. I'm very excited.

Vaibhav (00:27.121)
Indeed. And then the other thing I'm seeing is apparently our Discord time zone is wrong for the event. So let's get that set up and correct so it notifies people correctly. So thank you for that. But for those of that don't know, I'm ViBov. I work on BAML. This is my cohost, Dexter. He works on Codelayer. And it is a very cool agent development tool. Through that, I think there's something that I am personally very...

Dex (00:46.574)
code layer.

Dex (00:50.23)
and BAML is the best way to build AI agents.

Vaibhav (00:56.587)
keen on learning today and this is kind of where we got this idea from which is Git work trees. I'll be honest I have been coding for a while and until this year while I have been told about Git work trees I have found it much easier to just clone the repo again and just do that every single time over Git work trees. It sounds like I should probably not be doing that and I should probably be using Git work trees probably because of disk issues. So

I feel there's no better way than to get Dexter who has been talking about Get Workreaks for so long to come out, the very least educate me and maybe some of you will learn some of this stuff as well along the way.

Dex (01:37.816)
Amazing. Yeah, I mean, people have been talking about work trees for basically since like the weak Claude code came out, people have been messing with work trees to be able to paralyze stuff. And there's a lot of tools and products that kind of manage work trees for you. That's very exciting. But what I have found is that it's one of those things like most things with Git where

It feels completely terrifying and arcane and you don't want to learn it. this was my first, my first job, we didn't even use Git. We used Mercurial and we used Mercurial for like nine months until we started hiring a lot of engineers and the new people just like basically rioted. They were just like, we are not using Mercurial. You must learn Git. And so I had to learn Git was like the third version control system I learned because at UChicago, guess the guy who invented Subversion was a guy, was at UChicago for a while. Yeah.

Vaibhav (02:33.159)
my god, hate this. Perforce. Perforce is another... my god.

Dex (02:36.385)
So we had to use Subversion for a while. So we're gonna talk about a little bit of workflow. And basically at the end of the day, it's gonna be a, we're do some like advanced stuff that I don't necessarily recommend, but it's open source code that you can go grab and you can use to really go deep and explore this stuff. We're also gonna talk a little bit about a tool called TMUX that I'm sure many people have figured out about. I am not a TMUX expert, but.

Vaibhav (02:58.164)
my god, I'm scared.

Dex (03:03.383)
through the power of Claude, have gotten Claude to set up TMUX exactly how I want it. It's a nice thing of these, yeah.

Vaibhav (03:08.863)
So before we into that, let's just talk about what is a Git work tree semantically. I think I'll describe the silly way that I understand it and correct it if it's wrong. The silly way I've understood it is a Git work tree is basically, it kind of clones my repo using a symlink, so using almost zero additional disk space for my entire repo. And every single time I modify a file in that directory, it

creates only a duplicate of just that file and nothing else.

Dex (03:42.19)
Okay, yeah, that's maybe 30 or 40 % right. Like from your experience side, I'm gonna start with just like a quick little demo and then we'll deal with under the hood what it actually looks like. So I have here cloned just a random repo app off the web. This is something called OpenCode, which is an open source coding agent that we've been exploring a little bit lately. Very cool team, very interesting stuff. But.

Vaibhav (03:50.059)
Okay, so.

Dex (04:09.473)
So I can do, I'm gonna try, I'm gonna use a lot of Git aliases, so just call me out if I end up using aliases. But I can check out a new branch and I can say, you know, like dex feature, right? And then I can say, hey Claude, you know, translate the server to go from TypeScript. This is a dumb thing. Never tell a coding agent to do big work like this in one go, but this is just an example here.

and I am as usual using TMUX here, but I'm just gonna do multiple panes here. I'm in open code. If I say Claude, translate the client, translate the, I don't know, translate the client to Elixir, whatever. You could put both these Claudes in here and like these ones are probably making new codes so they won't conflict, but like you really don't want to run.

Vaibhav (04:57.855)
Yeah.

Dex (05:09.057)
two clods in the same repo at the same time or codex or whatever it is, right? Like they're gonna step on each other's toes. They're both gonna be doing different things. You can imagine lots of ways this could go wrong, right?

Vaibhav (05:18.985)
Like in our Rust code base, for example, you end up grabbing the same cargo lock, and that makes your build time for both agents way slower.

Dex (05:27.326)
interesting. I didn't think, see, I don't even know about rust builds.

Vaibhav (05:28.299)
Yeah, because you're only able have one into the cargo build. You can only run cargo build once in the project at once. And like, it's just, it becomes unworkable effectively.

Dex (05:38.966)
Yeah, that makes sense. That's cool. Well, I'm excited to show you this. We'll get into, I grabbed this picture of the Git object database and how it works, but we're going to start with like, so like the very naive version is going to be basically you have, you know, open code repo and then you have, you know, open code dash two. So what I can do is I can say cd dot dot git clone.

Open code to this is kind of the naive version of what you were talking about, right? Where I can have two copies of the same repo checked out. And so I can work in one, I can work in the other one. And if they're kind of unrelated features, so it's like, you know, feature one move server to go feature to move client to, to, to elixir.

Dex (06:34.957)
Then I can have two get repos and just like I normally would I can push these both up. my god the elbow macaroni

I can push these both up to my remote origin or upstream or whatever it is, right? These all live in GitHub.

Vaibhav (06:51.051)
Yeah, yep. that's, and if you go look in my home directory, you will see BAML one, BAML two, BAML three, BAML four, and BAML, which is the original version I had of it. Cause this is what I do most of the time.

Dex (06:58.548)
Ha

Dex (07:02.725)
Yeah. Yeah. And so like one thing you could do, I mean, the actual for a big repos, my repo is not that big. So I don't, I'm just going to answer the questions here. Let this thing keep working. Actually, I'm going to control see this because we've kind of made the point for a big repo. You actually have to clone the whole thing all over again. And so this has like taken a sec. I'm sure the bamboo code is you have 300,000 lines of code, plus a bunch of random things that aren't images for testing and all that.

Vaibhav (07:29.248)
Yep.

Dex (07:31.181)
So cloning this stuff from scratch is bad. You could do, know, I could git clone and I could say open code and it's also like hard to keep straight, right? You have one, two, three, four, like how do you keep track of which one is doing which?

Vaibhav (07:45.194)
Yeah.

I run into that problem all the time.

Dex (07:50.422)
Yeah, so maybe you make one that is like open code, know, client elixir, but then you have to like reclone the repo every single time that you wanna do a new feature. And so what Git Worktrees let you do is...

Dex (08:10.199)
So you can check out a new brand. let me go into our open code too. Actually, I'm just going to remove the open code. Well, so the other, the other, yeah.

Vaibhav (08:17.003)
So we can do branches, we can do a couple other things. And I think, let's assume that people know about branches and multiple clones. Why do I care about Git work trees? Why does this really matter? What is the benefit I'm gaining?

Dex (08:30.827)
Yeah, what we do, so yeah, so you can do this, can have branches, you can have two separate repos. The biggest challenge here is like, so the challenges are have to reclone for every new feature or have, you know, dash one, dash two, dash three, dash four, and keep it straight in your head, which one is which.

Vaibhav (08:45.289)
Yep, you gotta reclone everything.

Dex (08:58.401)
which, if you have a fancy CLI that tells you what branch you're on, then maybe that's a little easy, because as soon as you see the end of the directory, you know the thing you were working on. But what's cool is you can do git work tree. Basically, what the work tree is going to do is it's going to give you basically just so in your git repo, right, there's this whole object database and it has like every single version of every single file. And then the tree is just pointers to specific versions of those files.

Vaibhav (09:27.156)
Yep.

Dex (09:27.169)
So we'll link this article that like walks you through every single version of all of this. But basically in your, in your like backup branch, you would have, you know, the same file test.txt with a new version and it's stored over here. And when you do work trees, you actually have, creates a view of the, of the, of the repo. in here, let's say you have branch like client elixir.

and you have another branch in this repo called server go, right? When you create a work tree, you basically create something at some path, right? So it could be like dot dot slash open code server go that is a view of, say what?

Vaibhav (10:09.193)
And the work tree. Can you name it? Open code server go dash work tree just so it's a little bit more clear. Yeah.

Dex (10:18.252)
So you get a copy of this repo checked out to that branch and they both still share the same Git object database.

Vaibhav (10:28.947)
Okay, so like the file is the same. The got get folder is basically the same folder. The thing that tells them the structure of the code.

Dex (10:29.162)
They share all of

Dex (10:35.466)
Yeah, exactly. Exactly, structure the code, the database. If you have configuration of what your remotes are, so if I jump into human layer, I have a ton of remotes here. If I do, and we have a script here that is like...

Vaibhav (10:52.437)
But you have a ton of remote. Your work tree basically has all of that.

Dex (10:52.78)
Create WorkTree. You can write scripts around this. But I have a ton of remotes here.

Yeah, and... You're good.

Vaibhav (10:59.083)
So, go ahead. So really quickly, it sounds like we got a question that might be relevant to a couple of people, which is like, how is this different than making a new feature branch? So I think the biggest question that really is answered, what we're talking about here is that the problem with feature branches in a single repo is I can't actually run things in parallel on the branch. Because at any given point, I can only have one branch of that repo active in a certain directory. Because if I check out to a different branch, all my code changes.

in that directory and it's suddenly no longer the same code that I want it to be. On the other hand, if I do multiple clones, then I have this other problem of like, one, I can't share code also very easily, but also my disk space and everything gets really crazy in terms of keeping main sync for all of them all the time. Like I run into this problem all the time.

Dex (11:46.519)
So there is a challenge there, which is like, you have node modules or dependencies that get stored in the repo, you're actually going to end up with like a hundred copies of node modules. And I've actually like had to go clean up all my work trees. If you don't clean them up, you will end up with a bunch of garbage scattered around.

Vaibhav (11:53.45)
I

Yes.

Vaibhav (12:02.175)
Well, you run into that problem no matter what, whether you have multiple clones or anything else. With branches you don't, but that's because you only have one view of the branch at any time. You lose parallelization with branches. Lon, let me know if that answers the question about new feature branch versus recloning. It's about running things in parallel.

Dex (12:10.976)
Yeah, so.

Anyways, love it.

Dex (12:22.752)
Yeah, so I have my open, so now I have my open code repo, which is on the server go branch. And then I have the client Elixir branch checked out here. Some interesting things that happen when you do this. So here's the same repo. And so I have all the same branches. If I haven't pushed them up locally.

Vaibhav (12:43.573)
Get branch.

Dex (12:45.036)
There you go. So now I can see all of this stuff and I can actually like, so this thing is starting to work.

If I make changes in one work tree.

I can merge things. I'm in a different path. If I had checked out two copies of the repo, they would have separate object databases and my work tree would not be able to see the changes and commits on other branches in the other folder. And so that's where things get really, start to get really interesting and powerful because from my main branch, usually what I'll end up doing for a lot of this stuff is I will actually create a like,

I will create like, I will have the main thing checked out to dev or maybe something like feature work. And then I will have multiple work trees for each thing that I'm working on. And so this is like, you know, open code and one, two, three, four. And this is like checked out to the end one, two, three, four branch. I'll call it server go.

Vaibhav (13:31.275)
you

Dex (13:45.568)
And then I'll have another work tree that is, know, client elixir.

Dex (13:53.739)
And so from here, you can see both of them. And you can still, from each of these work trees, you can push because it's configured with all the remotes and everything. You can push and pull from upstream, from GitHub and whatever it is, but you can also pull these things in. And so if you want to do small tasks in parallel that are part of a larger PR, this is like a really clean way to do this.

Vaibhav (14:14.559)
That's interesting. That's actually not a, I've struggled with this right now. And the way I do it right now is I literally just do branches. just, I decide I'm not paralyzing this work. That's just what I've concluded for my life. I just don't have this option. And the fact, and like the way that I would normally do this is I have branches and different repos and I basically push them or remote those branches. I pull from remote to get the work. But the fact that I can do is work work trees and I can just have it run locally and not have to do pushing.

One means that I bet I can do this much faster. And two, I can localize things and not have like pollute my Git branches that I pushed to remote a lot more. And I can just do, I can kind of, it's kind of like the promise of JJ, which is a new thing I've been hearing about, but with parallelism. And it gives you some of the premises of JJ without having to think about learning something totally new from Git.

Dex (15:01.814)
Yeah.

Dex (15:12.074)
Yeah. So some weird limitations of this is when you create the new folder, it only has the git branch. So you need to basically have like the things you need for a good like work tree setup.

Vaibhav (15:17.259)
you

Dex (15:27.302)
is you need to be able to do things like, if you have a .en file, copy .en to the work tree. And I think Theo did a video recently where he was showing his AI coding workflow and he shows his work tree setup step. You may need to do something like npm install or whatever setup you need to do in that repo, because anything that is not version controlled is not gonna make it into the work tree. And so you do this manual copying stuff. What we usually do is we just have all of our repos have a make setup command.

so that the repo can define how to do this. And we can use like a generic script, like, you know, create work tree, which like will actually create the work tree. And then it will like run make setup in the work tree and maybe copy some stuff. like the make setup does the install and then it's like copy some files. So another thing in Claude, you know, you have your, probably not in here.

you have your settings.json, right? Which is the thing that gets committed and shared with your team and is supposed to be kind of like very high level stuff that everybody should do. But then you also have your settings.local.json, which are your like personal preferences on all the things that you're willing to allow the model to do, other directories you want to give it access to and things like this. And so this is explicitly get ignored. And so when we create a work tree, one of the things in our create work tree script is basically, and this is open source, you can go grab this, we'll link to it.

But the first thing we do is like, will, let's see, where is it? So we copy the whole cloud directory and then we set up the dependencies with the, like, with the, make setup task. And if make setup fails, then it like automatically cleans up the work tree for you. We have this thoughts thing that needs to be in every work tree for you, my Bob, maybe it would be like, you know, initializing or linking in your obsidian vault that you use for plans.

Vaibhav (17:14.571)
We have a script called setupdev.sh which helps open source computers set up for BAML. But it's also the first command you run when you clone the repo. So it's the same thing. If you don't have a single script to run to set up your work tree, you will fail using git work tree. That's my experience.

Dex (17:33.77)
Yeah.

Dex (17:39.244)
Yep. So I'm actually going to stop this one because I want to show you kind of like a more advanced and like funky thing you can do with this, that it takes advantage of the fact that you're sharing to get work trees. So I'm going to, one, one, a weird thing here is that like on your main branch, you cannot then check out this branch here. This is like a limitation or perhaps a feature of the work tree system. You cannot have the same branch checked out into directories because like if you write over here,

Vaibhav (17:59.559)
Dex (18:07.339)
like you need to update the files that are over here. Yeah, you don't. Yeah, or like an NFS style thing. So if I try to get checkout client elixir, I'm going to get an error here that is like it's already in use at this work tree. So not really a blocker forces you to think about things in a little bit of a structured way, but just something to be aware

Vaibhav (18:07.945)
Yeah, it's race. Yeah, it's a race condition problem.

Vaibhav (18:22.697)
Yeah.

Vaibhav (18:30.347)
That's interesting.

Dex (18:31.915)
So what I'm gonna do is I'm actually going to, I'm gonna add a new work tree. So I'm gonna have one for the client elixir and I'm gonna get rid of the dash B since our server go branch already exists.

Vaibhav (18:57.995)
So I think if you, while you set this up, if you ask about things like how we do get ignored files, hopefully we answer the question on that, which is you just have to reset them up every single time. like node modules has to be reinstalled. There's no real shortcut to not duplicating the space. I guess you could do npm install-g. Please don't do that, but you could. I guess that would save space. think.

Dex (18:58.987)
The syntax here is fun.

Vaibhav (19:24.981)
Some of the package managers or other languages automatically prevent you from installing multiple versions of it. And that should help. Python, virtualM and like UV should help with some of that stuff as well because they don't do multiple clones of the same versions of stuff. Another question that I got I think is very interesting is, do you all run agents in parallel often? I found that for most brownfield tasks, things run fast enough and I end up doing things synchronously anyway.

Dex (19:51.852)
Yeah, it's less about like paralyzing, like I'm gonna blast both, you know, I'm gonna blast six clods in parallel and try to keep an eye on all of them. I will show you a demo of what that might look like, but my max is usually two. It's more like I'm gonna kick something off in this work tree and I might come back to it tomorrow. You know what I mean? It's a way to keep the work in separate places where I can go pick it up and I know that directory is set up and ready to go.

Vaibhav (20:11.731)
I think it's just a matter of like-

Vaibhav (20:21.417)
Yeah, I think like the other advantage that people don't think about WorkTrees is that the fact that you can name the WorkTrees is a huge advantage because every time I clone my repo, I don't rename the folder. I just have BAML 1, 2, 3, 4. And I have to every single time remember what BAML 4 is versus BAML 1 and BAML 2. And it changes all the time because I'm constantly doing different work in all of them because the work eventually gets done and I move on to the next thing. With Git WorkTrees, it's just...

It's like easier for me to semantically understand the work every single time and I kind of finish it. So typically I think before I did Git work trees, it was very rare that I used to work on features in parallel. What I used to do is I had my one main task that I was worked on and then I had like bugs that I was fixing occasionally every now and then. So having BAML as my main work task and BAML one, two, three, four was okay. Cause I just deal with only bugs in those problems that I never had to remember.

Dex (21:16.927)
you would just kick off little things there.

Vaibhav (21:18.985)
Yeah, I never worked on like two big things in the same time span generally. But now I do work on multiple big things at the same time. And what that means is it is incredibly useful. I can see it being incredibly useful to wanting to have access to be able to understand my, like almost remind myself to context much faster.

Dex (21:42.399)
Yeah. So I'm going to.

Vaibhav (21:43.317)
So you've been running a project, tell us what's been running in the meanwhile.

Dex (21:46.762)
Yeah, so I have set up my two work trees as we have in here and I basically said translate the server to go commit after every file change because what we're gonna do here is I'm gonna go back to my main branch and I'm gonna start a new worker. This is like the fancy thing that people were doing that was super impressive which is like while true, sleep 60, then check the commits of branches.

server go and client elixir and merge them into this branch, resolving any conflicts.

Vaibhav (22:28.331)
Cool. Yeah, I can see why this would work.

Dex (22:28.683)
do this in a loop forever. And so like changing the client and the server and translating them to like new packages is probably not gonna have a lot of conflicts. But if you're working on something like a web app and you wanna change three different things on a page and you wanna not have to go merge them manually or you wanna have Claude merge them manually, you can literally just kick this off and all your agents will work until they're actually ready to go.

Vaibhav (22:54.687)
That's really cool. And what's really funny is we literally just got a question about this. When you run agents in parallel, you also want to run an agent to audit the outputs of other agents and trigger rerun. Literally why you asked that question just happened is what Dexter, but Dexter took it one step further, not just auditing, but pulling it into main branch. And you can do all sorts of runs here. It's like, for example, we have, we have rules in our git commit pre-commit hooks that we set up that require test the past as a pre-commit hook.

Dex (23:06.069)
Yes. Yeah.

Vaibhav (23:22.793)
And you can imagine that normally you might not want that because precommit might be really slow, but in a Git work tree, that's purely an agentic work tree. You might want to mandate that. So then every, the watcher branch is basically being guaranteed that stuff is being merged as stable every single time. now exactly. And now it's easier for it to kind of automate it. And I these are the steps of automation up here. It's like, and you could never do this without Git work trees. It's actually like virtually impossible.

Dex (23:32.682)
Yeah.

Dex (23:41.277)
as it comes in.

Dex (23:52.374)
Well kids, can't merge across them. Yeah, you'd have to basically like copy the files by hand and like CD into the other directory. But from here, I can run a git command from my main branch and I can see the status and the diffs on the other branches.

Vaibhav (24:04.691)
Yeah, so I've got a, this is really cool. And I look at this and I'm kind of inspired, but I don't actually know if I'm going to go do this today right after this while I'm Why tell me why I should stop and actually try this really well. It looks powerful. Tell me why I should actually stop and spend some of my time learning this. I'm super busy. How do I justify this?

Dex (24:32.007)
If you don't need this, you probably shouldn't use it. This is sort of like, again, like we use this in our workflow all the time because we tend to do certain, basically like I have the main branch and I'm constantly building shit and I'm constantly tweaking shit on the main, I'm like fixing problems, fixing workflows, whatever it is. Like I want this to get in eventually to be able to like, it's almost like get stashed on steroids.

Vaibhav (24:50.954)
Yeah.

Dex (24:59.209)
because it's like, it's not just, have to go remember where I stashed that thing or I have to remember what branch that was on. I can literally like commit the thing to a branch and move it over. This one's cool by the way. So it did find the commit on the Elixir branch and then it like merged the stuff in.

Vaibhav (25:08.991)
So.

Vaibhav (25:17.035)
That's cool. I mean, I it's really cool to be honest. it is. I look at this, I'm like, I, so I was just working on a problem where in our CFFI layer, so like the layer that translates BAML to existing languages, I found a type system bug for like some weird obscure types. And while fixing that problem, I really genuinely do wish I had a work tree where I could work on Python TypeScript and go all separately and have it go execute all of them in parallel.

Dex (25:19.09)
yeah.

Vaibhav (25:45.535)
while being able to pull relevant findings from all the other ones, that would have been great. But.

Dex (25:46.09)
Yup.

Dex (25:49.578)
Yeah, and you can do this recursively, right? So if you're in a work tree and you find an issue, you can create more work trees from that work tree and you can kind of fan them out and like send Claude sessions. And I do want to save, have about, I have one more demo if you want to just like kind of have this all done for you. I hacked together this thing back in May that you can mess with that a bunch of people are randomly still using, but okay. So I have this work trees thing.

Vaibhav (26:10.291)
Okay, tell us, tell us.

Dex (26:16.835)
I built this dumb little tool called MultiClawed. It's integrated with, so you've seen I'm using TMUX to do all sorts of random stuff to do multiplexing and just be able to manage multiple different shells. TMUX is...

Vaibhav (26:30.729)
I can't do that because I'm so overwhelmed by a one-shot window. But I'm a pleb that uses VS Code terminals.

Dex (26:34.955)
So

So, TMUX is infinitely hackable. So, I'm not an expert on the syntax, but I can say, read the contents of the three panes in, let's see, it's the HL session, and I'll rename this.

Dex (26:57.927)
in the HL session in the Claude stuff window with TMUX. And so what you can actually do is you can programmatically go fetch the content that's on the screen of another terminal.

Vaibhav (27:15.007)
Huh?

Dex (27:16.821)
So this thing can actually, it can list the pain so it sees these things and then it can capture the pain. And so you can actually see what was output here. This is the content of the screen for this other agent. And so you can actually prompt Claude to monitor the terminal of another Claude session.

Vaibhav (27:31.871)
That's another technical view of the

Vaibhav (27:37.343)
That's cool.

Dex (27:39.307)
And so they're like really fancy thing that we built here is okay. So this I'm going to close this one out. There's a thing called multi-clawed, which basically just like bundles this all up for you. Like I said, like don't over-paralyze cause all your prod, your progress is going to go way down. This predates a lot of stuff in terms of sub agents and all kinds of stuff, but you can run a multi-clawed init to install some like prompts into a repo.

and then we'll put this Claude stage MD into Claude.MD. And then I can say Claude and I can say like, you are the manager agent, launch two sub agents, one to translate the server to pick a language.

Vaibhav (28:25.643)
go

Dex (28:27.888)
OCaml and another to translate the client to Common Lisp.

Vaibhav (28:35.221)
my god, die.

Dex (28:36.33)
And so in this project, there's like these, like, I don't know, we put these as personas basically. I think it's in here. Yeah. So there's the agent manager. And so it's like, here's how to launch work trees. And we basically just wrapped some of the work tree and TMUX stuff with all of this. And so this has prompts on like how to list the windows and how to check what's on the branches and how to like attach to a...

like attach you to watch a specific agents work and all this stuff. So this is just like the very basic like do it all for this thing that I just did manually on this other screen of like launching these two things and then like manually prompting this one to sit in a work in a loop and like merge all this stuff is there's you can.

Vaibhav (29:22.571)
And the obvious trade-off here is that the more you automate and the less you look into it, the more likely it might deviate away from what you want. But the more you automate, the more work you might get done if it does the right thing.

Dex (29:37.075)
If you get lucky, it's kind of like walking around the Vegas casino and putting a coin in every single slot machine. Exactly. Exactly. And so what this is going to do is actually like, create a plan file. These are, this is before human layer got really into like the best way to create the best plan files. So these are not super sophisticated plans, but it kind of gives it some basic stuff and it says, Hey, let's translate all this stuff.

Vaibhav (29:40.939)
just like slot slot slot slot

Vaibhav (30:04.287)
That's really cool. okay. I want a really quick brain jump. How many new commands do I have to learn? Because if I have to learn too many commands, it is not going to work for me.

Dex (30:14.836)
So if you don't want to do the TMUX stuff, it's literally like one command. Yeah.

Vaibhav (30:18.059)
Let's not do the TMUX stuff. Just teach me, just teach me, teach me Git work tree. All I want to do is I want to learn how to do the Git work tree command. What should I do? Obviously I can tell prompt Claude to do it. It seems like it'll probably do it, but it's a lot easier for me to tell Claude to Git commit and push because I know what those commands do and I can trust it. If I was a non-engineer and I, someone told me to tell Claude to Git commit push, I'd be like, what the heck does that mean? So I got to understand it a little bit. So how hard is it?

Dex (30:43.124)
Yeah. Yeah. Yeah. So it's literally one command. So it's git work tree add, you know, client OCaml two. And then you just say, what's the new branch name? There's also a way to check out an existing branch, but I don't feel like watching, having you guys watch me live debug the syntax.

Vaibhav (31:00.19)
Okay.

Dex (31:07.476)
So you tell it what's the new branch name you want, and then you want to tell it what path do you want it in.

Vaibhav (31:12.339)
Okay, got it. So I...

Dex (31:13.994)
So I see the dot dot slash open code OCaml and then I can see everything. So since this was forked off the main one, I can see all the other branches. my God. So I have a bunch of aliases here. So I can see the server go, the server go to client elixir. It's showing me which ones have new changes. So I can get merge, you know, client elixir from here and it's now here. And I can still get push origin. I can still do all of this stuff.

Vaibhav (31:38.313)
Got it. Okay, so it's really just git workree add dash B branch name followed by directory name. So given that, can probably tell Cloud Code to do this and it'll be fine. I feel comfortable now. The anxiety that I had about learning git workree just went away because it's just one command. And I think the way that you can...

Dex (31:42.174)
Yep.

Dex (31:48.841)
Yes.

Dex (31:57.107)
And what you'll probably end up doing is you'll end up with a script for create work tree and clean up work tree, which is like, this is actually like more complicated than it needs to be, but like Claude can one shot this bash script and then you can explain what sorts of setup things you want and how you want that to work. And then every one of your team can use the same script.

Vaibhav (32:17.097)
Yeah, exactly. And you just give it like a name of the work tree and it kind of just does it. That's cool. So.

Dex (32:21.128)
Yeah, and so we have some conventions like, all of your work trees are gonna end up in, know, all of mine are in like tilde slash work tree slash repo name slash branch name. And like, you just figure out, it's more like bring the opinions on how you want to organize it. That's actually the hard part. Cause otherwise, like if I CD dot dot now my like folder with all of my like.

Vaibhav (32:31.518)
Exactly,

Dex (32:45.354)
repos in it has all these like random things and some of these are like the root repos and some of them are clones of the other repo and some of them are work trees so like make spend five minutes thinking about how you want to organize it and then iterate on that and that's basically all you need to do.

Vaibhav (33:01.641)
The branch convention that we've been using in our team is like person's name slash feature name. And I like that a lot because branches get shared a lot. So it's just easier to remember who did what. We also have a tendency to put dates on branches sometimes because some features get a lot of branches because they're complicated and it's better than having a naming the feature graphs one, graphs two, graphs three, graphs four. You're just like trying to name it something a little bit more semantic so you can remember something about it.

Dex (33:32.202)
Yeah. And so there's a lot of tools too. I mean, we should talk about tools like Vibe Kanban, tools like Conductor, tools like the new Cloud Desktop UI that manage work trees for you. My take has always been like, they do an incredible job of taking this like fairly complex, like Git is already scary to most people who want to get started with coding and work trees is like yet another layer of scary. And so they do a very good job of hiding that from you.

Vaibhav (33:32.745)
Impossible.

Dex (34:00.83)
The reason why we still haven't prioritized, like for example, adding WorkTree support to code layer is one for me is like, we're really targeting like developers who already know how Git works and have opinions and stuff. And so like, rather than hiding all that from you in a UI, it's like, okay, you're handy with Git and you can spend 20 minutes and learn WorkTrees. We'd rather solve other kind of categories of problems, but.

The opinions there are really interesting. So like I recommend playing with all of these tools and seeing what they do as far as where they put the work trees, how they life cycle them, what the interface, you if you look at a tool like Vibe Kanban, you can go and see like when you set up a new project. Actually, I can just show you this. Should we just look at that real quick?

Vaibhav (34:44.363)
Go for was going to show, I actually was going to show something kind of silly almost.

Dex (34:49.482)
All right, show your thing. Go play with the other things too. We'll link to all the tools that kind of do this for you, because it can help you kind of, if you just adopt their, if you don't know what opinions to have, you can adopt their opinions and you'll probably be okay.

Vaibhav (35:01.515)
Like I'll tell you the biggest problem that I've been having right now with using some of these tools. So I'm going to screen share my whole screen. As always, if we share something that you're not supposed to see, please tell us so we can delete it out of the recording at the very least. But part of doing this is, so I like trying every type of coding agent out there at all times. I tried anti-gravity as well. Just see what it feels like.

Dex (35:06.546)
Yeah. Yep.

Dex (35:25.172)
We just, you know, I think we still just see the Riverside recording, not, I don't know what you're trying to share.

Vaibhav (35:29.951)
Let me share. That is so weird. I hate technology.

I will screen share my entire screen and you will hopefully see this. Okay, cool. So one of the most annoying things that I've had actually about work trees is this crap where like my report is getting like polluted at all times. like, I, I am a power user of this view in cursor or VS code or any editing tool that I want to dip you. Cause what I want to do whenever a coding agent is working and this is my workflow.

Dex (35:46.665)
I'd say.

Dex (35:51.198)
Ha ha ha ha.

Dex (36:01.031)
the diff view here.

Vaibhav (36:06.973)
is every single time stuff happens and I reach a good checkpoint, I literally just stage everything. I'm like, cool, I'm going to stage here. I don't come at the stage and I, and then I let it go rip again, because then it allows me to really easily see what has changed since the last time that it was at what I semantically described to be a good point. And the.

Dex (36:23.431)
You actually looked at it, you skimmed the code, you maybe even ran a CLI command to check that it works.

Vaibhav (36:28.263)
Or I've read enough of it to feel good about the code. That's the best way. I don't want to authoritatively say I've read all the code because that's not true.

Dex (36:31.805)
Yeah. You're like.

Yeah, it's not about getting it perfect. It's like keeping it within 10 % of like, if this ends up being wrong later, I am confident I can like vibe my way or manually fix my way

Vaibhav (36:45.821)
or just like revert everything here and start from scratch from the last checkpoint I was at, which is, which is often multiple cursor prompts or like chat prompts or code layer prompts. And I can't always revert all the code that happened since the last time. So I just need a manual way to do this. Well, the problem I have with this is this crap down here for every single work tree is absurdly unusable. I literally can't do anything with this. And the reason that this happens is because one of the new things I've been doing

Dex (36:50.281)
Yeah, cool.

Vaibhav (37:14.217)
is every single time, and this is how I actually first learned about Git Worksheets and why I so excited for you to talk to me about this, is every single time I have a new problem, I actually just ask these coding agents and everything to just run. I guess this one doesn't have it. Where'd go?

Dex (37:26.665)
You just do new work tree, go see if the agent can one-shot it.

Vaibhav (37:30.995)
No, that's actually not what I do. When I request a task, literally just click like multiple models. I just run the same thing on like five different models at once. And that is just.

Dex (37:38.771)
I you. I got you. Okay, so you're seeing work trees created by cursor in your anti-gravity view, for example, because they're all part of the same Git tree.

Vaibhav (37:45.726)
Yeah, because it's part of the same Git work tree. And I guess that's fine, but it's so freaking annoying because this just goes back to what these work trees mean semantically as a developer to me. And these show up in cursor too, so it's not just an anti-gravity thing. It's just part of my Git database. So it shows up here and when you mentioned the naming of work trees, I thought it's really powerful.

Dex (38:06.345)
because it's just part of what's in your Git database.

Vaibhav (38:15.369)
Like small feature here, like if you guys implement this, I think it would be great. Would just be to name these worksheets off the model that it's running off of instead of these random UUIDs at the back. Right? Cause that's what's different about.

Dex (38:24.809)
Yeah, you want some kind of template. mean, what's really, I mean, what would be really great is like, I don't know, like we can give you an opinion of like.

model ticket number or issue number, like three word description of like what the ticket is, like AI can generate all of that. But I actually think what's even more interesting is like you name three of these manually and then we can use that to like a few shot example, automatically naming everything based on your pattern. So you don't have to do these deterministic templates. You just like do it manually three times and then the tool knows like what you like.

Vaibhav (38:39.284)
Yeah.

Vaibhav (38:47.583)
Sure.

Vaibhav (38:56.427)
And then the other thing I really, really want is automatic cleanup. These are basically useless for me. So because they're useless, and I keep on trying to delete work trees manually. And I'm just like, it's the same reason that I have it branches. I don't even know what these are. I don't even know what these are. I have to delete all of them because they're useless. It's the same problem that I have with

Dex (39:03.337)
Bye.

Dex (39:17.619)
They don't have like a bulk delete.

Vaibhav (39:20.261)
No, and there probably is a CLI command, but like I said, I'm scared of using git work trees. So I'm not going to talk about that. Like people talk about why don't you use terminal for everything. It's because like, honestly, I'm scared I'm going to type the wrong command to screw myself.

Dex (39:33.053)
You can RMRF the trees like Nikita said. There's also a Git work tree prune, which will, I think, look for everything that's already been merged to your current branch and just auto delete all the ones that don't matter. But I don't think that'll solve this problem, because you probably have a bunch of random work in progress on all of these.

Vaibhav (39:47.655)
Exactly. And then like if you're running stuff in parallel with many coding agents, some of the coding agents you merge, some of them you don't merge, so you have problems like that. And then the other thing that

Dex (39:55.242)
That's true, Max is right. You should just tell Claude to delete all your work trees and you'll be done in 30 seconds.

Vaibhav (40:00.78)
Um, maybe, but the problem is just like, I don't actually know if I can delete all of them because some of them are actually work in progress along the way. think that's actually the biggest problem that I'm running into when I'm using it work trees. I actually liked the UI way of exploring it myself because the reason I want to spawn multiple work trees is because I often have a problem and I want to run it in like four different agents. That's been actually the most powerful use case of work trees for me. And like being able to quickly scan through each of the diffs has been really powerful.

Dex (40:08.37)
Okay.

Vaibhav (40:30.493)
over all the agents. Because then what I really do is actually have multiple agents go assess it. And once it produces the result, then I take, I do this from copy and paste, but now that you explained how Git work trees at work, I will no longer copy and paste. But I actually take each of those files from each of those. And then I go ahead and then go ahead and what's it called? And then I go ahead and like.

Dex (40:43.705)
Hahaha

Vaibhav (40:56.827)
merge it through some giant agent from like taking the bits and pieces. I liked that of each one manually for what I've been doing. And that's been really helpful for like some of the new design stuff we've been doing because design things are things that not, no one model ever gets right on the one shot, but actually across like four models, it does cover almost every element of it that I, that I have seen so far and it's still not perfect, but it gets me way further than any amount of prompt optimization has gotten me in the past, which has been surprising.

Dex (41:26.025)
Okay, sick.

Vaibhav (41:27.989)
Yeah.

Dex (41:29.545)
I mean, we can demo some other tools. We can take some more questions. I kind of expect this to be a quick one.

Vaibhav (41:32.329)
Demo up.

Dex (41:38.289)
Other, do you have any other questions? Advice? Thoughts? What else is not working?

Vaibhav (41:42.22)
I think what I'm going to do today is I'm going to make BAML 5. I'm going to git clone BAML 5. BAML 5 will literally be me doing right away, just doing straight, making that a work tree only branch. And I will never do anything off of that but work trees. And I'm going to try that. I'm basically going to try using work trees instead of branches for the next two weeks. And I'll report back my findings at the end of that and see how I

Dex (41:47.958)
Ha

Dex (42:05.533)
Well, to be clear, work trees are branches. They're just a view of a branch in a file system.

Vaibhav (42:11.623)
I know you say that, but for some reason my tiny peanut brain is not able to comprehend that in that way. And because it's a folder that I go into, I think I view it almost like a, I get that it's a view of my clone. That's why I described it like a Sim link. And when you describe it, I'm like, yeah, it makes sense. It usually get artifacts to do it the right way. But my puny brain is just like, it's big. I get that it's a branch, but I, I'm not thinking of it like a branch.

Dex (42:17.298)
You

Dex (42:27.368)
Yeah.

Vaibhav (42:39.399)
I'm thinking of it like a re-clone that just shares files across the directory structure, but implemented in the smart way like branches.

Dex (42:44.478)
Yeah.

Dex (42:47.815)
Yeah, and I will just say like, like Git, the mental model is a little weird. It's a little arcane. If you try messing with this, there will be a couple of foot guns. think like, it took me like 20 minutes to be like, okay, I know how to use this. And two or three hours spread across the next two weeks of like, shit, it has this limitation. All right, like let me adjust my mental model slightly. But it's really not as steep a learning curve as like learning Git itself. If you're already comfortable with Git, I think WorkTrees are not that bad.

Vaibhav (43:17.343)
Yeah, that's what I, that's what want to really want to see is I want to see the command get work trees add as a command. can never forget now because it's so simple. so my, my plan is I'm going to try for two weeks. And I think for people on this call that are interested in this, they should also, I recommend like give yourself a time bounded bet. This isn't a permanent behavior change. Make a change for two weeks, reevaluate, decide if it's making you better. And if it is great, you learn something. If it isn't, you only lost two weeks of time and probably not even like a hundred percent loss of productivity. It's like.

Dex (43:23.175)
Yeah. Yeah.

Dex (43:34.195)
Yeah. Yeah.

Vaibhav (43:47.071)
you might be 20%, 30 % slower than you would have been otherwise.

Dex (43:51.134)
Yeah, and it's, the other thing I'll say is like with parallelism in general more, whether you're using work trees or cloud sandboxes or background workers or whatever it is, I would recommend like finding workflows that like.

design your workflow in a way, obviously I always talk about like compacting context and things like this, but the other benefit of like having something like a research plan implement workflow for coding with agents is you know the checkpoints are the same at every time. Like if you launch five clods and you're like, go translate this thing to this, and it's just gonna go work for a while until it's done, then you're gonna have this problem of like every single time you check in with the agent, you are checking in, it's a different shape, you really have to rebuild context,

Okay, this one's over here and it's stuck on tests and this one's over here and it's stuck on building, whereas like, if you're just like spawn three threads to go create three research documents, those documents all look the same. And so you kick them off and you come back and your like convergence point is very like homogenous. And the same thing with plans. You're like, I gotta read three plans. And then when you're implementing a plan, like, I already know what this one is. Like I already have the context. I know where it's might get stuck. I know what it's trying to do.

Vaibhav (44:49.545)
It's very

Vaibhav (44:59.595)
I think it's pretty similar to like, for example, like everyone's dogs on coding interviews being kind of shitty. And to be honest, like they're not perfect for many reasons. But on the other hand, the reason that most companies have a standardized process is because if you're hiring like thousands of engineers, you want every engineer in your team to be evaluating it's the same metrics. So not everyone has to come up to speed from scratch every single time. And that is useful. Right? It's the same thing here. You want to, yeah.

Dex (45:22.601)
Yeah, and it's just like an easy way to compare. If you engineer 10 candidates and you give them all like five different flavors of challenge across all 10 of them, it's really hard to be like, well, I don't actually know if this person is better than this person because we gave them different criteria.

Vaibhav (45:30.215)
Exactly. You have no idea.

Vaibhav (45:38.028)
Yeah, exactly. It's the same with coding agents or any tools that you use. The more standardized you can make your process, the easier it is for you to do things, do multiple things in parallel and evaluate them. As someone asked a really interesting question, how do you monitor the progress of having multiple work trees? I, that's actually, I'll tell you my answer after seeing today's talk. I think I'm going to do what I do with branches. I'm going to try and have one work tree per feature I'm working on.

Dex (45:50.717)
Yep.

Vaibhav (46:07.591)
I don't think I'll do the work tree on work tree thing. I'll just do, I'll do, I'll be basic. and I will use one work tree per feature. And as soon as I'm done with it, I will make PRs from that work tree itself rather than doing a pure Git clone. And then I will, once I'm done with merging that domain and I Git pull, I will actually just delete the work tree.

Dex (46:30.941)
Yep. Once it's merged, you should clean it up and like same way you would delete your local branches. So you don't have a thousand local branches that you have to remember which one was which and which ones are active and which ones are slop. I will, I will also say like worth noting if you are doing any kind of like markdown based planning or research or like basically like the dev and the design that happens before you actually do the code. most people I know, and we internally don't use work trees for that part because

Vaibhav (46:37.835)
Exactly.

Dex (46:57.735)
I mean, for us, we don't version those in the same, they're versioned in a separate Git repo that's hard linked in. And like for you, you keep it all in obsidian, which is stored somewhere else. And you just make sure the agent has access to that vault or something, but we don't commit those and we don't version control them. Sure. Whatever, whatever the, whatever, whatever your, your flavor is, is like, we don't, we treat those documents as like most people aren't modifying them. You're unlikely to have merge conflicts. They don't need the same level of version control as the code itself.

Vaibhav (47:00.422)
yeah.

Vaibhav (47:09.535)
while I'm using.

Dex (47:26.769)
And so I do all of my research and planning from Maine. And then I only create the work tree when the plan is good and I'm happy with it. And then we go launch the work tree and we say, go do the work. So that can also help. I have found people who create work trees for research and planning, and then they're like, that didn't work. I need to go check out another work tree, but I need to merge in not the code, just the document, because I want to keep the research, but not the plan. Like just have all of your markdown stuff that is not like conflict sensitive.

Put it in a place that is outside, either outside your working tree or in Obsidian, but don't try to create work trees for each step of the workflow. They're really, really good for development, but if you overuse them, you'll probably find yourself being like, this is actually creating too much chaos and too much to hold in my head again.

Vaibhav (48:13.931)
Do you want to see something interesting that might tell you how I've been thinking about it, perhaps, related to that? have slight different perspective, but maybe still interesting to you. And I'd love your thoughts on this, because I'm probably doing something silly here that you might have different opinions on. You have generated more markdowns than anyone else I know. So I'll share my thoughts.

Dex (48:18.694)
Yeah. Yeah.

Dex (48:34.312)
Try talking to users of SpecKit.

Vaibhav (48:37.259)
yeah, well, okay. So we have a thing called BEP. It's like family enhancement proposals. It's like how we are going to enhance the language in a more formalized way. And part of this is we write a lot of specs on this. So part of what we did is we made exception handling on here and I actually used work trees to build all of this out. It was very useful. And part of why I did that is because each one of these tabs, I moved the whole BEP into its own work tree for every single unique BEP. And the reason for that was because, sorry.

I say, did it like I ran the Git work tree command. I did not. I happened to do this by Claude, by cursor by accident. And this is how I discovered this in the first place, because I ran bets in parallel with four different coding agents. was like, what the heck is this doing down here? and that was my first introduction to it. And what I found was the ability to have a work tree, right? The same content in four different styles was super, super important to me because everything we were doing over here, like

how you read this. So the conclusion that we landed on this is how do we describe new syntax? Well, the way that we describe new syntax is we actually frame everything as a question answer. How do I handle errors from here? How do I log and rethrow an error with exception handling? And how do you design that kind of system? Well, we had so many different ways of designing this and every coding agent always tried different ways of articulating the same concepts. And what Git Worktree did for me is I was able to run five of them in parallel.

build seven different architectures out the same layout, QA format. QA format, pro style, storytelling, direct format, more like a Google style design doc, all these things. And like what we found was just, this was just like so much better, but I wouldn't have discovered this without the ability to run seven different things in parallel and get side by side. And that's where even generating the markdown files was super helpful. Cause we like, for example, we discussed alternatives. Why don't we use

result type exception handling and other things. And I'm not saying that this doc is done or anything, but it's more about like the use case of generating parallel markdown files and side-by-side compare. I found to be incredibly useful even for the same content.

Dex (50:46.746)
Interesting. Okay, a little bit of bonus content there.

Vaibhav (50:48.531)
I don't know if you've tried that before for your design docs, ever.

Dex (50:53.528)
No, we've seen a couple different approaches to this because the problem with the design doc is it needs to be able to be like collaborated on. And so if you put it in a markdown doc and GitHub in a separate repo, it just kind of becomes this static thing that you can't comment on. If you leave it in the Git tree of the working repo, which lots of people do, then you can like pull request the doc in and then people can comment on it. And then you can pull down the comments and apply these suggestions. like that's useful. There's lots of trade-offs.

I personally, did a podcast with, I did an interview with Jeff Huber, who's the founder of ChromaDB last week. And we kind of like started riffing about like, well, what you really want is like not get at all because like you want something more like Google docs where it's like, there's only one state of the document. There's no merging. There's no like, you can still comment on it and collaborate on it. But when I edit it, I don't want to have to do a pull push sync. Like you want something more like CRDT level like.

Vaibhav (51:21.151)
We were missing the ability to.

Dex (51:48.229)
Everyone's editing this one file and yeah, you have to do all this fancy stuff with like the log of every single action and then like merging them deterministically at the end. But at the end of the day, like you want something that's up to date live, not something that's, mean, markdown and Git is awesome, but I think, I think the future of this is going to look a lot more like somewhere between Git and Google docs and accessible to agents and repos and all this stuff.

Vaibhav (52:11.135)
You know what I had to build to make this work because of the vaccine thing that you were talking about? Let's see if I have it.

Dex (52:14.385)
Yeah.

Vaibhav (52:24.395)
There you go. Sorry. This is a... Yeah, this is a fully five coded thing that we did. And we'll see how this works. Greg.bep.5. One of the things that we did here was because you mentioned the point about markdown and because our alarms generate a lot of slop. Does this not work? that's too bad. What I had here was I had like a get diff view where like...

Dex (52:27.669)
this is like the last time you gave this demo.

Vaibhav (52:52.487)
once before you merged into Canary, it would actually show you the diff of what the most recent changes you made were because like, you're right. What I really want to do very quickly is I want to know that like, if an LLM added this line in this branch, I just want to see this highlighted super fast, super easy without having to think about it. And then we're not going to think about any of this stuff along the way. And that's

Dex (52:59.784)
That's right, yeah, I remember you showing me that.

Dex (53:14.432)
Yeah, want version diffing, you want version history without necessarily the version control. maybe you have like a, what Google Docs does is they have history, right? You can always see every single edit and roll back to a specific version, but there's not this distributed version control thing where people can have divergent branches.

Vaibhav (53:20.317)
Exactly. Yes.

Vaibhav (53:33.695)
Yeah, exactly. And then your point about why GitHub issues are not good about them not being real time is perfect. Like the reason, and also like a lot of people underestimate how important it is for things to be pretty. Like, like I want to just read things that are pretty and look good and navigate it much faster.

Dex (53:49.97)
GitHub issues are pretty.

Vaibhav (53:53.527)
No, not for complex concepts. There's a reason that most docs, when you build docs for any of your systems you've built, do you use GitHub for your docs or do you pull up a docs site? We pull up a docs site. As good as docs are on GitHub, it turns out people like navigating websites more than they like navigating a bunch of GitHub issues.

Dex (53:55.143)
Alright.

Dex (53:58.695)
Yeah.

Dex (54:08.072)
Alright. Fair enough.

Dex (54:20.28)
Cool. Yeah, that's fair enough. I think we're getting into rambling territory, which I know is everybody's favorite part, but we'll probably relieve you all of the tedium of the arguing about Markdown styles. Thank you so much for coming. This was a really fun one to do. I hope you got something from it. Go play with work trees. Shout us out on LinkedIn or Twitter and tell us how it went. And Bye Bob, do you know what we're doing next week?

Vaibhav (54:45.507)
I do not, I think we're gonna talk about it right after the call, so I wish I could have a great answer right off the bat in my head, but I don't have one.

Dex (54:51.45)
Okay, we're gonna go get in the idea chamber. We're gonna figure out what we're gonna talk about next week and we will see you all there.

Vaibhav (54:57.301)
Come sign up if you're interested. Thank you guys for joining. We're gonna close it out.

Dex (55:02.247)
luck. Peace.
