﻿using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class TransactionDTO
    {
        public int Id { get; set; }
        public User Sender { get; set; }
        public string Type { get; set; }
        public DateTime Date { get; set; }
        public string Currency { get; set; }
        public float Amount { get; set; }
        public User Receiver { get; set; }
        public string Details { get; set; }
        public bool IsUserSender { get; set; }
    }
}