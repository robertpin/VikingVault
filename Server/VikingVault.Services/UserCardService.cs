using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.DataAccess.Models.Exceptions;
using VikingVault.Services.Abstractions;

namespace VikingVault.Services
{
    public class UserCardService : IUserCardService
    {
        private readonly VikingVaultDbContext _dbContext;

        public UserCardService(VikingVaultDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Card FindCardByUserId(int id)
        {
            try
            {
                return _dbContext.Cards.SingleOrDefault(c => c.UserId == id);
            }
            catch
            {
                throw new DatabaseException("Server error.");
            }
        }

        public int? FindUserIdByCardNumber(string cardNumber)
        {
            try
            {
                Card card = _dbContext.Cards.SingleOrDefault(c => c.CardNumber == cardNumber);
                if (card == null)
                {
                    return null;
                }

                return card.UserId;
            }
            catch
            {
                throw new DatabaseException("Server error.");
            }
        }

        public bool HasCardAttached(int userId)
        {
            if (FindCardByUserId(userId) == null)
            {
                return false;
            }

            return true;
        }
    }
}
