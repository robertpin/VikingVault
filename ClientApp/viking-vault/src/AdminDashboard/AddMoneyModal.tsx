import React from 'react';
import './AddMoney.css';
import {constants} from '../Resources/Constants'

interface IAddMoneyModalProps{
    open: boolean;
    userName: string;
    closeModal: () => void;
    addMoney: (amount: number) => void;
}

interface IAddMoneyModalState{
    amount: string;
    minAmount: number;
    maxAmount: number;
}

class AddMoneyModal extends React.Component<IAddMoneyModalProps, IAddMoneyModalState>{ 
    state = { 
        amount : "",
        minAmount: 0.1,
        maxAmount: 5000 
    };

    private resetAmountField(){
        this.setState({ amount : "" });
    }

    private closeModal = () =>{
        this.resetAmountField();
        this.props.closeModal();
    }

    private handleAddMoney = () =>{
        this.resetAmountField();
        this.props.addMoney(Number(this.state.amount));
    }

    private checkAmountValid = () =>{
        if(!this.validateAmount()){
            return {
                message: "Amount should be between 0.1-5000 RON",
                class: "alert alert-danger"
            }
        }
        return {
            message: "",
            class: ""
        }
    }

    private handleAmountChange = (e:any) => {
        this.setState({ amount: e.target.value 
        }, this.checkAmountValid);
    }

    private validateAmount(){
        const isAmountSmallerThanLimit = Number(this.state.amount) < this.state.minAmount;
        const isAmountLargerThanLimit = Number(this.state.amount) > this.state.maxAmount;
        const isAmountValid = constants.regexCheckIfPositiveFloat.test(this.state.amount);
        console.log(isAmountValid);
        if(isAmountSmallerThanLimit || isAmountLargerThanLimit || !isAmountValid){
            return false;
        }
        return true;
    }

    render(){
        return (
            <div className={this.props.open? "modal open" : "modal close"}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add money to {this.props.userName}</h4>
                        </div>

                        <div className = "modal-body">
                            <div className="form-group">
                                <label>Amount (RON)</label>
                                <input type="text" className="form-control accent-color"
                                min = {this.state.minAmount}
                                max = {this.state.maxAmount}
                                value = {this.state.amount} 
                                onChange = {this.handleAmountChange} />
                                {this.state.amount!=="" ? <pre className={this.checkAmountValid().class}>{this.checkAmountValid().message}</pre> : null}
                            </div>
                        </div>

                        <div className="modal-footer add-money">
                            <button disabled={!this.validateAmount()} className={this.validateAmount()? "btn btn-primary add-money-button" : "btn btn-secondary add-money-button"} onClick={this.handleAddMoney}>Confirm</button>
                            <button type="button" className="btn btn-primary cancel-add-money-button" onClick={this.closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddMoneyModal;