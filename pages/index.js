
import styles from '../styles/Home.module.css'
import React, { useContext } from 'react'
import { AppContext } from './AppContext'


export default function Home() {
  const context = useContext(AppContext);
  console.log("context", context);

  return (
      <div className={styles.container}>
       Family Tree
      </div>
  )
}
