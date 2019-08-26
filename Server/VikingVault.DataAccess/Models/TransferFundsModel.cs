using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class TransferFundsModel
    {
        public User Sender { get; set; }
        public int AmountSent { get; set; }
        public string CardNumberReciever { get; set; }
        public string TransferDetails { get; set; }
        public string Currency { get; set; }
    }
}
