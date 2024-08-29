using System.ComponentModel.DataAnnotations;

namespace ADMSSoftwareEngenieerSolution.Models.Domain
{
    public class AddCustomerRequestDTO
    {
        private string _firstName;
        private string _middleName;
        private string _lastName;
        private string _email;

        [Required]
        [StringLength(70,ErrorMessage = "First name cannot be longer than 70 characters")]
        public required string firstName { get=> _firstName; set=>_firstName = value.Trim(); }
        
        [StringLength(70,ErrorMessage = "Middle name cannot be longer than 70 characters")]
        public string middleName { get => _middleName; set => _middleName = value.Trim(); }
        [Required]
        [StringLength(70,ErrorMessage = "Last Name cannot be longer than 70 characters")]
        public required string lastName { get => _lastName; set => _lastName = value.Trim(); }
        [Required]
        [EmailAddress(ErrorMessage ="Invalid Email Address")]
        public required string email { get => _email; set => _email = value.Trim(); }
    }
}
