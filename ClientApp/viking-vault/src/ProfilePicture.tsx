import * as React from "react";
import profilePicture from "./UI/user2.png";
import './ProfilePicture.css';
import { constants } from "./ConstantVariables";

const API_URL = `${constants.baseUrl}userprofilepages`;

interface IProfilePicture{
    userProfilePicture: string
}

class ProfilePicture extends React.Component<any, IProfilePicture> 
{
    constructor(props: any){
        super(props)
        this.state = {
            userProfilePicture: profilePicture
        }
    }

    componentDidMount(){
        let token = sessionStorage.getItem("Authentication-Token");
        if(token!==null){
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
                        return null;
                    }                    
                    return response.json();
                })
            .then( userData => {
                if(userData != null)
                {
                    this.setState(
                    {
                        userProfilePicture: userData.pictureLink
                    })
                }
            });
        }
}
    render()
    {
        return (
            <div className = "ProfilePictureContainer">
                <img src = {this.state.userProfilePicture} alt = "Profile Picture To Be Loaded" id = "ProfilePicture" />
            </div>
        );
    }
}

export { ProfilePicture }