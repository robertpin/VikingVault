using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class AutomaticPaymentDTO
    {
        [Required]
        public int PaymentId { get; set; }
        [Required]
        public string CompanyName { get; set; }
        [Required]
        public float Amount { get; set; }
        [Required]
        public DateTime InitialPaymentDate { get; set; }
        [Required]
        public DateTime LastPaymentDate { get; set; }
    }
}
