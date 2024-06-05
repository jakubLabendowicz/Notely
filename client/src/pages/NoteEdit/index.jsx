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
import { selectOneNote, updateOneNote } from '../../api/Api';
import { Breadcrumbs, IconButton, Input, TextField, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import NotesIcon from '@mui/icons-material/Notes';
import { MuiColorInput } from 'mui-color-input'

const UserView = () => {
    let { noteId } = useParams();
    let [note, setNote] = React.useState({});

    React.useEffect(() => {
        console.log("useEffect");
        selectOneNote(noteId).then((response) => {
            setNote(response.data);
        }).catch((error) => {
            console.log(error)
        })
    }, noteId);

    let updateNote = () => {
        let updatedNote = {
            title: note.title,
            content: note.content,
            color: note.color
        }
        console.log(updatedNote);
        updateOneNote(noteId, updatedNote).then((response) => {
            console.log(response)
            window.location = '/notes/' + noteId
        }).catch((error) => {
            console.log(error)
        })
    }

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
                            <Typography color="text.primary">Edit</Typography>
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
                        <Input value={note.title} onChange={(e) => {setNote({...note, title: e.target.value});}} style={{fontSize: 40, fontWeight: 700}}/>
                    }
                    secondaryActions = {
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <div onClick={updateNote}>
                                <IconButton aria-label="star" size="small">
                                    <SaveIcon />
                                </IconButton>
                            </div>
                        </Stack>
                    }/>
                <PageBody>
                    <TableContainer component={Paper}>
                        <Table sx={{ width: 1 }} aria-label="simple table">
                            <TableBody>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <MuiColorInput format="hex" value={note.color} onChange={(e) => {setNote({...note, color: e});}} />
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <Input value={note.content} onChange={(e) => {setNote({...note, content: e.target.value});}} fullWidth multiline={true}/>
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