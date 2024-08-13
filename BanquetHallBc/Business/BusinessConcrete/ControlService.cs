using BanquetHallBc.Business.BusinessAbstract;
using BanquetHallData.Model;
using BanquetHallData.Repositries.RepoAbstract;
using Microsoft.Extensions.Logging;

namespace BanquetHallBc.Business.BusinessConcrete
{
    public class ControlService : IControlService
    {
        private readonly IControlRepository _controlRepository;
        private readonly ILogger<ControlService> _logger;

        public ControlService(IControlRepository controlRepository, ILogger<ControlService> logger)
        {
            _controlRepository = controlRepository;
            _logger = logger;
        }

        public async Task<IEnumerable<Controls>> GetAllControlsAsync()
        {
            try
            {
                return await _controlRepository.GetAllControlsAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetAllControlsAsync");
                throw;
            }
        }

        public async Task<Controls> GetControlByIdAsync(int id)
        {
            try
            {
                return await _controlRepository.GetControlByIdAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in GetControlByIdAsync with ID: {id}");
                throw;
            }
        }
    }
}
