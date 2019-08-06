using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;
using VikingVault.Services.Exceptions;

namespace VikingVault.Services
{
    public class BankAccountService : IBankAccountService
    {
        private readonly VikingVaultDbContext _dbContext;

        public BankAccountService(VikingVaultDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public BankAccount createBankAccount(BankAccount account)
        {
            try
            {
                _dbContext.Add(account);
                _dbContext.SaveChanges();
            }
            catch (Exception e)
            {
                if (e is DbUpdateException || e is DbUpdateConcurrencyException) throw new BankAccountServiceException();
            }
            return account;
        }
    }
}
