using System;
using System.Runtime.Serialization;

namespace VikingVault.Services
{
    [Serializable]
    public class NotificationsServiceException : Exception
    {
        public NotificationsServiceException()
        {
        }

        public NotificationsServiceException(string message) : base(message)
        {
        }

        public NotificationsServiceException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected NotificationsServiceException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}