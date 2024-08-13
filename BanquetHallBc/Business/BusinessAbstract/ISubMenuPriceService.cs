using BanquetHallData.Model;

namespace BanquetHallBc.Business.BusinessAbstract
{
    public interface ISubMenuPriceService
    {
        Task<IEnumerable<SubMenuPrice>> GetAllSubMenuPricesAsync();
        Task<SubMenuPrice> GetSubMenuPriceByIdAsync(int id);
        Task<SubMenuPrice> CreateSubMenuPriceAsync(SubMenuPrice subMenuPrice);
        Task<SubMenuPrice> UpdateSubMenuPriceAsync(SubMenuPrice subMenuPrice);
        Task<bool> DeleteSubMenuPriceAsync(int id);
    }
}
