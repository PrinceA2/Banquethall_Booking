using BanquetHallBc.Business.BusinessAbstract;
using BanquetHallData.Model;
using BanquetHallData.Repositries.RepoAbstract;
using Microsoft.Extensions.Logging;

namespace BanquetHallBc.Business.BusinessConcrete
{
    public class OrderService : IOrderService
    {

        private readonly IOrderRepository _orderRepository;

        private readonly ILogger<OrderService> _logger;

        public OrderService(IOrderRepository orderRepository, ILogger<OrderService> logger)
        {
            _orderRepository = orderRepository;
            _logger = logger;
        }

        public async Task<IEnumerable<Orders>> GetAllOrdersAsync()
        {
            try
            {
                return await _orderRepository.GetAllOrdersAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetAllOrdersAsync");
                throw;
            }
        }

        public async Task<Orders> GetOrderAsync(int id)
        {
            try
            {
                return await _orderRepository.GetOrderAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetOrderAsync");
                throw;
            }
        }

        public async Task<Orders> UpdateOrderStatusAsync(Orders order)
        {
            try
            {
                return await _orderRepository.UpdateOrderStatusAsync(order);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in UpdateOrderAsync");
                throw;
            }
        }

        public async Task<Orders> CreateOrderAsync(Orders order)
        {
            try
            {
                return await _orderRepository.CreateOrderAsync(order);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in CreateOrderAsync");
                throw;
            }
        }

        public async Task<bool> DeleteOrderAsync(int id)
        {
            try
            {
                return await _orderRepository.DeleteOrderAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in DeleteOrderAsync");
                throw;
            }
        }
    }
}
