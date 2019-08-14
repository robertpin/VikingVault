import React from 'react';
import { constants } from './ConstantVariables';
import AddMoneyModal from './AddMoneyModal';
import AddMoneyResponseModal from './AddMoneyResponseModal';

class AddMoney extends React.Component<any,any>{
    state = {
        openAddMoneyFormModal : false,
        openAddMoneyResponseModal: false,
        amount : 0.0,
        responseMessage: ""
    }

    private handleAddMoney = () =>{
        this.setState((oldstate : any)=>({
            openAddMoneyFormModal : !oldstate.openAddMoneyFormModal
        }));
    }

    private closeAddMoneyFormModal = () =>{
        this.setState({
            openAddMoneyFormModal : false
        });
    }

    private closeAddMoneyResponseModal = () =>{
        this.setState({
            openAddMoneyResponseModal : false,
            amount: 0.0
        });
    }

    private openResponseModalWithMessage = (message : string) =>{
        this.setState({
            openAddMoneyResponseModal : true,
            responseMessage : message
        });
    }

    private addMoney = (amount : Number) =>{
        this.setState({
            openAddMoneyFormModal : false
        });

        fetch(constants.baseUrl+"bankAccount", {
            method: "PUT",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              CurrencyType: "Ron",
              Balance : ""+amount, //add new amount to the total here
              Email: "email10@gmail.com"
            })}).then(response => {
                if(response.status === 200) {
                    this.openResponseModalWithMessage("Added RON "+amount+" to Vlad Buda account!");
                    this.setState({
                        amount : amount //+current balance
                    });
                }
                
                if(response.status !== 200) {
                    this.openResponseModalWithMessage("Something wrong happened. Try again later!");
                }
            });
        }

    render(){
        return(
            <div>
                <AddMoneyModal open = {this.state.openAddMoneyFormModal} userName = "Vlad Buda" closeModal = {this.closeAddMoneyFormModal} addMoney = {this.addMoney}/>
                <AddMoneyResponseModal open = {this.state.openAddMoneyResponseModal}  closeModal = {this.closeAddMoneyResponseModal} message = {this.state.responseMessage}/>
                <button className = "btn btn-primary" onClick = {this.handleAddMoney}>Push me!</button>
            </div>
        )
    }
}

export default AddMoney;