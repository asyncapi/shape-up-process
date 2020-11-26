import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import stringToColor from 'string-to-color'
import nearestColor from 'nearest-color'
import Bet from './Bet'
import Scope from './Scope'
import colors from './colors'
import data from '../data.json'
import Header from './Header'
import Footer from './Footer'
import Cycle from './Cycle'

export default function CyclePage({ visibleCycle, previousCycle, nextCycle, inCycle, availablePitches = [], availableBets = [], availableScopes = [] }) {
  const router = useRouter()
  const queryParams = new URLSearchParams(router.asPath.split('?')[1])
  let defaultVisibleBet = availableBets[0] || null
  if (queryParams.has('bet')) {
    defaultVisibleBet = availableBets.find(bet => bet.issue_number === Number(queryParams.get('bet'))) || defaultVisibleBet
  }
  const defaultVisibleScopes = availableScopes.filter(scope => belongsToBet(defaultVisibleBet, scope))
  let defaultSelectedScopes = defaultVisibleScopes
  if (queryParams.has('scopes')) {
    defaultSelectedScopes = queryParams.get('scopes').split(',').map(id => availableScopes.find(scope => scope.issue_number === Number(id)))
  }

  const [visibleBet, setVisibleBet] = useState(defaultVisibleBet)
  const [visibleScopes, setVisibleScopes] = useState(defaultVisibleScopes)
  const [selectedScopes, setSelectedScopes] = useState(defaultSelectedScopes)

  function replaceRoute() {
    queryParams.set('bet', visibleBet.issue_number)
    queryParams.set('scopes', selectedScopes.map(vs => vs.issue_number))
    const queryString = queryParams.toString().length ? `?${queryParams.toString()}` : ''
    router.replace(`/cycles/${visibleCycle.id}${queryString}`, undefined, {
      shallow: true,
    })
  }

  useEffect(replaceRoute, [visibleBet, selectedScopes])

  // useEffect(() => {
  //   onBetChange({ issue: defaultVisibleBet, toggled: true })
  // }, [defaultVisibleBet])

  function onBetChange({ issue, toggled }) {
    if (toggled) {
      setVisibleBet(issue)
      const allScopesFromBet = availableScopes.filter(scope => belongsToBet(issue, scope))
      setVisibleScopes(allScopesFromBet)
      setSelectedScopes(allScopesFromBet)
    }
  }

  function onScopeChange({ issue, toggled }) {
    setSelectedScopes(visibleScopes.filter(scope => {
      if (issue.number === scope.number) {
        return toggled
      } else {
        return !!selectedScopes.find(s => s.number === scope.number)
      }
    }))
  }

  return (
    <>
      <Head>
        <title>AsyncAPI - Shape Up Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto py-16 px-4 sm:py-16 sm:px-6 lg:px-8">
          <Header />

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-4">
            <div>
              <div className="lg:shadow lg:p-4">
                <div className="pb-5 border-b border-gray-200 space-y-2">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Bets
                  </h3>
                  <p className="max-w-4xl text-sm leading-5 text-gray-500">Ideas we're now <strong>committed</strong> to implement during this 6 weeks cycle.</p>
                </div>

                <div>
                  {
                    availableBets.map((bet, index) => (
                      <Bet key={index} issue={bet} toggled={visibleBet && bet.issue_number === visibleBet.issue_number} className="mt-3" onChange={onBetChange} />
                    ))
                  }
                  {
                    !visibleBet && (
                      <p className="italic text-sm text-gray-400 mt-4">No bets have been created yet.</p>
                    )
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
                    (visibleScopes || []).map((scope, index) => (
                      <Scope key={index} toggled={!!selectedScopes.find(s => s.number === scope.number)} issue={scope} onChange={onScopeChange} className="mt-3" />
                    ))
                  }
                  {
                    !(visibleScopes || []).length && (
                      <p className="italic text-sm text-gray-400 mt-4">No scopes have been created yet.</p>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <Cycle
                visibleCycle={visibleCycle}
                inCycle={inCycle}
                previousCycle={previousCycle}
                nextCycle={nextCycle}
                pitches={availablePitches}
                bets={availableBets}
                selectedScopes={selectedScopes}
              />
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}

export async function getStaticProps({ params }) {
  let inCycle = false
  if (params && params.id) {
    data.visibleCycle = data.cycles.find(cycle => String(cycle.id) === params.id)
    const startDate = new Date(data.visibleCycle.start_date)
    const endDate = new Date(data.visibleCycle.due_on)
    const now = new Date()
    inCycle = (startDate <= now && endDate >= now)
  } else {
    data.visibleCycle = data.cycles.find(cycle => {
      const startDate = new Date(cycle.start_date)
      const endDate = new Date(cycle.due_on)
      const now = new Date()
      if (endDate < now) return false
      if (startDate <= now && endDate >= now) inCycle = true
      return cycle
    })
  }
  const visibleCycleIndex = data.cycles.findIndex(cycle => cycle.id === data.visibleCycle.id)
  data.previousCycle = visibleCycleIndex > 0 ? data.cycles[visibleCycleIndex - 1] : null
  data.nextCycle = visibleCycleIndex < data.cycles.length - 1 ? data.cycles[visibleCycleIndex + 1] : null
  data.inCycle = inCycle

  data.availablePitches = data.pitches.filter(b => b.milestone && data.visibleCycle && b.milestone.id === data.visibleCycle.id)
  data.availableBets = data.bets.filter(b => b.milestone && data.visibleCycle && b.milestone.id === data.visibleCycle.id)

  data.availableScopes = data.scopes.map(scope => {
    const scopeProgress = data.progress.find(p => p.issue_number === scope.number)
    scope.progress = scopeProgress || null
    scope.color = nearestColor.from(colors)(stringToColor(`${scope.title} ${scope.issue_number}`))
    return scope
  })

  return {
    props: {
      ...data,
    },
  }
}

function belongsToBet(bet, scope) {
  if (!bet) return false
  if (!scope || !scope.parent_epics || scope.parent_epics.length === 0) return false
  return !!scope.parent_epics.find(pe => pe.issue_number === bet.number && pe.repo_id === bet.repo_id)
}
