import Link from 'next/link'
import { Layout } from '@/components/layout'
import styles from '../styles/404.module.css'

const NotFoundPage = () => {
  return (
    <Layout title="Page not found">
      <div className={styles.error}>
        <h1>404</h1>
        <h4>Sorry there is nothing here</h4>
        <Link href="/">Go back home</Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage
