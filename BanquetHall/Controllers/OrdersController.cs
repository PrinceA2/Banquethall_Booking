using BanquetHallBc.Business.BusinessAbstract;
using BanquetHallData.Model;
using Microsoft.AspNetCore.Mvc;


namespace BanquetHall.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        public readonly IOrderService _orderservice;
        public readonly ILogger<OrdersController> _logger;

        public OrdersController(IOrderService orderService, ILogger<OrdersController> logger)
        {
            _orderservice = orderService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Orders>>> GetAllOrders()
        {
            try
            {
                var orders = await _orderservice.GetAllOrdersAsync();
                return Ok(orders);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetAllOrders");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Orders>> GetOrder(int id)
        {
            try
            {
                var order = await _orderservice.GetOrderAsync(id);
                if (order == null)
                {
                    return NotFound();
                }
                return Ok(order);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in GetOrderById with ID: {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut]
        public async Task<ActionResult<Orders>> UpdateOrderStatusAsync(Orders order)
        {
            int id = order.orderId;
            try
            {
                var updated_status = await _orderservice.UpdateOrderStatusAsync(order);
                if (updated_status == null)
                {
                    return NotFound();
                }
                return Ok(updated_status);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in UpdateOrder with ID: {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]

        public async Task<ActionResult<Orders>> CreateOrderAsync(Orders order)
        {
            try
            {
                if (order == null)
                {
                    return BadRequest("Page name cannot be null.");
                }

                await _orderservice.CreateOrderAsync(order);
                return CreatedAtAction(nameof(GetOrder), new { id = order.orderId }, order);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in CreateOrder with");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]

        public  async Task<ActionResult<bool>> DeleteOrderAsync(int id)
        {
            try
            {
                var order = await _orderservice.DeleteOrderAsync(id);

                if (!order)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in DeleteOrder with ID: {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
