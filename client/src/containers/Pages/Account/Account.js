import React, { Component } from 'react';
import Layout from '../../Layout/Layout';
//import Header from '../../Layout/Header/Header';
import myClasses from './Account.module.css';
import user from '../../../assets/images/user.jpg';
import classes from '../Pages.module.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

class Account extends Component {
    render () {
        let attachedClasses = [classes.Pages, myClasses.Account]
        let account = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        if (!this.props.error) {
                return(                
                    <div className={attachedClasses.join(' ')}>
                        <img src={this.props.payload.picture} alt="user"/>
                        <h1>{this.props.payload.name}</h1>
                        <small>{this.props.payload.email}</small>
                        <h2>Update account details</h2>
                        <label>Username:</label>
                        <input type="text" defaultValue={this.props.payload.name} />
                        <label>First Name:</label>
                        <input type="text" defaultValue={this.props.payload.givenName} />
                        <label>Last Name:</label>
                        <input type="text" defaultValue={this.props.payload.familyName} />
                        <label>Email:</label>
                        <input type="text" defaultValue={this.props.payload.email} />
                        <p>Update profile picture</p>
                        <input className={classes.picure} type="file" />
                        <button className={classes.btn}>Add Post</button>
                    </div>

                )
            
            //})
        
        }
        return(
            <Layout grid="one">
                {account}
            </Layout>
        )
    }
}

const mapStateToProps = state => {
    return {
       error: state.auth.error,
       isLoggedIn: state.auth.payload,
       payload: state.auth.payload,
       loginRedirectPath: state.auth.loginRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password, isSignup) => dispatch(actions.login(email,password,isSignup)),
        onSetLoginRedirectPath: () => dispatch(actions.setLoginRedirectPath('/home')),
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Account);