using System.ComponentModel.DataAnnotations;

namespace BanquetHallData.Model
{
    public class PageNames
    {

        [Key]
        public int PageId { get; set; }

        [Required]
        [StringLength(100)]
        public string? PageName { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public bool? IsActive { get; set; }
    }
}
