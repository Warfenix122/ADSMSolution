using ADMSSoftwareEngenieerSolution.Data;
using ADMSSoftwareEngenieerSolution.Models.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ADMSSoftwareEngenieerSolution.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ADMSSpikeSolution dbContext;
        private readonly ILogger<LoginController> _logger;
        public CustomerController(ADMSSpikeSolution dbContext, ILogger<LoginController> logger)
        {
            this.dbContext = dbContext;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            _logger.LogInformation("Call that returns all customers made at {Time}",DateTime.UtcNow);
            var customers = dbContext.Customers.ToList();
            return Ok(customers);
        }
        [HttpPost]
        public IActionResult AddCustomer(AddCustomerRequestDTO request)
        {
            try
            {
                _logger.LogInformation($"request to add customer made at {DateTime.UtcNow}");
                _logger.LogDebug($"Request:{request}");
                if (ModelState.IsValid)
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
                    _logger.LogInformation($"Customer added successfully");
                    return Ok(domainModelCustomer);
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex) {
                _logger.LogError($"An error occurred while adding a customer {ex} with message: {ex.Message}");
                return StatusCode(500,"An unexpected error occurred");
            }
            
        }
    }
}
