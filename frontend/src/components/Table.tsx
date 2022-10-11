import React from 'react';
import {
    Box,
    LabelDisplayedRowsArgs,
    TableCell,
    TableHead,
    TablePagination,
    TablePaginationProps,
    useTheme,
} from '@mui/material';

import { MUIStyledCommonProps } from "@mui/system";

import NextButton from './NextButton';
import PrevButton from './PrevButton';
import { styled } from '@mui/material/styles';

const HealthTableHead = styled(TableHead)(({ theme }) => ({ background: theme.palette.background.tableHead }));

const HealthTableCell = styled(TableCell)`height: 55px;`;

export const TableCellFirstColumn = styled(HealthTableCell)`font-size: 16px;`;

const headerPaginationStyle = ({ theme }: MUIStyledCommonProps) => ({
    fontSize: 16,
    color: theme?.palette.common.darkGrey,
});

export const TableCellHeader = styled(HealthTableCell)(headerPaginationStyle);

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number
    ) => void;
}

function TablePaginationActions({ count, page, rowsPerPage, onPageChange }: TablePaginationActionsProps) {

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (page < 1) {
            return;
        }
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const prevDisabled = page === 0;
    const nextDisabled = page >= Math.ceil(count / rowsPerPage) - 1;

    return <Box sx={{ flexShrink: 0, ml: 3 }}>
        <PrevButton
            onClick={handleBackButtonClick}
            disabled={prevDisabled}
        />
        <NextButton
            onClick={handleNextButtonClick}
            disabled={nextDisabled}
        />
    </Box>;
}

export const HealthTablePagination = (props: TablePaginationProps) => {
    const theme = useTheme();

    const getDisplayedRows = React.useCallback((paginationInfo: LabelDisplayedRowsArgs) => {
        const pages = props.rowsPerPage > 0 ? Math.ceil(paginationInfo.count / props.rowsPerPage) : 1;
        return `${paginationInfo.page + 1} из ${pages}`;
    }, [props.rowsPerPage]);

    const sx = React.useMemo(() => {
        const style = headerPaginationStyle({ theme });

        return {
            borderBottom: 'none',
            '.MuiTablePagination-select': style,
            '.MuiTablePagination-displayedRows': style,
            '.MuiTablePagination-selectLabel': style,
        }
    }, [theme]);

    const ActionsComponent = React.memo(TablePaginationActions);

    return <TablePagination
        sx={sx}
        labelRowsPerPage='Rows per page:'
        ActionsComponent={ActionsComponent}
        labelDisplayedRows={getDisplayedRows}
        {...props}
    />
};

export {
    HealthTableHead as TableHead,
    HealthTableCell as TableCell,
    HealthTablePagination as TablePagination,
};
