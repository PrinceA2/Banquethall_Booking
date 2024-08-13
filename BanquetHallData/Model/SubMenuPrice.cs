using BanquetHallData.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BanquetHallData.Model
{
    public class SubMenuPrice
    {
        [Key]
        public int PriceId { get; set; }

        [ForeignKey("Menu")]
        public int CategoryId { get; set; }

        [ForeignKey("MenuItem")]
        public int MenuId { get; set; }

        [Required]
        public Quantity Quantity { get; set; }

        [Required]
        public decimal Price { get; set; }

     
    }

}
