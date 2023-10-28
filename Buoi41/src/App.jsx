import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import Loading from "./Components/Loading";
import { TodoInner } from "./Components/TodoInner";
import { handleLogin } from "./Components/HandleLogin";

function App() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      const username = storedEmail.split("@")[0];
      setEmail(storedEmail);
      toast.success(`Chào mừng bạn đã quay trở lại ${username}`);
    } else {
      handleLogin(setEmail);
    }
  }, []);

  return (
    <>
      <div className="todo">
        {!email && <Loading />}
        <TodoInner />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
