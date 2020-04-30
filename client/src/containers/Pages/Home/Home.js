import React from 'react';
import classes from './Home.module.css';
import Auxiliary from '../../../hoc/Auxiliary';

const home = () => {
    return (
        <Auxiliary>
            <div className={classes.Home}>
                <h1>Hello, I'm <span className={classes.highlight}>Uriel Zacarias</span></h1>
                <h2>full stack web developer</h2>
            </div>
        </Auxiliary>
    )
}


export default home;