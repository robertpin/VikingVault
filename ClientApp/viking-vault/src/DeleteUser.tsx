import React from 'react';
import DeleteUserModal from './DeleteUserModal';
import { variables } from './ConstantVariables';

class DeleteUser extends React.Component<any,any>{
    state = {
        openModal : false
    }

    private handleDeleteUser = () =>{
        this.setState((oldstate : any)=>({
            openModal : !oldstate.openModal
        }));
    }

    private closeModal = () =>{
        this.setState({
            openModal : false
        });
    }

    private deleteUser = () =>{
        console.log("deleteUser was called");
        fetch(variables.baseUrl+"user", {
            method: "DELETE",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: "email8@gmail.com"
            })});

        this.setState({
            openModal : false
        });
    }

    render(){
        return(
            <div>
                <DeleteUserModal open = {this.state.openModal} deletedUserName = "Vlad Buda" closeModal = {this.closeModal} deleteUser = {this.deleteUser}/>
                <button className = "btn btn-primary" onClick = {this.handleDeleteUser}>Push me!</button>
            </div>
        )
    }
}

export default DeleteUser;