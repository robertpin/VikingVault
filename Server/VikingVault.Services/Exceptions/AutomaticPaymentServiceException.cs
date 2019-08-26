using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.Services.Exceptions
{
    public class AutomaticPaymentServiceException : Exception
    {
        public AutomaticPaymentServiceException()
        {
        }

        public AutomaticPaymentServiceException(string message)
            : base(message)
        {
        }

        public AutomaticPaymentServiceException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
