import React from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import Subheader from './components/Subheader';
import Sidebar from './components/Sidebar';
import Messenger from './components/Messenger';
import Drive from './components/Drive';
import Register from './components/Register';
import Login from './components/Login';
import AdminSettings from './components/AdminSettings/index';
import Dashboard from './components/Dashboard';


import { BrowserRouter, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';


import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./PrivateRoute";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info
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

class App extends React.Component {
  render() {
    return (
    <Provider store={store}>
      <div>
      <Sidebar />
      <Header
        appName="TMS DIGITAL"
        currentUser={this.props.currentUser} 
      />

      {/* <Subheader/> */}
      <BrowserRouter>
      <Switch>
      <PrivateRoute exact path="/messenger" component={Messenger} />
      <PrivateRoute exact path="/drive" component={Drive} />
      <PrivateRoute exact path="/settings" component={AdminSettings} />
      <Route path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
      </Switch>
      </BrowserRouter>
      </div>
    </Provider>

    );
    }
}

export default App;
