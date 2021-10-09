import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import styles from '../styles/Home.module.scss'
import { Layout } from '../components/layout'
import Movie from '../components/movie'

export type Post = {
  poster_path: string
  title: string
  vote_average: number
  release_date: string
  highlight: boolean
  id: number
}
type Response = {
  page: number
  results: Post[]
  total_results: number
}

const Home: NextPage = ({
  results
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [movies, setMovies] = useState<Post[]>([])
  const [filteredMovies, setFilteredMovies] = useState<Post[]>([])
  const [search, setSearch] = useState(false)
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    if (localStorage.movies && localStorage.movies !== '[]') {
      setMovies(JSON.parse(localStorage.movies))
      setFilteredMovies(JSON.parse(localStorage.movies))
    } else {
      setMovies(
        results.map((result: Post) => {
          return { ...result, highlight: false }
        })
      )
      setFilteredMovies(
        results.map((result: Post) => {
          return { ...result, highlight: false }
        })
      )
    }
  }, [results])

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify([...movies]))
  }, [movies])

  const handleSort = (direction: string) => {
    if (direction === 'sort') setFilteredMovies(movies)
    if (direction === 'asc') {
      setFilteredMovies([
        ...movies.sort((a, b) => a.vote_average - b.vote_average)
      ])
    }

    if (direction === 'desc') {
      setFilteredMovies([
        ...movies.sort((a, b) => b.vote_average - a.vote_average)
      ])
    }
  }

  const handleFilter = (e: React.FormEvent<HTMLInputElement>) => {
    setFilterValue(e.currentTarget.value)
    setFilteredMovies(
      movies.filter((movie) =>
        movie.title.toLowerCase().includes(filterValue.toLowerCase())
      )
    )
  }

  const handleHighlight = (id: number, stared: boolean) => {
    let movie = movies.filter((movie) => movie.id === id)[0]
    const index = movies.indexOf(movie)
    movie = { ...movie, highlight: stared }
    const allMovies = movies
    allMovies.splice(index, 1, movie)
    setMovies([...allMovies])
  }

  return (
    <Layout search={search} setSearch={setSearch} handleSort={handleSort}>
      <div>
        {search && (
          <div
            style={{
              background: '#000',
              marginTop: 64,
              marginBottom: '-4rem',
              transition: 'all 0.5s ease-in-out'
            }}
          >
            <form style={{ zIndex: 1000 }}>
              <input
                type="text"
                value={filterValue}
                onChange={(e) => handleFilter(e)}
                placeholder="Search by title..."
                className={styles.input}
              />
            </form>
          </div>
        )}
        <main className={styles.main}>
          <div className={styles.grid}>
            {results.length > 0 &&
              filteredMovies?.map((result: Post) => (
                <Movie
                  key={result.id}
                  movie_data={result}
                  handleHighlight={handleHighlight}
                />
              ))}
          </div>
        </main>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let page_number = 1
  let res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
  )
  const posts: Response = await res.json()
  let results: Post[] = [...posts.results]
  while (page_number < 25) {
    page_number++
    res = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=${page_number}`
    )
    const posts = await res.json()
    results = [...results, ...posts.results]
  }

  return {
    props: {
      results
    }
  }
}

export default Home
