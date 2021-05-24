import styles from '../styles/layout.module.css'
import React from 'react';
import Navigation from './navigation';


export default function Layout(props:any) {

    return (
        <>
            <div className={styles.wrapper}>
                <Navigation />
                <main className={styles.main}>{props.children}</main>
            </div>
            </>
    )
}
