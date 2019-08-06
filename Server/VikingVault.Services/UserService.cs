using System;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;
using Microsoft.EntityFrameworkCore;
using VikingVault.Services.Exceptions;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using VikingVault.Services.Utils;

namespace VikingVault.Services
{
    public class UserService : IUserService
    {
        private readonly VikingVaultDbContext _dbContext;
        private readonly IBankAccountService _bankAccountService;

        public UserService(VikingVaultDbContext dbContext, IBankAccountService bankAccountService)
        {
            _dbContext = dbContext;
            _bankAccountService = bankAccountService;
        }

        public User CreateUser(User user)
        {
            user.Role = "user";
            user.Password = PasswordEncryption.ComputeSha256Hash(user.Password);

            BankAccount ronBankAccount = new BankAccount
            {
                User = user,
                CurrencyType = "ron",
                Balance = 0.0f,
            };

            BankAccount eurBankAccount = new BankAccount
            {
                User = user,
                CurrencyType = "eur",
                Balance = 0.0f,
            };

            BankAccount usdBankAccount = new BankAccount
            {
                User = user,
                CurrencyType = "usd",
                Balance = 0.0f,
            };

            BankAccount yenBankAccount = new BankAccount
            {
                User = user,
                CurrencyType = "yen",
                Balance = 0.0f,
            };


            try
            {
                _dbContext.Add(user);

                _bankAccountService.createBankAccount(ronBankAccount);
                _bankAccountService.createBankAccount(eurBankAccount);
                _bankAccountService.createBankAccount(usdBankAccount);
                _bankAccountService.createBankAccount(yenBankAccount);

                _dbContext.SaveChanges();
            }

            catch(Exception e)
            {
                if (e is DbUpdateException || e is DbUpdateConcurrencyException || e is BankAccountServiceException) throw new UserServiceException();
            }
            return user;
        }

        public User GetById(int userId)
        {
            return _dbContext.User.Find(userId);
        }
    }
}
