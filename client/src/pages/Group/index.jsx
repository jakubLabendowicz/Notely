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
import { height } from '@mui/system';

const Group = () => {
    // USE_STATE
    const [data, setData] = React.useState([])
    const [error, setError] = React.useState("")

    // HANDLERS
    const handleGetUsersWithTracks = async () => {
        try {
            axios.get("http://localhost:8080/api/users")
            .then(users_res => {
                // let usersWithFavorites = {
                //     success: users_res.data.success,
                //     message: users_res.data.message,
                //     users: []
                // }
                // for(let user of users_res.data.users){
                //     axios.get("http://localhost:8080/api/users/"+user._id+"/favorites")
                //     .then(favorites_res => {
                //         let userWithFavorites = {
                //             _id: user._id,
                //             firstName: user.firstName,
                //             lastName: user.lastName,
                //             email: user.email,
                //             password: user.password,
                //             __v: user.__v,
                //             favorites: favorites_res.data.favorites
                //         }
                //         usersWithFavorites.users.push(userWithFavorites)
                //     })
                // };
                setData(users_res.data.users)
            })
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
        handleGetUsersWithTracks()
        // setData([
        //     {
        //         "_id": "628fd14955ebc14329e62127",
        //         "firstName": "Jakub",
        //         "lastName": "Łabendowicz",
        //         "email": "jalabendowicz@gmail.com",
        //         "password": "$2b$10$fQiztGR7tzz0YIpuuNRN1OLvHCI1bNhj3ZI/n2cJi2Cw1uEVkWyca",
        //         "__v": 0,
        //         "favorites": [
        //             {
        //                 "_id": "629865fee904cda358aecf3c",
        //                 "userId": "628fd14955ebc14329e62127",
        //                 "trackId": "629865a5e904cda358aece96",
        //                 "__v": 0,
        //                 "track": {
        //                     "_id": "629865a5e904cda358aece96",
        //                     "name": "The River",
        //                     "artists": "Ochman",
        //                     "previewUrl": "https://p.scdn.co/mp3-preview/11a6fd9853c68e4f0ce88a39fc0b7b0325db4e70?cid=95fc4b149fdf4874b4bdfa4aaf926bf0",
        //                     "popularity": "54",
        //                     "durationMs": "156190",
        //                     "image": "https://i.scdn.co/image/ab67616d0000b273800d5a8211179547ebc57329",
        //                     "__v": 0
        //                 }
        //             },
        //             {
        //                 "_id": "629865ffe904cda358aecf46",
        //                 "userId": "628fd14955ebc14329e62127",
        //                 "trackId": "629865a7e904cda358aece9a",
        //                 "__v": 0,
        //                 "track": {
        //                     "_id": "629865a7e904cda358aece9a",
        //                     "name": "The River",
        //                     "artists": "Ochman",
        //                     "previewUrl": "https://p.scdn.co/mp3-preview/11a6fd9853c68e4f0ce88a39fc0b7b0325db4e70?cid=95fc4b149fdf4874b4bdfa4aaf926bf0",
        //                     "popularity": "54",
        //                     "durationMs": "156190",
        //                     "image": "https://i.scdn.co/image/ab67616d0000b273800d5a8211179547ebc57329",
        //                     "__v": 0
        //                 }
        //             }
        //         ]
        //     },
        //     {
        //         "_id": "62964dbf63a27ad2e0bb471a",
        //         "firstName": "admin",
        //         "lastName": "admin",
        //         "email": "admin@admin.com",
        //         "password": "$2b$10$4uT2IqP57oMl.j7D/1cKK.KWY6i34Tb5Wykjhd6awb5lSJs3FM3We",
        //         "__v": 0,
        //         "favorites": []
        //     },
        //     {
        //         "_id": "62967df2b64742c2e3bd4301",
        //         "firstName": "Mateusz",
        //         "lastName": "Pielak",
        //         "email": "mateusz.piekak02@gmail.com",
        //         "password": "$2b$10$dLvljewfPKsiDJ/QN1KeDeLPr3/OwOHUj0MpQZbU3atqFkq/0fM4u",
        //         "__v": 0,
        //         "favorites": []
        //     }
        // ])
      }, []);

      console.log(data);

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
                                <GroupIcon size="large"/>
                            </Stack>
                        </PageHeaderIcon>
                    }
                    title = {
                        <PageHeaderTitle title={"Users"}></PageHeaderTitle>
                    }
                    subtitle = {
                        <PageHeaderSubtitle subtitle={"And Favorites Tracks"}></PageHeaderSubtitle>
                    }/>
                <PageBody>
                    {data.length != 0 ? 
                        data.map((user) => (
                        <div>
                            <TableContainer component={Paper}>
                            <Table sx={{ width: 1 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                        <TableCell>{user.firstName}</TableCell>
                                        <TableCell>{user.lastName}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Artists</TableCell>
                                        <TableCell>Popularity</TableCell>
                                        <TableCell>Duration (ms)</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user.favorites.map((favorite) => (
                                    <TableRow
                                    key={favorite.track._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row"><b>{favorite.track.name}</b></TableCell>
                                        <TableCell>{favorite.track.artists}</TableCell>
                                        <TableCell>{favorite.track.popularity}</TableCell>
                                        <TableCell>{favorite.track.durationMs}</TableCell>
                                        <TableCell align="right">
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Link to={'/tracks/' + favorite.track._id}>
                                                    <IconButton aria-label="star" size="small">
                                                        <OpenInNewIcon />
                                                    </IconButton>
                                                </Link>
                                                <IconButton aria-label="star" size="small" href={favorite.track.previewUrl}>
                                                    <PlayArrowIcon />
                                                </IconButton>
                                                <IconButton aria-label="star" size="small">
                                                    <StarIcon />
                                                </IconButton>         
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div style={{"padding": "30px"}}></div>
                    </div>
                    ))
                    : <NoToDi show={true}/>}
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
export default Group