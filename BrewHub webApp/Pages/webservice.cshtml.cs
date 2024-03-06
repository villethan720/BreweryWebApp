using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.DependencyInjection;

public class webserviceModel : PageModel
{
    private readonly HttpClient _httpClient;
    public webserviceModel(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public Dictionary<string, string> webservice { get; set;}

    public async Task OnGetAsync()
    {
        webservice = await GetDataFromApiAsync();
    }

    private async Task<Dictionary<string, string>> GetDataFromApiAsync()
    {
        var response = await _httpClient.GetAsync("https://brewhubapi.onrender.com/api/v1/brewhub"); //Put our websevice url in the GetAsync()
        response.EnsureSuccessStatusCode();

        var responseContent = await response.Content.ReadAsStringAsync();
        var responseData = JObject.Parse(responseContent);

        //parse the Json response into dictionary
        var data = new Dictionary<string, string>();
        foreach (var item in responseData){
            data.Add(item.Key, item.Value.ToString());
        }

        return data;
    }
}
