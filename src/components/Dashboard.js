import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, Divider, Collapse, Icon } from '@material-ui/core';
import { KeyboardArrowDown, ExpandLess, ExpandMore } from '@material-ui/icons';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { BrowserRouter, Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import CenteredTabs from './PartnerTable';
import DemandMapTable from './DemandMapTable.js';
import AccountManagement from './AccountManagement';
import '../style/header.css';
import { Avatar } from '@material-ui/core';
import Partner from './Partner';
import DrugsManagement from './DrugsManagement';
import RequestTable from './RequestTable';
const drawerWidth = 260;
const mapStateToProps = (state) => {
    return {
        data: state
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: "white",
        color: "black"
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));



/*
    Dashboard Layout for Dashboard      
*/
function DashboardLayout(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const [drop, setDrop] = React.useState(true);

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    function Navigation(path) {
        console.log(props);
    }

    function handleClick() {
        setDrop(!drop);
    }
    return (
        <BrowserRouter>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className="header">
                            <Typography variant="h6" noWrap>
                                Admin Dashboard
                    </Typography>
                            <div className="user_info">
                                <Avatar alt="Remy Sharp" src={require("../assets/img1.jpg")} />
                                <div className="y_divider"></div>
                                <Link to="/account"> <h3>Mayank jain</h3> </Link>

                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                    open={open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>

                        <Link style={{ textDecoration: "none", color: "black" }} to="/">
                            <ListItem button key="Partners">
                                <ListItemIcon><img src={require("../assets/icon-vendors-active.png")} /></ListItemIcon>
                                <ListItemText primary="Partners" />
                            </ListItem>
                        </Link>
                        <ListItem onClick={handleClick} button key="Drugs Management">
                            <ListItemIcon><img src={require("../assets/icon-deugs.png")} /></ListItemIcon>
                            <ListItemText primary="Drugs Management" />

                            {drop ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={drop} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                                <Link style={{ textDecoration: "none", color: "black" }} to="/drugs">
                                    <ListItem button className={classes.nested}>
                                        <ListItemIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="Drugs" />
                                    </ListItem>
                                </Link>
                                <Link style={{ textDecoration: "none", color: "black" }} to="/request">
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Requests" />
                                </ListItem>
                                </Link>
                            </List>
                        </Collapse>



                        <ListItem button key='Customer Relations'>
                            <ListItemIcon><img src={require("../assets/icon-customers.png")} /></ListItemIcon>
                            <ListItemText primary="Customer Relations" />
                        </ListItem>
                        <ListItem button key="Coupons">
                            <ListItemIcon><img src={require("../assets/icon-coupons.png")} /></ListItemIcon>
                            <ListItemText primary="Coupons" />
                        </ListItem>
                        <Link style={{ textDecoration: "none", color: "black" }} to="/account">

                        </Link>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div>
                        <Route exact path="/" component={Partner} />
                        <Route exact path="/drugs" component={DrugsManagement} />
                        <Route exact path="/request" component={RequestTable}/>
                        <Route exact path="/account" component={AccountManagement} />
                        <Redirect to="/" />
                    </div>
                </main>

            </div>
        </BrowserRouter>
    );
}

export default (connect(mapStateToProps)(DashboardLayout));