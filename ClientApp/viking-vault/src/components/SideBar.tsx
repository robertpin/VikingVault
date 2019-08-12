import React from 'react'
import './styles.css'
import dashboard from './images/dashboard.png'
import arrow from './images/arrowGRIdeschis.png'
import placeholder from './images/placeholder.png'
import paymentMethod from './images/payment-method.png';
import block from './images/password.png'
import moneyExchange from './images/money-exchange.png'
import transfer from './images/transfer.png'
import card from './images/business-card-of-a-man-with-contact-info.png'

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
        const sidemenuVisibility:string = this.state.show ? "side-menu-hide" : "side-menu-show";
        const spanVisibility: string = this.state.show ? "span-hide" : "span-show";
        const dashboardVisibility: string = this.state.show ? "dashboard-hide" : "dashboard-show";
        return(
            <div className={sidebarVisibility}>
                <div className="dashboard-title-container">
                        <img className="menu-icon" src={dashboard} /> 
                        &nbsp;
                        <span className = {dashboardVisibility}>Dashboard</span>
                </div>
                <div className = {sidemenuVisibility}>
                        <img className="menu-icon" src={transfer} /> <span className = {spanVisibility}>Transfer</span>
                </div>
                <div className = {sidemenuVisibility}>
                        <img className="menu-icon" src={moneyExchange} /> <span className = {spanVisibility}>Exchange</span>
                </div>
                <div className = {sidemenuVisibility}>
                        <img className="menu-icon" src={paymentMethod} /> <span className = {spanVisibility}>Automatic debit</span>
                </div>
                <div className = {sidemenuVisibility}>
                        <img className="menu-icon" src={block} /> <span className = {spanVisibility}>Block card</span>
                </div>
                <div className = {sidemenuVisibility}>
                        <img className="menu-icon" src={placeholder} /> <span className = {spanVisibility}>Locations</span>
                </div>
                <div className = {sidemenuVisibility}>
                        <img className="menu-icon" src={card} /> <span className = {spanVisibility}>Contact</span>
                </div>
                <img src={arrow} className = {this.state.show ? "transform-none menu-icon" : "transform-reverse menu-icon"} alt="" onClick={this.clickHandler}/>
            </div>
        )
    }
}

export default SideBar