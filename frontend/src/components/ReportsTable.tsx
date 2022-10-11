import {
    Table,
    TableBody,
    TableContainer,
    TableFooter,
    TableRow,
} from "@mui/material";
import {
    TableCell,
    TableCellHeader,
    TableHead,
    TablePagination,
} from "./Table";

import React from "react";

export interface Report {
    id?: number;
    temperature: number;
    pulse: number;
    systolic: number;
    diastolic: number;
    comment: string;
    createdAt: string;
    userName: string;
    userUuid: string;
}

interface ReportsTableProps {
    reports: Report[];
    page: number;
    rowsTotal: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => void;
    onRowsPerPageChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}

const sx = {
    w100: { width: 100, whiteSpace: "nowrap" },
    w200: { width: 200 },
};

const rowsPerPageOptions = [10, 25, 100];

export default function ReportsTable(props: ReportsTableProps) {
    const {
        reports,
        page,
        rowsTotal,
        rowsPerPage,
        onPageChange,
        onRowsPerPageChange,
    } = props;

    return (
        <TableContainer>
            <Table size="small" aria-label="Reports table">
                <TableHead>
                    <TableRow>
                        <TableCellHeader align="center" rowSpan={2}>
                            #
                        </TableCellHeader>
                        <TableCellHeader align="center" rowSpan={2}>
                            Name
                        </TableCellHeader>
                        <TableCellHeader align="center">Date</TableCellHeader>
                        <TableCellHeader align="center" rowSpan={2}>
                            Temperature
                        </TableCellHeader>
                        <TableCellHeader align="center" rowSpan={2}>
                            Pulse
                        </TableCellHeader>
                        <TableCellHeader align="center" colSpan={2}>
                            Blood pressure
                        </TableCellHeader>
                        <TableCellHeader rowSpan={2}>Comment</TableCellHeader>
                    </TableRow>
                    <TableRow>
                        <TableCellHeader align="center">Time</TableCellHeader>
                        <TableCellHeader align="center">
                            Systolic
                        </TableCellHeader>
                        <TableCellHeader align="center">
                            Diastolic
                        </TableCellHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reports.map((row) => {
                        const createdAt = new Date(row.createdAt);
                        const isValid =
                            createdAt instanceof Date && isFinite(createdAt.valueOf());
                        const commentLines = row.comment.split(/\r|\n/);
                        return (
                            <TableRow key={row.id}>
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell align="center">
                                    {row.userName}
                                </TableCell>
                                <TableCell sx={sx.w100} align="center">
                                    {isValid && (
                                        <>
                                            {new Intl.DateTimeFormat(
                                                "default",
                                                { dateStyle: "short" }
                                            ).format(createdAt)}
                                            <br></br>
                                            {new Intl.DateTimeFormat(
                                                "default",
                                                { timeStyle: "short" }
                                            ).format(createdAt)}
                                        </>
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {row.temperature}
                                </TableCell>
                                <TableCell align="center">
                                    {row.pulse}
                                </TableCell>
                                <TableCell align="center">
                                    {row.systolic}
                                </TableCell>
                                <TableCell align="center">
                                    {row.diastolic}
                                </TableCell>
                                <TableCell sx={sx.w200}>
                                    {commentLines.map((t, i) =>
                                        i > 0 && t ? (
                                            <React.Fragment key={i}>
                                                <br></br>
                                                {t}
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment key={i}>
                                                {t || null}
                                            </React.Fragment>
                                        )
                                    )}
                                </TableCell>
                            </TableRow>
                        );
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
        </TableContainer>
    );
}
