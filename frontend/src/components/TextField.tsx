import { OutlinedInput, TextField, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& label.Mui-focused': {
        color: theme.palette.common.green,
    },
    '& label.Mui-root': {
        color: theme.palette.common.grey,
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: 10,
            borderColor: theme.palette.common.grey,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.common.green,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.common.green,
        },
    },
}));

const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
    '&.MuiOutlinedInput-root': {
        borderRadius: 10,
        '&:hover fieldset': {
            borderColor: theme.palette.common.green,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.common.green,
        },
    },
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
    '&.Mui-focused': {
        color: theme.palette.common.green,
    },
}));

export {
    StyledTextField as TextField,
    StyledOutlinedInput as OutlinedInput,
    StyledInputLabel as InputLabel,
};