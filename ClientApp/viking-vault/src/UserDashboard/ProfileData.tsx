import * as React from "react";
import './ProfileData.css';
import { Redirect } from 'react-router-dom';
import { IUser } from "./ProfilePage";

const LOGIN_ROUTE ="/login";

interface IProfileDataState {
    redirect: boolean;
}

class ProfileData extends React.Component<IUser, IProfileDataState> 
{
    state = {
        redirect: false
    }

    componentDidMount() {
        this.setState({
            redirect: sessionStorage.getItem("Authentication-Token")===null
        })
    }

    render()
    {   
        return( 
            <div className = "ProfileDataContainer html" >
                { this.state.redirect? <Redirect to = { LOGIN_ROUTE } /> : null} 
                <div className = "ProfileDataMainInfo">
                    <span className = "ProfileDataName"> 
                        {this.props.firstName} {this.props.lastName} <br /> 
                    </span>           
                    {this.props.address}
                    <hr />
                </div>
                
                <div className = "ProfileDataSecondaryInfo" >
                    Email: {this.props.email} <br/>
                    First Name: {this.props.firstName} <br />  
                    Last Name:  {this.props.lastName} <br />
                    Address:  {this.props.address} <br />
                    CNP:  {this.props.cnp} <br />
                </div>
            </div>
        ); 
    }
}

export {ProfileData}
