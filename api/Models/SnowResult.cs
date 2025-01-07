using System.Text.Json.Serialization;

namespace SnowTx.Api.Models;

public class SnowResult<T>
{
    [JsonPropertyName("result")]
    public List<T> Result { get; set; }
}