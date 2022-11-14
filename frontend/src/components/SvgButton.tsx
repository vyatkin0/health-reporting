import React from 'react';
import { IconButton, SvgIcon } from '@mui/material';
import { styled } from "@mui/material/styles";
export interface SvgButtonProps {
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface SvgProps {
    color: string;
}

interface ButtonProps extends SvgButtonProps {
    ariaLabel: string;
    title: string;
}

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.common.grey,
    ':hover:not(:disabled)': {
        color: theme.palette.common.green,
    }
}));

export default function SvgButton(SvgComponent: React.ComponentType<SvgProps>) {
    return ({ disabled, ariaLabel, title, onClick }: ButtonProps) => {
        return <StyledIconButton
            disabled={disabled}
            onClick={onClick}
            aria-label={ariaLabel}
            title={title}
        > <SvgIcon>
                <SvgComponent color='currentColor'></SvgComponent>
            </SvgIcon>
        </StyledIconButton>;
    }
}
