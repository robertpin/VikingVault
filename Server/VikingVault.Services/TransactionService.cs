using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.DataAccess.Models.Exceptions;
using VikingVault.Services.Abstractions;
using VikingVault.Services.Exceptions;

namespace VikingVault.Services
{
    public class TransactionService : ITransactionService
    {
        const int numberOfTransactionsToTake = 5;
        private readonly VikingVaultDbContext _dbContext;
        private readonly IUserService _userService;

        public TransactionService(VikingVaultDbContext context, IUserService userService)
        {
            _dbContext = context;
            _userService = userService;
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

        public void AddTransactionsForTransferFunds(TransferFundsModel transferData)
        {
            try
            {
                User reciever = _userService.GetUserFromCardNumber(transferData.CardNumberReciever);

                Transaction senderTransaction = new Transaction
                {
                    Sender = transferData.Sender,
                    Type = "Transfer",
                    Currency = transferData.Currency,
                    Date = DateTime.Now,
                    Amount = -transferData.AmountSent,
                    Receiver = reciever,
                    Details = transferData.TransferDetails
                };

                AddTransaction(senderTransaction);
            }
            catch
            {
                throw new DatabaseException();
            }
        }

        public List<TransactionDTO> GetTransactions(string userId)
        {
            int uid = int.Parse(userId);
            var transactions =  _dbContext.Transactions
                .Include(t => t.Sender)
                .Include(t => t.Receiver)
                .Where(t => t.Sender.Id == uid || t.Receiver.Id == uid)
                .OrderByDescending(t => t.Date)
                .Take(numberOfTransactionsToTake)
                .ToList();
            var transactionsDTO = new List<TransactionDTO>();
            foreach(Transaction transaction in transactions)
            {
                var isUserSender = false;
                if(transaction.Sender != null)
                {
                    isUserSender = (transaction.Sender.Id == uid);
                }
                transactionsDTO.Add(new TransactionDTO
                {
                    Id = transaction.Id,
                    Sender = transaction.Sender,
                    Receiver = transaction.Receiver,
                    Type = transaction.Type,
                    Amount = transaction.Amount,
                    Details = transaction.Details,
                    Currency = transaction.Currency,
                    Date = transaction.Date,
                    IsUserSender = isUserSender
                });
            }
            return transactionsDTO;
        }

        public List<TransactionDTO> GetAllTransactions(string userId)
        {
            int uid = int.Parse(userId);
            var transactions = _dbContext.Transactions
                .Include(t => t.Sender)
                .Include(t => t.Receiver)
                .Where(t => t.Sender.Id == uid || t.Receiver.Id == uid)
                .OrderByDescending(t => t.Date)
                .ToList();
            var transactionsDTO = new List<TransactionDTO>();
            foreach (Transaction transaction in transactions)
            {
                var isUserSender = false;
                if (transaction.Sender != null)
                {
                    isUserSender = (transaction.Sender.Id == uid);
                }
                transactionsDTO.Add(new TransactionDTO
                {
                    Id = transaction.Id,
                    Sender = transaction.Sender,
                    Receiver = transaction.Receiver,
                    Type = transaction.Type,
                    Amount = transaction.Amount,
                    Details = transaction.Details,
                    Currency = transaction.Currency,
                    Date = transaction.Date,
                    IsUserSender = isUserSender
                });
            }
            return transactionsDTO;
        }
    }
}
