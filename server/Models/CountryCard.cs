using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace IdentityMongo.Models
{
    public class CountryCard
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [JsonPropertyName("country")]
        public string Country { get; set; } = "";

        [JsonPropertyName("startDate")]
        public DateTime? StartDate { get; set; }

        [JsonPropertyName("endDate")]
        public DateTime? EndDate { get; set; }

        [JsonPropertyName("pictures")]
        public List<string>? Pictures { get; set; } = new List<string>();

        [JsonPropertyName("description")]
        public string? Description { get; set; }

        public override string ToString()
        {
            return $"CountryCard: {{ Id: {Id}, Country: {Country}, StartDate: {StartDate?.ToString("yyyy-MM-dd") ?? "N/A"}, " +
                   $"EndDate: {EndDate?.ToString("yyyy-MM-dd") ?? "N/A"}, " +
                   $"Pictures: [{(Pictures != null ? string.Join(", ", Pictures) : "N/A")}], " +
                   $"Description: {Description ?? "N/A"} }}";
        }
    }
}
