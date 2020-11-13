import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/Footer'

export default function Help() {
  return (
    <>
      <Head>
        <title>AsyncAPI - Shape Up Dashboard - Help</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center max-w-screen-xl mx-auto pt-4 pb-8 px-4 sm:px-6 md:flex-row md:justify-between lg:px-8">
        <a href="https://www.asyncapi.com" target="_blank" className="-mb-4 mt-4 sm:mt-0">
          <img src="/asyncapi-horizontal-color.svg" className="h-7 mb-4" />
        </a>
        <Link href="/">
          <a className="group flex mt-6 text-gray-500 hover:text-gray-800 transition-all duration-100 ease-in-out sm:mt-0">
            <svg className="h-4 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="ml-1 group-hover:ml-2 transition-all duration-200 ease-in-out">Back to the Shape Up Dashboard</span>
          </a>
        </Link>
      </div>

      <div className="relative py-16 bg-white overflow-hidden">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-gray-500 mx-auto">
            <p className="text-base text-center leading-6 text-indigo-600 font-semibold tracking-wide uppercase">Introducing</p>
            <h1 className="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              <span className="gradient-animated">Shape Up</span> 🏋️‍♀️
            </h1>

            <p>
              <a href="https://basecamp.com/shapeup" target="_blank">Shape Up</a> is a set of product management techniques originally developed at <a href="https://www.basecamp.com" target="_blank">Basecamp</a>. As per their own words:
            </p>

            <blockquote>
              <p>
                Shape Up is for product development teams who struggle to ship. If you’ve thought to yourself “Why can’t we ship like we used to?” or “I never have enough time to think about strategy,” then this book [Shape Up] can help. You’ll learn language and techniques to define focused projects, address unknowns, and increase collaboration and engagement within your team.
              </p>
            </blockquote>

            <p>
              At AsyncAPI, we use Shape Up to enhance collaboration within the AsyncAPI core team.
            </p>

            <h2>How does it work?</h2>
            <p>
              In a nutshell:
            </p>
            <ul>
              <li>We work on cycles of 6 weeks. People can <strong>pitch</strong> ideas before the cycle starts. If they're selected, they become <strong>bets</strong>. Otherwise, we <a href="https://basecamp.com/shapeup/2.1-chapter-07#decentralized-lists" target="_blank">get rid of them</a>.</li>
              <li>After the 6 weeks, we do a 2-weeks cool-down period. We use this time to contribute to other open-source software, fix some small bugs, and actually whatever we want. The only constraint is that everything has to be open-sourced.</li>
              <li><a href="https://basecamp.com/shapeup/2.1-chapter-07#decentralized-lists" target="_blank">We don't maintain a backlog</a>. If a pitch is not selected, you can happily take it back on a future cycle.</li>
              <li>Bets are divided into smaller sets of tasks called <strong>Scopes</strong>. A scope is nothing else than a group of related tasks.</li>
              <li>We don't do time estimations. Instead, we set the <strong>appetite</strong> we have for a given pitch. In other words, we set how much time we're happy to invest on a given idea. There are 3 categories: small batch (1-2 weeks), medium batch (3-4 weeks), and big batch (5-6 weeks).</li>
            </ul>

            <h2>Why a hill chart?</h2>
            <p>
              Work is like a hill. You first have to figure out how to do something and then do the actual work. Most of the failing projects have in common that they have tasks you haven't really figured out how you're going to approach them. No blame here. Humans are really bad at estimating time.
            </p>
            <iframe src="https://adamstoddard.com/demos/over-the-hill.html" className="w-full h-48 md:h-100" />
            <div className="italic text-center text-base text-gray-400">Art by <a href="https://twitter.com/AdamStddrd" target="_blank">Adam Stoddard</a></div>
            <p>
              With the hill chart, we emphasize on making sure we have figured out tasks first and we know exactly what we have to do.
            </p>

            <h2>Why appetite and not estimations?</h2>
            <p>
              Estimating how long a task is going to take based on the title and —hopefully— a description is nearly impossible. Most of the time, you need to get your hands a little bit dirty before being able to estimate something. You need to better understand the implications of a task to remove uncertainty.
            </p>
            <p>
              So we first make a research on the topic we want to develop and make sure it's something doable, identify the rabbit holes, and define limits on what should be left out.
            </p>
            <p>
              With that information, we can make sure it would fit in a cycle. Or the opposite, we know it would not fit and proceed to split it in multiple pitches or reduce its scope.
            </p>
            <p>
              That said, just because something fits in a cycle, it doesn't mean we want to work on it right now. The appetite serves as a way to measure how much interest do we have in implementing something <strong>now</strong>. Therefore, that means appetite changes over time. You may want to dedicate a full 6-weeks cycle doing something you didn't want to expend a single week on a past cycle.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

// 

// ## How do we handle work at AsyncAPI?

// For many years, the members of the organization have been doing Scrum either at AsyncAPI or at our employers companies. Have you ever felt like you're just taking issues and completing them? And that the backlog of ideas only seems to grow at a higher speed you're able to work on them? You're not alone.

// At AsyncAPI, we implement the Shape Up process, initially designed at [Basecamp](https://basecamp.com/shapeup). However, we do things a bit differently since we're working on open source tooling and specifications, and want to keep everything at Github and Zenhub for maximum transparency.

// We work in 6 weeks-long cycles where the team is exclusively focused on developing the work we've planned for this cycle. Right after the cycle finishes, we start a cool-down period of 2 weeks where anyone can work on anything they want, including but not limited to fixing bugs, some refactors here and there, and **contributing to other open-source projects**.

// <figure>
//   <img src="pipelines.png" border="1" />
//   <figcaption align="center">AsyncAPI Zenhub pipelines</figcaption>
// </figure>

// ### Pitches & Bets :speaking_head:

// The whole thing starts with a **pitch**. A pitch is a proposal you make for our next 6 weeks cycle. Usually, only the AsyncAPI team can create pitches and it must always contain detailed information about the problem it's trying to solve, the proposed solution, potential risks & rabbit holes, and no gos. [Not too abstract, not too concrete](https://basecamp.com/shapeup/1.1-chapter-02).

// <figure className="float-right">
//   <img src="bet.png" border="1" />
//   <figcaption align="center">Example of a Bet</figcaption>
// </figure>

// The AsyncAPI managers will set an associated "appetite". It is the amount of time we want to spend working on that solution <ins>at this point in time</ins>. There are 3 kinds of appetite: `small batch` (1-2 weeks), `medium batch` (3-4 weeks), and `big batch` (5-6 weeks). What's a "small batch" appetite today may become a "big batch" appetite on a future cycle. **Appetites are not estimations**.

// Sometimes, we know in advance there's a high risk that the solution would take more time than we're willing to dedicate. In these cases, we either reframe the solution —so it takes less time— or simply accept that we don't have enough appetite right now, and the pitch is discarded for the next cycle. **That doesn't mean we will not implement the solution in the future, <ins>just not in the following cycle</ins>.** Anyone can lobby it for future cycles.

// The AsyncAPI managers will take the decision of which pitch or pitches will make it to the next cycle. At this point, the pitches become **bets**. It's not just someone's pitch anymore. **It's our bet**.

// ### Scopes & Tasks :bowling:

// ### Closed



// ## FAQ (Frequently Asked Questions)

// ### How do I add my pitch?

// To add a pitch for the next cycle, stick to the following steps:

// 1. Before you spend time shaping your pitch, open an issue —if there isn't one already— in the repo that's most related to the topic. For instance, if your pitch is about adding a feature to [Generator](https://www.github.com/asyncapi/generator), open an issue there to gauge potential interest first. Crafting a great pitch takes a lot of time and effort, make sure it has options to be accepted. We don't want anyone to lose their time.
// 1. Once you've gathered enough information, [open a pitch issue in this repo](https://github.com/asyncapi/shape-up-process/issues/new?template=pitch.md).

// ## What if my pitch doesn't get selected?

// If a pitch doesn't make it to the cycle, it will be closed. It's the responsibility of the author to revive it in the future if they still think it makes sense. [We don't hold a centralized backlog](https://basecamp.com/shapeup/2.1-chapter-07#decentralized-lists) and thus we don't take care of the closed pitches.

// If your pitch addresses an important problem [it will come back sooner than later](https://basecamp.com/shapeup/2.1-chapter-07#important-ideas-come-back).


