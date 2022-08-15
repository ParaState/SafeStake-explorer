import styled from 'styled-components';
import { mediaQueryDevices } from '~app/components/Styles';
import BaseStore from '~app/common/stores/BaseStore';
import ApplicationStore from '~app/common/stores/Application.store';

const applicationStore: ApplicationStore = BaseStore.getInstance().getStore('Application');

const Block = styled.div`
  ${({ bgColor, theme }) => `
    height: 108px;
    min-height: 108px;
    width: 100%;
    background-color: ${applicationStore.isDarkMode ? '#201C9E' : 'white'};
    border-radius: 10px;
    margin: auto;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
  
    @media (${mediaQueryDevices.tablet}) {
      margin-right: 30px;
      margin-left: 30px;
      width: 250px;
      min-width: 200px;
      margin-top: auto;
      
      &:nth-child(1) {
        margin-left: auto;
      }
  
      &:last-child {
        margin-right: auto;
      }
    }
  `}
`;

export default Block;
