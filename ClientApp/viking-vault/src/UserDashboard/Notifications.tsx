import React from "react";
import {constants} from "../Resources/Constants";
import SideBar from "../Common/SideBar";
import TopBar from "../Common/TopBar";
import UserIcon from "../Common/UserIcon";
import "./Notifications.css";

interface INotification {
    id: number;
    text: string;
    read: boolean;
}

interface INotificationState {
    notifications: INotification[];
}

const url = constants.baseUrl+"notifications";

class Notifications extends React.Component<any, INotificationState> {
    constructor(props: any) {
        super(props);
        this.state = {
            notifications: []
        }
    }

    getAllNotifications = () => {
        const token = sessionStorage.getItem("Authentication-Token");
        if(token === null) {
            return;
        }
        fetch(url, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token' : token
            }
        }).then(response => {
            if(response.status !== 200){
                return null;
            }
            return response.json();
        }).then(result => {
            if(result === null) {
                return;
            }
            this.setState({
                notifications: result
            });
        })
    }

    componentDidMount() {
        this.getAllNotifications();
    }

    returnTableRows = () => {
        return this.state.notifications.map(notification => {
            return <tr>
                <td className="notification-text">{notification.text}</td>
                <td>
                    <button className="btn btn-primary">Mark as {notification.read? "unread" : "read"}</button>
                </td>
            </tr>
        });
    }

    render() {
        return <div className="dark-background">
            <SideBar userType="user"/>
            <TopBar />
            <UserIcon />
            <div className="notifications-container w-75 mr-auto ml-auto bg-white">
            <h5 className="font-weight-bold">Notifications</h5>
                <table className="table table-hover">
                    <tbody>
                        {this.returnTableRows()}
                    </tbody>
                </table>
                
            </div>
        </div>
    }
}

export {Notifications}
