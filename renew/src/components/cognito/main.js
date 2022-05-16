import {Config, CognitoIdentityCredentials} from "aws-sdk";
import {CognitoUserPool} from "amazon-cognito-identity-js";
import React from "react";
import ReactDOM from "react-dom";
import SignUpForm from "./signup.js";

import ForgotPasswordForm from "./forgotPassword.js";
import SignInForm from "./signin.js";

import appConfig from "./config";

const Login=()=>{
  if (!appConfig.region || !appConfig.UserPoolId || !appConfig.ClientId) {
    alert("Configuration is missing ...\nPlease edit the configuration file in ./src/config.js\nto configure your AWS User pool.")
  } else {
    Config.region = appConfig.region;
    Config.credentials = new CognitoIdentityCredentials({
      IdentityPoolId: appConfig.IdentityPoolId
    });

    const userPool = new CognitoUserPool({
      UserPoolId: appConfig.UserPoolId,
      ClientId: appConfig.ClientId,
    });

    var addDiv = function(tag) {
      const authDiv = document.createElement('div');
      authDiv.setAttribute("id", tag);
      document.body.appendChild(authDiv);
    }
    const tags = ['signup', 'forgotPassword', 'signin']
    tags.forEach(addDiv);

    ReactDOM.render(<SignUpForm userPool={userPool}/>, document.getElementById('signup'));
    
    ReactDOM.render(<ForgotPasswordForm userPool={userPool}/>, document.getElementById('forgotPassword'));
    ReactDOM.render(<SignInForm userPool={userPool}/>, document.getElementById('signin'));
  }
}
export default Login;
