using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;
using VikingVault.Services.Exceptions;

namespace VikingVault.Services
{
    public class ExchangeService : IExchangeService
    {
        private readonly VikingVaultDbContext _dbContext;
        private readonly IBankAccountService _bankAccountService;

        public ExchangeService(VikingVaultDbContext dbContext, IBankAccountService bankAccountService)
        {
            _dbContext = dbContext;
            _bankAccountService = bankAccountService;
        }

        public List<BankAccount> Exchange(string token, UpdateBankAccountModel bankAccountModelSell, UpdateBankAccountModel bankAccountModelBuy)
        {
            List<BankAccount> bankAccounts = new List<BankAccount>();
            BankAccount bankAccountSell = _bankAccountService.UpdateBankAccount(token, bankAccountModelSell);
            BankAccount bankAccountBuy = _bankAccountService.UpdateBankAccount(token, bankAccountModelBuy);
            bankAccounts.Add(bankAccountSell);
            bankAccounts.Add(bankAccountBuy);
            return bankAccounts;
        }
    }
}
