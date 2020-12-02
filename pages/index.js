import CyclePage, { getServerSideProps as getServerSidePropsFunction } from '../components/CyclePage'

export default function Home(props) {
  return (
    <CyclePage {...props} />
  )
}

export const getServerSideProps = getServerSidePropsFunction