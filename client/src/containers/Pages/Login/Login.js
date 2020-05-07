import React, { Component } from 'react';
import Layout from '../../Layout/Layout';
import classes from '../Pages.module.css';
import myClasses from './Login.module.css';
import { Redirect } from 'react-router-dom';
//import { checkValidity } from '../../../utility/utility';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
//import { updateObject } from '../../../utility/utility';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Auxiliary from '../../../hoc/Auxiliary';
class Login extends Component {
    state = {
        controls: {
            name: {
                value: '',
                validation: {
                    required: false
                }
            },
            givenName: {
                value: '',
                validation: {
                    required: false
                }
            },
            familyName: {
                value: '',
                validation: {
                    required: false
                }
            },
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

    componentDidMount() {
        console.log("isSignup: "+this.state.isSignup)
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
    registerHandler = ( event ) => {
        event.preventDefault();
        this.props.onLogin( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
    }

    render () {
    //       let form = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        let form = (
            <form onSubmit={this.loginHandler}>
            <legend>Log in!</legend>
            <label>Email:</label>
            <input 
                type="email"
                name="email"
                onChange={(event) => this.inputChangedHandler( event, "email")}
                placeholder="Enter Email"
            />

            <label>Password:</label>
            <input 
                type="password"
                name="password"
                onChange={(event) => this.inputChangedHandler( event, "password")}
                placeholder="Enter Password"
            />
            
            <input type="checkbox"/> <p className={classes.inline}>Rembember Me</p>
                    <button 
                        className={classes.btn}>Login</button>
            </form>

        )        
        if (!this.state.isSignup){
            form = (
            <Auxiliary>
                <form onSubmit={this.registerHandler}>
                    <legend>Register Today!</legend>
                    <label>Username:</label>
                    <input 
                        type="text"
                        name="Username"
                        onChange={(event) => this.inputChangedHandler( event, "password")}
                        placeholder="Enter Username"
                    />
                    <label>First Name:</label>
                    <input 
                        type="text"
                        name="givenName"
                        onChange={(event) => this.inputChangedHandler( event, "givenName")}
                        placeholder="Enter Username"
                    />
                    <label>Last Name:</label>
                    <input 
                        type="text"
                        name="familyName"
                        onChange={(event) => this.inputChangedHandler( event, "familyName")}
                        placeholder="Enter Last Name"
                    />
                    <label>Email:</label>
                    <input 
                        type="email"
                        name="Email"
                        onChange={(event) => this.inputChangedHandler( event, "email")}
                        placeholder="Enter Email"
                    />

                    <label>Password:</label>
                    <input 
                        type="Password"
                        name="Password"
                        onChange={(event) => this.inputChangedHandler( event, "password")}
                        placeholder="Enter Password"
                    />

                    <label>Confirm Password:</label>
                    <input 
                        type="Password"
                        name="Confirm Password"
                        onChange={(event) => this.inputChangedHandler( event, "confirmPassword")}
                        placeholder="Confirm Password"
                    />
                        <button 
                            className={classes.btn}>Register</button>
                    </form>
                </Auxiliary>
            )
        }

        let body = (
            <div className={classes.Pages}>
                {form}
                <button 
                    onClick={this.switchModeHandler}
                    className={myClasses.Danger}
                >Switch to {this.state.isSignup ? 'Sign up' : 'Sign in'}</button>
                <a href="/auth/google">Login With Google</a>
                <p>Forgot Password?</p>
                <div className={classes.borderTop + classes.pt3}  />
                
                <button>Need an account? Sign up!</button>
                <div className={classes.borderTop + classes.pt3}  />
            </div>
        )
 
        
        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        
        let loginRedirect = null;
        if (this.props.isLoggedIn) {
            loginRedirect = <Redirect to={this.props.loginRedirectPath}/>
        }

        return(
            <Layout grid="one">
                {loginRedirect}
                {errorMessage}
                {body}
            </Layout>
            )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isLoggedIn: state.auth.payload,
        loginRedirectPath: state.auth.loginRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password, isSignup) => dispatch(actions.login(email,password,isSignup)),
        onSetLoginRedirectPath: () => dispatch(actions.setLoginRedirectPath('/blog')),
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Login);