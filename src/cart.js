let label = document.getElementById("label");

let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((a, b) => a + b, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        let { img, name, price } = search;
        return `
      <div class="cart-item">

        <img width="100" src="${img}" alt="" />

        <div class="details">
          <div class="title-price-x">
            <h4 class="title-price">  
              <p>${name}</p>
              <p class="cart-item-price">$ ${price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>

          <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id="${id}" class="quantity">${item}</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>     

          <h3>$ ${price * item}</h3>
        </div>

      </div>
      `;
      })
      .join("");
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is empty!</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to home</button>
    </a> 
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item++;
  }
  update(selectedItem.id);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item--;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((y) => y.id !== selectedItem.id);
  generateCartItems();
  calculation();
  totalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  calculation();
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
  if (basket != 0) {
    let total = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return search.price * item;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(total);
    label.innerHTML = `
    <h2>Total Bill: $ ${total}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()"class="removeAll">Clear Cart</button>
    `;
  } else return;
};

totalAmount();
