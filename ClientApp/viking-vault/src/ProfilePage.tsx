import * as React from "react";
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
                <ProfileData />
            </div>
        );
    }
}

export { ProfilePage }