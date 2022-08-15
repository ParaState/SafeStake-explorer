import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import { mediaQueryDevices } from '~app/components/Styles';

const SearchInput = styled(TextField)`
  width: 458px;
  margin: auto;
  margin-top: 0;
  height: 40px;
  max-height: 40px;
  padding-left: 0;
  padding-right: 5px!important;
  
  @media (max-width: 767px) {
    width: 100%;
  }
  
  @media (${mediaQueryDevices.tablet}) {
    width: 458px;
  }
  
  & > .MuiInputBase-root {
    padding-right: 13px!important;
    padding-top: 0;
    padding-bottom: 0;
    border-radius: 10px!important;
  }

  & > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root {
    background-color: transparent !important;
    border-top-right-radius: 30px !important;
    border-bottom-right-radius: 30px !important;
  }

  & > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root > .MuiIconButton-label {
    color: #3F3ACA !important;
  }
`;

export default SearchInput;
