using BanquetHallBc.Business.BusinessAbstract;
using BanquetHallData.CompressionHelpers;
using BanquetHallData.Model;
using BanquetHallData.Repositries.RepoAbstract;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BanquetHallBc.Business.BusinessConcrete
{
    public class ContentService : IContentService
    {
        private readonly IContentRepository _contentRepository;
        private readonly ILogger<ContentService> _logger;

        public ContentService(IContentRepository contentRepository, ILogger<ContentService> logger)
        {
            _contentRepository = contentRepository;
            _logger = logger;
        }

        //public async Task<IEnumerable<Content>> GetAllContentsAsync()
        //{
        //    try
        //    {
        //        var contents = await _contentRepository.GetAllContentsAsync();
        //        var processedContents = new List<Content>();

        //        Parallel.ForEach(contents, content =>
        //        {
        //            if (!string.IsNullOrEmpty(content.ContentData) && GzipHelper.IsBase64String(content.ContentData))
        //            {
        //                content.ContentData = GzipHelper.DecompressBase64ToString(content.ContentData);
        //            }
        //            lock (processedContents)
        //            {
        //                processedContents.Add(content);
        //            }
        //        });

        //        return processedContents;
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, "Error in GetAllContentsAsync");
        //        throw;
        //    }
        //}

        public async Task<IEnumerable<Content>> GetAllContentsAsync()
        {
            try
            {
                var contents = await _contentRepository.GetAllContentsAsync();
                var processedContents = new List<Content>();

                foreach (var content in contents)
                {
                    if (!string.IsNullOrEmpty(content.ContentData) && GzipHelper.IsBase64String(content.ContentData))
                    {
                        content.ContentData = GzipHelper.DecompressBase64ToString(content.ContentData);
                    }
                    processedContents.Add(content);
                }

                return processedContents;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetAllContentsAsync");
                throw;
            }
        }

        public async Task<Content> GetContentByIdAsync(int id)
        {
            try
            {
                var content = await _contentRepository.GetContentByIdAsync(id);
                if (content != null && !string.IsNullOrEmpty(content.ContentData) && GzipHelper.IsBase64String(content.ContentData))
                {
                    content.ContentData = GzipHelper.DecompressBase64ToString(content.ContentData);
                }
                return content;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in GetContentByIdAsync with ID: {id}");
                throw;
            }
        }

        public async Task<IEnumerable<Content>> AddContentsAsync(IEnumerable<Content> contents)
        {
            try
            {
                foreach (var content in contents)
                {
                    if (!string.IsNullOrEmpty(content.ContentData))
                    {
                        if (GzipHelper.IsBase64String(content.ContentData))
                        {
                            content.ContentData = GzipHelper.CompressStringToBase64(content.ContentData);
                        }
                    }
                }
                return await _contentRepository.AddContentsAsync(contents);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in AddContentsAsync");
                throw;
            }
        }

        public async Task<IEnumerable<Content>> UpdateContentAsync(List<Content> contents)
        {
            try
            {
                foreach (var content in contents)
                {
                    if (!string.IsNullOrEmpty(content.ContentData))
                    {
                        if (GzipHelper.IsBase64String(content.ContentData))
                        {
                            content.ContentData = GzipHelper.CompressStringToBase64(content.ContentData);
                        }
                    }
                }

                return await _contentRepository.UpdateContentAsync(contents);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in UpdateContentAsync for multiple contents");
                throw;
            }
        }


        public async Task<bool> DeleteContentAsync(int id)
        {
            try
            {
                return await _contentRepository.DeleteContentAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in DeleteContentAsync with ID: {id}");
                throw;
            }
        }
    }
}
