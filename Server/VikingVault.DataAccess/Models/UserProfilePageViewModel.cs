using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class UserProfilePageViewModel
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string Cnp { get; set; }
        public string Email { get; set; }
        public string PictureLink { get; set; }
    }
}
