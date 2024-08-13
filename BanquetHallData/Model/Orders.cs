using BanquetHallData.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BanquetHallData.Model
{
    public class Orders
    {
        [Key]
        public int orderId { get; set; }

        [ForeignKey("Menu")]
        public int? CategoryId { get; set; }

        [ForeignKey("MenuItem")]
        public int? menuId { get; set; }

        [Required]
        public int totalamount { get; set; }

        [Required]
        public OrderType orderType { get; set; }

        public Status orderStatus { get; set; }
    }
}
