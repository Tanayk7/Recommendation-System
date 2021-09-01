import React, {useState, useContext} from 'react';
import { AppContext } from '../../AppContext';
import Layout from '../../Common/Layout/Layout';
import "./signup.scss";

export const Signup = (props) => {
  const { signupUser } = useContext(AppContext);
  const [state,setState] = useState({
    email: "",
    password: "",
    name: ""
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    let { email, password, name } = state;
    console.log("State:  ", state);
    await signupUser(email,password, name, () => {
      props.history.push('/');
    });
  };

  return(
    <Layout>
      <div className="container">
        <div className="content">
            <div className="card-header">Signup</div>
            <form className="form" onSubmit={onSubmit}>
              
              <div className="form-group">
                <div className="input-container">
                <i className='icons bx bxs-envelope'></i>
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    onChange={e => setState({...state, name: e.target.value})} 
                    required
                  />
                </div>
              </div>   

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
    </Layout>
  );
}


export default Signup;