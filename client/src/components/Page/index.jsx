import * as React from 'react';
import styles from "./styles.module.css"
import AppBar from '../Appbar';
import SideBar from '../Sidebar';

const Page = ({children}) => {
    return (
        <>
            <AppBar/>
            <SideBar/>
            <div className={styles.page}>
                <div className={styles.page__inner}>
                    {children}
                </div>
            </div>
        </>
    )
}
export default Page