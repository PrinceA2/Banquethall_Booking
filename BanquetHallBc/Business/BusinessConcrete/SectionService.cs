using BanquetHallBc.Business.BusinessAbstract;
using BanquetHallData.Model;
using BanquetHallData.Repositries.RepoAbstract;
using Microsoft.Extensions.Logging;

namespace BanquetHall.Business.Implementations
{
    public class SectionService : ISectionService
    {
        private readonly ISectionRepository _sectionRepository;
        private readonly ILogger<SectionService> _logger;

        public SectionService(ISectionRepository sectionRepository, ILogger<SectionService> logger)
        {
            _sectionRepository = sectionRepository;
            _logger = logger;
        }

        public async Task<List<Section>> GetAllSections()
        {
            try
            {
                return await _sectionRepository.GetAllSections();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetAllSections");
                throw; 
            }
        }

        public async Task<Section> GetSectionById(int sectionId)
        {
            try
            {
                return await _sectionRepository.GetSectionById(sectionId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in GetSectionById with ID: {sectionId}");
                throw;
            }
        }

        public async Task CreateSection(Section section)
        {
            try
            {
                await _sectionRepository.CreateSection(section);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in CreateSection");
                throw;
            }
        }

        public async Task UpdateSection(Section section)
        {
            try
            {
                await _sectionRepository.UpdateSection(section);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in UpdateSection with ID: {section.SectionId}");
                throw;
            }
        }

        public async Task DeleteSection(int sectionId)
        {
            try
            {
                await _sectionRepository.DeleteSection(sectionId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in DeleteSection with ID: {sectionId}");
                throw;
            }
        }
    }
}
