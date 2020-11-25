function formatPrice(price) {
    return new Intl.NumberFormat().format(price);
}


function chuyenDoiURL(str)  {
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
}


function load() {
    let dataCategories;

    var row = "";
    var row1 = "";
    getDataAsync("").then(data => {


        console.log(data);
        dataProducts = data.products;
        dataCategories = data.categories;
        console.log(dataProducts, dataCategories);


        Object.keys(dataCategories).map(e => {
            return (
                row += ` <h4 ><a href="#${chuyenDoiURL(`${dataCategories[e].categoryName}`)}" style="color: #000; text-decoration: none">${dataCategories[e].categoryName.toUpperCase()}<a></h4>`
            )
        })

        document.getElementById('menu').innerHTML = row;

        Object.keys(dataCategories).map(e => {
            console.log(e);
            row1 += `<div class="dinner-menu-content" style="padding: 30px;" id="#${chuyenDoiURL(`${dataCategories[e].categoryName}`)}">
            <div class="row">
                <div class="col-md-12">
                    <h2>${dataCategories[e].categoryName.toUpperCase()}</h2>
                    <div>`

                    Object.keys(dataProducts).map(f => {
                        if(e == dataProducts[f].categoriesId) {
                            return (
                                row1+= `<div class="item col-md-4" style="padding: 15px">
                            <div class="food-item">
                                <img src=${dataProducts[f].url} alt="">
                                <div class="price"> ${formatPrice(`${dataProducts[f].price}`)} VNĐ</div>
                                <div class="text-content">
                                    <h4>${dataProducts[f].productName}</h4>
                                    <p>${dataProducts[f].description}</p>
                                </div>
                            </div>
                        </div>`
                            )
                        }
                    })

                    
                        // <div class="item col-md-4">
                        //     <div class="food-item">
                        //         <img src="img/lunch_item.jpg" alt="">
                        //         <div class="price">$6.50</div>
                        //         <div class="text-content">
                        //             <h4>Mumble Ditch Corn</h4>
                        //             <p>Dreamcatcher squid ennui cliche chicharros nes echo  small batch jean ditcher meal...</p>
                        //         </div>
                        //     </div>
                        // </div>
                        // <div class="item col-md-4">
                        //     <div class="food-item">
                        //         <img src="img/lunch_item.jpg" alt="">
                        //         <div class="price">$6.50</div>
                        //         <div class="text-content">
                        //             <h4>Mumble Ditch Corn</h4>
                        //             <p>Dreamcatcher squid ennui cliche chicharros nes echo  small batch jean ditcher meal...</p>
                        //         </div>
                        //     </div>
                        // </div>
                        // <div class="item col-md-4">
                        //     <div class="food-item">
                        //         <img src="img/lunch_item.jpg" alt="">
                        //         <div class="price">$6.50</div>
                        //         <div class="text-content">
                        //             <h4>Mumble Ditch Corn</h4>
                        //             <p>Dreamcatcher squid ennui cliche chicharros nes echo  small batch jean ditcher meal...</p>
                        //         </div>
                        //     </div>
                        // </div>
                        // <div class="item col-md-4">
                        //     <div class="food-item">
                        //         <img src="img/lunch_item.jpg" alt="">
                        //         <div class="price">$6.50</div>
                        //         <div class="text-content">
                        //             <h4>Mumble Ditch Corn</h4>
                        //             <p>Dreamcatcher squid ennui cliche chicharros nes echo  small batch jean ditcher meal...</p>
                        //         </div>
                        //     </div>
                        // </div>


                    
                row1+= `</div>
                </div>
            </div>
        </div>`
        })

        document.getElementById('listProduct').innerHTML = row1;

        // document.getElementById('breakfast-menu').innerHTML =row
    })
}