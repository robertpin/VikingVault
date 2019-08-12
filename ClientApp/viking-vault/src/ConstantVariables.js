const constants = {
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://viking-vault.azurewebsites.net/api/api/' : "https://localhost:44323/api/"
}

export {constants};