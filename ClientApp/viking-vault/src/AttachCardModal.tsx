import React from "react";
import { constants } from "./ConstantVariables";
import './AttachCardModal.css';

const baseUrl = constants.baseUrl;
var regex = /^([+-]?[1-9]\d*|0)$/;

interface IModalProps {
    open: boolean;
    modalClose: any;
    firstName: string;
    lastName: string;
    userId: number;
}

interface ICardProperties {
    cardNumber: string;
    expirationDate: string;
    ccv: number;
}

interface IFormState {
    [key: string]: string | number | boolean | ICardProperties  | null;
    card: ICardProperties;
    valid: boolean | null;
    errorLabel: string;
}

class AttachCardForm extends React.Component<any, IFormState> {
    constructor(props: IModalProps) {
        super(props);
        this.state = {
            card: {
                cardNumber: "",
                expirationDate: "",
                ccv: 0,
            },
            valid: null,
            errorLabel: "",
        }
    }

    private handleChange = (inputValue: string, inputName: string) => {
        this.setState({
            card: {
                ...this.state.card,
                [inputName]: inputValue
            }
        });
    }

    private cardNumberHasSixteenDigits = () => {
        if(this.state.card.cardNumber.length === 16 && this.state.card.cardNumber.match(regex))
            return  {
                message: "Ok",
                class: "alert alert-success"
            }
        return  {
            message: "Card Number must have 16 digits",
            class: "alert alert-danger"
        }
    }

    private ccvHasThreeDigits = () => {
        if(this.state.card.ccv >=100 && this.state.card.ccv <= 999)
            return  {
                message: "Ok",
                class: "alert alert-success"
            }
        return  {
            message: "CCV must have 3 digits",
            class: "alert alert-danger"
        }
    }

    private expirationDateIsAfter2019 = () => {
        if(!(this.state.card.expirationDate === ""))
            return  {
                message: "Ok",
                class: "alert alert-success"
            }
        return  {
            message: "Expiration Date must be after at least one year from the current date!",
            class: "alert alert-danger"
        }
    }

    private mandatoryFieldsCompletedCorrectly = () => {
        let val = true;
        if(this.cardNumberHasSixteenDigits().message !== "Ok") {
            val = false;
        }
        if(this.expirationDateIsAfter2019().message !== "Ok") {
            val = false;
        }
        if(this.ccvHasThreeDigits().message !== "Ok") {
            val = false;
        }
        return val;
    }

    private resetInputValues = () => {
        this.setState({
            card: {
                ...this.state.card,
                cardNumber: "",
                expirationDate: "",
                ccv: 0,
            }
        });
    }

    private closeModal = () => {
        this.resetInputValues();
        this.props.modalClose(false);
    }

    private getCard = (userId : number) => {
        return {
            cardNumber: this.state.card.cardNumber,
            expirationDate:  new Date(parseInt(this.state.card.expirationDate, 10), new Date().getMonth(), 1),
            ccv: this.state.card.ccv,
            userId: userId,
        };
    }

    private sendDataAndShowResponse = async () => {
        const card = this.getCard(this.props.userId);
        console.log(card);
        fetch(baseUrl+"attach", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(card)
        })
        .then(response => {
            if(response.status === 409) {
              this.setState({
                errorLabel: "There is already a card with this card number!"
              });
              setTimeout(() => {
                this.setState({
                  errorLabel: ""
                });
              }, 5000);
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
                                    <h5 className="heading-name attach-card">{this.props.firstName} {this.props.lastName}</h5>
                                </div>
                                <div className="form-group attach-card">
                                    <label className="form-label attach-card">Card number</label>
                                    <input type="text" value={this.state.card.cardNumber} onChange={(e) => this.handleChange(e.target.value, "cardNumber")} required className="form-control accent-color"></input>
                                    {this.state.card.cardNumber !== "" && this.cardNumberHasSixteenDigits().message !== "Ok" ? <pre className={this.cardNumberHasSixteenDigits().class}>{this.cardNumberHasSixteenDigits().message}</pre> : null}
                                </div>
                                <div className="form-group attach-card">
                                    <label className="form-label attach-card">Expiration date</label>
                                    <select value={this.state.card.expirationDate} onChange={ (e) => this.handleChange(e.target.value, "expirationDate") } required className="form-control accent-color">
                                        <option value=" "></option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                    </select>
                                    { this.expirationDateIsAfter2019().message !== "Ok" ? <pre className={this.expirationDateIsAfter2019().class}>{this.expirationDateIsAfter2019().message}</pre> : null }
                                </div>
                                <div className="form-group attach-card">
                                    <label className="form-label attach-card">CCV</label>
                                    <input type="number" value={this.state.card.ccv} onChange={(e) => this.handleChange(e.target.value, "ccv")} required className="form-control accent-color"></input>
                                    { this.ccvHasThreeDigits().message !== "Ok" ? <pre className={this.ccvHasThreeDigits().class}>{this.ccvHasThreeDigits().message}</pre> : null }
                                </div>
                                {this.state.errorLabel !== "" ? <div className="alert alert-danger"> {this.state.errorLabel} </div> : null }
                                <div className="modal-footer attach-card">
                                    <button disabled={!this.mandatoryFieldsCompletedCorrectly()} className={this.mandatoryFieldsCompletedCorrectly()? "btn btn-primary attach-card" : "btn btn-secondary attach-card"} onClick={() => this.sendDataAndShowResponse()}>Attach Card</button>
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

export {AttachCardForm}