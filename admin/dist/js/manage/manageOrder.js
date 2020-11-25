function load() {

    getDataAsync("users").then(dataOrder => {
        if (dataOrder) {
            Object.keys(dataOrder).map(e => {

                if (dataOrder[e].bills) {
                    //console.log(dataOrder[e].bills);
                    var row = "";
                    Object.keys(dataOrder[e].bills).map((f, key) => {



                        row += `<tr>
                        <td>${key + 1}</td>
                        <td data-toggle="modal" data-target="#userCustomerDetails" onclick="showCustomer('${e}')" >${dataOrder[e].fullname}</td>
                        <td><button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#userProductDetails" onclick="showOrderDetails('${e}', '${f}')" >Details</button></td>
                        <td>
                            <p>Phone: <strong>${dataOrder[e].bills[f].informationBill.phone}</strong></p>
                            <p>Address: <strong>${dataOrder[e].bills[f].informationBill.address}</strong></p>
                            <p>Note: <strong>${dataOrder[e].bills[f].informationBill.note}</strong></p>
                            <p>Create at: <strong>${dataOrder[e].bills[f].informationBill.createAt}</strong></p>
                        </td>
                        <td> 
                            ${formatPrice(`${dataOrder[e].bills[f].total}`)} VNĐ
                        </td>
                        <td>
                        <button type="button" class="btn btn-danger" onclick="deleteOrder('${e}', '${f}')">Delete</button>
                        </td>
                        </tr>`
                    })

                    document.getElementById('tbody-orders').innerHTML = row
                }
            })
        }
    })


}
function deleteOrder(e, f) {
    dbRef.ref(`users/${e}/bills/${f}`).remove();
    location.reload();
}
function formatPrice(price) {
    return new Intl.NumberFormat().format(price);
}
function showOrderDetails(e, f) {
    // console.log(e, " , ", f);
    getDataAsync(`users/${e}/bills/${f}`).then(data => {
        //console.log(data);
        if (data) {
            let dataProducts = data.products;
            //console.log(data.products);
            var row = ``;
            dataProducts.map((value, key) => {
                row += `<tr>
                <td>${key + 1}</td>
                <td><img src=${value.product.image} style="width: 20%" /></td>
                <td>${value.product.name}</td>
                <td>${value.quantity}</td>
                <td>  ${formatPrice(`${value.total}`)} VNĐ
                </td>
                `
            })

            document.getElementById('showProductOrder').innerHTML = row;

        }
    })
}
function showCustomer(e) {
    getDataAsync(`users/${e}`).then(data => {
        if (data) {
            var row = `<form id="form-show-Bills">
                <div class="form-row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="small mb-1">Fullname: <strong>${data.fullname} </strong></label>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="inputImage" class="small mb-1">Phone: <strong>${data.phone}</strong></label>

                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="small mb-1" for="inputLastName">Address: <strong>${data.address} </strong>
                              </label>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="small mb-1" for="inputLastName">Email: <strong>${data.email} </strong>
                              </label>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="small mb-1" for="inputLastName">Username: <strong>${data.username} </strong>
                              </label>
                        </div>
                    </div>
                    </tbody>
                    </table>

                            </div>


                        </div>
                    </div>
                </div>
            </form>`;
            document.getElementById('showCustomerContent').innerHTML = row;
        }

    })
}
