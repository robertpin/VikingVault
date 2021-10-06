import { timeout } from "q";

const constants = {
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://viking-vault.azurewebsites.net/api/' : "https://localhost:44323/",
    ratesRefreshInterval: 2500,
    regexCheckIfPositiveFloat : /^(?:[1-9][0-9]*|0)?(?:\.[0-9]+)?$/,
}

const currencyEnum = {
    ron: "RON",
    eur: "EUR",
    usd: "USD",
    yen: "YEN"
}

const transactionTypeEnum = {
    transfer: "transfer",
    exchange: "exchange",
    payment: "payment"
}

export {constants, currencyEnum, transactionTypeEnum};

