import svgButton, { SvgButtonProps, SvgProps } from './SvgButton';

const icon = ({ color }: SvgProps) => <path
    d="M 3 17.2525 V 21.0025 H 6.75 L 17.81 9.9425 L 14.06 6.1925 L 3 17.2525 Z M 20.71 7.0425 C 21.1 6.6525 21.1 6.0225 20.71 5.6325 L 18.37 3.2925 C 17.98 2.9025 17.35 2.9025 16.96 3.2925 L 15.13 5.1225 L 18.88 8.8725 L 20.71 7.0425 Z"
    fill={color}
/>;

export default function EditButton({ disabled, onClick }: SvgButtonProps) {
    const SvgButton = svgButton(icon);
    return <SvgButton
        disabled={disabled}
        onClick={onClick}
        ariaLabel='edit'
        title='Edit'
    ></SvgButton>;
}