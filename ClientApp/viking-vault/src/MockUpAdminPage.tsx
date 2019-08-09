import React from "react";
import { AttachCardForm } from "./AttachCardModal";

interface IAdminPageState {
    openModal: boolean
}

class AdminPage extends React.Component<any, IAdminPageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            openModal: false,
        }
    }
    
    openModal = () => {
        this.setState({
            openModal: true
        });
    }

    closeModal = () => {
        this.setState({
            openModal: false
        });
    }

    render() {
        return (
            <div>
                <AttachCardForm open={this.state.openModal} modalClose={this.closeModal} userId={1004} />
                <h1>Helloooo</h1>
                <button className="btn btn-primary" onClick={ this.openModal}>Apasa</button>
            </div>
        )
    }
}

export { AdminPage };