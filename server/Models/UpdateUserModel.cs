using System.ComponentModel.DataAnnotations;

namespace IdentityMongo.Models
{
    public class UpdateUserModel
    {
        public string Name { get; set; }

        [EmailAddress(ErrorMessage = "Invalid Email")]
        public string Email { get; set; }
    }
}
