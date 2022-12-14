import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Link from '@material-ui/core/Link';
import { Skeleton } from '@material-ui/lab';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { Paper as MaterialPaper } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import DvfNetwork from '~lib/api/DvfNetwork';
import { useStores } from '~app/hooks/useStores';
import { useStyles } from '~app/components/Styles';
import { longStringShorten } from '~lib/utils/strings';
import OverviewStore from '~app/common/stores/Overview.store';
import StyledRow from '~app/common/components/Table/StyledRow';
import StyledCell from '~app/common/components/Table/StyledCell';
import CenteredCell from '~app/common/components/Table/CenteredCell';
import {
  overviewTableCellStyle,
  overviewTableHeadersStyle,
} from '~app/components/Overview/components/Tables/Operators/Operators';
import ApplicationStore from '~app/common/stores/Application.store';
import BaseStore from '~app/common/stores/BaseStore';

const applicationStore: ApplicationStore = BaseStore.getInstance().getStore('Application');
export const overviewTableHeadBackgroundStyle: any = { backgroundColor: '#3F3ACA' };

const Validators = () => {
  const classes = useStyles();
  const [validators, setValidators] = useState([]);
  const [loadingValidators, setLoadingValidators] = useState(false);
  const stores = useStores();
  const overviewStore: OverviewStore = stores.Overview;

  useEffect(() => {
    if (!validators.length && !loadingValidators) {
      loadValidators();
    }
  }, []);

  /**
   * Load first page of validators
   */
  const loadValidators = () => {
    setLoadingValidators(true);
    DvfNetwork.getInstance().fetchValidators(1, ApiParams.PER_PAGE, true).then((result: any) => {
      overviewStore.setTotalValidators(result.data.pagination.total);
      overviewStore.setTotalEth(result.data.pagination.total * 32);
      setValidators(result.data.validators);
      setLoadingValidators(false);
    });
  };

  return (
    <div className={classes.tableWithBorder}>
      <TableContainer component={MaterialPaper}>
        <Table aria-label="Operators">
          <TableHead style={overviewTableHeadBackgroundStyle}>
            <TableRow>
              <StyledCell style={overviewTableHeadersStyle}>Public Key</StyledCell>
              <StyledCell style={overviewTableHeadersStyle}>Operators</StyledCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: applicationStore.isDarkMode ? '#353374' : '#fafafa' }}>
            {validators.map((row: any, rowIndex: number) => (
              <StyledRow key={rowIndex}>
                <StyledCell style={overviewTableCellStyle}>
                  <Link href={`/validators/${row.public_key}`} className={classes.Link}>
                    {longStringShorten(row.public_key)}
                  </Link>
                </StyledCell>
                <StyledCell style={overviewTableCellStyle}>
                  <>
                    {row.operators.map((operator: any) => (
                      <span key={`operator-link-${operator.address}`}>
                        <Link
                          href={`${config.routes.OPERATORS.HOME}/${operator.address}`}
                          className={classes.Link}
                      >
                          {operator.name}
                        </Link>
                      &nbsp;
                      </span>
                  ))}
                  </>
                </StyledCell>
              </StyledRow>
          ))}

            {loadingValidators && (
            <StyledRow key="validators-placeholder">
              <StyledCell style={overviewTableCellStyle}>
                <Skeleton />
              </StyledCell>
              <StyledCell style={overviewTableCellStyle}>
                <Skeleton />
              </StyledCell>
            </StyledRow>
          )}

            {validators.length ? (
              <TableRow>
                <CenteredCell colSpan={2} style={overviewTableCellStyle}>
                  <Link href={config.routes.VALIDATORS.HOME} className={classes.Link}>
                    Load more <ArrowDropDownIcon />
                  </Link>
                </CenteredCell>
              </TableRow>
          ) : <TableRow />}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default observer(Validators);
