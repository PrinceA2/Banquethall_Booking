using BanquetHallData.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BanquetHallBc.Business.BusinessAbstract
{
    public interface IOrderService
    {
        Task<IEnumerable<Orders>> GetAllOrdersAsync();

        Task<Orders> GetOrderAsync(int id);

        Task<Orders> UpdateOrderStatusAsync(Orders order);

        Task<Orders> CreateOrderAsync(Orders order);

        Task<bool> DeleteOrderAsync(int id);
    }
}
