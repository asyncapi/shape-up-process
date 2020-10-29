import Head from 'next/head'
import { useState } from 'react'
import stringToColor from 'string-to-color'
import nearestColor from 'nearest-color'
import Bet from '../components/Bet'
import HillChart from '../components/HillChart'
import Scope from '../components/Scope'
import colors from '../components/colors'
import data from '../data.json'
import progress from '../progress.json'

export default function Home({ bets, scopes }) {
  const [visibleBet, setVisibleBet] = useState(bets[0])
  const [visibleScopes, setVisibleScopes] = useState(scopes.filter(scope => belongsToBet(bets[0], scope)))
  const [selectedScopes, setSelectedScopes] = useState(scopes.filter(scope => belongsToBet(bets[0], scope)))

  function onBetChange({ issue, toggled }) {
    if (toggled) {
      setVisibleBet(issue)
      const allScopesFromBet = scopes.filter(scope => belongsToBet(issue, scope))
      setVisibleScopes(allScopesFromBet)
      setSelectedScopes(allScopesFromBet)
    }
  }
  
  function onScopeChange({ issue, toggled }) {
    setSelectedScopes(visibleScopes.filter(scope => {
      return issue.number !== scope.number || toggled ? scope : false
    }))
  }

  function belongsToBet(bet, scope) {
    if (!scope || !scope.parent_epics || scope.parent_epics.length === 0) return false
    return !!scope.parent_epics.find(pe => pe.issue_number === bet.number && pe.repo_id === bet.repo_id)
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
                  visibleScopes.map((scope, index) => (
                    <Scope key={index} toggled={!!selectedScopes.find(s => s.number === scope.number)} issue={scope} onChange={onScopeChange} className="mt-3" />
                  ))
                }
                {
                  !visibleScopes.length && (
                    <p className="italic text-sm text-gray-400 mt-4">No scopes have been created yet.</p>
                  )
                }
              </div>
            </div>
            <div className="lg:col-span-3">
              <HillChart scopes={selectedScopes} />
            </div>
          </div>
        
        </div>
      </div>
    </>
  )
}

export async function getStaticProps(context) {
  data.scopes = data.scopes.map(scope => {
    const scopeProgress = progress.find(p => p.issue_number === scope.number)
    scope.progress = scopeProgress || null
    scope.color = nearestColor.from(colors)(stringToColor(scope.title))
    return scope
  })

  return {
    props: {
      ...data,
    },
  }
}
