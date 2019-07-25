using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using VikingVault.DataAccess.Models;
using VikingVault.DataAccess.Repositories.Abstractions;

namespace VikingVault.DataAccess.Repositories
{
    public class BankRepository : BaseRepository<Bank>, IBankRepository
    {
        public BankRepository(MyDbContext myDbContext)
            : base(myDbContext)
        {
        }
    }
}
