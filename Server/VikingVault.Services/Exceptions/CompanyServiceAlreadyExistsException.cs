using System;
using System.Runtime.Serialization;

namespace VikingVault.Services
{
    [Serializable]
    public class CompanyServiceAlreadyExistsException : Exception
    {
        public CompanyServiceAlreadyExistsException()
        {
        }

        public CompanyServiceAlreadyExistsException(string message) : base(message)
        {
        }

        public CompanyServiceAlreadyExistsException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected CompanyServiceAlreadyExistsException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}