using Microsoft.AspNetCore.Mvc;
using SnowTx.Api.Services;
using SnowTx.Api.DTO;
using SnowTx.Api.Models;

namespace ServiceNowAPI.Controllers;

/// <summary>
/// Controller for interacting with the ServiceNow API
/// This controller will be able to get a list of incidents, contacts, cases, accounts, and more
/// </summary>
[ApiController]
[Route("[controller]")]
public class SnowController : ControllerBase
{
    private readonly ILogger<SnowController> _logger;

    private readonly SnowService _snowService;

    public SnowController(ILogger<SnowController> logger, SnowService snowService)
    {
        _logger = logger;
        _snowService = snowService;
    }

    /// <summary>
    /// Get a list of incidents from ServiceNow
    /// </summary>
    /// <returns>A list of incidents</returns>
    [HttpGet("incidents")]
    public async Task<IActionResult> GetIncidents()
    {
        try {
            var incidents = await _snowService.GetIncidentsAsync();
            return Ok(incidents);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while getting incidents from ServiceNow");
            return StatusCode(500, "An error occurred while getting incidents from ServiceNow");
        }
    }

    /// <summary>
    /// Get a list of contacts from ServiceNow
    /// </summary>
    /// <returns>A list of contacts</returns>
    [HttpGet("contacts")]
    public async Task<IActionResult> GetContacts()
    {
        try {
            var contacts = await _snowService.GetContactsAsync();
            return Ok(contacts);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while getting contacts from ServiceNow");
            return StatusCode(500, "An error occurred while getting contacts from ServiceNow");
        }
    }

    /// <summary>
    /// Get a list of cases from ServiceNow
    /// </summary>
    /// <returns>A list of cases</returns>
    [HttpGet("cases")]
    public async Task<IActionResult> GetCases()
    {
        try {
            var cases = await _snowService.GetCasesAsync();
            return Ok(cases);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while getting cases from ServiceNow");
            return StatusCode(500, "An error occurred while getting cases from ServiceNow");
        }
    }

    /// <summary>
    /// Search a case, contact or incident by phone, email, number or id
    /// </summary>
    /// <returns>A list of cases, contacts or incidents</returns>
    [HttpGet("search")]
    public async Task<IActionResult> Search(string table, string property, string value)
    {
        var query = new SnowSearch
        {
            Table = table,
            Property = property,
            Value = value
        };
        try {
            if(table == "incident")
            {
                var results = await _snowService.SearchAsync<Incident>(query);
                return Ok(results);
            }
            else if(table == "customer_contact")
            {
                var results = await _snowService.SearchAsync<Contact>(query);
                return Ok(results);
            }
            else if(table == "sn_customerservice_case")
            {
                var results = await _snowService.SearchAsync<Case>(query);
                return Ok(results);
            }
            else
            {
                return BadRequest("Invalid table name. Must be 'incident', 'customer_contact' or 'sn_customerservice_case'");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while searching for cases, contacts or incidents in ServiceNow");
            return StatusCode(500, "An error occurred while searching for cases, contacts or incidents in ServiceNow");
        }
    }
}
