using System.ComponentModel.DataAnnotations;

namespace ADMSSoftwareEngenieerSolution.Models.Domain
{
    public class ApplicationUser
    {
        public Guid Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
