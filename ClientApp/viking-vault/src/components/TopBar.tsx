import React from 'react'
import './styles.css'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import {variables} from "../ConstantVariables";

const baseUrl = variables.baseUrl;

interface IState {
    isAdmin: boolean;
}

class TopBar extends React.Component<any, IState>{
    constructor(props:any) {
        super(props);
        this.state = {
            isAdmin: false
        }
    }

    private checkIfUserIsAdmin = () => {
        let token = sessionStorage.getItem("Authentication-Token");
        if(token === null) {
            token = "";
        }
        fetch(baseUrl+"admin", {
            method: "POST",
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
        this.checkIfUserIsAdmin();
    }

    render(){
        return(
            <div className="top-bar">
                <Link to={this.state.isAdmin? "/admin" : "/user"}><img className="img viking-logo" src={logo} alt=''></img></Link>
            </div>
        )
    }
}

export default TopBar