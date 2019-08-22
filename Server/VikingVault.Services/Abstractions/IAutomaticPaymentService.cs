using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.Services.Abstractions
{
    public interface IAutomaticPaymentService
    {
        void DeleteAutomaticPayment(int id);
    }
}
