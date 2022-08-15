import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Skeleton } from '@material-ui/lab';
import Table from '@material-ui/core/Table';
import { TableCell } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import ApiParams from '~lib/api/ApiParams';
import { useStyles } from '~app/components/Styles';
import StyledRow from '~app/common/components/Table/StyledRow';
import StyledCell from '~app/common/components/Table/StyledCell';
import PaginationActions from '~app/common/components/DataTable/components/PaginationActions';
import { overviewTableHeadersStyle } from '~app/components/Overview/components/Tables/Operators/Operators';

export const overviewTableHeadBackgroundStyle: any = { backgroundColor: '#4DC9F0' };
export const overviewValidatorsTableHeadBackgroundStyle: any = { backgroundColor: '#3F3ACA' };
export const overviewTableFooterBackgroundStyle: any = { backgroundColor: '#4DC9F0', color: 'white' };
export const overviewValidatorsTableFooterBackgroundStyle: any = { backgroundColor: '#3F3ACA', color: 'white' };

const CustomTableContainer = styled(TableContainer)`
  & .MuiSelect-icon {
    color: #fff;
  }
  & .MuiIconButton-root.Mui-disabled {
    color: gray;
  }
  & .MuiIconButton-root {
    color: #fff;
  }
`

type HeaderPosition = 'inherit' | 'left' | 'center' | 'right' | 'justify';

type DataTableProps = {
  title?: string,
  headers: any[],
  headersPositions?: HeaderPosition[],
  data: any[],
  rowsPerPageOptions?: number[],
  totalCount: number,
  perPage?: number,
  page: number,
  isLoading?: boolean,
  // eslint-disable-next-line no-unused-vars
  onPageChange?: (page: number) => void,
  // eslint-disable-next-line no-unused-vars
  onRowsPerPageChange?: (event: any) => void,
  noDataMessage?: string,
  hidePagination?: boolean,
  isoperators?: boolean,
};

const defaultPerPageOptions = [10, 25, 50, 100];
const skeletons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const DataTable = (props: DataTableProps) => {
  const { headers, data, rowsPerPageOptions, totalCount, perPage, page, isLoading,
    onPageChange, onRowsPerPageChange, headersPositions, title, noDataMessage, hidePagination, isoperators } = props;
  const classes = useStyles();

  const dataRows = () => {
    if (isLoading) {
      return skeletons.map((rowIndex: number) => (
        <StyledRow hover role="checkbox" tabIndex={-1} key={`row-${rowIndex}`} isoperators={isoperators ? 'true' : 'false'}>
          {headers.map((header: string) => (
            <StyledCell key={`cell-${header}`}>
              <Skeleton />
            </StyledCell>
          ))}
        </StyledRow>
      ));
    }
    if (!data?.length) {
      return (
        <StyledRow hover role="checkbox" tabIndex={-1} isoperators={isoperators ? 'true' : 'false'}>
          <StyledCell align="center" colSpan={headers?.length || 1}>
            {noDataMessage ?? 'No records'}
          </StyledCell>
        </StyledRow>
      );
    }
    return data.map((row: any[], rowIndex: number) => (
      <StyledRow hover role="checkbox" tabIndex={-1} key={`row-${rowIndex}`} isoperators={isoperators ? 'true' : 'false'}>
        {row.map((cell: any, cellIndex: number) => (
          <StyledCell
            key={`cell-${cellIndex}`}
            align={headersPositions?.length ? headersPositions[cellIndex] : undefined}
          >
            {cell}
          </StyledCell>
        ))}
      </StyledRow>
    ));
  };

  return (
    <div className={classes.tableWithBorder}>
      <CustomTableContainer>
        {title ? <h3 style={{ paddingleft: 15 }}>{title}</h3> : ''}
        {!hidePagination && perPage && perPage > defaultPerPageOptions[0] && data?.length ? (
          <TablePagination
            ActionsComponent={PaginationActions}
            colSpan={headers.length}
            rowsPerPageOptions={rowsPerPageOptions ?? defaultPerPageOptions}
            component="div"
            count={totalCount}
            rowsPerPage={perPage ?? ApiParams.PER_PAGE}
            page={page}
            onPageChange={(event: any, changedPage: number) => onPageChange ? onPageChange(changedPage + 1) : null}
            onRowsPerPageChange={(event: any) => onRowsPerPageChange ? onRowsPerPageChange(event.target.value) : null}
          />
        ) : ''}

        <Table aria-label="sticky table">
          <TableHead>
            <TableRow style={isoperators ? overviewTableHeadBackgroundStyle : overviewValidatorsTableHeadBackgroundStyle}>
              {headers.map((header: string, headerIndex: number) => (
                <TableCell
                  style={overviewTableHeadersStyle}
                  key={header}
                  align={headersPositions?.length ? headersPositions[headerIndex] : undefined}
                >
                  {header}
                </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRows()}
          </TableBody>
        </Table>

        {!hidePagination && data?.length ? (
          <TablePagination
            style={isoperators ? overviewTableFooterBackgroundStyle : overviewValidatorsTableFooterBackgroundStyle}
            ActionsComponent={PaginationActions}
            colSpan={headers.length}
            rowsPerPageOptions={rowsPerPageOptions ?? defaultPerPageOptions}
            component="div"
            count={totalCount}
            rowsPerPage={perPage ?? ApiParams.PER_PAGE}
            page={page}
            onPageChange={(event: any, changedPage: number) => onPageChange ? onPageChange(changedPage + 1) : null}
            onRowsPerPageChange={(event: any) => onRowsPerPageChange ? onRowsPerPageChange(event.target.value) : null}
          />
        ) : ''}
      </CustomTableContainer>
    </div>
  );
};

export default observer(DataTable);
