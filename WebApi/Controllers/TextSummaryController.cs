using System.Text.RegularExpressions;
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
            _chatHistory.AddSystemMessage("You will summarise any text given using no more than 200 words:");
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }

        [HttpPost("summarise")]
        public async Task<IActionResult> Summarise([FromBody] SummariseTextDTO textItem)
        {
            if (string.IsNullOrWhiteSpace(textItem.Text))
            {
                return BadRequest("Text is required");
            }
            else
            {
                _chatHistory.AddUserMessage(textItem.Text);
                var response = await _chatCompletionService.GetChatMessageContentsAsync(_chatHistory);


                /* Clean Response Text */
                
                // pattern to remove the <think></think> tags and content
                string regexPattern = @"<think>.*?</think>";

                // remove the <think> tags and the content inside them
                string cleanedtextContent= Regex.Replace(response[0].Content ?? "", regexPattern, string.Empty, RegexOptions.Singleline);


                return Ok(new { Summary = cleanedtextContent ?? null });
            }
        }
    }


    public class SummariseTextDTO
    {
        public string Text { get; set; } = "";
    }
}
