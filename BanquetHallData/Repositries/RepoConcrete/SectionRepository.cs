using BanquetHallData.ApplicationDbContext;
using BanquetHallData.Model;
using BanquetHallData.Repositries.RepoAbstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BanquetHallData.Repositries.RepoConcrete
{
    public class SectionRepository : BaseRepository, ISectionRepository
    {
        private readonly ILogger<SectionRepository> _logger;

        public SectionRepository(AppDbContext context, ILogger<SectionRepository> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<List<Section>> GetAllSections()
        {
            try
            {
                return await _context.SectionName.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all sections");
                throw new Exception("Error retrieving all sections", ex);
            }
        }

        public async Task<Section> GetSectionById(int sectionId)
        {
            try
            { 
                return await _context.SectionName.FindAsync(sectionId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving section with ID: {sectionId}");
                throw new Exception($"Error retrieving section with ID: {sectionId}", ex);
            }
        }

        public async Task CreateSection(Section section)
        {
            try
            {
                _context.SectionName.Add(section);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating section");
                throw new Exception("Error creating section", ex);
            }
        }

        public async Task UpdateSection(Section section)
        {
            try
            {
                _context.Entry(section).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating section with ID: {section.SectionId}");
                throw new Exception($"Error updating section with ID: {section.SectionId}", ex);
            }
        }

        public async Task DeleteSection(int sectionId)
        {
            try
            {
                var section = await _context.SectionName.FindAsync(sectionId);
                if (section != null)
                {
                    _context.SectionName.Remove(section);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting section with ID: {sectionId}");
                throw new Exception($"Error deleting section with ID: {sectionId}", ex);
            }
        }
    }
}
