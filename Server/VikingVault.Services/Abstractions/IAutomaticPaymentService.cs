using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.DataAccess.Models;

namespace VikingVault.Services.Abstractions
{
    public interface IAutomaticPaymentService
    {
        List<AutomaticPaymentDTO> GetAllAutomaticPayments(string token);
        AutomaticPayment CreateAutomaticPayment(AutomaticPaymentDTO automaticPaymentDTO, string token);
		void DeleteAutomaticPayment(int id);
    }
}
