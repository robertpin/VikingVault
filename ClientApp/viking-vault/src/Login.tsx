import * as React from "react";
import {Redirect} from 'react-router-dom';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface ILoginFormState {
  email: string;
  password: string;
  emailLabel: string;
  passwordLabel: string;
  errorLabel: string;
  userType: string;
  redirect: boolean;
}

class LoginForm extends React.Component<any, ILoginFormState> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: "",
      password: "",
      emailLabel: "",
      passwordLabel: "",
      errorLabel: "",
      userType: "",
      redirect: false
    };
  }

  validateEmail() {
    if(emailRegex.test(this.state.email) || this.state.email === "admin")
      return true;
    return false;
  }

  validatePassword() {
    if (this.state.password.length > 0)
      return true;
    return false;
  }

  showInvalidPasswordLabel() {
    var validPassword = "";
    if(this.validatePassword() === false)
      validPassword = "The password field can't be empty!";
    this.setState({
      passwordLabel: validPassword})
  }

  showInvalidEmailLabel() {
    var validEmail = "";
    if(this.validateEmail() === false)
      validEmail = "Please enter a valid email!";
    this.setState({
      emailLabel: validEmail
    })
  }

  handleChangedEmail = (e: any) => {
    this.setState({
      email: e.target.value
    }, () => {
      this.showInvalidEmailLabel();
    });
  };

  handleChangedPassword = (e: any) => {
    this.setState({
      password: e.target.value
    }, () => {
      this.showInvalidPasswordLabel();
    });
  };

  handleLoginClicked = () => {
    var data = {
      "email": this.state.email,
      "password": this.state.password
    }

    fetch("https://localhost:44323/api/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
      if(response.status === 404) {
        this.setState({
          errorLabel: "Incorrect email or password!"
        });
        setTimeout(() => {
          this.setState({
            errorLabel: ""
          });
        }, 1500);
        return null;
      }

      if(response.status === 500) {
        this.setState({
          errorLabel: "Error. Please try again later!"
        });
        setTimeout(() => {
          this.setState({
            errorLabel: ""
          });
        }, 2500);
        return null;
      }

      return response.json();

    })
    .then(result => {
      if(result !== null)
      {
        // correct email + password => redirect to user/admin page 
        sessionStorage.setItem('Authentication-Token', result.token);

        if(result.email === "admin"){
          this.setState({
            redirect: true,
            userType: "admin"
          })
        }
        else{
          this.setState({
            redirect: true,
            userType: "user"
          })
        }
      }
  });
  }

  render() {
    return (
      <div>
        <div className="loginForm">
          <div>
            <input
              className="field"
              id="email"
              type="email"
              placeholder="E-mail"
              value={this.state.email}
              onChange={this.handleChangedEmail}
            />
          </div>
          <div id="emailValidationLabel" className="validationText">{this.state.emailLabel}</div>
          <div>
            <input
              className="field"
              id="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChangedPassword}
            />
          </div>
          <div id="passwordValidationLabel" className="validationText">{this.state.passwordLabel}</div>
          <div>
            <button
              className="buttonLogin"
              id="loginButton"
              disabled={!(this.validateEmail()&&this.validatePassword())}
              onClick={this.handleLoginClicked}
            >
              Log In
            </button>
          </div>
          <div id="errorLabel" className="validationText">{this.state.errorLabel}</div>
        </div>
        {this.state.redirect? <Redirect to={this.state.userType}/> : null}
      </div>
    );
  }
}

export { LoginForm };
