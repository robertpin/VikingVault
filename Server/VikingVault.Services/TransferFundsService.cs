using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.DataAccess.Models.Exceptions;
using VikingVault.Services.Abstractions;
using VikingVault.Services.Exceptions;
using VikingVault.Services.Exceptions.CardException;

namespace VikingVault.Services
{
    public class TransferFundsService : ITransferFundsService
    {
        private readonly VikingVaultDbContext _dbContext;
        private readonly IBankAccountService _bankAccountService;
        private readonly ITransactionService _transactionService;
        private readonly IUserCardService _userCardService;
        private readonly IUserService _userService;

        public TransferFundsService(VikingVaultDbContext dbContext, IBankAccountService bankAccountService, ITransactionService transactionService, IUserCardService userCardService, IUserService userService)
        {
            _dbContext = dbContext;
            _bankAccountService = bankAccountService;
            _transactionService = transactionService;
            _userCardService = userCardService;
            _userService = userService;
        }

        public void TransferFunds(TransferFundsModel transferData)
        {
            int senderId = transferData.Sender.Id;
            int? receiverId = _userCardService.FindUserIdByCardNumber(transferData.CardNumberReciever);
            if(receiverId == null)
            {
                throw new NoCardAttachedToUserException("Invalid card!");
            }
            if (UsersHaveCardsAttached(senderId, receiverId) && AreDifferentUsers(senderId, (int)receiverId))
            {
                _bankAccountService.RetractMoneyFromUser(_userService.GetById(senderId), transferData.Currency, transferData.AmountSent);
                _bankAccountService.AddMoneyToUser(_userService.GetById((int)receiverId), transferData.Currency, transferData.AmountSent);
                _transactionService.AddTransactionsForTransferFunds(transferData);
                AddReceivedNotification(transferData, receiverId);
            }
        }

        private void AddReceivedNotification(TransferFundsModel transferData, int? idReciever)
        {
            if (idReciever != null)
            {
                User receiver = _userService.GetById((int)idReciever);
                Notification notification = new Notification
                {
                    User = receiver,
                    Text = $"Transfer received {transferData.AmountSent} {transferData.Currency} from {transferData.Sender.FirstName}",
                    Read = false
                };

                _dbContext.Notifications.Add(notification);
                _dbContext.SaveChanges();
            }
        }

        private bool AreDifferentUsers(int idSender, int idReciever)
        {
             if (idSender == idReciever)
             {
                throw new TransferFundsException("You can't transfer money to yourself!");
             }

            return true;
        }

        private bool UsersHaveCardsAttached(int? idSender, int? idReciever)
        {
            if (idSender == null || _userCardService.HasCardAttached((int)idSender) == false)
            {
                throw new NoCardAttachedToUserException("You can't complete the transfer without having a card.");
            }

            if(idReciever == null || _userCardService.HasCardAttached((int)idReciever) == false)
            {
                throw new NoCardAttachedToUserException("Invalid card number!");
            }

            return true;
        }
    }
}
