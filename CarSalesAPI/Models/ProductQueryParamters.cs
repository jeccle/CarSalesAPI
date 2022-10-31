namespace CarSalesAPI.Models
{
    public class ProductQueryParamters : QueryParamters
    {
        public double? MinPrice { get; set; }
        public double? MaxPrice { get; set; }

        public string brand { get; set; } = String.Empty;
        public string model { get; set; } = String.Empty;
        public double? salePrice { get; set; }
        public bool? onSale { get; set; }
        public int? engineSize { get; set; }
       

        public string searchTerm { get; set; } = String.Empty;

    }

}
