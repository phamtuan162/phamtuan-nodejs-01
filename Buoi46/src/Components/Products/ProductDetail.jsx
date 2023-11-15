import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getLocalStorage } from "../../utils/localStorage";
const ProductDetail = () => {
  const productDetail = getLocalStorage("detail") || [];
  const dispatch = useDispatch();
  const { brand, description, image, category, name, price } = productDetail;
  const HandleAddToCart = async (product) => {
    await dispatch({ type: "product/addToCart", payload: product });
    toast.success(`Thêm ${product.name}  vào giỏ hàng thành công`);
  };
  return (
    <div className="product-detail">
      <img src={image} alt="" />
      <div className="details">
        <h2 className="brand">{brand}</h2>
        <h2 className="title">{name}</h2>
        <p className="desc">{description}</p>
        <span className="category">Category: {category}</span>
        <span className="price">{price}</span>
        <div className="action">
          <NavLink to="/product/1">
            <button type="button">Go Home</button>
          </NavLink>
          <button type="button" onClick={() => HandleAddToCart(productDetail)}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
