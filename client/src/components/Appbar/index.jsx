import * as React from 'react';
import styles from "./styles.module.css"
import { Button, Toolbar, Typography } from '@mui/material';
import { revoke } from '../../api/Api';

const AppBar = () => {
    return (
        <div className={styles.appbar}>
            <div className={styles.appbar__inner}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Notely
                    </Typography>
                    <Button color="inherit" onClick={revoke}>Logout</Button>
                </Toolbar>
            </div>
        </div>
    )
}
export default AppBar