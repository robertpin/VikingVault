import * as React from "react";
import { EditAutomaticPaymentForm } from "./EditAutomaticPaymentModal";

export interface IAutomaticPaymentData {
    id: number,
    companyId: number,
    amount: string,
    initialPaymentDate: string,
    lastPaymentDate: string,
    payingUserId: number,
}

interface IPageState {
    automaticPayment: IAutomaticPaymentData;
    modals: IModals;
}

interface IModals {
    openEditAutomaticPaymentModal: boolean
}

const defaultAutomaticPayment = {
    id: 7,
    companyId: 4,
    amount: "999",
    initialPaymentDate: "2045-06-03",
    lastPaymentDate: "2002-01-01",
    payingUserId: 2,
    openEditAutomaticPaymentModal: false, 
};

class WillOpenEditModal extends React.Component<any, IPageState> {
    constructor(props: any) {
        super(props);
        this.state = {
                    automaticPayment : {...defaultAutomaticPayment},
                    modals : {
                        openEditAutomaticPaymentModal: false,
                    },
                };     
    }

    handleEditAutomaticPayment = () => {
        this.setState({
            modals: {
                ...this.state.modals,
                openEditAutomaticPaymentModal: true,
            }
        });
    }

    closeEditAutomaticPaymentModal = () => {
        this.setState({
            modals: {
                ...this.state.modals,
                openEditAutomaticPaymentModal: false,
            }
        });
    }

    render() {
        return (
            <div>
                <h5>Hellooo</h5>
                <EditAutomaticPaymentForm open={this.state.modals.openEditAutomaticPaymentModal} onModalClose={this.closeEditAutomaticPaymentModal} automaticPayment={this.state.automaticPayment} />
                <button className = "btn btn-primary" onClick={ this.handleEditAutomaticPayment}>Edit Automatic Payment</button>
            </div>
        )
    }
}

export { WillOpenEditModal };