import svgButton, { SvgButtonProps, SvgProps } from './SvgButton';

const icon = ({ color }: SvgProps) => <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M 4 13 L 13.7297 2.5 L 16 4.95 L 8.5405 13 L 16 21.0501 L 13.7297 23.5 L 4 13 Z"
    fill={color}
/>;

export default function NextButton({ disabled, onClick }: SvgButtonProps) {
    const SvgButton = svgButton(icon);
    return <SvgButton
        disabled={disabled}
        onClick={onClick}
        ariaLabel='previous page'
        title='Previous page'
    ></SvgButton>;
}