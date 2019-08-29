import React from  "react";
import './ViewAutomaticPayments.css'
import TopBar from "../Common/TopBar";
import SideBar from "../Common/SideBar";
import { AutomaticPaymentList } from "./AutomaticPaymentList";
import "../Common/styles.css";
import AdminIcon from "../Common/AdminIcon";

export interface IAutomaticPaymentsState {
    reload: boolean;
}

class ViewAutomaticPayments extends React.Component<any, IAutomaticPaymentsState> {
    state = {
        reload: false
    }

    changeReloadingAutomaticPaymentsList = (reloading: boolean) => {
        this.setState({
            reload: reloading
        });
    }

    render() {
        return <div className="page-background">
            <SideBar userType="user"/>
            <TopBar/>
            <AdminIcon />
            <div className="feature-container mr-auto ml-auto w-75 bg-white">
                <div>
                    <div className="p-4">
                        <h4 className="payments-header">My payments</h4>
                        <AutomaticPaymentList reload = {this.state.reload} changeReloading={this.changeReloadingAutomaticPaymentsList}/>
                    </div>
                </div>
            </div>
        </div>
    }
}

export {ViewAutomaticPayments};