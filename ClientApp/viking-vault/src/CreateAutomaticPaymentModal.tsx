import React from "react";
import { constants } from "./Resources/Constants.js";
import './AdminDashboard/AttachCardModal.css';
import { IUserData } from "./AdminDashboard/UserData.jsx";

let regexCheckIfPositiveFloat = "^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$";
let currentDate = new Date();

interface IModalProps {
    open: boolean;
    onModalClose: any;
    userId: number;
}

interface IAutomaticPaymentProperties {
    companyId: number;
    amount: string;
    initialPaymentDate: string;
    lastPaymentDate: string;
}

interface ICompanyData {
    id: number;
    name: string;
    address: string;
    balance: number;
}

interface IFormState {
    [key: string]: string | boolean | IAutomaticPaymentProperties  | ICompanyData[] | null;
    automaticPayment: IAutomaticPaymentProperties;
    valid: boolean | null;
    errorLabel: string;
    companies: ICompanyData[];
}

class AutomaticPaymentForm extends React.Component<any, IFormState> {
    constructor(props: IModalProps) {
        super(props);
        this.state = {
            automaticPayment: {
                companyId: 0,
                amount: "",
                initialPaymentDate: "",
                lastPaymentDate: "",
            },
            valid: null,
            errorLabel: "",
            companies: [],
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

    private amountMustBePositive = () => {
        if(this.state.automaticPayment.amount.match(regexCheckIfPositiveFloat))
            return  {
                message: "Ok",
                class: "alert alert-success"
            }
        return  {
            message: "The amount must be a positive number!",
            class: "alert alert-info"
        }
    }

    private initialPaymentDateIsAfterCurrentDate = () => {
        if(this.state.automaticPayment.initialPaymentDate !== "" && new Date(this.state.automaticPayment.initialPaymentDate) >= currentDate)
            return  {
                message: "Ok",
                class: "alert alert-success"
            }
        return  {
            message: "Initial Payment Date must be after the current date!",
            class: "alert alert-info"
        }
    }

    private mandatoryFieldsCompletedCorrectly = () => {
        let val = false;
        const validationFunctions = [this.amountMustBePositive, this.initialPaymentDateIsAfterCurrentDate];
        val = validationFunctions.every(functionItem => functionItem().message === "Ok");
        return val;
    }

    private resetInputValues = () => {
        this.setState({
            card: {
                ...this.state.automaticPayment,
                companyId: 0,
                amount: "",
                initialPaymentDate: "",
            }
        });
    }

    private closeModal = () => {
        this.resetInputValues();
        this.props.onModalClose(false);
    }

    private getAutomaticPayment = (userId : number) => {
        return {
            companyId: this.state.automaticPayment.companyId,
            amount: this.state.automaticPayment.amount,
            initialPaymentDate: new Date(this.state.automaticPayment.initialPaymentDate),
            lastPaymentDate: new Date(2000,0,2),
            payingUserId: userId,
        };
    }

    getAllCompanies ()
    {
        var companies;
        var token = sessionStorage.getItem("Authentication-Token");
        if(token === null)
        {
            this.setState({
                errorLabel: "Access Token Unavailable",
            })
            return [];
        }
        else{
            fetch(constants.baseUrl+"company", {
                method: "GET",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token' : token.toString()
                }})
            .then( response => 
                {
                    if( response.status === 500)
                    {
                        this.setState({
                            errorLabel: "Internal Server Error"
                        })
                        return null;
                    }
                    
                    return response.json();
                })
            .then( companiesData => {
                console.log(companiesData);
                this.setState({
                    companies: companiesData
                })
            })
            .catch( error => this.setState({ errorLabel: "Something went wrong" }));

            return companies;
        }
    }

    componentDidMount()
    {
        this.getAllCompanies();
    }

    private sendDataAndShowResponse = async () => {
        const automaticPayment = this.getAutomaticPayment(this.props.userId);
        console.log(automaticPayment);
        fetch(constants.baseUrl+"automaticPayment", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
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
                this.closeModal()
            }
    });
}

    render() {
        return (
            <div>
                <div className={this.props.open? "modal open" : "modal close"}>
                    <div className="container col-md-6">
                        <div className="modal-dialog attach-card">
                            <div className="modal-content attach-card">
                                <div className="modal-header attach-card">
                                    <h5 className="heading-name attach-card">xd</h5>
                                </div>

                                {/* <div className="form-group attach-card">
                                    <label className="form-label attach-card">Company</label>
                                    <input type="text" value={this.state.automaticPayment.companyId} onChange={(e) => this.handleChange(e.target.value, "companyId")} required className="form-control attach-card"></input>
                                </div> */}

                                <div className="form-group attach-card">
                                    <label className="form-label attach-card">Company</label>
                                    {/* <input type="text" value={this.state.automaticPayment.companyId} onChange={(e) => this.handleChange(e.target.value, "companyId")} required className="form-control attach-card"></input> */}
                                    <select value={this.state.automaticPayment.companyId} onChange={ (e) => this.handleChange(e.target.value, "companyId") } required className="form-control attach-card">
                                        {this.state.companies.map((x) => <option key={x.id}>{x.name}</option>)}
                                    </select>
                                </div>

                                <div className="form-group attach-card">
                                    <label className="form-label attach-card">Amount</label>
                                    <input type="text" value={this.state.automaticPayment.amount} onChange={(e) => this.handleChange(e.target.value, "amount")} required className="form-control attach-card"></input>
                                    {this.amountMustBePositive().message !== "Ok" ? <pre className={this.amountMustBePositive().class}>{this.amountMustBePositive().message}</pre> : null}
                                </div>

                                <div className="form-group attach-card">
                                    <label className="form-label attach-card">Initial Payment Date</label>
                                    <input type="date" name="initialPaymentDate" value={this.state.automaticPayment.initialPaymentDate} onChange={(e) => this.handleChange(e.target.value, "initialPaymentDate")} required className="form-control attach-card"></input>
                                    { this.initialPaymentDateIsAfterCurrentDate().message !== "Ok" ? <pre className={this.initialPaymentDateIsAfterCurrentDate().class}>{this.initialPaymentDateIsAfterCurrentDate().message}</pre> : null }
                                </div>

                                {this.state.errorLabel !== "" ? <div className="alert alert-warning"> {this.state.errorLabel} </div> : null }
                                
                                <div className="modal-footer attach-card">
                                    <button disabled={!this.mandatoryFieldsCompletedCorrectly()} className={this.mandatoryFieldsCompletedCorrectly()? "btn btn-primary attach-card" : "btn btn-secondary attach-card"} onClick={() => this.sendDataAndShowResponse()}>Create Automatic Payment</button>
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

export {AutomaticPaymentForm}