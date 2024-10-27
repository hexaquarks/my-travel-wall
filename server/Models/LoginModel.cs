using System.ComponentModel.DataAnnotations;

namespace IdentityMongo.Models
{
    public class LoginModel
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email")]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
