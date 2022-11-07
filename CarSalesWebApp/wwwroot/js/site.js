// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.


var allProducts = [];
var currentProduct;

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

function addEventListeners(products) {
    let brandButton = document.getElementById("brand-drop-button");
    let modelButton = document.getElementById("model-drop-button");


    brandButton.addEventListener('change', (e) => {
        if (brandButton.value > 0) {
            clearProducts();
            setSearchTerm();
        }
        else {
            if (modelButton.value.length == 0) // If the modelDropDown is empty
                setGlobalProducts(products);
            clearProducts();
            setSearchTerm();
            populateAllModelBox(allProducts);
        }
        //filterProducts("brand=" + brandButton.value + "&model=" + modelButton.value);
    });

    modelButton.addEventListener('change', (e) => {
        clearProducts();
        setSearchTerm();
        //filterProducts("brand=" + brandButton.value + "&model=" + modelButton.value);
    });

}

function specificBrandModelBox(products) {
    let modelRow = document.getElementById("model-row");
    let modelButton = document.getElementById("model-drop-button");
    modelButton.options.length = 0;
    
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
    
    if (brandDropDown.options.length == 0) {
        // Checks if the dropdown menus have already been loaded in full.
        addEventListeners(products);
        populateAllBrandBox(products);
        populateAllModelBox(products);
        
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
        let cell = document.createElement("td");
        let details = product.brand + " " + product.model + " " + product.year + " $" + product.salePrice;
        image.src = product.img;


        text.appendChild(document.createTextNode(details));
        if (count % 4 == 0) {
            let row = document.createElement("tr");

            cell.setAttribute("onclick", "setCurrentProduct(" + product.id + "); showPopup();"); // fill this with detail view.
            cell.appendChild(image);
            cell.appendChild(text);
            row.appendChild(cell);
            table.appendChild(row);
        }
        else {
            cell.setAttribute("onclick", "setCurrentProduct(" + product.id + "); showPopup();");
            cell.appendChild(image);
            cell.appendChild(text);
            table.lastElementChild.appendChild(cell);
        }
        count++;
    });
    productsList.appendChild(table);

}

function showProductsManagement(products) {
    let productsList = document.getElementById("products-container");
    var count = 0;  // Count pointer tracks how many products in the row.

    let table = document.createElement("table");
    table.id = "products-table";
    products.forEach(product => {
        let image = document.createElement("img");
        let text = document.createElement("p");
        let cell = document.createElement("td");
        let details = product.id + " " + product.brand + " " + product.model + " " + product.year + " $" + product.salePrice;
        image.src = product.img;


        text.appendChild(document.createTextNode(details));
        if (count % 4 == 0) {
            let row = document.createElement("tr");
            cell.setAttribute("onclick", "setCurrentProduct(" + product.id + "); fillBoxes();"); // fill this with detail view.
            cell.appendChild(image);
            cell.appendChild(text);
            row.appendChild(cell);
            table.appendChild(row);
        }
        else {
            cell.setAttribute("onclick", "setCurrentProduct(" + product.id + "); fillBoxes();");
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

function setSearchTerm(input) {
    let brandBox = document.getElementById("brand-drop-button");
    let modelBox = document.getElementById("model-drop-button");
    let yearBox = document.getElementById("year");
    let engineSizeBox = document.getElementById("engineSize");

    let searchTerm = "";
    
    let multiQuery = false;

    if (brandBox.value.length > 0 && modelBox.value.length > 0 || yearBox.value.length > 0 && engineSizeBox.value.length > 0
        || brandBox.value.length > 0 && engineSizeBox.value.length > 0 || yearBox.value.length > 0 && modelBox.value.length > 0
        || yearBox.value.length > 0 && brandBox.value.length > 0) {
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
    if (input != null)
        if (searchTerm != null)
            searchTerm += "&" + input;
        else
            searchTerm += input;
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

function buttonPageDown() {
    clearProducts();
    currentPage--;
    currentPage = getPage();
    setSearchTerm("page=" + (currentPage));
}

function buttonPageUp() {
    clearProducts();
    currentPage++;
    currentPage = getPage();
    setSearchTerm("page=" + currentPage);
}

function getPage() {
    if (currentPage == null || currentPage == 0)
        currentPage = 1;
    else if (currentPage == 4)
        currentPage = 3;
    return currentPage;
}

function changeText(parent, text) {
    let element = document.getElementById(parent);
    element.innerText = text;
}

function setImage(parent, image) {
    let element = document.getElementById(parent);
    element.src = image;
}

function setTextBox(parent, text) {
    let element = document.getElementById(parent);
    element.value = text;
}

function buttonClick(parent) {
    let idLabel = document.getElementById('id-label-management');
    let idBox = document.getElementById('id-management');
    let brandLabel = document.getElementById('brand-label-management');
    let brandBox = document.getElementById('brand-management');
    let modelLabel = document.getElementById('model-label-management');
    let modelBox = document.getElementById('model-management');
    let yearLabel = document.getElementById('year-label-management');
    let yearBox = document.getElementById('year-management');
    let priceLabel = document.getElementById('salePrice-label-management');
    let priceBox = document.getElementById('salePrice-management');
    let onSaleLabel = document.getElementById('sale-label-management');
    let onSaleBox = document.getElementById('sale-management');
    let engineSizeLabel = document.getElementById('engineSize-label-management');
    let engineSizeBox = document.getElementById('engineSize-management');

    switch (parent) {
        case "add-button":
            idBox.hidden = true;
            idLabel.hidden = true;
            brandBox.hidden = false;
            brandLabel.hidden = false;
            modelBox.hidden = false;
            modelLabel.hidden = false;
            yearBox.hidden = false;
            yearLabel.hidden = false;
            priceBox.hidden = false;
            priceLabel.hidden = false;
            onSaleBox.hidden = false;
            onSaleLabel.hidden = false;
            engineSizeBox.hidden = false;
            engineSizeLabel.hidden = false;
            break;

        case "edit-button":
            idBox.hidden = false;
            idLabel.hidden = false;
            brandBox.hidden = false;
            brandLabel.hidden = false;
            modelBox.hidden = false;
            modelLabel.hidden = false;
            yearBox.hidden = false;
            yearLabel.hidden = false;
            priceBox.hidden = false;
            priceLabel.hidden = false;
            onSaleBox.hidden = false;
            onSaleLabel.hidden = false;
            engineSizeBox.hidden = false;
            engineSizeLabel.hidden = false;
            break;

        case "delete-button":
            idBox.hidden = false;
            idLabel.hidden = false;
            brandBox.hidden = true;
            brandLabel.hidden = true;
            modelBox.hidden = true;
            modelLabel.hidden = true;
            yearBox.hidden = true;
            yearLabel.hidden = true;
            priceBox.hidden = true;
            priceLabel.hidden = true;
            onSaleBox.hidden = true;
            onSaleLabel.hidden = true;
            engineSizeBox.hidden = true;
            engineSizeLabel.hidden = true;
            break;
        case "restore":
            idBox.hidden = false;
            idLabel.hidden = false;
            brandBox.hidden = false;
            brandLabel.hidden = false;
            modelBox.hidden = false;
            modelLabel.hidden = false;
            yearBox.hidden = false;
            yearLabel.hidden = false;
            priceBox.hidden = false;
            priceLabel.hidden = false;
            onSaleBox.hidden = false;
            onSaleLabel.hidden = false;
            engineSizeBox.hidden = false;
            engineSizeLabel.hidden = false;
            break;
    }
}

function setCurrentProduct(curProduct) {
    currentProduct = curProduct;
}

function getCurrentProduct() {
    return currentProduct;
}

function showPopup() {
    let detailsContainer = document.getElementById("details-container");
    detailsContainer.hidden = false;
    let id = getCurrentProduct();
    url = "https://localhost:7096/products/Products?id=" + id;
    fetch(url)
        .then(response => response.json())
        .then(data => setPopupDetails(data, id))
        .catch(ex => {
            alert("error ");
            console.error(ex);
        });

    
}
function closePopup() {
    let popup = document.getElementById("details-container");
    popup.hidden = true;
}
function fillBoxes() {
    let id = getCurrentProduct();
    url = "https://localhost:7096/products/Products?id=" + id;
    fetch(url)
        .then(response => response.json())
        .then(data => setBoxDetails(data, id))
        .catch(ex => {
            alert("error ");
            console.error(ex);
        });
}

function setBoxDetails(product, id) {
    if (id == product.id) {
            setTextBox("id-management", product.id);
            setTextBox("brand-management", product.brand);
            setTextBox("model-management", product.model);
            setTextBox("year-management", product.year);
            setTextBox("salePrice-management", product.salePrice);
            setTextBox("sale-management", product.sale);
            setTextBox("engineSize-management", product.engineSize);
        }

}

function setPopupDetails(product, id) {
    
        if (id == product.id) {
            changeText("id-details", product.id);
            changeText("brand-details", product.brand);
            changeText("model-details", product.model);
            changeText("year-details", product.year);
            changeText("salePrice-details", product.salePrice);
            changeText("sale-details", product.onSale);
            changeText("engineSize-details", product.engineSize);
            setImage("car-image", product.img);
        }
    
}
