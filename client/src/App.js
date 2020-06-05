import React, { Component } from 'react';
//import axios from 'axios'
import { Route, Switch, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Blog from './containers/Pages/Blog/Blog';
import Posts from './containers/Pages/Blog/Posts/Posts';
import NewPost from './containers/Pages/NewPost/NewPost';
import Home from './containers/Pages/Home/Home';
import Projects from './containers/Pages/Account/Account';
import About from './containers/Pages/About/About';
import Login from './containers/Pages/Login/Login';
import Account from './containers/Pages/Account/Account';
import Register from './containers/Pages/Register/Register';
//import asyncComponent from './hoc/asyncComponent';
import Wrapper from './components/Wrapper/Wrapper';
import FullPost from './containers/Pages/Blog/FullPost/FullPost';
import Signup from './components/sign-up'
import LoginForm from './components/login-form'

class App extends Component {
  state = {
      loggedIn: false,
      username: null
    }

  componentDidMount () {
  //  this.props.onGetUser()
    this.props.autoLogin();
    this.props.onFetchUser();

  }
//  updateUser (userObject) {
//    this.setState(userObject)
//  }

  render() {
    let routes = (
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/blog" component={Blog} />
        <Route path="/fullPost" component={FullPost} />
        <Route path="/posts" exact component={Posts} />
        <Route path="/about" component={About} />
        <Route path="/projects" component={Projects} />
        <Route 
          path="/login" 
          component={Login}
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
          />}
        />
        <Route
          path="/signup"
          render={() =>
            <Signup/>}
        />
        <Route path="/register" component={Register} />
        <Route path="/" exact component={Home} />
        {/* <Redirect to="/home" /> */}              
      </Switch>
    );

    if (this.props.isLoggedIn) {
      routes = (
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/blog" component={Blog} />
          <Route path="/fullPost" component={FullPost} />
          <Route path="/about" component={About} />
          <Route path="/posts" exact component={Posts} />
          <Route path="/newPost" exact component={NewPost} />
          <Route path="/projects" component={Projects} />
          <Route path="/account" component={Account} />
          <Redirect to="/home" /> 
        </Switch>
      )
    }

    return (
          <Wrapper>
            {routes}
          </Wrapper>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.payload
  };
};

const mapDispatchToProps = dispatch => {
  return {
    autoLogin   : () => dispatch( actions.loginCheckState() ),
    onFetchUser : () => dispatch(actions.fetchUser()),
//    onGetUser : () => dispatch(actions.getUser())
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );