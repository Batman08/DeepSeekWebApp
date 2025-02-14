using Api.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;


namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TextSummaryController : ControllerBase
    {
        private readonly IChatCompletionService _chatCompletionService;

        public TextSummaryController(IChatCompletionService chatCompletionService)
        {
            _chatCompletionService = chatCompletionService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }

        [HttpPost("summarise")]
        public async Task<IActionResult> Summarise([FromBody] TextItemDTO textItem)
        {
            if (string.IsNullOrWhiteSpace(textItem.Text)) return BadRequest("Text is required");


            var chatHistory = new ChatHistory
            {
                new ChatMessageContent { Role = AuthorRole.System, Content = "Summarise any text given using no more than 200 words." },
                new ChatMessageContent { Role = AuthorRole.User, Content = textItem.Text }
            };
            var response = await _chatCompletionService.GetChatMessageContentsAsync(chatHistory);

            return Ok(new { Summary = response[0].Content });
        }
    }
}
