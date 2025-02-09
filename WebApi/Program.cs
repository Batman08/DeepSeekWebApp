using Microsoft.SemanticKernel;

var builder = WebApplication.CreateBuilder(args);

// Increase the HttpClient timeout globally
//builder.Services.AddRequestTimeouts(options =>
//{
//    options.DefaultPolicy = new RequestTimeoutPolicy { Timeout = TimeSpan.FromMinutes(5) };
//});

// Add services to the container.
AllowExternalApiRequests();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddOllamaChatCompletion("deepseek-r1:latest", new Uri(uriString: "http://localhost:11434/"));
//builder.Services.AddScoped<IChatCompletionService, OllamaChatCompletionService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors();

//app.UseRequestTimeouts();

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
}