import React from "react";
import icon from "./images/user2.png";
import "./styles.css";
import {Redirect} from "react-router-dom";

interface IUserIconState {
  clicked: boolean;
  redirect: boolean;
}

class UserIcon extends React.Component<any, IUserIconState> {
  megaMenu: any;

  constructor(props: any) {
    super(props);
    this.state = {
      clicked: false,
      redirect: false
    };
    this.megaMenu = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  sendData = () =>{
    this.props.parentCallBack(false);
  }

  componentWillMount() {
    document.addEventListener("click", this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick, false);
  }

  handleClick() {
    this.setState({ clicked: !this.state.clicked });
  }

  handleOutsideClick = (event: Event) => {
    if (!this.megaMenu.current.contains(event.target)) {
      this.setState({
        clicked: false
      });
    }
  }

  handleSignOut = () =>{
      sessionStorage.removeItem("Authentication-Token");
      this.setState({
        redirect : true
      });
  }

  render() {
    return (
      <div className="dropdown" ref={this.megaMenu}>
        <img
          className="userIcon"
          src={icon}
          alt=""
          onClick={this.handleClick}
        />
        <div className={"mega-menu" + " " + this.state.clicked}>
          <div className="mega-menu-content">
            <a href="#" onClick = {this.sendData}>View profile</a>
            <a href="#" onClick = {this.handleSignOut}>Sign out</a>
          </div>
        </div>
        {this.state.redirect ? <Redirect to ="/login"/> : null}
      </div>
    );
  }
}

export default UserIcon;
