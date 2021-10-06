using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.DataAccess.Models;

namespace VikingVault.Services.Abstractions
{
    public interface ITransactionService
    {
        Transaction AddTransaction(Transaction tran);
        void AddTransactionsForTransferFunds(TransferFundsModel transferData);
        List<TransactionDTO> GetTransactions(string userId);
        List<TransactionDTO> GetAllTransactions(string userId);
    }
}
