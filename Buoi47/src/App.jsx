import "../src/assets/css/style.css";
import Layout from "./core/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Layout />
      <ToastContainer position="bottom-right" autoClose="3000" />
    </>
  );
}

export default App;
