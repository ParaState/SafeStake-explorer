import React from 'react';
import { Box } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import config from '~app/common/config';
import { useStyles } from '~app/components/Styles';
import { longStringShorten } from '~lib/utils/strings';
import BeaconchaLink from '~app/common/components/BeaconchaLink';
import DataTable from '~app/common/components/DataTable/DataTable';
import CopyToClipboardIcon from '~app/common/components/CopyToClipboardIcon';

type ValidatorsInOperatorTableProps = {
  validators: any[],
  params: any,
  perPage: number,
  pagination: {
    total: number,
    page: number,
  },
  isLoading: boolean,
  // eslint-disable-next-line no-unused-vars
  onLoadPage: (address: string, page: number) => void,
  // eslint-disable-next-line no-unused-vars
  onRowsPerPageChange: (perPage: number) => void,
  isOperator?: boolean,
};

const ValidatorsInOperatorTable = (props: ValidatorsInOperatorTableProps) => {
  const classes = useStyles();
  const { validators, pagination, params, isLoading, onLoadPage, onRowsPerPageChange, perPage, isOperator } = props;
  const validatorsTitle = `${pagination?.total ? pagination?.total : ''} Validator${(pagination?.total ?? 0) > 1 || pagination?.total === 0 ? 's' : ''}`;

  return (
    <DataTable
      isoperators={isOperator}
      noDataMessage={'No validators'}
      headers={[validatorsTitle, '']}
      headersPositions={['left', 'right']}
      data={(validators || []).map((validator: any) => {
        return [
          <Link href={`${config.routes.VALIDATORS.HOME}/${validator.public_key}`} className={classes.Link}>
            <Typography component={'div'} noWrap>
              <Box component="div" display={{ xs: 'block', sm: 'none', md: 'none', lg: 'none' }}>
                {longStringShorten(validator.public_key, 10)}
              </Box>
              <Box component="div" display={{ xs: 'none', sm: 'block', md: 'block', lg: 'none' }}>
                {longStringShorten(validator.public_key, 20)}
              </Box>
              <Box component="div" display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
                {validator.public_key}
              </Box>
            </Typography>
          </Link>,
          <div style={{ marginTop: 3, whiteSpace: 'nowrap' }}>
            <CopyToClipboardIcon data={validator.public_key} />
            <BeaconchaLink height={24} width={24} address={`validator/${validator.public_key}`} />
          </div>,
        ];
      })}
      totalCount={pagination.total}
      page={pagination.page - 1}
      onPageChange={(page: number) => {
        onLoadPage && onLoadPage(params.address, page);
      }}
      onRowsPerPageChange={(newPerPage: number) => {
        onRowsPerPageChange && onRowsPerPageChange(newPerPage);
      }}
      perPage={perPage}
      isLoading={isLoading}
    />
  );
};

export default ValidatorsInOperatorTable;
