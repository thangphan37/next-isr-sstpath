import {getJokeData, getJokesData} from '../../no-isr/fallback-false/[id]'
import type {Joke} from '../../no-isr/fallback-false/[id]'

function Joke({joke}: {joke: Joke}) {
  return <pre>{JSON.stringify(joke)}</pre>
}

export default Joke

export async function getStaticPaths() {
  const paths = Array.from({length: 3}, (_, idx) => {
    return {
      params: {
        id: String(idx),
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({
  params,
}: {
  params: {
    id: string
  }
}) {
  const jokes = await getJokesData()
  const joke = await getJokeData(params.id, jokes as Array<Joke>)
  return {
    props: {
      joke,
    },
    revalidate: 20,
  }
}