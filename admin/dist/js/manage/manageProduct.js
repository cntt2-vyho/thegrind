var edit_index = -1;
var img = '';

function formatPrice(price) {
    return new Intl.NumberFormat().format(price);
}
function load() {

    getDataAsync("").then(data => {
        let dataProduct = data.products;
        let dataCategory = data.category;

        if (dataProduct) {
            console.log(dataProduct);

            //console.log(dataProduct);
            var row = "";



            Object.keys(dataProduct).map((e, key) => {

                row += `<tr>
                <td>${key + 1}</td>
                <td><img style="height: 20%" src=${dataProduct[e].url} /></td>
                <td>${dataProduct[e].productName}</td>
                <td>${formatPrice(`${dataProduct[e].price}`)} VNĐ</td>
                <td></td>
                <td>${dataProduct[e].description}</td>
                <td>
                <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#exampleModalLong"  onclick="editProduct('${e}')" >Edit</button> 
                <button type="button" class="btn btn-danger"  onclick="deleteProduct('${e}')"  >Delete</button>
                </td></tr>`
            })
            document.getElementById('tbody-product').innerHTML = row;

        }

        // console.log(dataProduct);${dataCategory[dataProduct[e].categoryId].categoryName}


    })
    //${dataCategory[dataProduct[e].categoryId].categoryName}

    // getDataAsync("category").then(dataCategory => {
    //     if (dataCategory) {
    //         var row = "";
    //         Object.keys(dataCategory).map(e => {

    //             row += `<option value="${e}">${dataCategory[e].categoryName}</option>`
    //         });

    //         document.getElementById('selectCategories').innerHTML = row;

    //     }
    // })
};
function editProduct(id) {
    getDataAsync(`products/${id}`).then(data => {
        //console.log(data);
        if (data) {
            //console.log(data.image);
            edit_index = id;
            document.getElementById('inputProductName').value = data.name;
            document.getElementById('inputPrice').value = data.price;
            document.getElementById('inputDescription').value = data.description;
            document.getElementById('selectCategories').value = data.categoryId;
            img = data.image;
            document.getElementById("displayImage").innerHTML = `<img style="width: 20%" src=${data.image} />`;
            //console.log(document.getElementById("displayImage"));
        }
    })


}



function deleteProduct(id) {

    dbRef.ref('products/' + id).remove();
    location.reload();

}
function chonFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            //console.log(e.target.result)
            img = e.target.result;
            document.getElementById("displayImage").innerHTML = `<img style="width: 20%" src=${img} />`;
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }


}
function createProduct() {
    var inputProductName = document.getElementById('inputProductName').value;

    var inputPrice = document.getElementById('inputPrice').value;
    var inputDescription = document.getElementById('inputDescription').value;
    // var a = document.getElementById('selectCategories').value
    // var categories = {
    //     categoryId: a,
    //     categoryName:a.value.options[a.selectedIndex].text
    // }
    // console.log(categories);
    var product = {
        productName: inputProductName,
        price: inputPrice,
        description: inputDescription,
        // categoryId: inputCategory,
        url: img
    }
    if (edit_index == -1) {


        dbRef.ref().child('products').push(product);


    }
    else {

        dbRef.ref('products/' + edit_index).set(product);
        edit_index = -1;




    }
    //   setTimeout( load(), 3000);
    location.reload();

    document.getElementById("form-create-product").reset();
    document.getElementById("displayImage").innerHTML = "";
}
function cancel() {
    document.getElementById("form-create-product").reset();
    document.getElementById("displayImage").innerHTML = "";
}