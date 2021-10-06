import React from 'react';
import './ResponseModal.css';

interface IResponseModalProps{
    open: boolean;
    closeModal: any;
    message : string;
}

class ResponseModal extends React.Component<IResponseModalProps, any>{ 

    private closeModal = () =>{
        this.props.closeModal(false);
    }

    render(){
        return (
        <div className={this.props.open? "modal open" : "modal close"}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{this.props.message}</h4>
                    </div>
                    <div className="modal-footer response-modal">
                        <button type="button" className= {this.props.message === "Something wrong happened. Try again later!" ? "btn btn-default response-button" : "btn btn-default response-button"} onClick={this.closeModal}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}

export default ResponseModal;