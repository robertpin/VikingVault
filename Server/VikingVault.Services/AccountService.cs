using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using VikingVault.API.Controllers;
using VikingVault.DataAccess;
using VikingVault.Services.Abstractions;

namespace VikingVault.Services
{
    public class AccountService:IAccountService
    {
        private readonly VikingVaultDbContext _dbContext;
        private IList<UserAccount> accountsList;

        public AccountService(VikingVaultDbContext dbContext)
        {
            _dbContext = dbContext;
            accountsList = new List<UserAccount>();
        }

        public UserAccount FindById(int id)
        {
            return null;
        }
    }
}
