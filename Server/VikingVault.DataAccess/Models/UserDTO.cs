using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class UserDTO
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string PictureLink { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string Cnp { get; set; }
    }
}
