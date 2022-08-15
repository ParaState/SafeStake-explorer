import TableRow from '@material-ui/core/TableRow';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { grayBackgroundColor } from '~root/theme';
import BaseStore from '~app/common/stores/BaseStore';
import ApplicationStore from '~app/common/stores/Application.store';

const applicationStore: ApplicationStore = BaseStore.getInstance().getStore('Application');

const StyledRow = withStyles(() => createStyles({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: (props: any) => props.isoperators ? 'rgba(77, 201, 240, 0.1)' : 'rgba(63, 58, 202, 0.1)',
      color: applicationStore.isDarkMode ? grayBackgroundColor : 'initial',
    },
  },
}))(TableRow);

export default StyledRow;
