using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.Services.Abstractions;

namespace VikingVault.Services
{
    public class UniqueEmailService : IUniqueEmailService
    {
        private readonly VikingVaultDbContext _dbContext;

        public UniqueEmailService(VikingVaultDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public bool? IsUniqueEmail(string email)
        {
            try
            {
                var userEmailFromDB = _dbContext.User.SingleOrDefault(s => s.Email == email);

                if (userEmailFromDB == null) 
                    return true;

                else
                    return false;
            }
            catch(Exception e)
            {
                return null;
            }

        }
    }
}
