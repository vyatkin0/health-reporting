import {
    FormControl,
    FormHelperText,
    InputBaseComponentProps,
} from '@mui/material';

import { OutlinedInput, InputLabel } from '../components/TextField';

interface FormControlProps {
    name: string;
    label: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    inputProps?: InputBaseComponentProps;
    helperText: string;
    multiline?: boolean;
    maxRows?: number;
    required?: boolean;
    error?: boolean;
}

export default function ReportInput(props: FormControlProps) {
    const { name, label, onChange, inputProps, helperText, multiline, maxRows, required, error } = props;
    const helperId = 'helper-' + name;
    return <FormControl>
        <InputLabel htmlFor={name} error={error}>{label}</InputLabel>
        <OutlinedInput id={name} name={name} aria-describedby={helperId} label={label}
            inputProps={inputProps} multiline={multiline} maxRows={maxRows} required={required}
            onChange={onChange} error={error} />
        <FormHelperText id={helperId} error={error}>{helperText}</FormHelperText>
    </FormControl>;
};
