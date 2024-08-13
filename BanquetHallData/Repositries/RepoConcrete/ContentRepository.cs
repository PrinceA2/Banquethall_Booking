using BanquetHallData.ApplicationDbContext;
using BanquetHallData.Model;
using BanquetHallData.Repositries.RepoAbstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BanquetHallData.Repositries.RepoConcrete
{
    public class ContentRepository : BaseRepository, IContentRepository
    {
        private readonly ILogger<ContentRepository> _logger;

        public ContentRepository(AppDbContext context, ILogger<ContentRepository> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<List<Content>> GetAllContentsAsync()
        {
            try
            {
                 var data = await _context.Content.ToListAsync();

                //int pageNumber = 1; // default page number
                //int pageSize = 10; // default page size

                //var data = await _context.Content
                //    .Skip((pageNumber - 1) * pageSize)
                //    .Take(pageSize)
                //    .ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all contents");
                throw new Exception("Error retrieving all contents", ex);
            }
        }


        public async Task<Content> GetContentByIdAsync(int id)
        {
            try
            {
                return await _context.Content.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving content with ID: {id}");
                throw new Exception($"Error retrieving content with ID: {id}", ex);
            }
        }

        public async Task<IEnumerable<Content>> AddContentsAsync(IEnumerable<Content> contents)
        {
            var createdContents = new List<Content>();

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    foreach (var content in contents)
                    {
                        _context.Content.Add(content);
                        createdContents.Add(content);
                    }

                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    _logger.LogError(ex, "Error adding multiple contents");
                    throw new Exception("Error adding multiple contents", ex);
                }
            }

            return createdContents;
        }
        public async Task<IEnumerable<Content>> UpdateContentAsync(List<Content> contents)
        {
            var updatedContents = new List<Content>();

            try
            {
                foreach (var content in contents)
                {
                    var existingContent = await _context.Content.FirstOrDefaultAsync(x => x.ContentId == content.ContentId && x.ControlId == content.ControlId);
                    if (existingContent != null)
                    {
                        // Update existing content
                        _context.Entry(existingContent).CurrentValues.SetValues(content);
                        updatedContents.Add(existingContent);
                    }
                    else
                    {
                        // Add new content
                        content.ContentId = 0;
                        _context.Content.Add(content);
                        updatedContents.Add(content);
                    }
                }

                await _context.SaveChangesAsync();
                return updatedContents;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error upserting contents");
                throw new Exception("Error upserting contents", ex);
            }
        }


        public async Task<bool> DeleteContentAsync(int id)
        {
            try
            {
                var content = await _context.Content.FindAsync(id);
                if (content == null)
                {
                    return false;
                }

                _context.Content.Remove(content);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting content with ID: {id}");
                throw new Exception($"Error deleting content with ID: {id}", ex);
            }
        }
    }
}
