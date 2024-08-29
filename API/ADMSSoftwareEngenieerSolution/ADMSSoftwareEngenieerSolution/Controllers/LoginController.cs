using ADMSSoftwareEngenieerSolution.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NuGet.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ADMSSoftwareEngenieerSolution.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<LoginController> _logger;

        public LoginController(IConfiguration configuration, ILogger<LoginController> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        [HttpPost]
        public IActionResult login(ApplicationUser login)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _logger.LogInformation("Login requested by user {User} at {Time}", login.Username, DateTime.UtcNow);
                    if (IsValidUser(login.Username, login.Password))
                    {
                        _logger.LogInformation("Login Successful by user {User} at {Time}", login.Username, DateTime.UtcNow);
                        var token = GenerateJwtToken(login.Username);
                        return Ok(new { token });
                    }
                    else
                    {
                        return Unauthorized();
                    }
                }
                return BadRequest(ModelState);
            }
            catch (Exception ex) {
                _logger.LogError($"An Unexpected error occurred during login {ex} with message: {ex.Message}");
                return StatusCode(500, "An Unexpected error occurred during login");
            }          
        }

        private bool IsValidUser(string username, string password)
        {
            // Validate the username and password against your user store
            return username == "admin" && password == "admin";
        }
        private string GenerateJwtToken(string username)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
