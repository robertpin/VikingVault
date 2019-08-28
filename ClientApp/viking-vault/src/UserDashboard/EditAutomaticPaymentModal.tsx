import React from "react";
import { constants } from "../Resources/Constants.js";
import '../AdminDashboard/AttachCardModal.css';
import { IAutomaticPayment } from "./AutomaticPaymentList.jsx";

const regexCheckIfPositiveFloat = "^[-+]?[0-9]*\.?[0-9]+([-+]?[0-9]+)?$";
let currentDate = new Date();
currentDate.setHours(0);

interface IEditAutomaticPaymentModalProps {
    open: boolean;
    onModalClose: any;
    automaticPayment: IAutomaticPayment;
    reload: () => void;
}

interface IAutomaticPaymentProperties {
    amount: string;
    initialPaymentDate: string;
}

interface IEditAutomaticPaymentFormState {
    [key: string]: string | boolean | IAutomaticPaymentProperties | null;
    automaticPayment: IAutomaticPaymentProperties;
    valid: boolean | null;
    errorLabel: string;
}

class EditAutomaticPaymentForm extends React.Component<IEditAutomaticPaymentModalProps, IEditAutomaticPaymentFormState> {
    constructor(props: IEditAutomaticPaymentModalProps) {
        super(props);
        this.state = {
            automaticPayment: {
                amount: "",
                initialPaymentDate: "",
            },
            valid: null,
            errorLabel: "",
        }
    }

    private handleChange = (inputValue: string, inputName: string) => {
        this.setState({
            automaticPayment: {
                ...this.state.automaticPayment,
                [inputName]: inputValue
            }
        });
    }

    private isAmountPositive = () => {
        if(this.state.automaticPayment.amount.match(regexCheckIfPositiveFloat)) {
            return  {
                message: "Ok",
                class: "alert alert-success"
            }
        }
        return  {
            message: "The amount must be a positive number!",
            class: "alert alert-info"
        }
    }

    private isInitialPaymentDateAfterCurrentDate = () => {
        if(this.state.automaticPayment.initialPaymentDate !== "" && new Date(this.state.automaticPayment.initialPaymentDate) >= currentDate) {
            return  {
                message: "Ok",
                class: "alert alert-success"
            }
        }
        return  {
            message: "Initial Payment Date must be after the current date!",
            class: "alert alert-info"
        }
    }

    private mandatoryFieldsCompletedCorrectly = () => {
        let val = false;
        const validationFunctions = [this.isAmountPositive, this.isInitialPaymentDateAfterCurrentDate];
        val = validationFunctions.every(functionItem => functionItem().message === "Ok");
        return val;
    }

    private resetInputValues = () => {
        this.setState({
            card: {
                ...this.state.automaticPayment,
                amount: "",
                initialPaymentDate: "",
            }
        });
    }

    private closeModal = () => {
        this.resetInputValues();
        this.props.onModalClose(false);
    }

    private getAutomaticPayment = (automaticPayment : IAutomaticPayment) => {
        return {
            id: automaticPayment.id,
            companyId: automaticPayment.companyId,
            companyName: automaticPayment.companyName,
            amount: this.state.automaticPayment.amount,
            initialPaymentDate: new Date(this.state.automaticPayment.initialPaymentDate),
            lastPaymentDate: automaticPayment.lastPaymentDate,
        };
    }

    private sendDataAndShowResponse = async () => {
        const token = sessionStorage.getItem("Authentication-Token");
        if(token === null) {
            return;
        }
        else {
            const automaticPayment = this.getAutomaticPayment(this.props.automaticPayment);
            fetch(constants.baseUrl+"automaticPayment", {
                method: "PUT",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
                },
                body: JSON.stringify(automaticPayment)
            })
            .then(response => {
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
                if (this.state.errorLabel === "") {
                    this.closeModal();
                    this.props.reload();
                }
            });
        }
    }

    render() {
        return (
            <div>
                <div className={this.props.open? "modal open" : "modal close"}>
                    <div className="container col-md-6">
                        <div className="modal-dialog attach-card">
                            <div className="modal-content attach-card">
                                <div className="modal-header attach-card">
                                    <h5 className="heading-name attach-card">Edit Automatic Payment Form</h5>
                                </div>
                                <div className="form-group attach-card">
                                    <label className="form-label attach-card">Amount</label>
                                    <input
                                        type="text"
                                        value={this.state.automaticPayment.amount}
                                        onChange={(e) => this.handleChange(e.target.value, "amount")}
                                        required className="form-control attach-card">
                                    </input>
                                    {this.isAmountPositive().message !== "Ok" ?
                                     <pre 
                                        className={this.isAmountPositive().class}>{this.isAmountPositive().message}
                                     </pre> : null}
                                </div>
                                <div className="form-group attach-card">
                                    <label className="form-label attach-card">Initial Payment Date</label>
                                    <input
                                        type="date"
                                        name="initialPaymentDate"
                                        value={this.state.automaticPayment.initialPaymentDate} 
                                        onChange={(e) => this.handleChange(e.target.value, "initialPaymentDate")} 
                                        required className="form-control attach-card">
                                     </input>
                                    { this.isInitialPaymentDateAfterCurrentDate().message !== "Ok" ?
                                     <pre 
                                        className={this.isInitialPaymentDateAfterCurrentDate().class}>{this.isInitialPaymentDateAfterCurrentDate().message}
                                     </pre> : null }
                                </div>
                                {this.state.errorLabel !== "" ? <div className="alert alert-warning"> {this.state.errorLabel} </div> : null }
                                <div className="modal-footer attach-card">
                                    <button
                                        disabled={!this.mandatoryFieldsCompletedCorrectly()}
                                        className={this.mandatoryFieldsCompletedCorrectly()? "btn btn-primary attach-card" : "btn btn-secondary attach-card"} 
                                        onClick={() => this.sendDataAndShowResponse()}>Edit Automatic Payment
                                    </button>
                                    <button type="button" className="btn btn-default attach-card" onClick={this.closeModal}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
            );
    }
}

export {EditAutomaticPaymentForm}