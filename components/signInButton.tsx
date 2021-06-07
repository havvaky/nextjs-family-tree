import React, {useContext} from 'react';
import {Button, makeStyles} from '@material-ui/core';
import {AppContext} from '../pages/AppContext';
import {useRouter} from 'next/router'


const useStyles = makeStyles((theme) => ({
    signInButton: {
        padding: '0.2em',
        marginRight: '1.5em',
        width: '4.5em',
        height: '2em',
        fontSize: '.8em',
        boxShadow: '.1px .1px 1px 1px #fff'
    },
}))

export default function signInButton() {
    const classes = useStyles();
    const router = useRouter();
    const context = useContext(AppContext);

    return(
        <Button
            variant="contained"
            color="primary"
            className={classes.signInButton}
            onClick={() => router.push('/login')}
            >Sign In
        </Button>
    )
};
