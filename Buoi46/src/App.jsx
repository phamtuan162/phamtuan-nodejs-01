import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./Components/Cart/Cart";
import ProductDetail from "./Components/Products/ProductDetail";
import ProductList from "./Components/Products/ProductList";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:page" element={<ProductList />} />
          <Route path="/detail/*" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>

      <ToastContainer />
    </div>
  );
}

export default App;
