using ADMSSoftwareEngenieerSolution.Data;
using ADMSSoftwareEngenieerSolution.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ADMSSoftwareEngenieerSolution.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ADMSSpikeSolution dbContext;
        public CustomerController(ADMSSpikeSolution dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            var customers = dbContext.Customers.ToList();
            return Ok(customers);
        }
        [HttpPost]
        public IActionResult AddCustomer(AddCustomerRequestDTO request)
        {
            var domainModelCustomer = new Customer
            {
                Id = Guid.NewGuid(),
                firstName = request.firstName,
                middleName = request.middleName,
                lastName = request.lastName,
                email = request.email,
            };

            dbContext.Customers.Add(domainModelCustomer);
            dbContext.SaveChanges();
            return Ok(domainModelCustomer);
        }
    }
}
