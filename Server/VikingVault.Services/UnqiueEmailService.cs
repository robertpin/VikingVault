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
                var ReturnedEmail = _dbContext.User.SingleOrDefault(s => s.Email == email);

                if (ReturnedEmail == null) // No email found
                    return true;

                else // found it
                    return false;
            }
            catch(Exception e)
            {
                return null;
            }

          
            //Some Error Handling to be done
            throw new NotImplementedException();
        }
    }
}
