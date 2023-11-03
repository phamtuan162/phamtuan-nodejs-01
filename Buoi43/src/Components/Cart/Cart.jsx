import React, { useContext } from "react";
import { AppContext } from "../../App";
export default function Cart({ setCart }) {
  const { cart } = useContext(AppContext);

  const handleChange = (e, productId) => {
    const updatedCart = [...cart];
    const newQuantity = parseInt(e.target.value);
    updatedCart.map((productCart) => {
      if (productCart._id === productId) {
        const oldQuantity = productCart.quantity;
        productCart.quantity = newQuantity;
        if (newQuantity > oldQuantity) {
          productCart.left -= 1;
        } else {
          productCart.left += 1;
        }
      }
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const TotalQuantity = () => {
    const totalQuantity = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    return totalQuantity;
  };

  const TotalPrice = () => {
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return totalPrice;
  };
  return cart.length > 0 ? (
    <table className="cart">
      <thead>
        <tr>
          <th style={{ width: "30%" }}>Hình ảnh</th>
          <th style={{ width: "20%" }}>Tên sản phẩm</th>
          <th style={{ width: "20%" }}>Số lượng</th>
          <th style={{ width: "10%" }}>Còn lại</th>
          <th style={{ width: "20%" }}>Giá tiền</th>
        </tr>
      </thead>
      <tbody>
        {cart.map(({ _id, name, quantity, price, image, left }) => {
          return (
            <tr key={_id}>
              <td>
                <img src={image} alt="" />
              </td>
              <td>{name}</td>
              <td>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    handleChange(e, _id);
                  }}
                />
              </td>
              <td>{left}</td>
              <td>{price * quantity}$</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}>Total</td>
          <td colSpan={2}>{TotalQuantity()}</td>
          <td>{TotalPrice()}$</td>
        </tr>
      </tfoot>
    </table>
  ) : (
    <div style={{ marginTop: "20px", color: "#fff" }}>
      Chưa có sản phẩm nào trong giỏ hàng
    </div>
  );
}
