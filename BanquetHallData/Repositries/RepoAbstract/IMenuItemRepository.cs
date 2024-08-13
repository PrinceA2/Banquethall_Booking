using BanquetHallData.Model;

namespace BanquetHallData.Repositries.RepoAbstract
{
    public interface IMenuItemRepository
    {
        Task<List<MenuItem>> GetAllMenuItemAsync(); 
        Task<MenuItem> GetMenuItemByIdAsync(int id);
        Task<bool> DeleteMenuItemAsync(int id);       
        Task<IEnumerable<MenuItem>> AddMenuItemAsync(List<MenuItem>  menuItems);
        Task<IEnumerable<MenuItem>> UpsertMenuItemsAsync(List<MenuItem> menuItems);

    }
}
    