import React from "react";
import { Route, Redirect, BrowserRouter as BRouter } from 'react-router-dom';
import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./Login";
import UserPage from './components/UserPage';
import {constants} from "./ConstantVariables";
import "./App.css"
import { TransferFundsPage } from "./TransferFunds/TransferFundsPage";

const baseUrl = constants.baseUrl;

interface IState {
    isAdmin: boolean;
}

class Router extends React.Component<any, IState> {
    state = {
        isAdmin: false
    }

    private isUserAdmin() {
        let token = sessionStorage.getItem("Authentication-Token");
        if(token === null) {
            return;
        }
        fetch(baseUrl+"admin", {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token' : token.toString()
            }
        }).then(response => response.json())
        .then(result => {
            this.setState({
                isAdmin: result
            })
        });
    }

    componentDidMount() {
        this.isUserAdmin();
    }

    private makeRedirect() {
        if(sessionStorage.getItem("Authentication-Token") === null)
            return <Redirect to="/login" />;
        else
            return <Redirect to={this.state.isAdmin? "/admin" : "/user"} />;
    }

    render() {
        return <BRouter>
            <Route path="/register/" exact component={RegisterForm} />
            <Route path="/login" exact component={LoginForm} />
            <Route path="/" exact render={() => this.makeRedirect()}/>
            <Route path="/user" component={UserPage} />
            <Route path="/TransferFunds" component = {TransferFundsPage}/>
        </BRouter>
    }
}

export {Router}