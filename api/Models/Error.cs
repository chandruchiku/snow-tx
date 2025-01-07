using System.Text.Json.Serialization;

namespace SnowTx.Api.Models;

//error format {"error":{"message":"Invalid table contact","detail":null},"status":"failure"}

public class Error
{
    [JsonPropertyName("error")]
    public ErrorDetail ErrorDetail { get; set; }
    [JsonPropertyName("status")]
    public string Status { get; set; }
}

public class ErrorDetail
{
    [JsonPropertyName("message")]
    public string Message { get; set; }
    [JsonPropertyName("detail")]
    public string Detail { get; set; }
}