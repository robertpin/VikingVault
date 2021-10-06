import * as React from "react";
import {Redirect, Link} from 'react-router-dom';
import { FooterForm } from "./Common/FooterForm";
import { HeaderForm } from "./Common/HeaderForm";
import { constants } from "./Resources/Constants";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const baseUrl = constants.baseUrl;

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
    if(emailRegex.test(this.state.email) || this.state.email === "admin") {
      return true;
    }
    return false;
  }

  validatePassword() {
    if (this.state.password.length > 0) {
      return true;
    }
    return false;
  }

  showInvalidPasswordLabel() {
    var validPassword = "";
    if(this.validatePassword() === false)
    {
      validPassword = "The password field can't be empty!";
    }
    this.setState({
      passwordLabel: validPassword})
  }

  showInvalidEmailLabel() {
    var validEmail = "";
    if(this.validateEmail() === false) {
      validEmail = "Please enter a valid email!";
    }
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

    fetch(baseUrl+"login", {
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
      if(response !== null) {
        return response.json();
      }
      else return "";
    })
    .then(result => {
      if(result !== null) { 
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
      <div className="relative">
        <HeaderForm></HeaderForm>
        <div className="container col-md-4">
          <div>
            <input
              className="form-control form-group text-center"
              type="email"
              placeholder="E-mail"
              value={this.state.email}
              onChange={this.handleChangedEmail}
            />
          </div>
          {this.state.emailLabel!==""? <div className="alert alert-danger">{this.state.emailLabel} </div> : null }
          <div>
            <input
              className="form-control form-group text-center"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChangedPassword}
            />
          </div>
          {this.state.passwordLabel !== "" ? <div className="alert alert-danger"> {this.state.passwordLabel} </div> : null }
          <div className="text-center">
            <button
              className="btn button-login"
              disabled={!(this.validateEmail()&&this.validatePassword())}
              onClick={this.handleLoginClicked}
            >
            Log In
            </button>
            <p className="paragraph">or</p>
            <Link to="/register">
              <button className="btn btn-primary col-md-6 button-register"> Create account </button>
            </Link>
          </div>
          <br/>
          {this.state.errorLabel !== "" ? <div className="alert alert-danger"> {this.state.errorLabel} </div> : null }
        </div>
        <FooterForm class="footer-login"/>
        {this.state.redirect? <Redirect to="/"/> : null}
      </div>
    );
  }
}

export { LoginForm };
