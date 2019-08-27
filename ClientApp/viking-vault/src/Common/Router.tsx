import React from "react";
import { Route, BrowserRouter } from 'react-router-dom';
import { RegisterForm } from "../RegisterForm";
import { LoginForm } from "../Login";
import { ExchangeForm } from '../UserDashboard/ExchangeForm'
import "../App.css"
import { Dashboard } from "../Common/Dashboard";
import { Companies } from "../AdminDashboard/CompanyComponents/Companies";
import { WillOpenModal } from "../WillOpenModal";
import { WillOpenEditModal } from "../WillOpenEditModal";
import { Notifications } from "../UserDashboard/Notifications";

function Router(props: any) {
    return <BrowserRouter>
        <Route path="/register/" exact component={RegisterForm} />
        <Route path="/login" exact component={LoginForm} />
        <Route path="/" exact component={Dashboard}/>
        <Route path="/exchange" exact component={ExchangeForm}/>
        <Route path="/companies" exact component={Companies}/>
        <Route path="/notifications" exact component={Notifications}/>
        <Route path="/transfer" exact render={() => {return <BlockedServices><TransferFundsPage/></BlockedServices>;}}/>
        <Route path="/aaa" exact component={WillOpenModal}/>
        <Route path="/qqq" exact component={WillOpenEditModal}/>

    </BrowserRouter>;
}

export {Router}
