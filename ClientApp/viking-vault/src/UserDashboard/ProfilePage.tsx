import * as React from "react";
import './ProfilePage.css';
import { ProfilePicture } from './ProfilePicture';
import { ProfileData } from './ProfileData';
import "../Common/styles.css";

function ProfilePage(props: any) {
    return (
        <div className="page-background">
            <div className = "feature-container w-75 bg-white mr-auto ml-auto">
                <div className="profile-page">
                    <ProfilePicture />
                    <ProfileData />
                </div>
            </div>
        </div>
    );
}

export { ProfilePage }