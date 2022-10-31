// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function showProducts(products) {
    products.forEach(product => {
        let slide = document.createElement("slide");
        let div = document.createElement("div");
        let image = document.createElement("img");
        let text = product.brand + " " + product.model + " " + product.year + " $" + product.salePrice + " | Engine Size: " + product.engineSize;
        image.src = product.img;
        slide.appendChild(div);
        slide.appendChild(image);
        slide.appendChild(document.createTextNode(text));
        productsList.appendChild(slide);
    });
}