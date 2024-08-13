using BanquetHallBc.Business.BusinessAbstract;
using BanquetHallData.Dto;
using BanquetHallData.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BanquetHall.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContentsController : ControllerBase
    {
        private readonly IContentService _contentService;
        private readonly ILogger<ContentsController> _logger;

        public ContentsController(IContentService contentService, ILogger<ContentsController> logger)
        {
            _contentService = contentService;
            _logger = logger;
        }

        // GET: api/Contents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Content>>> GetContents()
        {
            try
            {
                var contents = await _contentService.GetAllContentsAsync();
                return Ok(contents);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetContents");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("Bulk")]
        public async Task<IActionResult> PostBulkContent([FromBody] ContentListDto contentListDto)
        {
            if (contentListDto == null || contentListDto.Contents == null || !contentListDto.Contents.Any())
            {
                _logger.LogWarning("Content list is empty or invalid.");
                return BadRequest("Content list is empty or invalid.");
            }

            try
            {
                var createdContents = await _contentService.AddContentsAsync(contentListDto.Contents);
                return Ok(createdContents);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in PostBulkContent");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Content>> GetContent(int id)
        {
            try
            {
                var content = await _contentService.GetContentByIdAsync(id);
                if (content == null)
                {
                    return NotFound();
                }
                return Ok(content);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in GetContent with ID: {id}");
                return StatusCode(500, "Internal server error");            
            }
        }

        [HttpPut("Bulk")]
        public async Task<IActionResult> PutBulkContent([FromBody] ContentListDto contentListDto)
        {
            if (contentListDto == null || contentListDto.Contents == null || !contentListDto.Contents.Any())
            {
                _logger.LogWarning("Content list is empty or invalid.");
                return BadRequest("Content list is empty or invalid.");
            }

            try
            {
                var updatedContents = await _contentService.UpdateContentAsync(contentListDto.Contents);
                return Ok(updatedContents);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in PutBulkContent");
                return StatusCode(500, "Internal server error");
            }
        }


        // DELETE: api/Contents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContent(int id)
        {
            try
            {
                var success = await _contentService.DeleteContentAsync(id);
                if (!success)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in DeleteContent with ID: {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        private async Task<bool> ContentExists(int id)
        {
            return await _contentService.GetContentByIdAsync(id) != null;
        }
    }
}
