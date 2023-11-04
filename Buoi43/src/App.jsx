import React, { useEffect, useState } from "react";
import ProductList from "./Components/Product/ProductList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./Components/Cart/Cart";
import Loading from "./Components/Loading/Loading";
import { Login } from "./Components/Login/Login.jsx";
import { getProfile, getProducts } from "./config/shopApi";
export const AppContext = React.createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const products = await getProducts();
      console.log(products);
      if (products) {
        setProducts(products);
      }
      const storedEmail = localStorage.getItem("email");
      if (storedEmail) {
        const apiKey = localStorage.getItem("apiKey");
        if (apiKey) {
          getProfile().then(async (data) => {
            if (data) {
              const username = data.emailId.name;
              setLoading(false);
              toast.success(`Chào mừng bạn đã quay trở lại ${username}`);
              setEmail(storedEmail);
            }
          });
        } else {
          Login(setLoading, setEmail);
        }
      } else {
        Login(setLoading, setEmail);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = async (product) => {
    setLoading(true);
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.left -= 1;
    } else {
      updatedCart.push({ ...product, quantity: 1, left: product.quantity - 1 });
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setLoading(false);
    toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
  };

  return (
    <AppContext.Provider
      value={{ cart, products, setCart, setLoading, setProducts }}
    >
      <div className="shop">
        <div className="shop-inner">
          <h1>Welcome to Shop!</h1>
          {loading && <Loading />}

          {email !== "" && (
            <>
              <ProductList handleAddToCart={handleAddToCart} />
              <Cart />
            </>
          )}
        </div>
        <ToastContainer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
