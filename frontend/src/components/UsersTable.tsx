import {
    Table,
    TableBody,
    TableContainer,
    TableFooter,
    TableRow,
} from '@mui/material';
import {
    TableCell,
    TableCellFirstColumn,
    TableCellHeader,
    TableHead,
    TablePagination,
} from './Table';

import EditButton from '../components/EditButton';
import Link from './Link';
import LinkCopy from '../components/LinkCopy';
import RemoveButton from '../components/RemoveButton';

export enum UserType {
    Null = 0,
    Admin = 1,
    Doctor = 2,
    Patient = 3,
}

export interface User {
    row?: User;
    id?: number;
    name: string;
    uuid?: string;
    typeId: UserType;
}

interface UsersTableProps {
    userId: string;
    users: User[];
    showType: boolean;
    actionsDisabled: boolean;
    page: number;
    rowsTotal: number;
    rowsPerPage: number;
    editUser: (u: User) => void;
    removeUser: (u: User) => void;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const sx = {
    cellFirstColumn: { width: 400, maxWidth: 500, textOverflow: 'ellipsis', overflow: 'hidden' },
    mw500: { minWidth: 500 },
    w200: { width: 200 },
    w120: { width: 120 },
};

const userTypes = {
    [UserType.Null]: 'Null',
    [UserType.Admin]: 'Administrator',
    [UserType.Doctor]: 'Doctor',
    [UserType.Patient]: 'Patient',
};

const rowsPerPageOptions = [10, 25, 100];

export default function UsersTable(props: UsersTableProps) {
    const {
        userId,
        users,
        showType,
        actionsDisabled,
        page,
        rowsTotal,
        rowsPerPage,
        editUser,
        removeUser,
        onPageChange,
        onRowsPerPageChange,
    } = props;

    return <TableContainer>
        <Table sx={sx.mw500} size='small' aria-label='users table'>
            <TableHead>
                <TableRow>
                    <TableCellHeader>Name</TableCellHeader>
                    {showType && <TableCellHeader>Type</TableCellHeader>}
                    <TableCellHeader>Link</TableCellHeader>
                    <TableCellHeader sx={sx.w120}></TableCellHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((row) => {
                    let hrefPrefix = '';
                    let nameComp : string|JSX.Element = row.name;
                    switch (row.typeId) {
                        case UserType.Patient:
                            hrefPrefix = `/patient/`;
                            nameComp = <Link href={`/report/${userId}/${row.uuid}`}>{row.name}</Link>;
                            break;
                        case UserType.Doctor:
                            hrefPrefix = '/doctor/';
                            nameComp = <Link href={`/report/${row.uuid}`}>{row.name}</Link>;
                            break;
                        case UserType.Admin:
                            hrefPrefix = '/admin/';
                            nameComp = <Link href={`/report/${row.uuid}/00000000-0000-0000-0000-000000000000`}>{row.name}</Link>;
                            break;
                    }

                    return <TableRow key={row.id}>
                        <TableCellFirstColumn sx={sx.cellFirstColumn} component='th' scope='row'>
                            {nameComp}
                        </TableCellFirstColumn>
                        {showType && <TableCell sx={sx.w200}>
                            {userTypes[row.typeId] || row.typeId}
                        </TableCell>}
                        <TableCell>
                            <LinkCopy href={hrefPrefix + row.uuid}>{row.uuid}</LinkCopy>
                        </TableCell>
                        <TableCell align='center' sx={sx.w120}>
                            <EditButton
                                disabled={actionsDisabled}
                                onClick={() => editUser({
                                    row: row,
                                    id: row.id,
                                    name: row.name,
                                    typeId: row.typeId,
                                    uuid: row.uuid,
                                })} />
                            <RemoveButton
                                disabled={actionsDisabled}
                                onClick={() => removeUser({
                                    row: row,
                                    id: row.id,
                                    name: row.name,
                                    typeId: row.typeId,
                                    uuid: row.uuid,
                                })} />
                        </TableCell>
                    </TableRow>;
                })}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={rowsPerPageOptions}
                        count={rowsTotal}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={onPageChange}
                        onRowsPerPageChange={onRowsPerPageChange}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    </TableContainer>;
}