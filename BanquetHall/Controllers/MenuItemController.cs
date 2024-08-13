using BanquetHallBc.Business.BusinessAbstract;
using BanquetHallData.Dto;
using BanquetHallData.Model;
using Microsoft.AspNetCore.Mvc;

namespace BanquetHall.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemController : ControllerBase
    {
        private readonly IMenuItemService _menuItemService;
        private readonly ILogger<MenuItemController> _logger;
        public MenuItemController(IMenuItemService  menuItemService, ILogger<MenuItemController> logger)
        {
            _menuItemService = menuItemService;
            _logger = logger;
        }

        [HttpPost("Bulk")]  
        public async Task<IActionResult> PostMenuItem([FromBody] MenuItemListDto  menuItemListDto)  
        {
            if (menuItemListDto == null || menuItemListDto.menuItems == null || !menuItemListDto.menuItems.Any())
            {
                _logger.LogWarning("MenuItem list is empty or invalid.");
                return BadRequest("MenuItem list is empty or invalid.");
            }
                
            try
            {
                var createdContents = await _menuItemService.AddMenuItemAsync(menuItemListDto.menuItems);
                return Ok(createdContents);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in PostBulkMenuItem");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMenuItem(int id) 
        {
            try
            {
                var success = await _menuItemService.DeleteMenuItemAsync(id);
                if (!success)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in DeleteMenuItem with ID: {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MenuItem>>> GetAllMenuItem()     
        {
            try
            {
                var contents = await _menuItemService.GetAllMenuItemAsync();
                return Ok(contents);
            }   
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetContents");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Content>> GetMenuItem(int id)    
        {
            try
            {
                var content = await _menuItemService.GetMenuItemByIdAsync(id);
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
        public async Task<IActionResult > UpsertMenuItems([FromBody] MenuItemListDto menuItemListDto)
        {
            if (menuItemListDto == null || menuItemListDto.menuItems == null || !menuItemListDto.menuItems.Any())
            {
                _logger.LogWarning("MenuItem list is empty or invalid.");
                return BadRequest("MenuItem list is empty or invalid.");
            }

            try
            {
                var updatedMenuItems = await _menuItemService.UpsertMenuItemsAsync(menuItemListDto.menuItems);
                return Ok(updatedMenuItems);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in UpsertBulkMenuItems");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
