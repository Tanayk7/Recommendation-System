import React from 'react';
import "./style.scss"


class Login extends React.Component{
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

    //Name
    if(!fields["name"]){
      formIsValid = false;
      errors["name"] = "This field cannot be empty";
    }

   if(typeof fields["name"] !== "undefined"){
      if(!fields["name"].match(/^[a-zA-Z]+$/)){
         formIsValid = false;
         errors["name"] = "Only letters";
      }        
    }
    
    //Email
    if(!fields["email"]){
      formIsValid = false;
      errors["email"] = "This field cannot be empty";
    }

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

  onSubmit = event =>{
    event.preventDefault();

    this.handleValidation();
    console.log(this.state);
  }

  handleChange = (field, event) =>{
    let fields = this.state.fields;
    fields[field] = event.target.value;
    this.setState({fields});
  }

submitForm(e){
  e.preventDefault();
  const data = {
   firstName: this.state.firstName,
   email: this.state.email,
   password: this.state.password
  }
  console.log(data);
  };
 
render(){
return(
  <div className="container">
    <div className="content">
        <h1 className="card-header">Login</h1>
            <form className="form">
              <div className="form-group">
                  {/* <label htmlFor="email">Email</label> */}
                <div className="input-container">
                <i className='icons bx bxs-envelope'></i>
                  <input type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  onChange={this.handleChange.bind(this, "email")} />
                </div>
                <div className="errors">{this.state.errors.email}</div>
              </div>                
              <div className="form-group">
                  {/* <label htmlFor="password">Password</label> */}
                  <div className="input-container">
                  <i className='icons bx bxs-lock-alt' ></i>
                  <input type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  onChange={this.handleChange.bind(this, "password")} />
                </div>
                <div className="errors">{this.state.errors.password}</div>
              </div>                
              <button className="btn btn-primary btn-block" disabled={this.state.isDisabled} onClick={this.onSubmit}>LOGIN</button>
            </form>
      </div>
    </div>
  );
 }
}
export default Login;