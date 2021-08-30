import React, {useState, useContext} from 'react';
import "./login.scss"
import { AppContext } from '../../AppContext';


const  Login = (props) => {
  const { loginUser } = useContext(AppContext);
  const[state, setState] = useState({
    email: "",
    password: ""
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    let { email, password } = state;

    await loginUser(email, password, () => {
      props.history.push("/home");
    });
  };

  return(
  <div className="container">
      <div className="content">
          <div className="card-header">Login</div>
          <div className="create-account-option">
            Don't have an account?<a href="" className="href-link">Create An Account</a>
          </div>

              <form className="form" onSubmit={onSubmit}>

                <div className="form-group">
                  <div className="input-container">
                  <i className='icons bx bxs-envelope'></i>
                    <input type="email"
                    name="email"
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
                    <input type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                    onChange={e => setState({...state, password: e.target.value})}
                    required
                    />
                  </div>
                </div>  

                <button type="submit" className="btn btn-primary btn-block">LOGIN</button>

              </form>
        </div>
      </div>
  );
}

export default Login;