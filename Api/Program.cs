using Microsoft.SemanticKernel;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
AllowExternalRequests();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

OllamaService();

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



#region Helpers

void AllowExternalRequests()
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

void OllamaService()
{
    var ollamaConfigSettings = builder.Configuration.GetSection("OllamaConfigSettings")!;
    var model = ollamaConfigSettings["Model"] ?? "";
    var endpoint = new Uri(uriString: ollamaConfigSettings["Endpoint"] ?? "");

    builder.Services.AddOllamaChatCompletion(model, endpoint);
}

#endregion