
import {
    Backdrop,
    CircularProgress,
    Theme,
} from '@mui/material';

const sx = {
    color: (theme: Theme) => theme.palette.common.white,
    zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
};

export default function Spin() {
    return <Backdrop sx={sx} open>
        <CircularProgress size={120} />
    </Backdrop>;
}