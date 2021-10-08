import { NavbarWrapper } from './styles'
import Link from 'next/link'

const Navbar = () => {
  return (
    <NavbarWrapper>
      <div className="content">
        <div className="sub">
          <div className="nav">
            <div className="logo">TMDB</div>
            <ul>
              <Link href="/">Movies</Link>
              <Link href="/favorites">Favorites</Link>
            </ul>
          </div>
        </div>
      </div>
    </NavbarWrapper>
  )
}

export default Navbar
