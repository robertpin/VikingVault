using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.DataAccess.Models.Exceptions
{
    public class DatabaseException : Exception
    {
        public DatabaseException()
        {
        }

        public DatabaseException(string message)
            : base(message)
        {
        }

        public DatabaseException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
