using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace UserDataApi.Models;

public class User
{
    [BsonId] // Annotation to set this property as the document's primary key
    [BsonRepresentation(BsonType.ObjectId)] // Allows passing as string instead of ObjectId. MongoDB handles conversions
    public string? Id { get; set; }

    [BsonElement("Name")]
    public string UserName { get; set; } = null!;

    public string Country { get; set; } = null!;
}

// This class is used to store the appsettings.json's database properties.
// They are named the same to ease the mapping process.
public class UserDataDatabaseSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string UsersCollectionName { get; set; } = null!;
}
