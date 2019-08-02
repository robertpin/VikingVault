using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class UserProfilePageViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Cnp { get; set; }
        public string Email { get; set; }
        public string PictureLink { get; set; }
    }
}
