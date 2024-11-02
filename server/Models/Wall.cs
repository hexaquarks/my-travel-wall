using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace IdentityMongo.Models
{
    public class Wall
    {
        [JsonPropertyName("meta")]
        public WallMetaInfo Meta { get; set; } = new WallMetaInfo();

        [JsonPropertyName("cards")]
        public List<CountryCard> Cards { get; set; } = new List<CountryCard>();

        public override string ToString()
        {
            string cardsString = Cards.Count > 0
                ? string.Join(", ", Cards.Select(card => card.ToString()))
                : "No cards";

            return $"Wall: {{ Meta: {Meta}, Cards: [{cardsString}] }}";
        }
    }
}
