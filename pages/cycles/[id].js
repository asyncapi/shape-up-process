import data from '../../data.json'
import CyclePage, { getServerSideProps as getServerSidePropsFunction } from '../../components/CyclePage'

export default function Cycle(props) {
  return (
    <CyclePage {...props} />
  )
}

export const getServerSideProps = getServerSidePropsFunction
