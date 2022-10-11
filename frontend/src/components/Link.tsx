import { Link, LinkBaseProps } from '@mui/material';

import { styled } from '@mui/material/styles';

const StyledLink = styled(Link)(({ theme }) => ({
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 500,
    color: theme.palette.common.green,
    ':visited': {
        color: theme.palette.common.green,
    },
}));

export default function HealthLink(props: LinkBaseProps) {
    return <StyledLink underline='hover' {...props}>
        {props.children}
    </StyledLink>;
}
