using BanquetHallData.ApplicationDbContext;
using BanquetHallData.Model;
using BanquetHallData.Repositries.RepoAbstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BanquetHallData.Repositries.RepoConcrete
{ 
    public class ControlRepository : BaseRepository, IControlRepository
    {
        private readonly ILogger<ControlRepository> _logger;

        public ControlRepository(AppDbContext context, ILogger<ControlRepository> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<IEnumerable<Controls>> GetAllControlsAsync()
        {
            try
            { 

                return await _context.Control.ToListAsync();
            }
            catch (Exception ex)
            {

                _logger.LogError(ex, "Error retrieving all controls");
                throw new Exception("Error retrieving all controls", ex);
            }
        }


        public async Task<Controls> GetControlByIdAsync(int id)
        {
            try
            {
                return await _context.Control.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving control with ID: {id}");
                throw new Exception($"Error retrieving control with ID: {id}", ex);
            }
        }
    }
}
