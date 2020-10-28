import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Shape Up Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to the Shape Up Dashboard!
        </h1>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
