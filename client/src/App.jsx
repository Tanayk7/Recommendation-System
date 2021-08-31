import React from 'react';
import './App.css';
import Login from "./pages/Login/Login";
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import {BrowserRouter as Router, Switch, Route}  from 'react-router-dom';
import { ContextProvider } from './AppContext';

const App = () => {
  return (
      <Router>
        <ContextProvider>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path='/signup' component={Signup}/>
          </Switch>
        </ContextProvider>
      </Router>
  );
}

export default App;