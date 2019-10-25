const API_URL = 'https://raw.githubusercontent.com/YuliaAnikeeva/GitTest/master/catforeshop.json';

document.querySelector('.cart-button').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
  });
 
  class List {
    //суперкласс для ProductsList и Cart
    constructor (url, container) {
        this.container = container
        this.url = url
        this.items = []
        this.DTO = ''
        this.renderedItems = []
        this._init ()
    }
    _init () {
        return false
    }
    async getJSON (url) {
        try {
            this.items = await fetch (API_URL)
                .then (data => data.json ()) 
                .then (res => {
                    this.DTO = res
                    return res.contents ? this.items = res.contents : this.items = res
                })
        } 
        catch (err) {
            console.log (err)
        }
    }
    render () {
        const block = document.querySelector (this.container)
        for (let item of this.items) {
            let prod = new lists [this.constructor.name] (item)
            this.renderedItems.push (prod)
            block.insertAdjacentHTML ('beforeend', prod.render ())
        }
    }
    filter () {
        //потом
    }
}

class Item {
    //суперкласс для ProductsItem и CartItem
    constructor (el, img) {
        this.title = el.title
        this.price = el.price
        //this.id_product = el.id_product
        this.image = el.image
    }

    render() {
      return `<div class="goods-item">
                <img src="${this.image}" alt="${this.title}">
                  <h3>${this.title}</h3>
                  <p>${this.price}</p> 
                  <button class="buy-btn" 
                        data-name="${this.title}"
                        data-image="${this.image}"
                        data-price="${this.price}">Купить</button>
              </div>`;
    }
}

class Product  extends Item {}


class ProductsList extends List {
  constructor(cart, url=API_URL , container ='.products') {
    super (url, container)
    this.cart = cart
    
  }

  async _init() {
    await this.getJSON()
    this.render()
  }
}
  


//User cart

// class CartItem extends Item{
//     constructor (el, img) {
//         super (el, img)
//         this.quantity = el.quantity

//         // this.product_name = el.product_name
//         // this.price = el.price
//         // //this.id_product = el.id_product
//         // this.img = el.img
//     }
//     render (){
//         return `<div class="cart-item">
//         <div class="product-bio">
//             <img src="${this.img}" alt="Some image">
//             <div class="product-desc">
//                 <p class="product-title">${this.product_name}</p>
//                 <p class="product-quantity">Quantity: ${this.quantity}</p>
//                 <p class="product-single-price">$${this.price} each</p>
//             </div>
//         </div>
//         <div class="right-block">
//             <p class="product-price">${this.quantity * this.price}</p>
//             <button class="del-btn" data-id="${this.id_product}">&times;</button>
//         </div>
//     </div>`
//     }
//  }
// class Cart extends List{
// constructor (url, container = '.cart-block'){
//     super (url, container)
//     this.data = {}

// }
// async _init(){
//     await this.getJSON()
// }
// }

const lists = {
    ProductsList: Product,
 //   Cart: CartItem
}
let products = new ProductsList ()
//let cart = new Cart ()