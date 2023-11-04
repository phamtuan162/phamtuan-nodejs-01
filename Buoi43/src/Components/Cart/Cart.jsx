import React, { useContext } from "react";
import { AppContext } from "../../App";
import { getProducts, postOrder } from "../../config/shopApi";
import { toast } from "react-toastify";
export default function Cart() {
  const { cart, setCart } = useContext(AppContext);
  const { products, setProducts } = useContext(AppContext);
  const { setLoading } = useContext(AppContext);
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

  const handlePayment = () => {
    setLoading(true);
    const orderData = cart.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));
    postOrder(orderData).then(async (data) => {
      if (data) {
        setLoading(false);
        toast.info("Thanh toán thành công");
        localStorage.removeItem("cart");
        setCart([]);
        const newProducts = await getProducts();
        setProducts(newProducts);
      }
    });
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
    <>
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
                    min={1}
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
      <button
        type="button"
        className="btn"
        style={{ marginRight: "auto", fontSize: "2rem" }}
        onClick={handlePayment}
      >
        Thanh Toán
      </button>
    </>
  ) : (
    <div style={{ marginTop: "20px", color: "#fff" }}>
      Chưa có sản phẩm nào trong giỏ hàng
    </div>
  );
}
