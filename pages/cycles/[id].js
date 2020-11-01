import data from '../../data.json'
import CyclePage, { getStaticProps as getStaticPropsFunction } from '../../components/CyclePage'

export default function Cycle(props) {
  return (
    <CyclePage {...props} />
  )
}

export const getStaticProps = getStaticPropsFunction

export async function getStaticPaths() {
  return {
    paths: data.cycles.map(cycle => `/cycles/${cycle.id}`),
    fallback: false,
  }
}