using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;
using VikingVault.Services.Exceptions;

namespace VikingVault.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly VikingVaultDbContext _dbContext;

        public TransactionService(VikingVaultDbContext context)
        {
            _dbContext = context;
        }

        public Transaction AddTransaction(Transaction transaction)
        {
            try
            {
                _dbContext.Add(transaction);
                _dbContext.SaveChanges();
            }
            catch(Exception e)
            {
                if (e is DbUpdateException || e is DbUpdateConcurrencyException)
                {
                    throw new TransactionException();
                }
            }
            return transaction;
        }

        public List<Transaction> GetTransactions(string userId)
        {
            int uid = int.Parse(userId);
            return _dbContext.Transactions
                .Where(t => t.user.Id == uid)
                .OrderByDescending(t => t.Date)
                .Take(5)
                .ToList();
        }
    }
}
