import Head from 'next/head'
import type { ReactNode } from 'react'
import Navbar from '../navbar'

interface LayoutProps {
  title: string
  keywords: string
  description: string
  search: boolean
  setSearch(arg: boolean): void
  children: ReactNode
}
export const Layout = ({
  title,
  keywords,
  description,
  search,
  setSearch,
  children
}: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar search={search} setSearch={setSearch} />
      {children}
    </div>
  )
}

Layout.defaultProps = {
  title: 'Top 500 movies',
  description: 'Top 500 movies. Brought to you by TMDB api!',
  keywords: 'Movies, TMDB'
}
