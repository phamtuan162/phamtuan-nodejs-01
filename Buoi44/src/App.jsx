import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Components/Loading/Loading";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profiles/Profile";
import { useSelector } from "./core/useSelector";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { state } = useSelector();
  const { isAuthenticated } = useAuth0();
  return (
    <>
      {state.loading && <Loading />}
      {isAuthenticated ? <Profile /> : <Login />}
      <ToastContainer />
    </>
  );
}

export default App;
