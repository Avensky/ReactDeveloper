import React from 'react';
import Layout from '../../Layout/Layout';
//import Header from '../../Layout/Header/Header';
import myClasses from './Account.module.css';
import user from '../../../assets/images/user.jpg';
import classes from '../Pages.module.css';

const account = () => {
    let attachedClasses = [classes.Pages, myClasses.Account]
    return(
    <Layout grid="one">
        <div className={attachedClasses.join(' ')}>
            <img src={user} alt="user"/>
            <h1>By Avensky</h1>
            <small>urielzacarias@gmail.com</small>
            <h2>Update account details</h2>
            <label>Username:</label>
            <input type="text" defaultValue="avensky" />
            <label>Email:</label>
            <input type="text" defaultValue="urielzacarias@gmail.com" />
            <p>Update profile picture</p>
            <input className={classes.picure} type="file" />
            <button className={classes.btn}>Add Post</button>

        </div>
    </Layout>
    )
}
export default account;