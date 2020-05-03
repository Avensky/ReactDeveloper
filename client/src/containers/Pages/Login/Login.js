import React, { Component } from 'react';
import Layout from '../../Layout/Layout';
import classes from '../Pages.module.css';
import { Redirect } from 'react-router-dom';
//import { checkValidity } from '../../../utility/utility';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
//import { updateObject } from '../../../utility/utility';

class Login extends Component {
    state = {
        controls: {
            email: {
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    inputChangeHandler = ( event ) => {
        console.log(event.target.value);
    }


    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
//                valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        };
        this.setState( { controls: updatedControls } );
    }

    
    loginHandler = ( event ) => {
        event.preventDefault();
        this.props.onLogin( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
    }

    render () {
        
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let form = (
            <form className={classes.Pages} onSubmit={this.loginHandler}>
                <legend>Log in!</legend>
                {errorMessage}
                <label>Email:</label>
                <input 
                    type="email"
                    name="email"
                    //id="email"
//                    onChange={this.inputChangedHandler}
                    onChange={(event) => this.inputChangedHandler( event, "email")}

                    //value={this.state.value}
                    placeholder="Enter Email"
                />

                    <label>Password:</label>
                    <input 
                        type="password"
                        name="password"
                        //id="password"
                        onChange={(event) => this.inputChangedHandler( event, "password")}
                        //value={this.state.value}
                        placeholder="Enter Password"
                    />
                    <input type="checkbox"/> <p className={classes.inline}>Rembember Me</p>
                    <button className={classes.btn}>{this.state.isSignup ? 'Login' : 'Register'}</button>
                    <a href="/auth/google">Login With Google</a>
                    <p>Forgot Password?</p>
                    <div className={classes.borderTop + classes.pt3}  />
                    
                    <div 
                        onClick={this.switchModeHandler}>{this.state.isSignup ? 'Need an account? Sign up!' : 'Ready to log in.'}
                    </div>
                    <div className={classes.borderTop + classes.pt3}  />
                </form>
        )

        let loginRedirect = null;
        if (this.props.isLoggedIn) {
            loginRedirect = <Redirect to={this.props.loginRedirectPath}/>
        }

        return(
            <Layout grid="one">
                {loginRedirect}
                {form}
            </Layout>
            )
    }
}

const mapStateToProps = state => {
    return {
       error: state.auth.error,
       isLoggedIn: state.auth.payload,
       loginRedirectPath: state.auth.loginRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password, isSignup) => dispatch(actions.login(email,password,isSignup)),
        onSetLoginRedirectPath: () => dispatch(actions.setLoginRedirectPath('/home')),
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Login);