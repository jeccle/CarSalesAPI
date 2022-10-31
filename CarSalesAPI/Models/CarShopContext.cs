using Microsoft.EntityFrameworkCore;

namespace CarSalesAPI.Models
{
    public class CarShopContext : DbContext
    {
        public CarShopContext(DbContextOptions<CarShopContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>()
                .HasMany(c => c.products)
                .WithOne(c => c.category)
                .HasForeignKey(a => a.categoryID);

            modelBuilder.Seed();
        }

        public DbSet<Product> products { get; set; }
        public DbSet<Category> categories { get; set; }


    }
}
