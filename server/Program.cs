using UserDataApi.Models;
using UserDataApi.Services;
/* using UserDataApi.Controllers; */

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

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
