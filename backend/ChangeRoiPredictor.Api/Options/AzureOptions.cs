namespace ChangeRoiPredictor.Api.Options;

public class AzureOptions
{
    public required string AzureKeyVaultUrl { get; set; }
    public required string AzureAiServiceUrl { get; set; }
    public required string AiChatModelName { get; set; }
}