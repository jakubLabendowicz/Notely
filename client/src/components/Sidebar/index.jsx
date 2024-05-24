import * as React from 'react';
import styles from "./styles.module.css"

const SideBar = ({children}) => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar__inner}>
                {children}
            </div>
        </div>
    )
}
export default SideBar