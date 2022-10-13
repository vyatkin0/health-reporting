import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    useTheme
} from '@mui/material';

import Button from './Button';

interface AlertDialogProps {
    type: 'info' | 'error';
    title: string;
    onClose: (event: React.MouseEvent, reason: string) => void;
}

const padding = '25px';

const pt = padding, pl = padding, pr = padding, pb = padding;

const AlertDialog: React.FC<React.PropsWithChildren<AlertDialogProps>> = (props) => {
    const { type, title, onClose, children } = props;
    const theme = useTheme();
    const onClick = React.useCallback((e: React.MouseEvent) => onClose(e, 'ok'), [onClose]);
    const sx = React.useMemo(() => ({
        title: { color: theme.palette.common.green },
        content: {
            fontFamily: '"Montserrat","Helvetica","Arial",sans-serif',
            pt, pr, pl,
            color: type === 'error' ? theme.palette.error.main : 'auto',
        },
        actions: { pb, pr, pl },
        button: { height: 40 },
    }), [theme, type]);

    return <Dialog
        open
        onClose={props.onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        hideBackdrop={true}
    >
        <DialogTitle sx={sx.title}>{title}</DialogTitle>
        <DialogContent sx={sx.content}>{children}</DialogContent>
        <DialogActions sx={sx.actions}>
            <Button
                onClick={onClick}
                autoFocus
                sx={sx.button}
            >
                Ok
            </Button>
        </DialogActions>
    </Dialog>;
}

export default AlertDialog;
