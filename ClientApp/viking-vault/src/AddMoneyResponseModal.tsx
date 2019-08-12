import React from 'react';

interface IAddMoneyResponseModalProps{
    open: boolean;
    closeModal: any;
    message : string;
}

class AddMoneyResponseModal extends React.Component<IAddMoneyResponseModalProps, any>{ 
    constructor(props : IAddMoneyResponseModalProps){
        super(props);
    }

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
                    <div className="modal-footer">
                        <button type="button" className= {this.props.message === "Something wrong happened. Try again later!" ? "btn btn-primary cancel-add-money" : "btn btn-primary cancel-add-money"} onClick={this.closeModal}>Done</button>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}

export default AddMoneyResponseModal;