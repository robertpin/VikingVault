import React from "react";
import {constants} from "../../Resources/Constants";

interface ICompanyState {
    name: string;
    address: string;
    message: string;
    messageClass: string;
    [key: string]: string;
}

class AddCompany extends React.Component<any, ICompanyState> {
    state = {
        name: "",
        address: "",
        message: "",
        messageClass: ""
    }

    private handleChange = (inputValue: string, inputName: string) => {
        this.setState({
            [inputName]: inputValue
        })
    }

    private showMessage = (message: string, messageClass: string) => {
        this.setState({
            message: message,
            messageClass: messageClass
        });
        setTimeout(() => {
            this.setState({
                message: ""
            });
        }, 2000);
    }

    private checkFieldsNotEmpty = () => {
        if(this.state.name === "" || this.state.address === "") {
            this.showMessage("Fields cannot be empty!", "alert alert-danger");
            return false;
        }
        return true;
    }

    private sendCompanyToBackend = () => {
        const token = sessionStorage.getItem("Authentication-Token");
        if(!this.checkFieldsNotEmpty() || token === null) {
            return;
        }
        const company = {
            name: this.state.name,
            address: this.state.address,
            email: `contact@${this.state.name.toLowerCase()}.com`
        };
        fetch(constants.baseUrl+"company", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': token.toString()
            },
            body: JSON.stringify(company)
        }).then(response => {
            if(response.status !== 200) {
                if(response.status === 409) {
                    this.showMessage("Company already exists!", "alert alert-danger");
                }
                else {
                    this.showMessage("Internal server error!", "alert alert-danger");
                }
                return null;
            }
            return response.json();
        }).then(result => {
            if(result === null) {
                return;
            }
            this.showMessage("Company added!", "alert alert-success");
            this.setState({
                name: "",
                address: ""
            })
        });
    }

    render() {
        return <div className="w-50">
            {this.state.message !== ""? <p className={this.state.messageClass}>{this.state.message}</p>: null}
            <div className="form-group">
                <label>Company name</label>
                <input type="text" value={this.state.name} onChange={(e) => this.handleChange(e.target.value, "name")} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Company address</label>
                <input type="text" value={this.state.address} onChange={(e) => this.handleChange(e.target.value, "address")} className="form-control"/>
            </div>
            <button className="btn btn-primary" onClick={this.sendCompanyToBackend}>Add company</button>
        </div>;
        
    }
}

export {AddCompany};
