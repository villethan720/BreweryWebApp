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
    public DBEntry[] webservice { get; set; }

    public async Task OnGetAsync()
    {
        webservice = await GetDataFromApiAsync();
    }

    private async Task<DBEntry[]> GetDataFromApiAsync()
    {
        var response = await _httpClient.GetAsync("https://brewhubapi.onrender.com/api/v1/brewhub");
        response.EnsureSuccessStatusCode();

        var responseContent = await response.Content.ReadAsStringAsync();
        var responseData = JArray.Parse(responseContent);

        var dataList = new List<DBEntry>();
        foreach (var item in responseData)
        {
            var jObject = (JObject)item;

            int id = -1, established = -1, priceLevel = -1;
            string name = "", address = "", city = "", state = "", website = "";

            foreach (var property in jObject.Properties())
            {
                if(property.Name.Equals("id")) {
                    id = property.Value.ToObject<int>();
                } else if(property.Name.Equals("name")) {
                    name = property.Value.ToString();
                } else if(property.Name.Equals("address")) {
                    address = property.Value.ToString();
                } else if(property.Name.Equals("city")) {
                    city = property.Value.ToString();
                } else if(property.Name.Equals("state")) {
                    state = property.Value.ToString();
                } else if(property.Name.Equals("established")) {
                    established = property.Value.ToObject<int>();
                } else if(property.Name.Equals("website")) {
                    website = property.Value.ToString();
                } else if(property.Name.Equals("price_level")) {
                    priceLevel = property.Value.ToObject<int>();
                }
            }

            DBEntry entry = new DBEntry(id, name, address, city, state, established, website, priceLevel);
            dataList.Add(entry);
        }

        // Convert the list to an array before returning
        return dataList.ToArray();
    }

    public class DBEntry {
        public static string[] headers = ["Name", "Address", "City", "State", "Established", "Website", "Price Level"];
        public int id;
        public string name;
        public string address;
        public string city;
        public string state;
        public int established;
        public string website;
        public int priceLevel;

        public DBEntry(int id, string name, string address, string city, string state, int established, string website, int priceLevel) {
            this.id = id;
            this.name = name;
            this.address = address;
            this.city = city;
            this.state = state;
            this.established = established;
            this.website = website;
            this.priceLevel = priceLevel;
        }
    }
}
