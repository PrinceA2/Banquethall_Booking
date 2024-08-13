using BanquetHallData.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BanquetHallData.Repositries.RepoAbstract
{
    public interface IControlRepository
    {
        Task<IEnumerable<Controls>> GetAllControlsAsync();
        Task<Controls> GetControlByIdAsync(int id);
    }
}
