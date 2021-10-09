import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '@/styles/Navbar.module.scss'
import { BiSearch } from 'react-icons/bi'
import { FaTimes } from 'react-icons/fa'

const Navbar = ({
  search,
  setSearch,
  handleSort
}: {
  search: boolean | undefined
  setSearch?: (arg: boolean) => void
  handleSort?: (arg: string) => void
}) => {
  const router = useRouter()
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.sub}>
          <div className={styles.nav}>
            <div className={styles.logo}>
              <Image
                src="/tmdb-short.svg"
                alt="TMDB logo"
                height="100%"
                width="100%"
                className={styles.image}
              />
            </div>
            <ul>
              <li className={router.pathname === '/' ? styles.active : ''}>
                <Link href="/">Movies</Link>
              </li>
              {/* <li
                className={
                  router.pathname === '/favourites' ? styles.active : ''
                }
              >
                <Link href="/favorites">Favorites</Link>
              </li> */}
            </ul>
          </div>
          <div className={styles.flex}>
            <ul>
              <select
                onChange={(e) => handleSort && handleSort(e.target.value)}
              >
                <option defaultValue="sort">Sort</option>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
              <li onClick={() => setSearch && setSearch(!search)}>
                {search ? <FaTimes color="#fff" /> : <BiSearch color="#fff" />}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
