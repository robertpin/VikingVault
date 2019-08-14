import React from "react";
import icon from "./images/user2.png";
import "./styles.css";
import {Redirect} from "react-router-dom";

interface IUserIconState {
  clicked: boolean;
  redirect: boolean;
  userImage: string;
}

class UserIcon extends React.Component<any, IUserIconState> {
  megaMenu: any;

  constructor(props: any) {
    super(props);
    this.state = {
      clicked: false,
      redirect: false,
      userImage: icon
    };
    this.megaMenu = React.createRef();
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  sendData = () =>{
    setTimeout(() => {
      this.props.parentCallBack(false);
    }, 100);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleOutsideClick, false);

    let token = sessionStorage.getItem("Authentication-Token");

        if(token === null)
        {
            this.setState({
                redirect: true
            })
        }
        else{
            
            fetch(API_URL, {
                method: "GET",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token':  token.toString()
                }})
            .then( response => 
                {
                    if( response.status === 500)
                    {
                        this.setState({
                            errorLabel: "Internal Server Error"
                        })

                        return null;
                    }
                    
                    return response.json();
                })
            .then( userData => {
                if(userData != null)
                {
                    this.setState(
                        {
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            address: userData.address,
                            id: userData.cnp, 
                            email: userData.email
                        }
                    )
                }
            }).catch( error => this.setState({ errorLabel: "Something went wrong" }));
        }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick, false);
  }

  handleClick = () =>{
    this.setState({ clicked: !this.state.clicked });
  }

  handleOutsideClick = (event: Event) => {
    if(this.megaMenu == null || this.megaMenu.current == null)
      return;
    if (!this.megaMenu.current.contains(event.target)) {
      this.setState({
        clicked: false
      });
    }
  }

  handleSignOut = () => {
      sessionStorage.removeItem("Authentication-Token");
      this.setState({
        redirect : true
      });
      
  }

  render() {
    return (
      <div className="dropdown" ref={this.megaMenu}>
        <img
          className="user-icon img"
          src={this.state.userImage}
          alt=""
          onClick={this.handleClick}
        />
        <div className={`mega-menu ${this.state.clicked}`}>
          <div className="mega-menu-content">
            <button className="button-user-icon" onClick = {this.sendData}>View profile</button>
            <button className="button-user-icon" onClick = {this.handleSignOut}>Sign out</button>
          </div>
        </div>
        {this.state.redirect ? <Redirect to ="/login"/> : null}
      </div>
    );
  }
}

export default UserIcon;
