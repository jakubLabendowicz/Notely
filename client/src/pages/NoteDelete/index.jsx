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
import { deleteOneNote, selectOneNote } from '../../api/Api';
import { Breadcrumbs, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NotesIcon from '@mui/icons-material/Notes';

const UserView = () => {
    let { noteId } = useParams();
    let [note, setNote] = React.useState({});

    React.useEffect(() => {
        selectOneNote(noteId).then((response) => {
            setNote(response.data);
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    return (
        <>
            <Page>
                <PageHeader
                    backAddress={'/notes/' + noteId}
                    breadcrumbs={
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link to={"/"}>Home</Link>
                            <Link to={"/notes"}>Notes</Link>
                            <Link to={"/notes/" + noteId}>{note.title}</Link>
                            <Typography color="text.primary">Delete</Typography>
                        </Breadcrumbs>
                    }
                    icon= {
                        <PageHeaderIcon color={note.color}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <NotesIcon size="large"/>
                            </Stack>
                        </PageHeaderIcon>
                    }
                    title = {
                        <PageHeaderTitle title={note.title}></PageHeaderTitle>
                    }/>
                <PageBody>
                    <TableContainer component={Paper}>
                        <Table sx={{ width: 1 }} aria-label="simple table">
                            <TableBody>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <b>Do you really want to delete this note?</b>
                                    </TableCell>
                                    <TableCell align="right" >
                                        <IconButton aria-label="delete" size="small" onClick={() => deleteOneNote(noteId).then((response) => { window.location = '/notes' })}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PageBody>
                <PageFooter></PageFooter>
            </Page>
        </>
    )
}
export default UserView