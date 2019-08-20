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
            int idSender = transferData.IdSender;

            try
            {
                if (_userCardService.HasCardAttached(idSender)) //if user has a card attached
                {
                    int idReciever = _userCardService.FindUserIdByCardNumber(transferData.CardNumberReciever);

                    if (_userCardService.HasCardAttached(idReciever))
                    {
                        _bankAccountService.RetractMoneyFromAccount(idSender, transferData.Currency, transferData.AmountSent);
                        _bankAccountService.AddMoneyToAccount(idReciever, transferData.Currency, transferData.AmountSent);

                        return true;
                    }
                    else
                    {
                        throw new NoCardAttachedToUserException("No card attached to the reciever!");
                    }
                }
                else
                {
                    throw new NoCardAttachedToUserException("No card attached to the sender!");
                }
            }
            catch
            {
                throw new DatabaseException();
            }
        }
    }
}
