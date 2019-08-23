using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.Services.Exceptions
{
    public class AutomaticPaymentException : Exception
    {
        public AutomaticPaymentException()
        {
        }

        public AutomaticPaymentException(string message) : base(message)
        {
        }

        public AutomaticPaymentException(string message, Exception inner) : base(message, inner)
        {
        }
    }
}