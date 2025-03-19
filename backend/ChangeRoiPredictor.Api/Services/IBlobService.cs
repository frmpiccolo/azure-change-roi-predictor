using Azure.Storage.Blobs;

namespace ChangeRoiPredictor.Api.Services;

public interface IBlobService
{
    Task<BlobClient> GetBlobAsync(string containerName, string blobName);

    Task AddBlobAsync(string containerName, string blobName, BinaryData content);

    Task DeleteBlobAsync(string containerName, string blobName);
}