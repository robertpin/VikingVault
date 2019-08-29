import  React  from 'react';
import {constants} from "../Resources/Constants";
import './ViewAutomaticPayments.css'
import ActivatePaymentToggle from "../AdminDashboard/ActivatePaymentToggle"
import { DeleteAutomaticPayment } from './DeleteAutomaticPayment';
import {CreateAutomaticPaymentForm} from "./CreateAutomaticPaymentModal"
import addPaymentImg from "../Resources/images/add_payment.png"
import { EditAutomaticPaymentButton } from './EditAutomaticPaymentButton';

const automaticPaymentBaseUrl = constants.baseUrl + "AutomaticPayment";
const defaultDate = "01/01/2000, 10:00 PM";

interface IModals {
    openCreateAutomaticPaymentModal: boolean,
}

export interface IAutomaticPayment {
    id: number,
    companyId: number,
    companyName: string,
    amount: number,
    initialPaymentDate: Date,
    lastPaymentDate: Date
}

interface IAutomaticPaymentsState {
    payments: IAutomaticPayment[];
    isThePaymentListEmpty: boolean;
    emptyListMessage: string;
    modals: IModals;
}

class AutomaticPaymentList extends React.Component<any, IAutomaticPaymentsState> {
    constructor(props: any){
        super(props);
        this.state = {
            payments: [],
            isThePaymentListEmpty: false,
            emptyListMessage: "",
            modals : {
                openCreateAutomaticPaymentModal: false,
        }
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
            })
            .then(response => {
                if(response.status !== 200) {
                    return null;
                }
                return response.json();
            })
            .then(result => {
                if(result === null) {
                    return;
                }
                this.setState({
                    payments: result
                });
                if(this.state.payments.length === 0){
                    this.setState({
                        isThePaymentListEmpty: true,
                        emptyListMessage: "You don't have any automatic payment yet."
                    })
                }
            });
        }
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

    deletePaymentFromList = (id : Number) =>{
        let paymentList = this.state.payments.filter(payment => payment.id !== id);
        this.setState({payments : paymentList});
    }

    getPaymentsTableBody() {
        return this.state.payments.map( (payment) => {
            return <tr>
                <td className="payments-text centered-text" title={payment.companyName}>{payment.companyName}</td>
                <td className="payments-text centered-text">{payment.amount}</td>
                <td className="payments-text centered-text">{this.formatDate(payment.initialPaymentDate)}</td>
                <td className="payments-text centered-text"> {this.formatDate(payment.lastPaymentDate) !== defaultDate ?
                    this.formatDate(payment.lastPaymentDate) : " " }</td>
                <td className="payments-text centered-text">
                    <ActivatePaymentToggle paymentId={payment.id} />
                </td>
                <td className="payments-text centered-text">
                    <EditAutomaticPaymentButton automaticPayment={payment} reload={this.getAutomaticPayments}/>
                </td>
                <td>
                    <DeleteAutomaticPayment automaticPaymentId = {payment.id} deletePaymentFromList = {this.deletePaymentFromList}/>
                </td>
            </tr>;
        })
    }

    handleCreateAutomaticPayment = () => {
        this.setState({
            modals: {
                ...this.state.modals,
                openCreateAutomaticPaymentModal: true,
            }
        });
    }

    closeCreateAutomaticPaymentModal = () => {
        this.setState({
            modals: {
                ...this.state.modals,
                openCreateAutomaticPaymentModal: false,
            }
        });
    }

    render() {
        return <div className="m-4 w-auto">
                <CreateAutomaticPaymentForm open={this.state.modals.openCreateAutomaticPaymentModal} onModalClose={this.closeCreateAutomaticPaymentModal} reload={this.getAutomaticPayments}/>
                <button className = "btn add-payment-button" onClick={ this.handleCreateAutomaticPayment}>
                    <img title="Create Automatic Payment" className="add-payment-icon" src={addPaymentImg} alt="Automatic Payment Button"></img>
                </button>
            {this.state.payments.length === 0?
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