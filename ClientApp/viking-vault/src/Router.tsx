import React from "react";
import { Route, BrowserRouter } from 'react-router-dom';
import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./Login";
import { ExchangeForm } from './ExchangeForm'
import "./App.css"
import { Dashboard } from "./Dashboard";

class Router extends React.Component<any, any> {

    render() {
        return <BrowserRouter>
            <Route path="/register/" exact component={RegisterForm} />
            <Route path="/login" exact component={LoginForm} />
            <Route path="/" exact component={Dashboard}/>
            <Route path="/exchange" exact component={ExchangeForm}/>
        </BrowserRouter>
    }
}

export {Router}