import * as React from "react";
import './ProfilePage.css';
import { ProfilePicture } from './ProfilePicture';
import { ProfileData } from './ProfileData';
import "../Common/styles.css";
import { constants } from "../Resources/Constants";

const profileDataUrl = `${constants.baseUrl}userprofilepages`;
const updateProfileUrl = `${constants.baseUrl}user`;

export interface IUser{
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    cnp: string;
    pictureLink: string;
    [key: string]: string;
}

interface IProfileState {
    currentUser: IUser;
    updatedUser: IUser;
    showEdit: boolean;
    reloadPicture: boolean;
}

class ProfilePage extends React.Component<any, IProfileState> {
    constructor(props:any){
        super(props);
        this.state = {
            currentUser: {
                email: "",
                firstName: "",
                lastName: "",
                address: "",
                cnp: "",
                pictureLink: ""
            },
            updatedUser: {
                email: "",
                firstName: "",
                lastName: "",
                address: "",
                cnp: "",
                pictureLink: ""
            },
            showEdit: false,
            reloadPicture: false
        }
    }
    

    getData = () => {
        let token = sessionStorage.getItem("Authentication-Token");
        if(token === null) {
            return;
        }
        fetch(profileDataUrl, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token':  token.toString()
        }})
        .then( response => {
                    if( response.status === 500)
                    {
                        

                        return null;
                    }
                    
                    return response.json();
        })
        .then( userData => {
                if(userData != null) {
                    this.setState({
                        currentUser: {
                            email: userData.email,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            address: userData.address,
                            cnp: userData.cnp,
                            pictureLink: userData.pictureLink
                        },
                        updatedUser: {
                            email: userData.email,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            address: userData.address,
                            cnp: userData.cnp,
                            pictureLink: userData.pictureLink
                        }
                    })
                }
            });
    }

    private handleChange = (inputValue: string, inputName: string) => {
        this.setState({
            updatedUser: {
                ...this.state.updatedUser,
                [inputName]: inputValue
            }
        })
    }

    componentDidMount() {
        this.getData();
    }

    updateProfileData = () => {
        let token = sessionStorage.getItem("Authentication-Token");
        if(token === null) {
            return;
        }
        fetch(updateProfileUrl, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token':  token
            },
            body: JSON.stringify(this.state.updatedUser)
        })
        .then( response => {
            if( response.status === 500) {
                return null;
            }
            return response.json();
        })
        .then( userData => {
                if(userData != null) {
                    this.setState({
                        currentUser: {
                            email: userData.email,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            address: userData.address,
                            cnp: userData.cnp,
                            pictureLink: userData.pictureLink
                        },
                        updatedUser: {
                            email: userData.email,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            address: userData.address,
                            cnp: userData.cnp,
                            pictureLink: userData.pictureLink
                        },
                        reloadPicture: true
                    })
                }
            });
    }

    stopReload = () => {
        this.setState({
            reloadPicture: false
        });
    }

    handleEditClick = () => {
        this.setState((oldState: IProfileState) => {
            return {
                showEdit: !oldState.showEdit
            }
        })
    }

    render() {
        return (
            <div className="page-background">
                <div className = { "feature-container w-75 bg-white mr-auto ml-auto " + (this.state.showEdit? "view-edit-container" : "view-profile-container")} >
                    <div className={"profile-page " + (this.state.showEdit? "profile-page-center" : "")}>
                        <ProfilePicture reload={this.state.reloadPicture} stopReload={this.stopReload}/>
                        <ProfileData {...this.state.currentUser}/>
                    </div>
                    
                    <div className="edit-container">
                        <div className="text-center d-block">
                            <button className={"btn btn-primary " + (this.state.showEdit? "" : "edit-button")} onClick={this.handleEditClick}>Edit profile</button>
                        </div>
                        <div className={this.state.showEdit? "": "d-none"}>
                            <br/>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" value={this.state.updatedUser.firstName} onChange={(e) => this.handleChange(e.target.value, "firstName")} required className="form-control accent-color"></input>
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" value={this.state.updatedUser.lastName} onChange={(e) => this.handleChange(e.target.value, "lastName")} required className="form-control accent-color"></input>
                            </div>
                            <div className="form-group">
                                <label>Picture Link</label>
                                <input type="text" value={this.state.updatedUser.pictureLink} onChange={(e) => this.handleChange(e.target.value, "pictureLink")} className="form-control accent-color"></input>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" value={this.state.updatedUser.address} onChange={(e) => this.handleChange(e.target.value, "address")} required className="form-control accent-color"></input>
                            </div>
                            <div className="form-group">
                                <label>ID (CNP)</label>
                                <input type="text" value={this.state.updatedUser.cnp} onChange={(e) => this.handleChange(e.target.value, "cnp")} required className="form-control accent-color"></input>
                            </div>
                            <button onClick={this.updateProfileData} className="btn btn-primary">Update Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { ProfilePage }