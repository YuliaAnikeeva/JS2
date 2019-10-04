var userCart = [];

document.querySelector('.cart-button').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
	});

class GoodsItem {
  constructor(title, price, image) {
    this.title = title;
    this.price = price;
    this.image = image;
  }
  render() {
    return `<div class="goods-item"><img src="${this.image}" alt="${this.title}"><h3>${this.title}</h3><p>${this.price}</p> <button class="item-button" type="button">Купить</button></div>`;
  }
}
const API_URL = 'https://raw.githubusercontent.com/YuliaAnikeeva/GitTest/master/catforeshop.json';
function makeGETRequest(url, callback) {
  let xhr;
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.responseText);
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
}
class GoodsList {
  constructor() {
    this.goods = [];
    this.filteredGoods = [];

  }
  fetchGoods(cb) {
    makeGETRequest(API_URL, (goods) => {
      this.goods = JSON.parse(goods);
      this.filteredGoods = JSON.parse(goods);
      cb();
    })
  }

  render() {
    let listHtml = '';
    this.filteredGoods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price, good.image);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
  filterGoods(value) {
    // Здесь будем фильтровать список товаров
    const regexp = new RegExp(value, 'i');
    this.filteredGoods = this.goods.filter(good => regexp.test(good.title));
    this.render();

  }

}
document.querySelector('.search-button').addEventListener('click', (e) => {
  const value = document.querySelector('.goods-search').value;
  list.filterGoods(value);
})
const list = new GoodsList();
list.fetchGoods(() => {
  list.render();
});


//User cart

class CartItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="cart-item"><h5>${this.title}</h5><p>${this.price}</p>`;
  }
}

class Cart {
  constructor() {
    this.goods = [];
  }
  fetchCart() {
      
  };
    
    renderCart () { 
    let cartList = '';
  this.goods.forEach(good => {
      const Item = new cartItem(good.title, good.price);
      cartList += CartItem.render();
    });
    document.querySelector('.cart-block').innerHTML = cartList;
  }
}
