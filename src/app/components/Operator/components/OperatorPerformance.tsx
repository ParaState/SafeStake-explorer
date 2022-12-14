import React, { useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Skeleton } from '@material-ui/lab';
import { OperatorProps } from '~app/components/Operator/components/OperatorProps';
import InfoTooltip from '~app/common/components/InfoTooltip';

const OperatorPerformanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  padding: 16px 20px 20px;
  border-radius: 6px;
  border: solid 1px #5b6c84;
  height: 250px;
  margin-bottom: 25px;
`;

const PerformanceDataHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  width: 100%;
  text-align: left;
  margin-top: 0;
  margin-bottom: auto;
`;

const PerformanceValueContent = styled.div`
  height: 35px;
  font-size: 28px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  margin-bottom: auto;
`;

function getPerformance(operator: any, selectedPerformance: string): any {
  const performanceKey = `${operator?.address}_${selectedPerformance}`;

  // @ts-ignore
  if (!((operator?.performances !== undefined && operator?.performances[selectedPerformance] !== undefined) || getPerformance[performanceKey])) {
    return [false, <Skeleton style={{ width: 100 }} />];
  }

  // @ts-ignore
  if (getPerformance[performanceKey]) {
    // @ts-ignore
    return [true, getPerformance[performanceKey]];
  }
  const performance = `${parseFloat(String(operator?.performances[selectedPerformance])).toFixed(2)}%`;
  // @ts-ignore
  getPerformance[performanceKey] = performance;
  return [true, performance];
}

const OperatorPerformanceWidget = (props: OperatorProps) => {
  const supportedPerformances: any = { '30days': '1M', '1days': '1D' };
  const [selectedPerformance, setSelectedPerformance] = useState('1days');
  const headerTooltipStyle = { fontSize: '14px', marginBottom: '-2px' };

  return (
    <OperatorPerformanceContainer>
      <PerformanceDataHeader>
        Performance
        <InfoTooltip
          style={headerTooltipStyle}
          message="Operator technical scoring metric - calculated by the percentage of attended duties within a time-frame."
        />
        <div style={{ float: 'right', width: 100 }}>
          {Object.keys(supportedPerformances).map((performance: any) => {
            return (
              <div
                style={{
                  display: 'inline',
                  textAlign: 'right',
                  float: 'right',
                  marginLeft: 10,
                  marginTop: 7,
                  cursor: 'pointer',
                  fontWeight: 'normal',
                  color: selectedPerformance === performance ? '#5e73ea' : 'gray',
                  fontSize: 12,
                }}
                role="presentation"
                key={`performance-${performance}`}
                onKeyPress={() => {}}
                onKeyDown={() => {}}
                onKeyUp={() => {}}
                onClick={() => {
                  setSelectedPerformance(performance);
                  if (getPerformance(props.operator, performance)[0]) {
                    return;
                  }
                  props.onLoadPerformances && props.onLoadPerformances([performance]);
                }}
              >
                {supportedPerformances[performance]}
              </div>
            );
          })}
        </div>
      </PerformanceDataHeader>
      <PerformanceValueContent>
        {getPerformance(props.operator, selectedPerformance)[1]}
      </PerformanceValueContent>
    </OperatorPerformanceContainer>
  );
};

const OperatorPerformance = (props: OperatorProps) => {
  return <OperatorPerformanceWidget {...props} />;
};

export default observer(OperatorPerformance);
