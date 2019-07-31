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
        
        this.state={
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
            <div className="sideBar" id="mySidebar" style={this.state.show ? {width:'150px'} : {width:'250px'}}>
                <div className="regularDiv">
                    <p> <img src={dashboard} alt=""/> My Dashboard  <img src={sagetutza} alt="" onClick={this.clickHandler}/></p>
                </div>
                <div style={this.state.show ? {padding: '0% 40%'} : {padding: '0% 20%'}}>
                <p style={this.state.show ? {color: '#ffff'} : {color: '#09424d', fontWeight:'lighter'}}> <img src={transfer} alt=""/> &nbsp; Transfer </p>
                </div>
                <div style={this.state.show ? {padding: '0% 40%'} : {padding: '2% 20%'}}>
                <p style={this.state.show ? {color: '#ffff'} : {color: '#09424d', fontWeight:'lighter'}}> <img src={transfer} alt=""/> &nbsp; Exchange </p>
                </div>
                <div style={this.state.show ? {padding: '0% 40%'} : {padding: '2% 20%'}}>
                <p style={this.state.show ? {color: '#ffff'} : {color: '#09424d', fontWeight:'lighter'}}> <img src={paymentmethod} alt=""/> &nbsp; Automatic debit </p>
                </div>
                <div style={this.state.show ? {padding: '0% 40%'} : {padding: '2% 20%'}}>
                <p style={this.state.show ? {color: '#ffff'} : {color: '#09424d', fontWeight:'lighter'}}> <img src={block} alt=""/> &nbsp; Block card </p>
                </div>
                <div style={this.state.show ? {padding: '0% 40%'} : {padding: '2% 20%'}}>
                <p style={this.state.show ? {color: '#ffff'} : {color: '#09424d', fontWeight:'lighter'}}> <img src={placeholder} alt=""/> &nbsp; Locations </p>
                </div>
                <div style={this.state.show ? {padding: '0% 40%'} : {padding: '2% 20%'}}>
                <p style={this.state.show ? {color: '#ffff'} : {color: '#09424d', fontWeight:'lighter'}}> <img src={card} alt=""/> &nbsp; Contact </p>
                </div>
            </div>
        )
    }
}

export default SideBar