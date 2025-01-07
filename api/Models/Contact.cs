using System.Text.Json.Serialization;

namespace SnowTx.Api.Models;

public class Contact
{
    [JsonPropertyName("country")]
    public string Country { get; set; }

    [JsonPropertyName("calendar_integration")]
    public string CalendarIntegration { get; set; }

    [JsonPropertyName("last_position_update")]
    public string LastPositionUpdate { get; set; }

    [JsonPropertyName("last_login_time")]
    public string LastLoginTime { get; set; }

    [JsonPropertyName("last_login_device")]
    public string LastLoginDevice { get; set; }

    [JsonPropertyName("source")]
    public string Source { get; set; }

    [JsonPropertyName("sys_updated_on")]
    public string SysUpdatedOn { get; set; }

    [JsonPropertyName("building")]
    public string Building { get; set; }

    [JsonPropertyName("web_service_access_only")]
    public string WebServiceAccessOnly { get; set; }

    [JsonPropertyName("notification")]
    public string Notification { get; set; }

    [JsonPropertyName("sys_updated_by")]
    public string SysUpdatedBy { get; set; }

    [JsonPropertyName("enable_multifactor_authn")]
    public string EnableMultifactorAuthn { get; set; }

    [JsonPropertyName("sys_created_on")]
    public string SysCreatedOn { get; set; }

    [JsonPropertyName("sys_domain")]
    public LinkValue SysDomain { get; set; }

    [JsonPropertyName("agent_status")]
    public string AgentStatus { get; set; }

    [JsonPropertyName("state")]
    public string State { get; set; }

    [JsonPropertyName("vip")]
    public string Vip { get; set; }

    [JsonPropertyName("sys_created_by")]
    public string SysCreatedBy { get; set; }

    [JsonPropertyName("longitude")]
    public string Longitude { get; set; }

    [JsonPropertyName("zip")]
    public string Zip { get; set; }

    [JsonPropertyName("home_phone")]
    public string HomePhone { get; set; }

    [JsonPropertyName("time_format")]
    public string TimeFormat { get; set; }

    [JsonPropertyName("last_login")]
    public string LastLogin { get; set; }

    [JsonPropertyName("default_perspective")]
    public string DefaultPerspective { get; set; }

    [JsonPropertyName("geolocation_tracked")]
    public string GeolocationTracked { get; set; }

    [JsonPropertyName("active")]
    public string Active { get; set; }

    [JsonPropertyName("time_sheet_policy")]
    public string TimeSheetPolicy { get; set; }

    [JsonPropertyName("sys_domain_path")]
    public string SysDomainPath { get; set; }

    [JsonPropertyName("phone")]
    public string Phone { get; set; }

    [JsonPropertyName("cost_center")]
    public string CostCenter { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("employee_number")]
    public string EmployeeNumber { get; set; }

    [JsonPropertyName("gender")]
    public string Gender { get; set; }

    [JsonPropertyName("city")]
    public string City { get; set; }

    [JsonPropertyName("user_name")]
    public string UserName { get; set; }

    [JsonPropertyName("failed_attempts")]
    public string FailedAttempts { get; set; }

    [JsonPropertyName("edu_status")]
    public string EduStatus { get; set; }

    [JsonPropertyName("latitude")]
    public string Latitude { get; set; }

    [JsonPropertyName("roles")]
    public string Roles { get; set; }

    [JsonPropertyName("title")]
    public string Title { get; set; }

    [JsonPropertyName("sys_class_name")]
    public string SysClassName { get; set; }

    [JsonPropertyName("sys_id")]
    public string SysId { get; set; }

    [JsonPropertyName("internal_integration_user")]
    public string InternalIntegrationUser { get; set; }

    [JsonPropertyName("ldap_server")]
    public string LdapServer { get; set; }

    [JsonPropertyName("mobile_phone")]
    public string MobilePhone { get; set; }

    [JsonPropertyName("street")]
    public string Street { get; set; }

    [JsonPropertyName("company")]
    public string Company { get; set; }

    [JsonPropertyName("department")]
    public string Department { get; set; }

    [JsonPropertyName("first_name")]
    public string FirstName { get; set; }

    [JsonPropertyName("preferred_language")]
    public string PreferredLanguage { get; set; }

    [JsonPropertyName("introduction")]
    public string Introduction { get; set; }

    [JsonPropertyName("email")]
    public string Email { get; set; }

    [JsonPropertyName("manager")]
    public string Manager { get; set; }

    [JsonPropertyName("locked_out")]
    public string LockedOut { get; set; }

    [JsonPropertyName("sys_mod_count")]
    public string SysModCount { get; set; }

    [JsonPropertyName("last_name")]
    public string LastName { get; set; }

    [JsonPropertyName("photo")]
    public string Photo { get; set; }

    [JsonPropertyName("sys_tags")]
    public string SysTags { get; set; }

    [JsonPropertyName("middle_name")]
    public string MiddleName { get; set; }

    [JsonPropertyName("time_zone")]
    public string TimeZone { get; set; }

    [JsonPropertyName("schedule")]
    public string Schedule { get; set; }

    [JsonPropertyName("on_schedule")]
    public string OnSchedule { get; set; }

    [JsonPropertyName("date_format")]
    public string DateFormat { get; set; }

    [JsonPropertyName("location")]
    public string Location { get; set; }

    [JsonPropertyName("account")]
    public LinkValue Account { get; set; }
}

public class LinkValue
{
    [JsonPropertyName("link")]
    public string Link { get; set; }

    [JsonPropertyName("value")]
    public string Value { get; set; }
}