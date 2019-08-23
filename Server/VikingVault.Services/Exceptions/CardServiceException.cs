using System;
using System.Runtime.Serialization;

namespace VikingVault.Services
{
    [Serializable]
    public class CardServiceException : Exception
    {
        public CardServiceException()
        {
        }

        public CardServiceException(string message) : base(message)
        {
        }

        public CardServiceException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected CardServiceException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}