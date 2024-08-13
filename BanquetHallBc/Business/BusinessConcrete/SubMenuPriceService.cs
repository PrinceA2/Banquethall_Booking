using BanquetHallBc.Business.BusinessAbstract;
using BanquetHallData.Enum;
using BanquetHallData.Model;
using BanquetHallData.Repositries.RepoAbstract;
using Microsoft.Extensions.Logging;

namespace BanquetHallBc.Business.BusinessConcrete
{
    public class SubMenuPriceService : ISubMenuPriceService
    {
            
        private readonly ISubMenuPriceRepository  _subMenuPriceRepository;
        private readonly ILogger<SubMenuPriceService> _logger;

        public SubMenuPriceService(ISubMenuPriceRepository subMenuPriceRepository  , ILogger<SubMenuPriceService> logger)
        {
            _subMenuPriceRepository = subMenuPriceRepository;
            _logger = logger;
        }

        public async Task<IEnumerable<SubMenuPrice>> GetAllSubMenuPricesAsync()
        {
            try
            {
                return await _subMenuPriceRepository.GetAllSubMenuPricesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetAllSubMenuPricesAsync");
                throw;
            }
        }

        public async Task<SubMenuPrice> GetSubMenuPriceByIdAsync(int id)
        {
            try
            {
                return await _subMenuPriceRepository.GetSubMenuPriceByIdAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in GetSubMenuPriceByIdAsync with ID: {id}");
                throw;
            }
        }

        public async Task<SubMenuPrice> CreateSubMenuPriceAsync(SubMenuPrice subMenuPrice)
        {
            try
            {
                // Validate enum value
                if (!Enum.IsDefined(typeof(Quantity), subMenuPrice.Quantity))
                {
                    throw new ArgumentException("Invalid quantity value");
                }

                return await _subMenuPriceRepository.CreateSubMenuPriceAsync(subMenuPrice);
            }
            catch (ArgumentException ex)
            {
                _logger.LogError(ex, "Error in CreateSubMenuPriceAsync: Invalid quantity value");
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in CreateSubMenuPriceAsync");
                throw;
            }
        }

        public async Task<SubMenuPrice> UpdateSubMenuPriceAsync(SubMenuPrice subMenuPrice)
        {
            try
            {
                // Validate enum value
                if (!Enum.IsDefined(typeof(Quantity), subMenuPrice.Quantity))
                {
                    throw new ArgumentException("Invalid quantity value");
                }

                return await _subMenuPriceRepository.UpdateSubMenuPriceAsync(subMenuPrice);
            }
            catch (ArgumentException ex)
            {
                _logger.LogError(ex, "Error in UpdateSubMenuPriceAsync: Invalid quantity value");
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in UpdateSubMenuPriceAsync with ID: {subMenuPrice.PriceId}");
                throw;
            }
        }

        public async Task<bool> DeleteSubMenuPriceAsync(int id)
        {
            try
            {
                return await _subMenuPriceRepository.DeleteSubMenuPriceAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in DeleteSubMenuPriceAsync with ID: {id}");
                throw;
            }
        }
    }
}
