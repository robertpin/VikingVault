using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class Card
    {
        public int Id { get; set; }
        [Required]
        public string CardNumber { get; set; }
        [Required]
        public DateTime ExpirationDate { get; set; }
        [Required]
        public int CCV { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        [Required]
        public bool Blocked { get; set; }
    }
}
