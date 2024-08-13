using BanquetHallBc.Business.BusinessAbstract;
using BanquetHallData.Model;
using BanquetHallData.Repositries.RepoAbstract;
using Microsoft.Extensions.Logging;
namespace BanquetHallBc.Business.BusinessConcrete
{
    public  class MenuService : IMenuService
    {
        private readonly IMenuRepository   _menuRepository;
        private readonly ILogger<MenuService> _logger;

        public MenuService(IMenuRepository menuRepository, ILogger<MenuService> logger)    
        {
            _menuRepository = menuRepository;
            _logger = logger;
        }

        public async Task<IEnumerable<Menu>> GetAllMenuAsync()
        {
            try
            {
                return await _menuRepository.GetAllMenuAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetAllMenuAsync");
                throw;
            }   
        }

        public async Task<Menu> GetMenuByIdAsync(int id)
        {
            try
            {
                return await _menuRepository.GetMenuByIdAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in GetMenuByIdAsync with ID: {id}");
                throw;
            }
        }

        public async Task<Menu> CreateMenuAsync(Menu pageName)
        {
            try
            {
                return await _menuRepository.CreateMenuAsync(pageName);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in CreateMenuAsync");
                throw;
            }
        }

        public async Task<Menu> UpdateMenuAsync(Menu pageName)
        {
            try
            {
                return await _menuRepository.UpdateMenuAsync(pageName);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in UpdateMenuAsync with ID: {pageName.Categoryid}");
                throw;
            }
        }
            
        public async Task<bool> DeleteMenuAsync(int id)
        {
            try
            {
                return await _menuRepository.DeleteMenuAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in DeleteMenuAsync with ID: {id}");
                throw;
            }
        }

    }
}
