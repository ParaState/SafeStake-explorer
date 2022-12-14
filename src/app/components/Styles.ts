import { makeStyles } from '@material-ui/core/styles';
import ApplicationStore from '~app/common/stores/Application.store';
import BaseStore from '~app/common/stores/BaseStore';
import { defaultFont } from '~root/theme';

const applicationStore: ApplicationStore = BaseStore.getInstance().getStore('Application');
export const useStyles = makeStyles((theme) => ({
    mainContainer: {
        height: '100%',
        width: '100%',
        maxWidth: '100%',
        minHeight: 600,
        padding: theme.spacing(4),
        alignItems: 'center',
        alignContent: 'center',
        margin: 'auto',
        flexDirection: 'row',
    },
    BlackText: {
        margin: 0,
        padding: 0,
        fontSize: 14,
        fontWeight: 600,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        lineHeight: 1.29,
    },
    OperatorType: {
        width: 13,
        height: 13,
        marginLeft: 5,
        // margin: 15px 34px 14px 4px;
        // padding: 5px 4px;
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    Verified: {
        width: 13,
        height: 13,
        // margin: 15px 34px 14px 4px;
        // padding: 5px 4px;
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(/images/verified_icon.svg)',
    },
    DappNode: {
        width: 13,
        // margin: 15px 34px 14px 4px;
        // padding: 5px 4px;
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(/images/dapp_node_icon.svg)',
    },
    passwordInput: {
        textSecurity: 'disc',
    },
    errorDiv: {
        paddingleft: '10px',
        width: '100%',
        color: 'red',
        minHeight: '50px',
        lineHeight: '50px',
        backgroundColor: '#FDE6E5',
    },
    errorText: {},
    paddingTop: {
        marginTop: '100px',
    },
    inputWithHint: {
        backgroundColor: 'red',
        display: 'flex',
    },
    inputError: {
        border: '1px solid red',
    },
    textError: {
        fontSize: '0.8rem',
        color: 'red',
    },
    privateKeyTextInput: {
        marginBottom: '10px',
    },
    doneIcon: {
        color: 'green',
        float: 'left',
    },
    badFormat: {
        color: 'red',
        float: 'left',
    },
    fileNameText: {
        textAlign: 'left',
    },
    clearIcon: {
        float: 'right',
    },
    fileContainer: {
        display: 'flex',
        padding: '10px',
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
        alignContent: 'center',
        height: '50px',
        border: 'dashed thin gray',
    },
    guideStepsContainerPaper: {
        cursor: 'pointer',
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
        '&:hover': {
            backgroundColor: 'aliceblue',
        },
    },
    bigSquareButton: {
        minHeight: 150,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        alignContent: 'center',
        alignItems: 'center',
    },
    bigSquareButtonGrid: {
        margin: 'auto',
        textAlign: 'center',
    },
    bigSquareButtonIcon: {
        width: 30,
        height: 30,
        maxWidth: 30,
        maxHeight: 30,
        margin: 'auto',
    },
    gridContainer: {
        flexGrow: 1,
        flexDirection: 'column',
    },
    rowGridContainer: {
        flexGrow: 1,
        flexDirection: 'row',
    },
    guideStep: {
        marginBottom: theme.spacing(1),
    },
    guideStepText: {
        fontSize: 14,
    },
    arrowIcon: {
        float: 'right',
        marginLeft: 'auto',
        marginRight: theme.spacing(1),
        alignSelf: 'center',
        marginTop: theme.spacing(1),
    },
    paperContainer: {
        padding: 30,
        backgroundColor: applicationStore.isDarkMode ? '#060440' : '#fafafa',
        '@media (max-width:1080px)': {
            padding: 15,
        },
    },
    tableWithBorder: {
        border: '1px solid transparent',
        borderRadius: 10,
        fontSize: 18,
        '& h3': {
            fontFamily: defaultFont,
            color: theme.palette.divider,
            fontWeight: 900,
            fontSize: 18,
        },
        '& > .MuiTableContainer-root': {
            borderRadius: 15,
        },
        '& .MuiTableCell-head': {
            fontWeight: 'bold',
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#A1ACBE',
            maxHeight: 26,
            paddingTop: 8,
            paddingBottom: 8,
        },
    },
    condensedTableRows: {
        '& .MuiTableCell-body': {
            height: 34,
            fontSize: 14,
            maxHeight: 20,
            paddingTop: 0,
            paddingBottom: 0,
        },
    },
    tableSubheaders: {
        marginTop: 10,
        marginBottom: 15,
        color: '#A1ACBE',
        textTransform: 'uppercase',
        fontSize: 12,
        fontWeight: 600,
    },
    Link: {
        display: 'inline-flex',
        alignItems: 'center',
        alignContent: 'center',
        cursor: 'pointer',
        flexDirection: 'row',
        color: `${theme.palette.text.primary}!important`,
        borderColor: `${theme.palette.text.primary}!important`,
        // marginBottom: 12,
    },
    OperatorLogo: {
        width: 40,
        height: 40,
        borderRadius: 4,
        alignContent: 'flex-end',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        marginRight: theme.spacing(3),
        backgroundImage: 'url(/images/logo_placeholder.svg)',
    },
    CantBeEligible: {
        color: 'red',
    },
    overviewSearch: {
        // '-webkit-box-shadow': 'none!important',
        // boxShadow: 'none!important',
        // outlineColor: 'red!important',
        // border: 'none !important',
        // outline: 'none !important',
        // '&.Mui-focused, &:focus-visible': {
        //   '& > .MuiFormControl-root': {
        //     borderImageWidth: 0,
        //     '-webkit-box-shadow': 'none!important',
        //     boxShadow: 'none!important',
        //     outlineColor: 'red!important',
        //     border: 'none !important',
        //     outline: 'none !important',
        //     '& > .MuiInputBase-root': {
        //       '-webkit-box-shadow': 'none!important',
        //       boxShadow: 'none!important',
        //       outlineColor: 'red!important',
        //       borderImageWidth: 0,
        //       border: 'none !important',
        //       outline: 'none !important',
        //     },
        //   },
        // },
        '& > .MuiFormControl-root': {
            // borderImageWidth: 0,
            // '& > .MuiInputBase-root.Mui-focused': {
            //   // border: '1px solid #5B6C84',
            //   borderImageWidth: 0,
            //   '-webkit-box-shadow': 'none!important',
            //   boxShadow: 'none!important',
            //   outlineColor: 'red!important',
            //   border: 'none !important',
            //   outline: 'none !important',
            // },
            '& > .MuiInputBase-root': {
                // '-webkit-box-shadow': 'none!important',
                // boxShadow: 'none!important',
                // outlineColor: 'red!important',
                // outline: 'none!important',
                border: '1px solid #5B6C84',
                '-webkit-appearance': 'none',
                borderRadius: 6,
                backgroundColor: 'white',
                color: '#5B6C84',
                '& > .MuiInputAdornment-root > .MuiButtonBase-root': {
                    backgroundColor: '#5B6C84',
                    height: 38,
                    width: 38,
                    marginRight: -13,
                    borderBottomRightRadius: 5,
                    borderTopRightRadius: 5,
                },
                '& > .MuiInputAdornment-root > .MuiButtonBase-root > .MuiIconButton-label': {
                    color: 'white',
                },
            },
        },
    },
    appBarSearch: {
        display: 'inline-flex',
        '& > .MuiFormControl-root': {
            '& > .MuiInputBase-root': {
                border: '1px solid #5B6C84',
                color: '#5B6C84',
                width: 340,
                display: 'inline-flex',
                margin: 'auto',
                marginRight: 10,
                '@media (max-width:767px)': {
                    width: '100%',
                    margin: 0,
                },
                '& > .MuiInputAdornment-root > .MuiButtonBase-root > .MuiIconButton-label': {
                    color: 'white',
                },
                '& > .MuiInputAdornment-root > .MuiButtonBase-root': {
                    borderColor: 'white',
                },
                '& > .MuiInputBase-input': {},
            },
        },
    },
}));

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptopM: '960px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px',
};

export const mediaQueryDevices = {
    mobileS: `min-width: ${size.mobileS}`,
    mobileM: `min-width: ${size.mobileM}`,
    mobileL: `min-width: ${size.mobileL}`,
    tablet: `min-width: ${size.tablet}`,
    laptop: `min-width: ${size.laptop}`,
    laptopM: `min-width: ${size.laptopM}`,
    laptopL: `min-width: ${size.laptopL}`,
    desktop: `min-width: ${size.desktop}`,
    desktopL: `min-width: ${size.desktop}`,
};
