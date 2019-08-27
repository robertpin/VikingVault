using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class NotificationDTO
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public bool Read { get; set; }
    }
}
