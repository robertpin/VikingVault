import React from "react";
import deleteIcon from "../../Resources/images/delete.png";
import { constants } from "../../Resources/Constants";

interface IDeleteCompanyProps {
    companyId: number;
    changeReloading: (reloading: boolean) => void;
}

function deleteCompanyFromDB(companyId: number, props: IDeleteCompanyProps) {
    const token = sessionStorage.getItem("Authentication-Token");
    if(token === null) {
        return;
    }
    fetch(constants.baseUrl+"company", {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token.toString()
        },
        body: JSON.stringify(companyId)
    }).then(response => {
        if(response.status === 200) {
            props.changeReloading(true);
        }
    });
}

function DeleteCompany (props: IDeleteCompanyProps) {
    return <button className="btn btn-link m-0 p-0" onClick={() => {deleteCompanyFromDB(props.companyId, props)}}><img className="w-50" src={deleteIcon} /></button>
}

export {DeleteCompany};
