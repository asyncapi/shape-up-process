import CyclePage, { getStaticProps as getStaticPropsFunction } from '../components/CyclePage'

export default function Home(props) {
  return (
    <CyclePage {...props} />
  )
}

export const getStaticProps = getStaticPropsFunction