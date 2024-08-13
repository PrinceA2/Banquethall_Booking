using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BanquetHallData.Model
{
    public class Content
    {
        [Key]
        public int ContentId { get; set; }

        [ForeignKey("Page")]
        public int PageId { get; set; }

        [ForeignKey("Section")]
        public int SectionId { get; set; }

        [ForeignKey("Control")]
        public int ControlId { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string ContentData { get; set; }
        public bool IsActive { get; set; }
    }
}
