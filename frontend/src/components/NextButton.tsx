import svgButton, { SvgButtonProps, SvgProps } from './SvgButton';

const icon = ({ color }: SvgProps) => <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M 20 13 L 10.2703 2.5 L 8 4.95 L 15.4595 13 L 8 21.0501 L 10.2703 23.5 L 20 13 Z"
    fill={color}
/>;

export default function NextButton({ disabled, onClick }: SvgButtonProps) {
    const SvgButton = svgButton(icon); 
    return <SvgButton
        disabled={disabled}
        onClick={onClick}
        ariaLabel='next page'
        title='Next page'
    ></SvgButton>;
}