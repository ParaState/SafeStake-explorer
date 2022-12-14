import React, { useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { Skeleton } from '@material-ui/lab';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { Table, TableCell } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import config from '~app/common/config';
import { infoIconStyle } from '~root/theme';
import Status from '~app/common/components/Status';
import { useStyles } from '~app/components/Styles';
import BaseStore from '~app/common/stores/BaseStore';
import { longStringShorten } from '~lib/utils/strings';
import InfoTooltip from '~app/common/components/InfoTooltip';
import OperatorType from '~app/common/components/OperatorType';
import StyledRow from '~app/common/components/Table/StyledRow';
import StyledCell from '~app/common/components/Table/StyledCell';
import PerformanceStore from '~app/common/stores/Performance.store';
import { overviewTableHeadersStyle } from '~app/components/Overview/components/Tables/Operators/Operators';
import ApplicationStore from '~app/common/stores/Application.store';

const applicationStore: ApplicationStore = BaseStore.getInstance().getStore('Application');

const PerformanceSwitcher = styled.span<({ selected?: boolean })>`
  margin-top: 3px;
  float: right;
  padding-right: 15px;
  font-size: 15px;
  font-weight: ${({ selected }) => selected ? 900 : 600};
  user-select: none;
  cursor: pointer;
`;

export const overviewTableHeadBackgroundStyle: any = { backgroundColor: 'rgba(63, 58, 202, 0.5)', color: 'white' };

type ValidatorOperatorProps = {
  validator: Record<string, any>;
  defaultPerformance: string;
  // eslint-disable-next-line no-unused-vars
  onLoadPerformances: (perf: string[], callback?: any) => void;
};

const performanceStore: PerformanceStore = BaseStore.getInstance().getStore('Performance');

function getSortedOperators(operators: any[], selectedPerformancePeriod: string): any[] {
  // @ts-ignore
  if (getSortedOperators[selectedPerformancePeriod]) {
    // @ts-ignore
    return [true, getSortedOperators[selectedPerformancePeriod]];
  }
  let havingPerformance = false;
  const sortedOperators: any[] = operators
    .map((operator: any) => {
      havingPerformance = operator.performances[selectedPerformancePeriod] !== undefined;
      return {
        ...operator,
        activeOperatorPerformance: operator.performances[selectedPerformancePeriod] || 0,
      };
    })
    .sort((o1: any, o2: any) => {
      if (o1.activeOperatorPerformance > o2.activeOperatorPerformance) {
        return -1;
      }
      if (o1.activeOperatorPerformance < o2.activeOperatorPerformance) {
        return 1;
      }
      return 0;
    });

  if (havingPerformance) {
    // @ts-ignore
    getSortedOperators[selectedPerformancePeriod] = sortedOperators;
  }
  return [havingPerformance, sortedOperators];
}

const ValidatorOperators = (props: ValidatorOperatorProps) => {
  const classes = useStyles();
  const { validator, defaultPerformance, onLoadPerformances } = props;
  const [selectedPerformancePeriod, setSelectedPerformancePeriod] = useState(defaultPerformance);
  let operatorsPerformanceZero: number = 0;
      validator?.operators?.forEach((operator: any) => {
        // eslint-disable-next-line no-plusplus
        if (operator.performances[selectedPerformancePeriod] === 0) ++operatorsPerformanceZero;
  });

  const supportedPeriods = [
    {
      label: '1D',
      key: '24hours',
    },
    {
      label: '1M',
      key: '30days',
    },
  ];

  const performanceRowStyle: any = {
    textAlign: 'left',
    paddingTop: 10,
    paddingBottom: 10,
  };

  const performanceRowRightStyle: any = {
    ...performanceRowStyle,
    textAlign: 'right',
  };

  const renderPerformance = (operator: any) => {
    if (operatorsPerformanceZero === 4) return 'N/A';
    if (operator.performances[selectedPerformancePeriod] !== undefined) return `${parseFloat(String(operator.performances[selectedPerformancePeriod])).toFixed(1)}%`;
    return <Skeleton />;
  };

  return (
    <TableContainer className={classes.tableWithBorder} style={{ marginBottom: 30 }}>
      <h3 style={{ paddingleft: 15 }}>
        Operators
        {supportedPeriods.map((period) => (
          <PerformanceSwitcher
            key={`performance-switcher-${period.key}`}
            selected={selectedPerformancePeriod === period.key}
            onClick={() => {
              setSelectedPerformancePeriod(period.key);
              if (getSortedOperators(validator.operators ?? [], period.key)[0]) {
                return;
              }
              const requestedName = `${validator?.public_key}_${period.key}`;
              const shouldRequestPeriod = validator?.public_key
                && ['requested', 'requesting'].indexOf(performanceStore.requestedFlags[requestedName]) === -1;

              if (shouldRequestPeriod) {
                performanceStore.setRequestedFlag(requestedName, 'requesting');
                onLoadPerformances([period.key], () => {
                  performanceStore.setRequestedFlag(requestedName, 'requested');
                });
              }
            }}
          >
            {period.label}
          </PerformanceSwitcher>
        ))}
      </h3>
      <Grid container>
        <Table aria-label="table">
          <TableHead>
            <TableRow style={overviewTableHeadBackgroundStyle}>
              <TableCell style={overviewTableHeadersStyle} key={'name'} align="left">
                Name
              </TableCell>
              <TableCell style={overviewTableHeadersStyle} key={'status'} align="left">
                Status
                <InfoTooltip
                  style={{ ...infoIconStyle, color: 'white', marginBottom: -2 }}
                  message="Is the operator performing duties for the majority of its validators in the last 10 epochs"
                />
              </TableCell>
              <TableCell key={'performance'} style={{ whiteSpace: 'nowrap', ...overviewTableHeadersStyle }}>
                Performance
                <InfoTooltip
                  style={{ ...infoIconStyle, color: 'white', marginBottom: -2 }}
                  message="Operators technical scoring metric - calculated by the percentage of attended duties within a time-frame."
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: applicationStore.isDarkMode ? '#353374' : '#fafafa' }}>
            {!validator?.operators && (
              [1, 2, 3, 4].map((skeleton: any) => (
                <StyledRow
                  hover
                  role="checkbox"
                  tabIndex={skeleton + 1}
                  key={`operator-row-${skeleton}`}
                  style={{ maxHeight: 20 }}
                >
                  <StyledCell key="operator-info">
                    <Skeleton />
                  </StyledCell>
                  <StyledCell key="operator-performance">
                    <Skeleton />
                  </StyledCell>
                  <StyledCell key="operator-status">
                    <Skeleton />
                  </StyledCell>
                </StyledRow>
              ))
            )}
            {getSortedOperators(validator.operators ?? [], selectedPerformancePeriod)[1].map((operator: any, operatorIndex: number) => (
              <StyledRow
                hover
                role="checkbox"
                tabIndex={operatorIndex + 1}
                key={`operator-row-${operatorIndex}`}
                style={{ maxHeight: 20 }}
              >
                <StyledCell key="operator-info" style={performanceRowStyle}>
                  <Typography component={'div'} noWrap>
                    <Link
                      href={`${config.routes.OPERATORS.HOME}/${operator.address}`}
                      className={classes.Link}
                      style={{ fontWeight: 500, fontSize: 14 }}
                    >
                      {operator.name}
                      <OperatorType type={operator.type} />
                    </Link>
                  </Typography>
                  <Typography component={'div'} noWrap>
                    <Link
                      href={`${config.routes.OPERATORS.HOME}/${operator.address}`}
                      className={classes.Link}
                      style={{ fontWeight: 500, fontSize: 14 }}
                    >
                      {longStringShorten(operator.address, 4)}
                    </Link>
                  </Typography>
                </StyledCell>
                <StyledCell key="operator-status">
                  <Status status={operator.status} />
                </StyledCell>
                <StyledCell key="operator-performance" style={performanceRowRightStyle}>
                  {renderPerformance(operator)}
                </StyledCell>
              </StyledRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </TableContainer>
  );
};

export default observer(ValidatorOperators);
