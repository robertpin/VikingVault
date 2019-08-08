import  React  from 'react';
import {constants} from "../ConstantVariables";
import "./TransactionList.css";
import shoppingCart from './shoppingcart.png';
import userIcon from './profileWhite.png';
import exchange from "./moneyExchange.png";

const baseUrl = constants.baseUrl;

interface ITransaction {
    type: string;
    date: Date;
    amount: number;
    currency: string;
    otherParty: string;
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
        if(transaction.type === "transfer") {
            if(transaction.amount >= 0) {
                return `From ${transaction.otherParty}`;
            }
            return `To ${transaction.otherParty}`;
        }
        if(transaction.type === "exchange") {
            return `Exchanged ${transaction.otherParty.toUpperCase()}`;
        }
        return transaction.otherParty;
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
        if(transactionType === "transfer") {
            return userIcon;
        }
        if(transactionType === "exchange") {
            return exchange;
        }
        return shoppingCart;
    }

    private getTableRowFromTransaction(tran: ITransaction) {
        return <tr>
            <td><img src={this.getImageForTransactionType(tran.type)} className={"other-party-image"} /></td>
            <td className="font-weight-bold">{this.formatOtherPartyString(tran)}</td>
            <td>{this.formatDate(tran.date)}</td>
            <td className="font-weight-bold">{tran.amount>0? `+${tran.currency.toUpperCase()}` : `-${tran.currency.toUpperCase()}`}</td>
            <td className="font-weight-bold text-right">{tran.amount>0? tran.amount : -tran.amount}</td>
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
            <table className="table">
                {this.getTableBodyFromTransactionList()}
            </table>
        </div>
    }
}

export {TransactionList}