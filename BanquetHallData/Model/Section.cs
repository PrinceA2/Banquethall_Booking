using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BanquetHallData.Model
{
    public class Section
    {
        public int SectionId { get; set; }

        [ForeignKey("Page")]
        public int? PageId { get; set; }   

        [Required]
        public string? SectionName { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public bool IsActive { get; set; }
        public int SectionSequence { get; set; }
    }
}
