using BanquetHallData.Model;

namespace BanquetHallBc.Business.BusinessAbstract
{
    public interface IMenuItemService
    {
        Task<IEnumerable<MenuItem>> GetAllMenuItemAsync();
        Task<MenuItem> GetMenuItemByIdAsync(int id);
        Task<bool> DeleteMenuItemAsync(int id);
        Task<IEnumerable<MenuItem>> AddMenuItemAsync(List<MenuItem>  menuItems);
        Task<IEnumerable<MenuItem>> UpsertMenuItemsAsync(List<MenuItem> menuItems);


    }
}   
    