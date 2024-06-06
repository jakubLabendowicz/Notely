import * as React from 'react';
import styles from "./styles.module.css"
import { Button, Toolbar, Typography } from '@mui/material';
import { revoke } from '../../api/Api';
import NotesIcon from '@mui/icons-material/Notes';
import BoltIcon from '@mui/icons-material/Bolt';
import CasinoIcon from '@mui/icons-material/Casino';

const AppBar = () => {
    return (
        <div className={styles.appbar}>
            <div className={styles.appbar__inner}>
                <Toolbar>
                    <div style={{ width: 36, height: 36, backgroundColor: "#ffb300", borderRadius: 6, display: "flex", justifyContent: "center", alignItems: "center", marginRight: 10}}>
                        <CasinoIcon size="medium" style={{ color: "#ffffff" }} />
                    </div>
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