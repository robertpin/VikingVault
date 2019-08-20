import React from 'react';
import './DeleteUser.css';

interface IDeleteUserModalProps{
    open: boolean;
    deletedUserName: string;
    closeModal: () => void;
    deleteUser: () => void;
}

class DeleteUserModal extends React.Component<IDeleteUserModalProps, any>{ 
    constructor(props : IDeleteUserModalProps){
        super(props);
    }

    private closeModal = () =>{
        this.props.closeModal();
    }

    private handleDeleteUser = () =>{
        this.props.deleteUser();
    }

    render(){
        return (
        <div className={this.props.open? "modal open" : "modal close"}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Are you sure you want to delete {this.props.deletedUserName}?</h4>
                    </div>
                    <div className="modal-footer delete-user">
                        <button type="button" className="btn btn-primary delete-user-button" onClick={this.handleDeleteUser}>Yes</button>
                        <button type="button" className="btn btn-primary cancel-delete-user-button" onClick={this.closeModal}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}
export default DeleteUserModal;