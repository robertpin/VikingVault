import React from 'react';
import AddMoney from './AddMoney';
import AddMoneyResponseModal from './AddMoneyResponseModal';

interface IAddMoneyModalProps{
    open: boolean;
    userName: string;
    closeModal: any;
    addMoney: any;
}

interface IAddMoneyModalState{
    amount: string;
}

class AddMoneyModal extends React.Component<IAddMoneyModalProps, IAddMoneyModalState>{ 
    constructor(props : IAddMoneyModalProps){
        super(props);
        this.state = {
            amount : ""
        };
    }

    private resetAmountField(){
        this.setState({
            amount : ""
        });
    }
    private closeModal = () =>{
        this.resetAmountField();
        this.props.closeModal(false);
    }

    private handleAddMoney = () =>{
        this.resetAmountField();
        this.props.addMoney(Number(this.state.amount));
    }

    private handleAmountChange = (e:any) =>{
        this.setState({
            amount: e.target.value
        });
    }

    private validateAmount(){
        if(Number(this.state.amount) <= 0 || Number(this.state.amount) > 5000 || !(this.state.amount.match("^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$"))){
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
                                <input type="text" className="form-control accent-color" value = {this.state.amount} onChange = {this.handleAmountChange}></input>
                                {!this.validateAmount() ? <p className="alert alert-danger">Amount should be between 0.1-5000 RON</p> : null}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button disabled={!this.validateAmount()} className={this.validateAmount()? "btn btn-primary add-money" : "btn btn-secondary add-money"} onClick={this.handleAddMoney}>Confirm</button>
                            <button type="button" className="btn btn-primary cancel-add-money" onClick={this.closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddMoneyModal;