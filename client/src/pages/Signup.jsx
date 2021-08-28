import React from 'react';
import "./style.scss"


class Signup extends React.Component{
  constructor(props){
    super(props);
     this.state = {
       fields: {},
       errors: {}
     }
  }

  handleValidation = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if(typeof fields["email"] !== "undefined"){
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
         formIsValid = false;
         errors["email"] = "Email is not valid";
        }
    }

    //Password
    if(!fields["password"]){
      formIsValid = false;
      errors["password"] = "This field cannot be empty";
    }

    this.setState({errors: errors});
    return formIsValid;

  }
  
  onSubmit = (e) => {
    e.preventDefault();

    // this.handleValidation();
    console.log(this.state);
  }

  handleChange = (field, event) =>{
    let fields = this.state.fields;
    fields[field] = event.target.value;
    this.setState({fields});
  }

render(){
return(
  <div className="container">
    <div className="content">
        <h1 className="card-header">NASA HACKED</h1>

        <form className="form" onSubmit={this.onSubmit}>
          <div className="form-group">
              <div className="input-container">
                <i className='icons bx bxs-user-circle'></i>
                  <input 
                    className="form-control"
                    placeholder="Enter Name"
                    onChange={this.handleChange.bind(this, "name")} 
                    required
                  />
              </div>
              <div className="errors">{this.state.errors.name}</div>
          </div>

          <div className="form-group">
            <div className="input-container">
            <i className='icons bx bxs-envelope'></i>
              <input 
                type="email"
                className="form-control"
                placeholder="Enter Email"
                onChange={this.handleChange.bind(this, "email")} 
                required
              />
            </div>
            <div className="errors">{this.state.errors.email}</div>
          </div>   

          <div className="form-group">
              <div className="input-container">
              <i className='icons bx bxs-lock-alt' ></i>
              <input 
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter Password"
                onChange={this.handleChange.bind(this, "password")} 
                required
              />
            </div>
            <div className="errors">{this.state.errors.password}</div>
          </div>  

          <button type='submit' className="btn btn-primary btn-block" disabled={this.state.isDisabled}>SIGNUP</button>
        </form>
      </div>
    </div>
  );
 }
}
export default Signup;