import React from "react";
import {ResponseModal} from "./ReponseModal";
import {Redirect} from "react-router-dom";
import { HeaderForm } from './HeaderForm';
import { FooterForm } from './FooterForm';
import {constants} from "./ConstantVariables";

const baseUrl = constants.baseUrl;
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface IUserProperties {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    pictureLink: string;
    address: string;
    cnp: string;
    [key: string]: string;
}

interface IFormState {
    [key: string]: string | number | boolean | IUserProperties | null;
    user: IUserProperties;
    valid: boolean | null;
    status: number;
    response: string;
    openModal: boolean;
    redirect: boolean;
}

class RegisterForm extends React.Component<any, IFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            user: {
                email: "",
                password: "",
                confirmPassword: "",
                firstName: "",
                lastName: "",
                pictureLink: "",
                address: "",
                cnp: ""
            },
            valid: null,
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
              email: this.state.user.email,
            })
        }).then(response => response.json()).then(result => {
            if(result === true) { // email is unique
                this.setState({
                    valid: true
                })
            }
            else if(result === false) {
                this.setState({
                    valid: false
                })
            }
            else {
                this.setState({
                    valid: null // internal server error
                })
            }
        });
    }

    private handleChange = (inputValue: string, inputName: string) => {
        this.setState({
            user: {
                ...this.state.user,
                [inputName]: inputValue
            }
        })
    }

    private handleEmailChange = (e: any) => {
        this.setState({
            user: {
                ...this.state.user,
                email: e.target.value
            }
        }, this.validateEmail);
    }

    private returnEmailValidationMessageAndStyle = () => {
        if(!emailRegEx.test(this.state.user.email)) {
            return  {
                message: "Email format incorrect",
                class: "alert alert-danger"
            }
        }
        if(this.state.valid === false) {
            return  {
                message: "Email already exists",
                class: "alert alert-danger"
            }
        }
        if(this.state.valid === true) {
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
            user: {
                ...this.state.user,
                confirmPassword: e.target.value
            }
        }, this.checkPasswordMatch)
    }

    private checkPasswordMatch = () => {
        if(this.state.user.password === this.state.user.confirmPassword)
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
        if(!(["address", "cnp", "firstName", "lastName", "password"].every(keyName => this.state.user[keyName] !== ""))) {
                val = false;
        }
        return val;
    }

    private setLoadingState = () => {
        this.setState({
            openModal: true,
            response: "Please wait..."
        });
    }

    private getUser = () => {
        return {
            email: this.state.user.email,
            password: this.state.user.password,
            firstName: this.state.user.firstName,
            lastName: this.state.user.lastName,
            address: this.state.user.address,
            cnp: this.state.user.cnp,
            pictureLink: this.state.user.pictureLink
        };
    }

    private openModalWithMessage(message: string) {
        this.setState({
            response: message,
            open: true
        });
    }

    private sendDataAndShowResponse = async () => {
        this.setLoadingState();
        const user = this.getUser();
        fetch(baseUrl+"register", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        },).then(response => {
            if(response.status !== 200) {
                this.openModalWithMessage("Error. Please Try again");
            }
            return response.json();
        }).then(result => {
            setTimeout(() => {
                this.setState({
                    redirect: true
                });
            }, 1500);
            this.openModalWithMessage("Account created");
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
                <HeaderForm/>
        <div className="container col-md-6">
            <ResponseModal text={this.state.response} open={this.state.openModal} modalClose={this.closeModal}/>
            <div className="form-group">
                <label>Email*</label>
                <input type="email" value={this.state.user.email} onChange={this.handleEmailChange} required className="form-control accent-color"></input>
                {this.state.user.email!=="" ? <pre className={this.returnEmailValidationMessageAndStyle().class}>{this.returnEmailValidationMessageAndStyle().message}</pre> : null}
            </div>
            <div className="form-group">
                <label>Password*</label>
                <input type="password" value={this.state.user.password} onChange={(e) => this.handleChange(e.target.value, "password")} required className="form-control accent-color"></input>
                <label>Confirm Password*</label>
                <input type="password" value={this.state.user.confirmPassword} onChange={this.handleConfirmPasswordChange} required className="form-control accent-color"></input>
                {this.state.user.password!=="" ? <pre className={this.checkPasswordMatch().class}>{this.checkPasswordMatch().message}</pre> : null}
            </div>
            <div className="form-group">
                <label>First Name*</label>
                <input type="text" value={this.state.user.firstName} onChange={(e) => this.handleChange(e.target.value, "firstName")} required className="form-control accent-color"></input>
            </div>
            <div className="form-group">
                <label>Last Name*</label>
                <input type="text" value={this.state.user.lastName} onChange={(e) => this.handleChange(e.target.value, "lastName")} required className="form-control accent-color"></input>
            </div>
            <div className="form-group">
                <label>Picture Link</label>
                <input type="text" value={this.state.user.pictureLink} onChange={(e) => this.handleChange(e.target.value, "pictureLink")} className="form-control accent-color"></input>
            </div>
            <div className="form-group">
                <label>Address*</label>
                <input type="text" value={this.state.user.address} onChange={(e) => this.handleChange(e.target.value, "address")} required className="form-control accent-color"></input>
            </div>
            <div className="form-group">
                <label>ID (CNP)*</label>
                <input type="text" value={this.state.user.cnp} onChange={(e) => this.handleChange(e.target.value, "cnp")} required className="form-control accent-color"></input>
            </div>
            <button disabled={!this.mandatoryFieldsCompletedCorrectly()} className={this.mandatoryFieldsCompletedCorrectly()? "btn btn-primary" : "btn btn-secondary"} onClick={() => this.sendDataAndShowResponse()}>Create account</button>
            {this.state.redirect? <Redirect to="/" /> : null}
        </div>
        <FooterForm class="footer-register"/>
            </div>
            );
    }
}

export { RegisterForm }