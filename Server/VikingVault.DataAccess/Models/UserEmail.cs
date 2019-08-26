using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class UserEmail
    {
        [Required]
        public string Email { get; set; }
    }
}
