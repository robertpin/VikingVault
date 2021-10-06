using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class TransferRequestDTO
    {
        public string Amount { get; set; }
        public string Currency { get; set; }
        public string CardNumberReciever { get; set; }
        public string TransferDetails { get; set; }

        public TransferRequest ConvertDTOtoTransferRequest(User requester)
        {
            return new TransferRequest
            {
                Id = 0,
                Requester = requester,
                Amount = this.Amount,
                Currency = this.Currency,
                CardNumberReciever = this.CardNumberReciever,
                Details = this.TransferDetails
            };
        }
    }
}
