# Culture Amp’s Front End Coding Test

This is my solution to the coding challenge supplied by Culture Amp on the 22nd of Jan 2020. The problem is described in `problemDescription.md`.

Architectural decisions have been captured in the `/adr` directory.


## Dev set up

* This project uses un-ejected create-react-app

* Normal development with `yarn start`

* Lint with `yarn lint`


## Deployment

* `yarn build` and copy `/build` to an s3 bucket


## Assumptions

* There are only two url patterns `/surveys` and `/surveys/:surveyId`. While the second url pattern references `/survey_results/surveyId` this url responds with a 503 bad gateway, and all the data referenced in the problem description is supplied by the two working urls: "The details you can get for each survey include all of the response data".

* The problemDescription states that questions are answered on a scale from 1 to 5, but there is some data that comes through as a `"0"`, assumming this has the same meaning as a result of `""`.


## Choice of libraries

* React and TypeScript are what I'm most experienced with, they're tools I like and they were a good fit for this project

* Redux was potentially overkill for such a small project, but I really like the debugging experience it provides with the devtools browser extension, and I figure it's good to show I'm comfortable with it.

* Redux Toolkit (previous known as Redux Starter Kit), makes working with Redux less boilerplate-y, more consistent, and more fun. I've used it on a few projects now and my team mates have all picked it up quickly, and it doesn't obscure any of Redux's features if something tricky need to be done. It's also maintained by Redux developers and has great TypeScript support.

* io-ts is a TypeScript library that provides run-time type checking of json and javascript objects. I always like to use it when working with untrusted data or apis as it means I don't have to program defensively inside the application. I've helped co-workers implement it on other projects and found that it has quite a steep learning curve so I would always check team mates were on-board before adding it to a project.

* Tailwind is a library I've wanted to try for a while, I've heard great things from all who have worked with it, and really like the idea of a granular utility based styling library. I've primarily used Styled Components the past two years and my experience has been mostly good but I don't like how tightly coupled it is to React. I found Tailwind could be a bit verbose at times but overall I really liked it and will use it again.

* Create React App is a simple way to get most of what I needed for this project quickly. I initially set this up without a "webpack framework" but adding tailwind made it a bit more complex than I wanted for this project.


## What I'd do next if I had more time

* **TESTS!** While I'm not a big fan of snapshot testing, custom hooks and anything in the `lib` or `helpers` file should have heavy test coverage. The `getStats` function is a perfect candidate for test.

* A simple fade in animation after a page has finished loading would make the app feel a lot smoother.

* Caching responses would make the app a lot snappier, I didn't implement as at this stage it would've been a premature optimisation, and I had no idea how and when to invalidate the data. This caching could have been done using a cache "slice" in Redux (this would give us lots of control over caching) or using something out of the box like Axios and a plugin.

* Being able to drill down into questions and respondents would be interesting and not too difficult. You may notice in the Redux store I normalised the survey data so that I could generate some more interesting statistics on the surveys like comparing the overall positivity of participants. I've already spent two days on this project though so I have stopped before implementing that.


## What I might do differently if this were a real project

* As mentioned above io-ts could be too much overhead for some team mates, and if I had access to the server source code it might not even be necessary.

* The general purpose "Error object" is just an array of strings that are all shown to the user, they should at least be a user facing error message and a developer facing error object. In helpers/logger.ts, use of console.log could be replaced by calls to error reporting and logging services like Sentry or Datadog. And/or formatting more consistently and pushed to stdout.

* _Definitely_ not implement my own box plot, there are almost certainly bugs in my implementation. I did this as because I wanted to practice tailwindcss and because it was a bit fun.
