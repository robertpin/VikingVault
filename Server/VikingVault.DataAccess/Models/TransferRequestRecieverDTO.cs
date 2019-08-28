using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class TransferRequestRecieverDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Amount { get; set; }
        public string Currency { get; set; }
        public string Details { get; set; }
        public string CardNumberRequester { get; set; }
    }
}
