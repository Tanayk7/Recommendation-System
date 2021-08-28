import React, {useState, useContext, useEffect, useRef} from 'react';
import "./style.scss"
import { AppContext } from '../AppContext';
import apis from '../apis';

const Signup = (props) => {
  const { signupUser, auth_token } = useContext(AppContext);
  const [state,setState] = useState({
    email: "",
    password: ""
  });
  const is_mounted = useRef(false);

  useEffect(() => {
    if(is_mounted.current){
      if(auth_token !== null){
        props.history.push('/home');
      }
    }
    else{
      is_mounted.current = true;
    }
  }, [auth_token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    let { email, password } = state;
    await signupUser(email,password);
  }

  return(
    <div className="container">
      <div className="content">
          <h1 className="card-header">Signup</h1>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <div className="input-container">
              <i className='icons bx bxs-envelope'></i>
                <input 
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  onChange={e => setState({...state, email: e.target.value})} 
                  required
                />
              </div>
           
            </div>   
  
            <div className="form-group">
                <div className="input-container">
                <i className='icons bx bxs-lock-alt' ></i>
                <input 
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  onChange={e => setState({...state, password: e.target.value})} 
                  required
                />
              </div>
            
            </div>  
            <button type='submit' className="btn btn-primary btn-block">SIGNUP</button>
          </form>
        </div>
    </div>
  );
}


export default Signup;