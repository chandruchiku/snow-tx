using System.Text.Json.Serialization;

namespace SnowTx.Api.Models;

public class Case
{
    [JsonPropertyName("sys_id")]
    public string SysId { get; set; }
    [JsonPropertyName("number")]
    public string Number { get; set; }
    // Add other properties as needed
}