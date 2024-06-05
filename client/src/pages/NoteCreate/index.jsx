import * as React from 'react';
import { Link, useParams } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import PageBody from '../../components/PageBody';
import PageFooter from '../../components/PageFooter';
import PageHeaderTitle from '../../components/PageHeaderTitle';
import PageHeaderSubtitle from '../../components/PageHeaderSubtitle';
import PageHeaderIcon from '../../components/PageHeaderIcon';
import { selectOneNote } from '../../api/Api';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NotesIcon from '@mui/icons-material/Notes';
import SaveIcon from '@mui/icons-material/Save';

const UserView = () => {
    return (
        <>
            <Page>
                <PageHeader
                    backAddress={'/notes'}
                    icon= {
                        <PageHeaderIcon>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <NotesIcon size="large"/>
                            </Stack>
                        </PageHeaderIcon>
                    }
                    title = {
                        <PageHeaderTitle title="Note"></PageHeaderTitle>
                    }
                    subtitle = {
                        <PageHeaderSubtitle subtitle="Create"></PageHeaderSubtitle>
                    } 
                    secondaryActions = {
                        <Stack direction="row" alignItems="center" spacing={1}>
                            
                            <Link to={'/notes'}>
                                <IconButton aria-label="star" size="small">
                                    <SaveIcon />
                                </IconButton>
                            </Link>
                        </Stack>
                    }/>
                <PageBody>
                    {/* <TableContainer component={Paper}>
                        <Table sx={{ width: 1 }} aria-label="simple table">
                            <TableBody>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {note.content}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer> */}
                </PageBody>
                <PageFooter></PageFooter>
            </Page>
        </>
    )
}
export default UserView