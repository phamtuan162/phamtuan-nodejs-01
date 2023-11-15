import React, { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const Cart = () => {
  const carts = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  const handleIncrement = async (product) => {
    await dispatch({ type: "product/addToCart", payload: product });
    toast.success("Sản phẩm đang tăng");
  };

  const handleDecrement = async (product) => {
    if (product.amount > 1) {
      await dispatch({ type: "cart/decrement", payload: product });
      toast.warning("Sản phẩm đang giảm");
    } else {
      toast.warning(
        `Are you sure you want to remove ${product.name}, Click me`,
        {
          onClick: async () => {
            await dispatch({ type: "cart/delete", payload: product });
            toast.success("Sản phẩm đã được xóa khỏi giỏ hàng thành công");
          },
        }
      );
    }
  };
  const handleDeleteFromCart = (product) => {
    toast.warning(`Are you sure you want to remove ${product.name}, Click me`, {
      onClick: () => {
        toast.success("Sản phẩm đã được xóa khỏi giỏ hàng thành công");
        dispatch({ type: "cart/delete", payload: product });
      },
    });
  };
  const HandleCheckOut = async () => {
    await dispatch({ type: "cart/deleteAll" });
    toast.success("Checkout thành công");
  };
  const totalPrice = useMemo(() => {
    if (carts.length) {
      const result = carts.reduce(
        (prev, cur) => prev + cur.amount * cur.price,
        0
      );
      return result;
    }
    return 0;
  }, [carts]);

  return (
    <div className="shopping-cart">
      <h1 id="shopping-cart-heading">SHOPPING CART</h1>
      {carts.length > 0 ? (
        <>
          {carts.map((product) => {
            return (
              <div className="cart-product" key={product._id}>
                <img src={product.image} alt="" />
                <div className="details">
                  <span className="brand">
                    {product.brand}
                    <span className="name">{product.name}</span>
                  </span>
                  <span className="price">
                    {product.price.toLocaleString()}
                  </span>
                  <span className="quantity">Còn lại: {product.quantity}</span>
                </div>
                <div className="action">
                  <div className="edit">
                    <div
                      className="minus"
                      onClick={() => {
                        handleDecrement(product);
                      }}
                      style={
                        product.amount === 1
                          ? { color: "rgb(220, 217, 217)", cursor: "default" }
                          : {}
                      }
                    >
                      -
                    </div>
                    <div className="amount">{product.amount}</div>
                    <div
                      className="plus"
                      onClick={() => handleIncrement(product)}
                    >
                      +
                    </div>
                  </div>
                  <div className="total-price">
                    <span className="price-span">
                      {(product.amount * product.price).toLocaleString()}
                    </span>
                    <span
                      onClick={() => {
                        handleDecrement(product);
                      }}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="total-price-cart">
            Total Price:
            <span className="right">{totalPrice.toLocaleString()}</span>
          </div>
          <button
            type="button"
            className="btn-checkout"
            onClick={HandleCheckOut}
          >
            Checkout
          </button>
        </>
      ) : (
        <div className="zero-product">
          <h4>There is no product in your cart!</h4>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            version="1.1"
            viewBox="0 0 16 16"
            id="sad-icon"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zM8 1.5c3.59 0 6.5 2.91 6.5 6.5s-2.91 6.5-6.5 6.5-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5zM4 5c0-0.552 0.448-1 1-1s1 0.448 1 1c0 0.552-0.448 1-1 1s-1-0.448-1-1zM10 5c0-0.552 0.448-1 1-1s1 0.448 1 1c0 0.552-0.448 1-1 1s-1-0.448-1-1zM4.998 12.199l-1.286-0.772c0.874-1.454 2.467-2.427 4.288-2.427s3.413 0.973 4.288 2.427l-1.286 0.772c-0.612-1.018-1.727-1.699-3.002-1.699s-2.389 0.681-3.002 1.699z"></path>
          </svg>
          <NavLink to="/product/1">
            <button type="button">Go home</button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Cart;
