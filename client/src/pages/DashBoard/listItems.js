import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {Link} from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <Link to="/dashboard"><ListItemText primary="경기" /></Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to="/orders"><ListItemText primary="게시판(orders)" /></Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <Link to="/chart"><ListItemText primary="통계(chart)" /></Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <Link to="/title"><ListItemText primary="타이틀(title)" /></Link>
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <Link to="/dashboard"><ListItemText primary="Dashboard" /></Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <Link to="/dashboard"><ListItemText primary="Dashboard" /></Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <Link to="/dashboard"><ListItemText primary="Dashboard" /></Link>
    </ListItemButton>
  </React.Fragment>
);