import React from "react";
import SideBar from './SideBar'
import TopBar from './TopBar'
import AccountPage from './AccountPage'
import UserIcon from './UserIcon';

interface IUserPageState {
    type:boolean;
}
class UserPage extends React.Component<any, IUserPageState>{
    constructor(props:any){
        super(props)

        this.state = {
            type: true
        } 
        this.callbackFunction = this.callbackFunction.bind(this);
    }

    callbackFunction = (childData: boolean) =>{
        this.setState({type: childData});
    }

    render(){
        return(
            <div className="user-page">
                <SideBar/>
                <TopBar/>
                <UserIcon className="u-icon" parentCallBack = {this.callbackFunction} />
                {this.state.type ?  <AccountPage /> : <div></div>}
            </div>
         )   
    }
 
}

export default UserPage;
