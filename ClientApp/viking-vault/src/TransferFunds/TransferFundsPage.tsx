import React from 'react'
import {constants} from "../ConstantVariables";
import { Redirect } from 'react-router-dom';
import { TransactionList } from '../UserDashboard/TransactionList';
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';
import UserIcon from '../components/UserIcon';
import './TransferFunds.css';

const url = constants.baseUrl+"TransferFunds";

interface IAccountState{
    balance: number
    card: any
    transactions: []
    isPresent: boolean
    redirect: boolean
} 

class TransferFundsPage extends React.Component<any, IAccountState>{
    constructor(props:any){
        super(props);
    }

    render(){
        return(
            <div className = "transfer-funds-page">  
                <SideBar/>
                <TopBar/>
                <UserIcon/>
                <div className = "transfer-funds-container">
                    <div className = "details-inside-container"> Hello</div> 
                </div>          
            </div>
        )
    }
}

export {TransferFundsPage}