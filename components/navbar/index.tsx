import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '@/styles/Navbar.module.scss'
import { BiSearch } from 'react-icons/bi'
import { FaTimes } from 'react-icons/fa'

const Navbar = ({
  search,
  setSearch
}: {
  search: boolean
  setSearch(arg: boolean): void
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
                width={150}
              />
            </div>
            <ul>
              <li className={router.pathname === '/' ? styles.active : ''}>
                <Link href="/">Movies</Link>
              </li>
              <li
                className={
                  router.pathname === '/favourites' ? styles.active : ''
                }
              >
                <Link href="/favorites">Favorites</Link>
              </li>
            </ul>
          </div>
          <div className={styles.flex}>
            <ul>
              <li onClick={() => setSearch(!search)}>
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
