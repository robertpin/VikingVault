import  React  from 'react';
import {constants, transactionTypeEnum} from "../Resources/Constants";
import "./TransactionList.css";
import '../UserDashboard/DownloadTypeForm.css'
import shoppingCart from '../Resources/images/shoppingcart.png';
import userIcon from '../Resources/images/profileWhite.png';
import exchange from "../Resources/images/money-exchange.png";
import { IUserData } from './../AdminDashboard/UserData';
import DownloadDropdown from './DownloadTypeForm';

const url = constants.baseUrl+"transaction";

interface ITransaction {
    type: string;
    date: Date;
    amount: number;
    currency: string;
    sender: IUserData;
    receiver: IUserData;
    details: string;
    isUserSender: boolean;
}

interface IState {
    transactions: ITransaction[];
}

class TransactionList extends React.Component<any, IState> {
    state = {
        transactions: []
    }

    private getTransactions() {
        let token = sessionStorage.getItem("Authentication-Token");
        if(token === null)  {
            return;
        }
        fetch(url,{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then(response => response.json())
        .then(result => this.setState({
            transactions: result
        }));
    }

    componentDidMount() {
        this.getTransactions();
    }

    private formatOtherPartyString(transaction: ITransaction) {
        if(transaction.type.toLowerCase() === transactionTypeEnum.transfer) {
            if(transaction.isUserSender) {
                return `To ${transaction.receiver.firstName} ${transaction.receiver.lastName}`;
            }
            else {
                return `From ${transaction.sender.firstName} ${transaction.sender.lastName}`;
            }
        }
        if(transaction.type.toLowerCase() === transactionTypeEnum.exchange) {
            return `Exchanged ${transaction.details.toUpperCase()}`;
        }
        return transaction.receiver.firstName;
    }

    private formatDate(transactionDate: Date) {
        let date = new Date(transactionDate);
        let options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour12: true,
            hour: 'numeric',
            minute: '2-digit'
        };
        return new Intl.DateTimeFormat('en-GB', options).format(date).toString().toUpperCase();
    }

    private getImageForTransactionType(transactionType: string) {
        if(transactionType.toLowerCase() === transactionTypeEnum.transfer) {
            return userIcon;
        }
        if(transactionType.toLowerCase() === transactionTypeEnum.exchange) {
            return exchange;
        }
        return shoppingCart;
    }

    private formatDetails(tranasction: ITransaction) {
        if(tranasction.type.toLowerCase() === transactionTypeEnum.exchange) {
            return "Exchange";
        }
        return tranasction.details;
    }

    private formatAmount = (transation: ITransaction) => {
        if(transation.type === "payment") {
            return -transation.amount;
        }
        if(transation.amount > 0) {
            return `+${transation.amount}`;
        }
        return transation.amount;
    }

    private getTableRowFromTransaction(tran: ITransaction) {
        return <tr>
            <td><img src={this.getImageForTransactionType(tran.type)} className={"other-party-image"}/></td>
            <td className="font-weight-bold">{this.formatOtherPartyString(tran)}</td>
            <td>{this.formatDate(tran.date)}</td>
            <td className="font-weight-bold">{tran.currency.toUpperCase()}</td>
            <td className="font-weight-bold text-right">{this.formatAmount(tran)}</td>
            <td className="details">{this.formatDetails(tran)}</td>
        </tr>
    }

    private getTableBodyFromTransactionList() {
        let rows = []
        for(let tran of this.state.transactions) {
            rows.push(this.getTableRowFromTransaction(tran));
        }
        return <tbody>{rows}</tbody>;
    }
    
    render() {
        return <div className="transactions">
            <h5 className="font-weight-bold">Transactions</h5>
            <DownloadDropdown/>
            <table className="table table-hover">
                {this.getTableBodyFromTransactionList()}
            </table>
        </div>
    }
}

export {TransactionList}