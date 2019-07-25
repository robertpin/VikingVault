using System.Collections.Generic;
using VikingVault.DataAccess.Models;

namespace VikingVault.Services.Abstractions
{
    public interface IBankService
    {
        IEnumerable<Bank> GetBanks();
    }
}
