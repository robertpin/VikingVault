import React from 'react'
import './styles.css'
import account from './images/card.png'

const url = "https://localhost:44323/api/Accounts/0"

interface IAccountState{
    balance: number
    card: any
    transactions: []
    isPresent: boolean
} 

class AccountPage extends React.Component<any, IAccountState>{
    constructor(props:any){
        super(props);

        this.state={
            balance: 0,
            card: {},
            transactions: [],
            isPresent: true
        }
    }

    componentDidMount(){
        fetch(url).then(
            (response)=> {
                response.json();})
            .then(data=>{
                this.setState(oldState => {
                    return {
                        isPresent: false
                    }
                })
            })
            .catch(error => {
                console.log("wrryyyyy");
                this.setState(oldState => {
                    return {
                        isPresent: false
                    }
                })
        })
    }

    render(){
        return(
            <div className="account" style={this.state.isPresent ? {display:'none'} : {display:'inline-flex'}}>
                <img className="cardUnavailable" src={account} alt=""></img>
                <div className="info">
                    <h2>Accounts</h2>
                    <br/><br/><br/>
                    <h5 className="pNew">Please contact your administrator to attach a card to your account <hr style={{width:'100%'}}></hr></h5>
                    
                </div>
            </div>
        )
    }
}

export default AccountPage