import react from "react";
import "./style.css";

export class Signup extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
        }
        this.onClick = this.onClick.bind(this);
        

    }

    changeValues = (event) => {
        this.setState({
            name: event.target.value,
            email: event.target.value,
            password: event.target.value
        })
    }

    onClick = (event) =>{
        event.preventDefault()
        console.log("this was clicked");
        console.log(this.state);
    }

    
    render(){
        return(
            <div className="container" ref={this.props.containerRef}>
                <div className="header">Signup</div>
                <div className="content">
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" onChange={this.changeValues} placeholder="username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" onChange={this.changeValues} placeholder="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" name="password" onChange={this.changeValues} placeholder="password" />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button onClick = {this.onClick} type="button" className="btn">Signup</button>
                </div>
            </div>
        )
    }
}
export default Signup;



// import react from "react";
// import "./Signup.css"

// class Signup extends react.Component{

//     constructor(){
//         super()
//         this.state = {
//             name:"",
//             email:"",
//             password:"",
//         };
        
//     }


//     inputName = (event) =>{
//         this.setState({
//             name: event.target.value
//         })
//     }

//     inputEmail = (event) =>{
//         this.setState({
//             email: event.target.value
//         })
//     }

//     inputPassword = (event) =>{
//         this.setState({
//             password: event.target.value
//         })
//     }

//     onSubmit = (event) =>{
//         event.preventDefault()
//         const arr = [];
//         arr.push(this.state);
//         console.log(arr);
//         console.log(this.state);
//     }

//     render(){
//         return(
//             <div className="container">
//                 <h1>Signup</h1>
//                 <form onSubmit = {this.onSubmit} className="formContainer"> 
//                 <label>Name:</label><input className = "tc pa2 ma1 br3" type="text" value={this.state.name} onChange = {this.inputName} placeholder="Enter Your Name"></input><br/>
//                 <label>Email:</label><input className = "tc pa2 ma1 br3" type="text" value={this.state.email} onChange = {this.inputEmail} placeholder="Enter Your Email"></input><br/>
//                 <label>Password:</label><input className = "tc pa2 ma1 br3" type="text" value={this.state.password} onChange = {this.inputPassword}placeholder="Enter Your Password"></input><br/>
//                 <input className = "tc pa2 ma1 br3" type="submit" value="submit"></input>
//                 </form>
                
//             </div>
//         )
//     }
// }

// export default Signup;