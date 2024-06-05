import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack'
import GroupIcon from '@mui/icons-material/Group';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import PageBody from '../../components/PageBody';
import PageFooter from '../../components/PageFooter';
import PageHeaderTitle from '../../components/PageHeaderTitle';
import PageHeaderSubtitle from '../../components/PageHeaderSubtitle';
import PageHeaderIcon from '../../components/PageHeaderIcon';
import NoToDi from '../../components/NoToDi';
import { archiveOneNote, selectManyNotes, unarchiveOneNote } from '../../api/Api';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NotesIcon from '@mui/icons-material/Notes';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';

const NoteList = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const search = searchParams.get('search') || '';
    const archived = searchParams.get('archived') || 'false';

    const [notes, setNotes] = React.useState([])

    const getNotes = () => {
        selectManyNotes('?search=' + search + '&archived=' + archived + '').then((response) => {
            setNotes(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    React.useEffect(() => {
        getNotes()
    }, []);

    return (
        <>
            <Page>
                <PageHeader
                    backAddress={'/'}
                    icon= {
                        <PageHeaderIcon>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <NotesIcon size="large"/>
                            </Stack>
                        </PageHeaderIcon>
                    }
                    title = {
                        <PageHeaderTitle title={archived === 'true' ? "Archived Notes" : "Notes"}></PageHeaderTitle>
                    }
                    subtitle = {
                        <PageHeaderSubtitle subtitle={"List: " + notes.length}></PageHeaderSubtitle>
                    }
                    secondaryActions = {
                        <Stack direction="row" alignItems="center" spacing={1}>
                            {archived === 'false' && 
                                <Link to={'/notes?archived=true'} onClick={() => window.location = '/notes?archived=true'}>
                                    <IconButton aria-label="star" size="small">
                                        <ArchiveIcon />
                                    </IconButton>
                                </Link>
                            }
                            {archived === 'true' && 
                                <Link to={'/notes?archived=false'} onClick={() => window.location = '/notes?archived=false'}>
                                    <IconButton aria-label="star" size="small">
                                        <UnarchiveIcon />
                                    </IconButton>
                                </Link>
                            }
                            <Link to={'/notes/create'}>
                                <IconButton aria-label="star" size="small">
                                    <AddIcon />
                                </IconButton>
                            </Link>
                        </Stack>
                    }/>
                <PageBody>
                    {notes.length === 0 ? <NoToDi /> :
                        <TableContainer component={Paper}>
                            <Table sx={{ width: 1 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Title</b></TableCell>
                                        <TableCell><b>Color</b></TableCell>
                                        <TableCell><b>Content</b></TableCell>
                                        <TableCell><b>Actions</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {notes.map((note) => (
                                    <TableRow
                                        key={note._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">{note.title}</TableCell>
                                        <TableCell component="th" scope="row">
                                            <div style={{width: 25, height: 25, backgroundColor: note.color, borderRadius: 5}}/>
                                        </TableCell>
                                        <TableCell>{note.content}</TableCell>
                                        <TableCell>
                                            <Stack direction="row">
                                                <Link to={'/notes/' + note._id}>
                                                    <IconButton aria-label="star" size="small">
                                                        <OpenInNewIcon />
                                                    </IconButton>
                                                </Link>
                                                <Link to={'/notes/' + note._id + '/edit'}>
                                                    <IconButton aria-label="star" size="small">
                                                        <EditIcon />
                                                    </IconButton>
                                                </Link>
                                                {note.isArchived ? 
                                                    <div onClick={()=>{unarchiveOneNote(note._id).then(()=>{getNotes()})}}>
                                                        <IconButton aria-label="star" size="small">
                                                            <UnarchiveIcon />
                                                        </IconButton>
                                                    </div>
                                                :
                                                    <div onClick={()=>{archiveOneNote(note._id).then(()=>{getNotes()})}}>
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
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </PageBody>
                <PageFooter></PageFooter>
            </Page>
        </>
    )
}
export default NoteList