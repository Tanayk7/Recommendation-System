import React, {useState, useContext} from 'react';
import Layout from '../../Common/Layout/Layout';
import "./login.scss"
import { AppContext } from '../../AppContext';
import { Link } from "react-router-dom";

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
      props.history.push("/");
    });
  };

  return(
    <Layout>
      <div className="content">
          <div className="card-header">Login</div>
          <Link to="/Signup">
            <div className="create-account-option">
              Don't have an account? &nbsp; <a href="{Signup}" className="href-link">Create An Account</a>   
            </div>
          </Link>

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
      </Layout>
  );
}

export default Login;