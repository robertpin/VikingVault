import React from "react";
import { constants } from "../../Resources/Constants";

interface ICompanyData {
    name: string;
    address: string;
    balance: string;
}

interface ICompaniesListState {
    companies: ICompanyData[];
    error: string;
}

interface ICompaniesListProps {
    reload: boolean;
    changeReloading: (reloading: boolean) => void;
}

class CompaniesList extends React.Component<ICompaniesListProps, ICompaniesListState> {
    constructor(props: ICompaniesListProps) {
        super(props);
        this.state = {
            companies: [],
            error: ""
        }
    }

    componentDidMount() {
        this.getAllCompanies();
    }

    private getAllCompanies = () => {
        fetch(constants.baseUrl+"company",{
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
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
                companies: result
            });
        });
    }

    reloadData = () => {
        this.getAllCompanies();
        this.props.changeReloading(false);
    }

    render() {
        return <div className="m-4 w-auto">
            {this.props.reload? this.reloadData() : null}
            {this.state.error !== ""? <p className="alert alert-danger">{this.state.error}</p> : null}
            <table className="table table-striped w-75">
                <thead>
                    <tr>
                        <th scope="col">Company name</th>
                        <th scope="col">Company address</th>
                        <th scope="col">Company balance</th>
                        <th scope="col">Delete company</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.companies.map( (company) => {
                        return <tr>
                            <td>{company.name}</td>
                            <td>{company.address}</td>
                            <td>{`${company.balance} RON`}</td>
                            <td></td>
                        </tr>;
                    })}
                </tbody>
            </table>
        </div> 
        
    }
}

export {CompaniesList};