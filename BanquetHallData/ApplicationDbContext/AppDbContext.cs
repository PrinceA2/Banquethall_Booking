using BanquetHallData.Model;
using Microsoft.EntityFrameworkCore;

namespace BanquetHallData.ApplicationDbContext
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Controls> Control { get; set; }
        public DbSet<PageNames> PageName { get; set; }
        public DbSet<Section> SectionName { get; set; }
        public DbSet<Content> Content { get; set; }
        public DbSet<Menu> Menu { get; set; }         
        public DbSet<MenuItem> MenuItem { get; set; }   
        public DbSet<SubMenuPrice> SubMenuPrice { get; set; }
        public DbSet<Orders> Orders { get; set; }

    }   
}
