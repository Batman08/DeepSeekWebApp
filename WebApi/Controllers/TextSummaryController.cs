using Microsoft.AspNetCore.Mvc;
using Microsoft.SemanticKernel.ChatCompletion;


namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TextSummaryController : ControllerBase
    {
        //private readonly Kernel  _kernel;
        private readonly IChatCompletionService _chatCompletionService;
        private readonly ChatHistory _chatHistory;

        public TextSummaryController(IChatCompletionService chatCompletionService)
        {
            _chatCompletionService = chatCompletionService;

            _chatHistory = new ChatHistory();
            _chatHistory.AddSystemMessage("You will summarise the following text given below and will not give any explanation for it, just the summary only.");
        }

        [HttpGet]
        public async Task<IActionResult> Get(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return BadRequest("Text is required");
            }
            else
            {
                var cancellationTokenSource = new CancellationTokenSource();

                _chatHistory.AddUserMessage(text);
                var response = await _chatCompletionService.GetChatMessageContentsAsync(text, cancellationToken: cancellationTokenSource.Token);

                return Ok(new { Summary = $"{response[0].InnerContent}" });
                //return Ok(new { Summary = $"Text received: {text}" });
            }
        }
    }
}
