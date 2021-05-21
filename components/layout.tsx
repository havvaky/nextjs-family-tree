import styles from './layout.module.css'
import React from 'react';


export default function Layout(props:any) {
    return <div className={styles.wrapper}>{props.children}</div>
}
