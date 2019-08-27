import  React  from 'react';
import {constants} from "../Resources/Constants";
import './ViewAutomaticPayments.css'
import ActivatePaymentToggle from "../AdminDashboard/ActivatePaymentToggle"

const automaticPaymentBaseUrl = constants.baseUrl + "AutomaticPayment";

interface IAutomaticPayment {
    id: number,
    companyName: string,
    amount: Number,
    initialPaymentDate: Date,
    lastPaymentDate: Date
}

interface IAutomaticPaymentsState {
    payments: IAutomaticPayment[];
    isThePaymentListEmpty: boolean;
    emptyListMessage: string;
}

class AutomaticPaymentList extends React.Component<any, IAutomaticPaymentsState> {
    constructor(props: any){
        super(props);
        this.state = {
            payments: [],
            isThePaymentListEmpty: false,
            emptyListMessage: ""
        }
    }

    getAutomaticPayments = () => {
        let token = sessionStorage.getItem("Authentication-Token");
        if(token === null)  {
            return;
        }
        else {
        fetch(automaticPaymentBaseUrl, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token.toString()
            }
        }).then(response => {
            if(response.status !== 200) {
                return null;
            }
            return response.json();
        }).then(result => {
            if(result === null) {
                return;
            }
            this.setState({
                payments: result
            });
            if(this.state.payments.length == 0){
                this.setState({
                    isThePaymentListEmpty: true,
                    emptyListMessage: "You don't have any automatic payment yet."
                })
            }
        });}
    }

    formatDate(transactionDate: Date) {
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

    componentDidMount() {
        this.getAutomaticPayments();
    }

    getPaymentsTableBody() {
        return this.state.payments.map( (payment) => {
            return <tr>
                <td className="payments-text centered-text">{payment.companyName}</td>
                <td className="payments-text centered-text">{payment.amount}</td>
                <td className="payments-text centered-text">{this.formatDate(payment.initialPaymentDate)}</td>
                <td className="payments-text centered-text">{this.formatDate(payment.lastPaymentDate)}</td>
                <td className="payments-text centered-text"><ActivatePaymentToggle paymentId={payment.id} /></td>
                <td className="payments-text centered-text">Edit element here</td>
                <td className="payments-text centered-text">Delete element here</td>
            </tr>;
        })
    }

    render() {
        return <div className="m-4 w-auto">
            {this.state.isThePaymentListEmpty?
                <label className="payments-text centered-text">{this.state.emptyListMessage}</label> :
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" className="centered-text">Company</th>
                            <th scope="col" className="centered-text">Amount</th>
                            <th scope="col" className="centered-text">Initial Payment Date</th>
                            <th scope="col" className="centered-text">Last Payment Date</th>
                            <th colSpan={3} scope="col" className="centered-text">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getPaymentsTableBody()}
                    </tbody>
                </table>
            }
    </div> 
    }
}

export {AutomaticPaymentList}