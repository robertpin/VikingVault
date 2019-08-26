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
    public class BankAccountService : IBankAccountService
    {
        private readonly VikingVaultDbContext _dbContext;

        public BankAccountService(VikingVaultDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public BankAccount CreateBankAccount(BankAccount account)
        {
            try
            {
                _dbContext.Add(account);
                _dbContext.SaveChanges();
            }
            catch (Exception e)
            {
                if (e is DbUpdateException || e is DbUpdateConcurrencyException)
                {
                    throw new BankAccountServiceException();
                }
            }
            return account;
        }

        public List<BankAccount> GetBankAccounts(string token)
        {
            var tokenObject = new JwtSecurityToken(token);
            string userId = tokenObject.Payload["Id"].ToString();
            var returnedUser = _dbContext.User.Find(Int32.Parse(userId));
            var bankAccounts = _dbContext.BankAccount.Where(account => account.User == returnedUser).ToList();
            return bankAccounts;
        }

        public BankAccount ChangeBalance(UpdateBankAccountModel updatedBankAccount)
        {
            var bankAccountOwner = _dbContext.User.SingleOrDefault(user => user.Email == updatedBankAccount.Email);
            var oldBankAccount = _dbContext.BankAccount.SingleOrDefault(bank => bank.User == bankAccountOwner && bank.CurrencyType == updatedBankAccount.CurrencyType);
            oldBankAccount.Balance += updatedBankAccount.Amount;
            UpdateBankAccount();
            return oldBankAccount;
        }

        public BankAccount AddMoneyToUser(User user, string currency, float amountAdded)
        {
            var updatedAccount = new UpdateBankAccountModel
            {
                CurrencyType = currency,
                Amount = amountAdded,
                Email = user.Email
            };

            return ChangeBalance(updatedAccount);
        }

        public BankAccount RetractMoneyFromUser(User user, string currency, float amountSubstracted)
        {
            var updatedAccount = new UpdateBankAccountModel
            {
                CurrencyType = currency,
                Amount = -amountSubstracted,
                Email = user.Email
            };

            BankAccount currentAccount = _dbContext.BankAccount.SingleOrDefault(account => account.CurrencyType == updatedAccount.CurrencyType && account.User == user);

            if ((currentAccount.Balance + updatedAccount.Amount) < 0)
            {
                throw new TransactionException("Not enough funds to complete the transaction!");
            }

            return ChangeBalance(updatedAccount);
        }

        public void UpdateBankAccount()
        {
            try
            {
                _dbContext.SaveChanges();
            }
            catch (Exception e)
            {
                if (e is DbUpdateException || e is DbUpdateConcurrencyException)
                {
                    throw new BankAccountServiceException();
                }
            }
        }
    }
}
