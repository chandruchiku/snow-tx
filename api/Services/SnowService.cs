using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using SnowTx.Api.Models;
using SnowTx.Api.DTO;

namespace SnowTx.Api.Services;
public class SnowService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<SnowService> _logger;
    private readonly IConfiguration _configuration;
    private readonly IMemoryCache _memoryCache;
    public SnowService(IHttpClientFactory httpClientFactory, ILogger<SnowService> logger, IConfiguration configuration, IMemoryCache memoryCache)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;
        _configuration = configuration;
        _memoryCache = memoryCache;
    }

    private HttpClient CreateClient()
    {
        var client = _httpClientFactory.CreateClient();
        var baseUrl = _configuration["ServiceNow:BaseUrl"];
        client.BaseAddress = new Uri(baseUrl);
        _logger.LogInformation("HttpClient created with base address {BaseAddress}", baseUrl);
        return client;
    }

    // check if AccessToken is available in MemoryCache
    private async Task<Token> CheckAccessTokenAsync()
    {
        if (!_memoryCache.TryGetValue("AccessToken", out Token token))
        {
            token = await GetAccessTokenAsync();
            _memoryCache.Set("AccessToken", token, TimeSpan.FromSeconds(token.ExpiresIn));
        }
        return token;
    } 

    private async Task<Token> GetAccessTokenAsync()
    {
        var client = CreateClient();
        var collection = new List<KeyValuePair<string, string>>
        {
            new("grant_type", "password"),
            new("username", _configuration["ServiceNow:Username"]),
            new("password", _configuration["ServiceNow:Password"]),
            new("client_id", _configuration["ServiceNow:ClientId"]),
            new("client_secret", _configuration["ServiceNow:ClientSecret"])
        };
        var content = new FormUrlEncodedContent(collection);
        var response = await client.PostAsync("oauth_token", content);
        response.EnsureSuccessStatusCode();
        var token = await response.Content.ReadFromJsonAsync<Token>();
        _logger.LogInformation("Access token received from ServiceNow");
        return token;
    }

    public async Task<IEnumerable<Contact>> GetContactsAsync()
    {
        var client = CreateClient();
        var token = await CheckAccessTokenAsync();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token.TokenType, token.AccessToken);
        _logger.LogInformation("Fetching contacts from ServiceNow");
        var response = await client.GetAsync("api/now/table/customer_contact");
        if(!response.IsSuccessStatusCode)
        {
            _logger.LogError("Failed to fetch contacts from ServiceNow. Status code: {StatusCode}", response.StatusCode);
            var error = await response.Content.ReadFromJsonAsync<Error>();
            _logger.LogError("Error message: {Message}", error?.ErrorDetail?.Message);
            throw new Exception("Failed to fetch contacts from ServiceNow");
        }
        var snowResult = await response.Content.ReadFromJsonAsync<SnowResult<Contact>>();
        _logger.LogInformation("Fetched {Count} contacts from ServiceNow", snowResult?.Result?.Count ?? 0);
        return snowResult?.Result ?? [];
    }

    public async Task<IEnumerable<Case>> GetCasesAsync()
    {
        var client = CreateClient();
        var token = await CheckAccessTokenAsync();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token.TokenType, token.AccessToken);
        _logger.LogInformation("Fetching cases from ServiceNow");
        var response = await client.GetAsync("api/now/table/sn_customerservice_case");
        if(!response.IsSuccessStatusCode)
        {
            _logger.LogError("Failed to fetch cases from ServiceNow. Status code: {StatusCode}", response.StatusCode);
            var error = await response.Content.ReadFromJsonAsync<Error>();
            _logger.LogError("Error message: {Message}", error?.ErrorDetail?.Message);
            throw new Exception("Failed to fetch cases from ServiceNow");
        }
        var snowResult = await response.Content.ReadFromJsonAsync<SnowResult<Case>>();
        _logger.LogInformation("Fetched {Count} cases from ServiceNow", snowResult?.Result?.Count ?? 0);
        return snowResult?.Result ?? [];
    }

    public async Task<IEnumerable<Incident>> GetIncidentsAsync()
    {
        var client = CreateClient();
        var token = await CheckAccessTokenAsync();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token.TokenType, token.AccessToken);
        _logger.LogInformation("Fetching incidents from ServiceNow");
        var response = await client.GetAsync("api/now/table/incident");
        if(!response.IsSuccessStatusCode)
        {
            _logger.LogError("Failed to fetch incidents from ServiceNow. Status code: {StatusCode}", response.StatusCode);
            var error = await response.Content.ReadFromJsonAsync<Error>();
            _logger.LogError("Error message: {Message}", error?.ErrorDetail?.Message);
            throw new Exception("Failed to fetch incidents from ServiceNow");
        }
        var snowResult = await response.Content.ReadFromJsonAsync<SnowResult<Incident>>();
        _logger.LogInformation("Fetched {Count} incidents from ServiceNow", snowResult?.Result?.Count ?? 0);
        return snowResult?.Result ?? [];
    }

    public async Task<IEnumerable<T>> SearchAsync<T>(SnowSearch query) where T : class
    {
        var client = CreateClient();
        var token = await CheckAccessTokenAsync();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token.TokenType, token.AccessToken);
        _logger.LogInformation("Searching cases from ServiceNow");
        // query contains table, property and search value
        var response = await client.GetAsync($"api/now/table/{query.Table}?sysparm_query={query.Property}={query.Value}");
        if(!response.IsSuccessStatusCode)
        {
            _logger.LogError("Failed to search cases from ServiceNow. Status code: {StatusCode}", response.StatusCode);
            var error = await response.Content.ReadFromJsonAsync<Error>();
            _logger.LogError("Error message: {Message}", error?.ErrorDetail?.Message);
            throw new Exception("Failed to search cases from ServiceNow");
        }
        var snowResult = await response.Content.ReadFromJsonAsync<SnowResult<T>>();
        _logger.LogInformation("Found {Count} matches from ServiceNow", snowResult?.Result?.Count ?? 0);
        return snowResult?.Result ?? [];
    }
}