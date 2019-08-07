import React from "react";
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import '../components/styles.css';
import './DisplayUsers.css';
import SourceImg from '../UI/user2.png';
import CardImg from '../UI/card-internship.png';

class AdminPage extends React.Component<any, any>{
 
    render(){
        return(
            <div className = "admin-page">
                <TopBar/>
                <SideBar/>  
                <div className = "display-users-container">
                   
                    <div className = "user-container"> 
                       <div className = "user-container-inside">
                            
                            <div className = "img-container">
                                <img src = {SourceImg} className = "profile-img"/>
                            </div>
                            
                            <div className = "profile-data-container">
                                <span className = "profile-data-text" id = "user_name"> Radu Lambrino</span>
                                <span className = "profile-data-text">Brasov, Brasov</span>
                                <span className = "profile-data-text" id = "card_number">0000-0000-0000-0000</span>
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
                </div>
            </div>
         );   
    }
 
}

export { AdminPage };
