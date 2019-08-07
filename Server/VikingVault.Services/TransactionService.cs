using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;

namespace VikingVault.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly VikingVaultDbContext _dbContext;

        public TransactionService(VikingVaultDbContext context)
        {
            _dbContext = context;
        }

        public Transaction AddTransaction(Transaction tran)
        {
            throw new NotImplementedException();
        }

        public List<Transaction> GetTransactions(string userId)
        {
            int uid = int.Parse(userId);
            return _dbContext.Transactions.Where(t => t.user.Id == uid).OrderByDescending(t => t.Date).Take(5).ToList();
        }
    }
}
