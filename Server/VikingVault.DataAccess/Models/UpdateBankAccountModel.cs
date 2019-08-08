using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class UpdateBankAccountModel
    {
        public string CurrencyType { get; set; }
        public float Balance { get; set; }
    }
}
