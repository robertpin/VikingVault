using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    class TransferRequest
    {
        public int Id { get; set; }
        [Required]
        public User User { get; set; }
        public string Amount { get; set; }
        public string Currency { get; set; }
        public string CardNumberReciever { get; set; }
        public string Details { get; set; }
    }
}
