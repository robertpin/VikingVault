import * as React from "react";
// import { render } from "react-dom";
import './ProfilePage.css';
import { ProfilePicture } from './ProfilePicture';
import { ProfileData } from './ProfileData';
import { readlink } from "fs";

const style1 = { backgroundColor: 'red'};


class ProfilePage extends React.Component<any, any>
{
    
    
    constructor(props: any)
    {
        super(props);
    }


    render ()
    {
        
        return (
            
            <div className = "ProfilePage">
                <ProfilePicture />
                <ProfileData firstName = "Radu" lastName = "Lambrino " address = "Brasov" id = "1" email = "r@yahoo.com" />
            </div>
             
        );
    }
}

export { ProfilePage }