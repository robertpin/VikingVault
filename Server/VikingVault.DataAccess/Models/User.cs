﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string PictureLink { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string Cnp { get; set; }
        [Required]
        public Role Role { get; set; }
        [NotMapped]
        public string Token { get; set; }
        public Card Card { get; set; }
    }
}
