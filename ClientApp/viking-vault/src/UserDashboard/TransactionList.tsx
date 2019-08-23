import  React  from 'react';
import {constants} from "../Resources/Constants";
import "./TransactionList.css";
import shoppingCart from '../Resources/images/shoppingcart.png';
import userIcon from '../Resources/images/profileWhite.png';
import exchange from "../Resources/images/money-exchange.png";
import { IUserData } from './../AdminDashboard/UserData';

const baseUrl = constants.baseUrl;

interface ITransaction {
    user: IUserData;
    type: string;
    date: Date;
    amount: number;
    currency: string;
    senderOrReceiver: IUserData;
    details: string
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
        fetch(baseUrl+"transaction",{
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
        if(transaction.type.toLowerCase() === "transfer") {
            if(transaction.amount >= 0) {
                return `From ${transaction.senderOrReceiver.firstName} ${transaction.senderOrReceiver.lastName}`;
            }
            return `To ${transaction.senderOrReceiver.firstName} ${transaction.senderOrReceiver.lastName}`;
        }
        if(transaction.type.toLowerCase() === "exchange") {
            return `Exchanged ${transaction.details.toUpperCase()}`;
        }
        return transaction.senderOrReceiver.firstName;
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
        if(transactionType.toLowerCase() === "transfer") {
            return userIcon;
        }
        if(transactionType.toLowerCase() === "exchange") {
            return exchange;
        }
        return shoppingCart;
    }

    private formatDetails(tranasction: ITransaction) {
        if(tranasction.type.toLowerCase() === "exchange") {
            return "Exchange";
        }
        return tranasction.details;
    }

    private getTableRowFromTransaction(tran: ITransaction) {
        return <tr>
            <td><img src={this.getImageForTransactionType(tran.type)} className={"other-party-image"} /></td>
            <td className="font-weight-bold">{this.formatOtherPartyString(tran)}</td>
            <td>{this.formatDate(tran.date)}</td>
            <td className="font-weight-bold">{tran.currency.toUpperCase()}</td>
            <td className="font-weight-bold text-right">{tran.amount>0? `+${tran.amount}` : tran.amount}</td>
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
            <table className="table table-hover">
                {this.getTableBodyFromTransactionList()}
            </table>
        </div>
    }
}

export {TransactionList}