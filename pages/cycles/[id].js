import data from '../../data.json'
import CyclePage, { getStaticProps as getStaticPropsFunction } from '../../components/CyclePage'

export default function Cycle({ visibleCycle, previousCycle, nextCycle, inCycle, bets, scopes }) {
  return (
    <CyclePage
      visibleCycle={visibleCycle}
      previousCycle={previousCycle}
      nextCycle={nextCycle}
      inCycle={inCycle}
      bets={bets}
      scopes={scopes}
    />
  )
}

export const getStaticProps = getStaticPropsFunction

export async function getStaticPaths() {
  return {
    paths: data.cycles.map(cycle => `/cycles/${cycle.id}`),
    fallback: false,
  }
}