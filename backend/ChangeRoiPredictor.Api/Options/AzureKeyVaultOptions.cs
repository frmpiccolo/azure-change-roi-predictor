namespace ChangeRoiPredictor.Api.Options;

public class AzureKeyVaultOptions
{
    public required string AzureSqlConnectionString { get; set; }
    public required string AzureAccountStorageConnectionString { get; set; }
    public required string AzureAiServicesKey { get; set; }
}