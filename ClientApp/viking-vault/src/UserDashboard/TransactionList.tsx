import  React  from 'react';
import {constants, transactionTypeEnum} from "../Resources/Constants";
import "./TransactionList.css";
import '../UserDashboard/DownloadTypeForm.css'
import shoppingCart from '../Resources/images/shoppingcart.png';
import userIcon from '../Resources/images/profileWhite.png';
import exchange from "../Resources/images/money-exchange.png";
import { IUserData } from './../AdminDashboard/UserData';
import DownloadDropdown from './DownloadTypeForm';

const transactionUrl = constants.baseUrl+"transaction";

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

const deletedUser : IUserData = {
    id: 0,
    firstName: "DeletedUser",
    lastName: "",
    address: "",
    email: "",
    pictureLink: "",
    cardNumber: "",
    expirationDate: ""
}

interface IState {
    transactions: ITransaction[];
}

class TransactionList extends React.Component<any, IState> {
    state = {
        transactions: []
    }

    private adaptTransactionUsers(result:ITransaction[]): ITransaction[] {
        let transactions = result.map((transaction:ITransaction) => {
            if(transaction.sender === null){
                transaction.sender = deletedUser;
            }

            if(transaction.receiver === null){
                transaction.receiver = deletedUser;
            }
            return transaction;
        });
        return transactions;
    }

    private getTransactions() {
        const token = sessionStorage.getItem("Authentication-Token");
        if(token === null)  {
            return;
        }
        fetch(transactionUrl,{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then(response => response.json())
        .then(result => {
            result = this.adaptTransactionUsers(result);
            this.setState({
                transactions: result
            })
        });
    }

    componentDidMount() {
        this.getTransactions();
    }

    private formatOtherPartyString(transaction: ITransaction) {
        let otherUserInvoledInTransaction: string;
        if(transaction.type.toLowerCase() === transactionTypeEnum.transfer) {
            if(transaction.isUserSender) {
                otherUserInvoledInTransaction = `To ${transaction.receiver.firstName} ${transaction.receiver.lastName}`;
            }
            else {
                otherUserInvoledInTransaction = `From ${transaction.sender.firstName} ${transaction.sender.lastName}`;
            }
        }
        else if(transaction.type.toLowerCase() === transactionTypeEnum.exchange) {
            otherUserInvoledInTransaction = `Exchanged ${transaction.details.toUpperCase()}`;
        }
        else {
            otherUserInvoledInTransaction = transaction.receiver.firstName;
        }
        return otherUserInvoledInTransaction;
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
        let details: string;
        if(tranasction.type.toLowerCase() === transactionTypeEnum.exchange) {
            details = "Exchange";
        }
        else {
            details = tranasction.details
        }
        return details;
    }

    private formatAmount = (transation: ITransaction) => {
        let amountString: string;
        if(transation.type.toLowerCase() === "payment") {
            amountString =  -transation.amount+"";
        }
        else if(!transation.isUserSender) {
            amountString = `+${-transation.amount}`;
        }
        else if(transation.amount > 0) {
            amountString = `+${transation.amount}`;
        }
        else {
            amountString = transation.amount+"";
        }
        return amountString;
    }

    private getTableRowFromTransaction(tran: ITransaction) {
        const otherPartyString = this.formatOtherPartyString(tran);
        const detailsString = this.formatDetails(tran);
        return <tr>
            <td><img src={this.getImageForTransactionType(tran.type)} className={"other-party-image"}/></td>
            <td className="font-weight-bold details" title={otherPartyString}>{otherPartyString}</td>
            <td>{this.formatDate(tran.date)}</td>
            <td className="font-weight-bold">{tran.currency.toUpperCase()}</td>
            <td className="font-weight-bold text-right">{this.formatAmount(tran)}</td>
            <td className="details" title={detailsString}>{detailsString}</td>
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
            <h5 className="h5 font-weight-bold">Transactions</h5>
            <DownloadDropdown/>
            <table className="table table-hover">
                {this.getTableBodyFromTransactionList()}
            </table>
        </div>
    }
}

export {TransactionList}