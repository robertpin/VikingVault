import React from "react";
import SideBar from '../Common/SideBar'
import TopBar from '../Common/TopBar'
import '../Common/styles.css';
import './DisplayUsers.css';
import "../Common/styles.css";
import { constants } from "../Resources/Constants";
import { UserData }  from './UserData';
import { IUserData } from './UserData';
import UserIcon from "../Common/UserIcon";

const usersUrl = `${constants.baseUrl}admin/getAllUsers`;

interface IProfileData{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    cardNumber: string;
    expirationDate: string;
    errorLabel: string;
    users: IUserData[];
}

class AdminPage extends React.Component<any, IProfileData>{
    constructor(props: any) {
        super(props);
        this.state = {
            id: 0,
            firstName: "no-data",
            lastName: "no-data",
            email: "no-data",
            cardNumber: "no-data",
            expirationDate: "no-data",
            errorLabel: "no-data",
            users: []
        }
    }

    getAllUsers = () => {
        var token = sessionStorage.getItem("Authentication-Token");
        if(token === null) {
            this.setState({
                errorLabel: "Access Token Unavailable",
            })
            return [];
        }
        else {
            this.setState({
                users: []
            });
            fetch(usersUrl, {
                method: "GET",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token' : token.toString()
                }})
            .then( response => {
                if( response.status === 500) {
                    this.setState({
                        errorLabel: "Internal Server Error"
                    });
                    return null;
                }
                return response.json();
            })
            .then( usersData => {
                if(usersData === null) {
                    return;
                }
                this.setState({
                    users: usersData
                });
            })
            .catch( error => this.setState({ errorLabel: "Something went wrong" }));
        }
    }

    private deleteUserFromComponent = (email : string) =>{
        let userList = this.state.users.filter(user => {
            return user.email !== email
        });
        this.setState({
            users : userList
        });
    }

    componentDidMount() {
        this.getAllUsers();
    }

    render(){
        return (
            <div className = "page-background">
                <SideBar userType="admin"/>
                <TopBar/>
                <UserIcon/>
                <div className = "feature-container w-75 mr-auto ml-auto bg-white">
                    { this.state.users.map( (user) => 
                        <UserData user = {user} 
                            key = {user.id} 
                            deleteUserFromComponent = {this.deleteUserFromComponent}
                            reloadUsers={this.getAllUsers}
                        />)
                    }
                </div>
            </div>
        );   
    }
}

export { AdminPage };
