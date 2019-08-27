using System;

namespace VikingVault.DataAccess.Models
{
    public class UserAccount
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int CardId { get; set; }
        public string CardNumber { get; set; }
        public int CCV { get; set; }
        public string ExpirationDate { get; set; }
        public Boolean BlockedCard { get; set; }
        public float RonBalance { get; set; }
        public float EurBalance { get; set; }
        public float UsdBalance { get; set; }
        public float YenBalance { get; set; }
    }
}