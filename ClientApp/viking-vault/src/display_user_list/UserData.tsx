import React from "react";
import '../components/styles.css';
import './DisplayUsers.css';
import DefaultProfilePicture from '../UI/user2.png';
import CardImg from '../UI/GENERICcard-01.png';
import { constants } from "../ConstantVariables";
import AddMoneyModal from "./AddMoneyModal";
import ResponseModal from "./ResponseModal";
import DeleteUserModal from "./DeleteUserModal";
import { AttachCardForm } from "../AttachCardModal";
import { emptyStatement } from "@babel/types";

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
    deleteUserFromComponent: (email: string) => void;
}

interface IPageState{
    user: IUserData;
    modals: IModals;
    addMoneyResponseMessage: string
}

interface IModals {
    openDeleteUserModal: boolean;
    openAddMoneyFormModal : boolean;
    openAddMoneyResponseModal: boolean;
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
    openDeleteUserModal: false,
    openAttachCardModal: false, 
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
                modals : {
                    openDeleteUserModal: false,
                    openAddMoneyFormModal : false,
                    openAddMoneyResponseModal: false,
                    openAttachCardModal: false,
                },
                addMoneyResponseMessage: "",
            };
        }
        else
        {
            this.state = {
                        user : {...defaultUser},
                        modals : {
                            openDeleteUserModal: false,
                            openAddMoneyFormModal : false,
                            openAddMoneyResponseModal: false,
                            openAttachCardModal: false,
                        },
                        addMoneyResponseMessage: "",
                    };
        }        
    }

    splitCardNumber(begin: number, end: number){
        return this.state.user.cardNumber.substring(begin, end);
    }

    formatCardNumber(cardNumber: string)
    {
        return <span>{this.splitCardNumber(0,4)}  {this.splitCardNumber(4,8)}   {this.splitCardNumber(8,12)}   {this.splitCardNumber(12,16)}</span>;
    }

    renderUserCard()
    {
        if(this.state.user.cardNumber !== "")
            return <div className = "card-data-style">
                        <img src = {CardImg} className = "card-img"></img>
                        <p className = "name-on-card">{this.state.user.firstName} {this.state.user.lastName}</p>
                        <p className = "expiration-date-on-card">{this.state.user.expirationDate}</p>
                        <p className = "card-number-on-card">{this.formatCardNumber(this.state.user.cardNumber)}</p>
                   </div>;
        return null; 
    }
    
    private handleAddMoney = () =>{
        this.setState((oldstate : IPageState)=>({
            modals: {
                ...this.state.modals,
                openAddMoneyFormModal : !oldstate.modals.openAddMoneyFormModal
            }
        }));
    }

    private closeAddMoneyFormModal = () =>{
        this.setState({
            modals: {
                ...this.state.modals,
                openAddMoneyFormModal : false
            }
        });
    }

    private closeAddMoneyResponseModal = () =>{
        this.setState({
            modals: {
                ...this.state.modals,
                openAddMoneyResponseModal : false
            }
        });
    }

    private openResponseModalWithMessage = (message : string) =>{
        this.setState({
            modals: {
                ...this.state.modals,
                openAddMoneyResponseModal : true
            },
            addMoneyResponseMessage : message
        });
    }

    private addMoney = (amount : Number) =>{
        this.setState({
            modals: {
                ...this.state.modals,
                openAddMoneyFormModal : false
            }
        });
        fetch(constants.baseUrl+"bankAccount", {
            method: "PUT",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              CurrencyType: "Ron",
              Amount: amount,
              Email: this.state.user.email
            })}).then(response => {
                if(response.status === 200) {
                    this.openResponseModalWithMessage("Added RON "+amount+" to "+this.state.user.firstName + " "+this.state.user.lastName+" account!");
                }
                
                if(response.status !== 200) {
                    this.openResponseModalWithMessage("Something wrong happened. Try again later!");
                }
            }).catch(err => {
                this.openResponseModalWithMessage(err.toString());
            });
        }


    private handleDeleteUser = () => this.setState({
         modals: {
            ...this.state.modals,
            openDeleteUserModal : true,
            }
        });

    private closeDeleteUserModal = () => this.setState({
        modals: {
            ...this.state.modals,
             openDeleteUserModal : false, 
            }
        });

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
            modals: {
                ...this.state.modals,
                openDeleteUserModal : false,
            }
        });

        this.props.deleteUserFromComponent(this.props.user.email);
    }

    handleAttachCard = () => {
        this.setState({
            modals: {
                ...this.state.modals,
                openAttachCardModal: true,
            }
        });
    }

    closeAttachCardModal = () => {
        this.setState({
            modals: {
                ...this.state.modals,
                openAttachCardModal: false,
            }
        });
    }

    render(){
        return( 
            <div className = "user-container"> 
                <div className = "user-container-inside">
                    <div className = "img-container">
                         {this.state.user.pictureLink === "" ? <img src = {DefaultProfilePicture} className = "profile-img"/> : <img src = {this.state.user.pictureLink} className = "profile-img"/> }                 
                    </div>
                    
                    <div className = "profile-data-container">
                        <span className = "profile-data-text user-name"> {this.state.user.firstName} {this.state.user.lastName} </span>
                        <span className = "profile-data-text"> {this.state.user.address} </span>
                        <span className = "profile-data-text card-number"> {this.formatCardNumber(this.state.user.cardNumber)} </span>
                    </div>

                    <div className = "card-container-admin-display">
                        {this.renderUserCard()}
                    </div>

                    <div className = "button-container">
                        <AttachCardForm open={this.state.modals.openAttachCardModal} onModalClose={this.closeAttachCardModal} firstName={this.state.user.firstName} lastName={this.state.user.lastName} userId={this.state.user.id} />
                        <button className = "button-style" onClick={ this.handleAttachCard}>Attach Card</button>
                        <button className = "button-style" onClick = {this.handleDeleteUser}>Delete</button>
                        <button className = "button-style" onClick = {this.handleAddMoney}>Add Money</button>
                    </div>
                </div>
                <AddMoneyModal open = {this.state.modals.openAddMoneyFormModal} userName = {this.state.user.firstName + " " + this.state.user.lastName} closeModal = {this.closeAddMoneyFormModal} addMoney = {this.addMoney}/>
                <ResponseModal open = {this.state.modals.openAddMoneyResponseModal}  closeModal = {this.closeAddMoneyResponseModal} message = {this.state.addMoneyResponseMessage}/>
                <DeleteUserModal open = {this.state.modals.openDeleteUserModal} deletedUserName = {this.state.user.firstName +" "+ this.state.user.lastName} closeModal = {this.closeDeleteUserModal} deleteUser = {this.deleteUser}/>
            </div>             
         );   
    }
}

export { UserData };