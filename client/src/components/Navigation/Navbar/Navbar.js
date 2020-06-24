import React from 'react';
import classes from './Navbar.module.css'
//import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';

const navbar = (props) => (
    <div className={classes.Navbar}>
        <SidebarToggle clicked={props.sidebarToggleClicked}/>
        <div className={[classes.Navbar, classes.DesktopOnly].join(' ')}>
            <NavItems isLoggedIn={props.isLogged}/>
        </div>
    </div>
);

export default navbar;