import React, {useContext} from "react";
import {
    IconButton,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Toolbar,
    Typography,
    AppBar,
    Divider, Drawer, Hidden, Avatar, Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useRouter } from 'next/router';
import {AppContext} from '../pages/AppContext';
import SignInButton from './signInButton';
import AccountMenu from './accountMenu';


const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        display: 'flex',
        zIndex: theme.zIndex.drawer + 1,
        width: '100%',
    },
    menuButton: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    toolbarWrap: {
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
}),
    {
        name: "MuiCustomStyle"
    }
    );


export default function navigation() {
    const classes = useStyles();
    const router = useRouter();
    const context = useContext(AppContext);
    const [open, setOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const itemsList = [
        {
            text: "Home",
            onClick: () => router.push("/")
        },
        {
            text: "Sign In",
            onClick: () => router.push("/login")
        },
        {
            text: "Playground",
            onClick: () => router.push("/playground")
        },
    ];

    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <Divider />
            <List>
                {itemsList.map((item, index) => {
                    const { text, onClick } = item;
                    return (
                        <ListItem button key={text} onClick={onClick}>
                            <ListItemText primary={text} />
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbarWrap}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Family Tree
                    </Typography>
                {/* @ts-ignore*/}
                    {!context.isSignedIn ? <SignInButton/> : <AccountMenu/>}
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer}>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        open={open}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown>
                    <Drawer
                        variant="permanent"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}
