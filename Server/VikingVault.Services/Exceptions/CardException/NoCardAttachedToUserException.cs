using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.Services.Exceptions.CardException
{
    public class NoCardAttachedToUserException : Exception
    {
        public NoCardAttachedToUserException(string message)
            : base(message)
        {
        }
    }
}
