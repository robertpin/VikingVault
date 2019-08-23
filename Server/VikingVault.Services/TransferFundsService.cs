using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.DataAccess.Models.Exceptions;
using VikingVault.Services.Abstractions;
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

        public bool? TransferFunds(TransferFundsModel transferData)
        {
            int idSender = transferData.Sender.Id;
            
            if (_userCardService.HasCardAttached(idSender))
            {
                int? idReciever = _userCardService.FindUserIdByCardNumber(transferData.CardNumberReciever);

                if (idSender != idReciever)
                {
                    if (idReciever != null && _userCardService.HasCardAttached((int)idReciever))
                    {
                        _bankAccountService.RetractMoneyFromAccount(_userService.GetById(idSender), transferData.Currency, transferData.AmountSent);
                        _bankAccountService.AddMoneyToAccount(_userService.GetById((int)idReciever), transferData.Currency, transferData.AmountSent);

                        _transactionService.AddTransactionsForTransferFunds(transferData);
                        return true;
                    }
                    else
                    {
                        throw new NoCardAttachedToUserException("No user found with the specified card number!");
                    }
                }
                else
                {
                    throw new NoCardAttachedToUserException("You can't transfer money to yourself!");
                }
            }
            else
            {
                throw new NoCardAttachedToUserException("You can't complete the transfer without having a card.");
            }
        }
    }
}
