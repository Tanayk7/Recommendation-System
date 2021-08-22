import react from "react";

class Signup extends react.Component{

    constructor(){
        super()
        this.state = {
            name:"",
            email:"",
            password:"",
        };
        
    }


    inputName = (event) =>{
        this.setState({
            name: event.target.value
        })
    }

    inputEmail = (event) =>{
        this.setState({
            email: event.target.value
        })
    }

    inputPassword = (event) =>{
        this.setState({
            password: event.target.value
        })
    }

    onSubmit = (event) =>{
        event.preventDefault()
        console.log(this.state.name);
    }

    render(){
        return(
            <div className="container tc">
                <h1>Signup</h1>
                <form onSubmit = {this.onSubmit}>
                <label>Name     :</label><input type="text" value={this.state.name} onChange = {this.inputName} placeholder="Enter Your Name"></input><br/>
                <label>Email    :</label><input type="text" value={this.state.email} onChange = {this.inputEmail} placeholder="Enter Your Email"></input><br/>
                <label>Password :</label><input type="text" value={this.state.password} onChange = {this.inputPassword}placeholder="Enter Your Password"></input><br/>
                <input type="submit" value="submit"></input>
                </form>
                
            </div>
        )
    }
}

export default Signup;