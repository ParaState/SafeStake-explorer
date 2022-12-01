import { makeStyles } from '@material-ui/core/styles';
import { defaultFont } from '~root/theme';
import BaseStore from '~app/common/stores/BaseStore';
import ApplicationStore from '~app/common/stores/Application.store';

const applicationStore: ApplicationStore = BaseStore.getInstance().getStore('Application');

export const useStyles = makeStyles((theme) => ({
    '@global': {

        '.MuiPaper-root.MuiAutocomplete-paper.MuiPaper-elevation1.MuiPaper-rounded ul': {
            maxHeight: '493px!important',
            '@media (max-width:540px)': {
                maxHeight: '558px!important',
            },
        },
    },
    root: {
        marginTop: 64,
        flexGrow: 1,
        '& > .MuiPaper-root > .MuiToolbar-root': {
            paddingRight: 5,
            backgroundColor: applicationStore.isDarkMode ? '#3F3ACA' : 'white',
            justifyContent: 'space-between',
        },
    },
    menuButtons: {
        marginRight: 24,
    },
    FirstSection: {
        display: 'none',
        '@media (min-width:768px)': {
            display: 'inline-flex',
        },
    },
    SecondSection: {
        display: 'none',
        '@media (max-width:767px)': {
            display: 'inline-flex',
        },
    },
    SmartSearchWrapper: {
        display: 'flex',
    },
    menuButton: {
        // marginRight: 24,
        // marginLeft: 'auto',
        color: applicationStore.isDarkMode ? 'white' : 'black',
    },
    SearchIcon: {
        width: 24,
        height: 24,
    },
    title: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: 200,
        marginTop: -9,
    },
    appBarLink: {
        textTransform: 'uppercase',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 12,
        margin: 'auto',
        fontFamily: defaultFont,
        color: applicationStore.isDarkMode ? 'white' : '#000000',
        borderColor: 'white!important',
        marginRight: 10,
        '& > a': {
            color: applicationStore.isDarkMode ? 'white' : '#000000',
            borderColor: applicationStore.isDarkMode ? 'white' : '#000000',
        },
        '& > a:hover, & > a:active, & > a:focus': {
            color: applicationStore.isDarkMode ? '#4DC9F0' : '#3F3ACA',
        },
    },
    appBarLinkActive: {
        color: applicationStore.isDarkMode ? '#4DC9F0 !important' : '#3F3ACA !important',
    },
    appBarButton: {
        margin: 'auto',
        color: theme.palette.text.primary,
        borderColor: '#5B6C84',
        marginRight: 10,
        '&.Mui-disabled': {
            border: '1px solid #5B6C84',
        },
        '& > a, & > a:hover, & > a:active, & > a:focus': {
            color: 'white',
        },
    },
    appBarButtonWhite: {
        color: '#00000!important',
        borderColor: '#5B6C84',
        '& > a, & > a:hover, & > a:active, & > a:focus': {
            color: '#00000!important',
        },
    },
    toolbarLinks: {
        textAlign: 'left',
        marginLeft: 50,
        '& > a, & > a:hover, & > a:active, & > a:focus': {
            marginLeft: 30,
            float: 'left',
            textDecoration: 'none',
        },
    },
    toolbarButtons: {
        float: 'right',
        display: 'flex',
        marginRight: 0,
        height: '100%',
        marginLeft: 'auto',
        alignItems: 'center',
        '& > .MuiButtonBase-root, & > .MuiTypography-root > .MuiButtonBase-root': {
            width: '100%',
            height: 40,
            minWidth: 180,
            marginRight: 10,
        },
        '& > .MuiTypography-root': {
            marginRight: 10,
        },
        '& > a, & > a:hover, & > a:active, & > a:focus': {
            textDecoration: 'none',
        },
    },
    drawer: {
        '& > .MuiDrawer-paper': {
            backgroundColor: '#A1ABBE',
            color: applicationStore.isDarkMode ? 'white' : '#000000',
            fontWeight: 'bold',
            minWidth: 200,
            textAlign: 'center',
            fontSize: 12,
            '& > ul > div': {
                width: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                '& > a': {
                    width: '100%',
                    fontWeight: 'bold',
                    '& > .MuiListItem-root': {
                        textAlign: 'center',
                        color: applicationStore.isDarkMode ? 'white' : '#000000',
                        fontWeight: 'bold',
                    },
                },
            },
        },
    },
    buttonBadge: {
        '& > .MuiButton-root': {
            minWidth: 180,
            paddingRight: 5,
        },
        '& > .MuiBadge-badge': {
            marginTop: 18,
            marginLeft: 15,
            backgroundColor: 'lightgreen',
        },
    },
}));
