using Microsoft.EntityFrameworkCore;
using ChangeRoiPredictor.Api.Models;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace ChangeRoiPredictor.Api.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectMonthlyData> ProjectMonthlyData { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Configure one-to-many relationship between Project and MonthlyData.
            modelBuilder.Entity<Project>()
                .HasMany(p => p.MonthlyData)
                .WithOne(m => m.Project)
                .HasForeignKey(m => m.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
