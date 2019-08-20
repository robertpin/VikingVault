using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.Services.Exceptions.CardExceptions
{
    public class CardNumberAlreadyExistsException : Exception
    {
        public CardNumberAlreadyExistsException()
        {
        }

        public CardNumberAlreadyExistsException(string message)
            : base(message)
        {
        }

        public CardNumberAlreadyExistsException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
