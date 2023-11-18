import "./Login.scss";
import { useRef, useState } from "react";
import { getApiKey } from "../../services/getApikey";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const h1Ref = useRef(null);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isValidEmail(email)) {
        const check = await getApiKey(email);

        if (check) {
          navigate("/");
        }
      } else {
        h1Ref.current.innerText = "Enter a valid email!";
        setEmail("");
      }
    } catch (error) {
      console.error("Error fetching API key:", error);
    } finally {
      setLoading(false);
    }
  };

  const HandleChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="login">
      <h1 ref={h1Ref}> {loading ? "Loading..." : "Enter the Email"}</h1>
      <form onSubmit={HandleSubmit}>
        <input
          type="text"
          name="email"
          autoCorrect="on"
          value={email}
          onChange={HandleChange}
        />
      </form>
    </div>
  );
}

export default Login;
