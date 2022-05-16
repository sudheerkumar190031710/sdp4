import {CognitoUserAttribute} from "amazon-cognito-identity-js";
import {CognitoUser} from "amazon-cognito-identity-js";
import axios from "axios";

import React from "react";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      phonenumber:'',
      fname:'',
      lname:'',
      verificationCode:'',
      show: false,
      
    };
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  handleFNameChange(e){
    this.setState({fname:e.target.value});
  }
  handleLNameChange(e){
    this.setState({lname:e.target.value});
  }
  handlePhoneNumberChange(e){
    this.setState({phonenumber:e.target.value});
  }
  

  handleVerificationCodeChange(e) {
    this.setState({verificationCode: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const userPool = this.props.userPool;
    const email = this.state.email.trim();
    const username = this.state.username.trim();
    const password = this.state.password.trim();
    const fname=this.state.fname.trim();
    const lname=this.state.lname.trim();
    const phone_number=this.state.phonenumber.trim();
    const name=fname+" "+lname
    var attributeList = [new CognitoUserAttribute({ Name: 'email', Value: email })];
    attributeList.push(new CognitoUserAttribute({ Name: 'given_name', Value: username}));
    attributeList.push(new CognitoUserAttribute({ Name: 'phone_number', Value: phone_number}));
    attributeList.push(new CognitoUserAttribute({ Name: 'name', Value: name}));

    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        alert(err+"\nPlease try again");
        return;
      }
      else{
        alert(result);
        
      }
    });
    
    this.setState({show:true})
    
  }
  handleConfirm(e) {
    e.preventDefault();
    const userPool = this.props.userPool;
    const username = this.state.username.trim();
    const password = this.state.password.trim();
    const email = this.state.email.trim()
    const fname=this.state.fname.trim();
    const lname=this.state.lname.trim();
    const verificationCode = this.state.verificationCode.trim();

    var userData = {
      Username: username,
      Pool: userPool
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(verificationCode, true, function(err, result) {
      if (err) {
        alert(err);
        return;
      }
      axios
    .post("http://127.0.0.1:8000/user/",{username:username,email:email,password:password,first_name:fname,last_name:lname})
    .then((res) => {alert(res)})
    .catch((err) => {alert(err)});
        
        alert('call result: ' + result);
    });
    
  }
  handleResendCode(e) {
    e.preventDefault();
    const userPool = this.props.userPool;
    const username = this.state.username.trim();

    var userData = {
      Username: username,
      Pool: userPool
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.resendConfirmationCode(function(err, result) {
      if (err) {
        alert(err);
        return;
      }
      alert('call result: ' + result);
    });
  }
  confirm(){
    var pwd1=document.getElementById('pwd1');
    var pwd2=document.getElementById('pwd2');
    var con=document.getElementById("confirm");
    if(pwd1.value!==pwd2.value){
      con.innerText="Miswatch";
      pwd1.style.borderBlockColor="red";
      con.style.color="red"
    }
    else{
      con.innerText="";
      pwd1.style.borderBlockColor="black";
    }
  }
  
    
  
  render() {
    if(!this.state.show){
      return (
        <div>
          <h1>Sign up</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="email"
                  value={this.state.email}
                  placeholder="Email"
                  onChange={this.handleEmailChange.bind(this)}/><br/>
            <input type="text"
                    value={this.state.username}
                    placeholder="Username"
                    onChange={this.handleUsernameChange.bind(this)}/><br/>
            <input type="text"
                    value={this.state.fname}
                    placeholder="First Name"
                    onChange={this.handleFNameChange.bind(this)}/><br/>
            <input type="text"
                    value={this.state.lname}
                    placeholder="Last Name"
                    onChange={this.handleLNameChange.bind(this)}/><br/>
            <input type="text"
                    value={this.state.phonenumber}
                    placeholder="Phone number"
                    onChange={this.handlePhoneNumberChange.bind(this)}/><br/>
            <input type="password"
                  value={this.state.password}
                  placeholder="Password"
                  id="pwd1"
                  onChange={this.handlePasswordChange.bind(this)}/><br/>
            <input type="password"
                  placeholder="ConfirmPassword"
                  id="pwd2"
                  onChange={this.confirm.bind(this)}/><br/>
            <span id="confirm"></span><br/>
            <input type="submit" value="Sign up"/>
          </form>
        </div>
      );
    }
    else{
      return(
        <div>
          <h1>Confirm registration</h1>
          <form onSubmit={this.handleConfirm.bind(this)}>
            <input type="text"
                  value={this.state.verificationCode}
                  placeholder="Verification code"
                  onChange={this.handleVerificationCodeChange.bind(this)}/><br/>
            <input type="submit" value="Confrim registration"/>
          </form>
          <form onSubmit={this.handleResendCode.bind(this)}>
            <input type="submit" value="Request new verification code"/>
          </form>
        </div>
      );
    }
    
  }
}

export default SignUpForm;
