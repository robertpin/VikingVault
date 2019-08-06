import './ExchangeForm.css';
import React from "react";
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import { throwStatement } from '@babel/types';


interface IExchangeFormState {
    fromCurrency: string;
    toCurrency: string;
    availableAmount: Number;
    toExchangeAmount: Number;
    ronToEur: Number;
    ronToUsd: Number;
    ronToYen: Number;
    maximumValueToBeChanged: Number;

}

class ExchangeForm extends React.Component<any, IExchangeFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            fromCurrency: "RON",
            toCurrency: "EUR",
            availableAmount: 0.00,
            toExchangeAmount: 0.00,
            ronToEur: 0.00,
            ronToUsd: 0.00,
            ronToYen: 0.00,
            maximumValueToBeChanged: 0.00
        }
    }

    getMaximumValueToBeChanged() {
        // pe asta tre s-o iau din baza de date, din accounts
    }

    exchange(){
    }

    getCurrencyRates() {
        fetch('https://api.exchangeratesapi.io/latest?base=RON')
        .then(response => response.json())
        .then(data => this.setState({ 
            ronToEur: data.rates.EUR.toPrecision(3),
            ronToUsd: data.rates.USD.toPrecision(3),
            ronToYen: data.rates.JPY.toPrecision(3)
         }));
    }
 
    componentDidMount() {
        this.getCurrencyRates();
        setInterval(() => {
            this.getCurrencyRates();
        }, 5000);
    }

    setCurrencyToExchangeIn = (e:any) => {
        this.setState({
            toCurrency: e.target.value
        });
    }

    setCurrencyToBeExchanged = (e:any) => {
        this.setState({
            fromCurrency: e.target.value
        });
    }

    setAmountOfMoneyToBeChanged = (e:any) => {
        this.setState({
            toExchangeAmount: e.target.value
        });
    }

    render() {
        return (
            <div>
                <SideBar/>
                <TopBar/>
                <div className="exchange-page-text">Exchange</div>
                <div className="row exchange-container">
                    <div className="col">
                        <p className="text-decoration">From:</p>
                        <select className="form-control input-field" onChange={this.setCurrencyToBeExchanged}>
                            <option value="EUR">EUR</option>
                            <option value="RON">RON</option>
                            <option value="YEN">YEN</option>
                            <option value="USD">USD</option>
                        </select>
                        <div className="badge badge-dark available-amount-div">
                            Available
                            <br/>
                            {this.state.availableAmount.toPrecision(3)} {this.state.fromCurrency}
                        </div>
                        <p className="text-decoration">To:</p>
                        <select className="form-control input-field" onChange={this.setCurrencyToExchangeIn}>
                            <option value="EUR">EUR</option>
                            <option value="RON">RON</option>
                            <option value="YEN">YEN</option>
                            <option value="USD">USD</option>
                        </select>
                        <p className="text-decoration">Amount to change:</p>
                        <input
                                className="form-control input-field"
                                placeholder="Amount..."
                                type="number"
                                min="1"
                                max={this.state.maximumValueToBeChanged.toString()}
                                step="0.01"
                                onChange={this.setAmountOfMoneyToBeChanged}
                        />
                        <span className="badge badge-info fee-text">Fee today:</span>
                        <button id="exchange-button" className="btn btn-primary" onClick={this.exchange}>Exchange!</button>
                    </div>
                    <div id="conversion-div" className="col-3">
                        <h3>Conversion rates</h3>
                        Conversion rates for all available currencies.<br/><br/>
                        <h3>1 Romanian RON</h3>
                        <div>
                            = {this.state.ronToEur} EUR<br/>
                            = {this.state.ronToUsd} USD<br/>
                            = {this.state.ronToYen} YEN
                        </div>
                    </div>
                </div>
            </div>
        )}
}

export { ExchangeForm }