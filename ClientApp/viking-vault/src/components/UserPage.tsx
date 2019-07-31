import React from "react";
import SideBar from './SideBar'
import TopBar from './TopBar'
import AccountPage from './AccountPage'

function UserPage(){
 return(
    <div style = {{width : "100%", height : "100%"}}>
        <SideBar/>
        <TopBar/>
        <AccountPage/>
    </div>
 )   
}

export default UserPage;