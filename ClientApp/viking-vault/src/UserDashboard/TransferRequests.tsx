import React from "react";
import { constants } from "../Resources/Constants";
import './TransferFunds/TransferFunds.css';

export interface ITransferRequestData {
    id: number;
    name: string;
    amount: string;
    currency: string;
    details: string;
    cardNumberRequester: string;
}

interface ITransferRequestsListState {
    transferRequests: ITransferRequestData[];
    error: string;
}

interface ITransferRequestsListProps {
    reloadStatus: boolean;
    autoFillTransferRequest: (data: any) => void;
    changeReloading: (reload: boolean) => void;
}

class TransferRequests extends React.Component<ITransferRequestsListProps, ITransferRequestsListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            transferRequests: [],
            error: ""
        }
    }

    componentDidMount() {
        this.getAllRequests();
    }

    private getAllRequests = () => {
        
        let token = sessionStorage.getItem("Authentication-Token");
        
        if(token != null)
        {
            fetch(constants.baseUrl+"transferRequests",{
                method: "GET",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'x-access-token': token.toString()
                }
            })
            .then(response => {
                if(response.status !== 200) {
                    return null;
                }
                return response.json();
            }).then(result => {
                if(result === null) {
                    this.setState({
                        error: "Internal server error! Try refreshing the browser."
                    });
                    return;
                }
                this.setState({
                    transferRequests: result
                });
            });
        }
    }

    reloadData = () =>
    {
        this.getAllRequests();
        this.props.changeReloading(false);
    }

    render() {
        return <div className="w-auto transfer-request-table-align">
            {this.props.reloadStatus === true ? this.reloadData() : null}
            {this.state.error !== ""? <p className="alert alert-danger">{this.state.error}</p> : null}
            <table className="table table-hover w-100">
                <thead>
                    <tr>
                        <th scope="col">From</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Currency</th>
                        <th scope="col">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.transferRequests.map( (transferRequest) => {
                        return <tr className="requests-table-row" key={transferRequest.id} onClick = {() => this.props.autoFillTransferRequest(transferRequest)}>
                            <td>{transferRequest.name}</td>
                            <td>{transferRequest.amount}</td>
                            <td>{transferRequest.currency}</td>
                            <td className = "transfer-details-decoration">{transferRequest.details}</td>
                        </tr>;
                    })}
                </tbody>
            </table>
        </div> 
        
    }
}

export default TransferRequests;
