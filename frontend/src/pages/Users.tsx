import React from 'react';
import { Box, MenuItem, Typography } from '@mui/material';
import UsersTable, { User, UserType } from '../components/UsersTable';
import { deleteFetch, getFetch, postFetch, putFetch } from '../api';

import AlertDialog from '../components/AlertDialog';
import Button from '../components/Button';
import Link from '../components/Link';
import LinkCopy from '../components/LinkCopy';
import Spin from '../components/Spin';
import { TextField } from '../components/TextField';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

interface UsersProps {
    pageType: UserType;
}

interface AlertDialogState {
    type: 'info' | 'error';
    title: string;
    message: string | JSX.Element;
}

const StyledBox = styled(Box)`
    display: flex;
    align-items: center;
    column-gap: 20px;
    margin-bottom: 20px;
`;

const MemoUsersTable = React.memo(UsersTable);

function postAddUser(userId: string, name: string, typeId: UserType) {
    return postFetch(userId, { name, typeId }, '/user');
}

function postDeleteUser(userId: string, u: User) {
    return deleteFetch(userId, '/user/' + u.id);
}

function postUpdateUser(userId: string, u: User) {
    return putFetch(
        userId,
        { name: u.name, typeId: u.typeId },
        '/user/' + u.id
    );
}

function loadList(userId: string, page: number, size: number) {
    let query = '';
    if (isFinite(page)) {
        query += '&page=' + page;
    }

    if (isFinite(size)) {
        query += '&size=' + size;
    }

    if (query) {
        query = query.replace('&', '?');
    }

    return getFetch(userId, '/user/list' + query);
}

const initEditedUser: User = { name: '', typeId: UserType.Null };

const initUsers: User[] = [];

const userTypes = [
    {
        value: UserType.Doctor,
        label: 'Doctor',
    },
    {
        value: UserType.Admin,
        label: 'Admin',
    },
];

const sx = { minWidth: 150 };

export default function Users(props: UsersProps) {
    const titleLower = props.pageType === UserType.Doctor ? 'patient' : 'user';
    const titleUpper = props.pageType === UserType.Doctor ? 'Patient' : 'User';

    const nameInputRef = React.useRef(null);

    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [rowsTotal, setRowsTotal] = React.useState(0);

    const [editedUser, setEditedUser] = React.useState(initEditedUser);

    const [alertDialog, setAlert] = React.useState<AlertDialogState>();

    const [users, setUsers] = React.useState(initUsers);

    const [isLoading, setLoading] = React.useState(false);

    const [isUserLoading, setUserLoading] = React.useState(false);

    const location = useLocation();
    const userId = location.state?.id || '';

    React.useEffect(() => {
        if (!userId) return;
        //Prevents displaying progress in case of quick loading
        const loadingTimer = setTimeout(() => setLoading(true), 1000);

        const updateUsers = (
            u: User[],
            p: number,
            rpp: number,
            total: number
        ) => {
            setUsers(u);
            setPage(p);
            setRowsPerPage(rpp);
            setRowsTotal(total);
            clearTimeout(loadingTimer);
            setLoading(false);
        };

        loadList(userId, page, rowsPerPage)
            .then((r) => updateUsers(r.list, r.page, r.size, r.total))
            .catch((e) => {
                setAlert({
                    type: 'error',
                    title: `Unable to load ${titleLower}s`,
                    message: `${e.name}: ${e.message}`,
                });
                updateUsers([], 0, rowsPerPage, 0);
            });
    }, [page, rowsPerPage, userId, titleLower]);

    const handleChangePage = React.useCallback((event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = React.useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, []);

    const removeUser = React.useCallback((u: User) => {
        if (!u.id) {
            return;
        }

        setUserLoading(true);
        postDeleteUser(userId, u)
            .then((r) => {
                setAlert({
                    type: 'info',
                    title: 'Message',
                    message: `${titleUpper} was removed successfully`,
                });

                setUsers(users.filter(user => u.id !== user.id));
            })
            .catch((e) => {
                setAlert({
                    type: 'error',
                    title: `Unable to remove ${titleLower}`,
                    message: e.message,
                });
            })
            .finally(() => setUserLoading(false));
    }, [users, userId, titleLower, titleUpper]);

    const addUser = React.useCallback((u: User) => {
        setUserLoading(true);
        postAddUser(userId, u.name, u.typeId)
            .then((r) => {
                setAlert({
                    type: 'info',
                    title: 'Message',
                    message: <>
                        <Box>{titleUpper} was added successfully</Box>
                        <Box>
                            Link:{' '}
                            <LinkCopy to={'/report/' + r.uuid}>{r.uuid}</LinkCopy>
                        </Box>
                    </>,
                });

                setUsers([r, ...users]);
            })
            .catch((e) => {
                setAlert({
                    type: 'error',
                    title: `Unable to add ${titleLower}`,
                    message: e.message,
                });
            })
            .finally(() => setUserLoading(false));
    }, [users, userId, titleLower, titleUpper]);

    const saveUser = React.useCallback((u: User) => {
        setUserLoading(true);
        postUpdateUser(userId, u)
            .then((r) => {
                if (u.row) {
                    u.row.id = r.id;
                    u.row.name = r.name;
                    u.row.typeId = r.typeId;
                    u.row.uuid = r.uuid;
                }
                setAlert({
                    type: 'info',
                    title: 'Message',
                    message: `${titleUpper} was saved successfully`,
                });
            })
            .catch((e) => {
                setAlert({
                    type: 'error',
                    title: `Unable to save ${titleLower} data`,
                    message: `${e.name}: ${e.message}`,
                });
            })
            .finally(() => setUserLoading(false));
    }, [userId, titleLower, titleUpper]);

    const handleSave = React.useCallback(() => saveUser(editedUser), [saveUser, editedUser]);
    const handleAdd = React.useCallback(() => addUser(editedUser), [addUser, editedUser]);
    const handleCancel = React.useCallback(() => setEditedUser(initEditedUser), [setEditedUser]);

    const handleChangeType = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedUser({ ...editedUser, typeId: parseInt(event.target.value) });
    }, [editedUser, setEditedUser]);

    const handleChangeName = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedUser({ ...editedUser, name: event.target.value });
    }, [editedUser, setEditedUser]);

    const onAlertClose = React.useCallback((event: React.MouseEvent, reason: string) => {
        if (
            alertDialog?.type !== 'info' &&
            (reason === 'backdropClick' || reason === 'escapeKeyDown')
        ) {
            return;
        }
        setAlert(undefined);
    }, [alertDialog]);

    const onKeyDown = React.useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            if (editedUser.id) {
                saveUser(editedUser);
            } else {
                addUser(editedUser);
            }
            event.stopPropagation();
        }
    }, [editedUser, addUser, saveUser])

    const isAdmin = props.pageType === UserType.Admin;

    const saveDisabled = isUserLoading || (editedUser.row &&
        editedUser.row.name === editedUser.name &&
        editedUser.row.typeId === editedUser.typeId);

    const addDisabled = isUserLoading || !editedUser.name || (isAdmin && !editedUser.typeId);

    const editUser = React.useCallback((u: User) => {
        if (nameInputRef.current) {
            (nameInputRef.current as HTMLInputElement).focus();
        }

        setEditedUser(u);
    }, []);

    return <>
        <Typography variant='h2'>{titleUpper}s</Typography>
        {isLoading && <Spin />}
        {alertDialog && (
            <AlertDialog
                type={alertDialog.type}
                title={alertDialog.title}
                onClose={onAlertClose}
            >
                {alertDialog.message}
            </AlertDialog>
        )}
        <StyledBox>
            <TextField
                inputRef={nameInputRef}
                sx={sx}
                label='Name'
                variant='outlined'
                value={editedUser.name}
                onChange={handleChangeName}
                disabled={isUserLoading}
                onKeyDown={onKeyDown}
            />
            {isAdmin && <TextField
                sx={sx}
                select
                label='Type'
                value={editedUser.typeId || ''}
                onChange={handleChangeType}
                disabled={isUserLoading}
            >
                {userTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>}
            {editedUser.id ? (
                <>
                    <Button
                        disabled={saveDisabled}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                    <Button
                        disabled={isUserLoading}
                        onClick={handleCancel}>
                        Cancel
                    </Button>
                </>
            ) : (
                <Button
                    disabled={addDisabled}
                    onClick={handleAdd}
                >
                    Add {titleLower}
                </Button>
            )}
        </StyledBox>
        {!isAdmin && <Typography variant='h3'><Link to={`/report/${userId}`}>Reports</Link></Typography>}
        <MemoUsersTable
            userId={userId}
            users={users}
            showType={isAdmin}
            actionsDisabled={isUserLoading}
            page={page}
            rowsTotal={rowsTotal}
            rowsPerPage={rowsPerPage}
            editUser={editUser}
            removeUser={removeUser}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </>;
}
