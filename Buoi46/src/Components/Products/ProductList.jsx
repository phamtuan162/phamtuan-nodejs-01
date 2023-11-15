import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loading from "../Loading/Loading";
import getAllProduct from "../../helpers/getAllProduct";
import { config } from "../../config/config";
import { toast } from "react-toastify";
import { setLocalStorage } from "../../utils/localStorage";
import ReactPaginate from "react-paginate";

const ProductList = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [numberPage, setNumberPage] = useState(param.page || 1);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const totalPages = useRef(1);

  useEffect(() => {
    getAllProduct({
      limit: config.LIMIT,
      page: numberPage,
    }).then((data) => {
      if (data) {
        totalPages.current = data.totalPage;
        setProducts(data.listProduct);
        setLoading(false);
      } else {
        toast.error(data);
      }
    });
  }, [numberPage]);
  const HandleAddToCart = async (product) => {
    await dispatch({ type: "product/addToCart", payload: product });
    toast.success(`Thêm ${product.name}  vào giỏ hàng thành công`);
  };
  const handleDetail = (product) => {
    setLocalStorage("detail", product);
  };
  const handlePageClick = (e) => {
    setLoading(true);
    navigate(`/product/${+e.selected + 1}`);
    setNumberPage(+e.selected + 1);
  };
  return (
    <div className="products">
      <h1>PRODUCTS</h1>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="product-list">
            {products.length &&
              products.map((product) => {
                const nameLink = decodeURIComponent(product.name)
                  .replace(/\s+/g, "-")
                  .toLowerCase();
                return (
                  <div key={product._id} className="product-item">
                    <NavLink
                      to={`/detail/name~${nameLink}/${product._id}`}
                      className="product-head"
                      onClick={() => handleDetail(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-img"
                      />
                      <h2 className="product-name">{product.name}</h2>
                    </NavLink>

                    <div className="product-info">
                      <span className="product-price">
                        {product.price.toLocaleString()}
                      </span>

                      <button
                        type="button"
                        onClick={() => HandleAddToCart(product)}
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 256 256"
                          id="shopping-cart"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            forcePage={numberPage - 1}
            pageCount={totalPages.current}
            previousLabel="< previous"
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            activeClassName={"active"}
          />
        </>
      )}
    </div>
  );
};

export default ProductList;
