import { style } from '@mui/system';
import * as React from 'react';
import styles from "./styles.module.css"

const PageBody = ({children}) => {
    return (
        <div className={styles.page_body}>
            <div className={styles.page_body__inner}>
                {children}
            </div>
        </div>
    )
}
export default PageBody