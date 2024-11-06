import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import "./SideBar.css"
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Card, CardContent, CardMedia, Collapse, Grid } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircleIcon from '@mui/icons-material/Circle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Banquetlogo from '../images/user/Banquetlogo.jpg';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import Person3OutlinedIcon from '@mui/icons-material/Person3Outlined';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';


import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
const drawerWidth = 240;

const settings = ['Profile', 'Account', 'Logout', 'Setting'];

const iconMap = {
  Profile: <Person3OutlinedIcon />,
  Account: <AccountCircleOutlinedIcon />,
  Logout: <ExitToAppOutlinedIcon />,
  Setting: <SettingsIcon />
};
const routeMap = {
  Profile: '/profile',
  Account: '/account',
  Logout: '/',
  Setting: '/setting'
};
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: 'white',
  color: 'black',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const notificationsRaw = [
  {
    user: {
      name: 'John Doe',
      avatar: 'https://einfosoft.com/templates/admin/kuber/source/light/assets/images/user/admin.jpg',
    },
    message: 'New ticket Added',
    time: '30 min',
  },
  {
    user: {
      name: 'Joseph William',
      avatar: 'https://example.com/joseph-william.jpg',
    },
    message: 'Purchase New Theme and make payment',
    time: '30 min',
  },
  {
    user: {
      name: 'Sara Soudein',
      avatar: 'https://example.com/sara-soudein.jpg',
    },
    message: 'currently login',
    time: '30 min',
  },
  {
    user: {
      name: 'Suzen',
      avatar: 'https://example.com/suzen.jpg',
    },
    message: 'Purchase New Theme and make payment',
    time: 'yesterday',
  },
];


export default function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [dashboardOpen, setDashboardOpen] = React.useState(false);
  const [parrent, setparrent] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [notifications, setNotificationData] = React.useState(notificationsRaw)
  const [readNotifications, setReadNotifications] = React.useState([]);
  const [removeReadNotification, setRemoveReadNotifications] = React.useState()


  // const [notificationsRead, setNotifications] = React.useState(notificationsRaw);

  // const handleRemove = (indexToRemove) => {
  //   setNotifications((prevNotifications) => 
  //     prevNotifications.filter((_, index) => index !== indexToRemove)
  //   );
  // }

  const readnum = notifications.length - readNotifications.length
  console.log(readnum)
  React.useEffect(() => {
    setNotificationData(notificationsRaw);
  }, []);
  console.log(notifications)
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleRemove = (index) => {
    setReadNotifications((prevReadNotifications) => [...prevReadNotifications, index]);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDashboardClick = () => {
    setDashboardOpen(!dashboardOpen);
    if (!dashboardOpen) {
      setparrent(false);
    }
  };

  const handaleclidasbor2 = () => {
    setparrent(!parrent);
    if (!parrent) {
      setDashboardOpen(false);
    }
  };

  const notificationsLabel = (count) => {
    if (count === 0) {
      return 'no notifications';
    }
    if (count > 99) {
      return 'more than 99 notifications';
    }
    return `${count} notifications`;
  }
  const [anchorElUser, setAnchorElUser] = React.useState(null);




  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const NotificationItem = ({ user, message, time }) => {
    return (
      <div className="notification-item">
        <img src={user.avatar} alt={user.name} />
        <div className="notification-content">
          <p>{user.name}</p>
          <p>{message}</p>
        </div>
        <span className="notification-time">{time}</span>
      </div>
    );
  };



  const handleMarkAsRead = (index) => {
    // Logic to mark the notification as read
    console.log('Mark notification as read:', index);
  };

  const handleClearAll = () => {
    // Logic to clear all notifications
    console.log('Clear all notifications');
  };
  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>

        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton aria-label={notificationsLabel(100)} onClick={handleToggleNotifications}>
              <Badge badgeContent={readnum} color="secondary">

                <NotificationsIcon />
              </Badge>

            </IconButton>
            {showNotifications && (
              <div className="notifications">
                <div className='notify'>
                  <p>Notifications</p>
                </div>
                {/* <h2>Notifications</h2> */}
                <div className="notification-actions">
                  <button onClick={handleMarkAsRead}>Mark as read</button>
                  <button onClick={handleClearAll}>Clear all</button>
                </div>
                <div className="notification-list">
                  {notifications.map((notification, index) => (
                    <div key={index} className="notification-item">
                      <img src={notification.user.avatar} style={{ height: "40px" }} alt={notification.user.name} />
                      <div className="notification-content" onClick={() => handleRemove(index)}>

                        <p className='new-notification'>{notification.user.name}
                          {!readNotifications.includes(index) && <span className='circle-icon'><CircleIcon sx={{
                            height: 15
                          }} /></span>}
                        </p>
                        <p>{notification.message}</p>
                      </div>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                  ))}
                </div>
                {/* <button className="show-all">Show all</button> */}
              </div>)}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Typography component="h5" className='admin-title'>
                  Ella Jones
                </Typography>
                <Avatar alt="Remy Sharp" src='https://einfosoft.com/templates/admin/kuber/source/light/assets/images/user/admin.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu} component={Link} to={routeMap[setting]}>
                  <ListItemIcon>
                    {iconMap[setting]}
                  </ListItemIcon>
                  <Typography textAlign="center"> {setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </AppBar>

      <Drawer className='side-menu-text' variant="permanent" open={open}>
        <DrawerHeader>
          <Avatar className='mart-logo' alt="Online Mart" src={Banquetlogo}/>
          <IconButton className='left-click' onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <List>
          {open && (<Card className='shadow-none' sx={{ maxWidth: 345 }}
            open={open}  >
            <CardMedia className='admin-profile'
              sx={{ height: 75 }}
              image="https://einfosoft.com/templates/admin/kuber/source/light/assets/images/user/admin.jpg"
            />
            <CardContent>
              <Typography className='admin-titlemd' gutterBottom variant="h5" component="div">
                Sarah Smith
              </Typography>
              <Typography className='admin-sub-title' variant="h6">
                Admin
              </Typography>
            </CardContent>
          </Card>
          )}
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/dasboard') }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: 'black',
                }}
              >
                <SpaceDashboardOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{
                  opacity: open ? 1 : 0,
                  color: 'black',
                }}
              />
            </ListItemButton>
          </ListItem>



          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/addpages') }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                pl: 4,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 4 : 'auto',
                  justifyContent: 'center',
                  color: 'black',
                }}
              >
              </ListItemIcon>
              <ListItemText
                primary="Pages"
                sx={{
                  opacity: open ? 1 : 0,
                  color: 'black',
                }}
              />
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/sectionlist') }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                pl: 4,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 4 : 'auto',
                  justifyContent: 'center',
                  color: 'black',
                }}
              >

              </ListItemIcon>
              <ListItemText
                primary="Section"
                sx={{
                  opacity: open ? 1 : 0,
                  color: 'black',
                }}
              />
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/contentlist') }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                pl: 4,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 4 : 'auto',
                  justifyContent: 'center',
                  color: 'black',
                }}
              >

              </ListItemIcon>
              <ListItemText
                primary="Content"
                sx={{
                  opacity: open ? 1 : 0,
                  color: 'black',
                }}
              />
            </ListItemButton>
          </ListItem>

          {/* *************************************************************************************************** */}
  <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/typeofmenu') }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                pl: 4,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 4 : 'auto',
                  justifyContent: 'center',
                  color: 'black',
                }}
              >

              </ListItemIcon>
              <ListItemText
                primary="Type Of Menu"
                sx={{
                  opacity: open ? 1 : 0,
                  color: 'black',
                }}
              />
            </ListItemButton>
          </ListItem>
{/* *************************************************************************************************** */}

{/* *************************************************************************************************** */}
<ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/menumaster') }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                pl: 4,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 4 : 'auto',
                  justifyContent: 'center',
                  color: 'black',
                }}
              >

              </ListItemIcon>
              <ListItemText
                primary="Menu Master"
                sx={{
                  opacity: open ? 1 : 0,
                  color: 'black',
                }}
              />
            </ListItemButton>
          </ListItem>
{/* *************************************************************************************************** */}


      
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/submenumaster') }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                pl: 4,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 4 : 'auto',
                  justifyContent: 'center',
                  color: 'black',
                }}
              >
              </ListItemIcon>
              <ListItemText
                primary="Menu Price Master"
                sx={{
                  opacity: open ? 1 : 0,
                  color: 'black',
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/orderlist') }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                pl: 4,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 4 : 'auto',
                  justifyContent: 'center',
                  color: 'black',
                }}
              >
              </ListItemIcon>
              <ListItemText
                primary="Orders List"
                sx={{
                  opacity: open ? 1 : 0,
                  color: 'black',
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/managemet') }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: 'black',
                }}
              >
            <AccountCircleOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Account"
                sx={{
                  opacity: open ? 1 : 0,
                  color: 'black',
                }}
              />
            </ListItemButton>
          </ListItem>

        </List>
        </Drawer>
        </Box>
        );
}
