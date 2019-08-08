import React from 'react'
import './styles.css'
import inexistentCard from './images/card.png'
import genericCard from './images/GENERICcard-01.png'
import {variables} from "../ConstantVariables";
import { Redirect } from 'react-router-dom';

const url = variables.baseUrl+"Accounts";

interface IAccountState{
    balance: number
    card: any
    isPresent: boolean
    redirect: boolean
} 

class AccountPage extends React.Component<any, IAccountState>{
    constructor(props:any){
        super(props);

        this.state={
            balance: 0,
            card: {},
            isPresent: false,
            redirect:false
        }
    }

    componentDidMount(){

        let token = sessionStorage.getItem("Authentication-Token");

        if(token === null)
        {
            this.setState({
                redirect:true
            })
        }
        else
        {
            fetch(url, {
                method:"GET",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token' : token.toString()
                }})
                .then((response)=> {
                    if(response.status === 404){
                        this.setState(oldState => {
                            return {
                                isPresent: false
                            }
                        })
                    }
                    if(response.status === 200){
                        this.setState(oldState => {
                            return {
                                isPresent: true
                            }
                        })
                    }
                    response.json();})
                .then(data=>{})
                .catch(error => {
                    this.setState(oldState => {
                        return {
                            isPresent: false
                        }
                    })
            })
        }
    }
        

    AccountsInformation(){
        return <div>
            <div className="balance-container">
                <p className="balance-header">RON <span className="balance-value">3,689</span></p> 
                <p className="balance-information">Total balance</p>
            </div>
            <br/>
            <div className="balance-container">
                <p className="accounts-container">RON <span className="account-value">0</span> &nbsp; &nbsp; EUR <span className="account-value">0</span> &nbsp; &nbsp; USD <span className="account-value">0</span> &nbsp; &nbsp; YEN <span className="account-value">0</span> </p> 
            </div>
        </div>
    }

    render(){
        return(            
            <div className={this.state.isPresent ? "account-view" : "account-hide"}>       
                <div className="card-picture-container">
                    <p className="card-number">0000 &nbsp; 0000 &nbsp; 0000 &nbsp; 0000</p>
                    <p className="card-expiration-date">08/20</p>
                    <p className="card-owner-name">HUNYADI CRISTINA</p>
                    <img className="card-available" src={genericCard} alt=""></img>
                </div>
                <div className="info">
                    <div className="accounts-title">
                        <h2 className="accounts-header">Accounts</h2>
                    </div>
                    {this.state.isPresent ? <h5 className="no-card-text">Please contact your administrator to attach a card to your account</h5> : this.AccountsInformation()}
                </div>
            </div>
        )
    }
}

export default AccountPage