using System.Text.Json;
using Azure;
using Azure.AI.OpenAI;
using Azure.Core;
using Azure.Identity;
using ChangeRoiPredictor.Api.DTOs;
using ChangeRoiPredictor.Api.Models;
using ChangeRoiPredictor.Api.Options;
using Microsoft.Extensions.Options;
using OpenAI.Chat;

namespace ChangeRoiPredictor.Api.Services;

public class RoiService : IRoiService
{
    private readonly ChatClient _chatClient;
    private readonly string _instructionsPath;

    public RoiService(IOptions<AzureOptions> azureOptions, IWebHostEnvironment webHostEnvironment)
    {
        var azureOpenAIClient = new AzureOpenAIClient(new Uri(azureOptions.Value.AzureAiServiceUrl), new DefaultAzureCredential());

        _chatClient = azureOpenAIClient.GetChatClient(azureOptions.Value.AiChatModelName);
        _instructionsPath = Path.Combine(webHostEnvironment.ContentRootPath, "Ai", "Instructions");
    }

    public async Task<ICollection<ProjectInsight>?> GetProjectInsightsAsync(ProjectDto projectDto)
    {
        var systemMessage = ChatMessage.CreateSystemMessage(File.ReadAllText(Path.Combine(_instructionsPath, "ProjectRoiInstructions.txt")));
        var userMessage = ChatMessage.CreateUserMessage(JsonSerializer.Serialize(projectDto));
        var chatCompletion = await _chatClient.CompleteChatAsync(systemMessage, userMessage);

        var insights = JsonSerializer.Deserialize<ICollection<ProjectInsight>>(chatCompletion.Value.Content.First().Text);

        if (insights != null)
        {
            foreach (var insight in insights)
            {
                
            }
        }

        return insights;
    }
}