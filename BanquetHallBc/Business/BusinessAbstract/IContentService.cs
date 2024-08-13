using BanquetHallData.Model;

namespace BanquetHallBc.Business.BusinessAbstract
{
    public interface IContentService
    {
        Task<IEnumerable<Content>> GetAllContentsAsync();
        Task<Content> GetContentByIdAsync(int id);
        Task<IEnumerable<Content>> AddContentsAsync(IEnumerable<Content> contents);
        //  Task<Content> UpdateContentAsync(Content content);
        Task<IEnumerable<Content>> UpdateContentAsync(List<Content> contents); 

        Task<bool> DeleteContentAsync(int id);
    }
}
