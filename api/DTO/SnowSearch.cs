using System.Text.Json.Serialization;

namespace SnowTx.Api.DTO;

public class SnowSearch
{
    [JsonPropertyName("table")]
    public string Table { get; set; }
    [JsonPropertyName("property")]
    public string Property { get; set; }
    [JsonPropertyName("value")]
    public string Value { get; set; }
}