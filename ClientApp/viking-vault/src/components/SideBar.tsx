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
        return(
            <div className={"sidebar-" + this.state.show} id="mySidebar">
                <div className="regular-div">
                        <img className="img" src={dashboard} alt=""/> 
                        &nbsp;
                        <span className = {"dashboard-" + this.state.show}>Dashboard</span>
                        <img src={arrow} className = {this.state.show ? "transform-none img" : "transform-reverse img"} alt="" onClick={this.clickHandler}/>
                </div>
                <div className = {"side-menu-" + this.state.show}>
                        <img className="img" src={transfer} alt=""/> <span className = {"span-" + this.state.show}>Transfer</span>
                </div>
                <div className = {"side-menu-" + this.state.show}>
                        <img className="img" src={transfer} alt=""/> <span className = {"span-" + this.state.show}>Exchange</span>
                </div>
                <div className = {"side-menu-" + this.state.show}>
                        <img className="img" src={paymentMethod} alt=""/> <span className = {"span-" + this.state.show}>Automatic debit</span>
                </div>
                <div className = {"side-menu-" + this.state.show}>
                        <img className="img" src={block} alt=""/> <span className = {"span-" + this.state.show}>Block card</span>
                </div>
                <div className = {"side-menu-" + this.state.show}>
                        <img className="img" src={placeholder} alt=""/> <span className = {"span-" + this.state.show}>Locations</span>
                </div>
                <div className = {"side-menu-" + this.state.show}>
                        <img className="img" src={card} alt=""/> <span className = {"span-" + this.state.show}>Contact</span>
                </div>
            </div>
        )
    }
}

export default SideBar