using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;
using VikingVault.Services.Exceptions;

namespace VikingVault.Services
{
    public class AutomaticPaymentService: IAutomaticPaymentService
    {
        private readonly VikingVaultDbContext _dbContext;

        public AutomaticPaymentService(VikingVaultDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void DeleteAutomaticPayment(int id)
        {
            try
            {
                AutomaticPayment automaticPaymentToDelete = _dbContext.AutomaticPayments.SingleOrDefault(automaticPayment => automaticPayment.Id == id);
                _dbContext.Remove(automaticPaymentToDelete);
                _dbContext.SaveChanges();
            }
            catch (Exception e)
            {
                throw new AutomaticPaymentException(e.Message);
            }
        }
    }
}
