const productTable = document.querySelector("#product-table");
const productCart = document.querySelector("#product-cart");

const products = [
  {
    id: 1,
    name: "Sản phẩm 1",
    price: 1000,
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    price: 2000,
  },
  {
    id: 3,
    name: "Sản phẩm 3",
    price: 3000,
  },
  {
    id: 4,
    name: "Sản phẩm 4",
    price: 4000,
  },
];

const cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Hàm xóa sản phẩm mong muốn khỏi giỏ hàng
function deleteProductFromCart(productId) {
  const existingProductIndex = cart.findIndex(
    (product) => product.id === productId
  );
  if (existingProductIndex !== -1) {
    cart.splice(existingProductIndex, 1);
    saveCartToLocalStorage();
    renderCart();
  }
}

// Cập nhật thay đổi trong giỏ hàng
function updateProductCart() {
  cart.forEach((product) => {
    const productId = product.id;
    const quantityInput = productCart.querySelector(
      `.quantity[data-id="${productId}"]`
    );
    if (quantityInput) {
      const newQuantity = parseInt(quantityInput.value);
      if (newQuantity >= 1) {
        product.quantity = newQuantity;
        product.total = product.price * newQuantity;
      } else {
        deleteProductFromCart(productId);
      }
    }
  });
  saveCartToLocalStorage();
  renderCart();
}

function renderProduct() {
  const tableProductBody = document.createElement("tbody");
  productTable.append(tableProductBody);
  tableProductBody.innerHTML = products
    .map((product) => {
      return `
        <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>
            <input type="number" class="quantity" value="1" min="0" />
            <button type="button" class="add-to-cart" data-id="${product.id}" >Thêm vào giỏ</button>
          </td>
        </tr>
      `;
    })
    .join("");

  const btnAdds = document.querySelectorAll(".add-to-cart");
  const quantity = document.querySelectorAll(".quantity");

  btnAdds.forEach((btnAdd) => {
    btnAdd.addEventListener("click", function () {
      const productId = parseInt(btnAdd.getAttribute("data-id"));
      const quantityValue = parseInt(
        btnAdd.parentElement.querySelector(".quantity").value
      );
      const productToAdd = products.find((product) => product.id === productId);
      if (productToAdd) {
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingProductIndex = cart.findIndex(
          (item) => item.id === productId
        );
        if (existingProductIndex !== -1) {
          // Nếu đã tồn tại, cập nhật số lượng và tổng tiền
          cart[existingProductIndex].quantity += quantityValue;
          cart[existingProductIndex].total =
            cart[existingProductIndex].quantity *
            cart[existingProductIndex].price;
        } else {
          // Nếu chưa tồn tại, thêm sản phẩm vào giỏ hàng
          productToAdd.quantity = quantityValue;
          // Tính toán và thêm trường total vào sản phẩm
          productToAdd.total = productToAdd.price * quantityValue;
          cart.push(productToAdd);
        }
        saveCartToLocalStorage();
        renderCart();
      }
    });
  });
}

// Hàm cập nhật tổng tiền và số lượng trong giỏ hàng
function updateCartSummary() {
  let totalPrice = 0;
  let totalQuantity = 0;

  for (const product of cart) {
    totalPrice += product.total;
    totalQuantity += product.quantity;
  }

  const totalPriceElement = document.querySelector("#total-price");
  const totalQuantityElement = document.querySelector("#total-quantity");

  totalPriceElement.textContent = totalPrice;
  totalQuantityElement.textContent = totalQuantity;
}

//Hàm xóa tất cả sản phầm trong giỏ hàng
function clearCart() {
  cart.length = 0;

  saveCartToLocalStorage();
  renderCart();
}

function renderCart() {
  const cartTable = `<table cellpadding="0" cellspacing="0" width="100%" border="1" id="cart-table">
  <thead>
    <tr>
        <th width="5%">STT</th>
        <th>Tên sản phẩm</th>
        <th width="20%">Giá</th>
        <th width="20%">Số lượng</th>
        <th width="20%">Thành tiền</th>
        <th width="5%">Xoá</th>
    </tr>
</thead>
</table>
<button type="button" id="update-cart">Cập nhật giỏ hàng</button>
<button type="button" id="delete-cart">Xoá giỏ hàng</button>`;
  productCart.innerHTML = cartTable;
  const tableCartBody = document.createElement("tbody");
  // Các sản phẩm được thêm vào giỏ hàng
  tableCartBody.innerHTML = cart
    .map((product, index) => {
      return `<tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><input type="number" class="quantity" data-id="${
              product.id
            }" value="${product.quantity}" min="0"></td>
            <td>${product.total}</td>
            <td><button type="button" class="btn-delete" data-id="${
              product.id
            }">Xoá</button></td>
        </tr>`;
    })
    .join("");
  productCart.querySelector("#cart-table").appendChild(tableCartBody);

  // Tổng tiền và số lượng
  const tableCartFoot = document.createElement("tfoot");
  productCart.querySelector("#cart-table").appendChild(tableCartFoot);
  tableCartFoot.innerHTML = `
  <tr>
   <td colspan="3">Tổng</td>
    <td id="total-quantity" colspan="1"></td>
    <td id="total-price" colspan="2"></td>
  </tr>
   
  `;
  const btnUpdateCart = productCart.querySelector("#update-cart");
  // Cập nhật thay đổi trong giỏ hàng
  btnUpdateCart.addEventListener("click", function () {
    alert("Cập nhật giỏ hàng thành công");
    updateProductCart();
  });

  const btnAllDelete = productCart.querySelector("#delete-cart");
  // Xóa tất cả sản phẩm trong giỏ hàng
  btnAllDelete.addEventListener("click", function () {
    if (confirm("Are you sure?") === true) {
      alert("Xóa sản phẩm thành công");
      clearCart();
    }
  });

  const btnDeletes = document.querySelectorAll(".btn-delete");

  // Xóa sản phẩm mong muốn trong giỏ hàng
  btnDeletes.forEach((btnDelete) => {
    btnDelete.addEventListener("click", function () {
      const productId = parseInt(btnDelete.getAttribute("data-id"));
      if (confirm("Are you sure?") === true) {
        alert("Xóa sản phẩm thành công");
        deleteProductFromCart(productId);
      }
    });
  });

  updateCartSummary();

  if (cart.length === 0) {
    productCart.textContent = "Giỏ hàng không có sản phẩm";
  }
}

renderProduct();
renderCart();
updateCartSummary();
