
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using IdentityMongo.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityMongo.Controllers
{
    [Authorize]
    [Route("country")]
    public class CountryCardController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public CountryCardController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        // POST /country - Update the user's country card 
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> UpdateMyWall([FromBody] CountryCard countryCardInfo)
        {
            Console.WriteLine("===================recievews to update:");
            Console.WriteLine(countryCardInfo.ToString());
            if (countryCardInfo == null)
            {
                Console.WriteLine("Invalid country card data passed to backend");
                return BadRequest("Invalid country card data.");
            }

            var user = await _userManager.GetUserAsync(User);
            if (user != null)
            {

                var countryCardIdx = user.wallInfo.Cards.FindIndex((card) => card.Id == countryCardInfo.Id);
                if (countryCardIdx != -1)
                {
                    // The card already exists in the database, we update it's contents.
                    user.wallInfo.Cards[countryCardIdx] = countryCardInfo;
                }
                else
                {
                    user.wallInfo.Cards.Add(countryCardInfo);
                }

                Console.Write(" The new updated Cards: ");
                foreach (CountryCard card in user.wallInfo.Cards)
                {
                    Console.Write(card + " ");
                }
                Console.WriteLine("");


                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    Console.WriteLine("Successfully updated cards of the logged in user");
                    return Ok(new { message = "Card updated or added successfully" });
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }

            Console.WriteLine("Trying to change or add a card of an unauthenticated user");
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
