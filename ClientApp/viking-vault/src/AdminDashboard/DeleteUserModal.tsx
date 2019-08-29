import React from 'react';
import './DeleteUser.css';

interface IDeleteUserModalProps{
    open: boolean;
    deletedUserName: string;
    closeModal: () => void;
    deleteUser: () => void;
}

const DeleteUserModal = (props : IDeleteUserModalProps) =>{
    return (
        <div className={props.open? "modal open" : "modal close"}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Are you sure you want to delete {props.deletedUserName}?</h4>
                    </div>
                    <div className="modal-footer delete-user">
                        <button type="button" className="btn btn-default delete-user-button" onClick={props.deleteUser}>Yes</button>
                        <button type="button" className="btn btn-default cancel-delete-user-button" onClick={props.closeModal}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
    }
export default DeleteUserModal;