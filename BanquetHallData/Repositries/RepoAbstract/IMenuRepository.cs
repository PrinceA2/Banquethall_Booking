﻿using BanquetHallData.Model;

namespace BanquetHallData.Repositries.RepoAbstract
{
    public interface IMenuRepository
    {
        Task<IEnumerable<Menu>> GetAllMenuAsync();
        Task<Menu> GetMenuByIdAsync(int id);       
        Task<Menu> CreateMenuAsync(Menu  menu);
        Task<Menu> UpdateMenuAsync(Menu  menu); 
        Task<bool> DeleteMenuAsync(int id); 
    }
}
