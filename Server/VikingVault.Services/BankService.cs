using System.Collections.Generic;
using VikingVault.DataAccess.Models;
using VikingVault.DataAccess.Repositories.Abstractions;
using VikingVault.Services.Abstractions;

namespace VikingVault.Services
{
    public class BankService : IBankService
    {
        private readonly IBankRepository _bankRepository;

        public BankService(IBankRepository bankRepository)
        {
            _bankRepository = bankRepository;
        }

        public IEnumerable<Bank> GetBanks()
        {
            return _bankRepository.FindAll();
        }
    }
}
