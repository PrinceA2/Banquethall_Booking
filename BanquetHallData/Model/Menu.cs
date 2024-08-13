using System.ComponentModel.DataAnnotations;

namespace BanquetHallData.Model
{
    public class Menu
    {
        [Key]
        public int Categoryid { get; set; }
        [Required]
        public string CategoryName { get; set; }    

    }
}
