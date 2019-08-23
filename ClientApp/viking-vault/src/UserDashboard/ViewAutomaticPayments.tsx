import React from  "react";
import './ViewAutomaticPayments.css'
import TopBar from "../Common/TopBar";
import SideBar from "../Common/SideBar";
import UserIcon from "../Common/UserIcon";
import { AutomaticPaymentList } from "./AutomaticPaymentList";

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
        return <div>
            <SideBar userType="user"/>
            <TopBar/>
            <UserIcon/>
            <div className="display-entities-container w-75 mr-auto ml-auto bg-white automatic-payments-list">
                <h4>Your payments:</h4>
                <AutomaticPaymentList reload = {this.state.reload} changeReloading={this.changeReloadingAutomaticPaymentsList}/>
            </div>
        </div>
    }
}

export {ViewAutomaticPayments};