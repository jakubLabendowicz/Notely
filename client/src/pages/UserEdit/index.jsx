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
import { selectOneUser } from '../../api/Api';
import { IconButton } from '@mui/material';
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

    return (
        <>
            <Page>
                <PageHeader
                    backAddress={'/users/' + user._id}
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
                    subtitle = {
                        <PageHeaderSubtitle subtitle="Edit"></PageHeaderSubtitle>
                    }
                    secondaryActions = {
                        <Stack direction="row" alignItems="center" spacing={1}>
                            
                            <Link to={'/users/' + user._id}>
                                <IconButton aria-label="star" size="small">
                                    <SaveIcon />
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
                                        {user.firstName}
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {user.lastName}
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {user.email}
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