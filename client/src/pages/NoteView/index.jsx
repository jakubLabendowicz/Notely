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
import { archiveOneNote, selectOneNote, summarizeOneNote, unarchiveOneNote } from '../../api/Api';
import { Breadcrumbs, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NotesIcon from '@mui/icons-material/Notes';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';

const UserView = () => {
    let { noteId } = useParams();
    let [note, setNote] = React.useState({});
    let [summary, setSummary] = React.useState("");

    let getNote = () => {
        selectOneNote(noteId).then((response) => {
            setNote(response.data);
        }).catch((error) => {
            console.log(error)
        });
    }

    React.useEffect(() => {
        getNote();
        summarizeOneNote(noteId).then((response) => {
            setSummary(response.data);
        }).catch((error) => {
            console.log(error)
        });
    }, noteId);

    return (
        <>
            <Page>
                <PageHeader
                    backAddress={'/notes'}
                    breadcrumbs={
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link to={"/"}>Home</Link>
                            <Link to={"/notes"}>Notes</Link>
                            <Typography color="text.primary">{note.title}</Typography>
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
                    }
                    secondaryActions = {
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Link to={'/notes/' + note._id + '/edit'}>
                                <IconButton aria-label="star" size="small">
                                    <EditIcon />
                                </IconButton>
                            </Link>
                            {note.isArchived ? 
                                <div onClick={()=>{unarchiveOneNote(note._id).then(()=>{getNote()})}}>
                                    <IconButton aria-label="star" size="small">
                                        <UnarchiveIcon />
                                    </IconButton>
                                </div>
                            :
                                <div onClick={()=>{archiveOneNote(note._id).then(()=>{getNote()})}}>
                                    <IconButton aria-label="star" size="small">
                                        <ArchiveIcon />
                                    </IconButton>
                                </div>
                            }
                            <Link to={'/notes/' + note._id + '/delete'}>
                                <IconButton aria-label="star" size="small">
                                    <DeleteIcon />
                                </IconButton>
                            </Link>
                        </Stack>
                    }/>
                <PageBody>
                    <TableContainer component={Paper}>
                        <Table sx={{ width: 1 }} aria-label="simple table">
                            <TableBody>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {note.content}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br></br><br></br>
                    <TableContainer component={Paper}>
                        <Table sx={{ width: 1 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>AI Summary</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {summary}
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