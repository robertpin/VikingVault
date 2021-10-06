import * as React from "react";
import profilePicture from "../Resources/images/user2.png";
import './ProfilePicture.css';
import { constants } from "../Resources/Constants";
import UserIconAvatar from "../Common/UserIconAvatar"

const profileDataUrl = `${constants.baseUrl}userprofilepages`;

interface IProfilePicture{
    userProfilePicture: string
}

class ProfilePicture extends React.Component<any, IProfilePicture> {
    state = { userProfilePicture: profilePicture }

    getPictureLink = () => {
        const token = sessionStorage.getItem("Authentication-Token");
        if(token!==null){
            fetch(profileDataUrl, {
                method: "GET",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token':  token.toString()
                }})
            .then( response => {
                    if( response.status === 500){
                        return null;
                    }                    
                    return response.json();
                })
            .then( userData => {
                 this.setState({
                    userProfilePicture: userData.pictureLink
                });
            });
        }
    }

    componentDidMount(){
        this.getPictureLink();
    }

    reloadPicture = () => {
        this.getPictureLink();
        this.props.stopReload();
    }

    render(){
        return (
            <div className = "profile-picture-container">
                {this.props.reload? this.reloadPicture() : null}
                <UserIconAvatar pictureUri={this.state.userProfilePicture} pictureStyle="profile-picture" defaultPicture={profilePicture} />
            </div>
        );
    }
}

export { ProfilePicture }