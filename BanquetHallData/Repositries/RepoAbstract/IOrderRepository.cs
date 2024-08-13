using BanquetHallData.Model;

namespace BanquetHallData.Repositries.RepoAbstract
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Orders>> GetAllOrdersAsync();

        Task<Orders> GetOrderAsync(int id);

        Task<Orders> CreateOrderAsync(Orders order);

        Task <Orders>UpdateOrderStatusAsync(Orders order);

        Task <bool> DeleteOrderAsync(int id);

    }
}
