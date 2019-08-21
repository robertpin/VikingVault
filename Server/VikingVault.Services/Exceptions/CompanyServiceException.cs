using System;
using System.Runtime.Serialization;

namespace VikingVault.Services
{
    [Serializable]
    internal class CompanyServiceException : Exception
    {
        public CompanyServiceException()
        {
        }

        public CompanyServiceException(string message) : base(message)
        {
        }

        public CompanyServiceException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected CompanyServiceException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}