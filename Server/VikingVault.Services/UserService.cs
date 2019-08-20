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
using System.IdentityModel.Tokens.Jwt;

namespace VikingVault.Services
{
    public class UserService : IUserService
    {
        private readonly VikingVaultDbContext _dbContext;
        private readonly IBankAccountService _bankAccountService;
        private readonly IUserCardService _userCardService;

        public UserService(VikingVaultDbContext dbContext, IBankAccountService bankAccountService, IUserCardService userCardService)
        {
            _dbContext = dbContext;
            _bankAccountService = bankAccountService;
            _userCardService = userCardService;
        }

        public User CreateUser(User user)
        {
            user.Role = "user";
            user.Password = PasswordEncryption.ComputeSha256Hash(user.Password);

            try
            {
                _dbContext.Add(user);

                _bankAccountService.CreateBankAccount(this.CreateBankAccount(user, CurrencyEnum.Ron.ToString()));
                _bankAccountService.CreateBankAccount(this.CreateBankAccount(user, CurrencyEnum.Eur.ToString()));
                _bankAccountService.CreateBankAccount(this.CreateBankAccount(user, CurrencyEnum.Usd.ToString()));
                _bankAccountService.CreateBankAccount(this.CreateBankAccount(user, CurrencyEnum.Yen.ToString()));

                _dbContext.SaveChanges();
            }

            catch(Exception e)
            {
                if (e is DbUpdateException || e is DbUpdateConcurrencyException || e is BankAccountServiceException)
                {
                    throw new UserServiceException();
                }
            }
            return user;
        }

        public User GetById(int userId)
        {
            return _dbContext.User.Find(userId);
        }

        public int GetIdFromToken(string token)
        {
            var tokenObject = new JwtSecurityToken(token);
            return Int32.Parse(tokenObject.Payload["Id"].ToString());
        }

        public User GetUserByCardNumber(int cardNumber)
        {
            idReciever = _userCardService.FindUserIdByCardNumber(transferData.CardNumberReciever);
            reciever = _userService.GetById(idReciever);
            cardNumberReciever = _userCardService.FindCardByUserId(idReciever);
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
    }
}
