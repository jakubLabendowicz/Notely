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
import { deleteOneUser, selectOneUser } from '../../api/Api';
import { Breadcrumbs, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
                            <Typography color="text.primary">Delete</Typography>
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
                    }/>
                <PageBody>
                    <TableContainer component={Paper}>
                        <Table sx={{ width: 1 }} aria-label="simple table">
                            <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <b>Do you really want to delete this user?</b>
                                </TableCell>
                                <TableCell align="right" >
                                    <IconButton aria-label="delete" size="small" onClick={() => deleteOneUser(userId).then((response) => { window.location = '/users' })}>
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