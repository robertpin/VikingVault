import React from  "react";
import TopBar from "../../Common/TopBar";
import SideBar from "../../Common/SideBar";
import UserIcon from "../../Common/UserIcon";
import "../DisplayUsers.css";
import { AddCompany } from "./AddCompany";

function Companies () {
    return <div className="admin-page">
        <SideBar userType="admin"/>
        <TopBar/>
        <UserIcon/>
        <div className="display-entities-container w-75 mr-auto ml-auto bg-white">
            <AddCompany/>
        </div>
    </div>
}

export {Companies};
