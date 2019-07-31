import React from "react";
import icon from "./images/user2.png";
import "./styles.css";

interface IUserIconState {
  clicked: boolean;
}

class UserIcon extends React.Component<any, IUserIconState> {
  megaMenu: any;

  constructor(props: any) {
    super(props);
    this.state = {
      clicked: false
    };
    this.megaMenu = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
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
            <a href="#">View profile</a>
            <a href="#">Sign out</a>
          </div>
        </div>
      </div>
    );
  }
}

export default UserIcon;
