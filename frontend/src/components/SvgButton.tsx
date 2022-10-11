import { IconButton, SvgIcon, useTheme } from '@mui/material';

import React from 'react';

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

export default function SvgButton(SvgComponent: React.ComponentType<SvgProps>) {
    const theme = useTheme();
    const { grey, green } = theme.palette.common;
    const [color, setColor] = React.useState(grey);
    return ({ disabled, ariaLabel, title, onClick }: ButtonProps) => {
        return <IconButton
            disabled={disabled}
            onClick={onClick}
            aria-label={ariaLabel}
            title={title}
            onMouseEnter={disabled ? undefined : () => setColor(green)}
            onMouseLeave={disabled ? undefined : () => setColor(grey)}
        > <SvgIcon>
                <SvgComponent color={color}></SvgComponent>
            </SvgIcon>
        </IconButton>;
    }
}
