import Head from 'next/head'
import { useState } from 'react'
import Bet from '../components/Bet'
import Scope from '../components/Scope'
import data from '../data.json'
import progress from '../progress.json'

export default function Home({ bets, scopes, progress }) {
  console.log(progress)
  const [visibleBet, setVisibleBet] = useState(bets[0])

  function onBetChange({ issue, toggled }) {
    if (toggled) {
      setVisibleBet(issue)
    }
  }
  
  return (
    <>
      <Head>
        <title>Shape Up Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="lg:flex lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-4xl leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">Shape Up 🏋️‍♀️</h2>
              <p className="mt-5 text-xl leading-7 text-gray-500">This dashboard shows the progress we're making during this 6-weeks cycle.</p>
            </div>
            <div className="mt-10 w-full max-w-xs">
              Logo
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-4">
            <div>
              <div className="pb-5 border-b border-gray-200 space-y-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Bets
                </h3>
                <p className="max-w-4xl text-sm leading-5 text-gray-500">Ideas we're now <strong>committed</strong> to implement during this 6 weeks cycle.</p>
              </div>

              <div>
                {
                  bets.map((bet, index) => (
                    <Bet key={index} issue={bet} toggled={bet.issue_number === visibleBet.issue_number} className="mt-3" onChange={onBetChange} />
                  ))
                }
              </div>

              <div className="mt-8 pb-5 border-b border-gray-200 space-y-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Scopes
                </h3>
                <p className="max-w-4xl text-sm leading-5 text-gray-500">
                  Scopes are groups of related tasks.
                </p>
              </div>

              <div>
                {
                  scopes.map((scope, index) => (
                    <Scope key={index} issue={scope} className="mt-3" />
                  ))
                }
              </div>
            </div>
            <div className="lg:col-span-3 border border-gray-500">

            </div>
          </div>
        
        </div>
      </div>
    </>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      ...data,
      ...{
        progress,
      },
    },
  }
}
