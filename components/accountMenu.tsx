import React, {useContext} from 'react';
import {Avatar, IconButton, Menu, MenuItem, makeStyles, Button} from '@material-ui/core';
import {AppContext} from '../pages/AppContext';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: 40,
        height: 40,
        marginRight: 20,
        background: '#7b1fa2',
    },
    menu: {
        marginTop: '1.7em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signOut: {
    }
}))

export default function accountMenu() {
    const context = useContext(AppContext);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        // @ts-ignore
        context.toggleSignIn();
    };

    return(<>
        <IconButton onClick={handleClick}>
            <Avatar alt="" src="/broken-image.jpg" className={classes.avatar} />
        </IconButton>
    <Menu
        className={classes.menu}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
    >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem className={classes.signOut} onClick={handleClose}>Sign out</MenuItem>
    </Menu>
   </>)
}
