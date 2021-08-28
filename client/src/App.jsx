import React from 'react';
import './App.css';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import {BrowserRouter as Router, Switch, Route}  from 'react-router-dom';
import { ContextProvider } from './AppContext';

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path='/signup' component={Signup}/>
        </Switch>
      </Router>
    </ContextProvider>
  );
}

export default App;

