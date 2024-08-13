using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BanquetHallData.Model
{
    public class MenuItem
    {
        [Key]
        public int MenuId { get; set; }
        [Required]

        [ForeignKey("Menu")]
        public int? CategoryId  { get; set; }   

        [Required]
        public string MenuItemName { get; set; }

        public string MenuDesc { get; set; }
        public bool IsActive { get; set; }

    }
}
