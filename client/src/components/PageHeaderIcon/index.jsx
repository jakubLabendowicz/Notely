import { style } from '@mui/system';
import * as React from 'react';
import styles from "./styles.module.css"

const PageHeaderIcon = ({color, children}) => {
    return (
        <div className={styles.page_header_icon} style={{backgroundColor: color}}>
            <div className={styles.page_header_icon__inner}>
                {children}
            </div>
        </div>
    )
}
export default PageHeaderIcon