using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class AutomaticPayment
    {
        public int Id { get; set; }
        [Required]
        public User Company { get; set; }
        [Required]
        public float Amount { get; set; }
        [Required]
        public DateTime InitialPaymentDate { get; set; }
        public DateTime LastPaymentDate { get; set; }
        public User PayingUser { get; set; }
    }
}
