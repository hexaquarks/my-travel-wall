using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace IdentityMongo.Models
{
    public class WallMetaInfo
    {
        [JsonPropertyName("isPublic")]
        public bool IsPublic { get; set; } = false; // Default to private

        [JsonPropertyName("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public override string ToString()
        {
            return "Is public:" + IsPublic + ", createdAt: " + CreatedAt.ToString();
        }
    }
}
