import * as React from 'react';
import styles from "./styles.module.css"

const Page = ({children}) => {
    return (
        <div className={styles.page}>
            <div className={styles.page__inner}>
                {children}
            </div>
        </div>
    )
}
export default Page