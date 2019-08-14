import React from 'react'
import {constants} from "../ConstantVariables";
import { Redirect } from 'react-router-dom';
import { TransactionList } from '../UserDashboard/TransactionList';
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';
import UserIcon from '../components/UserIcon';
import './TransferFunds.css';
import '../ExchangeForm.css';


const url = constants.baseUrl+"TransferFunds";

interface ITransferFundsState{
    transferedAmount: number;
    cardNumber: number;
    transferDetails: string;
}

class TransferFundsPage extends React.Component<any, ITransferFundsState>{
    constructor(props:any){
        super(props);
    }

    setAmountToBeTransfered(e : any)
    {
        this.setState({
            transferedAmount: e.target.value
        })
    }

    handleChangedCardNumber(e : any)
    {
        this.setState({
            cardNumber: e.target.value
        })
    }

    handleChangedTransferDetails(e : any)
    {
        this.setState({
            transferDetails: e.target.value
        })
    }

    transferMoney(){

        let token = sessionStorage.getItem('Authentication-Token');
        if(token != null) {
            fetch("https://localhost:44323/api/bankAccount", {
                method: "GET",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'x-access-token': token.toString()
                }
            })
            .then(response => response.json());
        }
    }

    render(){
        return(
            <div className = "transfer-funds-page">  
                <SideBar/>
                <TopBar/>
                <UserIcon/>
                <div className = "transfer-funds-container">
                    <div className = "details-inside-container"> 
                        <div className="col"> 
                            <p className="text-decoration">Sell</p>
                            <select className="form-control form-control-currency input-field">
                                <option value="EUR">EUR</option>
                                <option value="RON">RON</option>
                                <option value="YEN">YEN</option>
                                <option value="USD">USD</option>
                            </select>
                            <div>
                                <p className="total-balance">3000</p>
                                <p className="total-balance-text">Total balance</p>
                            </div>
                            
                            <div id="amount-container">
                                <p className="text-decoration">Amount</p>
                                <input
                                        className="form-control form-control-currency input-shadow underlineIt"
                                        placeholder=""
                                        type="number"
                                        min="1"
                                        pattern="^[0-9]"
                                        max= "900" //{this.state.availableAmountFromCurrency.toString()} TO BE CHANGED
                                        step="0.01"
                                        onChange={this.setAmountToBeTransfered}
                                />
                            </div>

                            <div className="transfer-details-container">
                                Details
                                <form>
                                    Card Number:<br/>
                                    <input type="text" name="cardnumber" onChange = {this.handleChangedCardNumber} /><br/>
                                    Transfer Details:<br/>
                                    <input type="text" name="transferdetails" onChange = {this.handleChangedTransferDetails} /><br/>
                                </form>

                                <button onClick = {this.transferMoney}>
                                    Transfer Now
                                </button>   
                            </div>
                            
                        </div>
                    </div> 
                </div>
            </div>          
    
        )
    }
}

export {TransferFundsPage}