using System;

namespace VikingVault.DataAccess.Models
{
    public class UserAccount
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CardNumber { get; set; }
        public string ExpirationDate { get; set; }
        public float RonBalance { get; set; }
        public float EurBalance { get; set; }
        public float UsdBalance { get; set; }
        public float YenBalance { get; set; }
    }
}