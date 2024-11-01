using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace IdentityMongo.Models
{
    [CollectionName("Users")] // maybe User ? 
    public class ApplicationUser : MongoIdentityUser<Guid>
    {
        public Wall? wallInfo { get; set; } = null;
    }
}
