import './ExchangeForm.css';
import React from "react";
import SideBar from '../Common/SideBar';
import TopBar from '../Common/TopBar';
import ExchangeResponseModal from './ExchangeResponseModal';
import UserIcon from '../Common/UserIcon';
import {constants, currencyEnum} from '../Resources/Constants';

const EXCHANGE_URL = `${constants.baseUrl}exchange`;
const BANK_ACCOUNT_URL = `${constants.baseUrl}bankAccount`;

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
    openModal: boolean;
    modalMessage: string;
    loading: boolean;
    exchangedAmount: number;
}

class ExchangeForm extends React.Component<any, IExchangeFormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            fromCurrency: currencyEnum.eur,
            toCurrency: currencyEnum.eur,
            currencyToRon: 0.00,
            currencyToEur: 0.00,
            currencyToUsd: 0.00,
            currencyToYen: 0.00,
            availableAmountFromCurrency: 0.00,
            availableAmountToCurrency: 0.00,
            toExchangeAmount: 0.00,
            maximumValueToBeChanged: 0.00,
            fee: 5,
            openModal: false,
            modalMessage: "",
            loading: false,
            exchangedAmount: 0
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
        this.setState({
            loading: true
        });
        var base = this.state.fromCurrency;
        if(base === currencyEnum.yen) {
            base = "JPY"
        }
        fetch("https://api.exchangeratesapi.io/latest?base="+base)
        .then(response => response.json())
        .then(data => {
            if(base === "EUR") {
                data.rates.EUR = 1.00
            }
            this.setState({ 
                currencyToRon: data.rates.RON.toFixed(3),
                currencyToEur: data.rates.EUR.toFixed(3),
                currencyToUsd: data.rates.USD.toFixed(3),
                currencyToYen: data.rates.JPY.toFixed(3),
                loading: false
             })
        });
    }

    setCurrencyToExchangeIn = (e:any) => {
        this.setState({
            toCurrency: e.target.value
        }, () => {
            this.calculateExchangedAmount();
        });
        this.getMaximumValueToChangeInto();
    }

    setCurrencyToBeExchanged = (e:any) => {
        this.setState({
            fromCurrency: e.target.value,
        }, () => {
            this.getCurrencyRates();
            this.getMaximumValueToBeChanged();
            this.calculateExchangedAmount();
        });
        
    }

    setAmountOfMoneyToBeChanged = (e:any) => {
        this.setState({
            toExchangeAmount: e.target.value
        }, () => {
            this.calculateExchangedAmount();
        });
    }

    getMaximumValueToBeChanged() {
        let token = sessionStorage.getItem('Authentication-Token');
        if(token != null) {
            fetch(BANK_ACCOUNT_URL, {
                method: "GET",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'x-access-token': token.toString()
                }
            })
            .then(response => response.json())
            .then(result => {
                if(this.state.fromCurrency === currencyEnum.ron) {
                    this.setState({
                        availableAmountFromCurrency: result[0].balance
                    });
                }
                if(this.state.fromCurrency === currencyEnum.eur) {
                    this.setState({
                        availableAmountFromCurrency: result[1].balance
                    });
                }
                if(this.state.fromCurrency === currencyEnum.usd) {
                    this.setState({
                        availableAmountFromCurrency: result[2].balance
                    });
                }
                if(this.state.fromCurrency === currencyEnum.yen) {
                    this.setState({
                        availableAmountFromCurrency: result[3].balance
                    });
                }
            });
        }
    }

    getMaximumValueToChangeInto() {
        let token = sessionStorage.getItem('Authentication-Token');
        if(token != null) {
            fetch(BANK_ACCOUNT_URL, {
                method: "GET",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'x-access-token': token.toString()
                }
            })
            .then(response => response.json())
            .then(result => {
                if(this.state.toCurrency === currencyEnum.ron) {
                    this.setState({
                        availableAmountToCurrency: result[0].balance
                    });
                }
                if(this.state.toCurrency === currencyEnum.eur) {
                    this.setState({
                        availableAmountToCurrency: result[1].balance
                    });
                }
                if(this.state.toCurrency === currencyEnum.usd) {
                    this.setState({
                        availableAmountToCurrency: result[2].balance
                    });
                }
                if(this.state.toCurrency === currencyEnum.yen) {
                    this.setState({
                        availableAmountToCurrency: result[3].balance
                    });
                }
            });
        }
    }

    getCurrencyExchangeRate = () => {
        var value = "0";
        if(this.state.toCurrency === currencyEnum.ron) {
            value = this.state.currencyToRon.toString();
        }
        if(this.state.toCurrency === currencyEnum.eur) {
            value = this.state.currencyToEur.toString();
        }
        if(this.state.toCurrency === currencyEnum.usd) {
            value = this.state.currencyToUsd.toString();
        }
        if(this.state.toCurrency === currencyEnum.yen) {
            value = this.state.currencyToYen.toString();
        }
        return Number(value);
    }

    calculateExchangedBalance = (exchangeRate: Number, amount: Number) => {
        return +exchangeRate * +amount;
    }

    extractBanksFeeFromBalance = (balance: Number) => {
        return +balance - ((+this.state.fee*+balance)/100);
    }

    private calculateExchangedAmount = () => {
        var exchangeRate = this.getCurrencyExchangeRate();
        var balance = this.calculateExchangedBalance(exchangeRate, this.state.toExchangeAmount);
        balance = this.extractBanksFeeFromBalance(balance);
        this.setState({
            exchangedAmount: +balance.toFixed(3)
        })
    }

    exchange = () => {
        if(this.state.fromCurrency === this.state.toCurrency){
            this.setState({
                openModal: true,
                modalMessage: "The sell and buy currency must be different!"
            })
        }
        else if(this.state.toExchangeAmount <= 0) {
            this.setState({
                openModal: true,
                modalMessage:  "The amount of money to exchange must be a positive number!"
            })
        }
        else if(this.state.toExchangeAmount > this.state.availableAmountFromCurrency) {
            this.setState({
                openModal: true,
                modalMessage:  "Not enough funds to perform the exchange!"
            })
        }
        else
        {
            var amount = this.state.exchangedAmount.toFixed(2);
            let otherParty = `Exchanged ${this.state.toExchangeAmount} ${this.state.fromCurrency}`;

            let token = sessionStorage.getItem('Authentication-Token');
            if(token != null) {
                fetch(EXCHANGE_URL, {
                    method: "POST",
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token.toString()
                    },
                    body: JSON.stringify([  
                        {  
                            "currencyType": this.state.fromCurrency,
                            "amount": -this.state.toExchangeAmount,
                            "email":""
                        },
                        {  
                            "currencyType": this.state.toCurrency,
                            "amount": +this.state.exchangedAmount,
                            "email":""
                        },
                        {
                            "currencyType": otherParty,
                            "amount": amount,
                            "email":""
                        }
                    ])
                })
                .then(response => response.json())
                .then(result => {
                    if(result != null) {
                        this.setState({
                            openModal: true,
                            modalMessage: "Exchange successful! " +
                            this.state.toExchangeAmount + " " + this.state.fromCurrency + " exchanged to " + this.state.exchangedAmount.toFixed(3) + " " + this.state.toCurrency
                        })
                        this.getMaximumValueToBeChanged();
                        this.getMaximumValueToChangeInto();
                    }
                    else {
                        this.setState({
                            openModal: true,
                            modalMessage: "Couldn't exchange the money!"
                        })
                    }
                })
            }
        }
    }
 
    closeModal = () => {
        this.setState({
            openModal: false,
            modalMessage: ""
        });
    }

    componentDidMount() {
        this.setFeeBasedOnDays();
        this.getCurrencyRates();
        setInterval(() => {
            this.getCurrencyRates();
        }, 5000);
        this.getMaximumValueToBeChanged();
        this.getMaximumValueToChangeInto();
    }

    render() {
        return (
            <div className="exchange-page-background">
                <SideBar userType="user"/>
                <TopBar />
                <UserIcon />
                <ExchangeResponseModal open={this.state.openModal} closeModal={this.closeModal} message={this.state.modalMessage} />
                <div className="white-box">
                    <div className="container"> 
                        <div className="row"> 
                            <div className="col-4 left-column"> {/* Left column */}
                                <div className="container"> 
                                    <div className="row"> 
                                        <div className="col"> {/* Sell column */}
                                            <p className="text-decoration font-750">Sell</p>
                                            <select className="form-control form-control-currency input-field font-750" onChange={this.setCurrencyToBeExchanged}>
                                                <option value="EUR">EUR</option>
                                                <option value="RON">RON</option>
                                                <option value="YEN">YEN</option>
                                                <option value="USD">USD</option>
                                            </select>
                                            <div>
                                                <p className="total-balance font-750">{this.state.availableAmountFromCurrency.toFixed(3)}</p>
                                                <p className="total-balance-text">Total balance</p>
                                            </div>
                                        </div>
                                        <div className="col"> {/* Buy column */}
                                            <p className="text-decoration font-750">Buy</p>
                                            <select className="form-control form-control-currency input-field font-750" onChange={this.setCurrencyToExchangeIn}>
                                                <option value="EUR">EUR</option>
                                                <option value="RON">RON</option>
                                                <option value="YEN">YEN</option>
                                                <option value="USD">USD</option>
                                            </select>
                                            <div>
                                                <p className="total-balance font-750">{this.state.availableAmountToCurrency.toFixed(3)}</p>
                                                <p className="total-balance-text">Total balance</p>
                                            </div>
                                        </div> 
                                    </div> 
                                    <div id="amount-container">
                                        <p className="text-decoration font-750">Amount</p>
                                        <input
                                                className="form-control form-control-currency input-shadow d-inline font-750"
                                                placeholder=""
                                                type="number"
                                                min="1"
                                                pattern="^[0-9]"
                                                max={this.state.availableAmountFromCurrency.toString()}
                                                step="0.01"
                                                onChange={this.setAmountOfMoneyToBeChanged}
                                        />
                                        <p className="d-inline exchanged-amount font-750">&emsp;&emsp;{` =       ${this.state.exchangedAmount}`}</p>
                                    </div>
                                    <span className="badge badge-info fee-text">Fee today: {this.state.fee}%</span>
                                    <button id="exchange-button" className="btn btn-primary font-750" onClick={this.exchange}>Exchange!</button>
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
                                        {this.state.fromCurrency === currencyEnum.ron ? null : 
                                            <tr className="padding-design">
                                                <td className="currency-decoration padding-design font-750">{`RON`}</td>
                                                <td className="table-design padding-design font-750">{this.state.loading? "Loading.." : `${this.state.currencyToRon}`}</td>
                                            </tr>
                                        }
                                        {this.state.fromCurrency === currencyEnum.eur ? null : 
                                            <tr className="padding-design">
                                                <td className="currency-decoration padding-design font-750">{`EUR`}</td>
                                                <td className="table-design padding-design font-750">{this.state.loading? "Loading.." : `${this.state.currencyToEur}`}</td>
                                            </tr>
                                        }
                                        {this.state.fromCurrency === currencyEnum.usd ? null : 
                                            <tr className="padding-design">
                                                <td className="currency-decoration padding-design font-750">{`USD`}</td>
                                                <td className="table-design padding-design font-750">{this.state.loading? "Loading.." : `${this.state.currencyToUsd}`}</td>
                                            </tr>
                                        }
                                        {this.state.fromCurrency === currencyEnum.yen ? null : 
                                            <tr className="padding-design">
                                                <td className="currency-decoration padding-design font-750">{`YEN`}</td>
                                                <td className="table-design padding-design font-750">{this.state.loading? "Loading.." : `${this.state.currencyToYen}`}</td>
                                            </tr>
                                        }
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