import React from 'react';
import { RouterContext } from 'react-router-slim';
import { styled } from '@mui/material/styles';

const StyledLink = styled('a')(({ theme }) => ({
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

interface LinkProps extends React.PropsWithChildren {
    to: string;
}

export default function Link({ children, to }: LinkProps) {
    const router = React.useContext<RouterContext>(RouterContext);
    const navigate = router.navigate;
    const onClick = React.useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate?.(to);
    }, [to, navigate]);

    return <StyledLink href={to} onClick={onClick}>{children}</StyledLink>
}
