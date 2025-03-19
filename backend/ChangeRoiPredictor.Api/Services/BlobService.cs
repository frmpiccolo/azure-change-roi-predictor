using Azure.Storage.Blobs;
using ChangeRoiPredictor.Api.Options;
using Microsoft.Extensions.Options;

namespace ChangeRoiPredictor.Api.Services;

public class BlobService(IOptions<AzureKeyVaultOptions> azureKeyVaultOptions) : IBlobService
{
    private readonly BlobServiceClient _client = new(azureKeyVaultOptions.Value.AzureAccountStorageConnectionString);

    public async Task<BlobClient> GetBlobAsync(string containerName, string blobName)
    {
        return await Task.FromResult(_client.GetBlobContainerClient(containerName).GetBlobClient(blobName));
    }

    public async Task AddBlobAsync(string containerName, string blobName, BinaryData content)
    {
        await _client.GetBlobContainerClient(containerName).GetBlobClient(blobName).UploadAsync(content);
    }

    public async Task DeleteBlobAsync(string containerName, string blobName)
    {
        await _client.GetBlobContainerClient(containerName).GetBlobClient(blobName).DeleteAsync();
    }
}