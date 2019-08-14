import React from 'react'
import {constants} from "../ConstantVariables";
import { Redirect } from 'react-router-dom';
import { TransactionList } from '../UserDashboard/TransactionList';
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';
import UserIcon from '../components/UserIcon';
import './TransferFunds.css';
import '../ExchangeForm.css';

const url = `${constants.baseUrl}TransferFunds`;

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

    handleTransferMoney = () => {
        var data = {
          transferedAmount: this.state.transferedAmount,
          cardNumber: this.state.cardNumber,
          transferDetails: this.state.transferDetails
        }
    
        fetch(baseUrl+"login", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
          if(response.status === 404) {
            this.setState({
              errorLabel: "Incorrect email or password!"
            });
            setTimeout(() => {
              this.setState({
                errorLabel: ""
              });
            }, 1500);
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
          if(response !== null) {
            return response.json();
          }
        })
        .then(result => {
          if(result !== null)
          {
            // correct email + password => redirect to user/admin page 
            sessionStorage.setItem('Authentication-Token', result.token);
            if(result.email === "admin"){
              this.setState({
                redirect: true,
                userType: "admin"
              })
            }
            else{
              this.setState({
                redirect: true,
                userType: "user"
              })
            }
          }
      });
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