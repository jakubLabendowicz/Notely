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
import { selectOneUser, updateOneUser } from '../../api/Api';
import { Breadcrumbs, IconButton, Input, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const UserView = () => {
    let { userId } = useParams();
    let [user, setUser] = React.useState({});

    React.useEffect(() => {
        selectOneUser(userId).then((response) => {
            setUser(response.data);
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    let updateUser = () => {
        let updatedUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
        updateOneUser(userId, updatedUser).then((response) => {
            console.log(response)
            window.location = '/users/' + userId
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <Page>
                <PageHeader
                    backAddress={'/users/' + user._id}
                    breadcrumbs={
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link to={"/"}>Home</Link>
                            <Link to={"/users"}>Users</Link>
                            <Link to={"/users/" + user._id}>{user.firstName + " " + user.lastName}</Link>
                            <Typography color="text.primary">Edit</Typography>
                        </Breadcrumbs>
                    }
                    icon= {
                        <PageHeaderIcon>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <AccountCircleIcon size="large"/>
                            </Stack>
                        </PageHeaderIcon>
                    }
                    title = {
                        <PageHeaderTitle title={user.firstName + " " + user.lastName}></PageHeaderTitle>
                    }
                    secondaryActions = {
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <div onClick={updateUser}>
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
                                        <Input placeholder='First Name' value={user.firstName} onChange={(e) => {setUser({...user, firstName: e.target.value});}} fullWidth/>
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <Input placeholder='Last Name' value={user.lastName} onChange={(e) => {setUser({...user, lastName: e.target.value});}} fullWidth/>
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <Input placeholder='Email' value={user.email} onChange={(e) => {setUser({...user, email: e.target.value});}} fullWidth/>
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