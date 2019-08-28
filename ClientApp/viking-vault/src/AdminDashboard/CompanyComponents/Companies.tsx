import React from  "react";
import TopBar from "../../Common/TopBar";
import SideBar from "../../Common/SideBar";
import UserIcon from "../../Common/UserIcon";
import "../DisplayUsers.css";
import "../../Common/styles.css";
import { AddCompany } from "./AddCompany";
import { CompaniesList } from "./CompaniesList";

export interface ICompaniesState {
    reload: boolean;
}

class Companies extends React.Component<any, ICompaniesState> {
    state = {
        reload: false
    }

    changeReloadingCompaniesList = (reloading: boolean) => {
        this.setState({
            reload: reloading
        });
    }

    render() {
        return <div className="page-background">
            <SideBar userType="admin"/>
            <TopBar/>
            <UserIcon/>
            <div className="feature-container w-75 mr-auto ml-auto bg-white">
                <AddCompany changeReloading={this.changeReloadingCompaniesList}/>
                <CompaniesList reload = {this.state.reload} changeReloading={this.changeReloadingCompaniesList}/>
            </div>
        </div>
    }
}

export {Companies};
