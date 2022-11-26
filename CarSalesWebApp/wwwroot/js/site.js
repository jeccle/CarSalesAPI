// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.


var allProducts = [];
var currentProduct;
var addSelected, editSelected, delSelected = false;

// Write your JavaScript code.
function populateAllBrandBox(products) {
    let brandRow = document.getElementById("brand-row-index");
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
    let modelRow = document.getElementById("model-row-index");

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
    let sortByButton = document.getElementById("sortBy-drop-button");

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
    sortByButton.addEventListener('change', (e) => {
        clearProducts();
        setSearchTerm();
    });

}
// Displays a specified brand within the models box.
function specificBrandModelBox(products) {
    let modelRow = document.getElementById("model-row-index");
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
// Fills global products list that allows combo boxes to display all models & brands.
function setGlobalProducts(products) {
    allProducts = products;
}
// Checks if dropdown menu is already populated.
function dropDownExists() {
    if (document.body.contains(document.getElementById("brand-drop-button")))
        return true;
    else
        return false;
}

// Creates elements and displays data in page.
function showProducts(products) {
    let brandDropDown = document.getElementById("brand-drop-button");
    
    if (brandDropDown.options.length == 0) {
        // Checks if the dropdown menus have already been loaded in full.
        addEventListeners(products);
        populateAllBrandBox(allProducts);
        populateAllModelBox(allProducts);
        
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
            cell.setAttribute("onclick", "setCurrentProduct(" + product.id + "); fillBoxes(); showManagementControls();"); // fill this with detail view.
            cell.appendChild(image);
            cell.appendChild(text);
            row.appendChild(cell);
            table.appendChild(row);
        }
        else {
            cell.setAttribute("onclick", "setCurrentProduct(" + product.id + "); fillBoxes(); showManagementControls();");
            cell.appendChild(image);
            cell.appendChild(text);
            table.lastElementChild.appendChild(cell);
        }
        count++;
    });
    productsList.appendChild(table);
}
function showProductsOnSale(products) {
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
            cell.setAttribute("onclick", "setCurrentProduct(" + product.id + "); showPopup();"); // fill this with detail view.
            cell.appendChild(image);
            cell.appendChild(text);
            row.appendChild(cell);
            table.appendChild(row);
        }
        else {
            cell.setAttribute("onclick", "setCurrentProduct(" + product.id + ");showPopup();");
            cell.appendChild(image);
            cell.appendChild(text);
            table.lastElementChild.appendChild(cell);
        }
        count++;
    });
    productsList.appendChild(table);
}
function ProductsListSet() {
    let url = "https://carsalesapimanagement.azure-api.net/products";
    //let url = "ht/tps://localhost:7096/api/Products?page=" + currentPage;;
    fetch(url)
        .then(response => response.json())
        .then(data => setProductsList(data))
        .catch(ex => {
            alert("error ");
            console.error(ex);
        });
}
function setProductsList(data) {
    allProducts = data;
}
// Clears all products within products container.
function clearProducts() {
    let productsList = document.getElementById("products-container");
    if (document.body.contains(document.getElementById("products-table"))) {
        productsList.removeChild(document.getElementById("products-table"));
        
    }
}

// Gathers input from textboxes and forms searchTerm.
function setSearchTerm(input) {
    let brandBox = document.getElementById("brand-drop-button");
    let modelBox = document.getElementById("model-drop-button");
    let yearBox = document.getElementById("year");
    let sortByBox = document.getElementById("sortBy-drop-button");

    let searchTerm = "";
    
    let multiQuery = false;

    if (brandBox.value.length > 0 && modelBox.value.length > 0 || yearBox.value.length > 0 && sortByBox.value.length > 0
        || brandBox.value.length > 0 && sortByBox.value.length > 0 || yearBox.value.length > 0 && modelBox.value.length > 0
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

    if (sortByBox.value.length > 0) {
        searchTerm += "sortBy=" + sortByBox.value;
    }
    if (input != null)
        if (searchTerm != null)
            searchTerm += "&" + input;
        else
            searchTerm += input;
    filterProducts(searchTerm);
    //getProducts(searchTerm);
}
function setSearchTermManagement(input) {

    let searchBar = document.getElementById("searchTerm");
    let searchTerm;
    if (searchBar.value.length > 0)
        searchTerm = "searchTerm=" + searchBar.value + "&";
    if (input != null)
        if (searchTerm == null)
            searchTerm = input;
        else
            searchTerm += input;
    filterProductsManagement(searchTerm);
    //getProducts(searchTerm);
}

// API requests for display.
function filterProducts(searchTerm) {

    let productsList = document.getElementById("products-container");
    url = "https://carsalesapimanagement.azure-api.net/products?" + searchTerm;
    //url = "h/ttps://localhost:7096/Products?" + searchTerm;
    fetch(url)
        .then(response => response.json())
        .then(data => showProducts(data, productsList))
        .catch(ex => {
            alert("error ");
            console.error(ex);
        });

}
function filterProductsManagement(searchTerm) {
    let productsList = document.getElementById("products-container");
    url = "https://carsalesapimanagement.azure-api.net/products?" + searchTerm;
    fetch(url)
        .then(response => response.json())
        .then(data => showProductsManagement(data, productsList))
        .catch(ex => {
            alert("error ");
            console.error(ex);
        });
}
function filterProductsOnSale(searchTerm) {
    let productsList = document.getElementById("products-container");
    url = "https://carsalesapimanagement.azure-api.net/products?" + searchTerm;
    fetch(url, {
        headers: {
            "CarSales-API-Version": "2.0"
        }
    })
        .then(response => response.json())
        .then(data => showProductsManagement(data, productsList))
        .catch(ex => {
            alert("error ");
            console.error(ex);
        });
}
// Paging methods
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
    else if (currentPage == 5)
        currentPage = 4;
    return currentPage;
}
// Product selection and display methods.
function setCurrentProduct(curProduct) {
    currentProduct = curProduct;
}
function getCurrentProduct() {
    return currentProduct;
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
function fillBoxes() {
    let id = getCurrentProduct();
    url = "https://carsalesapimanagement.azure-api.net/products/" + id;
    fetch(url)
        .then(response => response.json())
        .then(data => { setBoxDetails(data, id); setPopupDetails(data, id) })
        .catch(ex => {
            alert("error ");
            console.error(ex);
        });
}
function fillManagementDisplay(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => setPopupDetails(data, id))
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
        setTextBox("sale-management-select", BoolToString(product.onSale));
        setTextBox("engineSize-management", product.engineSize);
        setTextBox("img-management", product.img);
        setTextBox("category-management-select", product.categoryID);
    }
}

// Element page presence methods, controls visibility of elements within page.
function showManagementControls() {
    let inputForm = document.getElementById("management-form");
    let managementDetails = document.getElementById("management-details-container");
    inputForm.hidden = false;
    managementDetails.hidden = false;
}
function showPopup() {
    let detailsContainer = document.getElementById("details-container");
    detailsContainer.hidden = false;
    let id = getCurrentProduct();
    url = "https://carsalesapimanagement.azure-api.net/products/" + id;
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

function BoolToString(input) {
    if (input) 
        return "true";
    else
        return "false";
    
}
function DetermineBool(bool) {
    if (bool == "true")
        return true;
    else
        return false;
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
async function buttonClick(parent) {
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
    let onSaleBox = document.getElementById('sale-management-select');
    let engineSizeLabel = document.getElementById('engineSize-label-management');
    let engineSizeBox = document.getElementById('engineSize-management');
    let imgBox = document.getElementById('img-management');
    let imgLabel = document.getElementById('img-label-management');
    let categoryIDBox = document.getElementById('category-management-select');
    let categoryIDLabel = document.getElementById('category-label-management');

    let addButton = document.getElementById('add-button');
    let editButton = document.getElementById('edit-button');
    let deleteButton = document.getElementById('delete-button');
    let submitButton = document.getElementById('submit-button');

    let errorLine = document.getElementById("error-line");

    switch (parent) {
        case "add-button":
            addSelected = true;
            editSelected = delSelected = false;
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
            imgBox.hidden = false;
            imgLabel.hidden = false;
            categoryIDBox.hidden = false;
            categoryIDLabel.hidden = false;
            addButton.style = "background-color: #9999b2;";
            editButton.style = "background-color: #3c3659;";
            deleteButton.style = "background-color: #3c3659;";
            submitButton.style = "background-color: #3c3659;";
            errorLine.hidden = true;
            break;

        case "edit-button":
            editSelected = true;
            addSelected = delSelected = false;
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
            imgBox.hidden = false;
            imgLabel.hidden = false;
            categoryIDBox.hidden = false;
            categoryIDLabel.hidden = false;
            addButton.style = "background-color: #3c3659;";
            editButton.style = "background-color:  #9999b2;";
            deleteButton.style = "background-color: #3c3659;";
            submitButton.style = "background-color: #3c3659;";
            errorLine.hidden = true;
            break;

        case "delete-button":
            delSelected = true;
            addSelected = editSelected = false;
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
            imgLabel.hidden = true;
            imgBox.hidden = true;
            categoryIDLabel.hidden = true;
            categoryIDBox.hidden = true;
            addButton.style = "background-color: #3c3659;";
            editButton.style = "background-color:  #3c3659;";
            deleteButton.style = "background-color: #9999b2;";
            submitButton.style = "background-color: #3c3659;";
            errorLine.hidden = true;
            break;
        case "submit-button":
            if (!addSelected && !editSelected && !delSelected) {
                errorLine.innerHTML = "Select an operation.";
                errorLine.hidden = false;
            }
            else if (addSelected) 
                await addNewProduct();
            else if (editSelected) 
                await editCurrentProduct();
            else if (delSelected) 
                await deleteCurrentProduct();

            addButton.style = "background-color: #3c3659;";
            editButton.style = "background-color:  #3c3659;";
            deleteButton.style = "background-color: #3c3659;";
            submitButton.style = "background-color: #3c3659;";
            addSelected = editSelected = delSelected = false;
            break;
    }
}

// CRUD API calls.
async function addNewProduct() {
    let brandBox = document.getElementById('brand-management');
    let modelBox = document.getElementById('model-management');
    let yearBox = document.getElementById('year-management');
    let priceBox = document.getElementById('salePrice-management');
    let onSaleBox = document.getElementById('sale-management-select');
    let engineSizeBox = document.getElementById('engineSize-management');
    let imgBox = document.getElementById('img-management');
    let categoryIDBox = document.getElementById('category-management-select');
    let error = document.getElementById("error-line");


    if (brandBox.value.length > 0 && modelBox.value.length > 0 && yearBox.value.length > 0
        && priceBox.value.length > 0 && onSaleBox.value.length > 0 && engineSizeBox.value.length > 0) {
        error.hidden = true;
        let url = "https://carsalesapimanagement.azure-api.net/products";
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            body: JSON.stringify(
                {
                    "brand": brandBox.value,
                    "model": modelBox.value,
                    "year": parseInt(yearBox.value),
                    "salePrice": parseInt(priceBox.value),
                    "onSale": DetermineBool(onSaleBox.value),
                    "engineSize": parseInt(engineSizeBox.value),
                    "img": imgBox.value,
                    "categoryID": parseInt(categoryIDBox.value)
                })
        });
        //fillManagementDisplay(response.headers.get('location'));
        clearProducts();
        filterProductsManagement("size=100");
        error.innerHTML = "Product added.";
        error.hidden = false;
    }
    else {
        error.innerHTML = "Fill all boxes before submission.";
        error.hidden = false;
    }
}   
async function editCurrentProduct() {
    let idBox = document.getElementById('id-management');
    let brandBox = document.getElementById('brand-management');
    let modelBox = document.getElementById('model-management');
    let yearBox = document.getElementById('year-management');
    let priceBox = document.getElementById('salePrice-management');
    let onSaleBox = document.getElementById('sale-management-select');
    let engineSizeBox = document.getElementById('engineSize-management');
    let imgBox = document.getElementById('img-management');
    let categoryIDBox = document.getElementById('category-management-select');
    let error = document.getElementById("error-line");

    if (brandBox.value.length > 0 && modelBox.value.length > 0 && yearBox.value.length > 0
        && priceBox.value.length > 0 && onSaleBox.value.length > 0 && engineSizeBox.value.length > 0) {
        error.hidden = true;
        let url = "https://carsalesapimanagement.azure-api.net/products/" + getCurrentProduct();
        let response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json' // Indicates the content 
            },
            body: JSON.stringify(
                {
                    "id": idBox.value,
                    "brand": brandBox.value,
                    "model": modelBox.value,
                    "year": parseInt(yearBox.value),
                    "salePrice": parseInt(priceBox.value),
                    "onSale": DetermineBool(onSaleBox.value),
                    "engineSize": parseInt(engineSizeBox.value),
                    "img": imgBox.value,
                    "categoryID": parseInt(categoryIDBox.value)
                })
        });
        //fillManagementDisplay(response.headers.get('location'));
        clearProducts();
        filterProductsManagement("size=100");
        error.innerHTML = "Product edited.";
        error.hidden = false;
    }
    else {
        error.innerHTML = "Fill all boxes before submission.";
        error.hidden = false;
    }
}
async function deleteCurrentProduct() {
    let idBox = document.getElementById("id-management");
    let error = document.getElementById("error-line");
    if (idBox != null) {
        let url = "https://carsalesapimanagement.azure-api.net/products/" + idBox.value;
        await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        });
        console.log("deleted " + idBox.value);
        clearProducts();
        filterProductsManagement("size=100");
        idBox.value = "";
        error.innerHTML = "Product deleted.";
        error.hidden = false;
    }
    else {
        error.innerHTML = "Fill all boxes before submission.";
        error.hidden = false;
    }
}


