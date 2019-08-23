import React from 'react';
import './toggle.css'

class ActivatePaymentToggle extends React.Component<any, any>{
  constructor(props: any){
    super(props)
    this.handleCheckBox = this.handleCheckBox.bind(this)
    this.state = {
      checked: true
    }
  }  

  handleCheckBox(e:any){
    this.setState({
      checked: e.target.checked
    })
    console.log(this.state.checked)
  }


  render(){
        return <label className="switch">
        <input type="checkbox" onChange={this.handleCheckBox} checked={this.state.checked}/>
        <span className="slider round"></span>
      </label>
    }
}


export default ActivatePaymentToggle