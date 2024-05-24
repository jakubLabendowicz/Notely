import * as React from 'react';
import { Link } from "react-router-dom"
import axios from "axios"


// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import StarIcon from '@mui/icons-material/Star'
import StarHalfIcon from '@mui/icons-material/StarHalf'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add'
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';

import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import PageBody from '../../components/PageBody';
import PageFooter from '../../components/PageFooter';
import PageHeaderTitle from '../../components/PageHeaderTitle';
import PageHeaderSubtitle from '../../components/PageHeaderSubtitle';
import PageHeaderIcon from '../../components/PageHeaderIcon';
import AppBar from '../../components/Appbar';
import SideBar from '../../components/Sidebar';

import NoToDi from '../../components/NoToDi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
    // USE_STATE
    const [data, setData] = React.useState([])
    const [error, setError] = React.useState("")

    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalData, setModalData] = React.useState({});

    // HANDLERS
    const handleGetTracks = async () => {
        try {
            let userId = localStorage.getItem("userId")
            const url = "http://localhost:8080/api/tracks"
            const { data: res } = await axios.get(url, { params: { userId: userId } })
            console.log(res);
            setData(res.tracks)
            return res.tracks
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    const handlePostTrack = async (track) => {
        try {
            const url = "http://localhost:8080/api/tracks/"
            await axios.post(url, track)
            handleGetTracks()
            toast.success('Track added successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
                });
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    const handleDeleteTrack = async (id) => {
        try {
            const url = "http://localhost:8080/api/tracks/" + id
            await axios.delete(url)
            handleGetTracks()
            toast.success('Track deleted successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
                });
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    const handlePutTrack = async (track) => {
        try {
            const url = "http://localhost:8080/api/tracks/"
            await axios.put(url, track)
            handleGetTracks()
            toast.success('Track edited successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
                });
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    const handlePostSelfFavorite = async (id) => {
        try {
            let userId = localStorage.getItem("userId")
            const url = "http://localhost:8080/api/favorites"
            const favorite = {
                "userId": userId,
                "trackId": id
            }
            await axios.post(url, favorite)
            handleGetTracks()
            toast.success('Track added to favorites successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
                });
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    const handleDeleteSelfFavorite = async (id) => {
        try {
            let userId = localStorage.getItem("userId")
            const url = "http://localhost:8080/api/favorites"
            const favorite = {
                "userId": userId,
                "trackId": id
            }
            await axios.delete(url, { data: favorite } )
            handleGetTracks()
            toast.success('Track deleted from favorites successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
                });
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    const handleDeleteFavorite = async (id) => {
        try {
            const url = "http://localhost:8080/api/favorites"
            const favorite = {
                "userId": "all",
                "trackId": id
            }
            await axios.delete(url, { data: favorite } )
            handleGetTracks()
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        window.location.reload()
        window.location.replace("/")
    }

    const handleModalOpen = (data) => {
        setModalOpen(true);
        setModalData(data);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setModalData({});
    };

    const handleModalSave = (handleCRUD) => {
        setModalOpen(false);
        handleCRUD(modalData);
        setModalData({});
    };

    // USE_EFFECT
    React.useEffect(() => {
        handleGetTracks()
      }, []);

    // DOM
    return (
        <div className="Tracks">
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Searchify
                    </Typography>
                    {/* <Button color="inherit" href={'/'}>Tracks</Button>
                    <Button color="inherit" href={'/favorites'}>Favorites</Button> */}
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <SideBar>
                <Stack direction="column" alignItems="center" spacing={1}>
                    <IconButton aria-label="add" size="large" href={'/users/self'}>
                        <AccountCircleIcon />
                    </IconButton>
                    <IconButton aria-label="add" size="large" href={'/'}>
                        <MusicNoteIcon />
                    </IconButton>
                    <IconButton aria-label="add" size="large" href={'/users/self/favorites/all/tracks'}>
                        <StarIcon />
                    </IconButton>
                    <IconButton aria-label="add" size="large" href={'/users'}>
                        <GroupIcon />
                    </IconButton>
                </Stack>
            </SideBar>
            <Page>
                <PageHeader
                    icon= {
                        <PageHeaderIcon>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <MusicNoteIcon size="large"/>
                            </Stack>
                        </PageHeaderIcon>
                    }
                    title = {
                        <PageHeaderTitle title={"Tracks"}></PageHeaderTitle>
                    }
                    subtitle = {
                        <PageHeaderSubtitle subtitle={"All Records"}></PageHeaderSubtitle>
                    }
                    secondaryActions = {
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <IconButton aria-label="add" size="large" onClick={()=>{handleModalOpen({
                                                                                            "name": "",
                                                                                            "artists": "",
                                                                                            "previewUrl": "",
                                                                                            "popularity": 0,
                                                                                            "durationMs": 0,
                                                                                            "image": ""
                                                                                        })}}>
                                <AddIcon />
                            </IconButton>
                        </Stack>
                    }/>
                <PageBody>
                    {data.length != 0 ? 
                        <TableContainer component={Paper}>
                        <Table sx={{ width: 1 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Artists</TableCell>
                                    <TableCell>Popularity</TableCell>
                                    <TableCell>Duration (ms)</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {data.map((row) => (
                                <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row"><b>{row.name}</b></TableCell>
                                    <TableCell>{row.artists}</TableCell>
                                    <TableCell>{row.popularity}</TableCell>
                                    <TableCell>{row.durationMs}</TableCell>
                                    <TableCell align="right">
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Link to={'/tracks/' + row._id}>
                                                <IconButton aria-label="star" size="small">
                                                    <OpenInNewIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton aria-label="star" size="small" href={row.previewUrl}>
                                                <PlayArrowIcon />
                                            </IconButton>
                                            {row.favorite === true ? 
                                            <IconButton aria-label="star" size="small" onClick={()=>{handleDeleteSelfFavorite(row._id)}}>
                                                <StarIcon />
                                            </IconButton>         
                                            :
                                            <IconButton aria-label="star" size="small" onClick={()=>{handlePostSelfFavorite(row._id)}}>
                                                <StarHalfIcon />
                                            </IconButton>
                                            }
                                            
                                            <IconButton aria-label="edit" size="small" onClick={()=>{handleModalOpen(row)}}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete" size="small" onClick={()=>{handleDeleteTrack(row._id); handleDeleteFavorite(row._id)}}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer> : <NoToDi show={true}/>}
                </PageBody>
                <PageFooter></PageFooter>
            </Page>

            <Dialog open={modalOpen} onClose={handleModalClose} maxWidth='md' fullWidth={true}>
            {modalData._id == null ?
                <DialogTitle>Create</DialogTitle>
                :
                <DialogTitle>Edit</DialogTitle>
            }
                
                <DialogContent>
                    <Box
                    component="form"
                    sx={{'& .MuiTextField-root': { m: 2, width: 'calc(50% - 4ch)' }}}
                    noValidate
                    autoComplete="off"
                    >
                        <div>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name"
                                type="text"
                                // fullWidth
                                variant="standard"
                                defaultValue={modalData.name}
                                onChange={(event)=>{
                                    let tempData = modalData;
                                    tempData.name = event.target.value;
                                    setModalData(tempData)}}
                            />
                            <TextField
                                margin="dense"
                                id="artists"
                                label="Artists"
                                type="text"
                                // fullWidth
                                variant="standard"
                                defaultValue={modalData.artists}
                                onChange={(event)=>{
                                    let tempData = modalData;
                                    tempData.artists = event.target.value;
                                    setModalData(tempData)}}
                            />
                        </div>
                        <div>
                            <TextField
                                margin="dense"
                                id="durationMs"
                                label="Duration"
                                type="text"
                                // fullWidth
                                variant="standard"
                                defaultValue={modalData.durationMs}
                                onChange={(event)=>{
                                    let tempData = modalData;
                                    tempData.durationMs = event.target.value;
                                    setModalData(tempData)}}
                            />
                            <TextField
                                margin="dense"
                                id="popularity"
                                label="Popularity"
                                type="text"
                                // fullWidth
                                variant="standard"
                                defaultValue={modalData.popularity}
                                onChange={(event)=>{
                                    let tempData = modalData;
                                    tempData.popularity = event.target.value;
                                    setModalData(tempData)}}
                            />
                        </div>
                    </Box>
                    <Box
                    component="form"
                    sx={{'& .MuiTextField-root': { m: 2, width: 'calc(100% - 4ch)' }}}
                    noValidate
                    autoComplete="off"
                    >
                        <TextField
                                margin="dense"
                                id="previewUrl"
                                label="Preview Url"
                                type="url"
                                fullWidth
                                variant="standard"
                                defaultValue={modalData.previewUrl}
                                onChange={(event)=>{
                                    let tempData = modalData;
                                    tempData.previewUrl = event.target.value;
                                    setModalData(tempData)}}
                        />
                        <TextField
                            margin="dense"
                            id="image"
                            label="Image"
                            type="url"
                            fullWidth
                            variant="standard"
                            defaultValue={modalData.image}
                            onChange={(event)=>{
                                let tempData = modalData;
                                tempData.image = event.target.value;
                                setModalData(tempData)}}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose}>Cancel</Button>
                    {modalData._id == null ?
                    <Button onClick={()=>{handleModalSave(handlePostTrack)}}>Save</Button>
                    :
                    <Button onClick={()=>{handleModalSave(handlePutTrack)}}>Save</Button>
                    }
                </DialogActions>
            </Dialog>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
        </div>
    )
}
export default Main