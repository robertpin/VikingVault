import React from 'react';
import '../ExchangeResponseModal.css';

interface ITransferFundsModalProps{
    open: boolean;
    closeModal: any;
    message : string;
}
const TransferFundsModal = (props: ITransferFundsModalProps) =>
{
        return (
            <div className={props.open? "modal open" : "modal close"}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content exchange-modal-content">
                        <div className="modal-header exchange-response-text">
                            <p className="modal-title exchange-modal-text">{props.message}</p>
                        </div>
                        <div className="modal-footer exchange-modal-footer">
                            <button type="button" className="btn btn-primary exchange-done-button" onClick={props.closeModal}>Done</button>
                        </div>
                    </div>
                </div>
            </div>
        ); 
}

export default TransferFundsModal;