import './ExchangeForm.css';
import React from "react";
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';

interface IExchangeFormState {
    fromCurrency: string;
    toCurrency: string;
    currencyToRon: Number;
    currencyToEur: Number;
    currencyToUsd: Number;
    currencyToYen: Number;
    availableAmountFromCurrency: Number;
    availableAmountToCurrency: Number;
    toExchangeAmount: Number;
    maximumValueToBeChanged: Number;
    fee: Number;

}

class ExchangeForm extends React.Component<any, IExchangeFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            fromCurrency: "EUR",
            toCurrency: "EUR",
            currencyToRon: 0.00,
            currencyToEur: 0.00,
            currencyToUsd: 0.00,
            currencyToYen: 0.00,
            availableAmountFromCurrency: 0.00,
            availableAmountToCurrency: 0.00,
            toExchangeAmount: 0.00,
            maximumValueToBeChanged: 0.00,
            fee: 5
        }
    }

    getCurrentDay() {
        var date = new Date(); 
        return date.toString().split(" ")[0];
    }

    setFeeBasedOnDays() {
        if(this.getCurrentDay() === "Fri" || this.getCurrentDay() === 'Sat' || this.getCurrentDay() === 'Sun')
        {
            this.setState({
                fee: 10
            });
        }
        else {
            this.setState({
                fee: 5
            });
        }
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

    getMaximumValueToBeChanged() {
        // pe asta tre s-o iau din baza de date, din accounts
        let token = sessionStorage.getItem('Authentication-Token');
        if(token != null) {
            fetch("https://localhost:44323/api/bankAccount", {
                method: "GET",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'x-access-token': token.toString()
                }
            })
            .then(response => response.json())
            .then(result => {
               alert("HI!" + result.toString());
            });
        }
    }

    exchange(){
    }
 
    componentDidMount() {
        this.setFeeBasedOnDays();
        this.getCurrencyRates();
        setInterval(() => {
            this.getCurrencyRates();
        }, 5000);
        this.getMaximumValueToBeChanged();
    }

    render() {
        return (
            <div className="background-div">
                <SideBar/>
                <TopBar/>
                <div className="containing-div">
                <div className="container"> 
                    <div className="row"> 
                        <div className="col-4 left-column"> {/* Left column */}

                        <div className="container"> 
                            <div className="row"> 
                                <div className="col"> {/* Sell column */}
                                    <p className="text-decoration">Sell</p>
                                    <select className="form-control input-field" onChange={this.setCurrencyToBeExchanged}>
                                        <option value="EUR">EUR</option>
                                        <option value="RON">RON</option>
                                        <option value="YEN">YEN</option>
                                        <option value="USD">USD</option>
                                    </select>
                                    <div>
                                        <p className="total-balance">{this.state.availableAmountFromCurrency.toPrecision(3)}</p>
                                        <p className="total-balance-text">Total balance</p>
                                    </div>
                                </div>
                                <div className="col"> {/* Buy column */}
                                    <p className="text-decoration">Buy</p>
                                    <select className="form-control input-field" onChange={this.setCurrencyToExchangeIn}>
                                        <option value="EUR">EUR</option>
                                        <option value="RON">RON</option>
                                        <option value="YEN">YEN</option>
                                        <option value="USD">USD</option>
                                    </select>
                                    <div>
                                        <p className="total-balance">{this.state.availableAmountFromCurrency.toPrecision(3)}</p>
                                        <p className="total-balance-text">Total balance</p>
                                    </div>
                                </div> 
                            </div> 
                            
                            <div id="amount-div">
                                <p className="text-decoration">Amount</p>
                                <input
                                        className="form-control input-shadow"
                                        placeholder=""
                                        type="number"
                                        min="1"
                                        max={this.state.maximumValueToBeChanged.toString()}
                                        step="0.01"
                                        onChange={this.setAmountOfMoneyToBeChanged}
                                />
                            </div>
                            
                            <span className="badge badge-info fee-text">Fee today: {this.state.fee}%</span>
                            <button id="exchange-button" className="btn btn-primary" onClick={this.exchange}>Exchange!</button>
                        </div>
                        </div>
                            <div className="col-4 right-column">  {/* Right column */}
                                <table id="exchange-table">
                                    <tbody>
                                    <tr className="padding-design">
                                        <th className="text-decoration">Exchange rates for {this.state.fromCurrency}</th>
                                    </tr>
                                    <tr className="padding-design">
                                        <th className="table-text padding-design">Currency</th>
                                        <th className="table-text padding-design">Exchange Rate</th>
                                    </tr>
                                    <tr className="padding-design">
                                        <td className="currency-decoration padding-design">{this.state.fromCurrency === "RON"? null : `RON`}</td>
                                        <td className="table-design padding-design">{this.state.fromCurrency === "RON"? null : `${this.state.currencyToRon}`}</td>
                                    </tr>
                                    <tr className="padding-design">
                                        <td className="currency-decoration padding-design">{this.state.fromCurrency === "EUR"? null : `EUR`}</td>
                                        <td className="table-design padding-design">{this.state.fromCurrency === "EUR"? null : `${this.state.currencyToEur}`}</td>
                                    </tr>
                                    <tr className="padding-design">
                                        <td className="currency-decoration padding-design">{this.state.fromCurrency === "USD"? null : `USD`}</td>
                                        <td className="table-design padding-design">{this.state.fromCurrency === "USD"? null : `${this.state.currencyToUsd}`}</td>
                                    </tr>
                                    <tr className="padding-design">
                                        <td className="currency-decoration padding-design">{this.state.fromCurrency === "YEN"? null : `YEN`}</td>
                                        <td className="table-design padding-design">{this.state.fromCurrency === "YEN"? null : `${this.state.currencyToYen}`}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div> 
                    </div> 
                </div>
        </div>
        )}
}

export { ExchangeForm }