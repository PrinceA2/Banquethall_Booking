using BanquetHallData.Model;

namespace BanquetHallBc.Business.BusinessAbstract
{
    public interface IPageNamesService
    {
        Task<IEnumerable<PageNames>> GetAllPageNamesAsync();
        Task<PageNames> GetPageNameByIdAsync(int id);
        Task<PageNames> CreatePageNameAsync(PageNames pageName);
        Task<PageNames> UpdatePageNameAsync(PageNames pageName);
        Task<bool> DeletePageNameAsync(int id);


    }
}

