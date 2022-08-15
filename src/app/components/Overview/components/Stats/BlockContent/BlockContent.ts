import styled from 'styled-components';
import BaseStore from '~app/common/stores/BaseStore';
import ApplicationStore from '~app/common/stores/Application.store';

const applicationStore: ApplicationStore = BaseStore.getInstance().getStore('Application');

interface BlockContentType {
  isWhite?: boolean;
}

const BlockContent = styled.div<BlockContentType>`
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  margin-top: 0;
  font-size: 16px;
  color: ${() => {
    if (applicationStore.isDarkMode) {
      return '#A09DEC';
    } 
    return '#3F3ACA';
  }};
`;

export default BlockContent;
