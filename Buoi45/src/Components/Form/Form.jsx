import React, { useEffect, useRef, useState, useId } from "react";
import {
  Button,
  FormLabel,
  Input,
  FormControl,
  Box,
  Flex,
} from "@chakra-ui/react";
import MAX_TIME, { RANGE_NUMBER } from "../../config/config";
import { useSelector } from "../../core/useSelector";
import { toast } from "react-toastify";
const Form = () => {
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const id = useId();
  const { state, dispatch } = useSelector();
  const { randomNumber, data, timeCurrent } = state;
  const [playAgain, setPlayAgain] = useState(false);
  const [InputValue, setInputValue] = useState();
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!playAgain) {
        switch (e.key) {
          case "ArrowDown":
            updateInputValue("decrement");
            break;
          case "ArrowUp":
            updateInputValue("increment");
            break;
          default:
            inputRef.current?.focus();
            break;
        }
      } else {
        if (e.key === "Enter") {
          buttonRef.current.click();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [playAgain]);
  console.log(randomNumber);

  const handleSubmit = (e) => {
    e.preventDefault();
    const number = +inputRef.current.value;
    let message;

    if (!number) {
      message = "Nhập số muốn đoán";
      toast.warning(message);
      return;
    }

    if (number === randomNumber) {
      setPlayAgain(true);
      message = "Bạn đoán đúng số rồi";
      toast.success(message);
    } else {
      message =
        number > randomNumber
          ? "Bạn cần giảm xuống 1 chút"
          : "Bạn cần tăng thêm 1 chút";

      if (timeCurrent - 1 === 0) {
        setPlayAgain(true);
        message = "Hết lượt đoán, bạn không đoán đúng số";
        toast.error(message);
      } else {
        toast.warning(message);
      }
    }

    dispatch({
      type: "form/submit",
      payload: { number, message },
    });
  };

  const handlePlayAgain = (e) => {
    setPlayAgain(false);
    dispatch({ type: "form/playAgain", payload: MAX_TIME });
  };

  const handleChange = (e) => {
    const regex = new RegExp(`^[0-9]{0,${(RANGE_NUMBER - 1 + "").length}}$`);
    if (!regex.test(e.target.value)) {
      inputRef.current.value = e.target.value.slice(0, -1);
    }
  };

  const updateInputValue = (type) => {
    const currentValue = parseInt(inputRef.current.value) || 0;
    inputRef.current.value =
      type === "increment"
        ? Math.min(currentValue + 1, RANGE_NUMBER - 1)
        : Math.max(currentValue - 1, 1);
  };

  return (
    <Box p="16px">
      {!playAgain ? (
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="20px" align="center">
            <FormControl>
              <FormLabel htmlFor={id} color="primary.500">
                Hãy thử nhập 1 số
              </FormLabel>
              <Input
                id={id}
                ref={inputRef}
                type="text"
                name="number"
                placeholder="Thử một số"
                onChange={handleChange}
                autoComplete="off"
              />
            </FormControl>
            <Button
              type="submit"
              ref={buttonRef}
              bg="primary.500"
              _hover={{ bg: "primary.600" }}
            >
              Kiểm tra
            </Button>
          </Flex>
        </form>
      ) : (
        <Button
          type="button"
          ref={buttonRef}
          bg="primary.500"
          _hover={{ bg: "primary.600" }}
          onClick={handlePlayAgain}
        >
          Chơi lại
        </Button>
      )}
    </Box>
  );
};

export default Form;
