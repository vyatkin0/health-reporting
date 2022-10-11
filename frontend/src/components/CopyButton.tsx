import svgButton, { SvgButtonProps, SvgProps } from './SvgButton';

const icon = ({ color }: SvgProps) => <>
    <rect
        x='8'
        y='8'
        width='11'
        height='12'
        stroke={color}
        strokeWidth='2'
        fillOpacity='0.0'
    />
    <line
        x1='4'
        y1='4'
        x2='4'
        y2='17'
        stroke={color}
        strokeWidth='2'
    />
    <line
        x1='16'
        y1='4'
        x2='3'
        y2='4'
        stroke={color}
        strokeWidth='2'
    /></>;

export default function CopyButton({ onClick }: SvgButtonProps) {
    const SvgButton = svgButton(icon);
    return <SvgButton
        onClick={onClick}
        ariaLabel='copy'
        title='Copy'
    ></SvgButton>;
}