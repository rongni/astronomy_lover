import { makeStyles } from '@material-ui/core/styles';
import { deepPurple, blueGrey, grey } from '@material-ui/core/colors'

export const useStyles = makeStyles((theme) => ({
    date: {
        minWidth: 100,
        background: grey[50],
        color: deepPurple[50],
        fontWeight: 300,
        borderStyle: 'none',
        borderWidth: 2,
        borderRadius: 12,
        paddingLeft: 14,
        paddingTop: 14,
        paddingBottom: 15,
        boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.14)',
        "&:focus": {
            borderRadius: 12,
            background: blueGrey[900],
            borderColor: 'white'
        },
    },
    button: {
        minWidth: 100,
        background: blueGrey[900],
        color: deepPurple[50],
        fontWeight: 300,
        borderStyle: 'none',
        borderWidth: 2,
        borderRadius: 12,
        paddingLeft: 14,
        paddingTop: 14,
        paddingBottom: 15,
        boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.14)',
        "&:focus": {
            borderRadius: 12,
            background: blueGrey[900],
            borderColor: 'white'
        },
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    error: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'red'
    },
    select: {
        minWidth: 100,
        background: blueGrey[900],
        color: deepPurple[50],
        fontWeight: 200,
        borderStyle: 'none',
        borderWidth: 2,
        borderRadius: 12,
        paddingLeft: 24,
        paddingTop: 14,
        paddingBottom: 15,
        boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.14)',
        "&:focus": {
            borderRadius: 12,
            background: blueGrey[900],
            borderColor: 'white'
        },
    }
  }));

  