using BanquetHallBc.Business.BusinessAbstract;
using BanquetHallData.Model;
using BanquetHallData.Repositries.RepoAbstract;
using Microsoft.Extensions.Logging;

namespace BanquetHallBc.Business.BusinessConcrete
{
    public class MenuItemService : IMenuItemService
    {
        private readonly IMenuItemRepository _menuItemRepository;
        private readonly ILogger<MenuItemService> _logger;

        public MenuItemService(IMenuItemRepository menuItemRepository, ILogger<MenuItemService> logger)
        {
            _menuItemRepository = menuItemRepository; 
            _logger = logger;
        }

        public async Task<IEnumerable<MenuItem>> AddMenuItemAsync(List<MenuItem> menuItems)
        {
            try
            {
                return await _menuItemRepository.AddMenuItemAsync(menuItems);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in AddMenuItemAsync");
                throw;
            }

        }

        public async Task<bool> DeleteMenuItemAsync(int id)
        {
            try
            {
                return await _menuItemRepository.DeleteMenuItemAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in DeleteMenuItemAsync with ID: {id}");
                throw;
            }
        }

        public async Task<IEnumerable<MenuItem>> GetAllMenuItemAsync()
        {       
            try
            {
                var result = await _menuItemRepository.GetAllMenuItemAsync();
               

                return result;  
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetAllContentsAsync");
                throw;
            }
        }

        public async Task<MenuItem> GetMenuItemByIdAsync(int id)
        {
            try
            {
                var result = await _menuItemRepository.GetMenuItemByIdAsync(id);
               return result;
            }

            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in GetContentByIdAsync with ID: {id}");
                throw;
            }
        }

        public async Task<IEnumerable<MenuItem>> UpsertMenuItemsAsync(List<MenuItem> menuItems)
        {
            try
            {
                return await _menuItemRepository.UpsertMenuItemsAsync(menuItems);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in UpsertMenuItemsAsync");
                throw;
            }
        }
    }
}