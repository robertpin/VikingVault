import React from 'react'
import './styles.css'
import dashboard from '../Resources/images/dashboard.png'
import arrow from '../Resources/images/arrowGRIdeschis.png'
import placeholder from '../Resources/images/placeholder.png'
import paymentMethod from '../Resources/images/payment-method.png'
import block from '../Resources/images/password.png'
import moneyExchange from '../Resources/images/money-exchange.png'
import transfer from '../Resources/images/transfer.png'
import card from '../Resources/images/business-card-of-a-man-with-contact-info.png'
import { Link } from 'react-router-dom';

interface ISideBarState{
    show: boolean;
}

class SideBar extends React.Component<any, ISideBarState> {
    constructor(props:any){
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
        const sideMenuVisibility:string = this.state.show ? "side-menu-hide" : "side-menu-show";
        const spanVisibility: string = this.state.show ? "span-hide" : "span-show";
        const dashboardVisibility: string = this.state.show ? "dashboard-hide" : "dashboard-show";
        return(
            <div className={sidebarVisibility}>
                <div className="dashboard-title-container">
                        <img className="menu-icon" src={dashboard} /> 
                        &nbsp;
                        <span className = {dashboardVisibility}> Dashboard </span>
                </div>
                <Link className="redirect-symbols" to="/transfer"> 
                    <div className = {sideMenuVisibility}>
                        <img className="menu-icon" src={transfer}></img>
                        <span className = {spanVisibility}> Transfer </span>
                    </div>
                </Link>
                <Link className="redirect-symbols" to="/exchange">
                    <div className = {sideMenuVisibility}>
                        <img className="menu-icon" src={moneyExchange}></img>
                        <span className = {spanVisibility}> Exchange </span>
                    </div>
                </Link>
                <Link className="redirect-symbols" to="/automatic-debit">
                    <div className = {sideMenuVisibility}>
                        <img className="menu-icon" src={paymentMethod}></img>
                        <span className = {spanVisibility}> Automatic debit </span>
                    </div>
                </Link>
                <Link className="redirect-symbols" to="/block-card">
                    <div className = {sideMenuVisibility}>
                        <img className="menu-icon" src={block}></img>
                        <span className = {spanVisibility}> Block card </span>
                    </div>
                </Link>
                <Link className="redirect-symbols" to="/locations">
                    <div className = {sideMenuVisibility}>
                        <img className="menu-icon" src={placeholder}></img>
                        <span className = {spanVisibility}> Locations </span>
                    </div>
                </Link>
                <Link className="redirect-symbols" to="/contact">
                    <div className = {sideMenuVisibility}>
                        <img className="menu-icon" src={card}></img>
                        <span className = {spanVisibility}> Contact </span>
                    </div>
                </Link>
                <img src={arrow} className = {this.state.show ? "transform-none menu-icon" : "transform-reverse menu-icon"} alt="" onClick={this.clickHandler}/>
            </div>
        )
    }
}

export default SideBar