import {getJokesData, getJokeData} from '../../../utils/joke'
import type {Joke} from '../../../utils/joke'

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
    fallback: 'blocking',
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
  }
}
