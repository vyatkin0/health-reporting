import svgButton, { SvgButtonProps, SvgProps } from './SvgButton';

const icon = ({ color }: SvgProps) => <path
    d="M6 21h12V7H6v14zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
    fill={color}
/>;

export default function RemoveButton({ disabled, onClick }: SvgButtonProps) {
    const SvgButton = svgButton(icon);
    return <SvgButton
        disabled={disabled}
        onClick={onClick}
        ariaLabel='remove'
        title='Remove'
    ></SvgButton>;
}