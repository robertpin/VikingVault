using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class BankAccount
    {
        public int Id { get; set; }
        [Required]
        public User User { get; set; }
        [Required]
        public string CurrencyType { get; set; }
        [Required]
        public float Balance { get; set; }
    }
}
