import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import ListAltIcon from '@material-ui/icons/ListAlt';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { CssBaseline } from '@material-ui/core';
import { AuthContext } from '../../context/auth/AuthState';

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
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const authContext = useContext(AuthContext);

  const {isAuthenticated, logout, user, loadUser } = authContext;

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <ListItem button component={Link} 
        to={'/tradelog'} 
        onClick={handleDrawerClose}
      >
        <ListItemIcon><ListAltIcon /></ListItemIcon>
        <ListItemText primary='Trade Log' />
      </ListItem>
      <ListItem button component={Link} 
        to={'/dashboard'} 
        onClick={handleDrawerClose}
      >
        <ListItemIcon><ShowChartIcon /></ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItem>
      <ListItem button component={Link} 
        to={'/analytics'} 
        onClick={handleDrawerClose}
      >
        <ListItemIcon><EqualizerIcon /></ListItemIcon>
        <ListItemText primary='Analytics' />
      </ListItem>
      <ListItem button component={Link} 
        to={'/settings'} 
        onClick={handleDrawerClose}
      >
        <ListItemIcon><SettingsIcon /></ListItemIcon>
        <ListItemText primary='Settings' />
      </ListItem>
      <ListItem button component={Link}
        onClick={onLogout} 
        to={'/login'} 
      >
        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
        <ListItemText primary='Log out' />
      </ListItem>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <ListItem button component={Link} 
        to={'login'} 
        onClick={handleDrawerClose}
      >
        <ListItemIcon><AccountCircleIcon /></ListItemIcon>
        <ListItemText primary='Log in' />
      </ListItem>
    </Fragment>
  )

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
          {isAuthenticated ? authLinks : guestLinks}
        </List>
      </Drawer>
    </div>
  );
};

export default NavBar;
