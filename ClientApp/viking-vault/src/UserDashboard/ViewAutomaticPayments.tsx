import  React  from 'react';
import {constants} from "../Resources/Constants";
import SideBar from '../Common/SideBar';
import TopBar from '../Common/TopBar';
const baseUrl = constants.baseUrl;

interface IAutomaticPayment {
    CompanyName: string,
    Amount: string,
    InitialPaymentDate: Date,
    LastPaymentDate: Date
}

interface IAutomaticPaymentsState {
    payments: IAutomaticPayment[]
}

class ViewAutomaticPayments extends React.Component<any, IAutomaticPaymentsState> {
    state = {
        payments: []
    }

    getAutomaticPayments = () => {
        let token = sessionStorage.getItem("Authentication-Token");
        if(token === null)  {
            return;
        }else{
        fetch(baseUrl+"automaticpayment",{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token.toString()
            }
        }).then(response => response.json())
        .then(result => {
            this.setState({
                payments: result
            });
            console.log(this.state.payments);
        })}
    }

    formatDate = (paymentDate: Date) => {
        let date = paymentDate.toString();
        var dateArray = date.split("T");
        date = dateArray[0];
        return date;
    }

    getTableRowFromPayment = (payment: IAutomaticPayment) => {
        return <tr>
            <td>{payment.CompanyName}</td>
            <td>{payment.Amount}</td>
            <td>{payment.InitialPaymentDate}</td>
            <td>{payment.LastPaymentDate}</td>
        </tr>;
    }

    getTableBodyFromPaymentList = () => {
        let rows = [];
        for(let payment of this.state.payments) {
            rows.push(this.getTableRowFromPayment(payment));
        }
        return <tbody>
            {rows}
        </tbody>;
    }

    componentDidMount() {
        this.getAutomaticPayments();
    }

    render() {
        return <div>
            <SideBar userType="user"/>
            <TopBar/>
            <div>
                <h3>Automatic Payments</h3>
                <table className="table">
                    {() => this.getTableBodyFromPaymentList()}
                </table>
            </div>
        </div>
    }
}

export {ViewAutomaticPayments}