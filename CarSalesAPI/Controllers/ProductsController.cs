using CarSalesAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarSalesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly CarShopContext _carShopContext;
        public ProductsController (CarShopContext carShopContext)
        {
            _carShopContext = carShopContext;
            // Data seed for database creation must be ensured.
            _carShopContext.Database.EnsureCreated();
        }

        [HttpGet]
        public async Task<ActionResult> GetAllProducts([FromQuery]ProductQueryParamters queryParameters)
        {
            IQueryable<Product> products = _carShopContext.products;
            if (queryParameters.MinPrice != null)
                products = products.Where(p => p.salePrice >= queryParameters.MinPrice.Value);

            if (queryParameters.MaxPrice != null)
                products = products.Where(p => p.salePrice <= queryParameters.MaxPrice.Value);

            

            // Search for Car Brand, Car Model, Car Year in searchTerm
            if (!string.IsNullOrEmpty(queryParameters.searchTerm))
                products = products.Where(p => p.brand.ToLower().Contains(queryParameters.searchTerm.ToLower()) ||
                                               p.model.ToLower().Contains(queryParameters.searchTerm.ToLower()) ||
                                               p.year.ToString().Contains(queryParameters.searchTerm.ToLower()));
            
            if (queryParameters.brand != null)
                products = products.Where(p => p.brand.ToLower().Contains(queryParameters.brand.ToLower()));

            if (queryParameters.onSale != null)
                products = products.Where(p => p.onSale.Equals(queryParameters.onSale));

            if (queryParameters.year != null)
                products = products.Where(p => p.year.Equals(queryParameters.year));

            if (queryParameters.engineSize != null)
                products = products.Where(p => p.engineSize.Equals(queryParameters.engineSize));

            if (!string.IsNullOrEmpty(queryParameters.sortBy))
            {
                if (typeof(Product).GetProperty(queryParameters.sortBy) != null)
                {
                    products = products.OrderByCustomer(queryParameters.sortBy, queryParameters.SortOrder);
                }
            }

            products = products
                .Skip(queryParameters.Size * (queryParameters.Page - 1))
                .Take(queryParameters.Size);

            return Ok(await products.ToArrayAsync());
        }

        [HttpGet, Route("/products/[controller]")]
        public async Task<ActionResult> GetProduct(int id)
        {
            var product = await _carShopContext.products.FindAsync(id);
            if (product == null)
                return NotFound();
            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult> PostProduct(Product product)
        {
            _carShopContext.products.Add(product);
            await _carShopContext.SaveChangesAsync();

            return CreatedAtAction(
                "GetProduct",
                new { id = product.ID },
                product
                );
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutProduct(int id, Product product)
        {
            if (id != product.ID)
            {
                return BadRequest();
            }
            // Updating data here
            _carShopContext.Entry(product).State = EntityState.Modified;
            try
            {
                // Saves value asynchronously
                await _carShopContext.SaveChangesAsync();
                // Outputs editied value.
                return Ok(_carShopContext.products.Find(id));
            }
            // Product has been modified already.
            // Stops repeat requests to edit.
            catch (DbUpdateConcurrencyException ex)
            {
                if (!_carShopContext.products.Any(p => p.ID == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            var product = await _carShopContext.products.FindAsync(id);
            if (product == null)
                return NotFound();

            _carShopContext.products.Remove(product);
            await _carShopContext.SaveChangesAsync();

            return product;
        }


    }
}
