﻿using System;
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
using VikingVault.DataAccess.Models.Exceptions;
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
            _userCardService = userCardService;
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

            catch(Exception e) when (e is DbUpdateException || e is DbUpdateConcurrencyException || e is BankAccountServiceException)
            { 
                throw new UserServiceException(e.Message);
            }
            return userToBeInserted;
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

        public User GetUserFromToken(string token)
        {
            return GetById(GetIdFromToken(token));
        }

        public User GetUserFromCardNumber(string cardNumber)
        {
            int? idUser = _userCardService.FindUserIdByCardNumber(cardNumber);
            
            if(idUser != null)
            {
                return GetById((int)idUser);
            }
                
            return null;
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
                if (userToDelete == null)
                {
                    throw new UserServiceException("The user to be deleted doesn't exist in the database!");
                }

                _dbContext.Transactions.Where(transaction => transaction.Sender.Id == userToDelete.Id).Load();
                _dbContext.Transactions.Where(transaction => transaction.Receiver.Id == userToDelete.Id).Load();
                _dbContext.AutomaticPayments.Where(automaticPayment => automaticPayment.PayingUser.Id == userToDelete.Id).Load();

                _dbContext.Remove(userToDelete);
                _dbContext.SaveChanges();
            }
            catch (Exception e) when (e is DbUpdateException || e is DbUpdateConcurrencyException)
            {
                throw new DatabaseException(e.Message);
            }
        }

        public UpdateUserDTO UpdateUser(UpdateUserDTO user)
        {
            try
            {
                User userToUpdate = _dbContext.User.SingleOrDefault(u => u.Email == user.Email);
                if(userToUpdate == null)
                {
                    throw new UserServiceException("User not found");
                }
                userToUpdate.FirstName = user.FirstName;
                userToUpdate.LastName = user.LastName;
                userToUpdate.Address = user.Address;
                userToUpdate.Cnp = user.Cnp;
                userToUpdate.PictureLink = user.PictureLink;
                _dbContext.Update(userToUpdate);
                _dbContext.SaveChanges();
                return user;
            }
            catch(Exception e)
            {
                throw new UserServiceException(e.Message);
            }
        }
    }
}
