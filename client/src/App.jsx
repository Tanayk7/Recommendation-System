import React from 'react';
import './App.css';
import Login from "./pages/Login/Login";
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import apis from './apis';
import {BrowserRouter as Router, Switch, Route}  from 'react-router-dom';
import { ContextProvider } from './AppContext';

const App = () => {
  React.useEffect(() => {
    //testResquests();
  },[])

  const testResquests = async () => {
    let search_results = await apis.searchMovies('dark knight');

    console.log("Search results: ", search_results);
  }

  return (
      <Router>
        <ContextProvider>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path='/signup' component={Signup}/>
            <Route path="/" exact component={Home}/>
          </Switch>
        </ContextProvider>
      </Router>
  );
}

export default App;