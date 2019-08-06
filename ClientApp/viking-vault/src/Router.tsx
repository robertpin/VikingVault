import React from "react";
import { Route, Redirect, BrowserRouter as BRouter } from 'react-router-dom';
import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./Login";
import UserPage from './components/UserPage';
import {constants} from "./ConstantVariables";
import "./App.css"

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
            if(result === true) {
                this.setState({
                    isAdmin: true
                })
            }
            else {
                this.setState({
                    isAdmin: false
                })
            }
        });
    }

    componentDidMount() {
        this.isUserAdmin();
    }

    render() {
        return <BRouter>
            <Route path="/register/" exact component={RegisterForm} />
            <Route path="/login" exact component={LoginForm} />
            <Route path="/" exact render={() => {
                if(sessionStorage.getItem("Authentication-Token") === null)
                    return <Redirect to="/login" />;
                else
                    return <Redirect to={this.state.isAdmin? "/admin" : "/user"} />;
            }}/>
            <Route path="/user" component={UserPage} />
        </BRouter>
    }
}

export {Router}