using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.Services.Exceptions
{
    public class TransferFundsException : Exception
    {
        public TransferFundsException(string message)
            :base(message)
        {
        }
    }
}
