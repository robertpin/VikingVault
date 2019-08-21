using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;

namespace VikingVault.Services
{
    public class ExchangeService : IExchangeService
    {
        private readonly VikingVaultDbContext _dbContext;
        private readonly IBankAccountService _bankAccountService;
        private readonly ITransactionService _transactionService;

        public ExchangeService(VikingVaultDbContext dbContext, IBankAccountService bankAccountService, ITransactionService transactionService)
        {
            _dbContext = dbContext;
            _bankAccountService = bankAccountService;
            _transactionService = transactionService;
        }

        public List<BankAccount> Exchange(string token, UpdateBankAccountModel bankAccountModelSell, UpdateBankAccountModel bankAccountModelBuy, UpdateBankAccountModel exchangeInfo)
        {
            var tokenObject = new JwtSecurityToken(token);
            string userId = tokenObject.Payload["Id"].ToString();
            var returnedUser = _dbContext.User.SingleOrDefault(u => u.Id == Int32.Parse(userId));

            bankAccountModelBuy.Email = returnedUser.Email;
            bankAccountModelSell.Email = returnedUser.Email;

            List<BankAccount> bankAccounts = new List<BankAccount>();
            BankAccount bankAccountSell = _bankAccountService.ChangeBalance(bankAccountModelSell);
            BankAccount bankAccountBuy = _bankAccountService.ChangeBalance(bankAccountModelBuy);
            bankAccounts.Add(bankAccountSell);
            bankAccounts.Add(bankAccountBuy);       

            Transaction transaction = new Transaction
            {
                User = returnedUser,
                Type = "Exchange",
                Currency = bankAccountSell.CurrencyType,
                Date = DateTime.Now,
                Amount = exchangeInfo.Amount,
                OtherParty = exchangeInfo.CurrencyType
            };

            _transactionService.AddTransaction(transaction);
            return bankAccounts;
        }
    }
}
