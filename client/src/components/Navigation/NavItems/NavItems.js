import React from 'react';
import classes from'./NavItems.module.scss';
import myClasses from'./NavItem/NavItem.module.scss';
import NavItem from './NavItem/NavItem';

const navItems = (props) => (
      <ul className={[classes.NavItems].join(' ')}>
            <NavItem link='/home'>Home</NavItem>
            <NavItem link='/about'>About</NavItem>
            <NavItem link='/blog'>Blog</NavItem>
            {props.isLoggedIn  
                  ? <NavItem link='/newPost'>New Post</NavItem> 
                  : null}
            {props.isLoggedIn 
                  ? <NavItem link='/account'>Account</NavItem>
                  : null}
            {props.isLoggedIn 
                  ? <NavItem link='/profile'>Profile</NavItem>
                  : null}
            {!props.isLoggedIn 
                  ? <NavItem link='/login'>Login</NavItem> 
                  : <li className={myClasses.NavItem}><a href="/api/logout">Logout</a></li>}
            {!props.isLoggedIn 
                  ? <NavItem link='/signup'>Signup</NavItem> 
                  : null }
      </ul>
)

export default navItems;