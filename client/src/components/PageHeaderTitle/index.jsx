import { style } from '@mui/system';
import * as React from 'react';
import styles from "./styles.module.css"

const PageHeaderTitle = ({title}) => {
    return (
        <div className={styles.page_header_title}>
            <div className={styles.page_header_title__inner}>
                {title}
            </div>
        </div>
    )
}
export default PageHeaderTitle