import data from '../../data.json'
import CyclePage from '../../components/CyclePage'

export default function Cycle(props) {
  return (
    <CyclePage {...props} />
  )
}

export async function getStaticProps() {
  return {
    props: {}
  }
}

export async function getStaticPaths() {
  return {
    paths: data.cycles.map(cycle => `/cycles/${cycle.id}`),
    fallback: false,
  }
}