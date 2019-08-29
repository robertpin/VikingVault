import React from  "react";
import './ViewAutomaticPayments.css'
import TopBar from "../Common/TopBar";
import SideBar from "../Common/SideBar";
import UserIcon from "../Common/UserIcon";
import { AutomaticPaymentList } from "./AutomaticPaymentList";
import "../Common/styles.css";

class ViewAutomaticPayments extends React.Component<any, any> {
    render() {
        return <div className="page-background">
            <SideBar userType="user"/>
            <TopBar/>
            <UserIcon/>
            <div className="feature-container mr-auto ml-auto w-75 bg-white">
                <div>
                    <div className="p-4">
                        <h4 className="payments-header">My payments</h4>
                        <AutomaticPaymentList/>
                    </div>
                </div>
            </div>
        </div>
    }
}

export {ViewAutomaticPayments};