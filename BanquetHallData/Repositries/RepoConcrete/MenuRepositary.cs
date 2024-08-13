using BanquetHallData.ApplicationDbContext;
using BanquetHallData.Model;
using BanquetHallData.Repositries.RepoAbstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BanquetHallData.Repositries.RepoConcrete
{
    public class MenuRepositary : BaseRepository, IMenuRepository
    {
        private readonly ILogger<MenuRepositary> _logger;

        public MenuRepositary(AppDbContext context, ILogger<MenuRepositary> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<IEnumerable<Menu>> GetAllMenuAsync()
        {
            try
            {
                return await _context.Menu.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all menu");
                throw new Exception("Error retrieving all menu", ex);
            }
        }

        public async Task<Menu> GetMenuByIdAsync(int id)
        {
            try
            {
                return await _context.Menu.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving menu with ID: {id}");
                throw new Exception($"Error retrieving menu with ID: {id}", ex);
            }
        }

        public async Task<Menu> CreateMenuAsync(Menu menu)
        {
            try
            {
                _context.Menu.Add(menu);  
                await _context.SaveChangesAsync();
                return menu;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating menu");
                throw new Exception("Error creating menu", ex);
            }
        }

        public async Task<Menu> UpdateMenuAsync(Menu menu)
        {
            try
            {
                _context.Entry(menu).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return menu;
            }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error updating menu with ID: {menu.Categoryid}");
                    throw new Exception($"Error updating menu with ID: {menu.Categoryid}", ex);
                }
        }

        public async Task<bool> DeleteMenuAsync(int id)
        {
            try
            {
                var menu = await _context.Menu.FindAsync(id);
                if (menu == null)
                {
                    return false;
                }

                _context.Menu.Remove(menu); 
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting menu with ID: {id}");
                throw new Exception($"Error deleting menu with ID: {id}", ex);
            }
        }
    }
}
