import React from 'react'
import './styles.css'
import dashboard from './images/dashboard.png'
import sagetutza from './images/arrowGRIdeschis.png'
import placeholder from './images/placeholder.png'
import paymentmethod from './images/payment-method.png';
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
            <div className={"sideBar-" + this.state.show} id="mySidebar">
                <div className="regularDiv">
                    <p> <img src={dashboard} alt=""/> My Dashboard  <img src={sagetutza} style={this.state.show ? {transform:'none'} : {transform:'scaleX(-1)'} } alt="" onClick={this.clickHandler}/></p>
                </div>
                <div className = {"sideMenu-" + this.state.show}>
                <p className = {"paragraph-" + this.state.show}> <img src={transfer} alt=""/> &nbsp; Transfer </p>
                </div>
                <div className = {"sideMenu-" + this.state.show}>
                <p className = {"paragraph-" + this.state.show}> <img src={transfer} alt=""/> &nbsp; Exchange </p>
                </div>
                <div className = {"sideMenu-" + this.state.show}>
                <p className = {"paragraph-" + this.state.show}> <img src={paymentmethod} alt=""/> &nbsp; Automatic debit </p>
                </div>
                <div className = {"sideMenu-" + this.state.show}>
                <p className = {"paragraph-" + this.state.show}> <img src={block} alt=""/> &nbsp; Block card </p>
                </div>
                <div className = {"sideMenu-" + this.state.show}>
                <p className = {"paragraph-" + this.state.show}> <img src={placeholder} alt=""/> &nbsp; Locations </p>
                </div>
                <div className = {"sideMenu-" + this.state.show}>
                <p className = {"paragraph-" + this.state.show}> <img src={card} alt=""/> &nbsp; Contact </p>
                </div>
            </div>
        )
    }
}

export default SideBar