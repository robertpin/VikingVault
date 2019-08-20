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
        private readonly IUserService _userService;

        public BankAccountService(VikingVaultDbContext dbContext, IUserService userService)
        {
            _dbContext = dbContext;
            _userService = userService;
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

        public BankAccount ChangeBalance(string email, UpdateBankAccountModel updatedBankAccount)
        {
            var bankAccountOwner = _dbContext.User.SingleOrDefault(user => user.Email == email);
            var oldBankAccount = _dbContext.BankAccount.SingleOrDefault(bank => bank.User == bankAccountOwner && bank.CurrencyType == updatedBankAccount.CurrencyType);
            oldBankAccount.Balance += updatedBankAccount.Amount;
            UpdateBankAccount();
            return oldBankAccount;
        }

        public BankAccount AddMoneyToAccount(int userId, string currency, float amountAdded)
        {
            var user = _userService.GetById(userId);

            var updatedAccount = new UpdateBankAccountModel
            {
                CurrencyType = currency,
                Amount = amountAdded
            };

            return ChangeBalance(user.Email, updatedAccount);
        }

        public BankAccount RetractMoneyFromAccount(string accountEmail, string currency, float amountSubstracted)
        {
            var updatedAccount = new UpdateBankAccountModel
            {
                CurrencyType = currency,
                Amount = -amountSubstracted
            };

            return ChangeBalance(accountEmail, updatedAccount);
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
