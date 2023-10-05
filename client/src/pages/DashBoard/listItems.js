import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { Link } from 'react-router-dom';
import './listItem.css';
import Badge from '@mui/material/Badge';
import { Modal } from '@mui/material'
import BettingList from '../BettingList';




export const mainListItems = (badgeContentValue, modalOpen, setModalOpen, handleOpen, handleClose, checkedBettings) => (

  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <AutoAwesomeMosaicIcon />
      </ListItemIcon>
      <Link to="/dashboard"><ListItemText primary="대쉬보드" /></Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIndIcon />
      </ListItemIcon>
      <Link to="/deposits"><ListItemText primary="내 정보" /></Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <VideogameAssetIcon />
      </ListItemIcon>
      <Link to="/betting"><ListItemText primary="경기" /></Link>
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
        <MonetizationOnIcon />
      </ListItemIcon>
      <Link to="/products"><ListItemText primary="포인트 상점" /></Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <Link to="/admin"><ListItemText primary="선수 관리" /></Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <Link to="/admin/game"><ListItemText primary="대전 관리" /></Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <Link to="/admin/betting"><ListItemText primary="베팅 관리" /></Link>
    </ListItemButton>
    <ListItemButton onClick={() => { handleOpen() }}>
      <ListItemIcon >
        <Badge badgeContent={badgeContentValue} color="primary">  <ShoppingCartIcon></ShoppingCartIcon></Badge>
      </ListItemIcon>
      <ListItemText primary="베팅카트" />
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