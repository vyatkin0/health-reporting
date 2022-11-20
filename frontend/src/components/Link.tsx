import { Link, LinkProps } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledLink = styled(Link)(({ theme }) => ({
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 500,
    textDecoration: 'none',
    color: theme.palette.common.green,
    ':hover': {
        textDecoration: 'underline',
    },
    ':visited': {
        color: theme.palette.common.green,
    },
}));

export default function HealthLink(props: LinkProps) {
    return <StyledLink {...props}>
        {props.children}
    </StyledLink>;
}
