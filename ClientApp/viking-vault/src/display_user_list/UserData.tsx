import React from "react";
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import '../components/styles.css';
import './DisplayUsers.css';
import SourceImg from '../UI/user2.png';
import CardImg from '../UI/card-internship.png';
import { string, number } from "prop-types";
import { ninvoke } from "q";
import { constants } from "../ConstantVariables";
export * from "./UserData";

const API_URL = constants.baseUrl+"admin/getAllUsers";
const LOGIN_ROUTE ="/login";

interface IUserData{
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    cardNumber: string;
    expirationDate: string;
}

class UserData extends React.Component<IUserData, IUserData>{
    
    constructor(props: IUserData)
    {
        super(props);

        if(props != null)
        {
            this.state = {
                id: props.id,
                firstName: props.firstName,
                lastName: props.lastName,
                address: props.address,
                email: props.email,
                cardNumber: props.cardNumber,
                expirationDate: props.expirationDate
            };
        }
        else
        {
            this.state = {
                id: 0,
                firstName: "no-data",
                lastName: "no-data",
                address: "no-data",
                email: "no-data",
                cardNumber: "no-data",
                expirationDate: "no-data"
            };
        }        
    }


    render(){
        return(
         
            <div className = "user-container"> 
                <div className = "user-container-inside">
                    
                    <div className = "img-container">
                        <img src = {SourceImg} className = "profile-img"/>
                    </div>
                    
                    <div className = "profile-data-container">
                        <span className = "profile-data-text" id = "user_name"> {this.state.firstName} {this.state.lastName} </span>
                        <span className = "profile-data-text"> {this.state.address} </span>
                        <span className = "profile-data-text" id = "card_number"> {this.state.cardNumber} </span>
                    </div>

                    <div className = "card-container">
                        <img src = {CardImg} className = "card-img"></img>
                    </div>

                    <div className = "button-container">
                        <button className = "button-style">Attach Card</button>
                        <button className = "button-style">Delete</button>
                        <button className = "button-style">Add Money</button>
                    </div>

                </div>
            </div>           
         );   
    }
}


