import { timeout } from "q";

const constants = {
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://viking-vault.azurewebsites.net/api/' : "https://localhost:44323/",
    ratesRefreshInterval: 5000
}

const currencyEnum = {
    ron: "RON",
    eur: "EUR",
    usd: "USD",
    yen: "YEN"
}

export {constants, currencyEnum};