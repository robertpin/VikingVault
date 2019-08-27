import React from "react";
import SideBar from '../Common/SideBar'
import TopBar from '../Common/TopBar'
import '../Common/styles.css';
import './DisplayUsers.css';
import { constants } from "../Resources/Constants";
import { UserData }  from './UserData';
import { IUserData } from './UserData';
import UserIcon from "../Common/UserIcon";

const API_URL = `${constants.baseUrl}admin/getAllUsers`;

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
    
    constructor(props: any)
    {
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

    getAllUsers ()
    {
        var users;
        var token = sessionStorage.getItem("Authentication-Token");
        
        if(token === null)
        {
            this.setState({
                errorLabel: "Access Token Unavailable",
            })

            return [];
        }

        else{
            fetch(API_URL, {
                method: "GET",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token' : token.toString()
                }})
            .then( response => 
                {
                    if( response.status === 500)
                    {
                        this.setState({
                            errorLabel: "Internal Server Error"
                        })

                        return null;
                    }
                    
                    return response.json();
                })
            .then( usersData => {
                this.setState({
                    users: usersData
                })
            })
            .catch( error => this.setState({ errorLabel: "Something went wrong" }));

            return users;
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

    componentDidMount()
    {
        this.getAllUsers();
    }

    render(){
        return(
            <div className = "admin-page">
                <SideBar userType="admin"/>
                <TopBar/>
                <UserIcon/>
                <div className = "display-users-container">
                     { this.state.users.map( (user) => <UserData user = {user} key = {user.id} deleteUserFromComponent = {this.deleteUserFromComponent}/>) }
                </div>
            </div>
         );   
    }
}

export { AdminPage };
