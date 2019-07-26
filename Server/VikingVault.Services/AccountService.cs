using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.Services.Abstractions;

namespace VikingVault.Services
{
    class AccountService:IAccountService
    {
        private readonly VikingVaultDbContext _dbContext;

        public AccountService(VikingVaultDbContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
