import './App.css';
import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems } from './pages/DashBoard/listItems';
import Dashboard from './pages/DashBoard/DashBoard';
import Chart from './pages/DashBoard/Chart';
import Deposits from './pages/DashBoard/Deposits';
import Orders from './pages/DashBoard/Orders';
import Title from './pages/DashBoard/Title';
import SignUp from './pages/SignUp'
import Admin from './pages/Admin';
import { Modal } from '@mui/material'
import BettingList from './pages/BettingList';
import BettingAdmin from './pages/BettingAdmin';


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import GameAdmin from './pages/GameAdmin';
import CreateGame from './pages/CreateGame';
import Betting from './pages/Betting';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
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
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    mode: 'light',
  },
});


function App() {
  const [checkedBettings, setCheckedBettings] = React.useState([]);

  const [open, setOpen] = React.useState(true);
  
    /**--베팅 Modal창--- */
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
  };
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => { setModalOpen(false) };
  /*------------------*/
  const toggleDrawer = () => {
    setOpen(!modalOpen);
  };
  return (
    <Router>
        <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, width: 1000 }}>
                    <BettingList checkedBettings={checkedBettings} setCheckedBettings={setCheckedBettings}></BettingList>
                </Box>
            </Modal>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={checkedBettings.length} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems(checkedBettings.length, modalOpen, setModalOpen, handleOpen, handleClose, checkedBettings )}
              <Divider sx={{ my: 1 }} />

            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            {/**컨텐츠 들어가는 곳 */}
            <Routes>
              <Route path="/betting" element={<Betting checkedBettings={checkedBettings} setCheckedBettings={setCheckedBettings}></Betting>}></Route>
              <Route path="/dashboard" element={<Dashboard ></Dashboard>}></Route>
              <Route path="/signup" element={<SignUp ></SignUp>}></Route>
              <Route path="/deposits" element={<Deposits ></Deposits>}></Route>
              <Route path="/orders" element={<Orders ></Orders>}></Route>
              <Route path="/chart" element={<Chart ></Chart>}></Route>
              <Route path="/admin" element={<Admin ></Admin>}></Route>
              <Route path="/title" element={<Title children={<>hi</>} ></Title>}></Route>
              <Route path="/admin/game" element={<GameAdmin></GameAdmin>}></Route>
              <Route path="/admin/betting" element={<BettingAdmin></BettingAdmin>}></Route>
              <Route path="/creategame" element={<CreateGame ></CreateGame>}></Route>
            </Routes>
            {/**----------------- */}
          </Box>
        </Box>
        <Copyright sx={{ pt: 4 }} />
      </ThemeProvider>


    </Router>
  );
}

export default App;
