using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Firstname { get; set; }
        [Required]
        public string Lastname { get; set; }

        public string PictureLink { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string Cnp { get; set; }
        [Required]
        public string Role { get; set; }
    }
}
