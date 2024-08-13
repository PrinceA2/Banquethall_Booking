using System.ComponentModel.DataAnnotations;

namespace BanquetHallData.Model
{
    public   class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }

        [EmailAddress]
        public string Email{ get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]  
        public string HashPassword { get; set; }

    }
}
