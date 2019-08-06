import React from 'react'
import './styles.css'
import account from './images/card.png'
import {variables} from "../ConstantVariables";
import { Redirect } from 'react-router-dom';

const url = variables.baseUrl+"Accounts";

interface IAccountState{
    balance: number
    card: any
    transactions: []
    isPresent: boolean
    redirect: boolean
} 

class AccountPage extends React.Component<any, IAccountState>{
    constructor(props:any){
        super(props);

        this.state={
            balance: 0,
            card: {},
            transactions: [],
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
        

    render(){
        return(            
            <div className={this.state.isPresent ? "account-view" : "account-hide"}>
                <img className="card-unavailable" src={account} alt=""></img>
                <div className="info">
                    <div className="accounts-title">
                        <h2 className="accounts-header">Accounts</h2>         
                        <br/><br/><br/>
                        <h5 className="no-card-text">Please contact your administrator to attach a card to your account</h5>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default AccountPage