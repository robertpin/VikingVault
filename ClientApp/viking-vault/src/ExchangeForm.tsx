import './ExchangeForm.css';
import React from "react";
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import { throwStatement } from '@babel/types';


interface IExchangeFormState {
    fromCurrency: string;
    toCurrency: string;
    currencyToRon: Number;
    currencyToEur: Number;
    currencyToUsd: Number;
    currencyToYen: Number;
    availableAmount: Number;
    toExchangeAmount: Number;
    maximumValueToBeChanged: Number;

}

class ExchangeForm extends React.Component<any, IExchangeFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            fromCurrency: "RON",
            toCurrency: "EUR",
            currencyToRon: 0.00,
            currencyToEur: 0.00,
            currencyToUsd: 0.00,
            currencyToYen: 0.00,
            availableAmount: 0.00,
            toExchangeAmount: 0.00,
            maximumValueToBeChanged: 0.00
        }
    }

    getMaximumValueToBeChanged() {
        // pe asta tre s-o iau din baza de date, din accounts
    }

    exchange(){
    }

    getCurrencyRates() {
        var base = this.state.fromCurrency;
        if(base === "YEN") {
            base = "JPY"
        }
        fetch("https://api.exchangeratesapi.io/latest?base="+base)
        .then(response => response.json())
        .then(data => {
            if(base === "EUR") {
                data.rates.EUR = 1.00
            }
            this.setState({ 
                currencyToRon: data.rates.RON.toPrecision(3),
                currencyToEur: data.rates.EUR.toPrecision(3),
                currencyToUsd: data.rates.USD.toPrecision(3),
                currencyToYen: data.rates.JPY.toPrecision(3)
             })
        });
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
        this.getCurrencyRates();
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
                        <h3>1 {this.state.fromCurrency}</h3>
                        <div>
                            <p>{this.state.fromCurrency === "RON"? null : `= ${this.state.currencyToRon} RON`}</p>
                            <p>{this.state.fromCurrency === "EUR"? null : `= ${this.state.currencyToEur} EUR`}</p>
                            <p>{this.state.fromCurrency === "USD"? null : `= ${this.state.currencyToUsd} USD`}</p>
                            <p>{this.state.fromCurrency === "YEN"? null : `= ${this.state.currencyToYen} YEN`}</p>
                        </div>
                    </div>
                </div>
            </div>
        )}
}

export { ExchangeForm }