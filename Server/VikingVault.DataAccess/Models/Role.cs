using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using VikingVault.DataAccess.Enums;

namespace VikingVault.DataAccess.Models
{
    public class Role
    {
        public int Id { get; set; }
        [Required]
        public string Type { get; set; }
    }
}
