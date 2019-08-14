import React from "react";
import '../components/styles.css';
import './DisplayUsers.css';
import DefaultProfilePicture from '../UI/user2.png';
import CardImg from '../UI/GENERICcard-01.png';
import { constants } from "../ConstantVariables";
import AddMoneyModal from "./AddMoneyModal";
import ResponseModal from "./ResponseModal";


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
    openDeleteUserModal: boolean;
    openAddMoneyFormModal : boolean;
    openAddMoneyResponseModal: boolean;
    addMoneyResponseMessage: string
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
                openDeleteUserModal: false,
                openAddMoneyFormModal : false,
                openAddMoneyResponseModal: false,
                addMoneyResponseMessage: ""
            };
        }
        else
        {
            this.state = {
                        user : {...defaultUser},
                        openDeleteUserModal : false,
                        openAddMoneyFormModal : false,
                        openAddMoneyResponseModal: false,
                        addMoneyResponseMessage: ""
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
    
    private handleAddMoney = () =>{
        this.setState((oldstate : any)=>({
            openAddMoneyFormModal : !oldstate.openAddMoneyFormModal
        }));
    }

    private closeAddMoneyFormModal = () =>{
        this.setState({
            openAddMoneyFormModal : false
        });
    }

    private closeAddMoneyResponseModal = () =>{
        this.setState({
            openAddMoneyResponseModal : false,
        });
    }

    private openResponseModalWithMessage = (message : string) =>{
        this.setState({
            openAddMoneyResponseModal : true,
            addMoneyResponseMessage : message
        });
    }

    private addMoney = (amount : Number) =>{
        this.setState({
            openAddMoneyFormModal : false
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
                        <span className = "profile-data-text" id = "user-name"> {this.state.user.firstName} {this.state.user.lastName} </span>
                        <span className = "profile-data-text"> {this.state.user.address} </span>
                        <span className = "profile-data-text" id = "card-number"> {this.state.user.cardNumber} </span>
                    </div>

                    <div className = "card-container">
                        {this.renderUserCard()}  
                    </div>

                    <div className = "button-container">
                        <button className = "button-style">Attach Card</button>
                        <button className = "button-style">Delete</button>
                        <button className = "button-style" onClick = {this.handleAddMoney}>Add Money</button>
                    </div>
                </div>
                <AddMoneyModal open = {this.state.openAddMoneyFormModal} userName = {this.state.user.firstName + " " + this.state.user.lastName} closeModal = {this.closeAddMoneyFormModal} addMoney = {this.addMoney}/>
                <ResponseModal open = {this.state.openAddMoneyResponseModal}  closeModal = {this.closeAddMoneyResponseModal} message = {this.state.addMoneyResponseMessage}/>
            </div>             
         );   
    }
}

export { UserData };
