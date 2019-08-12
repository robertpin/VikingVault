import * as React from "react";
import { render } from "react-dom";
import './ProfileData.css';
import { Redirect } from 'react-router-dom';
import { constants } from "./ConstantVariables";

const API_URL = constants.baseUrl+"userprofilepages";
const LOGIN_ROUTE ="/login";

interface IProfileDataState {
    firstName: string;
    lastName: string;
    address:string;
    id: string;
    email: string;
    errorLabel: string;
    redirect: boolean;
}

class ProfileData extends React.Component<any, IProfileDataState> 
{
    constructor(props: any)
    {
        super(props);

        this.state = {
            firstName: "FirstName",
            lastName: "LastName",
            address: "Address",
            id: "ID", 
            email: "Email",
            errorLabel: "no error",
            redirect: false
        }
    }
    
    componentDidMount ()
    {
        let token = sessionStorage.getItem("Authentication-Token");

        if(token === null)
        {
            this.setState({
                errorLabel: "Access Token Unavailable",
                redirect: true
            })
        }
        else{
            
            fetch(API_URL, {
                method: "GET",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token':  token.toString()
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
            .then( userData => {
                if(userData != null)
                {
                    
                    this.setState(
                        {
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            address: userData.address,
                            id: userData.cnp, 
                            email: userData.email
                        }
                    )
                }
            }).catch( error => this.setState({ errorLabel: "Something went wrong" }));
        }
    }

    render()
    {   
        return( 
            <div className = "ProfileDataContainer html" >
                { this.state.redirect? <Redirect to = { LOGIN_ROUTE } /> : null} 
                
                <div className = "ProfileDataMainInfo">

                    <span className = "ProfileDataName"> 
                        {this.state.firstName} {this.state.lastName} <br /> 
                    </span>
                    
                    {this.state.address}

                    <hr />

                </div>
                
                <div className = "ProfileDataSecondaryInfo" > 
                    First Name: {this.state.firstName} <br />  
                    Last Name:  {this.state.lastName} <br />
                    Address:  {this.state.address} <br />
                    CNP:  {this.state.id} <br />
                    Email:  {this.state.email} <br />
                </div>
            </div>
                  
        ); 
    }
}

export {ProfileData}
