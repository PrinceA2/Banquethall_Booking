using BanquetHallBc.Business.BusinessAbstract;
using BanquetHallData.Model;
using Microsoft.AspNetCore.Mvc;

namespace BanquetHall.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ControlController : ControllerBase
    {
        private readonly IControlService _controlService;
        private readonly ILogger<ControlController> _logger;

        public ControlController(IControlService controlService, ILogger<ControlController> logger)
        {
            _controlService = controlService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Controls>>> GetAllControls()
        {
            try
            {
                var controls = await _controlService.GetAllControlsAsync();
                return Ok(controls);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetAllControls");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Controls>> GetControlById(int id)
        {
            try
            {
                var control = await _controlService.GetControlByIdAsync(id);
                if (control == null)
                {
                    return NotFound();
                }
                return Ok(control);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in GetControlById with ID: {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
