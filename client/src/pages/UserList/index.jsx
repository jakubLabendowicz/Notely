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
import { selectManyUsers } from '../../api/Api';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserList = () => {
    const [users, setUsers] = React.useState([])

    React.useEffect(() => {
        selectManyUsers().then((response) => {
            setUsers(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    return (
        <>
            <Page>
                <PageHeader
                    backAddress={'/'}
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
                        <PageHeaderSubtitle subtitle={"List: " + users.length}></PageHeaderSubtitle>
                    }/>
                <PageBody>
                    {users.length === 0 ? <NoToDi /> :
                        <TableContainer component={Paper}>
                            <Table sx={{ width: 1 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>First Name</b></TableCell>
                                        <TableCell><b>Last Name</b></TableCell>
                                        <TableCell><b>Email</b></TableCell>
                                        <TableCell><b>Actions</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user) => (
                                    <TableRow
                                        key={user._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">{user.firstName}</TableCell>
                                        <TableCell>{user.lastName}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Stack direction="row">
                                                <Link to={'/users/' + user._id}>
                                                    <IconButton aria-label="star" size="small">
                                                        <OpenInNewIcon />
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
export default UserList