using ADMSSoftwareEngenieerSolution.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ADMSSoftwareEngenieerSolution.Data
{
    public class DefaultData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ADMSSpikeSolution(serviceProvider.GetRequiredService<DbContextOptions<ADMSSpikeSolution>>()))
            {
                if (context.Users.Any())
                {
                    return;     //Db already has values
                }
                context.Users.AddRange(new ApplicationUser
                {
                    Username = "admin",
                    Password = "admin"
                });
            }
        }
    }
}
