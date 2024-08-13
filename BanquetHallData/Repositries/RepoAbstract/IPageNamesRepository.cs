using BanquetHallData.Model;

namespace BanquetHallData.Repositries.RepoAbstract
{
    public interface IPageNamesRepository
    {
        Task<IEnumerable<PageNames>> GetAllPageNamesAsync();
        Task<PageNames> GetPageNameByIdAsync(int id);
        Task<PageNames> CreatePageNameAsync(PageNames pageName);
        Task<PageNames> UpdatePageNameAsync(PageNames pageName);
        Task<bool> DeletePageNameAsync(int id);
    }
}
