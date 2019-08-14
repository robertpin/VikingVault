import React from "react";
import '../components/styles.css';
import './DisplayUsers.css';
import DefaultProfilePicture from '../UI/user2.png';
import CardImg from '../UI/GENERICcard-01.png';
import { constants } from "../ConstantVariables";
import DeleteUserModal from "./DeleteUserModal";

export interface IUserData{
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    pictureLink: string;
    cardNumber: string;
    expirationDate: string;
}

interface IUserDataProp{
    user: IUserData;
    deleteUserFromComponent: any;
}

interface IPageState{
    user: IUserData;
    openDeleteUserModal: boolean}

const defaultUser = {
    id: 0,
    firstName: "no-data",
    lastName: "no-data",
    address: "no-data",
    email: "no-data",
    pictureLink: "",
    cardNumber: "no-data",
    expirationDate: "no-data",
    openDeleteUserModal: false
};

class UserData extends React.Component<IUserDataProp, IPageState>{
    
    constructor(props: IUserDataProp)
    {
        super(props);

        if(props !== null)
        {
            this.state = {
                user : {
                    id: props.user.id,
                    firstName: props.user.firstName,
                    lastName: props.user.lastName,
                    address: props.user.address,
                    email: props.user.email,
                    pictureLink: props.user.pictureLink,
                    cardNumber: props.user.cardNumber,
                    expirationDate: props.user.expirationDate
                },
                openDeleteUserModal: false
            };
        }
        else
        {
            this.state = {
                user : {...defaultUser},
                openDeleteUserModal : false
            };
        }        
    }

    renderUserCard()
    {
        if(this.state.user.cardNumber !== "")
            return <div className = "card-data-style">
                        <p className = "name-on-card">{this.state.user.firstName} {this.state.user.lastName}</p>
                        <p className = "expiration-date-on-card">{this.state.user.expirationDate}</p>
                        <p className = "card-number-on-card">{this.state.user.cardNumber}</p>
                        <img src = {CardImg} className = "card-img"></img>
                   </div>        

        return null; 
    }

    private handleDeleteUser = () =>{
        this.setState((oldstate : any)=>({
            openDeleteUserModal : !oldstate.openDeleteUserModal
        }));
    }

    private closeDeleteUserModal = () =>{
        this.setState({
            openDeleteUserModal : false
        });
    }

    private deleteUser = () =>{
        fetch(constants.baseUrl+"user/delete", {
            method: "DELETE",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.props.user.email
            })});

        this.setState({
            openDeleteUserModal : false
        });

        this.props.deleteUserFromComponent(this.props.user.email);
    }

    render(){
        return( 
            <div className = "user-container"> 
                <div className = "user-container-inside">
                    <div className = "img-container">
                         {this.state.user.pictureLink === "" ? <img src = {DefaultProfilePicture} className = "profile-img"/> : <img src = {this.state.user.pictureLink} className = "profile-img"/> }                 
                    </div>
                    
                    <div className = "profile-data-container">
                        <span className = "profile-data-text" id = "user-name"> {this.state.user.firstName} {this.state.user.lastName} </span>
                        <span className = "profile-data-text"> {this.state.user.address} </span>
                        <span className = "profile-data-text" id = "card-number"> {this.state.user.cardNumber} </span>
                    </div>

                    <div className = "card-container">
                        {this.renderUserCard()}  
                    </div>

                    <div className = "button-container">
                        <button className = "button-style">Attach Card</button>
                        <button className = "button-style" onClick = {this.handleDeleteUser}>Delete</button>
                        <button className = "button-style">Add Money</button>
                    </div>
                </div>
                <DeleteUserModal open = {this.state.openDeleteUserModal} deletedUserName = {this.state.user.firstName +" "+ this.state.user.lastName} closeModal = {this.closeDeleteUserModal} deleteUser = {this.deleteUser}/>
            </div>             
         );   
    }
}

export { UserData };