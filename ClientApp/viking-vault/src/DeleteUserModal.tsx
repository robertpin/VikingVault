import React from 'react';

interface IDeleteUserModalProps{
    open: boolean;
    deletedUserName: string;
    closeModal: any;
    deleteUser: any;
}

class DeleteUserModal extends React.Component<IDeleteUserModalProps, any>{ 
    constructor(props : IDeleteUserModalProps){
        super(props);
    }

    private closeModal = () =>{
        this.props.closeModal(false);
    }

    private handleDeleteUser = () =>{
        this.props.deleteUser();
    }

    render(){
        return (
        <div className={this.props.open? "modal open" : "modal close"}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Are you sure you want to permanently delete {this.props.deletedUserName}?</h4>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-danger" onClick={this.handleDeleteUser}>Yes</button>
                        <button type="button" className="btn btn-outline-success" onClick={this.closeModal}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}
export default DeleteUserModal;