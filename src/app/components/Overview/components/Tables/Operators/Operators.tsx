import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import { Skeleton } from '@material-ui/lab';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { Paper as MaterialPaper } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import config from '~app/common/config';
import DvfNetwork from '~lib/api/DvfNetwork';
import { useStores } from '~app/hooks/useStores';
import { useStyles } from '~app/components/Styles';
import { longStringShorten } from '~lib/utils/strings';
import OverviewStore from '~app/common/stores/Overview.store';
import OperatorType from '~app/common/components/OperatorType';
import StyledRow from '~app/common/components/Table/StyledRow';
import StyledCell from '~app/common/components/Table/StyledCell';
import CenteredCell from '~app/common/components/Table/CenteredCell';
import ApplicationStore from '~app/common/stores/Application.store';
import BaseStore from '~app/common/stores/BaseStore';

const applicationStore: ApplicationStore = BaseStore.getInstance().getStore('Application');
export const overviewTableHeadersStyle: any = { textTransform: 'uppercase', fontSize: 12, fontWeight: 'bold', color: 'white' };
export const overviewTableCellStyle: any = { fontSize: 14, height: 62, paddingTop: 0, paddingBottom: 0 };
export const overviewTableHeadBackgroundStyle: any = { backgroundColor: '#4DC9F0' };

const Operators = () => {
  const classes = useStyles();
  const [operators, setOperators] = useState([]);
  const [loadingOperators, setLoadingOperators] = useState(false);
  const stores = useStores();
  const overviewStore: OverviewStore = stores.Overview;

  useEffect(() => {
    if (!operators.length && !loadingOperators) {
      loadOperators();
    }
  }, []);

  /**
   * Load first page of operators
   */
  const loadOperators = () => {
    setLoadingOperators(true);
    DvfNetwork.getInstance().fetchOperators({ page: 1, validatorsCount: 'true' })
      .then((result: any) => {
        overviewStore.setTotalOperators(result.data.pagination.total);
        setOperators(result.data.operators);
        setLoadingOperators(false);
      });
  };

  return (
    <div className={classes.tableWithBorder}>
      <TableContainer component={MaterialPaper}>
        <Table aria-label="Operators">
          <TableHead style={overviewTableHeadBackgroundStyle}>
            <TableRow>
              <StyledCell style={overviewTableHeadersStyle}>Address</StyledCell>
              <StyledCell style={overviewTableHeadersStyle}>Name</StyledCell>
              <StyledCell style={overviewTableHeadersStyle}>Validators</StyledCell>
            </TableRow>
          </TableHead>

          <TableBody style={{ backgroundColor: applicationStore.isDarkMode ? '#353374' : '#fafafa' }}>
            {operators.map((row: any, rowIndex) => (
              <StyledRow key={rowIndex} isoperators={+true}>
                <StyledCell style={overviewTableCellStyle}>
                  <Link href={`/operators/${row.address}`} className={classes.Link}>
                    {longStringShorten(row.address)}
                  </Link>
                </StyledCell>
                <StyledCell style={overviewTableCellStyle}>
                  <Link href={`/operators/${row.address}`} className={classes.Link}>
                    {row.name}
                    <OperatorType type={row.type} />
                  </Link>
                </StyledCell>
                <StyledCell style={overviewTableCellStyle}>
                  {row.validators_count}
                </StyledCell>
              </StyledRow>
          ))}

            {loadingOperators ? (
              <StyledRow key="operators-placeholder" isoperators={+true}>
                <StyledCell style={overviewTableCellStyle}>
                  <Skeleton />
                </StyledCell>
                <StyledCell style={overviewTableCellStyle}>
                  <Skeleton />
                </StyledCell>
                <StyledCell style={overviewTableCellStyle}>
                  <Skeleton />
                </StyledCell>
              </StyledRow>
          ) : <></>}

            {operators.length ? (
              <TableRow>
                <CenteredCell colSpan={3} style={overviewTableCellStyle}>
                  <Link href={config.routes.OPERATORS.HOME} className={classes.Link}>
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

export default observer(Operators);
