using IdentityMongo.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace IdentityMongo.Controllers
{
    [Route("operations")]
    public class OperationsController : Controller
    {
        private UserManager<ApplicationUser> userManager;
        private RoleManager<ApplicationRole> roleManager;

        public OperationsController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] User user)
        {
            Console.WriteLine("Received POST request to /operations/create");

            if (!ModelState.IsValid)
            {
                Console.WriteLine("Invalid model state");
                return BadRequest(ModelState); // Return validation errors as JSON
            }

            ApplicationUser appUser = new ApplicationUser
            {
                UserName = user.Name,
                Email = user.Email
            };

            IdentityResult result = await userManager.CreateAsync(appUser, user.Password);
            if (result.Succeeded)
            {
                Console.WriteLine("User created successfully");
                return Ok(new { message = "User Created Successfully" }); // Return success message as JSON
            }
            else
            {
                Console.WriteLine("User creation failed");
                return BadRequest(result.Errors); // Return identity errors as JSON
            }
        }

        /* [HttpPost("temp")] //Todo: */
        /* public async Task<IActionResult> Temp(string name) */
        /* { */
        /*     if (!ModelState.IsValid) */
        /*     { */
        /*         Console.WriteLine("Invalid model state"); */
        /*         return BadRequest(ModelState); // Return validation errors as JSON */
        /*     } */
        /**/
        /*     IdentityResult result = await roleManager.CreateAsync(new ApplicationRole() { Name = name }); */
        /*     if (result.Succeeded) */
        /*     { */
        /*         Console.WriteLine("Role Created Successfuly"); */
        /*         return Ok(new { message = "Role Created Successfuly" }); // Return success message as JSON */
        /*     } */
        /*     else */
        /*     { */
        /*         Console.WriteLine("Role assignment failed"); */
        /*         return BadRequest(result.Errors); // Return identity errors as JSON */
        /*     } */
        /* } */
    }
}

