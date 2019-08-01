import React from 'react'
import './styles.css'
import account from './images/card.png'

const url = "https://localhost:44323/api/Accounts"

interface IAccountState{
    balance: number
    card: any
    transactions: []
    isPresent: boolean
    redirect: boolean
} 

class AccountPage extends React.Component<any, IAccountState>{
    constructor(props:any){
        super(props);

        this.state={
            balance: 0,
            card: {},
            transactions: [],
            isPresent: true,
            redirect:false
        }
    }

    componentDidMount(){

        let token = sessionStorage.getItem("Authentication-Token");

        if(token === null)
        {
            this.setState({
                redirect:true
            })
        }
        else
        {
            fetch(url, {
                method:"GET",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token' : token.toString()
                }})
                .then((response)=> {
                    if(response.status === 404){
                        this.setState(oldState => {
                            return {
                                isPresent: false
                            }
                        })
                    }
                    if(response.status === 200){
                        this.setState(oldState => {
                            return {
                                isPresent: true
                            }
                        })
                    }
                    response.json();})
                .then(data=>{})
                .catch(error => {
                    console.log("Server error");
                    this.setState(oldState => {
                        return {
                            isPresent: false
                        }
                    })
            })
        }
    }
        

    render(){
        return(            
            <div className={"account-"+this.state.isPresent}>
                
                <img className="card-unavailable" src={account} alt=""></img>
                <div className="info">
                    <h2>Accounts</h2>
                    <br/><br/><br/>
                    <h5 className="p-new">Please contact your administrator to attach a card to your account <hr></hr></h5>
                </div>
            </div>
        )
    }
}

export default AccountPage