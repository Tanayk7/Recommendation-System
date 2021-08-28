import React,{useEffect} from 'react';
import './App.css';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import apis from './apis';
import {BrowserRouter as Router, Switch, Route}  from 'react-router-dom';

const Home = () => {
  return (
    <div>Home compoent</div>
  );
}

const App = () => {
  useEffect(() => {
    loginUser();
  }, []);

  const loginUser = async () =>{
    const { token } = await apis.signin({email:"tk7@gmail.com", password: "1234"});
    const currentUser = await apis.currentUser(token);
    const movies = await apis.getMovies({min: 0, max: 5});

    console.log("Movies: ", movies);
    console.log("Current user: ", currentUser);
  }

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
  )
}

export default App;

