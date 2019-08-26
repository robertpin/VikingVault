using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.DataAccess.Models;

namespace VikingVault.Services.Abstractions
{
    public interface ITransferRequestService
    {
        TransferRequest AddTransferRequest(TransferRequest transferRequestData);
    }
}
