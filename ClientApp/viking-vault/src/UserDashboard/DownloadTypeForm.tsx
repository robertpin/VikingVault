import React from "react";
import { Redirect } from 'react-router-dom';
import downloadIcon from '../Resources/images/download-icon.png'
import { constants } from "../Resources/Constants";

const API_URL = `${constants.baseUrl}pdfgenerator`;
const LOGIN_ROUTE ="/login";

class DownloadDropdown extends React.Component {
    state = {
      isOpen: false,
      timeFilter: "",
      redirect: false
    };
  
    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
  
    generatePDF = () => {
        let token = sessionStorage.getItem("Authentication-Token");
        if(token === null){
            this.setState({
                redirect: true
            })
        }
        else {
            var pdfURL = API_URL + "/"+ this.state.timeFilter;
            fetch(pdfURL, {
                    method: "GET",
                    headers: {
                        "x-access-token":  token.toString()
                    }
                })
                .then((response) => response.blob())
                .then((blob) => {
                    if(blob != null) {
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `Viking Vault Report.pdf`);
                    link.click(); }
                })
            }
        }

    handlePDFRequestPer = (timeFilter: string) => {
        this.setState({
            timeFilter: timeFilter,
            isOpen: !this.state.isOpen
        }, this.generatePDF);
        return null;
    }

    render() {
      const menuClass = `dropdown-menu${this.state.isOpen ? " show show-items" : ""}`;
      return (
        <div className="dropdown download-dropdown" onClick={this.toggleOpen}>
            { this.state.redirect? <Redirect to = { LOGIN_ROUTE } /> : null} 
            <button
                className="btn download-button dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
            >
                <img title="Download transactions as PDF" className="download-icon" src={downloadIcon} alt="Download Icon"></img>
            </button>
            <div className={menuClass} aria-labelledby="dropdownMenuButton">
                <div id="1" className="dropdown-item download-option" onClick={() => this.handlePDFRequestPer("day")}>Per day</div>
                <div id="2" className="dropdown-item download-option" onClick={() => this.handlePDFRequestPer("week")}>Per week</div>
                <div id="3" className="dropdown-item download-option" onClick={() => this.handlePDFRequestPer("month")}>Per month</div>
                <div id="4" className="dropdown-item download-option" onClick={() => this.handlePDFRequestPer("all")}>All</div>
            </div>
        </div>
      );
    }
  }
  
export default DownloadDropdown;