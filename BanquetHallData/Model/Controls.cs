using System.ComponentModel.DataAnnotations;

namespace BanquetHallData.Model
{
    public class Controls
    {
        [Key]
        public int ControlID { get; set; }

        [Required]
        public string ControlName { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public int NoOfControls { get; set; }

        public bool IsActive { get; set; }

    }
}
