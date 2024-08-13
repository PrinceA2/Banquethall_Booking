using BanquetHallData.Model;

namespace BanquetHallData.Repositries.RepoAbstract
{
    public interface ISubMenuPriceRepository
    {
        Task<IEnumerable<SubMenuPrice>> GetAllSubMenuPricesAsync();
        Task<SubMenuPrice> GetSubMenuPriceByIdAsync(int id);
        Task<SubMenuPrice> CreateSubMenuPriceAsync(SubMenuPrice subMenuPrice);
        Task<SubMenuPrice> UpdateSubMenuPriceAsync(SubMenuPrice subMenuPrice);
        Task<bool> DeleteSubMenuPriceAsync(int id); 
    }
}
