import React from 'react';
import { observer } from 'mobx-react';
import { Skeleton } from '@material-ui/lab';
import DvfNetwork from '~lib/api/DvfNetwork';
import { useStores } from '~app/hooks/useStores';
import { numberWithCommas } from '~lib/utils/numbers';
import OverviewStore from '~app/common/stores/Overview.store';
import StatsBlock from '~app/components/Overview/components/Stats/Block/Block';
import StatsContainer from '~app/components/Overview/components/Stats/Container/Container';
import StatsBlockHeader from '~app/components/Overview/components/Stats/BlockHeader/BlockHeader';
import StatsBlockContent from '~app/components/Overview/components/Stats/BlockContent/BlockContent';

const Stats = () => {
  const stores = useStores();
  const overviewStore: OverviewStore = stores.Overview;

  return (
    <StatsContainer>
      <StatsBlock bgColor="#4DC9F0">
        <StatsBlockHeader isWhite>
          {overviewStore.totalOperators === null && <Skeleton />}
          {overviewStore.totalOperators !== null ? numberWithCommas(overviewStore.totalOperators) : ''}
        </StatsBlockHeader>
        <StatsBlockContent isWhite>
          {overviewStore.totalOperators === null ? <Skeleton /> : 'Operators'}
        </StatsBlockContent>
      </StatsBlock>
      <StatsBlock bgColor="#3F3ACA">
        <StatsBlockHeader isWhite>
          {overviewStore.totalValidators === null && <Skeleton />}
          {overviewStore.totalValidators !== null ? numberWithCommas(overviewStore.totalValidators) : ''}
        </StatsBlockHeader>
        <StatsBlockContent isWhite>
          {overviewStore.totalValidators === null ? <Skeleton /> : 'Validators'}
        </StatsBlockContent>
      </StatsBlock>
      <StatsBlock bgColor="transparent">
        <StatsBlockHeader>
          {overviewStore.totalEth === null && <Skeleton />}
          {overviewStore.totalEth !== null ? `${numberWithCommas(overviewStore.totalEth)} ETH` : ''}
        </StatsBlockHeader>
        <StatsBlockContent>
          {DvfNetwork.getActiveNetwork() === 'mainnet' ? (
            <>
              {overviewStore.totalUsd === null && <Skeleton />}
              {overviewStore.totalUsd ? `$${numberWithCommas(overviewStore.totalUsd)}` : ''}
            </>
          ) : ''} Staked
        </StatsBlockContent>
      </StatsBlock>
    </StatsContainer>
  );
};

export default observer(Stats);
