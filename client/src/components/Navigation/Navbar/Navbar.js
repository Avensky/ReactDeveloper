import React from 'react';
import classes from './Navbar.module.css'
//import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';

const navbar = (props) => (
    <nav>
        <SidebarToggle clicked={props.sidebarToggleClicked}/>
        <div className={classes.Navbar}>
            <NavItems isLoggedIn={props.isLogged}/>
        </div>
    </nav>
);

export default navbar;