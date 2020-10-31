import CyclePage, { getStaticProps as getStaticPropsFunction } from '../components/CyclePage'

export default function Home({ visibleCycle, previousCycle, nextCycle, inCycle, bets, scopes }) {
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