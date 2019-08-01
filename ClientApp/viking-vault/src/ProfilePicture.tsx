import * as React from "react";
import profilePicture from "./UI/user2.png";
import './ProfilePicture.css';

class ProfilePicture extends React.Component<any, any> 
{
    render()
    {
        return (
            <div className = "ProfilePictureContainer">
                <img src = {profilePicture} alt = "Profile Picture To Be Loaded" id = "ProfilePicture" />
            </div>
        );
    }
}

export { ProfilePicture }