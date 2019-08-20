import React from 'react'
import './styles.css'
import dashboard from './images/dashboard.png'
import arrow from './images/arrowGRIdeschis.png'
import { constants } from "../ConstantVariables";
import { Link } from 'react-router-dom';
import { UserSideBar } from './UserSideBar';
import { AdminSideBar } from './AdminSideBar';

interface ISideBarState{
    show: boolean;
}

interface ISideBarProps {
    userType: string;
}

class SideBar extends React.Component<ISideBarProps, ISideBarState> {
    constructor(props:ISideBarProps){
        super(props)
        
        this.state = {
            show: true
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

    render(){
        const sidebarVisibility:string = this.state.show ? "sidebar collapsed" : "sidebar expanded";
        const dashboardVisibility: string = this.state.show ? "dashboard-hide" : "dashboard-show";
        return(
            <div className={sidebarVisibility}>
                <div className="dashboard-title-container">
                        <img className="menu-icon" src={dashboard} /> 
                        &nbsp;
                        <span className = {dashboardVisibility}> Dashboard </span>
                </div>
                {this.props.userType === "user"? <UserSideBar show = {this.state.show}/> : <AdminSideBar show={this.state.show}/>}
                <img src={arrow} className = {this.state.show ? "transform-none menu-icon" : "transform-reverse menu-icon"} alt="" onClick={this.clickHandler}/>
            </div>
        )
    }
}

export default SideBar