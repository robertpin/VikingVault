import './ExchangeForm.css';
import React from "react";
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';


interface IExchangeFormState {
    fromCurrency: string;
    toCurrency: string;
    availableAmount: Number;
    toExchangeAmount: Number;
}

class ExchangeForm extends React.Component<any, IExchangeFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            fromCurrency: "RON",
            toCurrency: "EUR",
            availableAmount: 0.00,
            toExchangeAmount: 0.00
        }
    }

    render() {
        return (
            <div>
                <SideBar/>
                <TopBar/>
                <div className="exchange-page-text">Exchange page</div>
                <div className="row exchange-container">
                    <div className="col">
                        <p className="text-decoration">From:</p>
                        <select className="form-control input-field">
                            <option value="1">EUR</option>
                            <option value="2">LEI</option>
                            <option value="3">YEN</option>
                        </select>
                        <div className="badge badge-dark available-amount-div">
                            Available
                            <br/>
                            {this.state.availableAmount.toPrecision(3)} {this.state.fromCurrency}
                        </div>
                        <p className="text-decoration">To:</p>
                        <select className="form-control input-field">
                            <option value="1">EUR</option>
                            <option value="2">LEU</option>
                            <option value="3">YEN</option>
                            <option value="4">USD</option>
                        </select>
                        <p className="text-decoration">Amount to change:</p>
                        <input
                                className="form-control input-field"
                                placeholder="Amount..."
                                type="number"
                                min="0.01"
                                max="100"
                                step="0.01"
                        />
                        <span className="badge badge-info fee-text">Fee today:</span>
                        <button id="exchange-button" className="btn btn-primary">Exchange!</button>
                    </div>
                    <div id="conversion-div" className="col-3">
                        <h3>Conversion rates</h3>
                        Conversion rates for all available currencies.<br/><br/>
                        <h3>1 Romanian LEU</h3>
                        <div>
                            = .... EUR <br/>
                            = .... YEN <br/>
                            = .... USD
                        </div>
                    </div>
                </div>
            </div>
        )}
}

export { ExchangeForm }