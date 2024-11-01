using System.Collections.Generic;

namespace IdentityMongo.Models
{
    public class Wall
    {
        public WallMetaInfo Meta { get; set; } = new WallMetaInfo();
        public List<CountryCard> Cards { get; set; } = new List<CountryCard>();
    }
}
