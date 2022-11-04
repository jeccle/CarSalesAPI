// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.


var allProducts;

// Write your JavaScript code.
function populateAllBrandBox(products) {
    let brandRow = document.getElementById("brand-row");
    let brandButton = document.getElementById("brand-drop-button");
    brandButton.options.length = 0;
    //let brandButton = document.getElementById("select");
    //brandButton.id = brandButton.name = "brand-drop-button";
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

    let modelButton = document.getElementById("model-drop-button");
    //modelButton.id = "model-drop-button";
   // modelButton.name = "model-drop-button";
    modelButton.options.length = 0;
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
    
}

function addEventListeners() {
    let brandButton = document.getElementById("brand-drop-button");
    let modelButton = document.getElementById("model-drop-button");


    brandButton.addEventListener('change', (e) => {
        clearProducts();
        setSearchTerm();
        //filterProducts("brand=" + brandButton.value + "&model=" + modelButton.value);
    });

    modelButton.addEventListener('change', (e) => {
        clearProducts();
        setSearchTerm();
        //filterProducts("brand=" + brandButton.value + "&model=" + modelButton.value);
    });

}
function specificBrandModelBox(products) {
    //let modelBox = document.getElementById("model-row");
    //modelBox.removeChild(document.getElementById("model-drop-button"));
    let modelRow = document.getElementById("model-row");
    
    //let modelButton = document.createElement("select");
    let modelButton = document.getElementById("model-drop-button");
    modelButton.options.length = 0;
    //modelButton.id = "model-drop-button";
    //modelButton.name = "model-drop-button";
    
    let modelContent = document.createElement("div");
    modelContent.className = "drop-content";

    let modelNames = populateModelNames(document.getElementById("brand-drop-button").value);

    modelNames.forEach(model => {
        let modelAnchor = document.createElement("option")
        modelAnchor.textContent = model;
        modelButton.appendChild(modelAnchor);
    });
    
    modelRow.appendChild(modelButton, modelContent);
}

function populateModelNames(brand) {

    let modelNames = [""];

    // Push all products that are associated with specified brand

    allProducts.forEach(product => {
        if (!modelNames.includes(product.model) && product.brand == brand)
            modelNames.push(product.model);
    });
    return modelNames;
}

function setGlobalProducts(products) {
    allProducts = products;
}

function dropDownExists() {
    if (document.body.contains(document.getElementById("brand-drop-button")))
        return true;
    else
        return false;
}

function showProducts(products) {
    let brandDropDown = document.getElementById("brand-drop-button");
    let modelDropDown = document.getElementById("model-drop-button");
    if (modelDropDown.value.length == 0) // If the modelDropDown is empty
        setGlobalProducts(products);
    if (brandDropDown.options.length == 0) {
        // Checks if the dropdown menus have already been loaded in full.
        populateAllBrandBox(products);
        populateAllModelBox(products);
        addEventListeners();
    }   
    else if (brandDropDown.value.length > 0) {
        // This will set the contents of the Models dropdown 
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
            //cell.onclick(); // fill this with detail view.
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
    url = "https://localhost:7096/api/Products?" + searchTerm + "&size=100";
    fetch(url)
        .then(response => response.json())
        .then(data => showProducts(data, productsList))
        .catch(ex => {
            alert("error ");
            console.error(ex);
        });

}

