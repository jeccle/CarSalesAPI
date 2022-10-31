namespace CarSalesAPI.Models
{
    public class Category
    {
        public int ID { get; set; }
        public string type { get; set; }

        public virtual List<Product> products { get; set; }
    }
}
