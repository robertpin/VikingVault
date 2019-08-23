import React from 'react';

import {constants} from "../Resources/Constants";
import './toggle.css';

const API_URL = `${constants.baseUrl}`;

interface IPaymentToggleProps{
  paymentId: number
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
    fetch(API_URL+"PaymentToggling", {
      method: "PUT",
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'    
      },
      body: JSON.stringify(
        {
          id: this.props.paymentId,
          isChecked: this.state.checked
        })
    })
  }

  componentDidMount(){
    fetch(API_URL+"PaymentToggling/"+this.props.paymentId, {
      method: "GET",
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if( response.status === 500)
        {
            return null;
        }                    
        return response.json();
      }).then( responseData =>{
        console.log(responseData)
            this.setState(
                {
                  checked: responseData
                })
      });
  }

  render(){
        return <label className="switch">
        <input type="checkbox" onChange={this.handleCheckBox} checked={this.state.checked}/>       
        {console.log(this.state.checked+" "+this.props.paymentId)}
        <span className="slider round"></span>
      </label>
    }
}


export default ActivatePaymentToggle