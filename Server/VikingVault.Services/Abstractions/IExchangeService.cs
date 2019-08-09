using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.DataAccess.Models;

namespace VikingVault.Services.Abstractions
{
    public interface IExchangeService
    {
        List<BankAccount> Exchange(string token,
            UpdateBankAccountModel bankAccountModelSell,
            UpdateBankAccountModel bankAccountModelBuy,
            UpdateBankAccountModel exchangeInfo);
    }
}
