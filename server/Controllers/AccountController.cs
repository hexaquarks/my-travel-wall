using IdentityMongo.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace IdentityMongo.Controllers
{
    [Route("account")]
    public class AccountController : Controller
    {
        private UserManager<ApplicationUser> userManager;
        private SignInManager<ApplicationUser> signInManager;

        public AccountController(
                UserManager<ApplicationUser> userManager,
                SignInManager<ApplicationUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            Console.WriteLine("Trying to register");
            if (ModelState.IsValid)
            {
                ApplicationUser appUser = new ApplicationUser
                {
                    UserName = model.Name,
                    Email = model.Email
                };

                IdentityResult result = await userManager.CreateAsync(appUser, model.Password);

                if (result.Succeeded)
                {
                    Console.WriteLine("Success");

                    // Sign in the user after registration
                    await signInManager.SignInAsync(appUser, isPersistent: false);
                    return Ok(new { message = "User registered successfully" });
                }
                else
                {
                    Console.WriteLine("Registration failed with errors:");
                    // Return errors with field references
                    var errors = result.Errors.Select(error => new
                    {
                        Field = MapErrorToField(error.Code),
                        Message = error.Description
                    });

                    foreach (var error in errors)
                    {
                        Console.WriteLine($"Field: {error.Field}, Message: {error.Message}");
                    }

                    return BadRequest(errors);
                }
            }

            Console.WriteLine("Model is invalid");
            var modelErrors = ModelState.Where(kvp => kvp.Value.Errors.Count > 0)
                .Select(kvp => new
                {
                    Field = kvp.Key,
                    Message = kvp.Value.Errors.First().ErrorMessage
                });

            return BadRequest(modelErrors);
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Ok(new { message = "Logout successful" });
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var user = await userManager.GetUserAsync(User);
            if (user != null)
            {
                return Ok(new
                {
                    user.Id,
                    user.UserName,
                    user.Email
                });
            }
            return NotFound();
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.GetUserAsync(User);
                if (user != null)
                {
                    user.UserName = model.Name ?? user.UserName;
                    user.Email = model.Email ?? user.Email;
                    var result = await userManager.UpdateAsync(user);
                    if (result.Succeeded)
                    {
                        return Ok(new { message = "User updated successfully" });
                    }
                    else
                    {
                        return BadRequest(result.Errors);
                    }
                }
                return NotFound();
            }
            return BadRequest(ModelState);
        }

        [Authorize]
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteUser()
        {
            var user = await userManager.GetUserAsync(User);
            if (user != null)
            {
                var result = await userManager.DeleteAsync(user);
                if (result.Succeeded)
                {
                    await signInManager.SignOutAsync();
                    return Ok(new { message = "User deleted successfully" });
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }
            return NotFound();
        }

        private string MapErrorToField(string errorCode)
        {
            if (errorCode.Contains("Password"))
                return "password";
            if (errorCode.Contains("Email"))
                return "email";
            if (errorCode.Contains("UserName"))
                return "name";
            return "general";
        }
    }
}
