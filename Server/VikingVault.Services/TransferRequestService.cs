using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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
        private readonly IUserCardService _userCardService;

        public TransferRequestService(VikingVaultDbContext dbContext, IUserCardService userCardService)
        {
            _dbContext = dbContext;
            _userCardService = userCardService;
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

        public void DeleteRequest(int requestId)
        {
            try
            {
                TransferRequest request = _dbContext.TransferRequests.SingleOrDefault(r => r.Id == requestId);
                _dbContext.Remove(request);
                _dbContext.SaveChanges();
            }
            catch (Exception e)
            {
                throw new DatabaseException();
            }
        }

        public List<TransferRequest> GetAllRequestsForUser(User user)
        {
            try
            {
                var cardNumber = _userCardService.GetCardNumberFromUser(user);
                var transferRequests = _dbContext.TransferRequests.
                    Include( request => request.Requester).
                    Where(requests => requests.CardNumberReciever == cardNumber).ToList();
                return transferRequests;
            }
            catch
            {
                throw new DatabaseException();
            }
        }

        public List<TransferRequestRecieverDTO> ConvertTransferRequestsToTransferRequestsDTO(List<TransferRequest> transferRequests)
        {
            try
            {
                var transferRequestsDTO = new List<TransferRequestRecieverDTO>();
                foreach (var request in transferRequests)
                {
                    var user = _dbContext.User
                        .SingleOrDefault(u => u.Id == request.Requester.Id);

                    var cardNumberRequester = _userCardService.GetCardNumberFromUser(request.Requester);

                    transferRequestsDTO.Add(new TransferRequestRecieverDTO
                    {
                        Id = request.Id,
                        Name = user.FirstName + " " + user.LastName,
                        Amount = request.Amount,
                        Currency = request.Currency,
                        Details = request.Details,
                        CardNumberRequester = cardNumberRequester
                    });
                }

                return transferRequestsDTO;
            }
            catch
            {
                throw new DatabaseException();
            }
        }
    }
}
