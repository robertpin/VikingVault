import * as React from "react";
import { IUserData } from "./AdminDashboard/UserData";
import { AutomaticPaymentForm } from "./CreateAutomaticPaymentModal";

interface IUserDataProp{
    user: IUserData;
}

interface IPageState{
    user: IUserData;
    modals: IModals;
}

interface IModals {
    openAutomaticPaymentModal: boolean
}

const defaultUser = {
    id: 2,
    firstName: "no-data",
    lastName: "no-data",
    address: "no-data",
    email: "no-data",
    pictureLink: "",
    cardNumber: "no-data",
    expirationDate: "no-data",
    openAutomaticPaymentModal: false, 
};

class WillOpenModal extends React.Component<IUserDataProp, IPageState> {
    constructor(props: IUserDataProp) {
        super(props);
        this.state = {
                    user : {...defaultUser},
                    modals : {
                        openAutomaticPaymentModal: false,
                    },
                };     
    }

    handleAutomaticPayment = () => {
        this.setState({
            modals: {
                ...this.state.modals,
                openAutomaticPaymentModal: true,
            }
        });
    }

    closeAutomaticPaymentModal = () => {
        this.setState({
            modals: {
                ...this.state.modals,
                openAutomaticPaymentModal: false,
            }
        });
    }

    render() {
        return (
            <div>
                <h5>Hellooo</h5>
                <AutomaticPaymentForm open={this.state.modals.openAutomaticPaymentModal} onModalClose={this.closeAutomaticPaymentModal} userId={this.state.user.id} />
                <button className = "btn btn-primary" onClick={ this.handleAutomaticPayment}>Automatic Payment</button>
            </div>
        )
    }
}

export { WillOpenModal };