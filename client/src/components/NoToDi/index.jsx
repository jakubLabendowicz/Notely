import { style } from '@mui/system';
import * as React from 'react';
import styles from "./styles.module.css"

import NoToDiIcon from '../../icons/NoToDi.png'

const NoToDi = ({show}) => {
    if(show) {
        return (
            <div className={styles.notodi}>
                <div className={styles.notodi__inner}>
                    <img src={NoToDiIcon} width={'500px'}></img>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.notodi}>
            </div>
        )
    }
}
export default NoToDi