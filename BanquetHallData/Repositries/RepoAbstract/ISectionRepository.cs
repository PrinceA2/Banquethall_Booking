using BanquetHallData.Model;

namespace BanquetHallData.Repositries.RepoAbstract
{
    public interface ISectionRepository
    {
        Task<List<Section>> GetAllSections();
        Task<Section> GetSectionById(int sectionId);
        Task CreateSection(Section section);
        Task UpdateSection(Section section);
        Task DeleteSection(int sectionId);
    }
}
