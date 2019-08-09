import React from 'react';
import DeleteUserModal from './DeleteUserModal';
import { variables } from './ConstantVariables';

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
        fetch(variables.baseUrl+"user", {
            method: "DELETE",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: "email3@gmail.com"
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