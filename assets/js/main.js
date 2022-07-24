class ProductFetch{
    async productApiFetch(){
        const res = await fetch('http://localhost:3000/products');
        const allProducts = await res.json();
        // console.log(allProducts);
        return allProducts
    }
}

const product = new ProductFetch()
// product.productApiFetch();


class UIinitialize{

    allSelectors(){
        // const cartElm = document.querySelector('.addcarted');
        const fproductsCategoryElem = document.querySelector('.category-products');
        const sproductCategoryElem = document.querySelector('.scategory-products')
        const productCartDivElem = document.querySelector('.addcarted');
        const cartClickElem = document.querySelector('.cart');
        const productAddedToCart = document.querySelector('#shoppingCart')

        return {
            // cartElm,
            fproductsCategoryElem,
            sproductCategoryElem,
            productCartDivElem,
            cartClickElem,
            productAddedToCart
        }
    }

}

const uiinit = new UIinitialize();


class ProductInUi{
    async productsShowToUi(){
        const allProducts = await product.productApiFetch();
        // console.log(allProducts);

        const {fproductsCategoryElem, sproductCategoryElem} = uiinit.allSelectors();

        allProducts.find( elem => {
            if(elem.categoryId === 1){
                

                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card')
    
                cardDiv.innerHTML = `
                <img src="${elem.image_url}"
                                alt="Product Image" style="width:100%">
                            <h1>${elem.name}</h1>
                            <p class="price">${elem.price}</p>
                            <p>${elem.description}</p>
                            <p><button class="product-btn">Add to Cart</button></p>
                            <p style="display: none;" id="productId">${elem.id}</p>
                `

                // console.log(elem.id);
                // console.log(cardDiv);
                fproductsCategoryElem.appendChild(cardDiv)
                
            }
        })

        allProducts.find( elem => {
            if(elem.categoryId === 2){
                

                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card')
    
                cardDiv.innerHTML = `
                <img src="${elem.image_url}"
                                alt="Product Image" style="width:100%">
                            <h1>${elem.name}</h1>
                            <p class="price">${elem.price}</p>
                            <p>${elem.description}</p>
                            <p><button class="product-btn">Add to Cart</button></p>
                            <p style="display: none;" id="productId">${elem.id}</p>
                `
                // console.log(cardDiv);
                sproductCategoryElem.appendChild(cardDiv)
               
            }

        })

        const productCardBtn = document.querySelectorAll('.product-btn');
        const productId = document.querySelectorAll('#productId')

        // console.log(productId);

        return {productCardBtn,
            productId} 

    }
}

const productUi = new ProductInUi();
// productUi.productsShowToUi()

class InitializeElem{
    async initialize(){
        const {productCartDivElem, cartClickElem, productAddedToCart} = uiinit.allSelectors();
        const {productCardBtn, productId} = await productUi.productsShowToUi()
        const allProducts = await product.productApiFetch()


        for(let i = 0; i < productCardBtn.length; i++){
            productCardBtn[i].addEventListener('click', ()=> {
                allProducts.find( elem => {
                    if(elem.id === Number(productId[i].textContent)){

                        const tbody = document.createElement('tbody');
                        tbody.classList.add = 'productBody'

                        const productElem = `
                        <div id="${elem.id}">
                        <td data-th="Product" id="${elem.id}">
                        <p hidden class="prdouctElemId">${elem.id}</p>
                                          <div class="row">
                                              <div class="col-md-3 text-left productImg">
                                                   <img src="${elem.image_url}" height="100" width="auto" alt="product image" class="img-fluid d-none d-md-block rounded mb-2 shadow "> 
                                              </div>
                                              <div class="col-md-9 text-left mt-sm-2 productName">
                                                   <h4>${elem.name}</h4>
                                                <!---  <p class="font-weight-light">Brand &amp; Name</p> --> 
                                              </div>
                                          </div>
                                      </td>
                                       <td data-th="Price" class="productPrice">${elem.price}</td> 
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
                        </div>
                        `

                        tbody.innerHTML = productElem

                        productAddedToCart.appendChild(tbody)

                        
                        const prodId = document.querySelectorAll('.prdouctElemId')

                        const productDelBtn = document.querySelectorAll('.productDelBtn')

                        for(let i = 0; i < productDelBtn.length; i++){
                            productDelBtn[i].addEventListener('click', ()=>{
                                // tbody.setAttribute('hidden', '')
                                console.log(tbody.childNodes[i].nextSibling)
                                console.log(productAddedToCart);
                            })
                        }
                        
                       
                        
                    }
                })
                
            })
        }  

        cartClickElem.addEventListener('click', ()=> {
            productCartDivElem.style.display = 'block'
            // console.log('click');

            document.querySelector('.close').addEventListener('click', ()=> {
                productCartDivElem.style.display = 'none'
                // console.log(document.querySelector('.close'));
            })
            

        })
    }


}

const init = new InitializeElem();
init.initialize()