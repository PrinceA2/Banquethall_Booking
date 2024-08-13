using BanquetHallData.ApplicationDbContext;
using BanquetHallData.Model;
using BanquetHallData.Repositries.RepoAbstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BanquetHallData.Repositries.RepoConcrete
{
    public class SubMenuPriceRepository : BaseRepository, ISubMenuPriceRepository
    {
        private readonly ILogger<SubMenuPriceRepository> _logger;

        public SubMenuPriceRepository(AppDbContext context, ILogger<SubMenuPriceRepository> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<IEnumerable<SubMenuPrice>> GetAllSubMenuPricesAsync()
        {
            try
            {
                return await _context.SubMenuPrice.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all sub-menu prices");
                throw new Exception("Error retrieving all sub-menu prices", ex);
            }
        }

        public async Task<SubMenuPrice> GetSubMenuPriceByIdAsync(int id)
        {
            try
            {
                return await _context.SubMenuPrice.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving sub-menu price with ID: {id}");
                throw new Exception($"Error retrieving sub-menu price with ID: {id}", ex);
            }
        }

        public async Task<SubMenuPrice> CreateSubMenuPriceAsync(SubMenuPrice subMenuPrice)
        {
            try
            {
                _context.SubMenuPrice.Add(subMenuPrice);
                await _context.SaveChangesAsync();
                return subMenuPrice;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating sub-menu price");
                throw new Exception("Error creating sub-menu price", ex);
            }
        }

        public async Task<SubMenuPrice> UpdateSubMenuPriceAsync(SubMenuPrice subMenuPrice)
        {
            try
            {
                _context.Entry(subMenuPrice).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return subMenuPrice;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating sub-menu price with ID: {subMenuPrice.PriceId}");
                throw new Exception($"Error updating sub-menu price with ID: {subMenuPrice.PriceId}", ex);
            }
        }

        public async Task<bool> DeleteSubMenuPriceAsync(int id)
        {
            try
            {
                var subMenuPrice = await _context.SubMenuPrice.FindAsync(id);
                if (subMenuPrice == null)
                {
                    // Log and return false if the entity was not found
                    _logger.LogWarning($"SubMenuPrice with ID: {id} not found");
                    return false;
                }

                _context.SubMenuPrice.Remove(subMenuPrice);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting SubMenuPrice with ID: {id}");
                throw new Exception($"Error deleting SubMenuPrice with ID: {id}", ex);
            }
        }

    }
}