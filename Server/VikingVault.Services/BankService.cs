using System.Collections.Generic;
using System.Linq;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;

namespace VikingVault.Services
{
    public class BankService : IBankService
    {
        private readonly VikingVaultDbContext _dbContext;

        public BankService(VikingVaultDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Bank> GetBanks()
        {
            return _dbContext.Banks.ToList();
        }
    }
}
