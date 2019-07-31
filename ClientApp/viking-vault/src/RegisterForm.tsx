import React from "react";
import {ResponseModal} from "./ReponseModal";
import {Redirect, BrowserRouter as Router} from "react-router-dom";
import { HeaderForm } from './HeaderForm';
import { FooterForm } from './FooterForm';
import {variables} from "./ConstantVariables";

const baseUrl = variables.baseUrl;
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
        fetch(baseUrl+"UniqueEmail", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.state.email,
            })
        },).then(response => response.json()).then(result => {
            if(result === true) { // email is unique
                this.setState({
                    valid: "valid"
                })
            }
            else if(result === false) {
                this.setState({
                    valid: "invalid"
                })
            }
            else {
                this.setState({
                    valid: "error"
                })
            }
        });
    }

    private handleChange = (inputValue: string, inputName: string) => {
        this.setState({
            [inputName]: inputValue
        })
    }

    private handleEmailChange = (e: any) => {
        this.setState({
            email: e.target.value
        }, this.validateEmail);
    }

    private returnEmailValidationMessageAndStyle = () => {
        if(!emailRegEx.test(this.state.email)) {
            return  {
                message: "Email format incorrect",
                class: "alert alert-danger"
            }
        }
        if(this.state.valid === "invalid") {
            return  {
                message: "Email already exists",
                class: "alert alert-danger"
            }
        }
        if(this.state.valid === "valid") {
            return  {
                message: "Valid",
                class: "alert alert-success"
            }
        }
        return  {
            message: "Server error. Try again later",
            class: "alert alert-danger"
        }
    }

    private handleConfirmPasswordChange = (e: any) => {
        this.setState({
            cpassword: e.target.value
        }, this.checkPasswordMatch)
    }

    private checkPasswordMatch = () => {
        if(this.state.password === this.state.cpassword)
            return  {
                message: "Passwords match",
                class: "alert alert-success"
            }
        return  {
            message: "Password do not match",
            class: "alert alert-danger"
        }
    }

    private mandatoryFieldsCompletedCorrectly = () => {
        let val = true;
        if(this.returnEmailValidationMessageAndStyle().message !== "Valid") {
            val = false;
        }
        if(this.checkPasswordMatch().message !== "Passwords match") {
            val = false;
        }
        if(!(["address", "cnp", "firstName", "lastName", "password"].every(keyName => this.state[keyName] !== ""))) {
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
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            cnp: this.state.cnp,
            pictureLink: this.state.pictureLink
        };
        fetch(baseUrl+"user", {
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
        return (
            <div>
                {/* <HeaderForm /> */}
        <div className="container col-md-6">
            <ResponseModal text={this.state.response} open={this.state.openModal} modalClose={this.closeModal}/>
            <div className="form-group">
                <label>Email*</label>
                <input type="email" value={this.state.email} onChange={this.handleEmailChange} required className="form-control"></input>
                <pre className={this.returnEmailValidationMessageAndStyle().class}>{this.returnEmailValidationMessageAndStyle().message}</pre>
            </div>
            <div className="form-group">
                <label>Password*</label>
                <input type="password" value={this.state.password} onChange={(e) => this.handleChange(e.target.value, "password")} required className="form-control"></input>
                <label>Confirm Password*</label>
                <input type="password" value={this.state.cpassword} onChange={this.handleConfirmPasswordChange} required className="form-control"></input>
                <pre className={this.checkPasswordMatch().class}>{this.checkPasswordMatch().message}</pre>
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
            {this.state.redirect? <Redirect to="/login" /> : null}
        </div>
        {/* <FooterForm/> */}
            </div>
            );
    }
}

export { RegisterForm }