import { useState, useLayoutEffect } from "react";
import Header from "./Components/Header/Header";
import Body from "./Components/Body/Body";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Provider from "./core/Provider";
import { useColorMode } from "@chakra-ui/react";
import Form from "./Components/Form/Form";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  useLayoutEffect(() => {
    toast.info("Chào mừng bạn đến với trò chơi đoán số");
  }, []);
  return (
    <Provider>
      <Header colorMode={colorMode} toggleColorMode={toggleColorMode} />
      <Body />
      <Form />
      <ToastContainer
        position="bottom-right"
        autoClose="3000"
        theme={colorMode === "light" ? "dark" : "light"}
      />
    </Provider>
  );
}

export default App;
