using BanquetHallData.Model;

namespace BanquetHallBc.Business.BusinessAbstract
{
    public interface IControlService
    {
        Task<IEnumerable<Controls>> GetAllControlsAsync();
        Task<Controls> GetControlByIdAsync(int id);
    }
}
