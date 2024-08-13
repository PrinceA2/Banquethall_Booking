using BanquetHallData.Model;

namespace BanquetHallBc.Business.BusinessAbstract
{
    public interface ISectionService
    {
        Task<List<Section>> GetAllSections();
        Task<Section> GetSectionById(int sectionId);
        Task CreateSection(Section section);
        Task UpdateSection(Section section);
        Task DeleteSection(int sectionId);
    }
}
