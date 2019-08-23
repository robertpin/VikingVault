import React from 'react'
import {constants} from "../Resources/Constants";
import { Redirect } from 'react-router-dom';
import SideBar from '../Common/SideBar';
import TopBar from '../Common/TopBar';
import UserIcon from '../Common/UserIcon';
import './TransferFunds.css';
import '../UserDashboard/ExchangeForm.css';
import TransferFundsModal from './TransferFundsModal';
import Toggle from '../Common/Toggle';


const transferUrl = `${constants.baseUrl}transferFunds`;
const requestUrl = `${constants.baseUrl}transferRequests`;

interface ITransferFundsState{
    transferedAmount: number;
    currency: string;
    cardNumber: string;
    transferDetails: string;
    modalMessage: string;
    totalBalance: number;
    openModal: boolean;
    requestTransfer: boolean;
    isButtonDisabled: boolean;
}

interface ITransferDataDTO{
    amount: number;
    cardNumberReciever: string;
    transferDetails: string;
    currency: string;
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
          openModal: false,
          requestTransfer: false,
          isButtonDisabled: false
        }
    }

    componentDidMount(){
      this.getTotalBalance();      
    }

    componentDidUpdate() {
      this.getTotalBalance();
    }

    setAmountToBeTransfered = (e : any) =>
    {
        if(Number (e.target.value) <= this.state.totalBalance) {
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

    handleChangeRequestTransferState = () =>
    {
      this.setState((oldState: ITransferFundsState) => ({
        requestTransfer: !oldState.requestTransfer
      }));
        
    }

    handleIsButtonDisabled = () =>
    {
        this.setState((oldState: ITransferFundsState) => ({
          isButtonDisabled: !oldState.isButtonDisabled
        }));
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
                        totalBalance: result[0].balance.toFixed(2)
                    });
                }
                if(this.state.currency === "EUR") {
                    this.setState({
                        totalBalance: result[1].balance.toFixed(2)
                    });
                }
                if(this.state.currency === "USD") {
                    this.setState({
                        totalBalance: result[2].balance.toFixed(2)
                    });
                }
                if(this.state.currency === "YEN") {
                    this.setState({
                        totalBalance: result[3].balance.toFixed(2)
                    });

                }
            });
        }
    }

    private getTransferDataFromUI = ():ITransferDataDTO =>
    {
        return {
          amount: this.state.transferedAmount,
          cardNumberReciever: this.state.cardNumber,
          transferDetails: this.state.transferDetails,
          currency: this.state.currency
        };  
    }

    private isValidAmount = (data: ITransferDataDTO) =>
    {
      if(data.amount == 0)
      {
          this.setState({
            openModal: true,
            modalMessage: "Insert a proper amount to be sent!"
          })

          return false;
      }

      return true;
    }

    transferMoney = () => {
        
        let data = this.getTransferDataFromUI();

        if(this.isValidAmount(data))
        {
          let token = sessionStorage.getItem('Authentication-Token');

          if(token !== null)
          {
            this.handleIsButtonDisabled();

            fetch(transferUrl, {
              method: "POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token.toString()
              },
              body: JSON.stringify(data)
              })
              .then(response => response.json())
              .then( response => {
                
                  this.setState({
                    openModal: true,
                    modalMessage: response
                  }); 
                  
                  this.handleIsButtonDisabled(); 
              });
          }
        }
    }

    requestTransfer = () =>
    {
      let data = this.getTransferDataFromUI();

      if(this.isValidAmount(data))
      {
        let token = sessionStorage.getItem('Authentication-Token');

         if(token !== null)
        {
          this.handleIsButtonDisabled();

          fetch(requestUrl, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': token.toString()
            },
            body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then( response => {
              
                this.setState({
                  openModal: true,
                  modalMessage: response
                });

                this.handleIsButtonDisabled();
            });
        } 
      }
    }

    closeModal = () =>
    {
        this.setState({
          openModal: false,
          modalMessage: "",
          transferedAmount: 0
        }); 
    }

    render(){
        return(
            <div className = "transfer-funds-page">  
                <SideBar userType = "admin"/>
                <TopBar/>
                <UserIcon/>
                <TransferFundsModal open={this.state.openModal} closeModal={this.closeModal} message={this.state.modalMessage} />
                <div className = "transfer-funds-container">
                    <div className = "transfer-funds-left-container"> 

                            <div className = "transfer-request-toggle-container">
                                <span  className ="toggle-positioning"><Toggle toggleSwitch = {this.handleChangeRequestTransferState}/></span> 
                                <p className= {"toggle-text-container text-decoration " + (this.state.requestTransfer == true ? "toggle-deactivated-text-decoration" : "toggle-activated-text-decoration") }>Transfer</p>
                                <p className= {"toggle-text-container text-decoration " + (this.state.requestTransfer == true ? "toggle-activated-text-decoration" : "toggle-deactivated-text-decoration")}>Request</p>
                            </div>

                            <div className="transfer-data-left-container">
                               <div>
                                  <select className="form-control form-control-currency input-field" onChange={this.setCurrency}>
                                        <option value="EUR">EUR</option>
                                        <option value="RON">RON</option>
                                        <option value="YEN">YEN</option>
                                        <option value="USD">USD</option>
                                    </select>
                                    <div>
                                        <p className="total-balance">{this.state.totalBalance}</p>
                                    </div>
                               
                                    <div className = "amount-container-position">
                                        <p className="text-decoration">Amount</p>
                                        <input
                                                className="form-control form-control-currency input-shadow underlineIt amount-input-field"
                                                placeholder=""
                                                type="number"
                                                min="1"
                                                pattern="^[0-9]"
                                                max= {this.state.totalBalance}
                                                step="0.001"
                                                onChange={this.setAmountToBeTransfered}
                                                value={this.state.transferedAmount}
                                        />
                                   </div>
                               </div>
                            </div>
                      
                            <div className="transfer-details-container">
                                <form>
                                    <br/>
                                    <input 
                                    className="form-control form-group text-center"
                                    type="text"
                                    placeholder="Card Number"
                                    onChange={this.handleChangedCardNumber}/> 
                                    <input 
                                     className="form-control form-group text-center"
                                     type="cardnumber"
                                     placeholder="Transfer Details"
                                     onChange={this.handleChangedTransferDetails}/>
                                </form>

                                <button className="btn button-login transfer-request-button" disabled = {this.state.isButtonDisabled} onClick = {this.state.requestTransfer === true? this.requestTransfer : this.transferMoney}>
                                    {this.state.requestTransfer == true ? "Request Now" : "Transfer Now"}
                                </button>   
                            </div>
                    </div> 
                </div>
            </div>         
        )
    }
}

export {TransferFundsPage}