using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.Services.Exceptions
{
    public class BankAccountServiceException : Exception
    {
        public BankAccountServiceException()
        {
        }

        public BankAccountServiceException(string message) : base(message)
        {
        }

        public BankAccountServiceException(string message, Exception inner) : base(message, inner)
        {
        }
    }   
}
