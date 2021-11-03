import faker from 'faker'

export function getJokesData() {
  const JOKES = Array.from({length: 100}, (_, idx) => {
    return {
      id: idx,
      value: faker.random.words(3),
    }
  })

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JOKES)
    }, 1000)
  })
}

export function getJokeData(id: string, jokes: Array<Joke>) {
  const joke = jokes.find((jo) => jo.id === Number(id))
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(joke)
    }, 1000)
  })
}

export type Joke = {
  id: number
  value: string
}

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
    fallback: true,
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
