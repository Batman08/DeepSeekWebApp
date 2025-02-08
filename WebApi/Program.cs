var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
AllowExternalApiRequests();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();



void AllowExternalApiRequests()
{
    builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
    });

    //builder.Services.AddCors(options =>
    //{
    //    options.AddPolicy("AllowAll", policy =>
    //        policy.AllowAnyOrigin()       // Allow all origins (not recommended for production)
    //              .AllowAnyMethod()       // Allow any HTTP method
    //              .AllowAnyHeader());       // Allow any headers
    //});
}