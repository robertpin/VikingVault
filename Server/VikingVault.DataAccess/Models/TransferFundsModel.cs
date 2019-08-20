using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class TransferFundsModel
    {
        public int IdSender { get; set; }
        public int AmountSent { get; set; }
        public string CardNumberReciever { get; set; }
        public string TransferDetails { get; set; }
        public string Currency { get; set; }
    }
}
