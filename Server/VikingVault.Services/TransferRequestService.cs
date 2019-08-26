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

        public TransferRequestService(VikingVaultDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public TransferRequest AddTransferRequest(TransferRequest transferRequestData)
        {
            try
            {
                _dbContext.Add(transferRequestData);
                _dbContext.SaveChanges();
            }
            catch (Exception e)
            {
                throw new DatabaseException();
            }
            return transferRequestData;
        }
    }
}
