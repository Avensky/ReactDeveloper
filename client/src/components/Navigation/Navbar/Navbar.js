import React from 'react';
import classes from '../../../containers/Pages/Pages.module.scss'
import myClasses from './Navbar.module.scss'
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';
import { NavLink } from 'react-router-dom';

const navbar = (props) => (
    <div className={myClasses.Navbar}>
        <SidebarToggle clicked={props.sidebarToggleClicked}/>
        <div className={[myClasses.MobileLinks, myClasses.Mobile].join(' ')}>
        <div className={[myClasses.Logo, myClasses.Mobile].join(' ')}>
            <a  href="/home">
                <div className={myClasses.Logo}>
                    <Logo />   
                </div> 
            </a >
        </div>
        </div>
        <div className={myClasses.DesktopOnly}>
            <NavItems isLoggedIn={props.isLogged}/>
        </div>
    </div>
);

export default navbar;