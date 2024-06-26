import * as React from 'react';
import styles from "./styles.module.css"
import { IconButton, Stack} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PageHeader = ({backAddress, breadcrumbs, icon, title, subtitle, primaryActions, secondaryActions}) => {
    return (
        <div className={styles.page_header}>
            <div className={styles.page_header__inner}>
                <div className={styles.page_header__breadcrumbs} style={{display: 'flex', alignItems: 'center', gap: 25}}>
                    {backAddress &&
                        <div className={styles.page_header__adress}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Link to={backAddress} onClick={() => window.location = backAddress}>
                                    <IconButton aria-label="back" size="small">
                                            <ArrowBackIcon />
                                        </IconButton>
                                    </Link>
                                </Stack>
                        </div>
                    }
                    <div>
                        {breadcrumbs}
                    </div>
                </div>
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
            </div>
        </div>
    )
}
export default PageHeader