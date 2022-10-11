import { Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';

export default styled(Checkbox)(({ theme }) => ({
    color: theme.palette.error.main,
    ':hover': {
        color: theme.palette.common.green,
        background: 'none',
    },
    '&.Mui-checked': {
      color: theme.palette.common.green,
    },
    '&.Mui-disabled': {
     color: theme.palette.common.grey,
    }
}));