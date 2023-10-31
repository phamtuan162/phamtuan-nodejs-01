import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import Loading from "./Components/Loading";
import { TodoInner } from "./Components/TodoInner";
import { handleLogin } from "./Components/HandleLogin";
import { getApiKey } from "./config/todoApi";

function App() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const storedEmail = localStorage.getItem("email");
      if (storedEmail) {
        const username = storedEmail.split("@")[0];
        getApiKey(storedEmail).then((checkEmail) => {
          if (checkEmail) {
            setLoading(false);
            toast.success(`Chào mừng bạn đã quay trở lại ${username}`);
            setEmail(storedEmail);
          }
        });
      } else {
        handleLogin(setLoading, setEmail);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="todo">
        {loading && <Loading />}
        {email !== "" && (
          <TodoInner loading={loading} setLoading={setLoading} />
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
