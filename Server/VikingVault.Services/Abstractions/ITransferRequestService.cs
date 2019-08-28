using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.DataAccess.Models;

namespace VikingVault.Services.Abstractions
{
    public interface ITransferRequestService
    {
        TransferRequest AddTransferRequest(TransferRequest transferRequestData);
        void DeleteRequest(int requestId);
        List<TransferRequest> GetAllRequestsForUser(User user);
        List<TransferRequestRecieverDTO> ConvertTransferRequestsToTransferRequestsDTO(List<TransferRequest> transferRequests);
    }
}
