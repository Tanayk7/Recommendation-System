import react from "react";
import "./Signup.css"

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
        const arr = [];
        arr.push(this.state);
        console.log(arr);
        console.log(this.state);
    }

    render(){
        return(
            <div className="container">
                <h1>Signup</h1>
                <form onSubmit = {this.onSubmit} className="formContainer"> 
                <label>Name:</label><input className = "tc pa2 ma1 br3" type="text" value={this.state.name} onChange = {this.inputName} placeholder="Enter Your Name"></input><br/>
                <label>Email:</label><input className = "tc pa2 ma1 br3" type="text" value={this.state.email} onChange = {this.inputEmail} placeholder="Enter Your Email"></input><br/>
                <label>Password:</label><input className = "tc pa2 ma1 br3" type="text" value={this.state.password} onChange = {this.inputPassword}placeholder="Enter Your Password"></input><br/>
                <input className = "tc pa2 ma1 br3 button" type="submit" value="submit"></input>
                </form>
                
            </div>
        )
    }
}

export default Signup;