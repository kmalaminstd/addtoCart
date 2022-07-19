class UI {

    async productApiFetch() {
        // const productBtnElm = await document.querySelector('.product-btn')
        const res = await fetch("http://localhost:3000/products")
        const productData = await res.json()
        // this.initializeElem(productBtnElm)
        // console.log(productBtnElm);
        
        return productData
        
    }
    async categoryApiFetch() {
        const res = await fetch('http://localhost:3000/categories')
        const categoryData = await res.json()
        
        return categoryData
    }

    async handleAllRemoteData() {
        const {categoryProductDiv, fcategoryIdElem, scategoryproductsProductId, scategoryProductDiv} = this.allSelectors()
        const productData  = await this.productApiFetch();
        const categoryData = await this.categoryApiFetch();

        productData.find( elem => {
           
            if(elem.categoryId === Number(fcategoryIdElem)){


            const cardDiv = document.createElement('div')
            cardDiv.classList.add('card')

            // console.log(elem.id);
            
                
            // console.log(productBtnElm);

            cardDiv.innerHTML = `<img src="${elem.image_url}"alt="iamges" style="width:100%">
            <p hidden class="productId">${elem.id}</p>
            <h1>${elem.name}</h1>
            <p class="price">${elem.price}</p>
            <p>${elem.description}</p>
            <p><button class="product-btn">Add to Cart</button></p>
            <p hidden id="id">${elem.id}</p>
            `
            categoryProductDiv.appendChild(cardDiv)

            }
        })

        productData.find( elem => {
            if(elem.categoryId === Number(scategoryproductsProductId)){
                const cardDiv = document.createElement('div')
            cardDiv.classList.add('card')

            // console.log(elem.id);
            // const productBtnElm = document.querySelector('.card .product-btn');

            cardDiv.innerHTML = `<img src="${elem.image_url}"alt="iamges" style="width:100%">
            <p hidden class="productId">${elem.id}</p>
            <h1>${elem.name}</h1>
            <p class="price">${elem.price}</p>
            <p>${elem.description}</p>
            <p><button class="product-btn">Add to Cart</button></p>
            <p hidden id="id">${elem.id}</p>
            `
            scategoryProductDiv.appendChild(cardDiv)
            }
        })
    
        const productBtnElm = document.getElementsByClassName('product-btn');
        const productId = document.getElementsByClassName('productId')
        // console.log(productId);

        
        return {productBtnElm, productId};
        
    }

    productAddtoCart(){
        console.log('click');
    }

    allSelectors() {

        // const productCartImage = document.querySelector('.prouctImg');
        // const cartProductName = document.querySelector('.productName h4');
        // const cartProductPrice = document.querySelector('.productPrice');
        // const cartProductQuantity = document.querySelector('.productQuantity input');
        // const cartProductDelBtn = document.querySelector('.productDelBtn');

        // console.log(productCartImage);
        // console.log( cartProductName.textContent,
        //     cartProductPrice.textContent, 
        //     cartProductQuantity.value, cartProductDelBtn);

        const productPriceElm = document.querySelector('.category-products .price');
        const productImageElm = document.querySelector('.category-products card img');
        const categoryProductDiv = document.querySelector('.category-products');
        const scategoryProductDiv = document.querySelector('.scategory-products');
        const scategoryproductsProductId = document.querySelector('.scategory-productsProductId').textContent;
        const productNameElm = document.querySelector('.product-name');
        const cartElm = document.querySelector('.cart');
        // // console.log(cartElm);
        const productQuantityElm = document.querySelector('.quantitys p');
        const allProductCart = document.querySelector('.addcarted');
        // const allProductCartCloseBtn = document.querySelector('.close');
        const fcategoryIdElem = document.querySelector('.fcategoryId').textContent;


        // console.log(productBtnElm);

        return {
            // productCartImage,
            // cartProductName,
            // cartProductPrice, 
            // cartProductQuantity,
            // cartProductDelBtn,

            // productPriceElm,
            // productImageElm,
            categoryProductDiv,
            // productNameElm,
            cartElm,
            productQuantityElm,
            allProductCart,
            // allProductCartCloseBtn,
            fcategoryIdElem,
            scategoryProductDiv,
            scategoryproductsProductId
        }
    }

    async initializeElem() {
        
    
        // console.log(productBtnElm);
        const {
            // productBtnElm,
            productQuantityElm,
            cartElm,
            allProductCart,
            allProductCartCloseBtn
        } = this.allSelectors();

        // console.log(allProductCart);
        // console.log(cartElm);

        const {productBtnElm, productId} = await this.handleAllRemoteData()
        
        cartElm.addEventListener('click', function() {
            allProductCart.style.display = "block"
            console.log(allProductCart);
        })

        let countQunatity = 0;
        
        for(let i = 0; i < productBtnElm.length; i++){
            // console.log(productBtnElm[i]);
            productBtnElm[i].addEventListener('click', async ()=> {
                // productId[i].textContent;
                // console.log(productId[i].textContent);
                countQunatity++;
                let receiveProduct = await this.receiveProductFromClient(productId[i].textContent)
                // console.log(receiveProduct);
                const productsArr = this.addProductToArray()
                productsArr.push(receiveProduct)
                console.log(productsArr);
                // console.log(productsArr);
                const div = document.createElement('div');

                this.addProductToCart(receiveProduct, div)
                // console.log(div);
                // this.productAddLocalStorage()
                productQuantityElm.textContent = countQunatity;

                
            })
        }
    }

    addProductToCart(product, div){

        // console.log(countQunatity);

        const {allProductCart, productBtnElm} = this.allSelectors();
        
        
        div.innerHTML = `
        <section class="pt-5 pb-5 carted">
                <div class="container">
                  <div class="row w-100">
                      <div class="col-lg-12 col-md-12 col-12">
                          <h3 class="display-5 mb-2 text-center">Shopping Cart</h3>
                          <p class="close">close</p>
                          <table id="shoppingCart" class="table table-condensed table-responsive">
                              <thead>
                                  <tr>
                                      <th style="width:60%">Product</th>
                                      <th style="width:12%">${product.price}</th>
                                      <th style="width:10%">Quantity</th>
                                      <th style="width:16%"></th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                      <td data-th="Product">
                                          <div class="row">
                                              <div class="col-md-3 text-left prouctImg">
                                                  <img src="${product.image_url}" alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow ">
                                              </div>
                                              <div class="col-md-9 text-left mt-sm-2 productName">
                                                  <h4>${product.name}</h4>
                                                  <p class="font-weight-light">Brand &amp; Name</p>
                                              </div>
                                          </div>
                                      </td>
                                      <td data-th="Price" class="productPrice">${product.price}</td>
                                      <td data-th="Quantity" class="productQuantity">
                                          <input type="number" class="form-control form-control-lg text-center" value="1">
                                      </td>
                                      <td class="actions" data-th="">
                                          <div class="text-right">
                                              
                                              <button class="btn btn-white border-secondary bg-white btn-md mb-2 productDelBtn">
                                                  <i class="fas fa-trash"></i>
                                              </button>
                                          </div>
                                      </td>
                                  </tr>
                                  
                              </tbody>
                          </table>
                          
                      </div>
                  </div>
                  <div class="row mt-4 d-flex align-items-center">
                      <div class="col-sm-6 order-md-2 text-right">
                          <a href="catalog.html" class="btn btn-primary mb-4 btn-lg pl-5 pr-5">Checkout</a>
                      </div>
                      
                  </div>
              </div>
              </section>
        `
        allProductCart.appendChild(div) 

        // console.log(div);

        document.querySelector('.close').addEventListener('click', ()=> {
            allProductCart.style.display = 'none'
        })
       
    }

    addProductToArray(){
        let productsArr = []

        return productsArr
    }


    async receiveProductFromClient(productId){
        const productFromServer = await this.productApiFetch();
        // console.log(productId);
        let receiveProduct = '';
        productFromServer.find( product => {
            // console.log(product);
           if(product.id === Number(productId)){
            receiveProduct = product
            // console.log(products);
           }      
        })
        // console.log(receiveProduct);
        return receiveProduct
    }

    // // async productAddLocalStorage(){
    // //     const products = await this.addProductToArray();
    // //     // console.log(products);
    // // }
}


const ui = new UI();
ui.initializeElem();
