import React from "react";
import deleteIcon from "../Resources/images/delete.png";
import {constants} from "../Resources/Constants";
import "./ViewAutomaticPayments.css";

const url = constants.baseUrl+"automaticPayment/";

interface IDeleteAutomaticPaymentProps {
    automaticPaymentId: number;
    deletePaymentFromList: (id: Number) => void;
}

function deleteAutomaticPaymentFromDb(automaticPaymentId: number, props: IDeleteAutomaticPaymentProps) {
    const token = sessionStorage.getItem("Authentication-Token");
    if(token === null) {
        return;
    }
    fetch(url, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token.toString()
        },
        body: JSON.stringify({
            id: automaticPaymentId
        })
    }).then(response => {
        if(response.status === 200) {
            props.deletePaymentFromList(automaticPaymentId);
        }
    });
}

function DeleteAutomaticPayment (props: IDeleteAutomaticPaymentProps) {
    return <button className="btn btn-link m-0 p-0" onClick={() => {deleteAutomaticPaymentFromDb(props.automaticPaymentId, props)}}><img className="delete-automatic-payment-icon" src={deleteIcon} /></button>
}

export {DeleteAutomaticPayment};
