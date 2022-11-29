import React from 'react';
import {
    Box,
    FormControl,
    FormControlLabel,
    InputBaseComponentProps,
    Typography,
} from '@mui/material';

import AlertDialog from '../components/AlertDialog';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import ReportInput from '../components/ReportInput';
import Spin from '../components/Spin';
import { formFetch } from '../api';

const MemoReportInput = React.memo(ReportInput);

interface AlertDialogState {
    type: 'info' | 'error';
    title: string;
    message: string | JSX.Element;
}

type ValidityState = {
    [key: string]: boolean;
};

const sx = {
    width: 500,
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
};

const decimalInputProps: InputBaseComponentProps = { inputMode: 'decimal', pattern: '[3-4]\\d(\\.\\d|$)' };
const numericInputProps: InputBaseComponentProps = { inputMode: 'numeric', pattern: '\\d{2,3}' };
const commentInputProps: InputBaseComponentProps = { maxLength: 500 };

function postReport(userId: string, report: FormData) {
    return formFetch(userId, report, '/report');
}

const validityReducer = (state: ValidityState, action: { type: string; payload: boolean; }): ValidityState => {
    if (state[action.type] === action.payload) {
        return state;
    }
    return { ...state, [action.type]: action.payload };
};

export default function Patient() {
    const [submitDisabled, setSubmitDisabled] = React.useState(true);
    const [isReportLoading, setReportLoading] = React.useState(false);
    const [alertDialog, setAlert] = React.useState<AlertDialogState>();
    const [validity, dispatchValidity] = React.useReducer(validityReducer, {});

    const userId = window.history.state?.id || '';

    const onAlertClose = React.useCallback((event: React.MouseEvent, reason: string) => {
        if (alertDialog?.type !== 'info' && (reason === 'backdropClick' || reason === 'escapeKeyDown')) {
            return;
        }

        setAlert(undefined);

        if (alertDialog?.type === 'info' && reason === 'ok') {
            const form = document.forms[0];
            form.reset();
            setSubmitDisabled(true);
        }
    }, [alertDialog]);

    const onSubmit = React.useCallback((event: React.FormEvent) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;

        const data = new FormData(form);

        setReportLoading(true);
        postReport(userId, data)
            .then((r) => {
                setAlert({
                    type: 'info',
                    title: 'Message',
                    message: 'The report was sent successfully',
                });
            })
            .catch((e) => {
                setAlert({
                    type: 'error',
                    title: 'Unable to send the report',
                    message: e.message,
                });
            })
            .finally(() => setReportLoading(false));

    }, [userId]);

    const onChangeApprove = React.useCallback((event: React.ChangeEvent) => {
        const form = document.forms[0];
        setSubmitDisabled(!form['approve'].checked || !form.checkValidity());
    }, []);

    const onChange = React.useCallback((event: React.ChangeEvent) => {
        const element = event.target as HTMLInputElement;

        dispatchValidity({ type: element.name, payload: !element.validity.valid });

        onChangeApprove(event);
    }, [onChangeApprove]);

    return <>
        {isReportLoading && <Spin />}
        {alertDialog && (
            <AlertDialog
                type={alertDialog.type}
                title={alertDialog.title}
                onClose={onAlertClose}
            >
                {alertDialog.message}
            </AlertDialog>
        )}
        <Typography variant='h2'>Patient</Typography>
        <Typography variant='h3'>Please provide us with your health parameters</Typography>
        <Box
            component='form'
            name='health'
            sx={sx}
            noValidate={false}
            onSubmit={onSubmit}
            autoComplete='off'>
            <MemoReportInput
                name='temperature'
                label='Body temperature'
                onChange={onChange}
                inputProps={decimalInputProps}
                helperText='Example 36.6'
                required
                error={validity.temperature}
            />
            <MemoReportInput
                name='pulse'
                label='Pulse'
                onChange={onChange}
                inputProps={numericInputProps}
                helperText='Example 63'
                required
                error={validity.pulse}
            />
            <MemoReportInput
                name='systolic'
                label='Systolic blood pressure'
                onChange={onChange}
                inputProps={numericInputProps}
                helperText='Example 120'
                required
                error={validity.systolic}
            />
            <MemoReportInput
                name='diastolic'
                label='Diastolic blood pressure'
                onChange={onChange}
                inputProps={numericInputProps}
                helperText='Example 90'
                required
                error={validity.diastolic}
            />
            <MemoReportInput
                name='comment'
                label='Comment'
                inputProps={commentInputProps}
                helperText='Maximum 500 character'
                multiline
                maxRows={4}
                error={validity.comment}
            />
            <FormControl>
                <FormControlLabel control={<Checkbox name='approve' defaultChecked onChange={onChangeApprove} />} label='I agree to send my personal information' />
            </FormControl>
            <Button type='submit' disabled={submitDisabled}>Submit</Button>
        </Box>
    </>;
}