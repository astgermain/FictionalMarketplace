import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import axios from 'axios'
/*
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./actions/types";
*/


import { Provider } from "react-redux";
import store from "./store";

import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import Loading from './components/Loading';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/Dashboard";




class App extends Component {
  // initialize our state
  state = {
    isLoading: true
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    window.scrollTo(0, 0)
    document.body.style.overflow = "hidden";
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let code = params.get('code')
    let state = params.get('state')
    if(code != null && state != null){
      //API call for auth token
      this.tokenRetrieval(code, state)
      //then redirect away to clear query string or find a better way to do that
    }
    // Check for token to keep user logged in
    if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      store.dispatch(setCurrentUser(decoded));
    // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
      }
    }

    setTimeout(
      function() {
       this.setState({ isLoading: false });
       document.body.style.overflow = "scroll";
       window.scrollTo(0, 0)
      }.bind(this),
     1500
   );
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
  
  }

  tokenRetrieval = async (code, state) => {
    await axios.post('/line/tokenAuth', 
    {
      code: code,
      state: state
    }, 
    {
      withCredentials: true,
      sameSite: 'none'
    })
    .then(res => {
      const { token } = res.data;
      if(token != null){
        localStorage.setItem("jwtToken", JSON.stringify(token));
        // Set token to Auth header
        setAuthToken(token);
        // Decode token and get user info and exp
        const decoded = jwt_decode(token);
        // Set user and isAuthenticated
        store.dispatch(setCurrentUser(decoded));
        
      }
    })
    .catch(error => {
    })
    
  }
  

  render() {
    let { isLoading } = this.state;
    return (
      <Provider store={store}>
        {isLoading ? 
          <Loading />
        : 
        <Router>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={RegisterModal} />
          <Route exact path="/login" component={LoginModal} />
          <Route exact path="/about" component={About} />
          <Route exact path="/projects" component={Projects} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Footer />
        </Router>
        }
        
      </Provider>
      
    );
  }
}

export default App;
