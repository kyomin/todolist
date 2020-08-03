import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Auth from './hoc/auth';

import NavBar from './components/views/NavBar/NavBar';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
      <div>  
        <NavBar />
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, true)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;