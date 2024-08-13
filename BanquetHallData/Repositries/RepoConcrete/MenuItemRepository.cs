using BanquetHallData.ApplicationDbContext;
using BanquetHallData.Model;
using BanquetHallData.Repositries.RepoAbstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BanquetHallData.Repositries.RepoConcrete
{
    public class MenuItemRepository : BaseRepository,IMenuItemRepository
    {
        private readonly ILogger<MenuItemRepository> _logger;

        public MenuItemRepository(AppDbContext context, ILogger<MenuItemRepository> logger) : base(context)
        {
            _logger = logger;   
        }

        public async Task<IEnumerable<MenuItem>> AddMenuItemAsync(List<MenuItem>  menuItems)
        {   
            var createdMenus = new List<MenuItem>();

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    foreach (var menuitem in menuItems) 
                    {
                        _context.MenuItem.Add(menuitem);
                        createdMenus.Add(menuitem);
                    }

                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    _logger.LogError(ex, "Error adding multiple Menuitem");
                    throw new Exception("Error adding multiple Menuitem", ex);
                }
            }

            return createdMenus;
        }

        public async Task<List<MenuItem>> GetAllMenuItemAsync() 
        {
            try
            {
                var data = await _context.MenuItem.ToListAsync();
        
                return data;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all MenuItem");
                throw new Exception("Error retrieving all MenuItem", ex);
            }
        }

        public async Task<MenuItem> GetMenuItemByIdAsync(int id)    
        {
            try
            {
                return await _context.MenuItem.FindAsync(id);   
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving MenuItem with ID: {id}");
                throw new Exception($"Error retrieving MenuItem with ID: {id}", ex);
            }
        }

        public async Task<bool> DeleteMenuItemAsync(int id) 
        {
            try
            {
                var menuItem = await _context.MenuItem.FindAsync(id);
                if (menuItem == null)
                {
                    return false;
                }

                _context.MenuItem.Remove(menuItem);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting menuItem with ID: {id}");
                throw new Exception($"Error deleting menuItem with ID: {id}", ex);
            }
        }

        public async Task<IEnumerable<MenuItem>> UpsertMenuItemsAsync(List<MenuItem> menuItems)
        {
            var updatedMenuItems = new List<MenuItem>();

            try
            {
                foreach (var menuItem in menuItems)
                {
                    var existingMenuItem = await _context.MenuItem
                        .FirstOrDefaultAsync(x => x.MenuId == menuItem.MenuId && x.CategoryId == menuItem.CategoryId                     );

                    if (existingMenuItem != null)
                    {
                        _context.Entry(existingMenuItem).CurrentValues.SetValues(menuItem);
                        updatedMenuItems.Add(existingMenuItem);

                    }
                    else
                    {

                        _context.MenuItem.Add(menuItem);
                        updatedMenuItems.Add(menuItem);
                    }
                }

                await _context.SaveChangesAsync();
                return updatedMenuItems;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error upserting menu items");
                throw new Exception("Error upserting menu items", ex);
            }
        }

    }
}
