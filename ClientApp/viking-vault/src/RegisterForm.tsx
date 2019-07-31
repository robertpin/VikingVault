import React from "react";
import {ResponseModal} from "./ReponseModal";
import {Redirect, BrowserRouter as Router} from "react-router-dom";

const bcrypt = require("bcryptjs");
const url = "https://localhost:44323/api/";
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface IFormState {
    [key: string]: string | number | boolean;
    email: string;
    password: string;
    cpassword: string;
    firstName: string;
    lastName: string;
    pictureLink: string;
    address: string;
    cnp: string;
    valid: string;
    status: number;
    response: string;
    openModal: boolean;
    redirect: boolean;
}

class RegisterForm extends React.Component<any, IFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            email: "",
            password: "",
            cpassword: "",
            firstName: "",
            lastName: "",
            pictureLink: "",
            address: "",
            cnp: "",
            valid: "",
            status: -1,
            response: "",
            openModal: false,
            redirect: false
        }
    }

    private validateEmail = () => {
        fetch(url+"UniqueEmail", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.state.email,
            })
        },).then(response => response.json()).then(result => {
            if(result === "unique") {
                this.setState({
                    valid: "valid"
                })
            }
            else if(result === "not-unique") {
                this.setState({
                    valid: "invalid"
                })
            }
            else {
                this.setState({
                    valid: "null"
                })
            }
        });
    }

    private handleChange = (val: string, inpName: string) => {
        this.setState({
            [inpName]: val
        })
    }

    private handleEmailChange = (e: any) => {
        this.setState({
            email: e.target.value
        }, this.validateEmail);
    }

    private emailError = () => {
        if(!emailRegEx.test(this.state.email)) {
            return  {
                msg: "Email format incorrect",
                class: "alert alert-danger"
            }
        }
        if(this.state.valid === "invalid") {
            return  {
                msg: "Email already exists",
                class: "alert alert-danger"
            }
        }
        if(this.state.valid === "valid") {
            return  {
                msg: "Valid",
                class: "alert alert-success"
            }
        }
        return  {
            msg: "Server error. Try again later",
            class: "alert alert-danger"
        }
    }

    private handleCPasswordChange = (e: any) => {
        this.setState({
            cpassword: e.target.value
        }, this.passwordMatch)
    }

    private passwordMatch = () => {
        if(this.state.password === this.state.cpassword)
            return  {
                msg: "Passwords match",
                class: "alert alert-success"
            }
        return  {
            msg: "Password do not match",
            class: "alert alert-danger"
        }
    }

    private mandatoryFieldsCompletedCorrectly = () => {
        let val = true;
        if(this.emailError().msg !== "Valid") {
            val = false;
        }
        if(this.passwordMatch().msg !== "Passwords match") {
            val = false;
        }
        if(this.state.address === "" || this.state.cnp === "" || this.state.firstName === "" 
            || this.state.lastName === "" || this.state.password === "") {
                val = false;
        }
        return val;
    }

    private execute = async () => {
        this.setState({
            openModal: true,
            response: "Please wait..."
        });
        const user = {
            Email: this.state.email,
            Password: await new Promise((res, rej) => {
                bcrypt.hash(this.state.password, 10, function(err: any, hash: any) {
                    if( err) rej(err);
                    res(hash);
                })
            }),
            FirstName: this.state.firstName,
            LastName: this.state.lastName,
            Address: this.state.address,
            Cnp: this.state.cnp,
            PictureLink: this.state.pictureLink
        };
        fetch(url+"user", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        },).then(response => {
            if(response.status !== 200) {
                this.setState({
                    response: "Error. Please Try again",
                    openModal: true
                });
            }
            return response.json();
        }).then(result => {
            setTimeout(() => {
                this.setState({
                    redirect: true
                });
            }, 1500);
            this.setState({
                response: "Account created",
                openModal: true
            })
        });
    }
    closeModal = (e: boolean) => {
        this.setState({
            openModal: e
        });
    }

    render() {
        return (<div className="container col-md-6">
            <ResponseModal text={this.state.response} open={this.state.openModal} modalClose={this.closeModal}/>
            <div className="form-group">
                <label>Email*</label>
                <input type="email" value={this.state.email} onChange={this.handleEmailChange} required className="form-control"></input>
                <pre className={this.emailError().class}>{this.emailError().msg}</pre>
            </div>
            <div className="form-group">
                <label>Password*</label>
                <input type="password" value={this.state.password} onChange={(e) => this.handleChange(e.target.value, "password")} required className="form-control"></input>
                <label>Confirm Password*</label>
                <input type="password" value={this.state.cpassword} onChange={this.handleCPasswordChange} required className="form-control"></input>
                <pre className={this.passwordMatch().class}>{this.passwordMatch().msg}</pre>
            </div>
            <div className="form-group">
                <label>First Name*</label>
                <input type="text" value={this.state.firstName} onChange={(e) => this.handleChange(e.target.value, "firstName")} required className="form-control"></input>
            </div>
            <div className="form-group">
                <label>Last Name*</label>
                <input type="text" value={this.state.lastName} onChange={(e) => this.handleChange(e.target.value, "lastName")} required className="form-control"></input>
            </div>
            <div className="form-group">
                <label>Picture Link</label>
                <input type="text" value={this.state.pictureLink} onChange={(e) => this.handleChange(e.target.value, "pictureLink")} className="form-control"></input>
            </div>
            <div className="form-group">
                <label>Address*</label>
                <input type="text" value={this.state.address} onChange={(e) => this.handleChange(e.target.value, "address")} required className="form-control"></input>
            </div>
            <div className="form-group">
                <label>ID (CNP)*</label>
                <input type="text" value={this.state.cnp} onChange={(e) => this.handleChange(e.target.value, "cnp")} required className="form-control"></input>
            </div>
            <button disabled={!this.mandatoryFieldsCompletedCorrectly()} className="btn btn-primary" onClick={() => this.execute()}>Create account</button>
            <Router>
                {this.state.redirect? <Redirect to="/asd" /> : null} 
            </Router>
            
        </div>);
    }
}

export { RegisterForm }