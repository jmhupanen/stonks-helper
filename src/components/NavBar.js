import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FunctionsIcon from '@material-ui/icons/Functions';
import { CssBaseline } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    background: '#000000', 
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
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
    [theme.breakpoints.up('m')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

function NavBar() {
    const classes = useStyles()
    const theme = useTheme()
    const [open, setOpen] = useState(false)

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };
    
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar 
                position="fixed"  
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar variant="dense">
                    <IconButton 
                        onClick={handleDrawerOpen} 
                        edge="start" 
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })} 
                        color="inherit" 
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        Stonks Helper
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                anchor="left"
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
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>

                <List>
                    <ListItem button component={Link} 
                        to={'/'} 
                        onClick={handleDrawerClose}
                    >
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary='Home' />
                    </ListItem>
                    <ListItem button component={Link} 
                        to={'/trades'} 
                        onClick={handleDrawerClose}
                    >
                        <ListItemIcon><ListAltIcon /></ListItemIcon>
                        <ListItemText primary='Trades' />
                    </ListItem>
                    <ListItem button component={Link} 
                        to={'/calculator'} 
                        onClick={handleDrawerClose}
                    >
                        <ListItemIcon><FunctionsIcon /></ListItemIcon>
                        <ListItemText primary='Calculator' />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
}

export default NavBar
