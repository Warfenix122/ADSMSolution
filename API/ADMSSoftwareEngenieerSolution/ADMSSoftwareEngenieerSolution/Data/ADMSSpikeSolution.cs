using ADMSSoftwareEngenieerSolution.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ADMSSoftwareEngenieerSolution.Data
{
    public class ADMSSpikeSolution : DbContext
    {
        public ADMSSpikeSolution(DbContextOptions options): base(options) { 
            
        }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<ApplicationUser> Users { get; set; }

    }
}
