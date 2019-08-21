import React from "react";
import {constants} from "../Resources/ConstantVariables";
import { Redirect } from "react-router-dom";
import UserPage from "../UserDashboard/UserPage";
import { AdminPage } from "../AdminDashboard/AdminPage";

interface IState {
    isAdmin: boolean | null;
}

class Dashboard extends React.Component<any, IState> {
    state = {
        isAdmin: null
    };

    private isUserAdmin() {
        let token = sessionStorage.getItem("Authentication-Token");
        if(token === null) {
            return;
        }
        return fetch(constants.baseUrl+"admin", {
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

    render() {
        return <React.Fragment>
            {sessionStorage.getItem("Authentication-Token") === null? <Redirect to="/login"/> : null}
            {this.state.isAdmin? <AdminPage/> : null}
            {this.state.isAdmin === false? <UserPage/> : null}
        </React.Fragment>
        
    }
}

export {Dashboard}
