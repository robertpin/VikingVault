import React from 'react'
import './styles.css'
import dashboard from './images/dashboard.png'
import arrow from './images/arrowGRIdeschis.png'
import placeholder from './images/placeholder.png'
import paymentMethod from './images/payment-method.png';
import block from './images/password.png'
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
        
        let sidebar_visibility:string = this.state.show ? "sidebar collapsed" : "sidebar expanded";
        let side_menu_visibility:string = "side-menu-" + this.state.show;
        let span_visibility: string = "span-" + this.state.show;
        return(
            <div className={sidebar_visibility}>
                <div className="dashboard-div">
                        <img className="menu-icon" src={dashboard} /> 
                        &nbsp;
                        <span className = {"dashboard-" + this.state.show}>Dashboard</span>
                        <img src={arrow} className = {this.state.show ? "transform-none menu-icon" : "transform-reverse menu-icon"} alt="" onClick={this.clickHandler}/>
                </div>
                <div className = {side_menu_visibility}>
                        <img className="menu-icon" src={transfer} /> <span className = {span_visibility}>Transfer</span>
                </div>
                <div className = {side_menu_visibility}>
                        <img className="menu-icon" src={transfer} /> <span className = {span_visibility}>Exchange</span>
                </div>
                <div className = {side_menu_visibility}>
                        <img className="menu-icon" src={paymentMethod} /> <span className = {span_visibility}>Automatic debit</span>
                </div>
                <div className = {side_menu_visibility}>
                        <img className="menu-icon" src={block} /> <span className = {span_visibility}>Block card</span>
                </div>
                <div className = {side_menu_visibility}>
                        <img className="menu-icon" src={placeholder} /> <span className = {span_visibility}>Locations</span>
                </div>
                <div className = {side_menu_visibility}>
                        <img className="menu-icon" src={card} /> <span className = {span_visibility}>Contact</span>
                </div>
            </div>
        )
    }
}

export default SideBar