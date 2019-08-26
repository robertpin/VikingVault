import React from "react";
import { Route, BrowserRouter } from 'react-router-dom';
import { RegisterForm } from "../RegisterForm";
import { LoginForm } from "../Login";
import { ExchangeForm } from '../UserDashboard/ExchangeForm'
import "../App.css"
import { Dashboard } from "../Common/Dashboard";
import { Companies } from "../AdminDashboard/CompanyComponents/Companies";
import { TransferFundsPage } from "../TransferFunds/TransferFundsPage";
import { ViewAutomaticPayments } from "../UserDashboard/ViewAutomaticPayments";
import { BlockedServices } from "../UserDashboard/BlockedServices";
import { Notifications } from "../UserDashboard/Notifications";

function Router(props: any) {
    return <BrowserRouter>
        <Route path="/register/" exact component={RegisterForm} />
        <Route path="/login" exact component={LoginForm} />
        <Route path="/" exact component={Dashboard}/>
        <Route path="/automatic-debit" exact component={ViewAutomaticPayments}/>
        <Route path="/exchange" exact component={ExchangeForm}/>
        <Route path="/exchange" exact render={() => {return <BlockedServices><ExchangeForm/></BlockedServices>;}}/>
        <Route path="/companies" exact component={Companies}/>
        <Route path="/notifications" exact component={Notifications}/>
        <Route path="/transfer" exact render={() => {return <BlockedServices><TransferFundsPage/></BlockedServices>;}}/>
    </BrowserRouter>;
}

export {Router}