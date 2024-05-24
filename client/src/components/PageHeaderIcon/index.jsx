import { style } from '@mui/system';
import * as React from 'react';
import styles from "./styles.module.css"

const PageHeaderIcon = ({children}) => {
    return (
        <div className={styles.page_header_icon}>
            <div className={styles.page_header_icon__inner}>
                {children}
            </div>
        </div>
    )
}
export default PageHeaderIcon