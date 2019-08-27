using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.DataAccess.Models.Exceptions;
using VikingVault.Services.Abstractions;

namespace VikingVault.Services
{
    public class TransferRequestService: ITransferRequestService
    {
        private readonly VikingVaultDbContext _dbContext;
        private readonly UserCardService _userCardService;
        private readonly UserService _userService;

        public TransferRequestService(VikingVaultDbContext dbContext, UserCardService userCardService, UserService userService)
        {
            _dbContext = dbContext;
            _userCardService = userCardService;
            _userService = userService;
        }

        public TransferRequest AddTransferRequest(TransferRequest transferRequestData)
        {
            try
            {
                _dbContext.Add(transferRequestData);
                _dbContext.SaveChanges();
                AddRequestNotification(transferRequestData);
            }
            catch (Exception e)
            {
                throw new DatabaseException();
            }
            return transferRequestData;
        }

        private void AddRequestNotification(TransferRequest transferRequestData)
        {
            int? idReceiver = _userCardService.FindUserIdByCardNumber(transferRequestData.CardNumberReciever);
            User receiver = _userService.GetById((int)idReceiver);
            Notification notification = new Notification
            {
                User = receiver,
                Text = "Transfer requested " + transferRequestData.Amount + " " + transferRequestData.Currency + " from " + transferRequestData.Requester.FirstName,
                Read = false
            };
            _dbContext.Notifications.Add(notification);
            _dbContext.SaveChanges();
        }
    }
}
