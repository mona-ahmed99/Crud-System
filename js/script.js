var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDesc = document.getElementById('productDesc');
var mainBtn = document.getElementById('mainBtn');
var mood = "Add Product"
var productsContainer;
var indexUpdate;




if (localStorage.getItem("productList") == null) {
    productsContainer = [];
}
else {
    productsContainer = JSON.parse(localStorage.getItem("productList"));
    displayProducts();
}

function addProduct() {
    if (mood === "Add Product") {
        if (checkInputs() == true) {
            var product = {
                name: productName.value,
                price: productPrice.value,
                category: productCategory.value,
                desc: productDesc.value
            }
            productsContainer.push(product);
            console.log(productsContainer);
            localStorage.setItem("productList", JSON.stringify(productsContainer))
            clearForm();
            displayProducts()
        }
        else {
            window.alert('All Fields Are Required')
        }

    }
    else {
        saveChanges();
        mainBtn.innerHTML="Add Product"
        mood = "Add Product";
    }



}

function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDesc.value = "";

}

function displayProducts() {
    var container = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        container += `
        <tr>
                    <td>${i + 1}</td>
                    <td>${productsContainer[i].name}</td>
                    <td>${productsContainer[i].price}</td>
                    <td>${productsContainer[i].category}</td>
                    <td>${productsContainer[i].desc}</td>
                    <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
                    <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>

                </tr>
        `
    }
    document.getElementById('tableBody').innerHTML = container;
}


function checkInputs() {
    if (productName.value != "" && productPrice.value != "" && productCategory.value != "" && productDesc.value != "") {
        return true
    }
    else {
        return false
    }
}


function deleteProduct(index) {
    productsContainer.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(productsContainer));
    displayProducts();


}

function searchProduct(searchTerm) {
    var container = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) || productsContainer[i].category.toLowerCase().includes(searchTerm.toLowerCase())) {
            container += `
            <tr>
                        <td>${i + 1}</td>
                        <td>${productsContainer[i].name}</td>
                        <td>${productsContainer[i].price}</td>
                        <td>${productsContainer[i].category}</td>
                        <td>${productsContainer[i].desc}</td>
                        <td><button class="btn btn-outline-warning">Update</button></td>
                        <td><button onclick="deleteProduct(`+ i + `)" class="btn btn-outline-danger">Delete</button></td>
    
                    </tr>
            `
        }
        else {
            console.log('not found')
        }
    }
    document.getElementById('tableBody').innerHTML = container;
}

function updateProduct(index) {
    productName.value = productsContainer[index].name;
    productPrice.value = productsContainer[index].price;
    productCategory.value = productsContainer[index].category;
    productDesc.value = productsContainer[index].desc;
    mainBtn.innerHTML = "Update";
    mood = "Update"
    indexUpdate = index;

}

function saveChanges() {

    var updatedProduct = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDesc.value
    }
    productsContainer.splice(indexUpdate, 1, updatedProduct);
    localStorage.setItem("productList", JSON.stringify(productsContainer))
    clearForm();
    displayProducts()

}