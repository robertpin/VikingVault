import React from "react";
import SideBar from '../Resources/Components/SideBar'
import TopBar from '../Resources/Components/TopBar'
import AccountPage from './AccountPage'
import UserIcon from '../Resources/Components/UserIcon';
import { ProfilePage } from "./ProfilePage";
import { TransactionList } from "./TransactionList";

interface IUserPageState {
    viewProfile:boolean;
}

class UserPage extends React.Component<any, IUserPageState>{
    constructor(props:any){
        super(props)

        this.state = {
            viewProfile: true
        } 
        this.callbackFunction = this.callbackFunction.bind(this);
    }

    callbackFunction = (viewProfileValue: boolean) =>{
        this.setState({viewProfile: viewProfileValue});
    }

    render(){
        return(
            <div className="user-page">
                <SideBar/>
                <TopBar/>
                <UserIcon className="u-icon" parentCallBack = {this.callbackFunction} />
                {this.state.viewProfile ?  <AccountPage /> : <ProfilePage/>}
            </div>
         )   
    }
}

export default UserPage;
