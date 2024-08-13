using BanquetHallBc.Business.BusinessAbstract;
using BanquetHallData.Model;
using BanquetHallData.Repositries.RepoAbstract;
using Microsoft.Extensions.Logging;

namespace BanquetHallBc.Business.BusinessConcrete
{
    public class PageNamesService : IPageNamesService
    {
        private readonly IPageNamesRepository _pageNamesRepository;
        private readonly ILogger<PageNamesService> _logger;

        public PageNamesService(IPageNamesRepository pageNamesRepository, ILogger<PageNamesService> logger)
        {
            _pageNamesRepository = pageNamesRepository;
            _logger = logger;
        }

        public async Task<IEnumerable<PageNames>> GetAllPageNamesAsync()
        {
            try
            {
                return await _pageNamesRepository.GetAllPageNamesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetAllPageNamesAsync");
                throw;
            }
        }

        public async Task<PageNames> GetPageNameByIdAsync(int id)
        {
            try
            {
                return await _pageNamesRepository.GetPageNameByIdAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in GetPageNameByIdAsync with ID: {id}");
                throw;
            }
        }

        public async Task<PageNames> CreatePageNameAsync(PageNames pageName)
        {
            try
            {
                return await _pageNamesRepository.CreatePageNameAsync(pageName);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in CreatePageNameAsync");
                throw;
            }
        }

        public async Task<PageNames> UpdatePageNameAsync(PageNames pageName)
        {
            try
            {
                return await _pageNamesRepository.UpdatePageNameAsync(pageName);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in UpdatePageNameAsync with ID: {pageName.PageId}");
                throw;
            }
        }

        public async Task<bool> DeletePageNameAsync(int id)
        {
            try
            {
                return await _pageNamesRepository.DeletePageNameAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in DeletePageNameAsync with ID: {id}");
                throw;
            }
        }
    }
}
