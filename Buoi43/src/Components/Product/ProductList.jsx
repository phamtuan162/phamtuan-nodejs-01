import React, { useContext } from "react";
import { AppContext } from "../../App";

export default function ProductList({ handleAddToCart }) {
  const { products } = useContext(AppContext);
  return (
    <div className="product-list">
      {products.length &&
        products.map((product) => {
          return (
            <div className="product-item" key={product._id}>
              <img src={product.image} alt="" />
              <span className="product-item__name">{product.name}</span>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <span className="product-item__quantity">${product.price}</span>
                <button
                  type="button"
                  className="btn btn-add"
                  onClick={() => {
                    handleAddToCart(product);
                  }}
                >
                  Add to Cart!
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
