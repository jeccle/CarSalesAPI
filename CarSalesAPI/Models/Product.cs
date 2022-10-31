using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CarSalesAPI.Models
{
    public class Product
    {
        public int ID { get; set; }
 
        public string brand { get; set; }
        public string model { get; set; }
        public int year { get; set; }
        public double salePrice { get; set; }
        public bool onSale { get; set; }
        public int engineSize { get; set; }
        public string img { get; set; }

        [Required]
        public int categoryID { get; set; }
        [JsonIgnore]
        public virtual Category? category { get; set; }
    }
}
