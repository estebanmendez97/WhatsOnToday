import React, { Component } from 'react';
import fire from './fire.jsx';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
       email:'',
       password:''
    }
  }
  login(e) {
  e.preventDefault();
  alert(this.state.email)
  fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
  }).catch((error) => {
      console.log(error);
  });
}
 signup(e){
   e.preventDefault();
   fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
   .catch((error) => {
     console.log(error);
   })
 }


  handleChange(e) {
    this.setState({  [e.target.name]: e.target.value });
  }

  render() {

    return (
     <div className ="col-md-6">
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input value={this.state.email} onChange={this.handleChange} type='email' name="email"
          class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          placeholder="enter email" />
          <small id="emailHelp" class="form-text text-muted">Well never share email with
          anyone else.</small>
          </div>
           <div class="form-group">
           <label for="exampleInputPassword1">password</label>
            <input value={this.state.password} onChange={this.handleChange} type="password"
            name="password" class="form-control" id="exampleInputPassword1" placeholder="password" />
          </div>
          <button type="submit" onClick={this.login} class="btn btn-primary">Login</button>
          <button onClick={this.signup} style={{marnLeft: '25px'}} className="button btn-success">Signup</button>

        </form>

     </div>
   );
  }

}
export default Login;
