import react from 'react';
import './App.css';
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"

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

