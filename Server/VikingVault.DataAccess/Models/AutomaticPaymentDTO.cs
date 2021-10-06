﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class AutomaticPaymentDTO
    {
        public int Id { get; set; }
        [Required]
        public int CompanyId { get; set; }
        [Required]
        public int PaymentId { get; set; }
        [Required]
        public string CompanyName { get; set; }
        [Required]
        public float Amount { get; set; }
        [Required]
        public DateTime InitialPaymentDate { get; set; }
        public DateTime LastPaymentDate { get; set; }
        public Boolean IsActive { get; set; }
    }
}
