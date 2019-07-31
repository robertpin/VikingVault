import React from 'react'
import './styles.css'
import logo from './images/logo.png'
import UserIcon from './UserIcon';

class TopBar extends React.Component{

    render(){
        return(
            <div className="topBar">
                <img className="vikLogo" src={logo} alt=''></img>
                <UserIcon className="uIcon" />
            </div>
        )
    }
}

export default TopBar