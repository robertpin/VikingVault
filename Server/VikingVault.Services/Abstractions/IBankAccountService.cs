using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.DataAccess.Models;

namespace VikingVault.Services.Abstractions
{
    public interface IBankAccountService
    {
        BankAccount CreateBankAccount(BankAccount account);
        List<BankAccount> GetBankAccounts(string token);
    }
}
