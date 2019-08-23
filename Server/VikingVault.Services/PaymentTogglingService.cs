using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.Services.Abstractions;

namespace VikingVault.Services
{
    public class PaymentTogglingService : IPaymentTogglingService
    {
        private VikingVaultDbContext _context;

        public PaymentTogglingService(VikingVaultDbContext context)
        {
            _context = context;
        }

        public void ChangePaymentState(string value)
        {
            throw new NotImplementedException();
        }

        public bool? IsPaymentEnabled(int id)
        {
            return _context.AutomaticPayments.Find(id).
        }
    }
}
