import React from "react";
import '../components/styles.css';
import './DisplayUsers.css';
import DefaultProfilePicture from '../UI/user2.png';
import CardImg from '../UI/GENERICcard-01.png';
import { constants } from "../ConstantVariables";
import { AttachCardForm } from "../AttachCardModal";

export interface IUserData{
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    pictureLink: string;
    cardNumber: string;
    expirationDate: string;
    openAttachCardModal: boolean
}

const defaultUser = {
    id: 0,
    firstName: "no-data",
    lastName: "no-data",
    address: "no-data",
    email: "no-data",
    pictureLink: "",
    cardNumber: "no-data",
    expirationDate: "no-data",
    openAttachCardModal: false, 
};

class UserData extends React.Component<IUserData, IUserData>{
    
    constructor(props: IUserData)
    {
        super(props);

        if(props !== null)
        {
            this.state = {
                id: props.id,
                firstName: props.firstName,
                lastName: props.lastName,
                address: props.address,
                email: props.email,
                pictureLink: props.pictureLink,
                cardNumber: props.cardNumber,
                expirationDate: props.expirationDate,
                openAttachCardModal: false,
            };
        }
        else
        {
            this.state = {...defaultUser};
        }        
    }

    renderUserCard()
    {
        if(this.state.cardNumber !== "")
            return <div className = "card-data-style">
                        <p className = "name-on-card">{this.state.firstName} {this.state.lastName}</p>
                        <p className = "expiration-date-on-card">{this.state.expirationDate}</p>
                        <p className = "card-number-on-card">{this.state.cardNumber}</p>
                        <img src = {CardImg} className = "card-img"></img>
                   </div>        

        return null; 
    }

    openModal = () => {
        this.setState({
            openAttachCardModal: true
        });
    }

    closeModal = () => {
        this.setState({
            openAttachCardModal: false
        });
    }

    render(){
        return( 
            <div className = "user-container"> 
                <div className = "user-container-inside">
                    <div className = "img-container">
                         {this.state.pictureLink === "" ? <img src = {DefaultProfilePicture} className = "profile-img"/> : <img src = {this.state.pictureLink} className = "profile-img"/> }                 
                    </div>
                    
                    <div className = "profile-data-container">
                        <span className = "profile-data-text" id = "user-name"> {this.state.firstName} {this.state.lastName} </span>
                        <span className = "profile-data-text"> {this.state.address} </span>
                        <span className = "profile-data-text" id = "card-number"> {this.state.cardNumber} </span>
                    </div>

                    <div className = "card-container">
                        {this.renderUserCard()}  
                    </div>

                    <div className = "button-container">
                        <AttachCardForm open={this.state.openAttachCardModal} modalClose={this.closeModal} firstName={this.state.firstName} lastName={this.state.lastName} userId={this.state.id} />
                        <button className = "button-style" onClick={ this.openModal}>Attach Card</button>
                        <button className = "button-style">Delete</button>
                        <button className = "button-style">Add Money</button>
                    </div>
                </div>
            </div>           
         );   
    }
}

export { UserData };
