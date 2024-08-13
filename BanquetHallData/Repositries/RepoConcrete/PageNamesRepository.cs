using BanquetHallData.ApplicationDbContext;
using BanquetHallData.Model;
using BanquetHallData.Repositries.RepoAbstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BanquetHallData.Repositries.RepoConcrete
{
    public class PageNamesRepository : BaseRepository, IPageNamesRepository
    {
        private readonly ILogger<PageNamesRepository> _logger;

        public PageNamesRepository(AppDbContext context, ILogger<PageNamesRepository> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<IEnumerable<PageNames>> GetAllPageNamesAsync()
        {
            try
            {
                return await _context.PageName.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all page names");
                throw new Exception("Error retrieving all page names", ex);
            }
        }
       
        public async Task<PageNames> GetPageNameByIdAsync(int id)
        {
            try
            {
                return await _context.PageName.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving page name with ID: {id}");
                throw new Exception($"Error retrieving page name with ID: {id}", ex);
            }
        }

        public async Task<PageNames> CreatePageNameAsync(PageNames pageName)
        {
            try
            {
                _context.PageName.Add(pageName);
                await _context.SaveChangesAsync();
                return pageName;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,"Error creating page name");
                throw new Exception("Error creating page name", ex);
            }
        }

        public async Task<PageNames> UpdatePageNameAsync(PageNames pageName)
        {
            try
            {
                _context.Entry(pageName).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return pageName;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating page name with ID: {pageName.PageId}");
                throw new Exception($"Error updating page name with ID: {pageName.PageId}", ex);
            }
        }

        public async Task<bool> DeletePageNameAsync(int id)
        {
            try
            {
                var pageName = await _context.PageName.FindAsync(id);
                if (pageName == null)
                {
                    return false;
                }

                _context.PageName.Remove(pageName);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting page name with ID: {id}");
                throw new Exception($"Error deleting page name with ID: {id}", ex);
            }
        }

        public async Task<bool> DeleteSubMenuPriceAsync(int id)
        {
            try
            {
                var subMenuPrice = await _context.SubMenuPrice.FindAsync(id);
                if (subMenuPrice == null)
                {
                    return false;
                }

                _context.SubMenuPrice.Remove(subMenuPrice);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting sub-menu price with ID: {id}");
                throw new Exception($"Error deleting sub-menu price with ID: {id}", ex);
            }
        }
    }
}
