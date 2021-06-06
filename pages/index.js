
import styles from '../styles/Home.module.css'
import React, { useContext } from 'react'
import { AppContext } from './AppContext'


export default function Home() {
  const context = useContext(AppContext);
  console.log("context", context);

  return (
      <div className={styles.container}>
        <main className={styles.main}>
          <div>Family Tree</div>
        </main>
        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a>
        </footer>
      </div>
  )
}
