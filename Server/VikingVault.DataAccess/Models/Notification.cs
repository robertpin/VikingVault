using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace VikingVault.DataAccess.Models
{
    public class Notification
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public User user { get; set; }
        [Required]
        public string Text { get; set; }
        [Required]
        public bool Read { get; set; }
        [Required]
        public bool Seen { get; set; }
    }
}
