import React from 'react';

import {constants} from "../Resources/Constants";
import './toggle.css';

const paymentTogglingURL = `${constants.baseUrl}PaymentToggling/`;

interface IPaymentToggleProps{
  paymentId: number
  toggleAutomaticPaymentState: (id: number, automaticPaymentState:boolean) => void
}

class ActivatePaymentToggle extends React.Component<IPaymentToggleProps, any>{
  constructor(props: IPaymentToggleProps){
    super(props)
    this.handleCheckBox = this.handleCheckBox.bind(this)
    this.state = {
      checked: false
    }
  }  

  handleCheckBox(e:any){
    this.setState({
      checked: e.target.checked
    })
    fetch(paymentTogglingURL+this.props.paymentId, {
      method: "PUT",
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'    
      },
      body: this.state.checked
    })
    this.props.toggleAutomaticPaymentState(this.props.paymentId, e.target.checked);
  }

  componentDidMount(){
    fetch(paymentTogglingURL+this.props.paymentId, {
      method: "GET",
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if(response.status === 500){
            return null;
        }                    
        return response.json();
      }).then(responseData =>{
            this.setState({
                  checked: responseData
            })
      });
  }

  render(){
        return <label className="switch scaled-down toggle-automatic-payment-icon">
        <input type="checkbox" onChange={this.handleCheckBox} checked={this.state.checked}/>       
        <span className="slider round"></span>
      </label>
    }
}

export default ActivatePaymentToggle