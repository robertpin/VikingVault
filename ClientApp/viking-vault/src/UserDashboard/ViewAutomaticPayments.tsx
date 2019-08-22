import  React  from 'react';
import {constants} from "../Resources/Constants";
import SideBar from '../Common/SideBar';
import TopBar from '../Common/TopBar';
const baseUrl = constants.baseUrl;

interface IAutomaticPayments {
   
}

interface IAutomaticPaymentsState {
}

class ViewAutomaticPayments extends React.Component<any, IAutomaticPaymentsState> {
    state = {
    }
    
    render() {
        return <div>
            <SideBar userType="user"/>
            <TopBar/>
            <div>
                Sal
            </div>>
        </div>
    }
}

export {ViewAutomaticPayments}