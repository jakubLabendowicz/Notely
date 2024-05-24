import { style } from '@mui/system';
import * as React from 'react';
import styles from "./styles.module.css"

const PageHeaderSubtitle = ({subtitle}) => {
    return (
        <div className={styles.page_header_subtitle}>
            <div className={styles.page_header_subtitle__inner}>
                {subtitle}
            </div>
        </div>
    )
}
export default PageHeaderSubtitle