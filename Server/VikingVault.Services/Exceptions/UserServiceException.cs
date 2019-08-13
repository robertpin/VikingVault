using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.Services.Exceptions
{
    public class UserServiceException : Exception 
    {
        public UserServiceException()
        {
        }

        public UserServiceException(string message) : base(message)
        {
        }

        public UserServiceException(string message, Exception inner) : base(message, inner)
        {
        }
    }
}
