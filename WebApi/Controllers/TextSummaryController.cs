using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TextSummaryController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return BadRequest("Text is required");
            }
            return Ok(new { Summary = $"Text received: {text}" });
        }
    }
}
