using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public User user { get; set; }
        public string Type { get; set; }
        public DateTime Date { get; set; }
        public string Currency { get; set; }
        public float Amount { get; set; }
        public string OtherParty { get; set; }
    }
}
