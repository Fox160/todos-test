import { makeStyles } from '@material-ui/core/styles';

const classes = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: '0 15px',
        '&:last-child': {
            paddingBottom: theme.spacing(2),
        },
    },
    textField: {
        display: 'flex',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        flexGrow: 1,
    },
    taskField: {
        paddingTop: 0,
        marginRight: 0,
        marginLeft: 0,
    },
    textFieldInput: {
        paddingTop: 0,
        marginLeft: 8,

        '&:focus': {
            marginLeft: 0,
        },
    },
    button: {
        display: 'flex',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(1),
        padding: theme.spacing(2),
        flexGrow: 0.5,
    },
    icon: {
        padding: 9,
    },
}));

export default classes;
