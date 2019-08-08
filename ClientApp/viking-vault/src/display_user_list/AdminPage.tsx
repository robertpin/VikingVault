import React from "react";
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import '../components/styles.css';
import './DisplayUsers.css';
import { constants } from "../ConstantVariables";
import { UserData }  from './UserData';
import { IUserData } from './UserData';


const API_URL = constants.baseUrl+"admin/getAllUsers";
const LOGIN_ROUTE ="/login";

interface IProfileData{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    cardNumber: string;
    expirationDate: string;
    errorLabel: string;
    redirect: boolean;
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
            redirect: true
        }
    }

    getAllUsers ()
    {
        /** 1) verify if we have admin token
         *  2) if yes, go ahead and get the data, else redirect to login 
         *  3) show the data 
         */
        
        let token = sessionStorage.getItem("Authentication-Token");

        if(token === null)
        {
            this.setState({
                errorLabel: "Access Token Unavailable",
                redirect: true
            })
        }
        else{
            //this is the fetch only for getting the data
            fetch(API_URL, {
                method: "GET",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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

                if(usersData != null)
                {
                   usersData.map( (user: IUserData) => <UserData {...user} /> );
                }
                
                return null;

            }).catch( error => this.setState({ errorLabel: "Something went wrong" }));
        }
    }

    render(){
        var users = this.getAllUsers();
        
        return(
            <div className = "admin-page">
                <TopBar/>
                <SideBar/>  
                <div className = "display-users-container">
                    {users !== null ? users : 'No Users'};
                </div>
            </div>
         );   
    }
 
}

export { AdminPage };
