import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export default styled(Button)(({ theme }) => ({
    fontSize: 16,
    fontWeight: 600,
    textTransform: 'none',
    padding: '13px 16px',
    color: theme.palette.common.white,
    height: 46,
    background: theme.palette.common.green,
    borderRadius: 23,
    transition: 'none',
    ':disabled': {
        color: theme.palette.common.grey,
        background: theme.palette.background.disabled,
    },
    ':hover:not(:disabled)': {
        background: theme.palette.background.gradient,
    }
}));
