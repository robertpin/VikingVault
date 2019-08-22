using System;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;
using Microsoft.EntityFrameworkCore;
using VikingVault.Services.Exceptions;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using VikingVault.Services.Utils;
using VikingVault.DataAccess.Enums;
using System.Linq;

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

        public User CreateUser(UserDTO user)
        {
            Role userRole = _dbContext.Roles.Find(2);
            User userToBeInserted = new User
            {
                Email = user.Email,
                Password = PasswordEncryption.ComputeSha256Hash(user.Password),
                FirstName = user.FirstName,
                LastName = user.LastName,
                PictureLink = user.PictureLink,
                Address = user.Address,
                Cnp = user.Cnp,
                Role = userRole
            };

            try
            {
                _dbContext.Add(userToBeInserted);

                _bankAccountService.CreateBankAccount(this.CreateBankAccount(userToBeInserted, CurrencyEnum.Ron.ToString()));
                _bankAccountService.CreateBankAccount(this.CreateBankAccount(userToBeInserted, CurrencyEnum.Eur.ToString()));
                _bankAccountService.CreateBankAccount(this.CreateBankAccount(userToBeInserted, CurrencyEnum.Usd.ToString()));
                _bankAccountService.CreateBankAccount(this.CreateBankAccount(userToBeInserted, CurrencyEnum.Yen.ToString()));

                _dbContext.SaveChanges();
            }

            catch(Exception e)
            {
                if (e is DbUpdateException || e is DbUpdateConcurrencyException || e is BankAccountServiceException)
                {
                    throw new UserServiceException(e.Message);
                }
            }
            return userToBeInserted;
        }

        public User GetById(int userId)
        {
            return _dbContext.User.Find(userId);
        }

        private BankAccount CreateBankAccount(User user, String currencyType)
        {
            return new BankAccount
            {
                User = user,
                CurrencyType = currencyType,
                Balance = 0.0f
            };
        }

        public void DeleteUser(UserEmail userEmail)
        {
            try
            {
                User userToDelete = _dbContext.User.SingleOrDefault(user => user.Email == userEmail.Email);
                _dbContext.Remove(userToDelete);
                _dbContext.SaveChanges();
            }
            catch (Exception e)
            {
                throw new UserServiceException(e.Message);
            }
        }
    }
}
