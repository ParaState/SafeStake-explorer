import styled from 'styled-components';
import BaseStore from '~app/common/stores/BaseStore';
import ApplicationStore from '~app/common/stores/Application.store';

const applicationStore: ApplicationStore = BaseStore.getInstance().getStore('Application');
interface BlockHeaderTypee {
  isWhite?: boolean;
}

const BlockHeader = styled.div<BlockHeaderTypee>`
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  font-weight: 900;
  font-size: 28px;
  margin-bottom: 0;
  /* border-bottom: 2px solid ${props => {
    if (!props.isWhite && !applicationStore.isDarkMode) {
      return '#3F3ACA';
    }
    if (applicationStore.isDarkMode) {
      return 'transparent';
    }
    return 'white';
  }};
  line-height: 42px; */

  color: ${() => {
    if (applicationStore.isDarkMode) {
      return '#4DC9F0';
    } 
    return '#3F3ACA';
  }};
;
`;

export default BlockHeader;
