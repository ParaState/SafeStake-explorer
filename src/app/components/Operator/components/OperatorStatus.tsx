import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Skeleton } from '@material-ui/lab';
import InfoTooltip from '~app/common/components/InfoTooltip';

const OperatorPerformanceContainer = styled.div`
  height: 164px;
  display: flex;
  border-radius: 6px;
  align-items: center;
  margin-bottom: 25px;
  justify-items: center;
  align-content: center;
  flex-direction: column;
  justify-content: center;
  padding: 16px 20px 20px;
  border: solid 1px #5b6c84;
`;

const DataHeader = styled.div`
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

const ValueContent = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  font-size: 28px;
  font-weight: 600;
  font-style: normal;
  text-align: center;
  line-height: normal;
  align-items: center;
  margin-bottom: auto;
  font-stretch: normal;
  align-content: center;
  justify-items: center;
  flex-direction: column;
  letter-spacing: normal;
  justify-content: center;
`;

const OperatorStatus = ({ status }: { status: string }) => {
    const headerTooltipStyle = { fontSize: '14px', color: '#fffff', marginBottom: '-2px' };
    let textColor: string = '';
    let backgroundColor: string = '';
    switch (status) {
        case 'Active':
            backgroundColor = '#08c858';
            textColor = 'white';
            break;
        case 'Inactive':
            backgroundColor = '#ec1c26';
            textColor = 'white';
            break;
        default:
            backgroundColor = '#808080';
            textColor = 'white';
    }

    return (
      <OperatorPerformanceContainer>
        <DataHeader>
          Status
          <InfoTooltip
            style={headerTooltipStyle}
            message="Is the operator performing duties for the majority of its validators in the last 10 epochs."
          />
        </DataHeader>
        <ValueContent style={{ color: textColor }}>
          <div style={{ backgroundColor, padding: '10px 20px', borderRadius: 20, fontSize: 20 }}>{!status ? <Skeleton style={{ width: 100 }} /> : status}</div>
        </ValueContent>
      </OperatorPerformanceContainer>
    );
};

export default observer(OperatorStatus);
