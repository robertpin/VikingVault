using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.DataAccess.Models;

namespace VikingVault.Services.Abstractions
{
    public interface ITransactionService
    {
        Transaction AddTransaction(Transaction tran);
        List<Transaction> GetTransactions(string userId);
    }
}
