import React from 'react';
import classes from './Logo.module.css';
import myLogo from '../../assets/images/logo.png';

const logo = (props) => (
<div className={classes.Logo} style={{height: props.height}}>
    <img src={myLogo}  alt="MyLogo" />
</div>
)

export default logo;