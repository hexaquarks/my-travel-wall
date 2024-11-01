using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using IdentityMongo.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityMongo.Controllers
{
    [Route("wall")]
    public class WallController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public WallController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        // GET /wall - Get the logged-in user's wall
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetMyWall()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user != null)
            {
                Console.WriteLine("Successfuly returning the wall of the logged in user");
                return Ok(user.wallInfo);
            }
            Console.WriteLine("Failed to get logged in user's wall");
            return NotFound();
        }

        // POST /wall - Update the logged-in user's wall
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> UpdateMyWall([FromBody] Wall wallInfo)
        {
            if (wallInfo == null)
            {
                Console.WriteLine("Invalid wall data passed to backend");
                return BadRequest("Invalid wall data.");
            }

            var user = await _userManager.GetUserAsync(User);
            if (user != null)
            {
                user.wallInfo = wallInfo;
                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    Console.WriteLine("Successfully updated the wall of the logged in user");
                    return Ok(new { message = "Wall updated successfully" });
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }

            Console.WriteLine("Trying to set a wall to an unauthenticated user");
            return NotFound();
        }

        // GET /wall/{username} - Get a user's public wall
        [AllowAnonymous]
        [HttpGet("{username}")]
        public async Task<IActionResult> GetUserWall(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user != null && user.wallInfo.Meta.IsPublic)
            {
                return Ok(user.wallInfo);
            }
            return NotFound();
        }
    }
}
