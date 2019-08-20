using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.DataAccess;
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

        public string FindCardByUserId(int id)
        {
            throw new NotImplementedException();
        }

        public int FindUserIdByCardNumber(string cardNumber)
        {
            throw new NotImplementedException();
        }

        public bool HasCardAttached(int userId)
        {
            if (FindCardByUserId(userId) == "no-card")
                return false;
            return true;
        }
    }
}
