using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class TransferRequest
    {
        public int Id { get; set; }
        [Required]
        public User Requester { get; set; }
        [Required]
        public string Amount { get; set; }
        [Required]
        public string Currency { get; set; }
        [Required]
        public string CardNumberReciever { get; set; }
        public string Details { get; set; }
    }
}
