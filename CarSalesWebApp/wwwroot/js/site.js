// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function loadPage() {
    if (!document.cookie.includes("visited=true")) {
        let url = "https://localhost:7096/api/Products?size=100";
        let productsList = document.getElementById("products-container");
        fetch(url)
            .then(response => response.json())
            .then(data => showProducts(data, productsList))
            .catch(ex => {
                alert("error ");
                console.error(ex);
            });
        document.cookie = "visited=true";
    }
}

function showProducts(products, productsList) {
    var count = 0;
    let table = document.createElement("table");
    products.forEach(product => {
        let image = document.createElement("img");
        let text = document.createElement("p");
        let details = product.brand + " " + product.model + " " + product.year + " $" + product.salePrice;
        image.src = product.img;
        text.appendChild(document.createTextNode(details));
        if (count % 4 == 0) {
            let row = document.createElement("tr");
            let cell = document.createElement("td");
            cell.appendChild(image);
            cell.appendChild(text);
            row.appendChild(cell);
            table.appendChild(row);
        }
        else {
            let cell = document.createElement("td");
            cell.appendChild(image);
            cell.appendChild(text);
            table.lastElementChild.appendChild(cell);
        }
        count++;
    });
    productsList.appendChild(table);

}

function filterProducts() {
    let newUrl = window.location.href;
    let urlSplit = newUrl.split("?");
    //let url = "https://localhost:7096/api/Products?size=10&" + urlSplit[1];
    let url = "https://localhost:7096/api/Products?brand=bmw"
    let productsList = document.getElementById("products-container");
    fetch(url)
        .then(response => response.json())
        .then(data => showProducts(data, productsList))
        .catch(ex => {
            alert("error ");
            console.error(ex);
        });


}