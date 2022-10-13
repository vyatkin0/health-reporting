import ReportsTable, { Report } from '../components/ReportsTable';

import AlertDialog from '../components/AlertDialog';
import React from 'react';
import Spin from '../components/Spin';
import { Typography } from '@mui/material';
import { getFetch } from '../api';
import { useLocation } from 'react-router-dom';

interface AlertDialogState {
    title: string;
    message: string | JSX.Element;
}

function loadList(doctorId: string, userId: string, page: number, size: number) {
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

    const path = userId ? '/' + userId : '';
    return getFetch(doctorId, '/report/list' + path + query);
}

const initReports: Report[] = [];

export default function Reports() {
    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [rowsTotal, setRowsTotal] = React.useState(0);

    const [alertDialog, setAlert] = React.useState<AlertDialogState>();

    const [reports, setReports] = React.useState(initReports);

    const [isLoading, setLoading] = React.useState(false);

    const location = useLocation();
    const doctorId = location.state?.id || '';
    const userId = location.state?.userId || '';

    React.useEffect(() => {
        if (!doctorId) return;
        //Prevents displaying progress in case of quick loading
        const loadingTimer = setTimeout(() => setLoading(true), 1000);

        const updateReports = (
            r: Report[],
            p: number,
            rpp: number,
            total: number
        ) => {
            setReports(r);
            setPage(p);
            setRowsPerPage(rpp);
            setRowsTotal(total);
            clearTimeout(loadingTimer);
            setLoading(false);
        };

        loadList(doctorId, userId, page, rowsPerPage)
            .then((r) => updateReports(r.list, r.page, r.size, r.total))
            .catch((e) => {
                setAlert({
                    title: 'Unable to load reports',
                    message: `${e.name}: ${e.message}`,
                });
                updateReports([], 0, rowsPerPage, 0);
            });
    }, [page, rowsPerPage, doctorId, userId]);

    const handleChangePage = React.useCallback((event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = React.useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, []);

    const onAlertClose = React.useCallback((event: React.MouseEvent, reason: string) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            return;
        }
        setAlert(undefined);
    }, []);

    return <>
        <Typography variant='h2'>Reports</Typography>
        {isLoading && <Spin />}
        {alertDialog && (
            <AlertDialog
                type='error'
                title={alertDialog.title}
                onClose={onAlertClose}
            >
                {alertDialog.message}
            </AlertDialog>
        )}
        <ReportsTable
            reports={reports}
            page={page}
            rowsTotal={rowsTotal}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </>;
}
