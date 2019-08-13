import React from "react";
import { Route, Redirect, BrowserRouter as BRouter } from 'react-router-dom';
import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./Login";
import { ExchangeForm } from './ExchangeForm'
import UserPage from './components/UserPage';
import {constants} from "./ConstantVariables";
import "./App.css"
import { AdminPage } from "./display_user_list/AdminPage";

const baseUrl = constants.baseUrl;

interface IState {
    isAdmin: boolean | null;
}

class Router extends React.Component<any, IState> {
    state = {
        isAdmin: null
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
        else {
            if(this.state.isAdmin === null) {
                setTimeout(() =>{
                    return <Redirect to={this.state.isAdmin? "/admin" : "/user"} />;
                }, 100);
            }
            else return <Redirect to={this.state.isAdmin? "/admin" : "/user"} />;
        }
    }

    private makeAdminRedirect()
    {
        if(this.state.isAdmin === null)
        {
            setTimeout(() => {
                if(this.state.isAdmin)
                    return <AdminPage/>;
                else return <Redirect to = "/login" />
            },200);
        }

        if(this.state.isAdmin)
            return <AdminPage />
        
        return <Redirect to="/login" />
    }

    render() {
        return <BRouter>
            <Route path="/register/" exact component={RegisterForm} />
            <Route path="/login" exact component={LoginForm} />
            <Route path="/" exact render={() => this.makeRedirect()}/>
            <Route path="/user" exact component={UserPage} />
            <Route path="/user/exchange" exact component={ExchangeForm}/>
            <Route path="/admin" render = { () => this.makeAdminRedirect()} />
        </BRouter>
    }
}

export {Router}