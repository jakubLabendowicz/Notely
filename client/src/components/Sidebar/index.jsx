import * as React from 'react';
import styles from "./styles.module.css"
import { IconButton, Stack } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import NotesIcon from '@mui/icons-material/Notes';

const SideBar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar__inner}>
                <Stack direction="column" alignItems="center" spacing={1}>
                    <IconButton size="large" href={'/notes'}>
                        <NotesIcon />
                    </IconButton>
                    <IconButton size="large" href={'/users'}>
                        <GroupIcon />
                    </IconButton>
                    <IconButton size="large" href={'/users/me'}>
                        <AccountCircleIcon />
                    </IconButton>
                </Stack>
            </div>
        </div>
    )
}
export default SideBar