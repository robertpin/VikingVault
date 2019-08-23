import React from "react";
import {constants} from "../Resources/Constants";
import SideBar from "../Common/SideBar";
import TopBar from "../Common/TopBar";
import UserIcon from "../Common/UserIcon";
import "../Common/styles.css";

interface IBlockedServicesState {
    userHasCard: boolean | null;
    isCardBlocked: boolean | null;
}

class BlockedServices extends React.Component<any, IBlockedServicesState> {
    constructor(props: any) {
        super(props);
        this.state = {
            userHasCard: null,
            isCardBlocked: null
        }
    }

    componentDidMount() {
        this.checkUserHasCard();
        this.checkCardIsBlocked();
    }

    checkUserHasCard = () => {
        const token = sessionStorage.getItem("Authentication-Token");
        if(token === null) {
            return;
        }
        fetch(constants.baseUrl+"card", {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': token
            }
        }).then(response => {
            if(response.status !== 200) {
                return null;
            }
            return response.json();
        }).then(result => {
            if(result === null) {
                return;
            }
            this.setState({
                userHasCard: result
            });
        });
    }

    checkCardIsBlocked = () => {
        const token = sessionStorage.getItem("Authentication-Token");
        if(token === null) {
            return;
        }
        fetch(constants.baseUrl+"blockedcard", {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': token
            }
        }).then(response => {
            if(response.status !== 200) {
                return null;
            }
            return response.json();
        }).then(result => {
            if(result === null) {
                return;
            }
            console.log(result);
            this.setState({
                isCardBlocked: result
            });
        });
    }

    returnBlockServiceView = () => {
        let message = "";
        if(this.state.userHasCard === false) {
            message = "There is no card attached to your account. Please contact your administrator to attach a card to your account";
        } else if(this.state.isCardBlocked) {
            message = "Your card is currently blocked. Please unblock your card in order to use it";
        }
        return <React.Fragment>
            <SideBar userType="user"/>
            <TopBar/>
            <UserIcon/>
            <div className="white-container w-75 mr-auto ml-auto bg-white">
                <h3 className="text-center m-5">{message}</h3>
            </div>
        </React.Fragment>
    }

    
    render() {
        return <div className="dark-background">
            {this.state.userHasCard && !this.state.isCardBlocked? this.props.children : this.returnBlockServiceView()}
        </div>;
    }
    
}

export {BlockedServices};
