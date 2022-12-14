import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    Status: (props: any) => ({
        width: 'fit-content',
        height: props.isBig ? 28 : 20,
        fontSize: props.isBig ? 14 : 12,
        borderRadius: props.isBig ? 15 : 15,
        fontWeight: props.isBig ? 500 : 600,
        // eslint-disable-next-line no-nested-ternary
        backgroundColor: props.isActive === 'Active' ? 'rgb(6, 182, 79)' : (props.isActive === 'Offline' ? 'rgb(255, 153, 18)' : 'rgb(236, 28, 38)'),
        color: '#FFFFFF',
        // backgroundColor: props.isActive ? 'rgba(6, 182, 79, 0.12)' : 'rgba(236, 28, 38, 0.12)',
        padding: props.isActive ? '2px 5px 3px 4px' : '2px 4px 3px',
    }),
}));
