using BanquetHallBc.Business.BusinessAbstract;
using BanquetHallData.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BanquetHall.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PageNamesController : ControllerBase
    {
        private readonly IPageNamesService _pageNamesService;
        private readonly ILogger<PageNamesController> _logger;

        public PageNamesController(IPageNamesService pageNamesService, ILogger<PageNamesController> logger)
        {
            _pageNamesService = pageNamesService;
            _logger = logger;
        }

        // GET: api/PageNames
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PageNames>>> GetAllPageNames()
        {
            try
            {
                var pageNames = await _pageNamesService.GetAllPageNamesAsync();
                return Ok(pageNames);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetAllPageNames");
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/PageNames
        [HttpPost]
        public async Task<ActionResult<PageNames>> CreatePageName(PageNames pageName)
        {
            try
            {
                if (pageName == null)
                {
                    return BadRequest("Page name cannot be null.");
                }

                var createdPageName = await _pageNamesService.CreatePageNameAsync(pageName);
                return CreatedAtAction(nameof(GetPageNameById), new { id = createdPageName.PageId }, createdPageName);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in CreatePageName");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/PageNames/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PageNames>> GetPageNameById(int id)
        {
            try
            {
                var pageName = await _pageNamesService.GetPageNameByIdAsync(id);
                if (pageName == null)
                {
                    return NotFound();
                }
                return Ok(pageName);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in GetPageNameById with ID: {id}");
                return StatusCode(500, "Internal server error");
            }
        }

       

        [HttpPut]
        public async Task<IActionResult> UpdatePageName( PageNames pageName)
        {
            int id = pageName.PageId;
            try
            {
                var updatedPageName = await _pageNamesService.UpdatePageNameAsync(pageName);
                if (updatedPageName == null)
                {
                    return NotFound();
                }
                return Ok(updatedPageName);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (await _pageNamesService.GetPageNameByIdAsync(id) == null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in UpdatePageName with ID: {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: api/PageNames/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePageName(int id)
        {
            try
            {
                var result = await _pageNamesService.DeletePageNameAsync(id);
                if (!result)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in DeletePageName with ID: {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
