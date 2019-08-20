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
        void UpdateBankAccount();
        BankAccount ChangeBalance(string email, UpdateBankAccountModel updatedBankAccount);
        BankAccount AddMoneyToAccount(int userId, string currency, float amountToBeAdded);
        BankAccount RetractMoneyFromAccount(int userId, string currency, float amountToBeSubstracted);
    }
}
