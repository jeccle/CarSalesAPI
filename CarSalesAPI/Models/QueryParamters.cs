namespace CarSalesAPI.Models
{
    public class QueryParamters
    {
        const int MAX_SIZE = 100;
        private int size = 20;

        public int Size
        {
            get { return size; }
            set { size = Math.Min(MAX_SIZE, value); }
        }
        public int Page { get; set; } = 1;

        // Change this value to specify which key to sortBy
        public string sortBy { get; set; } = "Id";

        private string sortOrder = "asc";

        public string SortOrder
        {
            get { return sortOrder; }
            set
            {
                if (value == "asc" || value == "desc")
                    sortOrder = value;
            }
        }
    }
}
