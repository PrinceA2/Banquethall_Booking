using BanquetHallBc.Business.BusinessAbstract;
using BanquetHallData.Enum;
using BanquetHallData.Model;
using Microsoft.AspNetCore.Mvc;

namespace BanquetHallApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubMenuPriceController : ControllerBase
    {
        private readonly ISubMenuPriceService _subMenuPriceService;
        private readonly ILogger<SubMenuPriceController> _logger;

        public SubMenuPriceController(ISubMenuPriceService subMenuPriceService, ILogger<SubMenuPriceController> logger)
        {
            _subMenuPriceService = subMenuPriceService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubMenuPrice>>> GetAllSubMenuPrices()
        {
            try
            {
                var subMenuPrices = await _subMenuPriceService.GetAllSubMenuPricesAsync();
                return Ok(subMenuPrices);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetAllSubMenuPrices");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SubMenuPrice>> GetSubMenuPriceById(int id)
        {
            try
            {
                var subMenuPrice = await _subMenuPriceService.GetSubMenuPriceByIdAsync(id);
                if (subMenuPrice == null)
                {
                    return NotFound();
                }
                return Ok(subMenuPrice);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in GetSubMenuPriceById with ID: {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<SubMenuPrice>> CreateSubMenuPrice([FromBody] SubMenuPrice subMenuPrice)
        {
            if (!Enum.IsDefined(typeof(Quantity), subMenuPrice.Quantity))
            {
                return BadRequest("Invalid quantity value");
            }

            try
            {
                var createdSubMenuPrice = await _subMenuPriceService.CreateSubMenuPriceAsync(subMenuPrice);
                return CreatedAtAction(nameof(GetSubMenuPriceById), new { id = createdSubMenuPrice.PriceId }, createdSubMenuPrice);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in CreateSubMenuPrice");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut]
        public async Task<ActionResult<SubMenuPrice>> UpdateSubMenuPrice([FromBody] SubMenuPrice subMenuPrice)
        {
            if (subMenuPrice == null)
            {
                return BadRequest("Invalid data");
            }


            if (!Enum.IsDefined(typeof(Quantity), subMenuPrice.Quantity))
            {
                return BadRequest("Invalid quantity value");
            }

            try
            {
                var updatedSubMenuPrice = await _subMenuPriceService.UpdateSubMenuPriceAsync(subMenuPrice);
                if (updatedSubMenuPrice == null)
                {
                    return NotFound($"SubMenuPrice with ID {subMenuPrice.PriceId} not found");
                }
                return Ok(updatedSubMenuPrice);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in UpdateSubMenuPrice with ID: {subMenuPrice.PriceId}");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubMenuPrice(int id)
        {
            try
            {
                var result = await _subMenuPriceService.DeleteSubMenuPriceAsync(id);
                if (result)
                {
                    return NoContent();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in DeleteSubMenuPrice with ID: {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
