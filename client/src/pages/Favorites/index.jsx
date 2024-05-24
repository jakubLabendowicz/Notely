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

import StarIcon from '@mui/icons-material/Star'
import GradeIcon from '@mui/icons-material/Grade'

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

const Favorites = () => {
    // USE_STATE
    const [data, setData] = React.useState([])
    const [error, setError] = React.useState("")

    // HANDLERS
    const handleGetSelfFavoritesTracks = async () => {
        try {
            let userId = localStorage.getItem("userId")
            const url = "http://localhost:8080/api/users/"+userId+"/favorites"
            const { data: res } = await axios.get(url)
            setData(res.favorites)
            console.log(res);
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
            handleGetSelfFavoritesTracks()
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

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        window.location.reload()
        window.location.replace("/")
    }

    // USE_EFFECT
    React.useEffect(() => {
        handleGetSelfFavoritesTracks()
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
                                <StarIcon size="large"/>
                            </Stack>
                        </PageHeaderIcon>
                    }
                    title = {
                        <PageHeaderTitle title={"Favorites"}></PageHeaderTitle>
                    }
                    subtitle = {
                        <PageHeaderSubtitle subtitle={"Your Favorites Tracks"}></PageHeaderSubtitle>
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
                                key={row.track._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row"><b>{row.track.name}</b></TableCell>
                                    <TableCell>{row.track.artists}</TableCell>
                                    <TableCell>{row.track.popularity}</TableCell>
                                    <TableCell>{row.track.durationMs}</TableCell>
                                    <TableCell align="right">
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Link to={'/tracks/' + row.track._id}>
                                                <IconButton aria-label="star" size="small">
                                                    <OpenInNewIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton aria-label="star" size="small" href={row.track.previewUrl}>
                                                <PlayArrowIcon />
                                            </IconButton>
                                            <IconButton aria-label="star" size="small" onClick={()=>{handleDeleteSelfFavorite(row.trackId)}}>
                                                <StarIcon />
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
export default Favorites