import React from 'react'
import styles from './Nav.module.css'
import bmwlogo from './../images/ms_logo2.png'

const Nav = (props) => {
    return <div className={styles.navigatorcontainer} >
    <nav className={styles.navigatorcontainer}>
        
        <div className={styles.bmwdiv}>
            <img className= {styles.bmwlogo} src={bmwlogo} alt="bmw logo"/>
        </div>
        <div className={styles.navigatorleft}>
            <ul><li>Checklist</li></ul>
        </div>
        <div className={styles.navigatorright}>
            <ul><li>{props.displayName}</li>
                <li><button type="button" className={styles.Button} onClick={props.logout}>Log out</button></li>
            </ul>
        </div>
        <div className={styles.navigatorimg}>
            <img src={props.photoURL}></img>
        </div>
    </nav>
    </div>
}

export default Nav;

// <li><img src={props.photoURL}></img></li>
{/* <div className={styles.bmwdiv}>
        <img className= {styles.bmwlogo} src={bmwlogo} alt="b logo"/>
    </div>
    <div className={styles.navigatorleft}>
        <nav><ul><li>Checklist</li></ul></nav>
    </div>
    <div className={styles.navigatorright}>
        <nav><ul><li>{props.displayName}</li>
        <li><button type="button" className={styles.Button} onClick={props.logout}>Log out</button></li>
        </ul></nav>
    </div>
    <div className={styles.navigatorimg}>
        <img src={props.photoURL}></img>
    </div> */}