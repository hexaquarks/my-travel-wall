using IdentityMongo.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;

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
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            if (ModelState.IsValid)
            {
                // Retrieve the user by email
                var user = await userManager.FindByEmailAsync(login.Email);

                if (user == null)
                {
                    Console.WriteLine("Login failed: Bad user credentials");
                    return Unauthorized("Invalid credentials");
                }

                // Sign in the user using PasswordSignInAsync
                var result = await signInManager.PasswordSignInAsync(user, login.Password, isPersistent: true, lockoutOnFailure: false);

                if (result.Succeeded)
                {
                    Console.WriteLine("Login successful");
                    return Ok(new { message = "Logged in successfully" });
                }
                else
                {
                    Console.WriteLine("Login failed: Bad password");
                    return Unauthorized("Invalid credentials");
                }
            }

            return BadRequest();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
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
                    // Sign in the user after registration
                    await signInManager.SignInAsync(appUser, isPersistent: false);

                    Console.WriteLine("Successfuly registered a new user");
                    return Ok(new { message = "User registered successfully" });
                }
                else
                {
                    // Return errors with field references
                    var errors = result.Errors.Select(error => new
                    {
                        Field = MapErrorToField(error.Code),
                        Message = error.Description
                    });

                    Console.WriteLine("user Registration has failed");
                    return BadRequest(errors);
                }
            }

            return BadRequest();
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            Console.WriteLine("User logged out from server");
            return Ok(new { message = "Logout successful" });
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var user = await userManager.GetUserAsync(User);
            if (user != null)
            {
                Console.WriteLine("Returning authenticated user's info");
                return Ok(new
                {
                    user.Id,
                    user.UserName,
                    user.Email,
                    user.wallInfo
                });
            }

            Console.WriteLine("A request for an unauthenticated user has been made");
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
