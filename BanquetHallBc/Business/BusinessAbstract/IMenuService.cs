using BanquetHallData.Model;

namespace BanquetHallBc.Business.BusinessAbstract
{
    public interface IMenuService
    {
        Task<IEnumerable<Menu>> GetAllMenuAsync();
        Task<Menu> GetMenuByIdAsync(int id);       
        Task<Menu> CreateMenuAsync(Menu  menu);
        Task<Menu> UpdateMenuAsync(Menu  menu); 
        Task<bool> DeleteMenuAsync(int id); 
    }
}
