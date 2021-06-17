
import styles from '../styles/Home.module.css';
import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';


export default function Home() {
  const router = useRouter();

  return (
      <div className={styles.container}>
        <h1>Welcome to Family Tree</h1>
        <p>Let's create something cool!</p>
        <Button variant="contained" color="primary" onClick={() => router.push('/playground')}>Get Started</Button>
      </div>
  )
}
