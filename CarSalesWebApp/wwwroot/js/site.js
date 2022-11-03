﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.




// Write your JavaScript code.
function populateAllBrandBox(products) {
    let brandRow = document.getElementById("brand-row");
    let brandButton = document.createElement("select");
    brandButton.id = brandButton.name = "brand-drop-button";
    let brandContent = document.createElement("div");
    brandContent.className = "drop-content";
    
    // Fill arrays with dropdown contents.
    let brandNames = [""];
    products.forEach(product => {
        if (!brandNames.includes(product.brand))
            brandNames.push(product.brand);
    });
    // populate each row with values.
    brandNames.forEach(brand => {
        let brandAnchor = document.createElement("option");
        brandAnchor.textContent = brand;
        brandButton.appendChild(brandAnchor);
    });
    brandRow.appendChild(brandButton, brandContent);
    
    
}

function populateAllModelBox(products) {
    let modelRow = document.getElementById("model-row");

    let modelButton = document.createElement("select");
    modelButton.id = "model-drop-button";
    modelButton.name = "model-drop-button";

    let modelContent = document.createElement("div");
    modelContent.className = "drop-content";


    // Fill arrays with dropdown contents.
    let modelNames = [""];

    products.forEach(product => {
        if (!modelNames.includes(product.model))
            modelNames.push(product.model);

    });

    // populate each row with values.
    modelNames.forEach(model => {

        let modelAnchor = document.createElement("option");
        modelAnchor.textContent = model;
        modelButton.appendChild(modelAnchor);
    });


    modelRow.appendChild(modelButton, modelContent);
    addEventListeners();
}

function addEventListeners() {
    let brandButton = document.getElementById("brand-drop-button");
    let modelButton = document.getElementById("model-drop-button");


    brandButton.addEventListener('change', () => {
        clearProducts();
        setSearchTerm();
        //filterProducts("brand=" + brandButton.value + "&model=" + modelButton.value);
    });

    modelButton.addEventListener('change', () => {
        clearProducts();
        setSearchTerm();
        //filterProducts("brand=" + brandButton.value + "&model=" + modelButton.value);
    });

}
function specificBrandModelBox(brand, products) {
    let modelBox = document.getElementById("model-row");
    modelBox.removeChild(document.getElementById("model-drop-button"));
    let modelRow = document.getElementById("model-row");
    let modelButton = document.createElement("select");
    modelButton.id = "model-drop-button";
    modelButton.name = "model-drop-button";

    let modelContent = document.createElement("div");
    modelContent.className = "drop-content";

    let modelNames = [""];

    // Push all products that are associated with specified brand
    products.forEach(product => {
        if (!modelNames.includes(product.model) && product.brand == brand)
            modelNames.push(product.model);
    });

    modelNames.forEach(model => {
        let modelAnchor = document.createElement("option")
        modelAnchor.textContent = model;
        modelButton.appendChild(modelAnchor);
    });
    
    modelRow.appendChild(modelButton, modelContent);
}

function dropDownExists() {
    if (document.body.contains(document.getElementById("brand-drop-button")))
        return true;
    else
        return false;
}

function showProducts(products) {
    if (!dropDownExists()) {
        // Checks if the dropdown menus have already been loaded in full.
        populateAllBrandBox(products);
        populateAllModelBox(products);
        
    }   
    else {
        brandDropDown = document.getElementById("brand-drop-button");
        if (brandDropDown.value.length > 0)                         // This will set the contents of the Models dropdown 
            specificBrandModelBox(brandDropDown.value, products);   // to display those related to the specified brand.
    }
    let productsList = document.getElementById("products-container");
    var count = 0;  // Count pointer tracks how many products in the row.

    let table = document.createElement("table");
    table.id = "products-table";
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

function clearProducts() {
    let productsList = document.getElementById("products-container");
    if (document.body.contains(document.getElementById("products-table"))) {
        productsList.removeChild(document.getElementById("products-table"));
        
    }
}

function setSearchTerm() {
    let brandBox = document.getElementById("brand-drop-button");
    let modelBox = document.getElementById("model-drop-button");
    let yearBox = document.getElementById("year");
    let engineSizeBox = document.getElementById("engineSize");

    let searchTerm = "";
    let multiQuery = false;

    if (brandBox.value.length > 0 && modelBox.value.length > 0 || yearBox.value.length > 0 && engineSizeBox.value.length > 0
        || brandBox.value.length > 0 && engineSizeBox.value.length > 0 || yearBox.value.length > 0 && modelBox.value.length > 0) {
        multiQuery = true;
}

    if (brandBox.value.length > 0) { 
        searchTerm += "brand=" + brandBox.value;
        if (multiQuery)
            searchTerm += "&";
    }

    if (modelBox.value.length > 0) { 
        searchTerm += "model=" + modelBox.value;
        if (multiQuery)
            searchTerm += "&";
    }

    if (yearBox.value.length > 0) {
        searchTerm += "year=" + yearBox.value;
        if (multiQuery)
            searchTerm += "&";
    }

    if (engineSizeBox.value.length > 0) {
        searchTerm += "engineSize=" + engineSizeBox.value;
    }

    filterProducts(searchTerm);
    //getProducts(searchTerm);
}

function filterProducts(searchTerm) {

    let productsList = document.getElementById("products-container");
    url = "https://localhost:7096/api/Products?" + searchTerm;
    fetch(url)
        .then(response => response.json())
        .then(data => showProducts(data, productsList))
        .catch(ex => {
            alert("error ");
            console.error(ex);
        });

}

function getProducts(searchTerm) {

    let productsList = document.getElementById("products-container");
    url = "https://localhost:7096/api/Products";
    fetch(url)
        .then(response => response.json())
        .then(data => showProducts(data, productsList))
        .catch(ex => {
            alert("error ");
            console.error(ex);
        });
}