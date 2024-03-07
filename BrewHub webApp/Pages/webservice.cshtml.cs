// using System.Collections.Generic;
// using System.Net.Http;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.AspNetCore.Mvc.RazorPages;
// using Newtonsoft.Json.Linq;
// using Microsoft.Extensions.DependencyInjection;

// public class webserviceModel : PageModel
// {
//     private readonly HttpClient _httpClient;
//     public webserviceModel(HttpClient httpClient)
//     {
//         _httpClient = httpClient;
//     }

//     public Dictionary<string, string> webservice { get; set;}

//     public async Task OnGetAsync()
//     {
//         webservice = await GetDataFromApiAsync();
//     }

//     private async Task<Dictionary<string, string>> GetDataFromApiAsync()
//     {
//         var response = await _httpClient.GetAsync("https://brewhubapi.onrender.com/api/v1/brewhub"); //Put our websevice url in the GetAsync()
//         response.EnsureSuccessStatusCode();

//         var responseContent = await response.Content.ReadAsStringAsync();
//         var responseData = JArray.Parse(responseContent);

//         var data = new Dictionary<string, string>();
//         foreach (var item in responseData)
//         {
//             Console.WriteLine(item);
//             var jObject = (JObject)item;
//             foreach (var property in jObject.Properties())
//             {
//                 data.Add(property.Name, property.Value.ToString());
//             }
//         }

//         return data;
//     }
// }

using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json.Linq;

public class webserviceModel : PageModel
{
    private readonly HttpClient _httpClient;
    public webserviceModel(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    // Updated to use an array of tuples
    public (string Key, string Value)[] webservice { get; set; }

    public async Task OnGetAsync()
    {
        webservice = await GetDataFromApiAsync();
    }

    private async Task<(string, string)[]> GetDataFromApiAsync()
    {
        var response = await _httpClient.GetAsync("https://brewhubapi.onrender.com/api/v1/brewhub");
        response.EnsureSuccessStatusCode();

        var responseContent = await response.Content.ReadAsStringAsync();
        var responseData = JArray.Parse(responseContent);

        var dataList = new List<(string, string)>();
        foreach (var item in responseData)
        {
            var jObject = (JObject)item;
            foreach (var property in jObject.Properties())
            {
                // Add each property as a tuple to the list
                dataList.Add((property.Name, property.Value.ToString()));
            }
        }

        // Convert the list to an array before returning
        return dataList.ToArray();
    }
}
