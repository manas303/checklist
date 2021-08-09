import React from 'react'
import styles from './Nav.module.css'
import bmwlogo from './../images/bmw.png'

const Nav = () => {
    return <div className={styles.navigatorcontainer} >
    <div className={styles.bmwdiv}>
        <img className= {styles.bmwlogo} src={bmwlogo} alt="some logo"/>
    </div>
    <div className={styles.navigator}>
        <nav><ul><li>Checklist</li></ul></nav>
    </div>
    </div>
}

export default Nav;