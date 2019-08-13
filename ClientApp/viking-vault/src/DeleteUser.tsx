import React from 'react';
import DeleteUserModal from './DeleteUserModal';
import { constants } from './ConstantVariables';

class DeleteUser extends React.Component<any,any>{
    state = {
        openDeleteUserModal : false
    }

    private handleDeleteUser = () =>{
        this.setState((oldstate : any)=>({
            openDeleteUserModal : !oldstate.openDeleteUserModal
        }));
    }

    private closeDeleteUserModal = () =>{
        this.setState({
            openDeleteUserModal : false
        });
    }

    private deleteUser = () =>{
        fetch(constants.baseUrl+"user/delete", {
            method: "DELETE",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: "blabla@gmail.com"
            })});

        this.setState({
            openDeleteUserModal : false
        });
    }

    render(){
        return(
            <div>
                <DeleteUserModal open = {this.state.openDeleteUserModal} deletedUserName = "Vlad Buda" closeModal = {this.closeDeleteUserModal} deleteUser = {this.deleteUser}/>
                <button className = "btn btn-primary" onClick = {this.handleDeleteUser}>Push me!</button>
            </div>
        )
    }
}

export default DeleteUser;