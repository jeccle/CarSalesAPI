using CarSalesAPI.Models;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddApiVersioning(options =>
{
    options.ReportApiVersions = true;
    options.DefaultApiVersion = new Microsoft.AspNetCore.Mvc.ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;

    //options.ApiVersionReader = new QueryStringApiVersionReader("CarSales-API-Version");
    options.ApiVersionReader = new HeaderApiVersionReader("CarSales-API-Version");
});

builder.Services.AddVersionedApiExplorer(options =>
{
    options.GroupNameFormat = "'v'VVV";
    options.SubstituteApiVersionInUrl = true;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddDbContext<CarShopContext>(options =>
{
    options.UseInMemoryDatabase("Shop");
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder
        .WithOrigins("https://carsaleswebapp.azurewebsites.net", "https://localhost:7148")
        .WithHeaders("Access-Control-Allow-Headers", "Content-Type", "CarSales-API-Version")
        .WithMethods("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger(); // Moved swagger outside of development as it must be present for azure
if (app.Environment.IsDevelopment())
{
    app.UseSwaggerUI();
}
else
{
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();
