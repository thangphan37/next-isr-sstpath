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
