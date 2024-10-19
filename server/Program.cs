using UserDataApi.Models;
using UserDataApi.Services;
using IdentityMongo.Settings;
using IdentityMongo.Models;

var builder = WebApplication.CreateBuilder(args);

var mongoDbSettings = builder.Configuration.GetSection(nameof(MongoDbConfig)).Get<MongoDbConfig>();

builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
        .AddMongoDbStores<ApplicationUser, ApplicationRole, Guid>
        (
            mongoDbSettings.ConnectionString, mongoDbSettings.Name
        );

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.Configure<UserDataDatabaseSettings>(
    builder.Configuration.GetSection("UserDataDatabase"));
builder.Services.AddSingleton<UsersService>();

var app = builder.Build();

// Only map API endpoint
app.UseRouting();
/* app.UseAuthorization(); */
app.MapControllers();
/* app.UseEndpoints(endpoints => */
/* { */
/*     endpoints.MapControllers(); */
/* }); */

app.Run();
