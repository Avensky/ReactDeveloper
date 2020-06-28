import React from 'react';
import classes from './Logo.module.scss';
import myLogo from '../../assets/images/logo.png';

const logo = (props) => (
<div className={[classes.Logo].join(' ')} style={{height: props.height}}>
    <img className={classes.AppLogo} src={myLogo}  alt="Logo" />
</div>
)

export default logo;