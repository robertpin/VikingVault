using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.Services.Abstractions;
using VikingVault.Services.Exceptions;

namespace VikingVault.Services
{
    public class PaymentTogglingService : IPaymentTogglingService
    {
        private VikingVaultDbContext _context;

        public PaymentTogglingService(VikingVaultDbContext context)
        {
            _context = context;
        }

        public void ChangePaymentState(int id, bool value)
        {
            var automaticPayment = _context.AutomaticPayments.Find(id);
            automaticPayment.IsEnabled = !value;
            _context.Update(automaticPayment);
            _context.SaveChanges();
        }

        public bool? IsPaymentEnabled(int id)
        {
            try
            {
                return _context.AutomaticPayments.Find(id).IsEnabled;
            }
            catch (Exception e)
            {
                throw new AutomaticPaymentException();
            }
        }
    }
}
