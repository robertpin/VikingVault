const constants = {
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://softwarepro.azurewebsites.net/api/api' : "https://localhost:44323/api/"
}

export {constants};