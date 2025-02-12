using Api.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SemanticKernel.ChatCompletion;


namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TextSummaryController : ControllerBase
    {
        private readonly IChatCompletionService _chatCompletionService;
        private readonly ChatHistory _chatHistory;

        public TextSummaryController(IChatCompletionService chatCompletionService)
        {
            _chatCompletionService = chatCompletionService;

            _chatHistory = new ChatHistory();
            _chatHistory.AddSystemMessage("You will summarise any text given using no more than 200 words:");
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }

        [HttpPost("summarise")]
        public async Task<IActionResult> Summarise([FromBody] TextItemDTO textItem)
        {
            if (string.IsNullOrWhiteSpace(textItem.Text))
            {
                return BadRequest("Text is required");
            }
            else
            {
                _chatHistory.AddUserMessage(textItem.Text);
                var response = await _chatCompletionService.GetChatMessageContentsAsync(_chatHistory);

                return Ok(new { Summary = response[0].Content });
            }
        }
    }
}
