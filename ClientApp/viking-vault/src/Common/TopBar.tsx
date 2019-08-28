import React from 'react'
import { Link } from 'react-router-dom';
import './styles.css'
import logo from '../Resources/images/logo.png'
import {constants} from "../Resources/Constants";

const baseUrl = constants.baseUrl;

interface IState {
    isAdmin: boolean;
}

class TopBar extends React.Component<any, IState>{
    state = {
        isAdmin: false
    }

    private checkIfUserIsAdmin = () => {
        let token = sessionStorage.getItem("Authentication-Token");
        if(token === null) {
            token = "";
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
            });
        });
    }

    componentDidMount() {
        this.checkIfUserIsAdmin();
    }

    render(){
        return(
            <div className="top-bar">
                <Link to="/"><img className="img viking-logo" src={logo} alt="Logo"/></Link>
            </div>
        )
    }
}

export default TopBar