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
                    <p className="p"> <img className="img" src={dashboard} alt=""/> My Dashboard  <img src={arrow} className = {this.state.show ? "transform-none img" : "transform-reverse img"} alt="" onClick={this.clickHandler}/></p>
                </div>
                <div className = {"side-menu-" + this.state.show}>
                <p className = {"paragraph-" + this.state.show + " p"}> <img className="img" src={transfer} alt=""/> &nbsp; Transfer </p>
                </div>
                <div className = {"side-menu-" + this.state.show}>
                <p className = {"paragraph-" + this.state.show + " p"}> <img className="img" src={transfer} alt=""/> &nbsp; Exchange </p>
                </div>
                <div className = {"side-menu-" + this.state.show}>
                <p className = {"paragraph-" + this.state.show + " p"}> <img className="img" src={paymentMethod} alt=""/> &nbsp; Automatic debit </p>
                </div>
                <div className = {"side-menu-" + this.state.show}>
                <p className = {"paragraph-" + this.state.show + " p"}> <img className="img" src={block} alt=""/> &nbsp; Block card </p>
                </div>
                <div className = {"side-menu-" + this.state.show}>
                <p className = {"paragraph-" + this.state.show + " p"}> <img className="img" src={placeholder} alt=""/> &nbsp; Locations </p>
                </div>
                <div className = {"side-menu-" + this.state.show}>
                <p className = {"paragraph-" + this.state.show + " p"}> <img className="img" src={card} alt=""/> &nbsp; Contact </p>
                </div>
            </div>
        )
    }
}

export default SideBar