import React from 'react'
import './styles.css'
import logo from './images/logo.png'

class TopBar extends React.Component{

    render(){
        return(
            <div className="top-bar">
                <img className="viking-logo" src={logo} alt=''></img>
            </div>
        )
    }
}

export default TopBar