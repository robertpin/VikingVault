import * as React from "react";
import logo from './login_resources/logo_wirtek.png'
import footer from './login_resources/footer_login_page.png'
import white_logo from './login_resources/logo_wirtek_white.png'

// eslint-disable-next-line
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface ILoginFormState {
  email: string;
  password: string;
  emailLabel: string;
  passwordLabel: string;
}

class LoginForm extends React.Component<any, ILoginFormState> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: "",
      password: "",
      emailLabel: "",
      passwordLabel: ""
    };
  }

  validateEmail() {
    if(emailRegex.test(this.state.email))
      return true;
    return false;
  }

  validatePassword() {
    if (this.state.password.length > 0)
      return true;
    return false;
  }

  changedEmailHandler = (e: any) => {
    this.setState({
      email: e.target.value
    },
    () => {
      // show message if the mail is not valid
      var validEmail = "";
      if(this.validateEmail() === false)
        validEmail = "Please enter a valid email!";
      this.setState({
        emailLabel: validEmail})
      });
    };

  changedPasswordHandler = (e: any) => {
    this.setState({
      password: e.target.value
    },
    () => {
       // show message if the password is not valid
      var validPassword = "";
      if(this.validatePassword() === false)
        validPassword = "The password field can't be empty!";
      this.setState({
        passwordLabel: validPassword})
      });
  };

  private async sendLoginData(){ 
      var data = {
        "email": this.state.email,
        "password": this.state.password
      }
    
      console.log("Sending login data: ");
      console.log(data);

      fetch("https://localhost:44323/api/login", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      })
      .then(response => {
        if(response.status === 400) {
          // user not found error
          return null;
        }
        if(response.status === 500) {
          // internal error
          return null;
        }
        return response.json();
      }).then(result => {
        console.log(result);
        sessionStorage.setItem('Authentication-Token', result.token);
    });
  }

  

  private loginClickHandler = () => {
    // send data
    this.sendLoginData();
    // receive response
    // "Incorrect email or password."
    //  correct email + password => redirect to user/admin page   
    console.log("Click Handler End.");
  }

  render() {
    return (
      <div>
        <header className="header">
        <img src={logo} className="vikingImage" alt="Logo Wirtek" />
        </header>
        <form className="loginForm">
          <div>
            <input
              className="field"
              id="email"
              type="email"
              placeholder="E-mail"
              value={this.state.email}
              onChange={this.changedEmailHandler}
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
              onChange={this.changedPasswordHandler}
            />
          </div>
          <div id="passwordValidationLabel" className="validationText">{this.state.passwordLabel}</div>
          <div>
            <button
              className="buttonLogin"
              id="loginButton"
              disabled={!(this.validateEmail()&&this.validatePassword())}
              onClick={this.loginClickHandler}
            >
              Log In
            </button>
          </div>
        </form>
        <footer>
          <img className="footer" src={footer} alt="Footer Login" />
          <img className="whiteLogo" src={white_logo} alt="Wirtek White Logo" />
          <p className="descriptionText">
            Wirtek is a Denmark-based software development center with business operations in Cluj-Napoca and Bucharest,<br/>
            having strong competencies in software solutions development and telecom product testing <br/>
            requiring a high level of technical expertise in knowledge-intensive fields. </p>
        </footer>
      </div>
    );
  }
}

export { LoginForm };
