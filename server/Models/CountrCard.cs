using System;
using System.Collections.Generic;

namespace IdentityMongo.Models
{
    public class CountryCard
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Country { get; set; }
        public DateTime? StartDate { get; set; } // Nullable
        public DateTime? EndDate { get; set; }
        public List<string>? Pictures { get; set; } = new List<string>(); // TODO: MVP for now
        public string? Description { get; set; }
    }
}
