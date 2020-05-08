import React, { Component } from 'react';
import Layout from '../../Layout/Layout';
import Header from '../../Layout/Header/Header';
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
            username: {
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
            },
            confirmPassword: {
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
        console.log("isSignup: " + this.state.isSignup)
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
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
    newUserHandler = ( event ) => {
        event.preventDefault();
        this.props.onNewUser(
            this.state.controls.username.value, 
            this.state.controls.givenName.value,
            this.state.controls.familyName.value, 
            this.state.controls.email.value, 
            this.state.controls.password.value, 
            this.state.controls.confirmPassword.value,
        );
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
                <form onSubmit={this.newUserHandler}>
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
                >{this.state.isSignup ? 'Need an account? Sign up!' : 'Already registered? Sign in!'}</button>
                <button >
                    <a href="/auth/google">Login With Google</a>
                </button>
                <p>Forgot Password?</p>
                <div className={classes.borderTop + classes.pt3}  />
                
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
            <Layout grid="new">
                <Header></Header>
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
        onNewUser: (username, givenName, familyName, email, password) => dispatch(actions.newUser(username, givenName, familyName, email, password))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Login);