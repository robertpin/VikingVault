import React from 'react'
import {constants} from "../ConstantVariables";
import { Redirect } from 'react-router-dom';
import { TransactionList } from '../UserDashboard/TransactionList';
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';
import UserIcon from '../components/UserIcon';
import './TransferFunds.css';
import '../ExchangeForm.css';

const url = `${constants.baseUrl}transferFunds`;

interface ITransferFundsState{
    transferedAmount: number;
    currency: string;
    cardNumber: string;
    transferDetails: string;
    modalMessage: string;
    totalBalance: number;
    openModal: boolean;
}

class TransferFundsPage extends React.Component<any, ITransferFundsState>{
    constructor(props:any){
        super(props);
        this.state = {
          transferedAmount: 0,
          currency: "EUR",
          cardNumber: "",
          transferDetails: "",
          modalMessage: "",
          totalBalance: 0,
          openModal: false
        }
    }

    componentDidMount() {
      this.getTotalBalance();
    }

    setAmountToBeTransfered = (e : any) =>
    {
      if(e.target.value <= this.state.totalBalance) {
        this.setState({
          transferedAmount: e.target.value
        });
      }
    }

    handleChangedCardNumber = (e : any) =>
    {
        this.setState({
            cardNumber: e.target.value
        })
    }

    handleChangedTransferDetails = (e : any) =>
    {
        this.setState({
            transferDetails: e.target.value
        })
    }

    private setCurrency = (e: any) => {
      this.setState({
        currency: e.target.value
      });
      this.getTotalBalance();
    }

    getTotalBalance = () => {
      let token = sessionStorage.getItem('Authentication-Token');
        if(token != null) {
            fetch(constants.baseUrl+"bankAccount", {
                method: "GET",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'x-access-token': token.toString()
                }
            })
            .then(response => response.json())
            .then(result => {
                if(this.state.currency === "RON") {
                    this.setState({
                        totalBalance: result[0].balance
                    });
                }
                if(this.state.currency === "EUR") {
                    this.setState({
                        totalBalance: result[1].balance
                    });
                }
                if(this.state.currency === "USD") {
                    this.setState({
                        totalBalance: result[2].balance
                    });
                }
                if(this.state.currency === "YEN") {
                    this.setState({
                        totalBalance: result[3].balance
                    });
                }
            });
        }
    }

    transferMoney = () => {
        var data = {
          idSender: 0,
          amountSent: this.state.transferedAmount,
          cardNumberReciever: this.state.cardNumber,
          transferDetails: this.state.transferDetails,
          currency: this.state.currency
        }
        
        console.log(data);

        let token = sessionStorage.getItem('Authentication-Token');

        if(token !== null)
        {
            fetch(url, {
              method: "POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token.toString()
              },
              body: JSON.stringify(data)
          })
          .then(response => {
            
            if(response.status === 200) {
              this.setState({
                modalMessage: "All good!"
              });
              
            
              return response.json();
            }
            else{
              
              console.log(response.statusText);
              if(response.status === 404) {
                this.setState({
                  modalMessage: response.statusText
                });
              }
              console.log(this.state.modalMessage);
              return null;
            }
          });   
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
                            <select className="form-control form-control-currency input-field" onChange={this.setCurrency}>
                                <option value="EUR">EUR</option>
                                <option value="RON">RON</option>
                                <option value="YEN">YEN</option>
                                <option value="USD">USD</option>
                            </select>
                            <div>
                                <p className="total-balance">{this.state.totalBalance}</p>
                                {/* <span className="total-balance-text">Total balance</span> */}
                            </div>
                            
                            <div id="amount-container">
                                <p className="text-decoration">Amount</p>
                                <input
                                        className="form-control form-control-currency input-shadow underlineIt"
                                        placeholder=""
                                        type="number"
                                        min="1"
                                        pattern="^[0-9]"
                                        max= {this.state.totalBalance}
                                        step="0.01"
                                        onChange={this.setAmountToBeTransfered}
                                        value={this.state.transferedAmount}
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