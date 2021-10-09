import { useState } from 'react'
import Image from 'next/image'
import { Post } from '../../pages'
import styles from '@/styles/Movie.module.scss'

import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { AiFillStar } from 'react-icons/ai'

type MovieProp = {
  movie_data: Post
  handleHighlight(arg1: number, arg2: boolean): void
}

const Movie = ({ movie_data, handleHighlight }: MovieProp) => {
  const { id, poster_path, title, vote_average, release_date, highlight } =
    movie_data

  const [stared, setStared] = useState<boolean>(highlight)

  // Modified Date
  const date = new Date(
    Number(release_date.split('-')[0]),
    Number(release_date.split('-')[1]),
    Number(release_date.split('-')[2])
  ).toString()

  const handleAddHighlight = () => {
    handleHighlight(id, !stared)
    setStared(!stared)
  }

  return (
    <div className={styles.root}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt="Movies Poster"
        width={180}
        height={250}
        // layout="fill"
        className={styles.movie}
      />
      <div className={styles.star} onClick={handleAddHighlight}>
        <AiFillStar
          style={{
            color: stared ? '#fb3958' : '#fff',
            transition: 'color 0.4s ease-in-out',
            fontSize: 20,
            cursor: 'pointer'
            // zIndex: 5
          }}
        />
      </div>
      <CircularProgressbar
        value={vote_average}
        maxValue={10}
        text={`${vote_average * 10}%`}
        background
        styles={{
          root: {
            width: 40,
            height: 40,
            position: 'absolute',
            bottom: 35,
            left: 10,
            color: '#fff'
          },
          path: {
            stroke: 'rgba(92, 184, 92,1)',
            strokeLinecap: 'butt',
            transition: 'stroke-dashoffset 0.5s ease 0s',
            transformOrigin: 'center center'
          },
          trail: {
            strokeLinecap: 'butt',
            transformOrigin: 'center center'
          },
          background: {
            fill: '#111'
          },
          text: {
            fill: '#fff',
            fontSize: '1.8rem',
            fontWeight: 600
          }
        }}
      />
      <h5>{title}</h5>
      <p style={{ fontSize: 12, marginTop: -20 }}>
        {date.split(' ')[1]} {date.split(' ')[2]}, {date.split(' ')[3]}
      </p>
    </div>
  )
}

export default Movie
