import { style } from '@mui/system';
import * as React from 'react';
import styles from "./styles.module.css"

const PageFooter = ({children}) => {
    return (
        <div className={styles.page_footer}>
            <div className={styles.page_footer__inner}>
                {children}
            </div>
        </div>
    )
}
export default PageFooter