import React from 'react'
import './styles.css'
import dashboard from '../Resources/images/dashboard.png'
import arrow from '../Resources/images/arrowGRIdeschis.png'
import { UserSideBar } from '../UserDashboard/UserSideBar';
import { AdminSideBar } from '../AdminDashboard/AdminSideBar';
import { constants } from '../Resources/Constants';
import { INotification } from './../UserDashboard/Notifications';
import { Link } from 'react-router-dom';

const notificationsUrl = constants.baseUrl+"notifications";

interface ISideBarState {
    show: boolean;
    unreadNotifications: boolean;
}

interface ISideBarProps {
    userType: string;
}

class SideBar extends React.Component<ISideBarProps, ISideBarState> {
    constructor(props:ISideBarProps){
        super(props);
        
        this.state = {
            show: true,
            unreadNotifications: false
        } 
        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler(event: any){
        this.setState (oldState => {
           return {
               show: !oldState.show
           }
        })
    }

    componentDidMount() {
        this.checkForUnreadNotifications();
    }

    checkForUnreadNotifications = () => {
        const token = sessionStorage.getItem("Authentication-Token");
        if(token === null) {
            return;
        }
        fetch(notificationsUrl, {
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
                unreadNotifications: result.filter((n: INotification) => n.read === false).length > 0
            });
        });
    }

    render(){
        const sidebarVisibility:string = this.state.show ? "sidebar collapsed" : "sidebar expanded";
        const dashboardVisibility: string = this.state.show ? "dashboard-hide" : "dashboard-show";
        return(
            <div className={sidebarVisibility}>
            <Link title="Dashboard" className="dashboard-icon" to="/">
                <div className="dashboard-title-container">
                    <img className="menu-icon" src={dashboard}/> 
                    &nbsp;
                    <span className = {dashboardVisibility}> Dashboard </span>
                </div>
            </Link>
                {this.props.userType === "user"? <UserSideBar show = {this.state.show} unreadNotification={this.state.unreadNotifications}/> : <AdminSideBar show={this.state.show}/>}
                <img title="Dashboard Options" src={arrow} className = {this.state.show ? "transform-none menu-icon" : "transform-reverse menu-icon"} onClick={this.clickHandler}/>
            </div>
        )
    }
}

export default SideBar