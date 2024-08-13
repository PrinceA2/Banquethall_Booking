using BanquetHallData.ApplicationDbContext;
using BanquetHallData.Model;
using BanquetHallData.Repositries.RepoAbstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BanquetHallData.Repositries.RepoConcrete
{
    public class OrderRepository : BaseRepository, IOrderRepository
    {

        private readonly ILogger<OrderRepository> _logger;

        public OrderRepository(AppDbContext _context, ILogger<OrderRepository> logger) : base(_context)
        {
            _logger = logger;
        }

        public async Task<IEnumerable<Orders>> GetAllOrdersAsync()
        {
            try
            {
                return await _context.Orders.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all orders");
                throw new Exception("Error retrieving all orders", ex);
            }
        }

        public async Task<Orders> GetOrderAsync(int id)
        {
            try
            {
                var order = await _context.Orders.FindAsync(id);

                if (order == null)
                {
                    _logger.LogWarning($"Order with ID: {id} not found.");
                    return null;
                }

                return order;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving order with ID: {id}");
                throw new Exception($"Error retrieving order with ID: {id}", ex);
            }
        }

        public async Task<Orders> UpdateOrderStatusAsync(Orders order)
        {
            try
            {
                _context.Entry(order).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return order;
            }

            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating menu with ID: {order.orderId}");
                throw new Exception($"Error updating menu with ID: {order.orderId}", ex);
            }
        }

        public async Task<Orders> CreateOrderAsync(Orders order)
        {
            if (order == null)
            {
                throw new ArgumentNullException(nameof(order), "Order cannot be null");
            }
            try
            {
                await _context.Orders.AddAsync(order);
                await _context.SaveChangesAsync();
                return order;
            }
            catch (DbUpdateException dbEx)
            {
                _logger.LogError(dbEx, "Database update error occurred while creating an order.");
                throw new Exception("An error occurred while saving the order to the database.", dbEx);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while creating an order.");
                throw new Exception("An unexpected error occurred while creating the order.", ex);
            }
        }

        public async Task<bool> DeleteOrderAsync(int id)
        {
            try
            {
                var order = await _context.Orders.FindAsync(id);

                if (order == null)
                {
                    return false;
                }

                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while deleting an order.");
                throw new Exception("An unexpected error occurred while deleting the order.", ex);
            }
            }
        }
    }