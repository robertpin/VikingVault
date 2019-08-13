import React from 'react';
import './ExchangeResponseModal.css'

interface IExchangeResponseModalProps{
    open: boolean;
    closeModal: any;
    message : string;
}

class ExchangeResponseModal extends React.Component<IExchangeResponseModalProps, any> { 
    private closeModal = () =>{
        this.props.closeModal();
    }
    render(){
        return (
        <div className={this.props.open? "modal open" : "modal close"}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content exchange-modal-content">
                    <div className="modal-header exchange-response-text">
                        <p className="modal-title exchange-modal-text">{this.props.message}</p>
                    </div>
                    <div className="modal-footer exchange-modal-footer">
                        <button type="button" className="btn btn-primary exchange-done-button" onClick={this.closeModal}>Done</button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default ExchangeResponseModal;