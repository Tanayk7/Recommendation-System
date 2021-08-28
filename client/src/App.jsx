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
    const response = await apis.signin({email:"tk7@gmail.com", password: "1234"});
    console.log(response);
    const response2 = await apis.currentUser();
    console.log(response2);
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

