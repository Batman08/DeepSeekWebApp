﻿using Microsoft.AspNetCore.Mvc;
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
            //_chatHistory.AddSystemMessage("You will summarise any text given. Do not give any reasoning for it:");
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
                var cancellationTokenSource = new CancellationTokenSource();

                _chatHistory.AddUserMessage(textItem.Text);
                var response = await _chatCompletionService.GetChatMessageContentsAsync(_chatHistory, cancellationToken: cancellationTokenSource.Token);

                return Ok(new { Summary = response[0] });
            }
        }
    }


    public class SummariseTextDTO
    {
        public string Text { get; set; } = "";
    }
}
