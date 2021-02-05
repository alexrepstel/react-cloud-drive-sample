import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import siderbarLogo from './img/sidebar_brand_logo.png';
import HomeIcon from '@material-ui/icons/Home';
import StorageIcon from '@material-ui/icons/Storage';
import ForumIcon from '@material-ui/icons/Forum';
import TimelineIcon from '@material-ui/icons/Timeline';
import GroupIcon from '@material-ui/icons/Group';
import SettingsIcon from '@material-ui/icons/Settings';
import { withTheme } from '@material-ui/core';

  
export default props => {
  return (
    <Menu>

    <img className="sidebar-brand-logo sidebar-brand" src={siderbarLogo}></img>
      <a className="menu-item " href="/">
       <TimelineIcon></TimelineIcon> <br></br>Dashboard
      </a>

      <a className="menu-item" href="/drive">
       <StorageIcon></StorageIcon><br></br> TMS Drive
      </a>

      <a className="menu-item" href="/messenger">
        <ForumIcon></ForumIcon><br></br>Messenger
      </a>


      <a className="menu-item" href="/settings">
      <SettingsIcon></SettingsIcon><br></br>Settings
      </a>
    </Menu>
  );
};