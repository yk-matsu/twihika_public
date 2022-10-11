import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { State } from '../components/stateToProps'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <State></State>
    </div>
  )
}

export default Home
