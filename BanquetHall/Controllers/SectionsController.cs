using BanquetHallBc.Business.BusinessAbstract;
using BanquetHallData.Model;
using Microsoft.AspNetCore.Mvc;

namespace BanquetHall.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectionController : ControllerBase
    {
        private readonly ISectionService _sectionService;
        private readonly ILogger<SectionController> _logger;

        public SectionController(ISectionService sectionService, ILogger<SectionController> logger)
        {
            _sectionService = sectionService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Section>>> GetAllSections()
        {
            try
            {
                var sections = await _sectionService.GetAllSections();
                return Ok(sections);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetAllSections");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Section>> GetSectionById(int id)
        {
            try
            {
                var section = await _sectionService.GetSectionById(id);
                if (section == null)
                {
                    return NotFound();
                }
                return Ok(section);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in GetSectionById with ID: {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateSection([FromBody] Section section)
        {
            try
            {
                if (section == null)
                {
                    return BadRequest("Section cannot be null.");
                }

                await _sectionService.CreateSection(section);
                return CreatedAtAction(nameof(GetSectionById), new { id = section.SectionId }, section);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in CreateSection");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut]
        public async Task<ActionResult> UpdateSection( Section section)
        {
            int id  = section.SectionId;    
            try
            {
                if (section == null || id != section.SectionId)
                {
                    return BadRequest("Section ID mismatch or Section is null.");
                }

                var existingSection = await _sectionService.GetSectionById(id);
                if (existingSection == null)
                {
                    return NotFound();
                }

                await _sectionService.UpdateSection(section);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in UpdateSection with ID: {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSection(int id)
        {
            try
            {
                var existingSection = await _sectionService.GetSectionById(id);
                if (existingSection == null)
                {
                    return NotFound();
                }

                await _sectionService.DeleteSection(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in DeleteSection with ID: {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
