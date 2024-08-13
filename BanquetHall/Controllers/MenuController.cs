using BanquetHallBc.Business.BusinessAbstract;
using BanquetHallData.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BanquetHall.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService _menuService;
        private readonly ILogger<MenuController> _logger;

        public MenuController(IMenuService menuService, ILogger<MenuController> logger)
        {
            _menuService = menuService;
            _logger = logger;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Menu>>> GetAllMenus()
        {
            try
            {
                var pageNames = await _menuService.GetAllMenuAsync();
                return Ok(pageNames);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetAllMenu");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Menu>> CreateMenu(Menu  menu)
        {
            try
            {
                if (menu == null)
                {
                    return BadRequest("Menu cannot be null.");
                }

                var createdMenu = await _menuService.CreateMenuAsync(menu);
                return CreatedAtAction(nameof(GetMenuById), new { id = createdMenu.Categoryid }, createdMenu);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in CreateMenu");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/PageNames/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Menu>> GetMenuById(int id)
        {
            try
            {
                var menu = await _menuService.GetMenuByIdAsync(id);
                if (menu == null)
                {
                    return NotFound();
                }
                return Ok(menu);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in GetMenuById with ID: {id}");
                return StatusCode(500, "Internal server error");
            }
        }



        [HttpPut]
        public async Task<IActionResult> UpdateMenu(Menu menu)
        {
            int id = menu.Categoryid;
            try
            {
                var updatedMenu = await _menuService.UpdateMenuAsync(menu);
                if (updatedMenu == null)
                {
                    return NotFound();
                }
                return Ok(updatedMenu);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (await _menuService.GetMenuByIdAsync(id) == null)
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
                _logger.LogError(ex, $"Error in UpdateMenu with ID: {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: api/PageNames/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMenu(int id)
        {
            try
            {
                var result = await _menuService.DeleteMenuAsync(id);
                if (!result)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in DeleteMenu with ID: {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
