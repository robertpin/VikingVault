﻿using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using VikingVault.DataAccess;
using VikingVault.Services.Abstractions;
using VikingVault.DataAccess.Models;
using Microsoft.Extensions.Primitives;

namespace VikingVault.Services
{
    public class AccountService:IAccountService
    {
        private readonly VikingVaultDbContext _dbContext;

        public AccountService(VikingVaultDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public UserAccount GetUserAccount(StringValues token)
        {
            try
            {
                int userId = FindUserIDByToken(token);
                User returnedUser = _dbContext.User.SingleOrDefault(u => u.Id == userId);
                Card card = _dbContext.Cards.SingleOrDefault(u => u.UserId == userId);
                if (card == null)
                {
                    return null;
                }

                List<BankAccount> bankAccounts = _dbContext.BankAccount.Where(ba => ba.User == returnedUser).ToList();
                UserAccount userAccount = new UserAccount
                {
                    FirstName = returnedUser.FirstName,
                    LastName = returnedUser.LastName,
                    CardNumber = card.CardNumber,
                    CCV = card.CCV,
                    CardId = card.Id,
                    BlockedCard = card.Blocked,
                    ExpirationDate = GenerateExpirationDate(card.ExpirationDate)
                };

                foreach (BankAccount ba in bankAccounts)
                {
                    switch (ba.CurrencyType)
                    {
                        case "Ron":
                            userAccount.RonBalance = ba.Balance;
                            break;
                        case "Eur":
                            userAccount.EurBalance = ba.Balance;
                            break;
                        case "Usd":
                            userAccount.UsdBalance = ba.Balance;
                            break;
                        case "Yen":
                            userAccount.YenBalance = ba.Balance;
                            break;
                    }
                }
                return userAccount;
            }
            catch
            {
                return null;
            }
        }

        private int FindUserIDByToken(StringValues token)
        {
            var tokenObject = new JwtSecurityToken(token);
            string userId = tokenObject.Payload["Id"].ToString();
            return int.Parse(userId);
        }

        private string GenerateExpirationDate(DateTime expirationDate)
        {
            return expirationDate.Month+"/"+expirationDate.Year.ToString().Substring(2,2);
        }
    }
}
