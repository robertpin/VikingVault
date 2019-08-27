using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class TrasnferFundsDTO
    {
        public int Amount { get; set; }
        public string Currency { get; set; }
        public string CardNumberReciever { get; set; }
        public string TransferDetails { get; set; }

        public TransferFundsModel convertDTOtoTransferFundsModel(User sender)
        {
            return new TransferFundsModel
            {
                Sender = sender,
                AmountSent = this.Amount,
                CardNumberReciever = this.CardNumberReciever,
                TransferDetails = this.TransferDetails,
                Currency = this.Currency
            };
        }
    }
}
