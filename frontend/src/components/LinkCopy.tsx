import {Box} from '@mui/material';
import CopyButton from './CopyButton';
import Link from './Link';
import { styled } from "@mui/material/styles";

interface LinkCopyProps {
    href: string;
}

const StyledBox = styled(Box)`
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
`;

function copyClipboard(link?: string) {
    if (link) {
        navigator.clipboard.writeText(link);
    }
}

export default function LinkCopy(props: React.PropsWithChildren<LinkCopyProps>) {
    return <StyledBox>
        <Link href={props.href}>
            {props.children}
        </Link>
        {props.href && navigator.clipboard && (
            <CopyButton onClick={() => copyClipboard(window.location.origin + props.href)} />
        )}
    </StyledBox>;
}