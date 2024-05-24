import { style } from '@mui/system';
import * as React from 'react';
import styles from "./styles.module.css"

const PageHeader = ({icon, title, subtitle, primaryActions, secondaryActions, tabs}) => {
    return (
        <div className={styles.page_header}>
            <div className={styles.page_header__inner}>
                <div className={styles.page_header__top}>
                    <div className={styles.page_header__box}>
                        {icon}
                        <div className={styles.page_header_titles}>
                            <div className={styles.page_header_titles__inner}>
                                {title} {subtitle}
                            </div>
                        </div>
                        {primaryActions}
                    </div>
                    <div className={styles.page_header__box}>
                        {secondaryActions}
                    </div>
                </div>
                <div className={styles.page_header__bottom}>
                    <div className={styles.page_header__box}>
                        {tabs}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PageHeader