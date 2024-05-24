import * as React from 'react';
import styles from "./styles.module.css"

const AppBar = ({children}) => {
    return (
        <div className={styles.appbar}>
            <div className={styles.appbar__inner}>
                {children}
            </div>
        </div>
    )
}
export default AppBar