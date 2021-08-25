import react from 'react';
import './App.css';
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
// import Profile from './pages/Profile/Profile';

const movies = [
  {
      name: "movei 1",
      description: "asdf ",
      imageUrl: "asdfdsa"
  },
  {
      name: "movei 2",
      description: "asdf ",
      imageUrl: "asdfdsa"
  },
  {
      name: "movei 3",
      description: "asdf ",
      imageUrl: "asdfdsa"
  },
  {
      name: "movei 4",
      description: "asdf ",
      imageUrl: "asdfdsa"
  },
  {
      name: "movei 5",
      description: "asdf ",
      imageUrl: "asdfdsa"
  },
]

const profile_info = {
  name: "",
  email: "",
  password:"",
  imageUrl:""
}


class App extends react.Component{
  constructor(){
    super()
    this.state = {
      isLoginActive: false,
    }
  }

  render(){
    const { isLoginActive } = this.state;
    return(
      <div className="App">
 
        {/* <Profile movies={movies} profileInfo={profile_info}/> */}
        
        <div className="login">
          <div className="container">
            {isLoginActive && <Login containerRef = {(ref) => this.current = ref}/>}
            {!isLoginActive && <Signup containerRef = {(ref) => this.current = ref}/>}
          </div>

        </div>
      </div>
    )
  }
}

export default App;

