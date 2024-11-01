using System;
using System.Collections.Generic;

namespace IdentityMongo.Models
{
    public class WallMetaInfo
    {
        public bool IsPublic { get; set; } = false; // Default to private
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
