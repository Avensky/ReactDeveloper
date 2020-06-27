import React from 'react';
import classes from './Navbar.module.scss'
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';
import { NavLink } from 'react-router-dom';

const navbar = (props) => (
    <nav className={[classes.Navbar].join(' ')} role="navigation">
        <SidebarToggle clicked={props.sidebarToggleClicked}/>
        <div className={[classes.Logo, classes.Mobile].join(' ')}>
            <NavLink  to="/">
                <Logo />    
            </NavLink >
        </div>
        <div className={[classes.Navbar, classes.DesktopOnly].join(' ')}>
            <NavItems isLoggedIn={props.isLogged}/>
        </div>
    </nav>
);

export default navbar;